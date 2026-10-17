import React from 'react';
import { Download, X, Smartphone, CheckCircle, Share, PlusSquare, ArrowRight, Zap, WifiOff, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-800 relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer active:scale-95"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Header with Icon */}
        <div className="flex items-center gap-3.5 pr-8">
          <img
            src="/pwa-192x192.png"
            alt="NaijaCampus Icon"
            className="w-14 h-14 rounded-2xl shadow-md border-2 border-emerald-700 p-0.5 bg-emerald-900 object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-lg text-slate-900 leading-tight">
                NaijaCampus App
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                PWA
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              JAMB UTME, WAEC, NECO &amp; Cut-Offs Portal
            </p>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center">
            <Zap className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <p className="text-[11px] font-black text-emerald-950">Instant Launch</p>
            <p className="text-[9px] text-emerald-700 leading-tight">Zero app store wait</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center">
            <WifiOff className="w-5 h-5 text-amber-700 mx-auto mb-1" />
            <p className="text-[11px] font-black text-amber-950">Works Offline</p>
            <p className="text-[9px] text-amber-700 leading-tight">Study without data</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2.5 text-center">
            <Smartphone className="w-5 h-5 text-indigo-700 mx-auto mb-1" />
            <p className="text-[11px] font-black text-indigo-950">Full Screen</p>
            <p className="text-[9px] text-indigo-700 leading-tight">100% native phone feel</p>
          </div>
        </div>

        {/* State 1: Already Installed */}
        {isInstalled && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-emerald-900">App Already Installed!</h4>
            <p className="text-xs text-emerald-700">
              NaijaCampus is running directly on your device. You can launch it anytime from your phone&apos;s home screen.
            </p>
          </div>
        )}

        {/* State 2: Direct Install Button Available (Android Chrome / Edge / Desktop) */}
        {!isInstalled && isInstallable && (
          <div className="space-y-3">
            <button
              onClick={handleInstallClick}
              className="w-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 text-sm transition cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Install / Download App to Phone</span>
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Tap the button above &amp; confirm <strong>&quot;Install&quot;</strong> on your phone.
            </p>
          </div>
        )}

        {/* State 3: iOS Safari (iPhone / iPad) Instructions */}
        {!isInstalled && isIOS && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h4 className="font-black text-xs text-slate-900 uppercase tracking-wide">
                How to Install on iPhone / iPad (Safari):
              </h4>
            </div>
            <ol className="text-xs text-slate-600 space-y-2 pl-1 font-medium">
              <li className="flex items-start gap-2">
                <span className="bg-slate-200 text-slate-800 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline text-blue-600" /> at the bottom of your Safari screen.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-slate-200 text-slate-800 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong> <PlusSquare className="w-3.5 h-3.5 inline text-slate-700" />.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-slate-200 text-slate-800 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Tap <strong>&quot;Add&quot;</strong> in the top-right corner. Done!
                </span>
              </li>
            </ol>
          </div>
        )}

        {/* State 4: Generic Fallback Instructions (Android Chrome manual prompt if deferredPrompt hasn't fired) */}
        {!isInstalled && !isIOS && !isInstallable && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>Easy 2-Step Android &amp; Phone Install:</span>
            </h4>
            <div className="text-xs text-slate-600 space-y-2 font-medium">
              <div className="flex items-start gap-2">
                <span className="bg-emerald-100 text-emerald-900 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Tap the <strong>three dots (⋮)</strong> menu in the top-right corner of your browser.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-emerald-100 text-emerald-900 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              The NaijaCampus green portal icon will be downloaded directly to your phone screen!
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
