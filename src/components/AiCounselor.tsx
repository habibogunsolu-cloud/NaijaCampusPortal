import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Volume2,
  VolumeX,
  Share2,
  Trash2,
  GraduationCap,
  HelpCircle,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { openWhatsAppShare, buildCounselorAdviceShareMessage, copyTextToClipboard } from '../utils/shareUtils';

interface AiCounselorProps {
  monetagLink: string;
  onAdTriggered: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'counselor';
  text: string;
  timestamp: string;
  category?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'counselor',
    text:
      "Hello scholar! I am Counselor Chioma, your Senior Admissions Advisor for the 2026/2027 academic session.\n\n" +
      "I provide verified guidance on:\n" +
      "• Official JAMB 4-Subject Combinations (preventing disqualification)\n" +
      "• WAEC/NECO 9-Subject Requirements & One-Sitting vs Two-Sittings Rules\n" +
      "• Real University & Polytechnic Cut-Off Benchmarks (Federal, State, Private)\n" +
      "• Low Score Remedies (140 - 199 Points) & Change of Institution Strategies\n" +
      "• Catchment Area Quotas & Direct Entry (DE) Pathways\n\n" +
      "What course, score, or institution are you targeting?",
    timestamp: 'Just now',
  },
];

interface QuickPromptCategory {
  label: string;
  icon: string;
  prompts: string[];
}

const CATEGORIZED_PROMPTS: QuickPromptCategory[] = [
  {
    label: 'Popular Courses',
    icon: '🎯',
    prompts: [
      'Can I study Nursing or Medicine with 230 in UNILAG or UI?',
      'What are the compulsory 4 JAMB subjects for Computer Science?',
      'Is Literature in English strictly compulsory for Law in JAMB and WAEC?',
      'What can I study with English, Mathematics, Economics and Government?',
    ],
  },
  {
    label: 'Low Score Remedies',
    icon: '📉',
    prompts: [
      'I scored between 150 and 190 in JAMB, which universities will accept me?',
      'Which top polytechnics accept 140-160 for National Diploma (ND)?',
      'How does JAMB Change of Course / Institution work after results release?',
      'Can I use IJMB or JUPEB to enter 200 Level directly without UTME?',
    ],
  },
  {
    label: "O'Level Rules",
    icon: '⚖️',
    prompts: [
      'Does UNILAG, UI or UNIBEN accept two sittings for Medicine or Pharmacy?',
      'I got D7 in Mathematics in WAEC, can I still gain admission into Mass Communication or Law?',
      'Can I combine WAEC with NECO for Federal University admission?',
      'What are the mandatory 5 credits needed for Engineering courses?',
    ],
  },
  {
    label: 'Catchment & DE',
    icon: '🌍',
    prompts: [
      'Explain how Catchment Area advantage gives lower cut-off marks',
      'What is the difference between Merit, Catchment, and ELDS admission quotas?',
      'How do I convert my Polytechnic ND (Upper Credit) to 200 Level University via Direct Entry?',
    ],
  },
];

