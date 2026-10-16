import React, { useRef, useState } from 'react';
import { CourseItem } from '../data/jambData';
import { Download, Share2, CheckCircle2, Award, Shield, Sparkles, Check, BookmarkCheck, Bookmark } from 'lucide-react';
import { getSafeShareUrl, openWhatsAppShare } from '../utils/shareUtils';
import { trackAdClick } from '../utils/analyticsTracker';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface AdmissionCardCanvasProps {
  candidateName: string;
  course: CourseItem;
  jambScore: number;
  monetagLink: string;
  onAdTriggered: () => void;
}

export const AdmissionCardCanvas: React.FC<AdmissionCardCanvasProps> = ({
  candidateName,
  course,
  jambScore,
  monetagLink,
  onAdTriggered,
}) => {
  const [flyerMode, setFlyerMode] = useState<'official' | 'matric'>('official');
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isSlipSaved, setIsSlipSaved] = useState(false);

  const handleSaveSlip = async () => {
    const newSlip = {
      id: 'slip_' + Date.now(),
      courseName: course.name,
      score: jambScore,
      date: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString(),
    };

    // 1. Save to local storage for instant offline/Vercel zero-config access
    try {
      const existing = JSON.parse(localStorage.getItem('naija_saved_slips') || '[]');
      const filtered = existing.filter((s: { courseName: string; score: number }) => s.courseName !== course.name || s.score !== jambScore);
      const updated = [newSlip, ...filtered].slice(0, 20);
      localStorage.setItem('naija_saved_slips', JSON.stringify(updated));
    } catch {
      // ignore local storage errors
    }

    // 2. Also save to Firebase Firestore if logged in
    try {
      if (auth.currentUser) {
        await addDoc(collection(db, 'saved_slips'), {
          userId: auth.currentUser.uid,
          courseName: course.name,
          jambScore: jambScore,
          createdAt: new Date().toISOString(),
        });
      }
    } catch {
      // ignore
    }

    setIsSlipSaved(true);
    setTimeout(() => setIsSlipSaved(false), 2500);
  };

  const getStatus = (score: number, comp: number, min: number) => {
    if (score >= comp) {
      return {
        label: 'HIGH ADMISSION PROBABILITY (SAFE MERIT CUT-OFF)',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-300',
        badge: 'CONFIRMED ELIGIBLE CANDIDATE',
      };
    } else if (score >= min) {
      return {
        label: 'COMPETITIVE STANDING (HIGH POST-UTME SCREENING REQUIRED)',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        badge: 'ADMISSIBLE ON CATCHMENT / POST-UTME',
      };
    } else {
      return {
        label: 'BELOW GENERAL MERIT (RECOMMENDED FOR CHANGE OF COURSE)',
        color: 'text-rose-800 bg-rose-50 border-rose-300',
        badge: 'SUPPLEMENTARY / POLYTECHNIC OPTION',
      };
    }
  };

  const status = getStatus(jambScore, course.competitiveScore, course.minimumScore);

  // Render Image on Canvas and return as Blob
  const generateCanvasBlob = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 700;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);

      if (flyerMode === 'official') {
        // Official Slip Background
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 1000, 700);

        // Header Band - Emerald Green
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(0, 0, 1000, 120);

        // Gold Accent Line
        ctx.fillStyle = '#d97706';
        ctx.fillRect(0, 115, 1000, 5);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('NAIJACAMPUS ADMISSION GUIDE', 50, 55);

        ctx.fillStyle = '#a7f3d0';
        ctx.font = '16px sans-serif';
        ctx.fillText('OFFICIAL UTME & WAEC ELIGIBILITY VERIFICATION SLIP · NIGERIA', 50, 85);

        // Border
        ctx.strokeStyle = '#064e3b';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, 960, 660);

        // Candidate Details
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('CANDIDATE ADMISSION RECORD', 50, 165);

        ctx.fillStyle = '#334155';
        ctx.font = '16px sans-serif';
        ctx.fillText(`Name: ${candidateName || 'Naija Student'}`, 50, 195);
        ctx.fillText(`UTME Score: ${jambScore} / 400`, 50, 225);
        ctx.fillText(`Proposed Degree: ${course.name}`, 50, 255);
        ctx.fillText(`Faculty: ${course.faculty}`, 50, 285);

        // 4 JAMB Subjects Box
        ctx.fillStyle = '#ecfdf5';
        ctx.fillRect(50, 315, 900, 110);
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(50, 315, 900, 110);

        ctx.fillStyle = '#065f46';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('VERIFIED 4 JAMB UTME SUBJECT COMBINATION', 70, 345);

        ctx.fillStyle = '#047857';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(course.jambSubjects.join('   •   '), 70, 385);

        // Status Callout
        ctx.fillStyle = jambScore >= course.competitiveScore ? '#059669' : '#d97706';
        ctx.fillRect(50, 450, 900, 50);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 17px sans-serif';
        ctx.fillText(`ELIGIBILITY BENCHMARK: ${status.label}`, 70, 482);

        // WAEC Requirements
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText('MANDATORY 5 O’LEVEL CREDITS (WAEC / NECO / NABTEB):', 50, 535);

        ctx.fillStyle = '#475569';
        ctx.font = '14px sans-serif';
        ctx.fillText(course.waecCredits.join(', '), 50, 565);

        // Footer
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(50, 610);
        ctx.lineTo(950, 610);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('Verified against JAMB Official Brochure & Tertiary Standards', 50, 640);
        ctx.fillText(`Date: ${new Date().toLocaleDateString('en-GB')}`, 800, 640);
      } else {
        // Matriculation Anticipation Flyer (Viral Faith / Dream Flyer)
        ctx.fillStyle = '#022c22';
        ctx.fillRect(0, 0, 1000, 700);

        // Gold Decorative Border
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 6;
        ctx.strokeRect(30, 30, 940, 640);

        // Header
        ctx.fillStyle = '#fef3c7';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('🎓 2026/2027 MATRICULATION ANTICIPATION FLYER', 160, 90);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText(candidateName ? candidateName.toUpperCase() : 'FUTURE SCHOLAR', 100, 220);

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(`PROSPECTIVE ${course.name.toUpperCase()} SCHOLAR`, 100, 275);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '20px sans-serif';
        ctx.fillText(`Target UTME Benchmark: ${jambScore} Points`, 100, 340);
        ctx.fillText(`Faculty of ${course.faculty}`, 100, 380);

        // Faith Stamp Badge
        ctx.fillStyle = '#10b981';
        ctx.fillRect(100, 440, 420, 65);
        ctx.fillStyle = '#022c22';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('ADMITTED BY GOD’S GRACE 🙏', 120, 480);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px sans-serif';
        ctx.fillText('Generated via NaijaCampus Admission Portal · Check your admission free', 100, 620);
      }

      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  // Download Slip PNG File
  const handleDownload = async () => {
    try {
      const blob = await generateCanvasBlob();
      if (!blob) return;

      // Trigger Monetag in background via safe link click
      if (monetagLink) {
        try {
          const adA = document.createElement('a');
          adA.href = monetagLink;
          adA.target = '_blank';
          adA.rel = 'noopener noreferrer';
          document.body.appendChild(adA);
          adA.click();
          document.body.removeChild(adA);
          onAdTriggered();
          trackAdClick('admission_card');
        } catch (adErr) {
          console.warn('Ad link click handled:', adErr);
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `JAMB_Slip_${course.name.replace(/\s+/g, '_')}_${jambScore}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('Download slip handled:', err);
    }
  };

  // Share using Web Share API (with File for WhatsApp Status & Direct Chat)
  const handleShareToWhatsApp = async () => {
    setIsSharing(true);
    try {
      const blob = await generateCanvasBlob();
      const publicUrl = getSafeShareUrl();

      const shareText =
        `🎓 *ALL-IN-ONE NIGERIAN ADMISSION REPORT*\n` +
        `_JAMB UTME • WAEC • NECO • Course Cut-Offs_\n\n` +
        `👤 *Candidate:* ${candidateName || 'Candidate'}\n` +
        `🎯 *Proposed Degree:* ${course.name} (${course.faculty})\n` +
        `📊 *UTME Score:* ${jambScore} / 400\n` +
        `🎯 *Course Benchmark Cut-Off:* Merit: ${course.competitiveScore} | Min: ${course.minimumScore}\n\n` +
        `📚 *Compulsory 4 JAMB Subjects:*\n${course.jambSubjects.map(s => '  • ' + s).join('\n')}\n\n` +
        `📝 *Mandatory 5 O'Level Credits (WAEC/NECO/NABTEB):*\n  ${course.waecCredits.join(', ')}\n\n` +
        `🏆 *Admission Status:* ${status.badge}\n\n` +
        `Check your own official combos, course cut-offs & practice guides free here:\n${publicUrl}`;

      // Check if browser supports sharing files without crashing
      if (blob && typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        try {
          const file = new File([blob], 'admission_slip.png', { type: 'image/png' });
          const shareData = {
            title: 'JAMB • WAEC • NECO Admission Verification Slip',
            text: shareText,
            files: [file],
          };

          if (typeof navigator.canShare === 'function' && navigator.canShare(shareData)) {
            await navigator.share(shareData);
            setIsSharing(false);
            return;
          }
        } catch (e) {
          console.log('File share not permitted or canceled:', e);
        }
      }

      // Safe Fallback: Download image directly if possible
      if (blob) {
        try {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Admission_Report_${course.name.replace(/\s+/g, '_')}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (dlErr) {
          console.warn('Canvas direct download fallback:', dlErr);
        }
      }

      // Open WhatsApp safely with formatted text
      openWhatsAppShare(shareText);
    } catch (err) {
      console.warn('Share to WhatsApp handled safely:', err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher */}
      <div className="flex bg-slate-200 p-1 rounded-xl text-xs font-bold max-w-md mx-auto">
        <button
          onClick={() => setFlyerMode('official')}
          className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
            flyerMode === 'official'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          📋 Official Eligibility Slip
        </button>
        <button
          onClick={() => setFlyerMode('matric')}
          className={`flex-1 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
            flyerMode === 'matric'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>🎓 Dream Matric Flyer</span>
        </button>
      </div>

      {/* Visual Preview on Screen */}
      {flyerMode === 'official' ? (
        <div className="bg-white border-2 border-emerald-900 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-emerald-800/20 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-black shadow-md shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase block">
                  Republic of Nigeria · Higher Education Advisory
                </span>
                <h3 className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight">
                  Official UTME & WAEC Eligibility Slip
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] font-semibold text-slate-500 block">Candidate Score</span>
              <span className="text-2xl font-black text-emerald-900 font-mono">
                {jambScore} <span className="text-xs font-normal text-slate-600">/ 400</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-xs">
            <div>
              <span className="text-slate-500 block font-medium">Candidate Name:</span>
              <strong className="text-sm text-slate-900">{candidateName || 'Naija Student'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Faculty:</span>
              <strong className="text-sm text-slate-900">{course.faculty}</strong>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 block font-medium">Degree Course:</span>
              <strong className="text-base sm:text-lg text-emerald-950 font-black">{course.name}</strong>
            </div>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-4 my-2">
            <div className="flex items-center gap-2 mb-2 text-emerald-900 font-bold text-xs">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span>4 COMPULSORY JAMB SUBJECTS:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {course.jambSubjects.map((sub, idx) => (
                <div key={idx} className="bg-white border border-emerald-200 rounded-lg p-2.5 text-center shadow-xs">
                  <span className="text-[10px] text-slate-400 font-mono block">#{idx + 1}</span>
                  <span className="text-xs font-bold text-slate-900">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`border rounded-xl p-3 my-3 text-xs flex items-center gap-2.5 ${status.color}`}>
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-bold">{status.label}</span>
          </div>

          <div className="pt-2 text-xs space-y-1.5 text-slate-700">
            <div>
              <strong className="text-slate-900">5 Required WAEC/NECO Credits: </strong>
              <span>{course.waecCredits.join(', ')}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Dream Matric Flyer Preview */
        <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 border-4 border-amber-500 rounded-2xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="text-xs font-black tracking-widest text-amber-400 uppercase">
            🎓 Official 2026/2027 Matriculation Declaration
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            {candidateName || 'CHINEDU OKAFOR'}
          </h2>

          <div className="text-base sm:text-xl font-bold text-emerald-400">
            PROSPECTIVE {course.name.toUpperCase()} SCHOLAR
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Faculty of {course.faculty} &bull; Target UTME Benchmark: {jambScore}+ Points
          </p>

          <div className="inline-block bg-emerald-500/20 border border-emerald-400 text-emerald-300 px-6 py-2 rounded-full font-black text-sm shadow-lg">
            ADMITTED BY GOD’S GRACE 🙏
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800">
            NaijaCampus Official Aspirant Stamp &bull; Verified Academic Goal
          </div>
        </div>
      )}

      {/* Action Buttons: Native Share Sheet, Save to Profile, & Download */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <button
          onClick={handleShareToWhatsApp}
          disabled={isSharing}
          className="bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
        >
          <Share2 className="w-4 h-4 stroke-[2.5]" />
          <span>{isSharing ? 'Preparing Image...' : 'Share to WhatsApp'}</span>
        </button>

        <button
          onClick={handleSaveSlip}
          disabled={isSlipSaved}
          className={`${
            isSlipSaved
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950'
          } font-black py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer`}
        >
          {isSlipSaved ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Saved to Profile!</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4" />
              <span>Save Slip to Profile</span>
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Slip (PNG)</span>
        </button>
      </div>
    </div>
  );
};
