import React, { useState, useEffect } from 'react';
import { User, signInWithGoogle, logOut, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  LogIn,
  LogOut,
  User as UserIcon,
  CheckCircle2,
  Lock,
  ExternalLink,
  Save,
  Check,
  Award,
  Trash2,
  BookOpen,
  Download,
  Smartphone,
  RefreshCw,
} from 'lucide-react';
import {
  getAllAvailableNovels,
  getActiveNovel,
  setActiveNovelId,
} from '../data/readHubData';
import { subscribeToAnalytics, AnalyticsStats } from '../utils/analyticsTracker';
import { getSavedAdScript, saveAdScript } from '../utils/adScriptInjector';
import { forcePwaSync } from '../utils/pwaUpdate';

interface UserProfileTabProps {
  currentUser: User | null;
  monetagLink: string;
  onSaveMonetagLink: (newLink: string) => void;
  secondaryAdLink?: string;
  onSaveSecondaryAdLink?: (newLink: string) => void;
  adStrategy?: 'monetag_only' | 'alternating';
  onSaveAdStrategy?: (strategy: 'monetag_only' | 'alternating') => void;
  triggerCount: number;
  dwellMinutes?: number;
  onOpenInstallModal?: () => void;
  bannersEnabled?: boolean;
  onToggleBanners?: (enabled: boolean) => void;
}

interface SavedSlip {
  id: string;
  courseName: string;
  score: number;
  date: string;
}

