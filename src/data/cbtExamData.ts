export interface CbtQuestion {
  id: number;
  subject: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  trapWarning: string;
  hint: string;
  year: string;
  topic: string;
}

export interface CbtSubjectInfo {
  id: string;
  name: string;
  code: string;
  isCompulsory?: boolean;
  questionCount: number;
  facultyGroup: 'General' | 'Science' | 'Commercial' | 'Arts';
  description: string;
}

export const CBT_SUBJECTS_LIST: CbtSubjectInfo[] = [
  {
    id: 'English',
    name: 'Use of English',
    code: 'ENG',
    isCompulsory: true,
    questionCount: 60,
    facultyGroup: 'General',
    description: 'Compulsory for all candidates: Comprehension, Lexis, Oral English & Grammar',
  },
  {
    id: 'Mathematics',
    name: 'Mathematics',
    code: 'MTH',
    questionCount: 40,
    facultyGroup: 'Science',
    description: 'Algebra, Calculus, Statistics, Trigonometry & Coordinate Geometry',
  },
  {
    id: 'Biology',
    name: 'Biology',
    code: 'BIO',
    questionCount: 40,
    facultyGroup: 'Science',
    description: 'Cell Biology, Physiology, Genetics, Evolution & Ecology',
  },
  {
    id: 'Chemistry',
    name: 'Chemistry',
    code: 'CHM',
    questionCount: 40,
    facultyGroup: 'Science',
    description: 'Stoichiometry, Organic Chemistry, Electrochemistry & Equilibrium',
  },
  {
    id: 'Physics',
    name: 'Physics',
    code: 'PHY',
    questionCount: 40,
    facultyGroup: 'Science',
    description: 'Mechanics, Waves, Optics, Electricity, Magnetism & Modern Physics',
  },
  {
    id: 'Economics',
    name: 'Economics',
    code: 'ECN',
    questionCount: 40,
    facultyGroup: 'Commercial',
    description: 'Microeconomics, Elasticity, Macroeconomics, Public Finance & Banking',
  },
  {
    id: 'Government',
    name: 'Government',
    code: 'GOV',
    questionCount: 40,
    facultyGroup: 'Arts',
    description: 'Nigerian Constitutional History, Political Systems & International Relations',
  },
  {
    id: 'Literature',
    name: 'Literature in English',
    code: 'LIT',
    questionCount: 40,
    facultyGroup: 'Arts',
    description: 'African & Non-African Prose, Poetry, Drama & Literary Appreciation',
  },
  {
    id: 'Novel',
    name: 'JAMB Prescribed Novel',
    code: 'NVL',
    questionCount: 40,
    facultyGroup: 'General',
    description: 'The Life Changer, Sweet Sixteen & Real-Time Prescribed Literary Texts',
  },
];