export const AiCounselor: React.FC<AiCounselorProps> = ({
  monetagLink,
  onAdTriggered,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('counselor_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('counselor_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeakText = (text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown characters for natural speech
    const cleanText = text.replace(/[*_#•]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.includes('en-GB') ||
        v.lang.includes('en-NG') ||
        v.lang.includes('en-US')
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || inputMessage).trim();
    if (!queryText || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      const replyText =
        data.reply ||
        data.fallback ||
        "I'm experiencing a brief network hiccup with the JAMB brochure engine. Please ask your question again!";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'counselor',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      // Local Intelligent Knowledge Base Fallback
      const lower = queryText.toLowerCase();
      let smartFallback =
        "Hello! I am Counselor Chioma. What course, university, or polytechnic are you aiming for? Tell me your dream course or score and I will analyze your exact chances, official 4 JAMB subjects, and cut-off benchmarks!";

      if (
        lower === 'hi' ||
        lower === 'hello' ||
        lower.startsWith('hi ') ||
        lower.startsWith('hello ') ||
        lower === 'hey' ||
        lower.includes('how far') ||
        lower.includes('good morning') ||
        lower.includes('good afternoon')
      ) {
        smartFallback =
          "Hello there scholar! I am Counselor Chioma, your Admissions Advisor. How is your preparation going? Tell me the course or university you have in mind, and I'll give you the exact 4 JAMB subjects, safe cut-off score, and admission tricks!";
      } else if (lower.includes('nurs') || lower.includes('med')) {
        smartFallback =
          "For Nursing & Medicine in Nigeria:\n" +
          "• Compulsory 4 JAMB Subjects: English, Biology, Chemistry, Physics.\n" +
          "• O'Level Requirement: 5 credits in ONE sitting for UNILAG, UI, UNIBEN, OAU.\n" +
          "• Safe UTME Benchmarks: 250+ for Nursing, 275+ for Medicine.\n" +
          "• High-Yield Alternatives: Medical Laboratory Science, Physiology, Anatomy, or Nursing Science in top State Universities (e.g. LASU, DELSU, OOU) if your score is 215-245.";
      } else if (lower.includes('law')) {
        smartFallback =
          "For Civil / Common Law (LL.B) in Nigeria:\n" +
          "• Compulsory 4 JAMB Subjects: English Language, Literature in English, Government or History, and any Arts/Social Science subject.\n" +
          "• Strict Warning: Candidates who sit for JAMB without Literature in English are automatically disqualified from Law across ALL universities in Nigeria.\n" +
          "• Safe UTME Benchmark: 260+ for Federal Universities (UNILAG, UI, OAU, UNN), 235+ for State Universities.";
      } else if (lower.includes('comp') || lower.includes('software') || lower.includes('cyber')) {
        smartFallback =
          "For Computer Science / Software Engineering / Cybersecurity:\n" +
          "• Compulsory 4 JAMB Subjects: English Language, Mathematics, Physics, and Chemistry.\n" +
          "• Top Universities: UNILAG, FUTA, UNN, LASU, and Covenant University.\n" +
          "• Top Practical Polytechnics: Yaba College of Technology (YABATECH), Federal Poly Ilaro.\n" +
          "• Minimum Benchmark: 220+ for Federal Universities, 160+ for Polytechnics (ND/HND).";
      } else if (lower.includes('low') || lower.includes('150') || lower.includes('160') || lower.includes('170') || lower.includes('180') || lower.includes('190')) {
        smartFallback =
          "Strategic Action Plan for Scores Between 140 and 199:\n" +
          "1. Switch to Accredited Polytechnics: Institutions like YabaTech, Federal Poly Ilaro, and Auchi Poly accept 150-180 and offer direct entry into 200 Level university upon ND graduation.\n" +
          "2. Target Fast-Growing State & Private Universities: Many State Universities (e.g., TASUED, MAPOLY, BSU, FUOYE for certain programs) have cut-offs around 160-180.\n" +
          "3. Consider Course Change: Shift from saturated courses (e.g. Medicine) to related courses like Biochemistry, Science Lab Tech, or Agricultural Economics where competition is lower.";
      } else if (lower.includes('sitting') || lower.includes('two') || lower.includes('combine')) {
        smartFallback =
          "Official O'Level Two-Sittings Rules:\n" +
          "• Top Federal Universities (UNILAG, UI, UNIBEN, OAU) insist on ONE sitting for competitive courses (Medicine, Pharmacy, Nursing, Law).\n" +
          "• Most State Universities (LASU, OOU, DELSU, EKSU) and ALL Polytechnics accept TWO sittings (WAEC + NECO combined).\n" +
          "• Always ensure you have at least 5 credit passes including English Language and Mathematics across the two sittings.";
      } else if (lower.includes('catchment')) {
        smartFallback =
          "How Catchment Area Advantage Works in Federal Universities:\n" +
          "Federal universities reserve 35% of their total admission quota strictly for candidates whose State of Origin falls within their geographical zone.\n" +
          "• Example: UNILAG gives lower merit cut-offs to indigenes of Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti!\n" +
          "• Make sure your JAMB State of Origin is verified with your LGA Certificate of Origin.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'counselor',
          text: smartFallback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = async (text: string, id: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleShareAdvice = (text: string) => {
    try {
      const shareMsg = buildCounselorAdviceShareMessage(text);
      openWhatsAppShare(shareMsg);
    } catch (e) {
      console.warn('Share advice fallback:', e);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear your conversation history with Counselor Chioma?')) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setMessages(INITIAL_MESSAGES);
      try {
        localStorage.removeItem('counselor_chat_history');
      } catch {
        // ignore
      }
    }
  };

  const handleOpenAdPortal = () => {
    if (monetagLink) {
      try {
        const link = document.createElement('a');
        link.href = monetagLink;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onAdTriggered();
      } catch (e) {
        console.warn('Ad link click handled safely:', e);
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-[78vh] min-h-[580px] max-h-[820px] overflow-hidden">
      {/* ================= COUNSELOR CHIOMA HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-4 sm:p-5 shrink-0 border-b border-emerald-800/40">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Counselor Avatar with Live Status Pulse */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-emerald-950 flex items-center justify-center font-black text-xl shadow-lg border-2 border-emerald-400/40">
                🎓
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-emerald-950 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  Counselor Chioma
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online • Chief Advisor
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5 font-medium">
                Verified JAMB 2026/2027 Guidelines • Official NUC Cut-Offs • O&apos;Level Specialist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Counselor Verified Guidance Button */}
            <button
              onClick={() => handleShareAdvice('')}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Share Counselor Chioma's verified guidance"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share Advisor</span>
            </button>

            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition cursor-pointer text-xs flex items-center gap-1"
              title="Reset conversation"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden md:inline font-bold">Reset</span>
            </button>

            {/* Official NUC Bulletin link */}
            <button
              onClick={handleOpenAdPortal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="View official JAMB/NUC bulletin"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admissions Bulletin</span>
            </button>
          </div>
        </div>

        {/* Feature Badges Strip */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald-800/40 text-[11px] text-emerald-200/90 overflow-x-auto no-scrollbar font-medium">
          <span className="flex items-center gap-1 shrink-0 bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-700/50">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>4-Subject Combos</span>
          </span>
          <span className="flex items-center gap-1 shrink-0 bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-700/50">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Catchment Area Check</span>
          </span>
          <span className="flex items-center gap-1 shrink-0 bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-700/50">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Low Score Remedies</span>
          </span>
          <span className="flex items-center gap-1 shrink-0 bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-700/50">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Polytechnic ND/HND to 200L DE</span>
          </span>
        </div>
      </div>

      {/* ================= CATEGORIZED QUICK PROMPT CHIPS ================= */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
            Quick Advisor Prompts:
          </span>
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {CATEGORIZED_PROMPTS.map((cat, idx) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategoryIdx(idx)}
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold transition cursor-pointer whitespace-nowrap ${
                  activeCategoryIdx === idx
                    ? 'bg-emerald-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Pills for active category */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORIZED_PROMPTS[activeCategoryIdx].prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="text-xs bg-white hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs whitespace-nowrap transition cursor-pointer font-medium flex items-center gap-1.5 shrink-0"
            >
              <span>{p}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* ================= MESSAGES CHAT SCROLL ================= */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
        {messages.map((m) => {
          const isCounselor = m.sender === 'counselor';
          const isSpeaking = speakingMsgId === m.id;

          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                isCounselor ? 'justify-start' : 'justify-end'
              }`}
            >
              {isCounselor && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-900 to-slate-900 text-amber-300 flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-sm border border-emerald-700/30">
                  🎓
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                  !isCounselor
                    ? 'bg-emerald-900 text-white rounded-tr-xs'
                    : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200 shadow-sm'
                }`}
              >
                {/* Counselor Tag Header */}
                {isCounselor && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px]">
                    <span className="font-black text-emerald-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Counselor Chioma
                    </span>
                    <span className="text-slate-400 text-[10px]">{m.timestamp}</span>
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-wrap leading-relaxed font-sans">
                  {m.text}
                </div>

                {/* Footer Controls for Counselor messages */}
                {isCounselor && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* Read Aloud Button (Web Speech API) */}
                      <button
                        onClick={() => handleSpeakText(m.text, m.id)}
                        className={`flex items-center gap-1 text-[11px] font-bold transition cursor-pointer px-2 py-0.5 rounded-lg ${
                          isSpeaking
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'hover:text-emerald-900 hover:bg-slate-100'
                        }`}
                        title="Listen to advice spoken aloud"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            <span>Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Listen to Voice</span>
                          </>
                        )}
                      </button>

                      {/* Copy Advice */}
                      <button
                        onClick={() => handleCopyText(m.text, m.id)}
                        className="flex items-center gap-1 hover:text-emerald-900 font-bold transition cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Share Advice Directly to WhatsApp */}
                      <button
                        onClick={() => handleShareAdvice(m.text)}
                        className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold transition cursor-pointer"
                        title="Share advice to WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Advice</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium">
                      Verified Guidance
                    </span>
                  </div>
                )}

                {/* Timestamp for user messages */}
                {!isCounselor && (
                  <div className="text-right text-[10px] text-emerald-200 mt-1">
                    {m.timestamp}
                  </div>
                )}
              </div>

              {!isCounselor && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-600 text-xs py-2 bg-emerald-50/70 border border-emerald-200/60 p-3 rounded-2xl w-fit animate-pulse">
            <div className="w-7 h-7 rounded-lg bg-emerald-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              🎓
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-950 block">
                Counselor Chioma is checking official brochures...
              </span>
              <span className="text-[11px] text-emerald-700">
                Cross-referencing JAMB subject combos, minimum cut-offs, and NUC accreditations.
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ================= INPUT CONTROLLER ================= */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0 shadow-lg"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask Chioma anything (e.g. Can I study Computer Science with D7 in Chemistry?)..."
          className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-emerald-800 focus:bg-white transition shadow-inner font-medium"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="bg-emerald-900 hover:bg-emerald-800 disabled:opacity-40 text-white p-3 rounded-2xl transition cursor-pointer shrink-0 shadow-md flex items-center justify-center"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
