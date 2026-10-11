import { ALL_NIGERIAN_INSTITUTIONS } from './institutionsData';
import type { CourseCutOff } from './institutionsData';
export { ALL_NIGERIAN_INSTITUTIONS };
export type { CourseCutOff };

export interface CourseItem {
  id: string;
  name: string;
  faculty: string;
  jambSubjects: string[];
  waecCredits: string[];
  competitiveScore: number;
  minimumScore: number;
  advice: string;
  riskWarning?: string;
  popularUniversities: {
    name: string;
    code: string;
    type: 'Federal' | 'State' | 'Polytechnic' | 'Private';
    cutOff: number;
  }[];
}

export interface UniversityItem {
  code: string;
  name: string;
  state: string;
  type: 'Federal' | 'State' | 'Polytechnic' | 'Private';
  subType?: 'Federal University' | 'State University' | 'Federal Polytechnic' | 'State Polytechnic' | 'Private University' | 'Private Polytechnic';
  generalCutOff: number;
  topFaculties: string[];
  catchmentStates: string[];
  catchmentCutOffBonus: number; // point reduction for indigenes
  courses?: CourseCutOff[];
  campusLocation?: string;
  established?: number;
  specialNote?: string;
}

export interface ExamEvent {
  id: string;
  exam: 'JAMB UTME' | 'WAEC SSCE' | 'NECO SSCE' | 'POST-UTME';
  title: string;
  startDate: string;
  endDate: string;
  startIso: string;
  endIso: string;
  status: 'Open' | 'Upcoming' | 'Closed';
  importantNotice: string;
  session: string;
}

export interface SyllabusTopic {
  subject: string;
  compulsoryNovelOrFocus: string;
  hotTopics: string[];
  pitfallWarning: string;
}

export function getDynamicExamSchedules(): ExamEvent[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;

  // Raw schedule definition with ISO dates
  const rawList = [
    {
      id: 'e1_past',
      exam: 'JAMB UTME' as const,
      title: `${currentYear}/${currentYear + 1} UTME Registration Window`,
      startDate: `January 15, ${currentYear}`,
      endDate: `February 26, ${currentYear}`,
      startIso: `${currentYear}-01-15T00:00:00`,
      endIso: `${currentYear}-02-26T23:59:59`,
      importantNotice: 'NIN is strictly compulsory for profile code generation. Closed for current session.',
      session: `${currentYear}/${currentYear + 1}`,
    },
    {
      id: 'e2_past',
      exam: 'JAMB UTME' as const,
      title: `${currentYear} National Mock CBT Examination`,
      startDate: `March 14, ${currentYear}`,
      endDate: `March 14, ${currentYear}`,
      startIso: `${currentYear}-03-14T00:00:00`,
      endIso: `${currentYear}-03-14T23:59:59`,
      importantNotice: 'Tests candidate speed and CBT center readiness.',
      session: `${currentYear}/${currentYear + 1}`,
    },
    {
      id: 'e3_past',
      exam: 'JAMB UTME' as const,
      title: `${currentYear} Main National UTME CBT Examination`,
      startDate: `April 18, ${currentYear}`,
      endDate: `April 28, ${currentYear}`,
      startIso: `${currentYear}-04-18T00:00:00`,
      endIso: `${currentYear}-04-28T23:59:59`,
      importantNotice: 'Biometric verification is strictly mandatory at accredited CBT centers.',
      session: `${currentYear}/${currentYear + 1}`,
    },
    {
      id: 'e4_past',
      exam: 'WAEC SSCE' as const,
      title: `${currentYear} May/June School Candidates Examination`,
      startDate: `May 5, ${currentYear}`,
      endDate: `June 20, ${currentYear}`,
      startIso: `${currentYear}-05-05T00:00:00`,
      endIso: `${currentYear}-06-20T23:59:59`,
      importantNotice: '5 credits including English Language & Mathematics are mandatory for tertiary admission.',
      session: `${currentYear}/${currentYear + 1}`,
    },
    {
      id: 'e5_past',
      exam: 'NECO SSCE' as const,
      title: `${currentYear} June/July Senior School Certificate Examination`,
      startDate: `June 24, ${currentYear}`,
      endDate: `August 8, ${currentYear}`,
      startIso: `${currentYear}-06-24T00:00:00`,
      endIso: `${currentYear}-08-08T23:59:59`,
      importantNotice: 'Widely accepted alongside WAEC by all Federal, State universities, and polytechnics.',
      session: `${currentYear}/${currentYear + 1}`,
    },
    {
      id: 'e6_active',
      exam: 'POST-UTME' as const,
      title: `${currentYear}/${currentYear + 1} University & Polytechnic Screening Season`,
      startDate: `July 15, ${currentYear}`,
      endDate: `October 31, ${currentYear}`,
      startIso: `${currentYear}-07-15T00:00:00`,
      endIso: `${currentYear}-10-31T23:59:59`,
      importantNotice: 'Institutions announce online screening portals. Ensure your O’Level results are uploaded to JAMB CAPS.',
      session: `${currentYear}/${currentYear + 1}`,
    },
    // Upcoming next session
    {
      id: 'e7_next',
      exam: 'JAMB UTME' as const,
      title: `${nextYear}/${nextYear + 1} UTME Profile Creation & Registration`,
      startDate: `January 15, ${nextYear}`,
      endDate: `February 28, ${nextYear}`,
      startIso: `${nextYear}-01-15T00:00:00`,
      endIso: `${nextYear}-02-28T23:59:59`,
      importantNotice: 'Create your profile code early by texting NIN to 55019 or 66019. Budget ₦7,700 for registration pin.',
      session: `${nextYear}/${nextYear + 1}`,
    },
    {
      id: 'e8_next',
      exam: 'JAMB UTME' as const,
      title: `${nextYear} Optional Mock CBT Examination`,
      startDate: `March 18, ${nextYear}`,
      endDate: `March 18, ${nextYear}`,
      startIso: `${nextYear}-03-18T00:00:00`,
      endIso: `${nextYear}-03-18T23:59:59`,
      importantNotice: 'Gives firsthand experience of the real JAMB 8-key CBT software interface.',
      session: `${nextYear}/${nextYear + 1}`,
    },
    {
      id: 'e9_next',
      exam: 'JAMB UTME' as const,
      title: `${nextYear} Main National UTME CBT Examination`,
      startDate: `April 18, ${nextYear}`,
      endDate: `April 28, ${nextYear}`,
      startIso: `${nextYear}-04-18T00:00:00`,
      endIso: `${nextYear}-04-28T23:59:59`,
      importantNotice: 'Main national examination window across 750+ accredited CBT centers nationwide.',
      session: `${nextYear}/${nextYear + 1}`,
    },
    {
      id: 'e10_next',
      exam: 'WAEC SSCE' as const,
      title: `${nextYear} May/June School Candidates Examination`,
      startDate: `May 4, ${nextYear}`,
      endDate: `June 18, ${nextYear}`,
      startIso: `${nextYear}-05-04T00:00:00`,
      endIso: `${nextYear}-06-18T23:59:59`,
      importantNotice: 'West African Senior School Certificate Examination for SS3 school candidates.',
      session: `${nextYear}/${nextYear + 1}`,
    },
  ];

  return rawList.map((item) => {
    const sDate = new Date(item.startIso);
    const eDate = new Date(item.endIso);

    let status: 'Open' | 'Upcoming' | 'Closed' = 'Upcoming';
    if (now > eDate) {
      status = 'Closed';
    } else if (now >= sDate && now <= eDate) {
      status = 'Open';
    } else {
      status = 'Upcoming';
    }

    return {
      ...item,
      status,
    };
  });
}

