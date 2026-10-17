/**
 * PWA Cache Clearing and Instant Live Sync Utility
 * Ensures installed apps on phones immediately download the freshest updates.
 */

export async function forcePwaSync(): Promise<boolean> {
  try {
    // 1. Unregister all existing service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
    }

    // 2. Clear all CacheStorage entries
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }

    // 3. Mark last sync timestamp in localStorage
    try {
      localStorage.setItem('naija_last_sync_timestamp', Date.now().toString());
    } catch {
      // ignore
    }

    // 4. Hard reload page to fetch fresh bundle from server
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('_v', Date.now().toString());
    window.location.href = currentUrl.toString();
    return true;
  } catch (err) {
    console.warn('PWA sync notice:', err);
    window.location.reload();
    return false;
  }
}

export function getLastSyncTime(): string {
  try {
    const ts = localStorage.getItem('naija_last_sync_timestamp');
    if (!ts) return 'Just now';
    const date = new Date(parseInt(ts, 10));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'Just now';
  }
}