export const CBT_QUESTIONS_BANK: Record<string, CbtQuestion[]> = {
  English: [
    {
      id: 101,
      subject: 'English',
      question: 'Choose the word that has the SAME vowel sound as the underlined sound in "C_ou_rt":',
      options: [
        { key: 'A', text: 'Hurt' },
        { key: 'B', text: 'Port' },
        { key: 'C', text: 'Curse' },
        { key: 'D', text: 'Shut' },
      ],
      correct: 'B',
      explanation: 'Court contains the long open back rounded vowel /ɔː/, which corresponds to Port /pɔːt/. Hurt and Curse have the central vowel /ɜː/.',
      trapWarning: 'JAMB frequently tests /ɔː/ versus /ɜː/. Do not assume letters "ou" produce the "ur" sound.',
      hint: 'Notice that "Court" rhymes with "Sport" and "Port", not "Bird".',
      year: 'JAMB 2024 Past Question',
      topic: 'Oral English (Vowel Sounds)',
    },
    {
      id: 102,
      subject: 'English',
      question: 'Select the option OPPOSITE in meaning to the underlined word: "The commissioner gave an _equivocal_ response regarding the tertiary grant allocation."',
      options: [
        { key: 'A', text: 'Ambiguous' },
        { key: 'B', text: 'Clear and unambiguous' },
        { key: 'C', text: 'Diplomatic' },
        { key: 'D', text: 'Hesitant' },
      ],
      correct: 'B',
      explanation: 'Equivocal means open to more than one interpretation (vague/ambiguous). The antonym (opposite) is clear and unambiguous.',
      trapWarning: 'Candidates often pick "Ambiguous" because they forget this is the ANTONYM section!',
      hint: 'Equivocal means cloudy and evasive. You want the opposite: crystal clear.',
      year: 'JAMB 2024 Past Question',
      topic: 'Antonyms',
    },
    {
      id: 103,
      subject: 'English',
      question: 'Choose the word that is NEAREST IN MEANING to the underlined word: "The university senate described the student’s conduct as _reprehensible_."',
      options: [
        { key: 'A', text: 'Commendable' },
        { key: 'B', text: 'Blameworthy' },
        { key: 'C', text: 'Mysterious' },
        { key: 'D', text: 'Excusable' },
      ],
      correct: 'B',
      explanation: 'Reprehensible means highly unacceptable, disgraceful, and deserving of strong condemnation (blameworthy).',
      trapWarning: 'Do not confuse reprehensible with responsible or comprehensive.',
      hint: 'Reprehensible actions warrant disciplinary sanctions.',
      year: 'JAMB 2023 Past Question',
      topic: 'Synonyms',
    },
    {
      id: 104,
      subject: 'English',
      question: 'Identify the word with the primary stress on the SECOND syllable:',
      options: [
        { key: 'A', text: 'PHOTOGRAPH' },
        { key: 'B', text: 'PHOTOGRAPHY' },
        { key: 'C', text: 'PHOTOGRAPHIC' },
        { key: 'D', text: 'PHOTO' },
      ],
      correct: 'B',
      explanation: 'pho-TOG-ra-phy has its main stress placed on the second syllable. PHO-to-graph has stress on the 1st syllable, and pho-to-GRAPH-ic on the 3rd.',
      trapWarning: 'Nouns ending with the suffix "-graphy" almost invariably shift stress to the antepenultimate syllable (immediately preceding -graphy).',
      hint: 'Say it naturally: pho-TOG-ra-phy.',
      year: 'JAMB 2023 Past Question',
      topic: 'Oral English (Stress Placement)',
    },
    {
      id: 105,
      subject: 'English',
      question: 'Complete the sentence with the correct concord: "Neither the faculty dean nor the lecturers _______ present at the accreditation audit."',
      options: [
        { key: 'A', text: 'was' },
        { key: 'B', text: 'were' },
        { key: 'C', text: 'is' },
        { key: 'D', text: 'has been' },
      ],
      correct: 'B',
      explanation: 'Under the Rule of Proximity for "neither...nor" correlative conjunctions, the finite verb must agree in number with the noun closest to it. "Lecturers" is plural, hence "were".',
      trapWarning: 'Do not agree with "dean" (singular). Look at the subject nearest the blank space: lecturers.',
      hint: 'Closest subject is plural (lecturers) -> use plural verb (were).',
      year: 'JAMB 2022 Past Question',
      topic: 'Concord & Subject-Verb Agreement',
    },
    {
      id: 106,
      subject: 'English',
      question: 'Choose the correct preposition: "The candidate was absolved _______ all charges of examination misconduct by the disciplinary panel."',
      options: [
        { key: 'A', text: 'from' },
        { key: 'B', text: 'of' },
        { key: 'C', text: 'with' },
        { key: 'D', text: 'against' },
      ],
      correct: 'A',
      explanation: 'In formal English grammar and standard exam testing, one is "absolved from" charges, duties, or penalties.',
      trapWarning: '"Absolved against" is a common colloquial Nigerian error.',
      hint: 'Think: freed from -> absolved from.',
      year: 'JAMB 2023 Past Question',
      topic: 'Prepositional Usage',
    },
    {
      id: 107,
      subject: 'English',
      question: 'Identify the grammatical function of the underlined clause: "What the JAMB registrar announced _astonished all candidates_."',
      options: [
        { key: 'A', text: 'Adverbial clause of reason' },
        { key: 'B', text: 'Noun clause, subject of the verb "astonished"' },
        { key: 'C', text: 'Adjectival clause qualifying "registrar"' },
        { key: 'D', text: 'Prepositional phrase' },
      ],
      correct: 'B',
      explanation: 'The clause "What the JAMB registrar announced" acts as the subject of the transitive verb "astonished". Because it occupies the noun position, it is a Noun Clause.',
      trapWarning: 'You can substitute the whole clause with "The news" or "The statement" (a noun).',
      hint: 'Ask: WHAT astonished candidates? The entire clause did!',
      year: 'JAMB 2024 Past Question',
      topic: 'Grammatical Structures & Clauses',
    },
    {
      id: 108,
      subject: 'English',
      question: 'Choose the option that correctly conveys the meaning of the idiom: "The vice chancellor refused to _sweep the financial discrepancies under the carpet_."',
      options: [
        { key: 'A', text: 'Clean the administrative flooring' },
        { key: 'B', text: 'Conceal or hide the improper matters' },
        { key: 'C', text: 'Delegate the audit to junior staff' },
        { key: 'D', text: 'Pay the discrepancies out of private funds' },
      ],
      correct: 'B',
      explanation: 'To "sweep something under the carpet/rug" is an idiomatic expression meaning to hide, ignore, or conceal a problem in hopes that nobody discovers it.',
      trapWarning: 'Never pick literal translations when dealing with English idioms.',
      hint: 'Hiding dust under a rug means trying to conceal dirty secrets.',
      year: 'JAMB 2024 Past Question',
      topic: 'Idioms & Figures of Speech',
    },
  ],

  Mathematics: [
    {
      id: 201,
      subject: 'Mathematics',
      question: 'If log₁₀(x) + log₁₀(x - 3) = 1, find the positive real value of x:',
      options: [
        { key: 'A', text: '2' },
        { key: 'B', text: '5' },
        { key: 'C', text: '-2' },
        { key: 'D', text: '10' },
      ],
      correct: 'B',
      explanation: 'By the logarithmic product rule: log₁₀(x(x - 3)) = 1 => x² - 3x = 10¹ => x² - 3x - 10 = 0. Factoring gives (x - 5)(x + 2) = 0. Since logarithms of negative numbers are undefined in real numbers, x = 5.',
      trapWarning: 'Always discard negative roots in logarithms. Option C (-2) is a deliberate distractor for hasty students!',
      hint: 'Combine logs: log(A) + log(B) = log(A × B), then solve the quadratic.',
      year: 'JAMB 2024 Past Question',
      topic: 'Logarithms & Quadratic Equations',
    },
    {
      id: 202,
      subject: 'Mathematics',
      question: 'Find the derivative dy/dx of y = (3x² - 5)⁴ with respect to x:',
      options: [
        { key: 'A', text: '12x(3x² - 5)³' },
        { key: 'B', text: '24x(3x² - 5)³' },
        { key: 'C', text: '4(3x² - 5)³' },
        { key: 'D', text: '6x(3x² - 5)⁴' },
      ],
      correct: 'B',
      explanation: 'By the Chain Rule: dy/dx = 4(3x² - 5)³ × d/dx(3x² - 5) = 4(3x² - 5)³ × (6x) = 24x(3x² - 5)³.',
      trapWarning: 'Students frequently differentiate the outer power and forget to multiply by the internal derivative (6x). Option C is the classic trap!',
      hint: 'Chain Rule: differentiate outside power, then multiply by inner derivative.',
      year: 'JAMB 2024 Past Question',
      topic: 'Calculus (Differentiation)',
    },
    {
      id: 203,
      subject: 'Mathematics',
      question: 'The arithmetic mean of 5 numbers is 12. If a sixth number is added, the new mean becomes 14. What is the sixth number?',
      options: [
        { key: 'A', text: '20' },
        { key: 'B', text: '24' },
        { key: 'C', text: '26' },
        { key: 'D', text: '22' },
      ],
      correct: 'B',
      explanation: 'Sum of the first 5 numbers = 5 × 12 = 60. Sum of 6 numbers = 6 × 14 = 84. Therefore, the 6th number = 84 - 60 = 24.',
      trapWarning: 'Do not simply average 12 and 14! Always compute total sums first.',
      hint: 'Find Sum 1 (60) and Sum 2 (84), then take their difference.',
      year: 'JAMB 2023 Past Question',
      topic: 'Statistics (Measures of Central Tendency)',
    },
    {
      id: 204,
      subject: 'Mathematics',
      question: 'Evaluate the definite integral ∫ (3x² - 4x + 5) dx from x = 0 to x = 2:',
      options: [
        { key: 'A', text: '10' },
        { key: 'B', text: '14' },
        { key: 'C', text: '18' },
        { key: 'D', text: '8' },
      ],
      correct: 'A',
      explanation: '∫ (3x² - 4x + 5) dx = [x³ - 2x² + 5x] from 0 to 2 = (2³ - 2(2²) + 5(2)) - 0 = (8 - 8 + 10) = 10.',
      trapWarning: 'Watch signs when evaluating exponents and subtraction.',
      hint: 'Integrate term by term: 3(x³/3) - 4(x²/2) + 5x.',
      year: 'JAMB 2023 Past Question',
      topic: 'Calculus (Definite Integration)',
    },
    {
      id: 205,
      subject: 'Mathematics',
      question: 'If tan θ = 3/4 and θ is an acute angle, find the value of (sin θ + cos θ):',
      options: [
        { key: 'A', text: '7/5' },
        { key: 'B', text: '1/5' },
        { key: 'C', text: '5/7' },
        { key: 'D', text: '4/3' },
      ],
      correct: 'A',
      explanation: 'In a right-angled triangle, Opposite = 3, Adjacent = 4, Hypotenuse = √(3² + 4²) = 5. Hence sin θ = 3/5, cos θ = 4/5. Sum = 3/5 + 4/5 = 7/5 (or 1.4).',
      trapWarning: 'Remember the classic 3-4-5 Pythagorean triangle.',
      hint: 'Opposite = 3, Adjacent = 4, Hypotenuse = 5.',
      year: 'JAMB 2022 Past Question',
      topic: 'Trigonometry',
    },
    {
      id: 206,
      subject: 'Mathematics',
      question: 'Solve for x in the exponential equation 3^(2x - 1) = 81:',
      options: [
        { key: 'A', text: '2.5' },
        { key: 'B', text: '3' },
        { key: 'C', text: '2' },
        { key: 'D', text: '1.5' },
      ],
      correct: 'A',
      explanation: 'Express 81 as a power of 3: 81 = 3⁴. Thus, 3^(2x - 1) = 3⁴ => 2x - 1 = 4 => 2x = 5 => x = 5/2 = 2.5.',
      trapWarning: 'Do not forget to add 1 to 4 before dividing by 2.',
      hint: 'Convert 81 to base 3 (3⁴).',
      year: 'JAMB 2024 Past Question',
      topic: 'Indices & Exponents',
    },
  ],

  Physics: [
    {
      id: 301,
      subject: 'Physics',
      question: 'A projectile is launched with velocity 40 m/s at an angle of 30° to the horizontal. Calculate its total time of flight. (Take g = 10 m/s²):',
      options: [
        { key: 'A', text: '2.0 s' },
        { key: 'B', text: '4.0 s' },
        { key: 'C', text: '8.0 s' },
        { key: 'D', text: '1.5 s' },
      ],
      correct: 'B',
      explanation: 'Total time of flight T = (2u sin θ) / g = (2 × 40 × sin 30°) / 10 = (80 × 0.5) / 10 = 40 / 10 = 4.0 seconds.',
      trapWarning: 'Do not confuse total time of flight T = (2u sin θ)/g with time to reach maximum height t = (u sin θ)/g, which is 2.0 s (Option A).',
      hint: 'Flight time is double the time to reach the apex.',
      year: 'JAMB 2024 Past Question',
      topic: 'Mechanics (Projectile Motion)',
    },
    {
      id: 302,
      subject: 'Physics',
      question: 'The electric power consumed by an electrical appliance of resistance 50 Ω connected to a 200 V mains supply is:',
      options: [
        { key: 'A', text: '4 W' },
        { key: 'B', text: '800 W' },
        { key: 'C', text: '400 W' },
        { key: 'D', text: '1000 W' },
      ],
      correct: 'B',
      explanation: 'Electric Power P = V² / R = (200)² / 50 = 40,000 / 50 = 800 Watts.',
      trapWarning: 'Do not compute V/R (which gives Current I = 4 Amperes). The question asks for POWER, not current!',
      hint: 'Formula: P = V² / R.',
      year: 'JAMB 2024 Past Question',
      topic: 'Current Electricity',
    },
    {
      id: 303,
      subject: 'Physics',
      question: 'Which of the following electromagnetic radiations possesses the SHORTEST wavelength in the spectrum?',
      options: [
        { key: 'A', text: 'Radio waves' },
        { key: 'B', text: 'Visible light' },
        { key: 'C', text: 'Gamma rays' },
        { key: 'D', text: 'Infra-red rays' },
      ],
      correct: 'C',
      explanation: 'Gamma rays have the highest frequency and photon energy in the electromagnetic spectrum, and consequently possess the shortest wavelength (λ = c / f).',
      trapWarning: 'Shortest wavelength corresponds to HIGHEST frequency and energy.',
      hint: 'Gamma rays have the greatest penetrating power due to extreme high frequency and ultra-short wavelength.',
      year: 'JAMB 2023 Past Question',
      topic: 'Waves & Electromagnetic Spectrum',
    },
    {
      id: 304,
      subject: 'Physics',
      question: 'An object placed 15 cm in front of a concave mirror produces a real inverted image at 30 cm from the mirror. Calculate the focal length of the mirror:',
      options: [
        { key: 'A', text: '10 cm' },
        { key: 'B', text: '20 cm' },
        { key: 'C', text: '5 cm' },
        { key: 'D', text: '15 cm' },
      ],
      correct: 'A',
      explanation: 'Mirror formula: 1/f = 1/u + 1/v = 1/15 + 1/30 = (2 + 1) / 30 = 3/30 = 1/10. Therefore, f = 10 cm.',
      trapWarning: 'Ensure you invert 1/f at the end. 3/30 is 1/10, so f = 10 cm.',
      hint: 'Mirror equation: 1/f = 1/u + 1/v.',
      year: 'JAMB 2022 Past Question',
      topic: 'Geometrical Optics (Mirrors)',
    },
  ],

  Chemistry: [
    {
      id: 401,
      subject: 'Chemistry',
      question: 'In the industrial Haber process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ/mol), what condition maximizes the equilibrium yield of ammonia?',
      options: [
        { key: 'A', text: 'Low pressure and high temperature' },
        { key: 'B', text: 'High pressure and moderate/low temperature' },
        { key: 'C', text: 'Low pressure and low temperature' },
        { key: 'D', text: 'High pressure and high temperature' },
      ],
      correct: 'B',
      explanation: 'By Le Chatelier’s principle, increasing pressure shifts equilibrium towards the side with fewer gas moles (4 moles on the left vs 2 moles on the right). Since the forward reaction is exothermic (ΔH < 0), lower temperature favors ammonia formation.',
      trapWarning: 'High temperature speeds up the reaction rate, but it DECREASES the equilibrium yield because the reaction is exothermic.',
      hint: 'Count gas moles: 1 + 3 = 4 on left, 2 on right. High pressure favors smaller volume.',
      year: 'JAMB 2024 Past Question',
      topic: 'Chemical Equilibrium & Le Chatelier',
    },
    {
      id: 402,
      subject: 'Chemistry',
      question: 'Calculate the percentage by mass of Nitrogen in Ammonium Trioxonitrate(V), NH₄NO₃. (Relative Atomic Masses: N=14, H=1, O=16):',
      options: [
        { key: 'A', text: '17.5%' },
        { key: 'B', text: '35.0%' },
        { key: 'C', text: '28.0%' },
        { key: 'D', text: '42.5%' },
      ],
      correct: 'B',
      explanation: 'Molar mass of NH₄NO₃ = (14 × 2) + (1 × 4) + (16 × 3) = 28 + 4 + 48 = 80 g/mol. Mass contributed by Nitrogen = 2 × 14 = 28 g. % N = (28 / 80) × 100% = 35.0%.',
      trapWarning: 'Many candidates mistakenly count only ONE Nitrogen atom (14) instead of TWO (28) in NH₄NO₃, falling into the 17.5% trap!',
      hint: 'Look closely at the chemical formula: there are TWO Nitrogen atoms.',
      year: 'JAMB 2024 Past Question',
      topic: 'Stoichiometry & Percentage Composition',
    },
    {
      id: 403,
      subject: 'Chemistry',
      question: 'What is the oxidation number of Chromium in Potassium Dichromate, K₂Cr₂O₇?',
      options: [
        { key: 'A', text: '+3' },
        { key: 'B', text: '+6' },
        { key: 'C', text: '+7' },
        { key: 'D', text: '+4' },
      ],
      correct: 'B',
      explanation: '2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2Cr - 14 = 0 => 2Cr = +12 => Cr = +6.',
      trapWarning: 'Do not forget to divide +12 by 2 because there are two Chromium atoms in the formula!',
      hint: 'K = +1, O = -2, net charge = 0.',
      year: 'JAMB 2023 Past Question',
      topic: 'Redox Reactions & Oxidation Numbers',
    },
    {
      id: 404,
      subject: 'Chemistry',
      question: 'Which of the following organic compounds will decolorize acidified KMnO₄ solution rapidly at room temperature?',
      options: [
        { key: 'A', text: 'Ethane' },
        { key: 'B', text: 'Ethene' },
        { key: 'C', text: 'Benzene' },
        { key: 'D', text: 'Tetrachloromethane' },
      ],
      correct: 'B',
      explanation: 'Ethene (an alkene) contains a reactive carbon-carbon double bond (C=C) which readily undergoes oxidation by acidified KMnO₄ (Baeyer’s test) to form ethane-1,2-diol (glycol).',
      trapWarning: 'Alkanes like Ethane are saturated and do not react with KMnO₄ under standard conditions.',
      hint: 'Look for the unsaturated hydrocarbon with a double bond.',
      year: 'JAMB 2023 Past Question',
      topic: 'Organic Chemistry (Hydrocarbons)',
    },
  ],

  Biology: [
    {
      id: 501,
      subject: 'Biology',
      question: 'Which of the following ABO blood groups is designated as the Universal Recipient in blood transfusion?',
      options: [
        { key: 'A', text: 'Group O' },
        { key: 'B', text: 'Group A' },
        { key: 'C', text: 'Group B' },
        { key: 'D', text: 'Group AB' },
      ],
      correct: 'D',
      explanation: 'Group AB red blood cells carry both A and B surface antigens and lack anti-A and anti-B antibodies in plasma, meaning it can receive packed blood from any ABO group safely.',
      trapWarning: 'Group O is the Universal DONOR; Group AB is the Universal RECIPIENT. Do not transpose them!',
      hint: 'AB has both antigens, so it does not destroy donated red cells.',
      year: 'JAMB 2024 Past Question',
      topic: 'Transport & Human Genetics',
    },
    {
      id: 502,
      subject: 'Biology',
      question: 'The cellular organelle directly responsible for aerobic respiration and the synthesis of ATP is the:',
      options: [
        { key: 'A', text: 'Ribosome' },
        { key: 'B', text: 'Golgi apparatus' },
        { key: 'C', text: 'Mitochondrion' },
        { key: 'D', text: 'Lysosome' },
      ],
      correct: 'C',
      explanation: 'Mitochondria are the metabolic "powerhouses" of the eukaryotic cell where the Krebs cycle and electron transport chain generate ATP.',
      trapWarning: 'Ribosomes synthesize proteins; Lysosomes handle intracellular digestion; Mitochondria make ATP.',
      hint: 'Nicknamed the "powerhouse of the cell".',
      year: 'JAMB 2024 Past Question',
      topic: 'Cell Biology & Organelles',
    },
    {
      id: 503,
      subject: 'Biology',
      question: 'In a classic Mendelian monohybrid cross between two heterozygous tall pea plants (Tt × Tt), what is the expected PHENOTYPIC ratio of Tall to Dwarf offspring?',
      options: [
        { key: 'A', text: '1 : 2 : 1' },
        { key: 'B', text: '3 : 1' },
        { key: 'C', text: '9 : 3 : 3 : 1' },
        { key: 'D', text: '2 : 1' },
      ],
      correct: 'B',
      explanation: 'The phenotypic ratio (physical appearance) is 3 Tall (TT, Tt, Tt) : 1 Dwarf (tt). Note: 1:2:1 is the GENOTYPIC ratio!',
      trapWarning: 'Candidates often confuse PHENOTYPIC ratio (3:1) with GENOTYPIC ratio (1:2:1). Read the prompt carefully!',
      hint: 'Phenotype refers to physical appearance (Tall vs Short).',
      year: 'JAMB 2023 Past Question',
      topic: 'Genetics & Heredity',
    },
    {
      id: 504,
      subject: 'Biology',
      question: 'Which of the following micro-organisms exhibits strictly holozoic nutrition?',
      options: [
        { key: 'A', text: 'Mucor (Bread mould)' },
        { key: 'B', text: 'Amoeba proteus' },
        { key: 'C', text: 'Taenia solium (Tapeworm)' },
        { key: 'D', text: 'Spirogyra' },
      ],
      correct: 'B',
      explanation: 'Amoeba feeds holozoically by engulfing solid food particles via phagocytosis (pseudopodia), digesting them internally within food vacuoles.',
      trapWarning: 'Mucor is saprophytic; Tapeworm is parasitic; Spirogyra is autotrophic.',
      hint: 'Holozoic nutrition involves ingestion, digestion, and egestion.',
      year: 'JAMB 2022 Past Question',
      topic: 'Nutrition in Microorganisms',
    },
  ],

  Economics: [
    {
      id: 601,
      subject: 'Economics',
      question: 'When the percentage change in quantity demanded is strictly GREATER than the percentage change in price (%ΔQd > %ΔP), demand is characterized as:',
      options: [
        { key: 'A', text: 'Price Inelastic' },
        { key: 'B', text: 'Price Elastic' },
        { key: 'C', text: 'Unitary Elastic' },
        { key: 'D', text: 'Perfectively Inelastic' },
      ],
      correct: 'B',
      explanation: 'When the price elasticity of demand coefficient exceeds 1 (|Ed| > 1), demand is price elastic, meaning consumers are highly responsive to price adjustments.',
      trapWarning: 'Inelastic means %ΔQd < %ΔP (|Ed| < 1).',
      hint: 'Elastic demand stretches significantly when price moves slightly.',
      year: 'JAMB 2024 Past Question',
      topic: 'Theory of Demand & Elasticity',
    },
    {
      id: 602,
      subject: 'Economics',
      question: 'Which of the following forms of taxation represents a DIRECT tax in Nigeria?',
      options: [
        { key: 'A', text: 'Value Added Tax (VAT)' },
        { key: 'B', text: 'Personal Income Tax (PAYE)' },
        { key: 'C', text: 'Customs Import Duty' },
        { key: 'D', text: 'Excise Duty on tobacco' },
      ],
      correct: 'B',
      explanation: 'Personal Income Tax (PAYE) is levied directly upon the earnings of the individual and its burden cannot be shifted to a third party.',
      trapWarning: 'VAT, Customs, and Excise duties are indirect taxes whose incidence can be shifted onto the final consumer.',
      hint: 'A direct tax is assessed directly on personal or corporate earnings.',
      year: 'JAMB 2024 Past Question',
      topic: 'Public Finance & Fiscal Policy',
    },
  ],

  Government: [
    {
      id: 701,
      subject: 'Government',
      question: 'Which colonial constitution introduced the elective principle into Nigerian politics for the first time in 1922?',
      options: [
        { key: 'A', text: 'Richards Constitution' },
        { key: 'B', text: 'Clifford Constitution' },
        { key: 'C', text: 'Macpherson Constitution' },
        { key: 'D', text: 'Lyttelton Constitution' },
      ],
      correct: 'B',
      explanation: 'Sir Hugh Clifford’s 1922 Constitution introduced the elective principle into Nigeria, providing for four elected members in the Legislative Council (3 for Lagos, 1 for Calabar).',
      trapWarning: 'Richards (1946) introduced regionalism; Lyttelton (1954) established federalism. The elective principle was Clifford (1922).',
      hint: 'Named after Governor Hugh Clifford (1922).',
      year: 'JAMB 2024 Past Question',
      topic: 'Constitutional Development in Nigeria',
    },
    {
      id: 702,
      subject: 'Government',
      question: 'The democratic doctrine of Separation of Powers between the Executive, Legislature, and Judiciary was formulated by:',
      options: [
        { key: 'A', text: 'John Locke' },
        { key: 'B', text: 'Baron de Montesquieu' },
        { key: 'C', text: 'Thomas Hobbes' },
        { key: 'D', text: 'A.V. Dicey' },
      ],
      correct: 'B',
      explanation: 'French political philosopher Baron de Montesquieu elaborated the doctrine in his 1748 treatise "The Spirit of the Laws" to prevent governmental tyranny.',
      trapWarning: 'A.V. Dicey propounded the Rule of Law; Montesquieu propounded Separation of Powers.',
      hint: 'Think of Montesquieu in France.',
      year: 'JAMB 2023 Past Question',
      topic: 'Political Theories & Concepts',
    },
  ],

  Literature: [
    {
      id: 801,
      subject: 'Literature',
      question: 'A dramatic speech delivered by a character who is ALONE on stage, revealing their private inner thoughts directly to the audience, is termed a:',
      options: [
        { key: 'A', text: 'Dialogue' },
        { key: 'B', text: 'Soliloquy' },
        { key: 'C', text: 'Prologue' },
        { key: 'D', text: 'Monologue' },
      ],
      correct: 'B',
      explanation: 'A soliloquy is delivered when an actor is isolated alone on the stage, speaking their innermost psychological thoughts. A monologue can be delivered in the presence of other silent characters.',
      trapWarning: 'Monologue versus Soliloquy: in a soliloquy, the speaker is strictly ALONE.',
      hint: 'Solo -> Soliloquy.',
      year: 'JAMB 2024 Past Question',
      topic: 'Literary Devices & Dramatic Techniques',
    },
  ],

  Novel: [
    {
      id: 901,
      subject: 'Novel',
      question: 'In Khadija Abubakar Jalli’s "The Life Changer", what was Omar’s official UTME score that prompted the family celebration in Chapter 1?',
      options: [
        { key: 'A', text: '180' },
        { key: 'B', text: '210' },
        { key: 'C', text: '230' },
        { key: 'D', text: '275' },
      ],
      correct: 'C',
      explanation: 'Omar scored 230 points in his JAMB examination, securing him admission to study Law at Lafayette University.',
      trapWarning: 'Many candidates guess round figures like 250 or 200. The exact score specified in the text is 230.',
      hint: 'Omar rushed into the courtyard waving his printed result slip showing 230 points.',
      year: 'JAMB Official Prescribed Text',
      topic: 'Plot & Setting (Chapter 1)',
    },
    {
      id: 902,
      subject: 'Novel',
      question: 'What is the dramatic irony surrounding Salma’s examination malpractice trial in "The Life Changer"?',
      options: [
        { key: 'A', text: 'It was her simplest general elective' },
        { key: 'B', text: 'The course was titled "Moral Philosophy"' },
        { key: 'C', text: 'Her father was the dean of the faculty' },
        { key: 'D', text: 'She had already scored 100% in continuous assessment' },
      ],
      correct: 'B',
      explanation: 'The irony is that Salma acted dishonestly and committed cheating in an academic course titled "Moral Philosophy", which teaches ethical conduct.',
      trapWarning: 'Recognize the literary device: cheating in a course dedicated to morality is dramatic irony.',
      hint: 'Morals versus cheating.',
      year: 'JAMB Official Prescribed Text',
      topic: 'Literary Devices & Themes',
    },
  ],
};

