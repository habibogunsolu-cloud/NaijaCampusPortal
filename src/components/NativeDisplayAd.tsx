import React, { useState } from 'react';
import { ExternalLink, Star, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { safeOpenAdLink } from '../utils/safeOpen';
import { trackAdClick } from '../utils/analyticsTracker';

interface NativeDisplayAdProps {
  placement?: string;
  monetagLink?: string;
  secondaryAdLink?: string;
  adStrategy?: 'monetag_only' | 'alternating';
  onAdTriggered?: (placement: string) => void;
  variant?: 'card' | 'banner' | 'compact';
}

interface DisplayOffer {
  badge: string;
  sponsorName: string;
  rating: number;
  title: string;
  tagline: string;
  ctaText: string;
  domainUrl: string;
  accentBg: string;
}

const OFFERS: DisplayOffer[] = [
  {
    badge: 'Trending Sponsor',
    sponsorName: 'Federal Education Bursary',
    rating: 4.9,
    title: '🎓 2026/2027 Undergraduate Scholarship & Loan Scheme',
    tagline: 'Direct financial grants for Nigerian 100L university & polytechnic freshers. Check eligibility list.',
    ctaText: 'Apply For Grant',
    domainUrl: 'scholarship-bursary.ng/portal',
    accentBg: 'from-emerald-950 via-slate-900 to-emerald-900',
  },
  {
    badge: 'Verified Deal',
    sponsorName: 'CampusTech Direct',
    rating: 4.8,
    title: '💻 Certified Refurbished HP/Dell Laptops for Undergrads',
    tagline: 'Discounted Core i5 & Core i7 laptops with 1-year warranty and free delivery to all campus gates.',
    ctaText: 'View Discount Deals',
    domainUrl: 'campustech.ng/deals',
    accentBg: 'from-blue-950 via-slate-900 to-indigo-950',
  },
  {
    badge: 'Popular Service',
    sponsorName: 'SafeHostel NG',
    rating: 4.9,
    title: '🏠 Verified Off-Campus Bedspaces & Hostels in Abeokuta & Nationwide',
    tagline: 'Rent genuine student rooms close to school with constant water & power. Verified owners only.',
    ctaText: 'Find Bedspace',
    domainUrl: 'safehostels.ng/campus',
    accentBg: 'from-amber-950 via-slate-900 to-amber-900',
  },
];

export const NativeDisplayAd: React.FC<NativeDisplayAdProps> = ({
  placement = 'feed_display_ad',
  monetagLink = 'https://uplcm.com/4/11981826',
  secondaryAdLink = '',
  adStrategy = 'alternating',
  onAdTriggered,
  variant = 'card',
}) => {
  // Pick an offer based on placement string or random
  const [offer] = useState(() => {
    const idx = Math.floor(Math.random() * OFFERS.length);
    return OFFERS[idx];
  });

  const handleClick = () => {
    let targetLink = monetagLink;
    if (secondaryAdLink && adStrategy === 'alternating') {
      targetLink = Math.random() > 0.5 ? monetagLink : secondaryAdLink;
    }

    if (targetLink) {
      safeOpenAdLink(targetLink);
      trackAdClick(`display_ad_${placement}`);
      if (onAdTriggered) {
        onAdTriggered(`display_ad_${placement}`);
      }
    }
  };

  if (variant === 'compact') {
    return (
      <aside
        aria-label="Sponsored In-App Promotion"
        onClick={handleClick}
        className="bg-white border border-slate-300 hover:border-emerald-600 rounded-2xl p-3 shadow-xs transition cursor-pointer flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="bg-amber-400 text-slate-950 font-black text-[9px] uppercase px-1.5 py-0.5 rounded font-mono shrink-0">
            Ad
          </span>
          <div className="min-w-0">
            <h5 className="text-xs font-black text-slate-900 truncate group-hover:text-emerald-800 transition">
              {offer.title}
            </h5>
            <span className="text-[10px] text-slate-500 font-mono truncate block">
              {offer.domainUrl} &bull; {offer.sponsorName}
            </span>
          </div>
        </div>
        <div className="bg-emerald-950 group-hover:bg-emerald-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1 shadow-xs transition">
          <span>{offer.ctaText}</span>
          <ExternalLink className="w-3 h-3 text-amber-400" />
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Sponsored Display Promotion"
      onClick={handleClick}
      className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-5 sm:p-6 shadow-md transition cursor-pointer relative overflow-hidden group select-none"
    >
      {/* Top Header Tag */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-md font-mono tracking-wider">
            Ad &bull; Sponsored
          </span>
          <span className="text-xs text-amber-200 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{offer.sponsorName}</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="font-bold">{offer.rating}</span>
          <span className="text-slate-400 text-[10px] font-mono">/ 5.0</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="inline-block bg-white/10 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
            {offer.badge}
          </div>
          <h4 className="text-sm sm:text-base font-black text-white leading-snug group-hover:text-amber-300 transition">
            {offer.title}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            {offer.tagline}
          </p>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <span>Visit site: {offer.domainUrl}</span>
          </span>
        </div>

        {/* CTA Button */}
        <div className="w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
          <div className="w-full sm:w-auto bg-amber-400 group-hover:bg-amber-300 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition">
            <span>{offer.ctaText}</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
