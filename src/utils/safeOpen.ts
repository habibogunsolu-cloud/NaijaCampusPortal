/**
 * Utility to safely open external links and ad networks with anti-fraud frequency capping.
 */

const AD_COOLDOWN_STORAGE_KEY = 'naija_last_ad_open_ts';
// Safe cooldown between ad link popups (4 minutes = 240,000ms) to prevent self-traffic flags on Monetag
const DEFAULT_AD_COOLDOWN_MS = 4 * 60 * 1000;

export function safeOpenLink(url: string): void {
  if (!url || typeof window === 'undefined') return;
  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.warn('Safe open link fallback:', err);
  }
}

/**
 * Safely triggers an ad link ONLY if the natural cooldown period has elapsed.
 * Protects Monetag publisher accounts from 'Auto / Self traffic' warnings and rapid bursts.
 * Returns true if the ad was shown, false if throttled by cooldown.
 */
export function safeOpenAdLink(url: string, cooldownMs = DEFAULT_AD_COOLDOWN_MS): boolean {
  if (!url || typeof window === 'undefined') return false;

  try {
    const lastTrigger = localStorage.getItem(AD_COOLDOWN_STORAGE_KEY);
    const now = Date.now();

    if (lastTrigger) {
      const elapsed = now - Number(lastTrigger);
      if (elapsed < cooldownMs) {
        // Still within cooldown period - do not open to protect account from policy warnings
        return false;
      }
    }

    // Record new trigger timestamp
    localStorage.setItem(AD_COOLDOWN_STORAGE_KEY, now.toString());
    safeOpenLink(url);
    return true;
  } catch (err) {
    console.warn('Ad cooldown verification error:', err);
    safeOpenLink(url);
    return true;
  }
}