export const EXAM_SCHEDULES: ExamEvent[] = getDynamicExamSchedules();

export const SYLLABUS_HOT_TOPICS: SyllabusTopic[] = [
  {
    subject: 'Use of English',
    compulsoryNovelOrFocus: 'Compulsory Official JAMB Life Changer / Prescribed Reading Text',
    hotTopics: [
      'Lexis and Structure (Prepositions, Tenses, Conjunctions)',
      'Stress Patterns & Oral English (Vowel & Consonant sounds)',
      'Comprehension Passages & Antonyms/Synonyms',
      'Interpretation of the Prescribed Novel Questions (10-15 marks)',
    ],
    pitfallWarning: 'Do not ignore Oral English and Novel questions—they make up almost 35% of the total 60 questions!',
  },
  {
    subject: 'Mathematics',
    compulsoryNovelOrFocus: 'Formulae sheet & Calculator-free problem solving',
    hotTopics: [
      'Algebra & Simultaneous / Quadratic Equations',
      'Calculus (Differentiation & Integration)',
      'Matrices, Determinants & Number Bases',
      'Trigonometry, Bearings & Mensuration',
      'Probability & Statistics (Mean, Median, Standard Deviation)',
    ],
    pitfallWarning: 'Speed is king. Practice with CBT timer—you have roughly 40 seconds per math question.',
  },
  {
    subject: 'Biology',
    compulsoryNovelOrFocus: 'Genetics, Ecology & Human Physiology',
    hotTopics: [
      'Genetics & Heredity (Mendel’s laws, Blood groups, Sickle cell)',
      'Ecology, Food chains & Symbiotic Relationships',
      'Human Digestive, Circulatory, and Excretory Systems',
      'Plant Physiology (Photosynthesis, Transpiration, Tropisms)',
    ],
    pitfallWarning: 'Diagrams are tested heavily! Learn labels of the heart, kidney, brain, and flower anatomy.',
  },
  {
    subject: 'Chemistry',
    compulsoryNovelOrFocus: 'Organic Chemistry & Stoichiometry',
    hotTopics: [
      'Hydrocarbons (Alkanes, Alkenes, Alkynes, Benzene)',
      'Chemical Equilibrium, Le Chatelier’s principle & Rates',
      'Acids, Bases, Salts & Titration Calculations',
      'Periodic Table trends & Chemical Bonding',
      'Electrochemistry & Faraday’s Laws of Electrolysis',
    ],
    pitfallWarning: 'Stoichiometric mole calculations appear in at least 8 questions every year.',
  },
  {
    subject: 'Physics',
    compulsoryNovelOrFocus: 'Mechanics, Waves & Modern Physics',
    hotTopics: [
      'Motion, Projectiles & Newton’s Laws',
      'Work, Energy, Power & Friction',
      'Optics (Refraction, Reflection, Lenses)',
      'Current Electricity, Ohm’s Law & Resistance in circuits',
      'Radioactivity & Nuclear Reactions',
    ],
    pitfallWarning: 'Units and standard prefixes matter! Always convert km/h to m/s before calculation.',
  },
  {
    subject: 'Government & Literature',
    compulsoryNovelOrFocus: 'Constitutional History & Prescribed African / Non-African Drama',
    hotTopics: [
      'Constitutional developments in Nigeria (Clifford to 1999 Constitution)',
      'Colonial administration (Indirect Rule & French Assimilation)',
      'Figures of Speech, Metre & Poetic Devices',
      'Themes and characterization in prescribed drama texts',
    ],
    pitfallWarning: 'Know the years of major constitutional conferences and political party dates.',
  },
];