export interface CbtMockExamState {
  registeredSubjects: string[];
  currentSubjectIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, Record<number, 'A' | 'B' | 'C' | 'D'>>; // subject -> questionId -> picked
  flagged: Record<string, Record<number, boolean>>; // subject -> questionId -> boolean
  timeRemainingSeconds: number; // starts at 7200 (120 mins)
  isCompleted: boolean;
  scoreBreakdown?: {
    totalScore: number;
    subjectScores: { subject: string; score: number; maxScore: number; correctCount: number; totalCount: number }[];
    performanceTier: string;
    advice: string;
  };
}

export function getQuestionsForSubject(subject: string): CbtQuestion[] {
  const found = CBT_QUESTIONS_BANK[subject];
  if (found && found.length > 0) return found;
  return CBT_QUESTIONS_BANK['English'] || [];
}

export function calculateExamResults(
  registeredSubjects: string[],
  answers: Record<string, Record<number, 'A' | 'B' | 'C' | 'D'>>
) {
  let totalScoreScaled = 0;
  const subjectScores = registeredSubjects.map((subj) => {
    const questions = getQuestionsForSubject(subj);
    const subjAnswers = answers[subj] || {};
    let correctCount = 0;
    questions.forEach((q) => {
      if (subjAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const totalCount = questions.length || 1;
    // Scaled to official 100 marks per subject
    const subjectScaledScore = Math.round((correctCount / totalCount) * 100);
    totalScoreScaled += subjectScaledScore;

    return {
      subject: subj,
      score: subjectScaledScore,
      maxScore: 100,
      correctCount,
      totalCount,
    };
  });

  let performanceTier = 'Moderate Tier (180 - 219)';
  let advice = 'Good baseline score. Focus revision on high-yield calculation and lexis topics to cross the 250+ barrier.';

  if (totalScoreScaled >= 310) {
    performanceTier = 'Elite National Merit Tier (310 - 400)';
    advice = 'Exceptional performance! Outstanding qualification for Medicine & Surgery, Law, Software Engineering, and Pharmacy at UNILAG, UI, OAU, ABU Zaria, and UNN.';
  } else if (totalScoreScaled >= 270) {
    performanceTier = 'High Competitive Tier (270 - 309)';
    advice = 'Very competitive score! Excellent chance for Engineering, Nursing, Medical Lab Science, Accounting, and Mass Communication across top Federal and State universities.';
  } else if (totalScoreScaled >= 230) {
    performanceTier = 'Competitive Tier (230 - 269)';
    advice = 'Solid competitive score. Meets merit cut-offs for most courses in Management, Social Sciences, Computer Science, and Sciences in Federal & State universities.';
  } else if (totalScoreScaled >= 190) {
    performanceTier = 'Eligible Tier (190 - 229)';
    advice = 'Meets general JAMB university cutoff (140-180+), but highly competitive courses may require State Catchment bonus or change of institution to high-capacity universities.';
  } else {
    performanceTier = 'Needs Intensive Practice (< 190)';
    advice = 'Below average. Practice past question drills daily, focus on time management, and eliminate examiner trap options to boost your score above 230.';
  }

  return {
    totalScore: totalScoreScaled,
    subjectScores,
    performanceTier,
    advice,
  };
}
