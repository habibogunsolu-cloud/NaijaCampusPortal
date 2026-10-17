import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  CheckSquare,
  Square,
  Calculator,
  FileText,
  School,
  Award,
  Sparkles,
  Download,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import { safeOpenAdLink } from '../utils/safeOpen';
import { NativeDisplayAd } from './NativeDisplayAd';

interface FreshersHubTabProps {
  monetagLink: string;
  onAdTriggered?: (placement?: string) => void;
  onNavigateToChioma?: (initialPrompt?: string) => void;
}

interface ClearanceDoc {
  id: string;
  title: string;
  subtitle: string;
  requiredFor: string;
  importantNote: string;
  category: 'jamb' | 'academic' | 'identity' | 'medical';
}

const DEFAULT_CLEARANCE_DOCS: ClearanceDoc[] = [
  {
    id: 'jamb_admission_letter',
    title: 'JAMB Original Admission Letter (Colored)',
    subtitle: 'Printed in full color from JAMB e-Facility portal (both Institution & Candidate copies)',
    requiredFor: 'All Universities & Polytechnics',
    importantNote: 'Requires logging into portal.jamb.gov.ng and accepting on CAPS first.',
    category: 'jamb',
  },
  {
    id: 'jamb_original_result',
    title: 'JAMB Original Result Slip',
    subtitle: 'Colored printout containing your official passport photograph and score breakdown',
    requiredFor: 'All Universities & Polytechnics',
    importantNote: 'Ensure the photo and barcode are sharp and clearly legible.',
    category: 'jamb',
  },
  {
    id: 'olevel_verification_scratch',
    title: "O'Level Result & Online Verification Scratch Cards",
    subtitle: 'WAEC / NECO / NABTEB result slip + fresh unused scratch card pin for verification',
    requiredFor: 'Physical Screening Officer',
    importantNote: 'Screening officers will use the card pin to authenticate your grades on the examination council portal.',
    category: 'academic',
  },
  {
    id: 'acceptance_fee_receipt',
    title: 'University Acceptance Fee Payment Receipt',
    subtitle: 'Official Remita RRR receipt and university portal confirmation slip',
    requiredFor: 'Admission Confirmation',
    importantNote: 'Proof that you accepted your provisional admission before the institution deadline.',
    category: 'academic',
  },
  {
    id: 'birth_cert_npc',
    title: 'Birth Certificate or NPC Age Declaration',
    subtitle: 'Issued by the National Population Commission (NPC) or High Court affidavit',
    requiredFor: 'Age & Identity Verification',
    importantNote: 'Hospital birth cards are generally rejected; must be from NPC or High Court.',
    category: 'identity',
  },
  {
    id: 'lga_certificate',
    title: 'Local Government (LGA) Certificate of Origin',
    subtitle: 'Official certificate of origin signed by your Local Government Chairman or Liaison',
    requiredFor: 'State Quota & Catchment Validation',
    importantNote: 'Confirms your state and local government area of origin.',
    category: 'identity',
  },
  {
    id: 'medical_fitness_cert',
    title: 'Medical Fitness Certificate & Lab Test Report',
    subtitle: 'Comprehensive medical test (Blood Group, Genotype, Chest X-Ray, Urinalysis)',
    requiredFor: 'University Health Centre Registration',
    importantNote: 'Obtained at the University Clinic or an accredited State/Federal General Hospital.',
    category: 'medical',
  },
  {
    id: 'attestation_letters',
    title: 'Attestation / Reference Letters (2 Copies)',
    subtitle: 'Recommendation letters on official letterheads from Clergy, Lawyer, or Civil Servant',
    requiredFor: 'Character Clearance',
    importantNote: 'Must vouch for your good conduct and moral character.',
    category: 'identity',
  },
  {
    id: 'passport_photos',
    title: 'Recent Passport Photographs (8 - 12 Copies)',
    subtitle: 'Identical passport photos with red or white background (as instructed by school)',
    requiredFor: 'Files & Departmental Forms',
    importantNote: 'Write your full name, course, and JAMB registration number on the back of each copy.',
    category: 'identity',
  },
  {
    id: 'post_utme_slip',
    title: 'Post-UTME Screening Slip & Application Form',
    subtitle: 'Original printout of your initial university screening registration form',
    requiredFor: 'Internal Records Verification',
    importantNote: 'Keep 3 photocopies in your file folder.',
    category: 'academic',
  },
];