export const NIGERIAN_STATES = [
  'All States',
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export const FACULTIES = [
  'All Faculties',
  'Medical & Health Sciences',
  'Engineering & Technology',
  'Science & Computing',
  'Law & Legal Studies',
  'Management & Social Sciences',
  'Arts & Humanities',
  'Agricultural Sciences',
  'Environmental & Architecture',
];

export const COURSES: CourseItem[] = [
  {
    id: 'med-surg',
    name: 'Medicine & Surgery (MBBS)',
    faculty: 'Medical & Health Sciences',
    jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    waecCredits: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    competitiveScore: 280,
    minimumScore: 230,
    advice: 'All 5 O’Level credits must be in one sitting for UNILAG, UI, and UNIBEN. Agric Science is NEVER accepted in place of Biology.',
    riskWarning: 'Do NOT register Agricultural Science in JAMB! It will lead to automatic disqualification during screening.',
    popularUniversities: [
      { name: 'University of Ibadan (UI)', code: 'UI', type: 'Federal', cutOff: 285 },
      { name: 'University of Lagos (UNILAG)', code: 'UNILAG', type: 'Federal', cutOff: 280 },
      { name: 'University of Nigeria (UNN)', code: 'UNN', type: 'Federal', cutOff: 275 },
      { name: 'University of Benin (UNIBEN)', code: 'UNIBEN', type: 'Federal', cutOff: 270 },
      { name: 'Lagos State University (LASU)', code: 'LASU', type: 'State', cutOff: 260 },
      { name: 'Afe Babalola University (ABUAD)', code: 'ABUAD', type: 'Private', cutOff: 240 },
    ],
  },
  {
    id: 'nursing',
    name: 'Nursing Science (B.N.Sc)',
    faculty: 'Medical & Health Sciences',
    jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    waecCredits: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    competitiveScore: 250,
    minimumScore: 210,
    advice: 'Extremely high competition in all Federal and State universities. High Post-UTME score required.',
    riskWarning: 'Mathematics cannot replace Physics in JAMB for Nursing at Federal universities.',
    popularUniversities: [
      { name: 'University of Benin (UNIBEN)', code: 'UNIBEN', type: 'Federal', cutOff: 260 },
      { name: 'University of Lagos (UNILAG)', code: 'UNILAG', type: 'Federal', cutOff: 255 },
      { name: 'Obafemi Awolowo University (OAU)', code: 'OAU', type: 'Federal', cutOff: 250 },
      { name: 'Delta State University (DELSU)', code: 'DELSU', type: 'State', cutOff: 235 },
      { name: 'Babcock University', code: 'BABCOCK', type: 'Private', cutOff: 210 },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy (Pharm.D)',
    faculty: 'Medical & Health Sciences',
    jambSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    waecCredits: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    competitiveScore: 260,
    minimumScore: 220,
    advice: 'Mathematics credit is compulsory in WAEC. 6-year Doctor of Pharmacy programme.',
    popularUniversities: [
      { name: 'University of Ibadan (UI)', code: 'UI', type: 'Federal', cutOff: 265 },
      { name: 'University of Lagos (UNILAG)', code: 'UNILAG', type: 'Federal', cutOff: 260 },
      { name: 'University of Ilorin (UNILORIN)', code: 'UNILORIN', type: 'Federal', cutOff: 245 },
      { name: 'Olabisi Onabanjo University (OOU)', code: 'OOU', type: 'State', cutOff: 230 },
    ],
  },
  {
    id: 'comp-sci',
    name: 'Computer Science',
    faculty: 'Science & Computing',
    jambSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry or Further Maths'],
    waecCredits: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'One other credit'],
    competitiveScore: 250,
    minimumScore: 190,
    advice: 'Mathematics and Physics in JAMB are non-negotiable. Available in Universities and Top Polytechnics (ND/HND).',
    riskWarning: 'Biology is NOT accepted as a primary science in place of Physics for Computer Science in top Federal universities.',
    popularUniversities: [
      { name: 'University of Lagos (UNILAG)', code: 'UNILAG', type: 'Federal', cutOff: 265 },
      { name: 'FUTA Akure', code: 'FUTA', type: 'Federal', cutOff: 245 },
      { name: 'Covenant University', code: 'CU', type: 'Private', cutOff: 230 },
      { name: 'Yaba College of Technology (YABATECH)', code: 'YABATECH', type: 'Polytechnic', cutOff: 180 },
      { name: 'Federal Poly Ilaro', code: 'ILARO-POLY', type: 'Polytechnic', cutOff: 170 },
    ],
  },
  {
    id: 'law',
    name: 'Civil / Common Law (LL.B)',
    faculty: 'Law & Legal Studies',
    jambSubjects: ['English Language', 'Literature in English', 'Government or History', 'Any Arts / Social Science'],
    waecCredits: ['English Language', 'Literature in English', 'Government', 'Mathematics (pass/credit)', 'One other subject'],
    competitiveScore: 270,
    minimumScore: 220,
    advice: 'Literature in English is strictly compulsory in both JAMB and WAEC. Mathematics pass (D7) allowed in some, but credit preferred.',
    riskWarning: 'Candidates without Literature in English in JAMB are automatically rejected for Law across all Nigerian universities!',
    popularUniversities: [
      { name: 'University of Lagos (UNILAG)', code: 'UNILAG', type: 'Federal', cutOff: 275 },
      { name: 'University of Ibadan (UI)', code: 'UI', type: 'Federal', cutOff: 270 },
      { name: 'OAU Ile-Ife', code: 'OAU', type: 'Federal', cutOff: 265 },
      { name: 'Lagos State University (LASU)', code: 'LASU', type: 'State', cutOff: 250 },
    ],
  },
  {
    id: 'accounting',
    name: 'Accounting',
    faculty: 'Management & Social Sciences',
    jambSubjects: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting or Commerce or Govt'],
    waecCredits: ['English Language', 'Mathematics', 'Economics', 'Commerce or Accounting', 'One other credit'],
    competitiveScore: 240,
    minimumScore: 180,
    advice: 'Mathematics and Economics are strictly compulsory. Both ND/HND polytechnics and universities have strong ICAN partnerships.',
    popularUniversities: [
      { name: 'University of Lagos (UNILAG)', code: 'UNILAG', type: 'Federal', cutOff: 250 },
      { name: 'University of Benin (UNIBEN)', code: 'UNIBEN', type: 'Federal', cutOff: 235 },
      { name: 'Federal Poly Ilaro', code: 'ILARO-POLY', type: 'Polytechnic', cutOff: 175 },
      { name: 'The Polytechnic, Ibadan', code: 'IBADAN-POLY', type: 'Polytechnic', cutOff: 165 },
    ],
  },
  {
    id: 'mass-comm',
    name: 'Mass Communication',
    faculty: 'Management & Social Sciences',
    jambSubjects: ['English Language', 'Literature in English', 'Government or CRS/IRS', 'Economics or Commerce'],
    waecCredits: ['English Language', 'Mathematics', 'Literature in English', 'Government', 'One other Arts/Social Science'],
    competitiveScore: 245,
    minimumScore: 185,
    advice: 'Literature in English compulsory for UNILAG and UNN. Offered with massive practical studio training in YABATECH.',
    popularUniversities: [
      { name: 'University of Lagos (UNILAG)', code: 'UNILAG', type: 'Federal', cutOff: 255 },
      { name: 'Lagos State University (LASU)', code: 'LASU', type: 'State', cutOff: 230 },
      { name: 'Yaba College of Technology (YABATECH)', code: 'YABATECH', type: 'Polytechnic', cutOff: 185 },
    ],
  },
];

export const UNIVERSITIES: UniversityItem[] = ALL_NIGERIAN_INSTITUTIONS;
