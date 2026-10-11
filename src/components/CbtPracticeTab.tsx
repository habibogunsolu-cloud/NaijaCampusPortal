import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Flag,
  Award,
  RotateCcw,
  BookOpen,
  Share2,
  Check,
  AlertOctagon,
  Sparkles,
  HelpCircle,
  BarChart3,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  CBT_SUBJECTS_LIST,
  CBT_QUESTIONS_BANK,
  CbtQuestion,
  getQuestionsForSubject,
  calculateExamResults,
} from '../data/cbtExamData';
import { openWhatsAppShare, getSafeShareUrl } from '../utils/shareUtils';

interface CbtPracticeTabProps {
  monetagLink?: string;
  onAdTriggered?: () => void;
}

export const CbtPracticeTab: React.FC<CbtPracticeTabProps> = ({
  monetagLink,
  onAdTriggered,
}) => {
  // Practice Sub-Mode: 'mock' (Full 4-Subject 2-Hour CBT) or 'drill' (Quick 1-Subject topical practice)
  const [examMode, setExamMode] = useState<'mock' | 'drill'>('mock');

  // Candidate Registration setup for 4-Subject Mock
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'English',
    'Mathematics',
    'Physics',
    'Chemistry',
  ]);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);

  // Active exam state
  const [currentSubjectIdx, setCurrentSubjectIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<number, 'A' | 'B' | 'C' | 'D'>>>({});
  const [flagged, setFlagged] = useState<Record<string, Record<number, boolean>>>({});
  
  // Timer State: 2 Hours (7200 seconds) for official JAMB mock
  const [timeRemaining, setTimeRemaining] = useState<number>(7200);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Drill Mode State
  const [drillSubject, setDrillSubject] = useState<string>('English');
  const [drillQuestionIdx, setDrillQuestionIdx] = useState(0);
  const [drillSelectedAnswer, setDrillSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [drillIsAnswerRevealed, setDrillIsAnswerRevealed] = useState(false);
  const [drillScore, setDrillScore] = useState(0);
  const [drillAttemptedCount, setDrillAttemptedCount] = useState(0);

  // Review Mode after Exam Completion
  const [reviewSubjectIdx, setReviewSubjectIdx] = useState(0);
  const [reviewQuestionIdx, setReviewQuestionIdx] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Exam Results state
  const [examResults, setExamResults] = useState<{
    totalScore: number;
    subjectScores: { subject: string; score: number; maxScore: number; correctCount: number; totalCount: number }[];
    performanceTier: string;
    advice: string;
  } | null>(null);

  // Random Mock ID for candidate session
  const [mockRegNumber] = useState<string>(() => {
    const saved = localStorage.getItem('jamb_mock_reg_no');
    if (saved) return saved;
    const generated = `UTME/2026/MOCK-${Math.floor(10000 + Math.random() * 90000)}`;
    localStorage.setItem('jamb_mock_reg_no', generated);
    return generated;
  });

  // Current Subject and Questions
  const activeSubjectName = selectedSubjects[currentSubjectIdx] || 'English';
  const currentSubjectQuestions = getQuestionsForSubject(activeSubjectName);
  const activeQuestion: CbtQuestion | undefined = currentSubjectQuestions[currentQuestionIdx];

  // 120-Minute Countdown Clock for Mock Exam
  useEffect(() => {
    if (!isExamStarted || isExamSubmitted || isTimerPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isExamSubmitted, isTimerPaused]);

  // Keyboard Shortcuts for Authentic CBT Experience (A, B, C, D, N, P, F)
  useEffect(() => {
    if (!isExamStarted || isExamSubmitted || showSubmitConfirmModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input field
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key) && activeQuestion) {
        handleSelectAnswer(key as 'A' | 'B' | 'C' | 'D');
      } else if (key === 'N') {
        handleNextQuestion();
      } else if (key === 'P') {
        handlePrevQuestion();
      } else if (key === 'F') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExamStarted, isExamSubmitted, showSubmitConfirmModal, currentQuestionIdx, currentSubjectIdx, activeQuestion]);

  // Answer Picking Handler
  const handleSelectAnswer = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (!activeQuestion) return;
    setAnswers((prev) => {
      const subjectAnswers = prev[activeSubjectName] || {};
      return {
        ...prev,
        [activeSubjectName]: {
          ...subjectAnswers,
          [activeQuestion.id]: optionKey,
        },
      };
    });
  };

  // Flag Question Toggle
  const handleToggleFlag = () => {
    if (!activeQuestion) return;
    setFlagged((prev) => {
      const subjectFlagged = prev[activeSubjectName] || {};
      return {
        ...prev,
        [activeSubjectName]: {
          ...subjectFlagged,
          [activeQuestion.id]: !subjectFlagged[activeQuestion.id],
        },
      };
    });
  };

  // Navigation handlers
  const handleNextQuestion = () => {
    if (currentQuestionIdx < currentSubjectQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else if (currentSubjectIdx < selectedSubjects.length - 1) {
      // Move to next subject automatically if at end of current subject questions
      setCurrentSubjectIdx((prev) => prev + 1);
      setCurrentQuestionIdx(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    } else if (currentSubjectIdx > 0) {
      setCurrentSubjectIdx((prev) => prev - 1);
      const prevSubj = selectedSubjects[currentSubjectIdx - 1];
      const prevQuestions = getQuestionsForSubject(prevSubj);
      setCurrentQuestionIdx(Math.max(0, prevQuestions.length - 1));
    }
  };

  // Exam Submission Handler
  const handleFinalSubmit = () => {
    const results = calculateExamResults(selectedSubjects, answers);
    setExamResults(results);
    setIsExamSubmitted(true);
    setShowSubmitConfirmModal(false);

    // Save exam attempt in localStorage
    try {
      const history = JSON.parse(localStorage.getItem('jamb_cbt_attempts') || '[]');
      history.unshift({
        date: new Date().toLocaleDateString('en-GB'),
        score: results.totalScore,
        subjects: selectedSubjects,
        tier: results.performanceTier,
      });
      localStorage.setItem('jamb_cbt_attempts', JSON.stringify(history.slice(0, 10)));
    } catch {
      // ignore
    }

    if (onAdTriggered) {
      onAdTriggered();
    }
  };

  // Format Seconds to HH:MM:SS
  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  // Check how many questions have been answered for a given subject
  const getSubjectAnsweredCount = (subj: string) => {
    return Object.keys(answers[subj] || {}).length;
  };

  // Total answered questions across all 4 registered subjects
  const totalAnsweredAcrossExam = selectedSubjects.reduce((acc, subj) => {
    return acc + getSubjectAnsweredCount(subj);
  }, 0);

  const totalQuestionsAcrossExam = selectedSubjects.reduce((acc, subj) => {
    return acc + getQuestionsForSubject(subj).length;
  }, 0);

  // Timer Color Indicator based on urgency
  const getTimerColorClass = () => {
    if (timeRemaining <= 300) {
      // Under 5 minutes: urgent pulsing red
      return 'bg-red-600 text-white font-black animate-pulse shadow-md';
    }
    if (timeRemaining <= 900) {
      // Under 15 minutes: warning amber
      return 'bg-amber-500 text-slate-950 font-black shadow-sm';
    }
    // Normal: official academic emerald
    return 'bg-emerald-900 text-emerald-100 font-mono font-bold';
  };

  // Restart / Retake Exam
  const handleRetakeExam = () => {
    setAnswers({});
    setFlagged({});
    setTimeRemaining(7200);
    setCurrentSubjectIdx(0);
    setCurrentQuestionIdx(0);
    setIsExamSubmitted(false);
    setIsReviewOpen(false);
    setIsExamStarted(true);
  };

  // WhatsApp Share Results
  const handleShareResultSlip = () => {
    if (!examResults) return;
    const publicUrl = getSafeShareUrl();
    const message =
      `🇳🇬 *JAMB UTME CBT MOCK PERFORMANCE SLIP*\n` +
      `_Official Score Report for ${mockRegNumber}_\n\n` +
      `🎯 *AGGREGATE UTME SCORE: ${examResults.totalScore} / 400*\n` +
      `📊 *Status:* ${examResults.performanceTier}\n\n` +
      `📋 *SUBJECT BREAKDOWN:*\n` +
      examResults.subjectScores
        .map((s) => `• *${s.subject}:* ${s.score} / 100 (${s.correctCount}/${s.totalCount} correct)`)
        .join('\n') +
      `\n\n` +
      `💡 *Admissions Rating:*\n${examResults.advice}\n\n` +
      `🔗 *Practice authentic JAMB CBT past questions free here:*\n${publicUrl}`;

    openWhatsAppShare(message);
  };

  return (
    <div className="space-y-6">
      {/* Top Academic Sub-Navigation Switcher: 4-Subject Mock vs Single-Subject Drill */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold w-full sm:w-auto">
          <button
            onClick={() => setExamMode('mock')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 ${
              examMode === 'mock'
                ? 'bg-emerald-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Full 4-Subject JAMB Mock (120 Mins)</span>
          </button>
          <button
            onClick={() => setExamMode('drill')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-2 ${
              examMode === 'drill'
                ? 'bg-emerald-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Topical Speed Drill</span>
          </button>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-mono text-slate-500 block">Candidate Mock ID</span>
          <span className="text-xs font-mono font-bold text-emerald-900">{mockRegNumber}</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: OFFICIAL 4-SUBJECT JAMB UTME CBT MOCK EXAM            */}
      {/* ============================================================== */}
      {examMode === 'mock' && (
        <div className="space-y-6">
          {/* 1. Pre-Exam Registration / Subject Combination Picker if not yet started */}
          {!isExamStarted && !isExamSubmitted && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-emerald-950 font-black text-lg">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  <h2>JAMB UTME CBT Mock Examination Hall</h2>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Experience the exact layout, timing, question jumper palette, and marking scheme used in accredited JAMB CBT centers across Nigeria.
                </p>
              </div>

              {/* Step 1: Pick Candidate 4 Registered Subjects */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Step 1: Confirm Your 4 Registered UTME Subjects:
                  </label>
                  <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedSubjects.length} of 4 Subjects Selected
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CBT_SUBJECTS_LIST.map((subj) => {
                    const isSelected = selectedSubjects.includes(subj.id);
                    const isCompulsory = subj.isCompulsory;

                    return (
                      <button
                        key={subj.id}
                        type="button"
                        disabled={isCompulsory}
                        onClick={() => {
                          if (isCompulsory) return;
                          if (isSelected) {
                            if (selectedSubjects.length > 2) {
                              setSelectedSubjects(selectedSubjects.filter((s) => s !== subj.id));
                            }
                          } else {
                            if (selectedSubjects.length < 4) {
                              setSelectedSubjects([...selectedSubjects, subj.id]);
                            }
                          }
                        }}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between h-20 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs">{subj.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-700" />}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>{subj.facultyGroup}</span>
                          {isCompulsory && (
                            <span className="text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                              Compulsory
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Exam Rules Overview */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Official 120 Minutes</span>
                    <span className="text-slate-600 text-[11px]">Countdown timer auto-submits at 00:00.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bookmark className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Jumper &amp; Flags</span>
                    <span className="text-slate-600 text-[11px]">Flag tricky questions and jump between numbers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Scaled 400 Marks</span>
                    <span className="text-slate-600 text-[11px]">Instant result slip with merit evaluation.</span>
                  </div>
                </div>
              </div>

              {/* Launch Exam Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsExamStarted(true);
                    if (onAdTriggered) onAdTriggered();
                  }}
                  disabled={selectedSubjects.length !== 4}
                  className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                    selectedSubjects.length === 4
                      ? 'bg-emerald-950 hover:bg-emerald-900 text-amber-400'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Start 4-Subject Mock Exam</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. Active CBT Exam Interface */}
          {isExamStarted && !isExamSubmitted && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col space-y-4">
              {/* CBT Header Bar: Subject Tabs & Timer */}
              <div className="bg-emerald-950 text-white p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-amber-500">
                {/* 4 Registered Subjects Switcher */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {selectedSubjects.map((subj, idx) => {
                    const answered = getSubjectAnsweredCount(subj);
                    const totalQ = getQuestionsForSubject(subj).length;
                    const isActive = currentSubjectIdx === idx;

                    return (
                      <button
                        key={subj}
                        onClick={() => {
                          setCurrentSubjectIdx(idx);
                          setCurrentQuestionIdx(0);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
                        }`}
                      >
                        <span>{subj}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-slate-950 text-white' : 'bg-emerald-950 text-emerald-300'}`}>
                          {answered}/{totalQ}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Countdown Clock & Submit Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className={`px-3 py-1 rounded-xl text-xs flex items-center gap-1.5 transition-all ${getTimerColorClass()}`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimer(timeRemaining)}</span>
                  </div>

                  <button
                    onClick={() => setShowSubmitConfirmModal(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-1.5 rounded-xl text-xs transition cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <span>Submit Exam</span>
                  </button>
                </div>
              </div>

              {/* Main Examination Viewport */}
              <div className="p-4 sm:p-6 space-y-5">
                {/* Question Metadata Banner */}
                {activeQuestion && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                        Question {currentQuestionIdx + 1} of {currentSubjectQuestions.length}
                      </span>
                      <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                        &bull; {activeQuestion.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {activeQuestion.year}
                      </span>
                      <button
                        onClick={handleToggleFlag}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer ${
                          flagged[activeSubjectName]?.[activeQuestion.id]
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'text-slate-500 hover:text-slate-800 bg-slate-50'
                        }`}
                        title="Flag to review later"
                      >
                        <Flag className={`w-3.5 h-3.5 ${flagged[activeSubjectName]?.[activeQuestion.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                        <span>{flagged[activeSubjectName]?.[activeQuestion.id] ? 'Flagged' : 'Flag'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Question Text */}
                {activeQuestion ? (
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                      {activeQuestion.question}
                    </p>

                    {/* 4 Interactive Options (A, B, C, D) */}
                    <div className="space-y-2.5 pt-1">
                      {activeQuestion.options.map((opt) => {
                        const isSelected = answers[activeSubjectName]?.[activeQuestion.id] === opt.key;

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => handleSelectAnswer(opt.key)}
                            className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition ${
                                isSelected
                                  ? 'bg-emerald-800 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span className="text-xs sm:text-sm leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-center py-8 text-xs text-slate-500">No questions available for this subject.</p>
                )}

                {/* Control Action Buttons (Previous, Next, Status) */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentSubjectIdx === 0 && currentQuestionIdx === 0}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="text-[11px] text-slate-500 hidden sm:block">
                    Use Keys <strong>A, B, C, D</strong> to pick &bull; <strong>N</strong> next &bull; <strong>P</strong> previous
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={
                      currentSubjectIdx === selectedSubjects.length - 1 &&
                      currentQuestionIdx === currentSubjectQuestions.length - 1
                    }
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-950 hover:bg-emerald-900 text-white flex items-center gap-1 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Authentic Question Jumper Palette (Numbers 1 to 40) */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>{activeSubjectName} Question Palette:</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                        <span>Answered</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                        <span>Flagged</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>
                        <span>Empty</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 pt-1">
                    {currentSubjectQuestions.map((q, idx) => {
                      const isAnswered = answers[activeSubjectName]?.[q.id] !== undefined;
                      const isFlagged = flagged[activeSubjectName]?.[q.id];
                      const isCurrent = currentQuestionIdx === idx;

                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                      if (isFlagged) {
                        btnStyle = 'bg-amber-400 text-slate-950 font-bold border-amber-500';
                      } else if (isAnswered) {
                        btnStyle = 'bg-emerald-800 text-white font-bold border-emerald-900';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIdx(idx)}
                          className={`h-8 rounded-lg text-xs font-mono transition cursor-pointer border flex items-center justify-center ${btnStyle} ${
                            isCurrent ? 'ring-2 ring-emerald-500 ring-offset-1' : ''
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Official JAMB Mock Result Slip upon Completion */}
          {isExamSubmitted && examResults && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md space-y-6">
              {/* Slip Official Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 border-b-4 border-amber-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="w-6 h-6 text-amber-400" />
                      <span className="text-[11px] uppercase tracking-widest font-mono text-emerald-300 font-bold">
                        Official Mock Evaluation Slip
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                      JAMB UTME CBT Performance Slip
                    </h2>
                    <p className="text-xs text-emerald-200 font-mono mt-0.5">
                      Session: 2026/2027 &bull; Mock Reg: {mockRegNumber}
                    </p>
                  </div>

                  {/* Aggregate Big Score Badge */}
                  <div className="bg-emerald-800/80 border border-emerald-500/40 rounded-2xl p-4 text-center shrink-0 shadow-inner">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Total UTME Score</span>
                    <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                      {examResults.totalScore}
                    </span>
                    <span className="text-[11px] text-emerald-200 font-mono block">/ 400</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Performance Evaluation Rating */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                      Academic Standing &amp; Merit Tier
                    </span>
                    <span className="text-xs font-bold font-mono bg-emerald-800 text-white px-2 py-0.5 rounded">
                      {examResults.performanceTier}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    {examResults.advice}
                  </p>
                </div>

                {/* Subject-by-Subject Score Cards */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Subject Score Breakdown (Out of 100 Each):
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {examResults.subjectScores.map((subj) => (
                      <div
                        key={subj.subject}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-xs text-slate-900 block">{subj.subject}</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {subj.correctCount} of {subj.totalCount} correct
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black font-mono text-emerald-900 block">
                            {subj.score}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slip Action Buttons: Share, Review Answers, Retake */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleShareResultSlip}
                    className="w-full sm:flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Score Slip on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setIsReviewOpen(!isReviewOpen)}
                    className="w-full sm:flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{isReviewOpen ? 'Hide Answer Solutions' : 'Review Solutions & Traps'}</span>
                  </button>

                  <button
                    onClick={handleRetakeExam}
                    className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Mock</span>
                  </button>
                </div>

                {/* Step-by-Step Question Review Mode with Traps */}
                {isReviewOpen && (
                  <div className="border-t border-slate-200 pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>Examiner's Detailed Solutions &amp; Pitfalls</span>
                      </h4>

                      {/* Subject Switcher in Review */}
                      <div className="flex gap-1">
                        {selectedSubjects.map((subj, idx) => (
                          <button
                            key={subj}
                            onClick={() => {
                              setReviewSubjectIdx(idx);
                              setReviewQuestionIdx(0);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                              reviewSubjectIdx === idx
                                ? 'bg-emerald-900 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {subj}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Active Question */}
                    {(() => {
                      const revSubj = selectedSubjects[reviewSubjectIdx];
                      const revQuestions = getQuestionsForSubject(revSubj);
                      const revQ = revQuestions[reviewQuestionIdx];
                      const userPick = answers[revSubj]?.[revQ?.id];
                      const isCorrect = userPick === revQ?.correct;

                      if (!revQ) return null;

                      return (
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <span className="font-mono text-xs font-bold text-slate-700">
                              {revSubj} &bull; Question {reviewQuestionIdx + 1} of {revQuestions.length}
                            </span>
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                isCorrect
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                              }`}
                            >
                              {isCorrect ? 'Correct (+1)' : userPick ? `Wrong (Picked ${userPick})` : 'Unanswered (0)'}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-semibold text-slate-900">{revQ.question}</p>

                          {/* Options breakdown */}
                          <div className="space-y-1.5">
                            {revQ.options.map((opt) => {
                              const isThisCorrect = opt.key === revQ.correct;
                              const isThisUserPick = userPick === opt.key;

                              let optColor = 'bg-white border-slate-200 text-slate-700';
                              if (isThisCorrect) {
                                optColor = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                              } else if (isThisUserPick && !isThisCorrect) {
                                optColor = 'bg-red-50 border-red-400 text-red-950';
                              }

                              return (
                                <div
                                  key={opt.key}
                                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optColor}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold">{opt.key}.</span>
                                    <span>{opt.text}</span>
                                  </div>
                                  {isThisCorrect && (
                                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded">
                                      Official Key
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation and Trap Warning */}
                          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 space-y-1.5 text-xs text-emerald-950">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Step-by-Step Explanation:</span>
                            </div>
                            <p className="leading-relaxed">{revQ.explanation}</p>
                          </div>

                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1 text-xs text-amber-950">
                            <div className="flex items-center gap-1.5 font-bold text-amber-900">
                              <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
                              <span>Examiner's Trap Warning:</span>
                            </div>
                            <p className="leading-relaxed">{revQ.trapWarning}</p>
                          </div>

                          {/* Review navigation */}
                          <div className="flex items-center justify-between pt-2">
                            <button
                              onClick={() => setReviewQuestionIdx((prev) => Math.max(0, prev - 1))}
                              disabled={reviewQuestionIdx === 0}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                            >
                              &larr; Previous Question
                            </button>
                            <span className="text-[11px] font-mono text-slate-500">
                              {reviewQuestionIdx + 1} / {revQuestions.length}
                            </span>
                            <button
                              onClick={() =>
                                setReviewQuestionIdx((prev) => Math.min(revQuestions.length - 1, prev + 1))
                              }
                              disabled={reviewQuestionIdx === revQuestions.length - 1}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-900 text-white hover:bg-emerald-950 disabled:opacity-40"
                            >
                              Next Question &rarr;
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: TOPICAL SPEED DRILL (QUICK SINGLE SUBJECT PRACTICE)    */}
      {/* ============================================================== */}
      {examMode === 'drill' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
          {/* Subject Selector Bar */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
              Select Subject for Speed Drill:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {CBT_SUBJECTS_LIST.map((subj) => (
                <button
                  key={subj.id}
                  onClick={() => {
                    setDrillSubject(subj.id);
                    setDrillQuestionIdx(0);
                    setDrillSelectedAnswer(null);
                    setDrillIsAnswerRevealed(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    drillSubject === subj.id
                      ? 'bg-emerald-950 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {subj.name}
                </button>
              ))}
            </div>
          </div>

          {/* Drill Active Question Card */}
          {(() => {
            const drillQuestions = getQuestionsForSubject(drillSubject);
            const q = drillQuestions[drillQuestionIdx];

            if (!q) {
              return <p className="text-xs text-slate-500 py-6 text-center">No questions found for this subject.</p>;
            }

            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      Question {drillQuestionIdx + 1} of {drillQuestions.length}
                    </span>
                    <span className="text-xs text-slate-500">&bull; {q.topic}</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {q.year}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                  {q.question}
                </p>

                {/* Drill Options */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = drillSelectedAnswer === opt.key;
                    const isCorrect = opt.key === q.correct;

                    let optClass = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';
                    if (drillIsAnswerRevealed) {
                      if (isCorrect) {
                        optClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optClass = 'bg-red-100 border-red-400 text-red-950 font-medium';
                      }
                    } else if (isSelected) {
                      optClass = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          if (drillIsAnswerRevealed) return;
                          setDrillSelectedAnswer(opt.key);
                          setDrillIsAnswerRevealed(true);
                          setDrillAttemptedCount((prev) => prev + 1);
                          if (opt.key === q.correct) {
                            setDrillScore((prev) => prev + 1);
                          }
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${optClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-800 font-mono font-bold text-xs flex items-center justify-center">
                            {opt.key}
                          </span>
                          <span className="text-xs sm:text-sm">{opt.text}</span>
                        </div>
                        {drillIsAnswerRevealed && isCorrect && (
                          <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Details */}
                {drillIsAnswerRevealed && (
                  <div className="space-y-3 pt-2">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-1 text-xs text-emerald-950">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Step-by-Step Explanation:</span>
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1 text-xs text-amber-950">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <AlertOctagon className="w-4 h-4 text-amber-600" />
                        <span>Examiner's Trap Warning:</span>
                      </div>
                      <p className="leading-relaxed">{q.trapWarning}</p>
                    </div>
                  </div>
                )}

                {/* Drill Navigation */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs font-mono text-slate-500">
                    Drill Accuracy: <strong>{drillScore}</strong> / {drillAttemptedCount}
                  </span>

                  <button
                    onClick={() => {
                      setDrillQuestionIdx((prev) => (prev + 1) % drillQuestions.length);
                      setDrillSelectedAnswer(null);
                      setDrillIsAnswerRevealed(false);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-950 hover:bg-emerald-900 text-white flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Next Drill Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Confirmation Modal before Submitting 4-Subject Mock Exam */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Submit Examination?</h3>
                <p className="text-xs text-slate-500">Confirm your answers summary before submitting.</p>
              </div>
            </div>

            {/* Answered Summary by Subject */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs">
              {selectedSubjects.map((subj) => {
                const ansCount = getSubjectAnsweredCount(subj);
                const totalQ = getQuestionsForSubject(subj).length;

                return (
                  <div key={subj} className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{subj}:</span>
                    <span className="font-mono text-slate-600">
                      {ansCount} of {totalQ} Answered
                    </span>
                  </div>
                );
              })}

              <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between font-bold text-slate-900">
                <span>Total Answered:</span>
                <span className="font-mono text-emerald-800">
                  {totalAnsweredAcrossExam} of {totalQuestionsAcrossExam}
                </span>
              </div>
            </div>

            {totalAnsweredAcrossExam < totalQuestionsAcrossExam && (
              <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 font-medium">
                ⚠️ You still have {totalQuestionsAcrossExam - totalAnsweredAcrossExam} unanswered questions!
              </p>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition cursor-pointer"
              >
                Return to Exam
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-black bg-emerald-950 hover:bg-emerald-900 text-amber-400 transition cursor-pointer shadow-xs"
              >
                Yes, Submit Final Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
