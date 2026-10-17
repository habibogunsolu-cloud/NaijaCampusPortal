import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Automatically check for service worker updates on app open without aggressive caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((reg) => {
        reg.update();
      })
      .catch((err) => {
        console.log('SW registration note:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
