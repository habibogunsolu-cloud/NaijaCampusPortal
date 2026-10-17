import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Bell, Sparkles, Award, Laptop, Home, Gift } from 'lucide-react';
import { safeOpenAdLink } from '../utils/safeOpen';
import { trackAdClick } from '../utils/analyticsTracker';

interface InPagePushAdProps {
  monetagLink?: string;
  secondaryAdLink?: string;
  adStrategy?: 'monetag_only' | 'alternating';
  onAdTriggered?: (placement: string) => void;
}

interface AdCreative {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  iconType: 'scholarship' | 'laptop' | 'hostel' | 'grant';
  accentColor: string;
}

const AD_CREATIVES: AdCreative[] = [
  {
    id: 'nelfund_grant',
    category: 'Federal Student Aid',
    title: '🎓 ₦250k NELFUND Student Upkeep & Tuition Bursary',
    description: 'Freshers & 100L admission clearance support grant. Check faculty eligibility list.',
    ctaText: 'Claim Bursary',
    iconType: 'scholarship',
    accentColor: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'campus_laptop',
    category: 'Student Tech Deal',
    title: '💻 Subsidized Student Laptops & 5G Data Mifi',
    description: 'Certified student pricing for university coursework, programming & assignments.',
    ctaText: 'Check Devices',
    iconType: 'laptop',
    accentColor: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'campus_hostels',
    category: 'Campus Accommodation',
    title: '🏠 Verified Off-Campus Bedspaces & Hostels',
    description: 'Pre-screened rooms 5 mins from campus gate. Zero agent inspection charges.',
    ctaText: 'View Hostels',
    iconType: 'hostel',
    accentColor: 'from-amber-600 to-orange-700',
  },
  {
    id: 'health_prep',
    category: 'Medical & Science Aid',
    title: '🩺 MBBS & Health Sciences Free Stethoscope & Lab Pack',
    description: 'Sponsored clinical starter kits for newly admitted 100L medical students.',
    ctaText: 'Apply Free',
    iconType: 'grant',
    accentColor: 'from-rose-600 to-pink-700',
  },
];

export const InPagePushAd: React.FC<InPagePushAdProps> = ({
  monetagLink = 'https://uplcm.com/4/11981826',
  secondaryAdLink = '',
  adStrategy = 'alternating',
  onAdTriggered,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isDismissedPermanently, setIsDismissedPermanently] = useState(false);

  // Show after initial 4 seconds only if not dismissed this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem('naija_in_page_ad_dismissed_session') === 'true') {
        return;
      }
    } catch {}

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || isDismissedPermanently) return null;

  const currentAd = AD_CREATIVES[currentAdIndex];

  const handleAdClick = () => {
    let targetUrl = monetagLink;
    if (secondaryAdLink && adStrategy === 'alternating') {
      targetUrl = Math.random() > 0.5 ? monetagLink : secondaryAdLink;
    }

    if (targetUrl) {
      safeOpenAdLink(targetUrl);
      trackAdClick(`in_page_push_${currentAd.id}`);
      if (onAdTriggered) {
        onAdTriggered(`in_page_push_${currentAd.id}`);
      }
    }

    // Dismiss for this session upon clicking
    setIsVisible(false);
    try {
      sessionStorage.setItem('naija_in_page_ad_dismissed_session', 'true');
    } catch {}
  };

  const handleClose = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    try {
      sessionStorage.setItem('naija_in_page_ad_dismissed_session', 'true');
    } catch {}
  };

  const renderIcon = () => {
    switch (currentAd.iconType) {
      case 'laptop':
        return <Laptop className="w-5 h-5 text-white" />;
      case 'hostel':
        return <Home className="w-5 h-5 text-white" />;
      case 'grant':
        return <Gift className="w-5 h-5 text-white" />;
      case 'scholarship':
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <aside
      aria-label="Sponsored In-Page Notification"
      className="fixed top-18 sm:top-20 right-3 sm:right-5 z-40 max-w-[340px] sm:max-w-sm w-full bg-slate-900/98 text-white border border-amber-400/70 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 duration-300 select-none"
    >
      <div className="flex items-start gap-3">
        {/* Ad Icon Graphic */}
        <div
          onClick={handleAdClick}
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${currentAd.accentColor} flex items-center justify-center shrink-0 shadow-md cursor-pointer hover:opacity-90 transition`}
        >
          {renderIcon()}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5" onClick={handleAdClick}>
              <span className="bg-amber-400 text-slate-950 font-black text-[9px] uppercase px-1.5 py-0.2 rounded font-mono">
                Ad • Sponsored
              </span>
              <span className="text-[10px] text-amber-300 font-bold truncate">
                {currentAd.category}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose(e);
              }}
              className="text-slate-400 hover:text-white p-2.5 -mr-2 -mt-2 rounded-xl hover:bg-slate-800 transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center active:scale-90"
              aria-label="Close Ad"
              title="Close Ad"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div onClick={handleAdClick} className="cursor-pointer">
            <h5 className="text-xs font-black text-white mt-1 leading-snug line-clamp-1 hover:text-amber-300 transition">
              {currentAd.title}
            </h5>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug line-clamp-2">
              {currentAd.description}
            </p>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[9px] text-slate-400 font-mono">
              Verified Partner
            </span>
            <button
              type="button"
              onClick={handleAdClick}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] px-3 py-1 rounded-lg flex items-center gap-1 shadow-xs transition cursor-pointer active:scale-95"
            >
              <span>{currentAd.ctaText}</span>
              <ExternalLink className="w-3 h-3 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
