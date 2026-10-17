import React, { useState } from 'react';
import { Settings, Check, ExternalLink, X, DollarSign, ShieldCheck, Layers, Clock } from 'lucide-react';

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLink: string;
  secondaryLink?: string;
  adStrategy?: 'monetag_only' | 'alternating';
  onSaveLinks: (monetagLink: string, secondaryLink: string, strategy: 'monetag_only' | 'alternating') => void;
  triggerCount: number;
  dwellMinutes?: number;
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  isOpen,
  onClose,
  currentLink,
  secondaryLink = '',
  adStrategy = 'alternating',
  onSaveLinks,
  triggerCount,
  dwellMinutes = 0,
}) => {
  const [monetagInput, setMonetagInput] = useState(currentLink);
  const [secondaryInput, setSecondaryInput] = useState(secondaryLink);
  const [strategy, setStrategy] = useState<'monetag_only' | 'alternating'>(adStrategy);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLinks(monetagInput.trim(), secondaryInput.trim(), strategy);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-lg w-full p-5 sm:p-6 text-slate-900 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl hover:bg-slate-100 transition cursor-pointer active:scale-95"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Multi-Ad Platform Controller</h3>
            <p className="text-xs text-slate-500">Monetag &amp; Alternative Networks (Adsterra, PropellerAds)</p>
          </div>
        </div>

        {/* Real-time Earnings & Dwell Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs">
            <span className="text-emerald-900 font-semibold block">Total Impressions:</span>
            <strong className="text-emerald-800 font-mono text-base">{triggerCount} views</strong>
            <p className="text-[10px] text-emerald-600 mt-0.5">Actions + study dwell views</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
            <div className="flex items-center gap-1 text-amber-900 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Study Dwell Time:</span>
            </div>
            <strong className="text-amber-800 font-mono text-base">{dwellMinutes} mins</strong>
            <p className="text-[10px] text-amber-700 mt-0.5">Earns passive CPM in app</p>
          </div>
        </div>



        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Primary Network: Monetag */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Primary Platform: Monetag Direct Link
            </label>
            <input
              type="url"
              required
              value={monetagInput}
              onChange={(e) => setMonetagInput(e.target.value)}
              placeholder="https://uplcm.com/4/11981826"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-hidden focus:border-emerald-700"
            />
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Default: <code className="text-emerald-800 font-bold">uplcm.com/4/11981826</code></span>
              <a
                href="https://publishers.monetag.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-800 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Monetag Login</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Secondary Network: Adsterra / PropellerAds */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Secondary Platform: Adsterra / PropellerAds / Backup Link</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-normal">Optional</span>
            </label>
            <input
              type="url"
              value={secondaryInput}
              onChange={(e) => setSecondaryInput(e.target.value)}
              placeholder="https://... (e.g. Adsterra Direct Link or PropellerAds SmartLink)"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-hidden focus:border-emerald-700"
            />
            <p className="text-[11px] text-slate-500">
              Link another ad network so if Monetag has shown an ad or user blocks one, the backup platform runs seamlessly!
            </p>
          </div>

          {/* Traffic Distribution Strategy */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Multi-Platform Rotation Mode</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setStrategy('alternating')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  strategy === 'alternating'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span className="block font-bold text-xs">Dual Waterfall (50/50)</span>
                <span className="text-[10px] text-slate-500 block">Alternate Monetag &amp; Secondary Network</span>
              </button>

              <button
                type="button"
                onClick={() => setStrategy('monetag_only')}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  strategy === 'monetag_only'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span className="block font-bold text-xs">Monetag Exclusive</span>
                <span className="text-[10px] text-slate-500 block">100% traffic to your Monetag link</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
              <span>{isSaved ? 'Saved Settings!' : 'Save Ad Networks'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
