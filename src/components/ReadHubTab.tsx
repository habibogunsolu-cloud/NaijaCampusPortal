import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Keyboard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Award,
  Send,
  Lightbulb,
  FileText,
  ChevronRight,
  Share2,
  UserCheck,
  Check,
  HelpCircle,
  BookMarked,
  Info,
  Flame,
} from 'lucide-react';
import { ShareModal } from './ShareModal';
import {
  THE_LIFE_CHANGER,
  EXPANDED_OBJ_QUESTIONS,
  EXPANDED_THEORY_QUESTIONS,
  NovelChapter,
  NovelCharacter,
  NovelData,
  getActiveNovel,
  setActiveNovelId,
  saveCustomNovel,
  getAllAvailableNovels,
  getQuestionsForNovel,
} from '../data/readHubData';
import { buildReadHubShareMessage, openWhatsAppShare } from '../utils/shareUtils';

interface ReadHubTabProps {
  monetagLink: string;
  onAdTriggered: () => void;
}

type ExamType = 'JAMB' | 'WAEC' | 'NECO' | 'POST-UTME';
type SubjectType =
  | 'English'
  | 'Mathematics'
  | 'Biology'
  | 'Chemistry'
  | 'Physics'
  | 'Government'
  | 'Economics'
  | 'Literature'
  | 'Novel';