export const UserProfileTab: React.FC<UserProfileTabProps> = ({
  currentUser,
  monetagLink,
  onSaveMonetagLink,
  secondaryAdLink = '',
  onSaveSecondaryAdLink,
  adStrategy = 'alternating',
  onSaveAdStrategy,
  triggerCount,
  dwellMinutes = 0,
  onOpenInstallModal,
  bannersEnabled = true,
  onToggleBanners,
}) => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [linkInput, setLinkInput] = useState(monetagLink);
  const [secondaryLinkInput, setSecondaryLinkInput] = useState(secondaryAdLink);
  const [activeStrategy, setActiveStrategy] = useState<'monetag_only' | 'alternating'>(adStrategy);
  const [shareUrlInput, setShareUrlInput] = useState(() => {
    try {
      return localStorage.getItem('portal_custom_share_url') || '';
    } catch {
      return '';
    }
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isShareUrlSaved, setIsShareUrlSaved] = useState(false);
  const [activeNovelState, setActiveNovelState] = useState(() => getActiveNovel().id);
  const [isNovelSaved, setIsNovelSaved] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  const [savedSlips, setSavedSlips] = useState<SavedSlip[]>([]);

  // Real-time Visitor & Monetized Click Analytics from Firebase
  const [analytics, setAnalytics] = useState<AnalyticsStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    totalAdClicks: 0,
    todayVisits: 0,
    clicksByPlacement: {},
  });
  const [customAdScript, setCustomAdScript] = useState(() => getSavedAdScript());
  const [isRefreshingAnalytics, setIsRefreshingAnalytics] = useState(false);
  const [isSyncingPwa, setIsSyncingPwa] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAnalytics((stats) => {
      setAnalytics(stats);
    });
    return () => unsub();
  }, []);

  const availableNovels = getAllAvailableNovels();

  // Fetch user's saved slips from both localStorage (instant Vercel offline support) and Firestore
  useEffect(() => {
    const fetchSlips = async () => {
      const combined: SavedSlip[] = [];

      // 1. Instant local storage slips
      try {
        const local = JSON.parse(localStorage.getItem('naija_saved_slips') || '[]');
        if (Array.isArray(local)) {
          combined.push(...local);
        }
      } catch {
        // ignore
      }

      // 2. Firebase Cloud slips if user is signed in
      if (currentUser) {
        try {
          const q = query(collection(db, 'saved_slips'), where('userId', '==', currentUser.uid));
          const snap = await getDocs(q);
          snap.forEach((docSnap) => {
            const d = docSnap.data();
            const exists = combined.some(
              (s) => s.id === docSnap.id || (s.courseName === d.courseName && s.score === d.jambScore)
            );
            if (!exists) {
              combined.push({
                id: docSnap.id,
                courseName: d.courseName || 'General UTME',
                score: d.jambScore || 200,
                date: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'Recent',
              });
            }
          });
        } catch (err) {
          console.log('Firestore fetch notice:', err);
        }
      }

      setSavedSlips(combined);
    };

    fetchSlips();
  }, [currentUser]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setLoginNotice(null);
    try {
      const user = await signInWithGoogle();
      if (!user) {
        setLoginNotice('Instant Student Mode active! Your slips and novels are automatically saved on your device.');
      }
    } catch {
      setLoginNotice('Instant Student Mode active! Your slips and novels are automatically saved on your device.');
    }
    setIsLoggingIn(false);
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Strictly PIN 017014
    if (adminPin === '017014') {
      setIsAdminUnlocked(true);
      setAdminPin('');
      setPinError('');
    } else {
      setPinError('Access Denied. Passcode incorrect.');
      setAdminPin('');
    }
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveMonetagLink(linkInput.trim());
    saveAdScript(customAdScript.trim());
    if (onSaveSecondaryAdLink) {
      onSaveSecondaryAdLink(secondaryLinkInput.trim());
    }
    if (onSaveAdStrategy) {
      onSaveAdStrategy(activeStrategy);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSaveShareUrl = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanUrl = shareUrlInput.trim().replace(/\/$/, '');
      if (cleanUrl) {
        localStorage.setItem('portal_custom_share_url', cleanUrl);
      } else {
        localStorage.removeItem('portal_custom_share_url');
      }
      setIsShareUrlSaved(true);
      setTimeout(() => setIsShareUrlSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleResetShareUrl = () => {
    try {
      localStorage.removeItem('portal_custom_share_url');
      setShareUrlInput('');
      setIsShareUrlSaved(true);
      setTimeout(() => setIsShareUrlSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDeleteSlip = async (slipId: string) => {
    try {
      const local = JSON.parse(localStorage.getItem('naija_saved_slips') || '[]');
      const updated = local.filter((s: { id: string }) => s.id !== slipId);
      localStorage.setItem('naija_saved_slips', JSON.stringify(updated));
    } catch {
      // ignore
    }

    try {
      await deleteDoc(doc(db, 'saved_slips', slipId));
    } catch {
      // ignore
    }

    setSavedSlips((prev) => prev.filter((s) => s.id !== slipId));
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'User'}
                className="w-16 h-16 rounded-full border-2 border-emerald-800 object-cover shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-800 text-emerald-900 flex items-center justify-center font-bold text-xl shadow-sm">
                <UserIcon className="w-8 h-8" />
              </div>
            )}

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {currentUser?.displayName || 'Student Candidate Profile'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser?.email || 'Your admission slips & progress are saved directly to your device.'}
              </p>
              {currentUser ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-2 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Firebase Cloud Account Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-2 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active &amp; Ready (Zero Setup Required)
                </span>
              )}
            </div>
          </div>

          <div>
            {currentUser ? (
              <button
                onClick={logOut}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoggingIn ? 'Connecting...' : 'Sign In with Google (Optional)'}</span>
              </button>
            )}
          </div>
        </div>

        {loginNotice && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{loginNotice}</span>
          </div>
        )}

        {/* Saved Slips */}
        <div className="pt-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-800" />
            <span>My Saved Admission Slips:</span>
          </h4>

          {savedSlips.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 bg-slate-50 rounded-xl px-4 border border-slate-100">
              No saved slips yet. Tap &apos;Save Slip to Profile&apos; on the <strong>Slip Card</strong> tab to store your eligibility slips here.
            </p>
          ) : (
            <div className="space-y-2">
              {savedSlips.map((slip) => (
                <div
                  key={slip.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <strong className="text-slate-900 block">{slip.courseName}</strong>
                    <span className="text-[11px] text-emerald-800 font-mono font-bold">
                      Score: {slip.score} / 400 &bull; {slip.date}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSlip(slip.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile App Download Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 shadow-md">
            <Download className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h4 className="font-black text-sm text-white">
                Download NaijaCampus App to Phone
              </h4>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold px-2 py-0.5 rounded-full">
                Offline Ready
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              Install directly to your phone screen. Full-screen experience, zero app store wait.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={onOpenInstallModal}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>Install App</span>
          </button>
          <button
            onClick={async () => {
              setIsSyncingPwa(true);
              await forcePwaSync();
            }}
            disabled={isSyncingPwa}
            className="w-full sm:w-auto bg-emerald-800/90 hover:bg-emerald-800 text-amber-300 border border-emerald-700 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            title="Purge cached app files & download latest changes"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingPwa ? 'animate-spin text-amber-400' : ''}`} />
            <span>{isSyncingPwa ? 'Syncing...' : 'Sync Updates'}</span>
          </button>
        </div>
      </div>

      {/* Secret Publisher Section (100% Hidden PIN, Zero Hints) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-slate-700">
            <Lock className="w-4 h-4 text-slate-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Administration Portal
            </h4>
          </div>
          <span className="text-[10px] text-slate-400">Restricted</span>
        </div>

        {!isAdminUnlocked ? (
          <div>
            <form onSubmit={handleUnlockAdmin} className="flex gap-2 max-w-xs pt-2">
              <input
                type="password"
                value={adminPin}
                onChange={(e) => {
                  setAdminPin(e.target.value);
                  if (pinError) setPinError('');
                }}
                placeholder="••••••"
                maxLength={6}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 flex-1 tracking-widest font-mono focus:outline-hidden focus:border-emerald-700"
              />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-1.5 rounded-xl text-xs transition cursor-pointer"
              >
                Enter
              </button>
            </form>
            {pinError && (
              <p className="text-[11px] text-rose-600 font-bold mt-1.5">{pinError}</p>
            )}
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* 1. Simple Activity Card (Visitor counts & Clicks) */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Visitor &amp; Click Counts
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Live counts of students visiting your portal
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsRefreshingAnalytics(true);
                    setTimeout(() => setIsRefreshingAnalytics(false), 800);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-xl text-xs flex items-center gap-1 border border-slate-700 transition cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshingAnalytics ? 'animate-spin text-amber-400' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* 3 Simple Number Boxes */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-slate-400 block font-medium">People Visited</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block mt-0.5">
                    {analytics.uniqueVisitors}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-slate-400 block font-medium">Total Page Opens</span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono block mt-0.5">
                    {analytics.totalVisits}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-slate-400 block font-medium">Ad Clicks</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block mt-0.5">
                    {analytics.totalAdClicks}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. In-App Ads & Monetag Settings */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    In-App Ads (Monetag)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Real ads display directly inside the app for all visitors
                  </p>
                </div>

                {/* Simple Banners Active Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    if (onToggleBanners) {
                      onToggleBanners(!bannersEnabled);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    bannersEnabled
                      ? 'bg-emerald-800 text-white hover:bg-emerald-700'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {bannersEnabled ? 'Banners: ON' : 'Banners: OFF'}
                </button>
              </div>

              {/* Clean Single Form for Monetag Link / Ad Tag */}
              <form onSubmit={handleSaveLink} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Monetag Link:
                  </label>
                  <input
                    type="url"
                    required
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="https://uplcm.com/4/11981826"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-700"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Monetag In-App Ad Script (Optional):
                    </label>
                    {customAdScript && (
                      <button
                        type="button"
                        onClick={() => setCustomAdScript('')}
                        className="text-[10px] text-rose-600 hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={customAdScript}
                    onChange={(e) => setCustomAdScript(e.target.value)}
                    placeholder="Optional: Paste In-Page Push or Banner code from Monetag"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-700"
                  />
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Leave empty if you only want to use your Monetag link above.
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">
                    Active Link: <code className="text-emerald-800 font-bold">{linkInput}</code>
                  </span>
                  <button
                    type="submit"
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved!' : 'Save Ads'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 3. WhatsApp Portal Share Link */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    WhatsApp Share Link
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    The link attached when students share to WhatsApp
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetShareUrl}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <form onSubmit={handleSaveShareUrl} className="space-y-3">
                <input
                  type="url"
                  placeholder="Leave empty to use the active app link automatically"
                  value={shareUrlInput}
                  onChange={(e) => setShareUrlInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-700"
                />

                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[11px] text-slate-500 truncate max-w-xs">
                    Current: <code className="text-emerald-800 font-bold">{shareUrlInput || (typeof window !== 'undefined' ? window.location.origin : '')}</code>
                  </span>
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {isShareUrlSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isShareUrlSaved ? 'Saved!' : 'Save Link'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 4. Active JAMB Novel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-800" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Active JAMB Novel
                </h4>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveNovelId(activeNovelState);
                  setIsNovelSaved(true);
                  setTimeout(() => setIsNovelSaved(false), 2000);
                }}
                className="space-y-3"
              >
                <select
                  value={activeNovelState}
                  onChange={(e) => setActiveNovelState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700 cursor-pointer"
                >
                  {availableNovels.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.title} — {n.author} ({n.sessionTag || 'Prescribed Text'})
                    </option>
                  ))}
                </select>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-amber-500/50 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    {isNovelSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isNovelSaved ? 'Saved!' : 'Save Novel'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
