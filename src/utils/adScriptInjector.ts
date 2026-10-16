import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Utility to safely inject external ad network scripts (Monetag In-Page Push, MultiTag, Adsterra, etc.)
 * Syncs automatically with Firebase Firestore so all visitors across all phones receive the active ad scripts.
 */

const AD_SCRIPT_STORAGE_KEY = 'portal_custom_ad_script';
const AD_CONFIG_DOC_PATH = 'public_settings';
const AD_CONFIG_DOC_ID = 'ad_config';

export function getSavedAdScript(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(AD_SCRIPT_STORAGE_KEY) || '';
}

/**
 * Saves ad script both to localStorage and Firestore so all app visitors get it.
 */
export async function saveAdScript(scriptCode: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleanCode = scriptCode.trim();
  localStorage.setItem(AD_SCRIPT_STORAGE_KEY, cleanCode);
  injectAdScript(cleanCode);

  try {
    const configRef = doc(db, AD_CONFIG_DOC_PATH, AD_CONFIG_DOC_ID);
    await setDoc(
      configRef,
      {
        customAdScript: cleanCode,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Error syncing ad script to Firestore:', err);
  }
}

/**
 * Parses and executes Monetag / Adsterra / Google ad scripts safely in the DOM.
 */
export function injectAdScript(scriptCode: string): void {
  if (typeof window === 'undefined' || !scriptCode) return;

  // Remove previously injected script tags with our marker
  const existing = document.querySelectorAll('script[data-portal-ad-script="true"]');
  existing.forEach((el) => el.remove());

  try {
    // If user just typed or pasted a Monetag zone ID number (e.g. 11981826)
    const isPureDigits = /^\d{6,10}$/.test(scriptCode.trim());
    if (isPureDigits) {
      const zoneId = scriptCode.trim();
      const newScript = document.createElement('script');
      newScript.setAttribute('data-portal-ad-script', 'true');
      newScript.async = true;
      newScript.src = `https://al5sm.com/p/wa.js`;
      newScript.setAttribute('data-zone', zoneId);
      document.head.appendChild(newScript);
      return;
    }

    // If the input contains HTML <script> tags:
    const parser = new DOMParser();
    const docParsed = parser.parseFromString(scriptCode, 'text/html');
    const scriptElements = docParsed.querySelectorAll('script');

    if (scriptElements.length > 0) {
      scriptElements.forEach((s) => {
        const newScript = document.createElement('script');
        newScript.setAttribute('data-portal-ad-script', 'true');
        newScript.async = true;

        // Copy all attributes like src, type, data-cfasync, data-zone, etc.
        Array.from(s.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Copy inner code if inline script
        if (s.textContent) {
          newScript.textContent = s.textContent;
        }

        (document.body || document.head).appendChild(newScript);
      });
    } else if (scriptCode.startsWith('http://') || scriptCode.startsWith('https://') || scriptCode.startsWith('//')) {
      // Just a direct script URL
      const newScript = document.createElement('script');
      newScript.setAttribute('data-portal-ad-script', 'true');
      newScript.src = scriptCode;
      newScript.async = true;
      (document.body || document.head).appendChild(newScript);
    } else {
      // Raw javascript code snippet
      const newScript = document.createElement('script');
      newScript.setAttribute('data-portal-ad-script', 'true');
      newScript.textContent = scriptCode;
      (document.body || document.head).appendChild(newScript);
    }
  } catch (err) {
    console.warn('Ad script injection notice:', err);
  }
}

/**
 * Initializes saved ad script on startup from localStorage AND listens to Firestore
 * so any updates from the admin propagate to all visitors in real time.
 */
export function initSavedAdScript(onScriptUpdated?: (script: string) => void): () => void {
  // 1. Immediately inject locally cached script
  const saved = getSavedAdScript();
  if (saved) {
    injectAdScript(saved);
  }

  // 2. Subscribe to Firestore for real-time remote updates
  try {
    const configRef = doc(db, AD_CONFIG_DOC_PATH, AD_CONFIG_DOC_ID);
    const unsubscribe = onSnapshot(
      configRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.customAdScript && data.customAdScript !== saved) {
            localStorage.setItem(AD_SCRIPT_STORAGE_KEY, data.customAdScript);
            injectAdScript(data.customAdScript);
            if (onScriptUpdated) {
              onScriptUpdated(data.customAdScript);
            }
          }
        }
      },
      (error) => {
        console.warn('Ad script Firestore listener notice:', error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Init ad script error:', err);
    return () => {};
  }
}
