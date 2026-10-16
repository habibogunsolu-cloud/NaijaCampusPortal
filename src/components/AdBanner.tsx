import React, { useState } from 'react';
import { ExternalLink, Sparkles, Award, Zap, X, ShieldCheck } from 'lucide-react';
import { safeOpenAdLink } from '../utils/safeOpen';
import { trackAdClick } from '../utils/analyticsTracker';

interface AdBannerProps {
  placement?: 'leaderboard' | 'mid_content' | 'cbt_hall' | 'floating_bottom';
  monetagLink?: string;
  secondaryAdLink?: string;
  adStrategy?: 'monetag_only' | 'alternating';
  onAdTriggered?: (placement: string) => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement = 'leaderboard',
  monetagLink = 'https://uplcm.com/4/11981826',
  secondaryAdLink = '',
  adStrategy = 'alternating',
  onAdTriggered,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleBannerClick = () => {
    // Choose active ad network
    let targetLink = monetagLink;
    if (secondaryAdLink && adStrategy === 'alternating') {
      const toggle = Math.random() > 0.5;
      targetLink = toggle ? monetagLink : secondaryAdLink;
    }

    if (targetLink) {
      safeOpenAdLink(targetLink);
      trackAdClick(`banner_${placement}`);
      if (onAdTriggered) {
        onAdTriggered(`banner_${placement}`);
      }
    }
  };

  // 1. TOP LEADERBOARD BANNER
  if (placement === 'leaderboard') {
    return (
      <div className="w-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 border-y border-amber-500/40 text-white px-3 py-2.5 sm:py-3 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 text-center sm:text-left min-w-0">
            <span className="bg-amber-400 text-slate-950 font-black text-[9px] uppercase px-1.5 py-0.5 rounded tracking-wider shrink-0 font-mono">
              Sponsored
            </span>
            <p className="text-xs sm:text-sm font-bold text-amber-200 leading-snug truncate">
              🎓 2026/2027 Tertiary Scholarship Grants &amp; Federal Bursary Scheme Open
            </p>
          </div>

          <button
            onClick={handleBannerClick}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer shrink-0"
          >
            <span>Check Grant Portal</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  }

  // 2. MID-CONTENT BANNER (Between Course Directory / Cut-offs)
  if (placement === 'mid_content') {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden my-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[10px] font-black uppercase font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">
            Verified Partner Ad
          </span>
          <span className="text-[10px] text-amber-700 font-medium">Educational Support</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Direct Entry &amp; Tertiary Admission Guide Pack</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              Access verified past question solutions, Post-UTME screening models, and accredited university departmental cut-off requirements for all faculties.
            </p>
          </div>

          <button
            onClick={handleBannerClick}
            className="w-full sm:w-auto bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-amber-400/50 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer shrink-0"
          >
            <span>Access Study Pack</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    );
  }

  // 3. CBT HALL SPONSOR BANNER
  if (placement === 'cbt_hall') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-white shadow-md my-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-mono">
            ★ Candidate Study Grant Partner
          </span>
          <span className="text-[10px] text-slate-400">Sponsored Notice</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-200 leading-snug text-center sm:text-left">
            Need high-speed exam preparation? Check certified WAEC/JAMB 2020–2026 full syllabus cheat-sheets and trap warnings.
          </p>
          <button
            onClick={handleBannerClick}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Open Syllabus</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. FLOATING BOTTOM STICKY MINI-BANNER
  if (placement === 'floating_bottom') {
    return (
      <div className="fixed bottom-16 sm:bottom-18 inset-x-2 sm:inset-x-auto sm:right-4 z-40 max-w-sm bg-slate-950/95 backdrop-blur-md text-white border border-amber-500/60 rounded-2xl p-3 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded font-mono uppercase">
              Ad
            </span>
            <span className="text-[11px] font-bold text-amber-300">Tertiary Student Grant Alert</span>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
            title="Dismiss Ad Banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-slate-300 mt-1 leading-snug">
          Federal &amp; State Student Financial Aid applications are open for {new Date().getFullYear()} admission candidates.
        </p>

        <div className="mt-2 flex items-center justify-end gap-2">
          <button
            onClick={handleBannerClick}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-1.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <span>Verify Eligibility</span>
            <ExternalLink className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
