import React, { useState, useMemo } from 'react';
import { UNIVERSITIES, NIGERIAN_STATES } from '../data/jambData';
import type { UniversityItem, CourseCutOff } from '../data/jambData';
import {
  Building2,
  Search,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Sparkles,
  MapPin,
  X,
  BookOpen,
  Filter,
  GraduationCap,
  Calendar,
  Check,
  ChevronRight,
  HelpCircle,
  School,
  Layers,
  ArrowUpDown,
  FileText,
  Share2,
  Copy,
} from 'lucide-react';
import { ShareModal } from './ShareModal';
import { copyTextToClipboard, buildSchoolCutOffShareMessage } from '../utils/shareUtils';
import { safeOpenLink } from '../utils/safeOpen';

interface UniversityCutOffsProps {
  userScore: number;
  monetagLink: string;
  onAdTriggered: () => void;
}

type FilterCategory = 'All' | 'Federal' | 'State' | 'Polytechnic' | 'Private' | 'Private-Poly';

export const UniversityCutOffs: React.FC<UniversityCutOffsProps> = ({
  userScore,
  monetagLink,
  onAdTriggered,
}) => {
  const [filterType, setFilterType] = useState<FilterCategory>('All');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyEligible, setOnlyEligible] = useState(false);

  // Modal State for Course Cut-Offs
  const [selectedUni, setSelectedUni] = useState<UniversityItem | null>(null);
  const [modalSearch, setModalSearch] = useState('');
  const [modalFaculty, setModalFaculty] = useState<string>('All');
  const [modalOnlyEligible, setModalOnlyEligible] = useState(false);
  const [testedScore, setTestedScore] = useState<number>(userScore);

  // Share Modal State
  const [shareModalUni, setShareModalUni] = useState<UniversityItem | null>(null);
  const [shareModalCourse, setShareModalCourse] = useState<CourseCutOff | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedCourseKey, setCopiedCourseKey] = useState<string | null>(null);

  // Sync tested score whenever userScore prop changes
  React.useEffect(() => {
    setTestedScore(userScore);
  }, [userScore]);

  // Filter Universities for the main catalog
  const filteredUnis = useMemo(() => {
    return UNIVERSITIES.filter((uni) => {
      // Category filter
      let matchesType = true;
      if (filterType === 'Federal') matchesType = uni.type === 'Federal';
      else if (filterType === 'State') matchesType = uni.type === 'State';
      else if (filterType === 'Polytechnic') matchesType = uni.type === 'Polytechnic';
      else if (filterType === 'Private') matchesType = uni.type === 'Private' || uni.subType === 'Private University';
      else if (filterType === 'Private-Poly') matchesType = uni.subType === 'Private Polytechnic';

      // State or Catchment search
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (uni.courses && uni.courses.some((c) => c.courseName.toLowerCase().includes(searchQuery.toLowerCase())));

      // State dropdown filter
      const matchesStateFilter =
        selectedState === 'All States' ||
        uni.state.toLowerCase().includes(selectedState.toLowerCase()) ||
        uni.catchmentStates.some((cs) => cs.toLowerCase().includes(selectedState.toLowerCase()));

      // Calculate effective cut-off
      const isCatchment =
        selectedState !== 'All States' &&
        uni.catchmentStates.some((cs) => cs.toLowerCase().includes(selectedState.toLowerCase()));
      const effectiveCutOff = isCatchment
        ? Math.max(100, uni.generalCutOff - uni.catchmentCutOffBonus)
        : uni.generalCutOff;

      if (onlyEligible && userScore < effectiveCutOff) {
        return false;
      }

      return matchesType && matchesSearch && matchesStateFilter;
    });
  }, [filterType, searchQuery, selectedState, onlyEligible, userScore]);

  const handleOpenAdPortal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (monetagLink) {
      safeOpenLink(monetagLink);
      onAdTriggered();
    }
  };

  const openCourseModal = (uni: UniversityItem) => {
    setSelectedUni(uni);
    setModalSearch('');
    setModalFaculty('All');
    setModalOnlyEligible(false);
  };

  const closeCourseModal = () => {
    setSelectedUni(null);
  };

  // Compute courses for modal
  const modalCourses = useMemo(() => {
    if (!selectedUni || !selectedUni.courses) return [];

    const isCatchment =
      selectedState !== 'All States' &&
      selectedUni.catchmentStates.some((cs) => cs.toLowerCase().includes(selectedState.toLowerCase()));

    return selectedUni.courses.filter((course) => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(modalSearch.toLowerCase()) ||
        course.faculty.toLowerCase().includes(modalSearch.toLowerCase()) ||
        course.degreeType.toLowerCase().includes(modalSearch.toLowerCase());

      const matchesFaculty = modalFaculty === 'All' || course.faculty === modalFaculty;

      const effectiveCourseCutOff =
        isCatchment && course.catchmentCutOff ? course.catchmentCutOff : course.meritCutOff;

      if (modalOnlyEligible && testedScore < effectiveCourseCutOff) {
        return false;
      }

      return matchesSearch && matchesFaculty;
    });
  }, [selectedUni, modalSearch, modalFaculty, modalOnlyEligible, testedScore, selectedState]);

  // Extract unique faculties from selected university's courses
  const availableFaculties = useMemo(() => {
    if (!selectedUni || !selectedUni.courses) return [];
    const set = new Set<string>();
    selectedUni.courses.forEach((c) => set.add(c.faculty));
    return Array.from(set);
  }, [selectedUni]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 text-slate-900 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-black">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                All Nigerian Tertiary Institutions &amp; Course Cut-Off Directory
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Accredited Federal, State, Private Universities &amp; Polytechnics nationwide ({UNIVERSITIES.length}+ institutions loaded).
              </p>
            </div>
          </div>
        </div>

        {/* State of Origin Catchment Advantage Selector */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 w-full md:w-auto shadow-xs">
          <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
          <div className="flex-1">
            <span className="text-[10px] text-emerald-900 font-extrabold uppercase tracking-wider block">
              Your State of Origin:
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-hidden cursor-pointer"
            >
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Controls */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs">
          {[
            { id: 'All', label: `All Schools (${UNIVERSITIES.length})` },
            { id: 'Federal', label: 'Federal Universities' },
            { id: 'State', label: 'State Universities' },
            { id: 'Polytechnic', label: 'Federal & State Poly' },
            { id: 'Private', label: 'Private Universities' },
            { id: 'Private-Poly', label: 'Private Polytechnics (100+)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as FilterCategory)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                filterType === tab.id
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar + Quick Eligibility Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school by name, code, state, or course (e.g. UNILAG, YabaTech, LASU, Covenant, Grace Poly)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-700 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setOnlyEligible(!onlyEligible)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition cursor-pointer shrink-0 ${
              onlyEligible
                ? 'bg-emerald-900 border-emerald-900 text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${onlyEligible ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Only Schools I Qualify For (≥ {userScore})</span>
          </button>
        </div>
      </div>

      {/* Helpful Private Institutions Callout for lower scores */}
      {userScore < 180 && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-extrabold text-amber-950 block">
              💡 Scoring {userScore}? Don't worry! You have high admission opportunities:
            </strong>
            Top <strong>Private Universities</strong> (accepting 140–180 with zero strikes) and{' '}
            <strong>Accredited Polytechnics</strong> (accepting 100–140 with direct screening) are listed below. Click on any school to view specific course cut-offs!
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>
          Showing <strong>{filteredUnis.length}</strong> institutions
          {selectedState !== 'All States' && ` in / related to ${selectedState}`}
        </span>
        <span className="text-[11px] text-emerald-800 font-bold hidden sm:inline">
          💡 Click any school to inspect departmental course cut-off marks
        </span>
      </div>

      {/* University Grid */}
      {filteredUnis.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
          <School className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-700 text-sm">No institutions match your search</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try clearing filters, resetting state, or searching for other institutions like UNILAG, LASU, YabaTech, or Covenant.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('All');
              setSelectedState('All States');
              setOnlyEligible(false);
            }}
            className="mt-2 text-xs font-bold text-emerald-800 underline cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUnis.map((uni) => {
            const isCatchment =
              selectedState !== 'All States' &&
              uni.catchmentStates.some((cs) => cs.toLowerCase().includes(selectedState.toLowerCase()));

            const effectiveCutOff = isCatchment
              ? Math.max(100, uni.generalCutOff - uni.catchmentCutOffBonus)
              : uni.generalCutOff;

            const isEligible = userScore >= effectiveCutOff;
            const courseCount = uni.courses?.length || 12;

            return (
              <div
                key={uni.code}
                onClick={() => openCourseModal(uni)}
                className={`border rounded-2xl p-4 transition flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-md ${
                  isCatchment
                    ? 'bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-300 hover:border-emerald-500'
                    : 'bg-white border-slate-200 hover:border-emerald-400'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-900 font-extrabold bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                      {uni.subType || uni.type.toUpperCase()}
                    </span>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 font-mono">
                        Cut-off: {effectiveCutOff}
                      </span>
                      {isCatchment && uni.catchmentCutOffBonus > 0 && (
                        <span className="text-[10px] text-emerald-700 block font-bold">
                          (-{uni.catchmentCutOffBonus} pts Catchment)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* School Name & Location */}
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-900 transition leading-snug">
                    {uni.name} ({uni.code})
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 mb-2">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{uni.state}</span>
                    {uni.established && <span>&bull; Est. {uni.established}</span>}
                  </div>

                  {/* Catchment Advantage Callout */}
                  {isCatchment && (
                    <div className="bg-emerald-100/80 text-emerald-950 rounded-lg p-2 text-[10px] font-bold flex items-center gap-1.5 mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Catchment Quota active for {selectedState}!</span>
                    </div>
                  )}

                  {/* Top Faculties */}
                  <div className="text-[10px] text-slate-600 space-y-1 py-2 border-t border-slate-100">
                    <span className="font-bold text-slate-700 block">Top Accredited Faculties:</span>
                    <p className="line-clamp-2 leading-relaxed">{uni.topFaculties.join(', ')}</p>
                  </div>
                </div>

                {/* Card Footer: Clean Eligibility & View Courses Button */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5 mt-2">
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs">
                    {isEligible ? (
                      <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Eligible ({userScore} ≥ {effectiveCutOff})</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Below ({userScore} &lt; {effectiveCutOff})</span>
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShareModalUni(uni);
                          setShareModalCourse(null);
                          setIsShareModalOpen(true);
                        }}
                        className="text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
                        title="Share this School's Cut-Off Marks"
                      >
                        <Share2 className="w-3 h-3 text-emerald-700" />
                        <span>Share Cut-Offs</span>
                      </button>

                      <button
                        onClick={handleOpenAdPortal}
                        className="text-slate-500 hover:text-emerald-900 text-[11px] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                        title="Open Official Screening / Merit Notice"
                      >
                        <span>Merit Notice</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => openCourseModal(uni)}
                    className="w-full bg-slate-900 hover:bg-emerald-900 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer group-hover:bg-emerald-900"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Departmental Cut-Offs ({courseCount} Courses)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: DEPARTMENTAL COURSE CUT-OFFS EXPLORER               */}
      {/* ========================================================== */}
      {selectedUni && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-4 sm:p-5 flex items-start justify-between gap-4 border-b border-emerald-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">
                    {selectedUni.subType || selectedUni.type}
                  </span>
                  <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedUni.state}
                  </span>
                  {selectedUni.established && (
                    <span className="text-[11px] text-emerald-300">
                      &bull; Est. {selectedUni.established}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                  {selectedUni.name} ({selectedUni.code})
                </h3>

                <p className="text-xs text-emerald-200">
                  Official Departmental UTME Cut-Off Marks &amp; Subject Requirements
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setShareModalUni(selectedUni);
                    setShareModalCourse(null);
                    setIsShareModalOpen(true);
                  }}
                  className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-emerald-700/60 shadow-xs transition cursor-pointer"
                  title="Share this School's Cut-Offs"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Share {selectedUni.code} Cut-Offs</span>
                  <span className="sm:hidden">Share</span>
                </button>

                <button
                  onClick={closeCourseModal}
                  className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center transition cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* School Overview & Catchment Info Bar */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 space-y-3">
              {/* Institution Special Notes */}
              {selectedUni.specialNote && (
                <p className="text-xs text-slate-700 bg-white border border-slate-200 rounded-xl p-2.5 leading-relaxed">
                  <strong className="text-emerald-900 font-bold">ℹ️ Admission Note: </strong>
                  {selectedUni.specialNote}
                </p>
              )}

              {/* Score Adjuster & Simulator */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-900 block">
                    Candidate UTME Score Simulator:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-emerald-950 font-mono">
                      {testedScore} / 400
                    </span>
                    <span className="text-xs text-slate-600">
                      (General School Cut-off: {selectedUni.generalCutOff})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-semibold">Test Score:</span>
                  <input
                    type="range"
                    min="100"
                    max="350"
                    step="5"
                    value={testedScore}
                    onChange={(e) => setTestedScore(Number(e.target.value))}
                    className="w-28 sm:w-36 accent-emerald-800 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="400"
                    value={testedScore}
                    onChange={(e) => setTestedScore(Number(e.target.value))}
                    className="w-16 bg-white border border-emerald-300 rounded-lg text-center text-xs font-mono font-bold py-1 text-slate-900"
                  />
                </div>
              </div>

              {/* Catchment Bonus Indicator */}
              {selectedState !== 'All States' &&
              selectedUni.catchmentStates.some((cs) =>
                cs.toLowerCase().includes(selectedState.toLowerCase())
              ) ? (
                <div className="bg-emerald-100 text-emerald-950 rounded-xl p-2.5 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Catchment Active for {selectedState}! Indigenes benefit from a -
                    {selectedUni.catchmentCutOffBonus} marks reduction on departmental cut-offs.
                  </span>
                </div>
              ) : null}

              {/* Filters inside Modal */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    placeholder={`Search ${selectedUni.code} courses (e.g. Nursing, Law, Computer, Mechanical)...`}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-700"
                  />
                  {modalSearch && (
                    <button
                      onClick={() => setModalSearch('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {availableFaculties.length > 0 && (
                  <select
                    value={modalFaculty}
                    onChange={(e) => setModalFaculty(e.target.value)}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="All">All Faculties ({availableFaculties.length})</option>
                    {availableFaculties.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  onClick={() => setModalOnlyEligible(!modalOnlyEligible)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    modalOnlyEligible
                      ? 'bg-emerald-900 border-emerald-900 text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle className={`w-3.5 h-3.5 ${modalOnlyEligible ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>Only Qualified (≥ {testedScore})</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Courses List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {modalCourses.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">No courses match your criteria</p>
                  <p className="text-xs text-slate-500">
                    Try adjusting your search query, selecting "All Faculties", or clearing the qualified-only toggle.
                  </p>
                </div>
              ) : (
                modalCourses.map((course, idx) => {
                  const isCatchmentApplicable =
                    selectedState !== 'All States' &&
                    selectedUni.catchmentStates.some((cs) =>
                      cs.toLowerCase().includes(selectedState.toLowerCase())
                    );

                  const effectiveCourseCutOff =
                    isCatchmentApplicable && course.catchmentCutOff
                      ? course.catchmentCutOff
                      : course.meritCutOff;

                  const isCandidateEligible = testedScore >= effectiveCourseCutOff;
                  const isCatchmentBenefitActive =
                    isCatchmentApplicable &&
                    course.catchmentCutOff &&
                    testedScore >= course.catchmentCutOff &&
                    testedScore < course.meritCutOff;

                  return (
                    <div
                      key={idx}
                      className={`border rounded-xl p-3.5 sm:p-4 transition space-y-3 ${
                        isCandidateEligible
                          ? 'bg-emerald-50/30 border-emerald-300 ring-1 ring-emerald-200'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Course Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900">
                              {course.courseName}
                            </h4>
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                              {course.degreeType}
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                course.competitiveness === 'Very High'
                                  ? 'bg-rose-100 text-rose-800'
                                  : course.competitiveness === 'High'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {course.competitiveness} Competition
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">{course.faculty}</span>
                        </div>

                        {/* Cut-Off Marks & Status Badge */}
                        <div className="flex items-center sm:flex-col sm:items-end justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <span className="text-xs font-mono font-black text-slate-900">
                                Merit: {course.meritCutOff}
                              </span>
                              {course.catchmentCutOff && isCatchmentApplicable && (
                                <span className="text-[10px] font-mono text-emerald-800 block font-bold">
                                  Catchment: {course.catchmentCutOff}
                                </span>
                              )}
                            </div>
                          </div>

                          {isCatchmentBenefitActive ? (
                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-700" />
                              <span>Catchment Qualified ({testedScore} ≥ {course.catchmentCutOff})</span>
                            </span>
                          ) : isCandidateEligible ? (
                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Eligible ({testedScore} ≥ {effectiveCourseCutOff})</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Below ({testedScore} &lt; {effectiveCourseCutOff} &bull; Short by {effectiveCourseCutOff - testedScore})</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subject Requirements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                        <div className="bg-slate-50 rounded-lg p-2.5">
                          <strong className="text-[10px] font-bold uppercase text-slate-700 block mb-1">
                            JAMB 4-Subject Combination:
                          </strong>
                          <div className="flex flex-wrap gap-1">
                            {course.jambSubjects.map((sub, sIdx) => (
                              <span
                                key={sIdx}
                                className="bg-white border border-slate-200 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-2.5">
                          <strong className="text-[10px] font-bold uppercase text-slate-700 block mb-1">
                            Mandatory 5 O'Level Credits (WAEC/NECO):
                          </strong>
                          <p className="text-[11px] text-slate-600 line-clamp-2">
                            {course.waecCredits.join(', ')}
                          </p>
                        </div>
                      </div>

                      {/* Course Action Bar: Share & Copy Requirements */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setShareModalUni(selectedUni);
                              setShareModalCourse(course);
                              setIsShareModalOpen(true);
                            }}
                            className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075e54] px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 border border-[#25D366]/30 transition cursor-pointer"
                            title="Share this Course Cut-Off & Combo"
                          >
                            <Share2 className="w-3 h-3 text-[#128C7E]" />
                            <span>Share Course Cut-Off</span>
                          </button>

                          <button
                            onClick={async () => {
                              if (!selectedUni) return;
                              try {
                                const text = buildSchoolCutOffShareMessage(selectedUni, course);
                                await copyTextToClipboard(text);
                                setCopiedCourseKey(course.courseName);
                                setTimeout(() => setCopiedCourseKey(null), 2000);
                              } catch (e) {
                                console.warn('Copy details error:', e);
                              }
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-slate-200 transition cursor-pointer"
                          >
                            {copiedCourseKey === course.courseName ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-500" />
                                <span>Copy Details</span>
                              </>
                            )}
                          </button>
                        </div>

                        <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                          Merit Cut-Off: {course.meritCutOff} &bull; {course.degreeType}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Showing <strong>{modalCourses.length}</strong> accredited programs for {selectedUni.code}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleOpenAdPortal}
                  className="flex-1 sm:flex-initial bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Check Post-UTME Merit Portal &rarr;</span>
                </button>

                <button
                  onClick={closeCourseModal}
                  className="bg-white hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs border border-slate-300 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal for Schools and Course Cut-Offs */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        initialCategory="cutoffs"
        targetUniversity={shareModalUni}
        targetCourse={shareModalCourse}
      />
    </div>
  );
};
