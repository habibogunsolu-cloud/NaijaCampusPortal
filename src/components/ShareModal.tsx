import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  Building2,
  BookOpen,
  GraduationCap,
  Sparkles,
  FileText,
  ExternalLink,
} from 'lucide-react';
import {
  getSafeShareUrl,
  buildFreshersShareMessage,
  buildGeneralPortalShareMessage,
  buildSchoolCutOffShareMessage,
  buildReadHubShareMessage,
  buildOLevelGuideShareMessage,
  buildCounselorAdviceShareMessage,
  openWhatsAppShare,
  copyTextToClipboard,
  shareNativeOrFallback,
} from '../utils/shareUtils';
import type { UniversityItem, CourseCutOff } from '../data/jambData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'freshers' | 'all' | 'counselor' | 'cutoffs' | 'readhub' | 'olevel';
  targetUniversity?: UniversityItem | null;
  targetCourse?: CourseCutOff | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'freshers',
  targetUniversity,
  targetCourse,
}) => {
  const [activeTab, setActiveTab] = useState<'freshers' | 'all' | 'counselor' | 'cutoffs' | 'readhub' | 'olevel'>(
    targetUniversity ? 'cutoffs' : initialCategory
  );
  const [copiedType, setCopiedType] = useState<'full' | 'link' | null>(null);

  if (!isOpen) return null;

  const publicUrl = getSafeShareUrl();

  // Determine current share text based on selected tab and target data
  const getActiveText = (): string => {
    switch (activeTab) {
      case 'freshers':
        return buildFreshersShareMessage();
      case 'counselor':
        return buildCounselorAdviceShareMessage();
      case 'cutoffs':
        if (targetUniversity) {
          return buildSchoolCutOffShareMessage(targetUniversity, targetCourse || undefined);
        }
        return (
          `🏛️ *ALL NIGERIAN UNIVERSITIES & POLYTECHNICS CUT-OFF DIRECTORY*\n` +
          `_Official JAMB Merit & Catchment Cut-Off Marks for Federal, State, and Private Institutions_\n\n` +
          `🔍 Search course cut-offs, state catchment bonuses, and UTME subject combinations free here:\n` +
          `${publicUrl}`
        );
      case 'readhub':
        return buildReadHubShareMessage();
      case 'olevel':
        return buildOLevelGuideShareMessage();
      case 'all':
      default:
        return buildGeneralPortalShareMessage();
    }
  };

  const currentText = getActiveText();

  const handleCopyFullText = async () => {
    const success = await copyTextToClipboard(currentText);
    if (success) {
      setCopiedType('full');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleCopyLinkOnly = async () => {
    const success = await copyTextToClipboard(publicUrl);
    if (success) {
      setCopiedType('link');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleWhatsApp = () => {
    openWhatsAppShare(currentText);
  };

  const handleNativeShare = async () => {
    await shareNativeOrFallback({
      title: 'NaijaCampus All-in-One Exam & Admission Portal',
      text: currentText,
      url: publicUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-white">Share Exam &amp; Admission Portal</h3>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  JAMB • WAEC • NECO
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Share verified cut-offs, combos, and practice guides with classmates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="min-w-[40px] min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer active:scale-95"
            aria-label="Close Share Modal"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex flex-wrap gap-1.5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('freshers')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'freshers'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>100L Freshers &amp; Clearance 🎓</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>All Exams Portal</span>
          </button>

          <button
            onClick={() => setActiveTab('counselor')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'counselor'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Counselor Chioma 🎓</span>
          </button>

          <button
            onClick={() => setActiveTab('cutoffs')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'cutoffs'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {targetUniversity ? `${targetUniversity.code} Cut-Offs` : 'Course Cut-Offs'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('olevel')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'olevel'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>WAEC / NECO Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('readhub')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'readhub'
                ? 'bg-emerald-950 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Hub</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Target Highlight Banner if sharing a specific school/course */}
          {activeTab === 'cutoffs' && targetUniversity && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-emerald-950 block">
                  Sharing specific cut-offs for: {targetUniversity.name} ({targetUniversity.code})
                </span>
                {targetCourse && (
                  <span className="text-emerald-800 font-medium block mt-0.5">
                    Course: <strong>{targetCourse.courseName}</strong> (Merit: {targetCourse.meritCutOff}
                    {targetCourse.catchmentCutOff ? ` • Catchment: ${targetCourse.catchmentCutOff}` : ''})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Live WhatsApp &amp; Message Preview
              </span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ready to Send
              </span>
            </div>
            <div className="bg-slate-900 text-emerald-200/90 rounded-xl p-3.5 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto border border-slate-800 shadow-inner">
              {currentText}
            </div>
          </div>

          {/* Verified Public Link Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Official Portal Share Link:
              </span>
              <span className="text-xs font-mono text-slate-800 truncate block font-bold">
                {publicUrl}
              </span>
            </div>
            <button
              onClick={handleCopyLinkOnly}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer shrink-0"
            >
              {copiedType === 'link' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link Only</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-2.5">
          {/* WhatsApp Direct Button */}
          <button
            onClick={handleWhatsApp}
            className="w-full sm:flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>Share to WhatsApp</span>
          </button>

          {/* Native Mobile Share (if available on phone/tablet) */}
          <button
            onClick={handleNativeShare}
            className="w-full sm:flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via Phone Apps</span>
          </button>

          {/* Copy Full Message */}
          <button
            onClick={handleCopyFullText}
            className={`w-full sm:w-auto font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border transition cursor-pointer ${
              copiedType === 'full'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            {copiedType === 'full' ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-800">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