interface CourseGrade {
  id: string;
  code: string;
  name: string;
  units: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

const MEDICAL_DEFAULT_COURSES: CourseGrade[] = [
  { id: '1', code: 'BIO 101', name: 'General Biology I', units: 3, grade: 'A' },
  { id: '2', code: 'CHM 101', name: 'General Chemistry I', units: 3, grade: 'A' },
  { id: '3', code: 'PHY 101', name: 'General Physics I', units: 3, grade: 'B' },
  { id: '4', code: 'GST 101', name: 'Communication in English', units: 2, grade: 'A' },
  { id: '5', code: 'MTH 101', name: 'Elementary Mathematics I', units: 2, grade: 'B' },
  { id: '6', code: 'BIO 107', name: 'Practical Biology I', units: 1, grade: 'A' },
  { id: '7', code: 'CHM 107', name: 'Practical Chemistry I', units: 1, grade: 'A' },
  { id: '8', code: 'PHY 107', name: 'Practical Physics I', units: 1, grade: 'A' },
];

const GRADE_POINTS: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export const FreshersHubTab: React.FC<FreshersHubTabProps> = ({
  monetagLink,
  onAdTriggered,
  onNavigateToChioma,
}) => {
  // Selected School & Faculty (Default: All Nigerian Institutions for universal applicability)
  const [selectedSchool, setSelectedSchool] = useState<string>('all_nigerian');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all_faculties');

  // Checklist state stored in localStorage
  const [checkedDocIds, setCheckedDocIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('freshers_checked_docs');
      return saved ? JSON.parse(saved) : ['jamb_admission_letter', 'jamb_original_result'];
    } catch {
      return ['jamb_admission_letter', 'jamb_original_result'];
    }
  });

  // 100L CGPA courses
  const [courses, setCourses] = useState<CourseGrade[]>(() => {
    try {
      const saved = localStorage.getItem('freshers_target_courses');
      return saved ? JSON.parse(saved) : MEDICAL_DEFAULT_COURSES;
    } catch {
      return MEDICAL_DEFAULT_COURSES;
    }
  });

  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseUnits, setNewCourseUnits] = useState(2);
  const [newCourseGrade, setNewCourseGrade] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F'>('A');
  const [isCopied, setIsCopied] = useState(false);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Toggle document checked
  const toggleDoc = (docId: string) => {
    const next = checkedDocIds.includes(docId)
      ? checkedDocIds.filter((id) => id !== docId)
      : [...checkedDocIds, docId];
    setCheckedDocIds(next);
    localStorage.setItem('freshers_checked_docs', JSON.stringify(next));
  };

  const progressPercent = Math.round((checkedDocIds.length / DEFAULT_CLEARANCE_DOCS.length) * 100);

  // Calculate 100L CGPA
  const totalUnits = courses.reduce((sum, c) => sum + c.units, 0);
  const totalQualityPoints = courses.reduce((sum, c) => sum + c.units * GRADE_POINTS[c.grade], 0);
  const gpa = totalUnits > 0 ? (totalQualityPoints / totalUnits).toFixed(2) : '0.00';
  const gpaNumber = parseFloat(gpa);

  let degreeClass = 'First Class Honours';
  let badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
  let adviceMessage = 'Outstanding! You are squarely in the First Class & MBBS Distinction Safe Zone!';

  if (gpaNumber >= 4.5) {
    degreeClass = 'First Class Honours (5.0 Scale)';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    adviceMessage = 'Outstanding! Safe zone for Medicine (MBBS), Pharmacy & First Class degrees!';
  } else if (gpaNumber >= 3.5) {
    degreeClass = 'Second Class Upper (2:1)';
    badgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
    adviceMessage = 'Solid standing! Push slightly in 2-unit courses to cross into 4.5+ territory!';
  } else if (gpaNumber >= 2.4) {
    degreeClass = 'Second Class Lower (2:2)';
    badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';
    adviceMessage = 'Passing, but study harder to prevent carryovers and secure strong graduation grades.';
  } else {
    degreeClass = 'Academic Warning Zone';
    badgeColor = 'bg-rose-100 text-rose-900 border-rose-300';
    adviceMessage = 'Danger zone! Seek academic guidance immediately to avoid probation.';
  }

  // Handle Copy / Export Checklist
  const handleCopyChecklist = () => {

    const completed = DEFAULT_CLEARANCE_DOCS.filter((d) => checkedDocIds.includes(d.id));
    const pending = DEFAULT_CLEARANCE_DOCS.filter((d) => !checkedDocIds.includes(d.id));

    const text =
      `📋 *MY 100 LEVEL PHYSICAL SCREENING CHECKLIST* 🎓\n` +
      `Institution: ${selectedSchool === 'all_nigerian' ? 'All Nigerian Tertiary Institutions' : selectedSchool.toUpperCase()}\n` +
      `Progress: ${checkedDocIds.length}/${DEFAULT_CLEARANCE_DOCS.length} Documents Ready (${progressPercent}%)\n\n` +
      `✅ *READY DOCUMENTS (${completed.length}):*\n` +
      completed.map((d) => `• ${d.title}`).join('\n') +
      `\n\n⏳ *STILL PENDING (${pending.length}):*\n` +
      pending.map((d) => `• ${d.title}`).join('\n') +
      `\n\nGenerated via NaijaCampus Freshers Portal`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Add course
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim()) return;
    const newCourse: CourseGrade = {
      id: Date.now().toString(),
      code: newCourseCode.trim().toUpperCase(),
      name: newCourseCode.trim().toUpperCase(),
      units: Number(newCourseUnits) || 2,
      grade: newCourseGrade,
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    localStorage.setItem('freshers_target_courses', JSON.stringify(updated));
    setNewCourseCode('');
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleUpdateGrade = (id: string, grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
    const updated = courses.map((c) => (c.id === id ? { ...c, grade } : c));
    setCourses(updated);
    localStorage.setItem('freshers_target_courses', JSON.stringify(updated));
  };

  const handleRemoveCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    localStorage.setItem('freshers_target_courses', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Welcome Banner for Admitted Freshers */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-md border-2 border-amber-500/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2.5">
              <span>🎉 Congratulations on Your Admission!</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              100 Level Freshers &amp; Clearance Portal
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-xl">
              Complete your university screening checklist, calculate your 100L CGPA targets, and get verified clearance guidance.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => {
                if (onNavigateToChioma) {
                  onNavigateToChioma('What are the compulsory screening clearance documents and steps for 100L university & polytechnic admission?');
                }
              }}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ask Clearance Question</span>
            </button>
            <button
              onClick={handleCopyChecklist}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'List Copied!' : 'Export My Checklist'}</span>
            </button>
          </div>
        </div>

        {/* School & Faculty Selector */}
        <div className="mt-5 pt-4 border-t border-emerald-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-emerald-200 mb-1">
              Select Your Higher Institution:
            </label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full bg-emerald-900/90 border border-emerald-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-hidden focus:border-amber-400 cursor-pointer"
            >
              <option value="all_nigerian">🎓 All Nigerian Universities &amp; Polytechnics (General)</option>
              <option value="unilag">University of Lagos (UNILAG)</option>
              <option value="ui">University of Ibadan (UI)</option>
              <option value="oau">Obafemi Awolowo University (OAU)</option>
              <option value="unn">University of Nigeria, Nsukka (UNN)</option>
              <option value="abu">Ahmadu Bello University (ABU Zaria)</option>
              <option value="lasu">Lagos State University (LASU)</option>
              <option value="uniben">University of Benin (UNIBEN)</option>
              <option value="unilorin">University of Ilorin (UNILORIN)</option>
              <option value="futa">Federal University of Technology, Akure (FUTA)</option>
              <option value="funaab">Federal University of Agriculture, Abeokuta (FUNAAB)</option>
              <option value="fummsa">FUMMSA Abeokuta (Fed. Univ of Medicine &amp; Med. Sciences)</option>
              <option value="polytechnic">Federal &amp; State Polytechnics (YabaTech, Nekede, etc.)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald-200 mb-1">
              Select Your Faculty / Department:
            </label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full bg-emerald-900/90 border border-emerald-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-hidden focus:border-amber-400 cursor-pointer"
            >
              <option value="medicine">Medicine &amp; Surgery (MBBS)</option>
              <option value="nursing">Nursing Science</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="med_lab">Medical Laboratory Science</option>
              <option value="physio">Physiotherapy / Basic Medical Sciences</option>
              <option value="science">Sciences (Microbiology, Biochemistry, Computer Sci)</option>
              <option value="engineering">Engineering &amp; Technology</option>
              <option value="law_arts">Law, Arts &amp; Social Sciences</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 1: PHYSICAL SCREENING DOCUMENT CHECKLIST */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4 text-emerald-800" />
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Physical &amp; Online Screening Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Tick each document as you gather it. Never travel for screening with missing items!
                </p>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Status</span>
              <span className="text-xs font-black text-emerald-800">
                {checkedDocIds.length} of {DEFAULT_CLEARANCE_DOCS.length} Ready ({progressPercent}%)
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-slate-200 flex items-center justify-center font-black text-[11px] text-emerald-800 relative">
              <span>{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Documents Interactive List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DEFAULT_CLEARANCE_DOCS.map((doc, idx) => {
            const isChecked = checkedDocIds.includes(doc.id);
            return (
              <div
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-700" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 leading-tight">
                      {idx + 1}. {doc.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {doc.subtitle}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      {doc.requiredFor}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action bar for checklist */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
          <span className="text-slate-500 text-[11px] flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-emerald-700" />
            <span>Progress automatically saves on your phone so you won't lose it.</span>
          </span>
          <button
            onClick={handleCopyChecklist}
            className="w-full sm:w-auto bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{isCopied ? 'Checklist Copied!' : 'Copy / Share Clearance List'}</span>
          </button>
        </div>
      </div>

      {/* ================= IN-APP DISPLAY AD (DIRECTLY VISIBLE) ================= */}
      <NativeDisplayAd
        placement="freshers_checklist_display"
        monetagLink={monetagLink}
        onAdTriggered={onAdTriggered}
      />

      {/* SECTION 2: 100L CGPA TARGET CALCULATOR (5.0 SCALE) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4 text-amber-800" />
            </span>
            <div>
              <h3 className="text-base font-black text-slate-900">
                100L First Semester CGPA Calculator (5.0 Scale)
              </h3>
              <p className="text-xs text-slate-500">
                Input your expected grades to plan your First Class or MBBS safe standing.
              </p>
            </div>
          </div>

          {/* Quick Reset to Defaults */}
          <button
            type="button"
            onClick={() => {
              setCourses(MEDICAL_DEFAULT_COURSES);
              localStorage.setItem('freshers_target_courses', JSON.stringify(MEDICAL_DEFAULT_COURSES));
            }}
            className="text-xs text-slate-500 hover:text-emerald-800 underline cursor-pointer shrink-0"
          >
            Reset to Default Medical Courses
          </button>
        </div>

        {/* Live GPA Result Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
              Calculated 100L GPA
            </span>
            <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
              <span className="text-4xl font-black text-amber-400 font-mono">{gpa}</span>
              <span className="text-slate-400 text-sm font-bold font-mono">/ 5.00</span>
            </div>
            <p className="text-xs text-emerald-200 mt-1 max-w-md">{adviceMessage}</p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5 shrink-0">
            <span className={`px-3 py-1 rounded-full text-xs font-black border ${badgeColor}`}>
              {degreeClass}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Total Units: <strong>{totalUnits}</strong> &bull; Quality Points: <strong>{totalQualityPoints}</strong>
            </span>
          </div>
        </div>

        {/* Interactive Courses Table */}
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-[11px] font-bold text-slate-600 uppercase tracking-wide">
            <span className="col-span-6 sm:col-span-7">Course Name / Code</span>
            <span className="col-span-2 text-center">Units</span>
            <span className="col-span-3 sm:col-span-2 text-center">Target Grade</span>
            <span className="hidden sm:block col-span-1 text-center">Action</span>
          </div>

          {courses.map((course) => (
            <div
              key={course.id}
              className="grid grid-cols-12 gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl items-center text-xs"
            >
              <div className="col-span-6 sm:col-span-7 font-bold text-slate-900 truncate">
                <span>{course.code}</span>
              </div>

              <div className="col-span-2 text-center font-mono font-bold text-slate-700">
                {course.units} Unit{course.units > 1 ? 's' : ''}
              </div>

              <div className="col-span-3 sm:col-span-2 flex justify-center">
                <select
                  value={course.grade}
                  onChange={(e) =>
                    handleUpdateGrade(course.id, e.target.value as 'A' | 'B' | 'C' | 'D' | 'E' | 'F')
                  }
                  className="bg-white border border-slate-300 text-slate-900 font-bold rounded-lg px-2 py-1 text-xs focus:outline-hidden focus:border-emerald-700 cursor-pointer"
                >
                  <option value="A">A (5 pts)</option>
                  <option value="B">B (4 pts)</option>
                  <option value="C">C (3 pts)</option>
                  <option value="D">D (2 pts)</option>
                  <option value="E">E (1 pt)</option>
                  <option value="F">F (0 pt)</option>
                </select>
              </div>

              <div className="col-span-12 sm:col-span-1 flex justify-end sm:justify-center">
                <button
                  type="button"
                  onClick={() => handleRemoveCourse(course.id)}
                  className="text-slate-400 hover:text-rose-600 text-xs px-2 py-0.5 rounded cursor-pointer"
                  title="Remove course"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Course Form */}
        <form
          onSubmit={handleAddCourse}
          className="pt-2 flex flex-col sm:flex-row items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200"
        >
          <input
            type="text"
            required
            placeholder="e.g. GST 103 or BIO 102"
            value={newCourseCode}
            onChange={(e) => setNewCourseCode(e.target.value)}
            className="flex-1 w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-700"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={newCourseUnits}
              onChange={(e) => setNewCourseUnits(Number(e.target.value))}
              className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 font-bold cursor-pointer"
            >
              <option value={1}>1 Unit</option>
              <option value={2}>2 Units</option>
              <option value={3}>3 Units</option>
              <option value={4}>4 Units</option>
            </select>

            <select
              value={newCourseGrade}
              onChange={(e) => setNewCourseGrade(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 font-bold cursor-pointer"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>

            <button
              type="submit"
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-4 py-1.5 rounded-xl text-xs whitespace-nowrap cursor-pointer shadow-xs transition"
            >
              Add Course
            </button>
          </div>
        </form>

        {/* Save & Lock Target Action with Ad Trigger */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {isSavedNotice ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Target saved! Current target: {gpa} GPA ({degreeClass}).
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                Save your target courses so they stay saved whenever you revisit.
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.setItem('freshers_target_courses', JSON.stringify(courses));
              setIsSavedNotice(true);
              setTimeout(() => setIsSavedNotice(false), 3000);
            }}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Save &amp; Lock CGPA Target</span>
          </button>
        </div>
      </div>

      {/* SECTION 3: 4-STEP CLEARANCE ROADMAP */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
            <School className="w-4 h-4 text-blue-800" />
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Freshers 4-Step Resumption &amp; Clearance Roadmap
            </h3>
            <p className="text-xs text-slate-500">
              The standard procedure followed by all Nigerian Universities &amp; Polytechnics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-900 text-white font-black flex items-center justify-center text-xs">
                1
              </span>
              <h4 className="font-black text-slate-900">Accept Admission on JAMB CAPS</h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Log in to <code>portal.jamb.gov.ng/efacility</code>, switch your mobile browser to Desktop Mode, click CAPS &rarr; Admission Status &rarr; <strong>ACCEPT ADMISSION</strong>. Print your colored JAMB Admission Letter.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-900 text-white font-black flex items-center justify-center text-xs">
                2
              </span>
              <h4 className="font-black text-slate-900">Pay Acceptance Fee on School Portal</h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Generate your official invoice/Remita RRR on your university portal. Pay before the stated deadline (usually 2 to 3 weeks) to prevent admission forfeiture. Keep the printed receipt safe!
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-900 text-white font-black flex items-center justify-center text-xs">
                3
              </span>
              <h4 className="font-black text-slate-900">Physical Screening on Campus</h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Prepare 3 photocopies of all 10 documents in neat office file jackets (Red/Blue/Green). Present originals to your faculty clearance officer for verification and stamping.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-900 text-white font-black flex items-center justify-center text-xs">
                4
              </span>
              <h4 className="font-black text-slate-900">Hostel Balloting &amp; 100L Course Reg</h4>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Apply for campus hostel accommodation early on the school portal. Meet your assigned Departmental Level Adviser to register your compulsory and elective courses for 1st Semester.
            </p>
          </div>
        </div>
      </div>

      {/* ================= IN-APP DISPLAY AD 2 (DIRECTLY VISIBLE) ================= */}
      <NativeDisplayAd
        placement="freshers_bottom_display"
        monetagLink={monetagLink}
        onAdTriggered={onAdTriggered}
      />
    </div>
  );
};
