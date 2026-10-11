/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COURSES, FACULTIES, CourseItem } from './data/jambData';
import { AdmissionCardCanvas } from './components/AdmissionCardCanvas';
import { UniversityCutOffs } from './components/UniversityCutOffs';
import { AggregateCalculator } from './components/AggregateCalculator';
import { ExamScheduleTab } from './components/ExamScheduleTab';
import { ReadHubTab } from './components/ReadHubTab';
import { CbtPracticeTab } from './components/CbtPracticeTab';
import { AiCounselor } from './components/AiCounselor';
import { UserProfileTab } from './components/UserProfileTab';
import { CountdownWidget } from './components/CountdownWidget';
import { ShareModal } from './components/ShareModal';
import { InstallAppModal } from './components/InstallAppModal';
import { usePWAInstall } from './hooks/usePWAInstall';
import { safeOpenLink } from './utils/safeOpen';
import { auth, onAuthStateChanged, User } from './firebase';
import {
  GraduationCap,
  BookOpen,
  Award,
  Building2,
  Calendar,
  Bot,
  User as UserIcon,
  Search,
  CheckCircle2,
  AlertTriangle,
  Share2,
  ExternalLink,
  Shield,
  Sparkles,
  AlertOctagon,
  Flame,
  Calculator,
  Lightbulb,
  Check,
  CheckSquare,
  Download,
} from 'lucide-react';

const DEFAULT_MONETAG_LINK = 'https://uplcm.com/4/11981826';

