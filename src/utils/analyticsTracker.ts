import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  totalAdClicks: number;
  todayVisits: number;
  clicksByPlacement: Record<string, number>;
  lastVisitAt?: string;
}

const VISITOR_ID_KEY = 'portal_visitor_uuid';
const FIRST_VISIT_KEY = 'portal_first_visit_logged';
const LOCAL_VISITS_KEY = 'portal_local_visits';
const LOCAL_CLICKS_KEY = 'portal_local_clicks';
const LOCAL_PLACEMENT_KEY = 'portal_local_placements';

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}_${String(d.getMonth() + 1).padStart(2, '0')}_${String(d.getDate()).padStart(2, '0')}`;
}

function getOrCreateVisitorId(): { id: string; isNew: boolean } {
  if (typeof window === 'undefined') {
    return { id: 'ssr', isNew: false };
  }
  let id = localStorage.getItem(VISITOR_ID_KEY);
  let isNew = false;
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem(VISITOR_ID_KEY, id);
    isNew = true;
  }
  return { id, isNew };
}

/**
 * Tracks an app visit (called on app startup).
 * Distinguishes unique visitors from recurring visits.
 */
export async function trackAppVisit(): Promise<void> {
  if (typeof window === 'undefined') return;

  const { isNew } = getOrCreateVisitorId();
  const hasLoggedFirstVisit = localStorage.getItem(FIRST_VISIT_KEY);
  const isTrulyNew = isNew || !hasLoggedFirstVisit;

  // 1. Update local storage analytics
  const currentLocalVisits = Number(localStorage.getItem(LOCAL_VISITS_KEY) || 0) + 1;
  localStorage.setItem(LOCAL_VISITS_KEY, currentLocalVisits.toString());
  if (isTrulyNew) {
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
  }

  // 2. Sync to Firebase Firestore
  try {
    const trafficRef = doc(db, 'analytics', 'portal_traffic');
    const today = getTodayString();

    // Use setDoc with merge to ensure doc exists
    await setDoc(
      trafficRef,
      {
        totalVisits: increment(1),
        uniqueVisitors: increment(isTrulyNew ? 1 : 0),
        lastVisitAt: new Date().toISOString(),
        [`dailyVisits_${today}`]: increment(1),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Analytics visit sync note:', err);
  }
}

/**
 * Tracks an ad click / monetized action.
 * Logs placement name (e.g. 'bulletin_scholarship', 'cbt_result_pdf', 'in_page_banner')
 */
export async function trackAdClick(placement: string = 'general'): Promise<void> {
  if (typeof window === 'undefined') return;

  // 1. Update local counter
  const currentLocalClicks = Number(localStorage.getItem(LOCAL_CLICKS_KEY) || 0) + 1;
  localStorage.setItem(LOCAL_CLICKS_KEY, currentLocalClicks.toString());

  try {
    const rawPlacements = JSON.parse(localStorage.getItem(LOCAL_PLACEMENT_KEY) || '{}');
    rawPlacements[placement] = (rawPlacements[placement] || 0) + 1;
    localStorage.setItem(LOCAL_PLACEMENT_KEY, JSON.stringify(rawPlacements));
  } catch {
    // ignore
  }

  // 2. Sync to Firebase Firestore
  try {
    const trafficRef = doc(db, 'analytics', 'portal_traffic');
    await setDoc(
      trafficRef,
      {
        totalAdClicks: increment(1),
        [`clicksByPlacement.${placement}`]: increment(1),
        lastClickAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Analytics ad click sync note:', err);
  }
}

/**
 * Subscribes to live analytics stats in Firestore for real-time display in Admin dashboard.
 */
export function subscribeToAnalytics(callback: (stats: AnalyticsStats) => void): () => void {
  try {
    const trafficRef = doc(db, 'analytics', 'portal_traffic');
    const unsubscribe = onSnapshot(
      trafficRef,
      (snapshot) => {
        const localVisits = Number(localStorage.getItem(LOCAL_VISITS_KEY) || 0);
        const localClicks = Number(localStorage.getItem(LOCAL_CLICKS_KEY) || 0);
        let localPlacements = {};
        try {
          localPlacements = JSON.parse(localStorage.getItem(LOCAL_PLACEMENT_KEY) || '{}');
        } catch {
          // ignore
        }

        if (snapshot.exists()) {
          const data = snapshot.data();
          const today = getTodayString();
          const todayVisits = data[`dailyVisits_${today}`] || 0;

          callback({
            totalVisits: Math.max(data.totalVisits || 0, localVisits),
            uniqueVisitors: Math.max(data.uniqueVisitors || 0, 1),
            totalAdClicks: Math.max(data.totalAdClicks || 0, localClicks),
            todayVisits: todayVisits || localVisits,
            clicksByPlacement: { ...localPlacements, ...(data.clicksByPlacement || {}) },
            lastVisitAt: data.lastVisitAt,
          });
        } else {
          // Fallback to local
          callback({
            totalVisits: Math.max(localVisits, 1),
            uniqueVisitors: 1,
            totalAdClicks: localClicks,
            todayVisits: localVisits,
            clicksByPlacement: localPlacements,
          });
        }
      },
      (error) => {
        console.warn('Analytics listener note:', error);
        // Fallback to local
        const localVisits = Number(localStorage.getItem(LOCAL_VISITS_KEY) || 0);
        const localClicks = Number(localStorage.getItem(LOCAL_CLICKS_KEY) || 0);
        let localPlacements = {};
        try {
          localPlacements = JSON.parse(localStorage.getItem(LOCAL_PLACEMENT_KEY) || '{}');
        } catch {
          // ignore
        }
        callback({
          totalVisits: Math.max(localVisits, 1),
          uniqueVisitors: 1,
          totalAdClicks: localClicks,
          todayVisits: localVisits,
          clicksByPlacement: localPlacements,
        });
      }
    );
    return unsubscribe;
  } catch {
    return () => {};
  }
}