export const ReadHubTab: React.FC<ReadHubTabProps> = ({
  monetagLink,
  onAdTriggered,
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamType>('JAMB');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('English');
  const [activeMode, setActiveMode] = useState<'obj' | 'theory' | 'novel' | 'ai' | 'hacks'>('novel');

  // OBJ CBT State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, { picked: string; isCorrect: boolean }>>({});
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(40);
  const [selectedObjYear, setSelectedObjYear] = useState<string>('All Years');

  // Theory State
  const [currentTheoryIdx, setCurrentTheoryIdx] = useState(0);
  const [theoryCandidateNotes, setTheoryCandidateNotes] = useState('');
  const [isTheoryAnswerRevealed, setIsTheoryAnswerRevealed] = useState(false);

  // Novel Reader State (Dynamic Real-Time Sync)
  const [activeNovel, setActiveNovel] = useState<NovelData>(() => getActiveNovel());
  const [availableNovels, setAvailableNovels] = useState<NovelData[]>(() => getAllAvailableNovels());
  const [novelSubView, setNovelSubView] = useState<'chapters' | 'characters' | 'themes'>('chapters');
  const [selectedChapterNumber, setSelectedChapterNumber] = useState(1);
  const [isNovelManagerOpen, setIsNovelManagerOpen] = useState(false);
  const [customNovelTitle, setCustomNovelTitle] = useState('');
  const [customNovelAuthor, setCustomNovelAuthor] = useState('');
  const [customNovelSession, setCustomNovelSession] = useState('2026/2027 Session');
  const [customNovelSynopsis, setCustomNovelSynopsis] = useState('');

  // Real-time synchronization when active novel changes
  useEffect(() => {
    const handleNovelSync = () => {
      const fresh = getActiveNovel();
      setActiveNovel(fresh);
      setAvailableNovels(getAllAvailableNovels());
      setSelectedChapterNumber(1);
    };
    window.addEventListener('jamb_novel_changed', handleNovelSync);
    return () => window.removeEventListener('jamb_novel_changed', handleNovelSync);
  }, []);

  // AI Study Desk State
  const [aiChatMessages, setAiChatMessages] = useState<
    { sender: 'user' | 'tutor'; text: string; time: string }[]
  >([
    {
      sender: 'tutor',
      text: "Welcome to your Read Hub Study Desk! I'm Counselor Chioma. Ask me any question, calculation problem, or summary dilemma from JAMB, WAEC, NECO, or your prescribed JAMB novel, and I will break it down into easy memory tricks!",
      time: 'Just now',
    },
  ]);
  const [aiInputPrompt, setAiInputPrompt] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const aiChatScrollRef = useRef<HTMLDivElement>(null);

  // Question lists with dynamic active novel questions and year filtering
  const baseQuestions = EXPANDED_OBJ_QUESTIONS[selectedSubject] || EXPANDED_OBJ_QUESTIONS.English;
  const rawQuestions =
    selectedSubject === 'Novel'
      ? getQuestionsForNovel(activeNovel.id, EXPANDED_OBJ_QUESTIONS.Novel)
      : baseQuestions;

  const questions =
    selectedObjYear === 'All Years'
      ? rawQuestions
      : rawQuestions.filter((q) => q.year?.includes(selectedObjYear)).length > 0
      ? rawQuestions.filter((q) => q.year?.includes(selectedObjYear))
      : rawQuestions;

  const currentQ = questions[currentQuestionIdx] || questions[0];

  const theoryList =
    EXPANDED_THEORY_QUESTIONS[selectedSubject] || EXPANDED_THEORY_QUESTIONS.English;
  const currentTheory = theoryList[currentTheoryIdx] || theoryList[0];

  // Auto-timer countdown for CBT simulation
  useEffect(() => {
    if (activeMode !== 'obj' || isAnswerSubmitted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeMode, isAnswerSubmitted, currentQuestionIdx]);

  useEffect(() => {
    aiChatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChatMessages, isAiThinking]);

  // Handle subject change
  const handleSubjectChange = (sub: SubjectType) => {
    setSelectedSubject(sub);
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setActiveHint(null);
    setTimerSeconds(40);
    setCurrentTheoryIdx(0);
    setTheoryCandidateNotes('');
    setIsTheoryAnswerRevealed(false);
  };

  const handleSelectOption = (key: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(key);
    }
  };

  const handleSubmitQuestion = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correct;
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }
    setAnsweredMap((prev) => ({
      ...prev,
      [currentQ.id]: { picked: selectedAnswer, isCorrect },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      const nextQ = questions[currentQuestionIdx + 1];
      const prevAnswered = answeredMap[nextQ.id];
      if (prevAnswered) {
        setSelectedAnswer(prevAnswered.picked);
        setIsAnswerSubmitted(true);
      } else {
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
      }
      setActiveHint(null);
      setTimerSeconds(40);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
      const prevQ = questions[currentQuestionIdx - 1];
      const prevAnswered = answeredMap[prevQ.id];
      if (prevAnswered) {
        setSelectedAnswer(prevAnswered.picked);
        setIsAnswerSubmitted(true);
      } else {
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
      }
      setActiveHint(null);
      setTimerSeconds(40);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setCurrentQuestionIdx(idx);
    const targetQ = questions[idx];
    const prevAnswered = answeredMap[targetQ.id];
    if (prevAnswered) {
      setSelectedAnswer(prevAnswered.picked);
      setIsAnswerSubmitted(true);
    } else {
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
    setActiveHint(null);
    setTimerSeconds(40);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnsweredMap({});
    setActiveHint(null);
    setTimerSeconds(40);
  };

  // AI Hint Fetcher
  const handleFetchAiHint = async () => {
    if (activeHint || isLoadingHint) return;
    setIsLoadingHint(true);

    try {
      const res = await fetch('/api/readhub-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          subject: selectedSubject,
          exam: selectedExam,
          mode: 'hint',
          userPrompt: 'Give a smart exam hint without revealing the final answer.',
        }),
      });
      const data = await res.json();
      setActiveHint(data.reply || currentQ.hint);
    } catch {
      setActiveHint(currentQ.hint);
    } finally {
      setIsLoadingHint(false);
    }
  };

  // AI Study Desk Chat
  const handleSendAiPrompt = async (promptToSend?: string) => {
    const text = (promptToSend || aiInputPrompt).trim();
    if (!text || isAiThinking) return;

    const userMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiChatMessages((prev) => [...prev, userMsg]);
    setAiInputPrompt('');
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/readhub-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          subject: selectedSubject,
          exam: selectedExam,
          mode: 'study',
          userPrompt: text,
        }),
      });
      const data = await res.json();
      setAiChatMessages((prev) => [
        ...prev,
        {
          sender: 'tutor',
          text: data.reply || "Focus on the fundamental definitions and beware of negative qualifiers like 'EXCEPT' or 'NOT'.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setAiChatMessages((prev) => [
        ...prev,
        {
          sender: 'tutor',
          text: `Key insight for ${selectedSubject}: Focus on high-yield chapters that carry 60%+ of the questions. In calculations, write down given parameters first, select formula, and double check standard units!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleUnlockMore = () => {
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

  const currentChapterData =
    activeNovel.chapters.find((c) => c.chapter === selectedChapterNumber) ||
    activeNovel.chapters[0] || {
      chapter: 1,
      title: 'General Overview & Exam Focus',
      summary: activeNovel.synopsis,
      keyEvents: ['Overview of prescribed text themes and central conflicts'],
      keyQuotes: ['Understanding the plot ensures maximum score in UTME Use of English.'],
      examTips: 'Focus on author, year of publication, and major character choices.',
    };

  return (
    <div className="space-y-6">
      {/* ================= TOP HEADER CARD ================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-black shadow-md shrink-0">
              <BookOpen className="w-5 h-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5 sm:gap-2 truncate">
                Naija Read Hub
                <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                  Exam Mastery
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                CBT Speed Drills &bull; WAEC/NECO Paper 2 &bull; JAMB Novel Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Share Read Hub materials"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Read Hub</span>
            </button>
          </div>
        </div>

        {/* 5 Distinct Feature Modes Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2 border-t border-slate-100 font-bold text-[11px] sm:text-xs">
          <button
            onClick={() => setActiveMode('obj')}
            className={`py-2 px-2 sm:px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 min-w-0 ${
              activeMode === 'obj'
                ? 'bg-emerald-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="truncate">OBJ CBT Drill</span>
          </button>

          <button
            onClick={() => setActiveMode('theory')}
            className={`py-2 px-2 sm:px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 min-w-0 ${
              activeMode === 'theory'
                ? 'bg-emerald-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Theory &amp; Steps</span>
          </button>

          <button
            onClick={() => setActiveMode('novel')}
            className={`py-2 px-2 sm:px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 min-w-0 ${
              activeMode === 'novel'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300/60'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-900 shrink-0" />
            <span className="truncate">JAMB Novel Hub</span>
          </button>

          <button
            onClick={() => setActiveMode('ai')}
            className={`py-2 px-2 sm:px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 min-w-0 ${
              activeMode === 'ai'
                ? 'bg-emerald-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Study Desk</span>
          </button>

          <button
            onClick={() => setActiveMode('hacks')}
            className={`col-span-2 sm:col-span-1 py-2 px-2 sm:px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 min-w-0 ${
              activeMode === 'hacks'
                ? 'bg-emerald-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="truncate">Hall Strategies</span>
          </button>
        </div>

        {/* Subject Filter Bar (for OBJ and Theory) */}
        {activeMode !== 'novel' && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-bold">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Subject:
            </span>
            {(
              [
                'English',
                'Mathematics',
                'Biology',
                'Chemistry',
                'Physics',
                'Government',
                'Economics',
                'Literature',
                'Novel',
              ] as SubjectType[]
            ).map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubjectChange(sub)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : sub === 'Novel'
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {sub === 'Novel' ? `📖 ${activeNovel.title}` : sub}
              </button>
            ))}
          </div>
        )}

        {/* Year Filter Bar for OBJ Drill */}
        {activeMode === 'obj' && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-bold">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Year:
            </span>
            {['All Years', '2024', '2023', '2022', '2021', '2020'].map((yr) => (
              <button
                key={yr}
                onClick={() => {
                  setSelectedObjYear(yr);
                  setCurrentQuestionIdx(0);
                  setSelectedAnswer(null);
                  setIsAnswerSubmitted(false);
                  setActiveHint(null);
                  setTimerSeconds(40);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedObjYear === yr
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {yr === 'All Years' ? '🌟 All Years' : `🗓️ ${yr}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODE 1: OBJECTIVE (OBJ) CBT DRILL ================= */}
      {activeMode === 'obj' && (
        <div className="space-y-4">
          <div className="bg-white border-2 border-emerald-950/20 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            {/* Header info & timer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-emerald-950 text-white px-2.5 py-1 rounded-lg">
                  {selectedSubject === 'Novel' ? activeNovel.title.toUpperCase() : selectedSubject} Q{currentQuestionIdx + 1}/{questions.length}
                </span>
                <span className="text-xs font-bold text-emerald-800 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Score: {score} pts
                </span>
                {currentQ.year && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {currentQ.year}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFetchAiHint}
                  disabled={isLoadingHint}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer border border-amber-300"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isLoadingHint ? 'Thinking...' : 'AI Hint'}</span>
                </button>

                <div
                  className={`flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-1 rounded-lg border ${
                    timerSeconds <= 10
                      ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timerSeconds}s</span>
                </div>
              </div>
            </div>

            {/* AI Hint Callout */}
            {activeHint && (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amber-900">
                    💡 AI Guidance Hint:
                  </strong>
                  <p className="mt-0.5 leading-relaxed">{activeHint}</p>
                </div>
              </div>
            )}

            {/* Question Text */}
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                const isCorrect = isAnswerSubmitted && opt.key === currentQ.correct;
                const isWrong = isAnswerSubmitted && isSelected && opt.key !== currentQ.correct;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center gap-3 cursor-pointer ${
                      isCorrect
                        ? 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold'
                        : isWrong
                        ? 'bg-rose-100 border-rose-600 text-rose-950 font-bold'
                        : isSelected
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-950 ring-2 ring-emerald-700 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-black text-xs shrink-0 font-mono">
                      {opt.key}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Official JAMB 8-Key Keyboard Simulator */}
            <div className="bg-slate-950 text-white rounded-2xl p-4 space-y-2 select-none shadow-md">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Keyboard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official JAMB 8-Key CBT Keypad Simulator:</span>
                </span>
                <span className="text-amber-400 font-mono text-[10px]">Tap or use physical keys</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center font-mono font-bold text-xs">
                {['A', 'B', 'C', 'D'].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleSelectOption(k)}
                    className={`py-2 rounded-lg border transition cursor-pointer ${
                      selectedAnswer === k
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                    }`}
                  >
                    {k}
                  </button>
                ))}

                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIdx === 0}
                  className="py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-lg border border-slate-700 transition cursor-pointer"
                  title="Previous Question"
                >
                  P (Prev)
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIdx === questions.length - 1}
                  className="py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-lg border border-slate-700 transition cursor-pointer"
                  title="Next Question"
                >
                  N (Next)
                </button>

                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className="py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 transition cursor-pointer"
                  title="Reset Selection"
                >
                  R (Reset)
                </button>

                <button
                  onClick={handleSubmitQuestion}
                  className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg border border-emerald-400 transition cursor-pointer"
                  title="Submit Selection"
                >
                  S (Submit)
                </button>
              </div>
            </div>

            {/* Question Quick Palette Grid */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Question Navigator Palette ({questions.length} Questions):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {questions.map((q, idx) => {
                  const state = answeredMap[q.id];
                  const isCurrent = currentQuestionIdx === idx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center justify-center border ${
                        isCurrent
                          ? 'ring-2 ring-emerald-800 border-emerald-800 bg-emerald-50 text-emerald-950'
                          : state?.isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : state && !state.isCorrect
                          ? 'bg-rose-500 text-white border-rose-600'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation & Trap Breakdown */}
            {isAnswerSubmitted && (
              <div className="space-y-3 pt-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-1">
                  <strong className="block text-emerald-900 font-bold">
                    ✓ Verified Solution &amp; Working:
                  </strong>
                  <p className="leading-relaxed">{currentQ.explanation}</p>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-rose-900">
                      ⚠️ Examiner Trap Analysis:
                    </strong>
                    <span className="leading-relaxed">{currentQ.trapWarning}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Past Question Bank Unlock */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div>
              <strong className="text-sm font-bold block">
                Access 1,000+ Past Questions with Step-by-Step Marking Schemes?
              </strong>
              <p className="text-xs text-emerald-200">
                Covers 15 years of JAMB UTME, WAEC SSCE, and Post-UTME screening questions.
              </p>
            </div>

            <button
              onClick={handleUnlockMore}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-md"
            >
              <span>Access Exam Papers</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODE 2: THEORY & STEP-MARKING (WAEC/NECO PAPER 2) ================= */}
      {activeMode === 'theory' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
          {/* Theory Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider block">
                Paper 2: Theory &amp; Structured Essay Marking
              </span>
              <h3 className="text-base font-black text-slate-900">
                {selectedSubject} Theory Practice ({theoryList.length} Questions Available)
              </h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full border border-amber-300">
              WAEC &amp; NECO Official Standard
            </span>
          </div>

          {/* Question Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {theoryList.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  setCurrentTheoryIdx(idx);
                  setIsTheoryAnswerRevealed(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  currentTheoryIdx === idx
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Q{idx + 1}:</span>
                <span className="truncate max-w-[160px]">{t.title}</span>
              </button>
            ))}
          </div>

          {/* Question Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-md font-mono">
                Topic: {currentTheory.topic}
              </span>
              <span className="text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                Total Marks: {currentTheory.totalMarks}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-900 font-bold leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-200">
              {currentTheory.question}
            </div>
          </div>

          {/* Student Scratchpad */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Candidate Working Scratchpad (Type your formula, derivations, or essay points):
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {theoryCandidateNotes.length} characters
              </span>
            </div>
            <textarea
              rows={4}
              value={theoryCandidateNotes}
              onChange={(e) => setTheoryCandidateNotes(e.target.value)}
              placeholder="Start drafting your step 1, step 2, or paragraph points here..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-emerald-800 font-mono"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setIsTheoryAnswerRevealed(!isTheoryAnswerRevealed)}
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>
                {isTheoryAnswerRevealed ? 'Hide Official Marking Scheme' : 'Reveal Official WAEC/NECO Marking Scheme'}
              </span>
            </button>

            <button
              onClick={handleUnlockMore}
              className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Download Model Papers</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Revealed Marking Scheme & Advice */}
          {isTheoryAnswerRevealed && (
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <strong className="text-xs font-bold text-emerald-950 uppercase tracking-wide block">
                  Official WAEC/NECO Step-by-Step Marks Distribution:
                </strong>

                <div className="space-y-2">
                  {currentTheory.markingScheme.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-emerald-200 rounded-xl p-3 flex items-start justify-between text-xs gap-3"
                    >
                      <span className="text-slate-800 font-medium leading-relaxed">
                        {item.step}
                      </span>
                      <strong className="text-emerald-900 font-mono font-bold shrink-0 bg-emerald-100 px-2 py-0.5 rounded">
                        {item.marks}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-emerald-200">
                  <span className="text-xs font-bold text-emerald-900 block mb-1">
                    Model Full Answer / Chief Examiner Standard:
                  </span>
                  <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-mono bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs">
                    {currentTheory.modelAnswer}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-2.5">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amber-900">
                    Chief Examiner Marking Secret:
                  </strong>
                  <p className="mt-0.5 leading-relaxed">{currentTheory.examinerAdvice}</p>
                </div>
              </div>

              {/* Theory Full Solutions PDF Download */}
              <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm border border-emerald-800">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-xs font-black text-amber-300 block">
                    📥 Download 15-Year Theory Marking Guide &amp; Past Questions (PDF)
                  </span>
                  <p className="text-[11px] text-emerald-200">
                    Get the complete official WAEC/NECO marking schemes with step-by-step mark allocations.
                  </p>
                </div>
                <button
                  onClick={handleUnlockMore}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-md"
                >
                  <span>Download Theory Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODE 3: JAMB NOVEL HUB (DYNAMIC REAL-TIME NOVEL ENGINE) ================= */}
      {activeMode === 'novel' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-6">
          {/* Dynamic Real-Time Novel Selector Header */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
                📖
              </span>
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Official JAMB Novel Engine • Live Sync
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Switches dynamically when JAMB updates the prescribed text in real life
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
              <select
                value={activeNovel.id}
                onChange={(e) => {
                  if (e.target.value === 'new_custom') {
                    setIsNovelManagerOpen(true);
                  } else {
                    setActiveNovelId(e.target.value);
                  }
                }}
                className="flex-1 min-w-0 max-w-full sm:max-w-xs bg-slate-800 text-amber-300 font-bold text-xs rounded-xl px-2.5 py-2 border border-slate-700 focus:outline-hidden focus:border-amber-400 cursor-pointer truncate"
              >
                {availableNovels.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.title} ({n.author})
                  </option>
                ))}
                <option value="new_custom">✍️ + Announce / Add New Prescribed Novel</option>
              </select>

              <button
                onClick={() => setIsNovelManagerOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-2 rounded-xl text-xs font-bold border border-slate-700 transition cursor-pointer shrink-0 whitespace-nowrap"
                title="Register newly announced JAMB novel"
              >
                + New Novel
              </button>
            </div>
          </div>

          {/* Quick Novel Selection Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 mr-1">
              Select Novel:
            </span>
            {availableNovels.map((n) => {
              const isSelected = activeNovel.id === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveNovelId(n.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs ring-2 ring-amber-400/40'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{n.id === 'the-lekki-headmaster' ? '⭐' : '📖'}</span>
                  <span>{n.title}</span>
                  {n.id === 'the-lekki-headmaster' && (
                    <span className="bg-slate-900 text-amber-300 text-[9px] px-1.5 py-0.5 rounded font-black">
                      LATEST
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Novel Hero Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 min-w-0 w-full">
              <div className="min-w-0 w-full flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {activeNovel.sessionTag || 'Official Prescribed Text'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white break-words">
                  {activeNovel.title}
                </h3>
                <p className="text-xs text-emerald-200/90 mt-1 break-words">
                  By <strong>{activeNovel.author}</strong> &bull; {activeNovel.genre}
                </p>
                <p className="text-xs text-amber-300 font-bold mt-1">
                  ★ Compulsory for Use of English (10 to 15 Questions in JAMB UTME)
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedSubject('Novel');
                  setActiveMode('obj');
                }}
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
              >
                <span>Drill {activeNovel.title} Questions &rarr;</span>
              </button>
            </div>
          </div>

          {/* Sub-Navigation for Novel: Chapters vs Characters vs Themes */}
          <div className="flex bg-slate-100 p-1 rounded-2xl max-w-md mx-auto text-xs font-bold">
            <button
              onClick={() => setNovelSubView('chapters')}
              className={`flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                novelSubView === 'chapters'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chapters 1 - {activeNovel.chapters.length}</span>
            </button>

            <button
              onClick={() => setNovelSubView('characters')}
              className={`flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                novelSubView === 'characters'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Characters</span>
            </button>

            <button
              onClick={() => setNovelSubView('themes')}
              className={`flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                novelSubView === 'themes'
                  ? 'bg-emerald-950 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Themes &amp; Lessons</span>
            </button>
          </div>

          {/* CHAPTERS BREAKDOWN */}
          {novelSubView === 'chapters' && (
            <div className="space-y-4">
              {/* Chapter Selector Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {activeNovel.chapters.map((ch) => (
                  <button
                    key={ch.chapter}
                    onClick={() => setSelectedChapterNumber(ch.chapter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedChapterNumber === ch.chapter
                        ? 'bg-emerald-950 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Chapter {ch.chapter}
                  </button>
                ))}
              </div>

              {/* Selected Chapter Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 block">
                    Chapter {currentChapterData.chapter} Analysis
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-0.5">
                    {currentChapterData.title}
                  </h4>
                </div>

                <div>
                  <strong className="text-xs font-bold text-slate-800 uppercase block mb-1">
                    Plot Summary:
                  </strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                    {currentChapterData.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs">
                    <strong className="text-emerald-950 font-bold block mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Key Plot Milestones:
                    </strong>
                    <ul className="space-y-1 text-slate-700">
                      {currentChapterData.keyEvents.map((ev, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">&bull;</span>
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs">
                    <strong className="text-amber-950 font-bold block mb-1.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-700" />
                      JAMB Exam Focus &amp; Tips:
                    </strong>
                    <p className="text-slate-800 leading-relaxed">
                      {currentChapterData.examTips}
                    </p>
                  </div>
                </div>

                {currentChapterData.keyQuotes.length > 0 && (
                  <div className="bg-slate-900 text-emerald-300 rounded-xl p-3 text-xs italic font-mono border border-slate-800">
                    {currentChapterData.keyQuotes.join('  •  ')}
                  </div>
                )}

                {/* Novel PDF Download & 150 Questions Card */}
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <span className="text-xs font-black text-amber-950 block">
                      📥 Download Full Novel Companion &amp; 150 Practice Questions (PDF)
                    </span>
                    <p className="text-[11px] text-amber-900">
                      Complete chapter summaries, character guides, themes, and 150 official JAMB-standard questions.
                    </p>
                  </div>
                  <button
                    onClick={handleUnlockMore}
                    className="bg-emerald-950 hover:bg-emerald-900 text-amber-300 border border-amber-400 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-sm"
                  >
                    <span>Download Novel PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CHARACTERS BREAKDOWN */}
          {novelSubView === 'characters' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeNovel.characters.map((char, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-emerald-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-sm text-slate-900">{char.name}</h5>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {char.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {char.description}
                  </p>
                  <div className="pt-1 border-t border-slate-200 text-[11px] text-emerald-900 font-medium">
                    <strong>JAMB Significance:</strong> {char.significance}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* THEMES BREAKDOWN */}
          {novelSubView === 'themes' && (
            <div className="space-y-3">
              {activeNovel.themes.map((th, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1"
                >
                  <h5 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    {th.title}
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed pl-4">
                    {th.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Modal to Register Newly Announced Real-Life Novel */}
          {isNovelManagerOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
              <div className="bg-white border border-slate-300 rounded-2xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
                <button
                  onClick={() => setIsNovelManagerOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
                >
                  ✕
                </button>

                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                    📖
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Real-Time JAMB Novel Updater
                    </h3>
                    <p className="text-xs text-slate-500">
                      Instantly register any newly prescribed novel announced by JAMB
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!customNovelTitle.trim()) return;
                    const newNovelObj: NovelData = {
                      id: 'custom',
                      title: customNovelTitle.trim(),
                      author: customNovelAuthor.trim() || 'Official JAMB Author',
                      genre: 'Prescribed Literature / Fiction',
                      prescribedFor: `JAMB UTME Use of English (${customNovelSession})`,
                      sessionTag: `${customNovelSession} Official Prescribed Text`,
                      synopsis:
                        customNovelSynopsis.trim() ||
                        `${customNovelTitle.trim()} is the official prescribed text announced by the Joint Admissions and Matriculation Board (JAMB). Candidates will answer 10 to 15 questions from this book.`,
                      themes: [
                        {
                          title: 'Integrity and Character',
                          description: 'Central moral values explored in the narrative.',
                        },
                        {
                          title: 'Youth and Decision Making',
                          description: 'Challenges confronting youths transitioning into adulthood.',
                        },
                      ],
                      characters: [
                        {
                          name: 'Central Protagonist',
                          role: 'Lead Character',
                          description: 'The main figure navigating life choices in the text.',
                          significance: 'Primary subject of JAMB exam comprehension questions.',
                        },
                      ],
                      chapters: [
                        {
                          chapter: 1,
                          title: 'Introduction and Background',
                          summary:
                            customNovelSynopsis.trim() ||
                            'The opening chapter introducing the core characters and the central dilemma.',
                          keyEvents: ['Setting the stage for the narrative journey'],
                          keyQuotes: ['"Education is the greatest catalyst for societal change."'],
                          examTips: 'Focus on opening dialogue and main character introduction.',
                        },
                      ],
                    };
                    saveCustomNovel(newNovelObj);
                    setIsNovelManagerOpen(false);
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Novel Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Lekki Toll Gate / When the Sun Sets"
                      value={customNovelTitle}
                      onChange={(e) => setCustomNovelTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chimamanda Ngozi Adichie"
                        value={customNovelAuthor}
                        onChange={(e) => setCustomNovelAuthor(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Academic Session
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2026/2027 Session"
                        value={customNovelSession}
                        onChange={(e) => setCustomNovelSession(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Novel Synopsis / Summary
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief overview of the book's story and main plot points..."
                      value={customNovelSynopsis}
                      onChange={(e) => setCustomNovelSynopsis(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-700"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsNovelManagerOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl shadow-md transition cursor-pointer"
                    >
                      Save &amp; Set as Active Novel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODE 4: AI STUDY TUTOR (DESK) ================= */}
      {activeMode === 'ai' && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden flex flex-col h-[560px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
                🎓
              </span>
              <div>
                <h4 className="font-black text-sm text-white">
                  Read Hub Study &amp; Revision Desk
                </h4>
                <p className="text-[11px] text-emerald-200">
                  Instant step-by-step working, memory tricks &amp; examiner trap breakdowns
                </p>
              </div>
            </div>

            <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
              Subject: {selectedSubject}
            </span>
          </div>

          {/* Quick Study Questions */}
          <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Popular:
            </span>
            {[
              `How do I solve calculations in ${selectedSubject}?`,
              `What is the most frequent exam trap in ${selectedSubject}?`,
              `Summarize the key formula in this topic`,
              `How do WAEC examiners award step marks?`,
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendAiPrompt(prompt)}
                className="bg-white hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-200 font-medium transition cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {aiChatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'tutor' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-950 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                    🎓
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-950 text-white rounded-tr-xs'
                      : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200 shadow-2xs whitespace-pre-line'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-70 block text-right mt-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isAiThinking && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <span className="w-2 h-2 bg-emerald-700 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-emerald-700 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-emerald-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span>Counselor Chioma is preparing your explanation...</span>
              </div>
            )}
            <div ref={aiChatScrollRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendAiPrompt();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={aiInputPrompt}
              onChange={(e) => setAiInputPrompt(e.target.value)}
              placeholder={`Ask a question in ${selectedSubject}...`}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-emerald-800 font-medium"
            />
            <button
              type="submit"
              disabled={!aiInputPrompt.trim() || isAiThinking}
              className="bg-emerald-950 hover:bg-emerald-900 disabled:opacity-40 text-white p-2.5 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ================= MODE 5: EXAM HALL STRATEGIES & HACKS ================= */}
      {activeMode === 'hacks' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider block">
              Proven Examination Hall Techniques
            </span>
            <h3 className="text-base font-black text-slate-900">
              CBT Speed Tactics &amp; WAEC/NECO 9-Subject Guide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2 text-xs">
              <strong className="text-emerald-950 font-bold block text-sm flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-700" />
                The 40-Second Elimination Rule (JAMB CBT):
              </strong>
              <p className="text-slate-700 leading-relaxed">
                JAMB UTME gives you 180 questions for 120 minutes—that is roughly 40 seconds per question. Never spend more than 60 seconds on any calculation. Use the <strong>8-key keypad</strong> (N for Next, P for Previous) to skip difficult questions immediately and return to them during your final 20-minute review.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
              <strong className="text-amber-950 font-bold block text-sm flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-700" />
                WAEC Theory Step-Marking Secret:
              </strong>
              <p className="text-slate-700 leading-relaxed">
                In WAEC and NECO, marks are awarded by step: Formula (M1) + Substitution (M2) + Final Answer with correct unit (A1). Never leave a theory question blank! Stating the formula alone guarantees you method marks even if your final arithmetic fails.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <strong className="text-slate-900 font-bold block text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Compulsory O&apos;Level 9-Subject Package:
              </strong>
              <p className="text-slate-700 leading-relaxed">
                For WAEC and NECO, you must register 9 subjects: English Language and Mathematics are compulsory for everyone. Science candidates must pair with Biology, Chemistry, Physics. Commercial candidates must pair with Economics, Accounting, Commerce. Arts candidates must pair with Literature, Government, CRS/IRS.
              </p>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2 text-xs">
              <strong className="text-rose-950 font-bold block text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                Zero-Malpractice Warning (The Life Changer Lesson):
              </strong>
              <p className="text-slate-700 leading-relaxed">
                As demonstrated by Salma&apos;s trial in &ldquo;The Life Changer&rdquo;, bringing foreign materials or cheat sheets into the hall triggers automatic cancellation of all papers and a 3-year national ban. Always trust your thorough revision!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        initialCategory="readhub"
      />
    </div>
  );
};
