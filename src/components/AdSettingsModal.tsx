import React, { useState } from 'react';
import { Settings, Check, ExternalLink, X, DollarSign, ShieldCheck } from 'lucide-react';

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLink: string;
  onSaveLink: (newLink: string) => void;
  triggerCount: number;
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  isOpen,
  onClose,
  currentLink,
  onSaveLink,
  triggerCount,
}) => {
  const [linkInput, setLinkInput] = useState(currentLink);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLink(linkInput.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Monetag Ad Link Controller</h3>
            <p className="text-xs text-slate-500">Your direct earning link</p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-4 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-emerald-900 font-semibold">Active Ad Triggers (This Session):</span>
            <strong className="text-emerald-800 font-mono text-sm">{triggerCount} views</strong>
          </div>
          <p className="text-[11px] text-emerald-700">
            Every time a student downloads a card or checks cut-offs, your Monetag link is credited.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Monetag Direct Ad Link
            </label>
            <input
              type="url"
              required
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://uplcm.com/4/11981826"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-mono focus:outline-hidden focus:border-emerald-700"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Default: <code className="text-emerald-800 font-bold">https://uplcm.com/4/11981826</code>
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://publishers.monetag.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-800 hover:underline flex items-center gap-1 font-bold"
            >
              <span>Check Monetag Balance</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="submit"
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4" /> : null}
              <span>{isSaved ? 'Saved!' : 'Update Ad Link'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