export default function App() {
  // PWA Install Prompt Hook
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // 5 Clean Bottom Tabs: courses | practice | readhub | card | ai
  const [activeTab, setActiveTab] = useState<'courses' | 'practice' | 'readhub' | 'card' | 'ai'>('courses');
  const [courseSubView, setCourseSubView] = useState<'combos' | 'checker' | 'cutoffs' | 'aggregate' | 'schedule'>('combos');
  const [userSelectedElectives, setUserSelectedElectives] = useState<string[]>(['Biology', 'Chemistry', 'Physics']);
  const [checkerFilter, setCheckerFilter] = useState<'all' | 'eligible' | 'disqualified'>('all');

  // Dynamic Session Year (e.g. 2026/2027 auto-advancing)
  const currentYear = new Date().getFullYear();
  const sessionString = `${currentYear}/${currentYear + 1} Session`;

  // Global Share Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Counselor Tab Sub-View: 'advisor' | 'profile'
  const [counselorSubTab, setCounselorSubTab] = useState<'advisor' | 'profile'>('advisor');

  // Firebase User
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Monetag Ad Link (Private / Hidden from regular students)
  const [monetagLink, setMonetagLink] = useState<string>(() => {
    return localStorage.getItem('naija_monetag_link') || DEFAULT_MONETAG_LINK;
  });
  const [adTriggerCount, setAdTriggerCount] = useState<number>(() => {
    const s = localStorage.getItem('naija_ad_count');
    return s ? Number(s) : 0;
  });

  // Candidate Data
  const [candidateName, setCandidateName] = useState('Chinedu Okafor');
  const [jambScore, setJambScore] = useState<number>(245);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('med-surg');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('All Faculties');
  const [courseSearch, setCourseSearch] = useState<string>('');

  // Listen to Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Sync Monetag settings
  useEffect(() => {
    localStorage.setItem('naija_monetag_link', monetagLink);
  }, [monetagLink]);

  useEffect(() => {
    localStorage.setItem('naija_ad_count', adTriggerCount.toString());
  }, [adTriggerCount]);

  const handleRecordAdTrigger = () => {
    setAdTriggerCount((prev) => prev + 1);
  };

  const handleTriggerDirectAd = () => {
    if (monetagLink) {
      safeOpenLink(monetagLink);
      handleRecordAdTrigger();
    }
  };

  const selectedCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const filteredCourses = COURSES.filter((c) => {
    const matchesFaculty = selectedFaculty === 'All Faculties' || c.faculty === selectedFaculty;
    const matchesSearch = c.name.toLowerCase().includes(courseSearch.toLowerCase());
    return matchesFaculty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans pb-20 sm:pb-24 selection:bg-emerald-800 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Official Academic Top Bar */}
      <header className="bg-emerald-950 text-white border-b-4 border-amber-500 shadow-md sticky top-0 z-40 w-full">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-800 border border-emerald-600 flex items-center justify-center text-amber-400 font-black shadow-md shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-black text-sm sm:text-base md:text-lg tracking-tight leading-none text-white truncate">
                  NaijaCampus <span className="text-amber-400"><span className="hidden sm:inline">Admission </span>Portal</span>
                </h1>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono hidden sm:inline shrink-0">
                  {sessionString}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-emerald-300 mt-0.5 truncate">
                JAMB UTME &bull; WAEC &bull; Polytechnics &bull; Cut-Offs
              </p>
            </div>
          </div>

          {/* Multi-Exam Portal & Cut-Offs Share Button + PWA Download */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {!isInstalled && (
              <button
                onClick={() => {
                  if (isInstallable) {
                    install();
                  } else {
                    setIsInstallModalOpen(true);
                  }
                }}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1 shadow-sm transition cursor-pointer shrink-0"
                title="Download / Install App to Phone"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Download App</span>
                <span className="sm:hidden">Install</span>
              </button>
            )}

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1 shadow-sm transition cursor-pointer shrink-0"
              title="Share Exam Portal, Combos, Cut-Offs & Read Hub"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Share Portal &amp; Cut-Offs</span>
              <span className="sm:hidden">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Official Bulletin Banner (Sponsored Ad Placement) */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-900 flex items-center justify-center gap-2">
        <span className="font-bold bg-amber-200 text-amber-950 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
          BULLETIN
        </span>
        <button
          onClick={handleTriggerDirectAd}
          className="text-emerald-900 font-bold underline hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
        >
          <span>Tap here to check {currentYear}/{currentYear + 1} Tertiary Scholarship Grants</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Main Workspace */}
      <main className="max-w-5xl mx-auto w-full px-4 py-6 flex-1 space-y-6">
        {/* ================= TAB 1: COURSES, COMBOS & CUT-OFFS ================= */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Top Exam Countdown Clock */}
            <CountdownWidget onExploreTimetable={() => setCourseSubView('schedule')} />

            {/* Sub-Switch: Subject Combos vs Subject Checker vs School Cut-Offs vs Aggregate Calculator vs Exam Timetable */}
            <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-5 bg-slate-200 p-1 rounded-2xl text-xs font-bold max-w-2xl mx-auto shadow-inner gap-1">
              <button
                onClick={() => setCourseSubView('combos')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 sm:shrink ${
                  courseSubView === 'combos'
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Course Combos</span>
              </button>

              <button
                onClick={() => setCourseSubView('checker')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 sm:shrink ${
                  courseSubView === 'checker'
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Check 4 Subjects</span>
              </button>

              <button
                onClick={() => setCourseSubView('cutoffs')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 sm:shrink ${
                  courseSubView === 'cutoffs'
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>School Cut-Offs</span>
              </button>

              <button
                onClick={() => setCourseSubView('aggregate')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 sm:shrink ${
                  courseSubView === 'aggregate'
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Aggregate</span>
              </button>

              <button
                onClick={() => setCourseSubView('schedule')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 sm:shrink ${
                  courseSubView === 'schedule'
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Timetable</span>
              </button>
            </div>

            {courseSubView === 'combos' ? (
              <div className="space-y-6">
                {/* Faculty & Search */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-800" />
                        <span>Degree Programme & Faculty Selector</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Check the 4 compulsory JAMB subjects and 5 WAEC credit requirements.
                      </p>
                    </div>

                    <select
                      value={selectedFaculty}
                      onChange={(e) => setSelectedFaculty(e.target.value)}
                      className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold w-full sm:w-auto focus:outline-hidden focus:border-emerald-700"
                    >
                      {FACULTIES.map((fac) => (
                        <option key={fac} value={fac}>
                          {fac}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course Search */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      placeholder="Search course (e.g. Medicine, Computer Science, Law, Nursing, Accounting)..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-700 transition"
                    />
                  </div>

                  {/* Course Badges */}
                  <div className="flex flex-wrap gap-2 pt-1 max-h-36 overflow-y-auto pr-1">
                    {filteredCourses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCourseId(c.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          selectedCourse.id === c.id
                            ? 'bg-emerald-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Course Deep-Dive */}
                <div className="bg-white border-2 border-emerald-900/30 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        {selectedCourse.faculty}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                        {selectedCourse.name}
                      </h3>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-1.5 text-center">
                        <span className="text-[10px] text-slate-500 block uppercase font-medium">Safe UTME</span>
                        <strong className="text-base font-black text-emerald-800 font-mono">
                          {selectedCourse.competitiveScore}+
                        </strong>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-center">
                        <span className="text-[10px] text-slate-500 block uppercase font-medium">Minimum</span>
                        <strong className="text-base font-black text-slate-700 font-mono">
                          {selectedCourse.minimumScore}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* 4 Compulsory Subjects Highlight */}
                  <div className="bg-emerald-950 text-white rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-amber-400" />
                        <h4 className="text-sm font-bold tracking-wide">
                          VERIFIED 4 JAMB UTME SUBJECT COMBINATION
                        </h4>
                      </div>
                      <span className="text-[11px] text-emerald-300 font-mono hidden sm:inline">
                        JAMB Brochure Standard
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedCourse.jambSubjects.map((sub, idx) => (
                        <div
                          key={idx}
                          className="bg-emerald-900/80 border border-emerald-700 rounded-xl p-3 text-center"
                        >
                          <span className="text-[10px] text-emerald-300 font-mono block">
                            Subject #{idx + 1}
                          </span>
                          <strong className="text-xs sm:text-sm text-white block mt-0.5">
                            {sub}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Counselor Chioma's Brochure Pro-Tip & Common Pitfall Callout */}
                  {selectedCourse.riskWarning && (
                    <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3 shadow-xs">
                      <div className="w-8 h-8 rounded-xl bg-amber-200/80 border border-amber-400 flex items-center justify-center shrink-0 text-amber-900 font-bold">
                        <Lightbulb className="w-4 h-4 text-amber-800" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="bg-amber-200 text-amber-950 font-black px-2 py-0.5 rounded text-[10px] tracking-wide uppercase font-mono">
                            💡 COUNSELOR CHIOMA'S BROCHURE PRO-TIP
                          </span>
                          <span className="text-[11px] text-amber-800 font-semibold">
                            Official Mistake to Avoid in JAMB
                          </span>
                        </div>
                        <p className="text-amber-900 font-medium leading-relaxed">
                          {selectedCourse.riskWarning}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* WAEC Credits & Advisory */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <strong className="text-xs font-bold text-slate-900 block mb-2 uppercase tracking-wide">
                        Mandatory 5 O’Level Credits (WAEC/NECO):
                      </strong>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {selectedCourse.waecCredits.map((cred, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <strong className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Important Admission Advisory:</span>
                        </strong>
                        <p className="text-xs text-amber-900 leading-relaxed">
                          {selectedCourse.advice}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-amber-200/80 flex gap-2">
                        <button
                          onClick={() => setActiveTab('readhub')}
                          className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Practice in Read Hub &rarr;</span>
                        </button>
                        <button
                          onClick={() => setActiveTab('card')}
                          className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                        >
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>Generate Slip &rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : courseSubView === 'checker' ? (
              /* ================= INTERACTIVE 4-SUBJECT ELIGIBILITY CHECKER ================= */
              <div className="space-y-6">
                {/* Subject Selector Console */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm">
                          🎯
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Interactive 4-Subject Eligibility Checker
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Select your 3 UTME electives below. The system checks all Nigerian degree programmes to detect disqualifications before registration!
                      </p>
                    </div>

                    <button
                      onClick={() => setUserSelectedElectives([])}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Reset Selection
                    </button>
                  </div>

                  {/* 4 Selected Subjects Badges */}
                  <div className="bg-slate-950 text-white rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-400" />
                        <span>Your 4 JAMB UTME Examination Subjects:</span>
                      </span>
                      <span className="font-mono text-emerald-400 text-[11px] font-bold">
                        {userSelectedElectives.length + 1} / 4 Selected
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {/* Compulsory English */}
                      <div className="bg-emerald-900/90 border-2 border-emerald-500 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-emerald-300 font-bold block uppercase tracking-wide">
                          Subject #1 (Compulsory)
                        </span>
                        <strong className="text-xs sm:text-sm text-white block mt-0.5">
                          Use of English
                        </strong>
                        <span className="text-[9px] bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded font-mono inline-block mt-1">
                          Locked (100% Mandatory)
                        </span>
                      </div>

                      {/* 3 Electives */}
                      {[0, 1, 2].map((slotIdx) => {
                        const chosen = userSelectedElectives[slotIdx];
                        return (
                          <div
                            key={slotIdx}
                            className={`rounded-xl p-3 text-center border-2 transition ${
                              chosen
                                ? 'bg-slate-900 border-amber-400 text-white'
                                : 'bg-slate-900/60 border-dashed border-slate-700 text-slate-400'
                            }`}
                          >
                            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">
                              Elective #{slotIdx + 1}
                            </span>
                            <strong className="text-xs sm:text-sm block mt-0.5 truncate">
                              {chosen || `Pick Subject #${slotIdx + 2}`}
                            </strong>
                            {chosen ? (
                              <button
                                onClick={() =>
                                  setUserSelectedElectives(
                                    userSelectedElectives.filter((s) => s !== chosen)
                                  )
                                }
                                className="text-[9px] text-amber-300 hover:text-amber-200 underline mt-1 block mx-auto cursor-pointer"
                              >
                                ✕ Remove
                              </button>
                            ) : (
                              <span className="text-[9px] text-slate-500 block mt-1">
                                Tap below to choose
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Elective Selection Grid */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Choose 3 Elective Subjects from Nigerian Secondary Curriculum:
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {[
                        'Biology',
                        'Chemistry',
                        'Physics',
                        'Mathematics',
                        'Agricultural Science',
                        'Economics',
                        'Government',
                        'Literature in English',
                        'CRS (Christian Religious Studies)',
                        'IRS (Islamic Religious Studies)',
                        'Commerce',
                        'Financial Accounting',
                        'Geography',
                        'Further Mathematics',
                        'History',
                      ].map((subject) => {
                        const isPicked = userSelectedElectives.includes(subject);
                        const isFull = userSelectedElectives.length >= 3;
                        return (
                          <button
                            key={subject}
                            disabled={!isPicked && isFull}
                            onClick={() => {
                              if (isPicked) {
                                setUserSelectedElectives(
                                  userSelectedElectives.filter((s) => s !== subject)
                                );
                              } else if (!isFull) {
                                setUserSelectedElectives([...userSelectedElectives, subject]);
                              }
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              isPicked
                                ? 'bg-emerald-900 text-white shadow-xs ring-2 ring-emerald-500'
                                : isFull
                                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300'
                            }`}
                          >
                            {isPicked ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <span className="text-slate-400">+</span>
                            )}
                            <span>{subject}</span>
                          </button>
                        );
                      })}
                    </div>

                    {userSelectedElectives.length < 3 && (
                      <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-3">
                        👉 Please tap <strong>{3 - userSelectedElectives.length} more</strong> subject(s) to view your eligibility report across all courses.
                      </p>
                    )}
                  </div>
                </div>

                {/* Real-Time Course Eligibility Report */}
                {userSelectedElectives.length === 3 && (() => {
                  const evaluateCourse = (course: CourseItem) => {
                    const chosen = ['English Language', ...userSelectedElectives.map((s) => s.toLowerCase())];

                    if (course.id === 'med-surg' || course.id === 'nursing' || course.id === 'pharmacy') {
                      const hasBio = chosen.some((s) => s.includes('bio'));
                      const hasChem = chosen.some((s) => s.includes('chem'));
                      const hasPhy = chosen.some((s) => s.includes('phys'));
                      const hasAgric = chosen.some((s) => s.includes('agric'));

                      if (hasBio && hasChem && hasPhy) {
                        return {
                          isEligible: true,
                          reason: '100% Brochure Compliant. Biology, Chemistry & Physics are verified.',
                        };
                      }
                      const missing: string[] = [];
                      if (!hasBio) missing.push('Biology');
                      if (!hasChem) missing.push('Chemistry');
                      if (!hasPhy) missing.push('Physics');
                      let extra = '';
                      if (hasAgric) extra = ' Agricultural Science is NOT accepted as a substitute for Biology/Physics in Nigerian medical faculties.';
                      return {
                        isEligible: false,
                        reason: `Disqualified by JAMB: Missing ${missing.join(', ')}.${extra}`,
                      };
                    }

                    if (course.id === 'comp-sci') {
                      const hasMath = chosen.some((s) => s.includes('math'));
                      const hasPhy = chosen.some((s) => s.includes('phys'));
                      const hasThird = chosen.some((s) => s.includes('chem') || s.includes('further') || s.includes('bio'));

                      if (hasMath && hasPhy && hasThird) {
                        return {
                          isEligible: true,
                          reason: '100% Brochure Compliant. Mathematics and Physics verified.',
                        };
                      }
                      const missing: string[] = [];
                      if (!hasMath) missing.push('Mathematics');
                      if (!hasPhy) missing.push('Physics');
                      if (!hasThird) missing.push('Chemistry or Further Maths');
                      return {
                        isEligible: false,
                        reason: `Disqualified: Missing ${missing.join(', ')}. Top universities require both Maths and Physics.`,
                      };
                    }

                    if (course.id === 'law') {
                      const hasLit = chosen.some((s) => s.includes('literat'));
                      const hasGov = chosen.some((s) => s.includes('govern') || s.includes('histor'));

                      if (hasLit && hasGov) {
                        return {
                          isEligible: true,
                          reason: '100% Brochure Compliant. Literature in English and Government verified.',
                        };
                      }
                      const missing: string[] = [];
                      if (!hasLit) missing.push('Literature in English');
                      if (!hasGov) missing.push('Government / History');
                      return {
                        isEligible: false,
                        reason: `Disqualified: Missing ${missing.join(', ')}. Literature in English is non-negotiable for Law in all Nigerian universities.`,
                      };
                    }

                    if (course.id === 'accounting') {
                      const hasMath = chosen.some((s) => s.includes('math'));
                      const hasEcon = chosen.some((s) => s.includes('econ'));
                      const hasThird = chosen.some(
                        (s) => s.includes('account') || s.includes('commerc') || s.includes('govern')
                      );

                      if (hasMath && hasEcon && hasThird) {
                        return {
                          isEligible: true,
                          reason: '100% Brochure Compliant. Mathematics and Economics verified.',
                        };
                      }
                      const missing: string[] = [];
                      if (!hasMath) missing.push('Mathematics');
                      if (!hasEcon) missing.push('Economics');
                      if (!hasThird) missing.push('Accounting, Commerce or Government');
                      return {
                        isEligible: false,
                        reason: `Disqualified: Missing ${missing.join(', ')}. Mathematics and Economics are compulsory.`,
                      };
                    }

                    if (course.id === 'mass-comm') {
                      const hasLit = chosen.some((s) => s.includes('literat'));
                      const hasArts = chosen.some(
                        (s) => s.includes('govern') || s.includes('crs') || s.includes('irs') || s.includes('histor')
                      );

                      if (hasLit && hasArts) {
                        return {
                          isEligible: true,
                          reason: '100% Brochure Compliant. Literature in English verified.',
                        };
                      }
                      const missing: string[] = [];
                      if (!hasLit) missing.push('Literature in English');
                      if (!hasArts) missing.push('Government, CRS, or IRS');
                      return {
                        isEligible: false,
                        reason: `Disqualified: Missing ${missing.join(', ')}. Literature is mandatory for UNILAG, UNN, and UI.`,
                      };
                    }

                    return {
                      isEligible: true,
                      reason: 'Subject combination is compatible with curriculum requirements.',
                    };
                  };

                  const evaluatedList = COURSES.map((c) => ({
                    course: c,
                    result: evaluateCourse(c),
                  }));

                  const eligibleCount = evaluatedList.filter((e) => e.result.isEligible).length;
                  const disqualifiedCount = evaluatedList.filter((e) => !e.result.isEligible).length;

                  const filteredList = evaluatedList.filter((item) => {
                    if (checkerFilter === 'eligible') return item.result.isEligible;
                    if (checkerFilter === 'disqualified') return !item.result.isEligible;
                    return true;
                  });

                  return (
                    <div className="space-y-4">
                      {/* Summary Filter Bar */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                        <div>
                          <strong className="text-sm font-black text-slate-900 block">
                            JAMB Brochure Screening Results:
                          </strong>
                          <p className="text-xs text-slate-500">
                            Based on Use of English + {userSelectedElectives.join(' + ')}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                          <button
                            onClick={() => setCheckerFilter('all')}
                            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                              checkerFilter === 'all'
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            All ({COURSES.length})
                          </button>
                          <button
                            onClick={() => setCheckerFilter('eligible')}
                            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                              checkerFilter === 'eligible'
                                ? 'bg-emerald-800 text-white'
                                : 'text-emerald-800 hover:bg-emerald-50'
                            }`}
                          >
                            <span>Eligible</span>
                            <span className="font-mono font-black">({eligibleCount})</span>
                          </button>
                          <button
                            onClick={() => setCheckerFilter('disqualified')}
                            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                              checkerFilter === 'disqualified'
                                ? 'bg-rose-800 text-white'
                                : 'text-rose-800 hover:bg-rose-50'
                            }`}
                          >
                            <span>Disqualified</span>
                            <span className="font-mono font-black">({disqualifiedCount})</span>
                          </button>
                        </div>
                      </div>

                      {/* Course Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredList.map(({ course, result }) => (
                          <div
                            key={course.id}
                            className={`rounded-2xl border p-5 transition shadow-xs space-y-3 ${
                              result.isEligible
                                ? 'bg-white border-emerald-300 hover:border-emerald-500'
                                : 'bg-slate-50 border-rose-200 hover:border-rose-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                                  {course.faculty}
                                </span>
                                <h4 className="font-black text-sm text-slate-900 mt-0.5">
                                  {course.name}
                                </h4>
                              </div>

                              <span
                                className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                                  result.isEligible
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                                }`}
                              >
                                {result.isEligible ? '✅ QUALIFIED' : '❌ DISQUALIFIED'}
                              </span>
                            </div>

                            <p
                              className={`text-xs p-3 rounded-xl leading-relaxed ${
                                result.isEligible
                                  ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 font-medium'
                                  : 'bg-rose-50 text-rose-950 border border-rose-200 font-medium'
                              }`}
                            >
                              {result.reason}
                            </p>

                            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                              <span className="text-slate-600">
                                Cut-off: <strong>{course.minimumScore} - {course.competitiveScore} pts</strong>
                              </span>

                              <button
                                onClick={() => {
                                  setSelectedCourseId(course.id);
                                  setCourseSubView('combos');
                                }}
                                className="text-emerald-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <span>View Full Guide &rarr;</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : courseSubView === 'aggregate' ? (
              /* ================= AGGREGATE POST-UTME CALCULATOR ================= */
              <AggregateCalculator
                monetagLink={monetagLink}
                onAdTriggered={handleRecordAdTrigger}
              />
            ) : courseSubView === 'schedule' ? (
              /* ================= EXAM DATES & LIVE TIMETABLES ================= */
              <ExamScheduleTab
                monetagLink={monetagLink}
                onAdTriggered={handleRecordAdTrigger}
              />
            ) : (
              /* ================= SCHOOL CUT-OFFS DIRECTORY ================= */
              <UniversityCutOffs
                userScore={jambScore}
                monetagLink={monetagLink}
                onAdTriggered={handleRecordAdTrigger}
              />
            )}
          </div>
        )}

        {/* ================= TAB 2: CBT PRACTICE & 4-SUBJECT MOCK EXAM ================= */}
        {activeTab === 'practice' && (
          <CbtPracticeTab
            monetagLink={monetagLink}
            onAdTriggered={handleRecordAdTrigger}
          />
        )}

        {/* ================= TAB 3: READ HUB (PRESCRIBED NOVELS & LITERATURE) ================= */}
        {activeTab === 'readhub' && (
          <ReadHubTab
            monetagLink={monetagLink}
            onAdTriggered={handleRecordAdTrigger}
          />
        )}

        {/* ================= TAB 4: WHATSAPP SLIP & MATRIC FLYER ================= */}
        {activeTab === 'card' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Generate Your WhatsApp Slip & Matric Flyer</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Type your name, course, and score to create your downloadable image.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Chinedu Okafor"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-hidden focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your UTME Score (out of 400)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={400}
                    value={jambScore}
                    onChange={(e) => setJambScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold font-mono focus:outline-hidden focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Selected Course
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-hidden focus:border-emerald-700"
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <AdmissionCardCanvas
              candidateName={candidateName}
              course={selectedCourse}
              jambScore={jambScore}
              monetagLink={monetagLink}
              onAdTriggered={handleRecordAdTrigger}
            />
          </div>
        )}

        {/* ================= TAB 5: AI COUNSELOR CHIOMA & FIREBASE ACCOUNT ================= */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            {/* Segmented Sub-Tab Switcher */}
            <div className="flex bg-slate-200 p-1 rounded-2xl max-w-sm mx-auto text-xs font-bold shadow-inner">
              <button
                onClick={() => setCounselorSubTab('advisor')}
                className={`flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  counselorSubTab === 'advisor'
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>🎓</span>
                <span>Counselor Chioma</span>
              </button>
              <button
                onClick={() => setCounselorSubTab('profile')}
                className={`flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  counselorSubTab === 'profile'
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>👤</span>
                <span>Profile &amp; PIN Portal</span>
              </button>
            </div>

            {counselorSubTab === 'advisor' ? (
              <AiCounselor
                monetagLink={monetagLink}
                onAdTriggered={handleRecordAdTrigger}
              />
            ) : (
              <UserProfileTab
                currentUser={currentUser}
                monetagLink={monetagLink}
                onSaveMonetagLink={(newLink) => setMonetagLink(newLink)}
                triggerCount={adTriggerCount}
                onOpenInstallModal={() => setIsInstallModalOpen(true)}
              />
            )}
          </div>
        )}
      </main>

      {/* FIXED BOTTOM NAVIGATION BAR (5 CLEAN TABS) */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-50 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-5 h-16 px-1">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex flex-col items-center justify-center gap-1 transition cursor-pointer py-1 ${
              activeTab === 'courses' ? 'text-emerald-950 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'courses' ? 'text-emerald-900 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[9px] sm:text-[10px] leading-none tracking-tight truncate max-w-full px-0.5">Courses</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex flex-col items-center justify-center gap-1 transition cursor-pointer py-1 ${
              activeTab === 'practice' ? 'text-emerald-950 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <CheckSquare className={`w-5 h-5 ${activeTab === 'practice' ? 'text-emerald-800 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[9px] sm:text-[10px] leading-none tracking-tight truncate max-w-full px-0.5">CBT Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('readhub')}
            className={`flex flex-col items-center justify-center gap-1 transition cursor-pointer py-1 ${
              activeTab === 'readhub' ? 'text-emerald-950 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${activeTab === 'readhub' ? 'text-amber-500 fill-amber-400 stroke-[2.2]' : 'text-slate-400'}`} />
            <span className="text-[9px] sm:text-[10px] leading-none tracking-tight truncate max-w-full px-0.5">Read Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('card')}
            className={`flex flex-col items-center justify-center gap-1 transition cursor-pointer py-1 ${
              activeTab === 'card' ? 'text-emerald-950 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <Award className={`w-5 h-5 ${activeTab === 'card' ? 'text-emerald-900 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[9px] sm:text-[10px] leading-none tracking-tight truncate max-w-full px-0.5">Slip Card</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex flex-col items-center justify-center gap-1 transition cursor-pointer py-1 ${
              activeTab === 'ai' ? 'text-emerald-950 font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
            }`}
          >
            <GraduationCap className={`w-5 h-5 ${activeTab === 'ai' ? 'text-emerald-900 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[9px] sm:text-[10px] leading-none tracking-tight truncate max-w-full px-0.5">Admissions</span>
          </button>
        </div>
      </nav>

      {/* Global All-In-One Exam, Cut-Offs & Read Hub Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        initialCategory="all"
      />

      {/* PWA App Install Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}

