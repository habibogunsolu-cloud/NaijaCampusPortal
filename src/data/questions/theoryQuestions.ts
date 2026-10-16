import { TheoryItem } from '../readHubData';

export const ADDITIONAL_THEORY_QUESTIONS: Record<string, TheoryItem[]> = {
  English: [
    {
      id: 105,
      title: 'Formal Letter to the Minister of Education (25 Marks)',
      topic: 'Continuous Writing / Letter Writing',
      year: 'WAEC Standard',
      totalMarks: '25 Marks',
      question:
        'You are the president of the National Association of Secondary School Candidates. Write a letter to the Honorable Minister of Education suggesting three practical solutions to curb computer-based test (CBT) network failures and power outages during national examinations.',
      markingScheme: [
        {
          step: 'Format: Official designation, Ministry address, Date, Formal Salutation (Dear Sir/Madam), Title in Block Capitals or Underlined, Formal Complementary Close (Yours faithfully, Signature, Full Name)',
          marks: '5 Marks',
        },
        {
          step: 'Content Point 1: Decentralized offline local-caching CBT servers to eliminate internet reliance during live exams',
          marks: '5 Marks',
        },
        {
          step: 'Content Point 2: Compulsory dual solar inverter/generator backup certification for all accredited CBT centers',
          marks: '5 Marks',
        },
        {
          step: 'Content Point 3: Independent biometric auditing and early pre-exam hardware health checks 72 hours prior',
          marks: '5 Marks',
        },
        {
          step: 'Expression, Mechanical Accuracy, and Formal Tone without colloquial slang',
          marks: '5 Marks',
        },
      ],
      modelAnswer:
        'The letter must exhibit flawless formal register. The candidate should address the Minister with dignity, establish the urgency of candidate distress during unexpected server timeouts, and present the three actionable recommendations clearly with practical implementation roadmaps.',
      examinerAdvice:
        'Avoid informal greetings like "Hello Sir". Always ensure the address format has the sender address on the top right and recipient on the left.',
    },
    {
      id: 106,
      title: 'Summary Passage: Combating Examination Malpractice (30 Marks)',
      topic: 'Summary Writing',
      year: 'WAEC / NECO',
      totalMarks: '30 Marks',
      question:
        'In three short sentences, one for each, state the three main factors responsible for examination malpractice among secondary school students in Nigeria.',
      markingScheme: [
        {
          step: 'Point 1: Inadequate preparation and failure to cover the official syllabus early',
          marks: '10 Marks',
        },
        {
          step: 'Point 2: Intense societal and parental pressure placed exclusively on paper qualifications over actual competence',
          marks: '10 Marks',
        },
        {
          step: 'Point 3: Complicity and compromise among rogue invigilators and miracle center proprietors',
          marks: '10 Marks',
        },
      ],
      modelAnswer:
        '1. Students engage in malpractice due to chronic lack of preparation and poor study habits.\n2. Society places undue premium on paper certificates rather than practical skills.\n3. Dishonest operators and invigilators actively facilitate illegal syndicates for financial gain.',
      examinerAdvice:
        'Summary answers MUST be written in complete sentences. Mindless copying of entire paragraphs from the passage results in severe deduction of marks for mindless lifting.',
    },
  ],
  Mathematics: [
    {
      id: 205,
      title: 'Word Problem Leading to Simultaneous Linear & Quadratic Equations (12 Marks)',
      topic: 'Algebra & Simultaneous Equations',
      year: 'WAEC 2024',
      totalMarks: '12 Marks',
      question:
        'The perimeter of a rectangular school compound is 34 meters and its area is 60 square meters. Find the length and width of the compound.',
      markingScheme: [
        {
          step: 'Formulate equations: Let length be L and width be W. Perimeter: 2(L + W) = 34 => L + W = 17 => W = 17 - L',
          marks: '3 Marks',
        },
        {
          step: 'Area equation: L * W = 60 => L(17 - L) = 60 => 17L - L² = 60',
          marks: '3 Marks',
        },
        {
          step: 'Rearrange to standard quadratic form: L² - 17L + 60 = 0',
          marks: '2 Marks',
        },
        {
          step: 'Factorize: (L - 12)(L - 5) = 0 => L = 12 or L = 5',
          marks: '2 Marks',
        },
        {
          step: 'Conclusion: The dimensions of the compound are Length = 12 meters and Width = 5 meters',
          marks: '2 Marks',
        },
      ],
      modelAnswer:
        'Let the dimensions be L (length) and W (width).\nFrom the perimeter: 2(L + W) = 34 => L + W = 17 => W = 17 - L.\nFrom the area: L * W = 60 => L(17 - L) = 60.\nL² - 17L + 60 = 0.\nFactorizing: (L - 12)(L - 5) = 0.\nTherefore, L = 12m or L = 5m.\nSince length is conventionally longer than width, Length = 12 meters and Width = 5 meters.',
      examinerAdvice:
        'Always append the correct units (meters) to the final numerical answers. Leaving out units loses half a mark.',
    },
    {
      id: 206,
      title: 'Circle Theorems & Geometric Proofs (12 Marks)',
      topic: 'Geometry & Circle Theorems',
      year: 'WAEC / JAMB',
      totalMarks: '12 Marks',
      question:
        'Prove that the angle subtended by an arc at the center of a circle is twice the angle subtended by it at any point on the remaining part of the circumference.',
      markingScheme: [
        {
          step: 'Clear diagram drawing with circle center O, arc AB, and point P on the circumference',
          marks: '2 Marks',
        },
        {
          step: 'Construction: Join PO and produce the line to Q',
          marks: '2 Marks',
        },
        {
          step: 'Isosceles triangle property: In ΔAOP, OA = OP (radii), hence ∠OAP = ∠OPA',
          marks: '3 Marks',
        },
        {
          step: 'Exterior angle property: Exterior angle ∠AOQ = ∠OAP + ∠OPA = 2∠OPA',
          marks: '3 Marks',
        },
        {
          step: 'Summation: Similarly, ∠BOQ = 2∠OPB. Adding both equations gives ∠AOB = 2∠APB (Q.E.D.)',
          marks: '2 Marks',
        },
      ],
      modelAnswer:
        'Refer to the standard geometric construction: In ΔAPO, OA = OP (radii of the same circle). Since angles opposite equal sides are equal, ∠OAP = ∠OPA. By the exterior angle theorem of a triangle, ∠AOQ = ∠OAP + ∠OPA = 2∠OPA. Similarly in ΔBPO, ∠BOQ = 2∠OPB. Summing both: ∠AOQ + ∠BOQ = 2(∠OPA + ∠OPB) => ∠AOB = 2∠APB.',
      examinerAdvice:
        'Candidates must state the geometric reasons in brackets for each step (e.g., "[radii of circle]" or "[ext. ∠ of Δ = sum of int. opp. ∠s]").',
    },
  ],
  Biology: [
    {
      id: 304,
      title: 'Carbon Cycle & Photosynthesis Ecological Interdependence (15 Marks)',
      topic: 'Ecology & Nutrient Cycles',
      year: 'WAEC 2024',
      totalMarks: '15 Marks',
      question:
        'Explain how carbon is removed from and returned to the atmosphere in nature. Discuss the ecological hazard of excess atmospheric carbon dioxide.',
      markingScheme: [
        {
          step: 'Removal: Photosynthesis by green plants and phytoplankton absorbing atmospheric CO₂ to synthesize glucose',
          marks: '4 Marks',
        },
        {
          step: 'Return: Aerobic cellular respiration by living organisms, decay/decomposition by saprophytic bacteria, and combustion of fossil fuels',
          marks: '5 Marks',
        },
        {
          step: 'Ecological Hazard: Greenhouse effect trapping infrared heat, leading to global warming, erratic weather patterns, and rising sea levels',
          marks: '6 Marks',
        },
      ],
      modelAnswer:
        'Carbon is removed primarily through photosynthesis where autotrophs fix CO₂ into organic compounds. Carbon returns to the atmosphere through: (1) cellular respiration of plants and animals, (2) decomposition of organic matter by microorganisms, and (3) combustion of wood and fossil fuels. Excess CO₂ amplifies the greenhouse effect, trapping terrestrial radiation and driving global warming, polar ice melt, and oceanic acidification.',
      examinerAdvice:
        'Clearly differentiate between cellular respiration (produces CO₂) and photosynthesis (absorbs CO₂).',
    },
  ],
  Physics: [
    {
      id: 504,
      title: 'Newton’s Laws of Motion & Conservation of Linear Momentum (15 Marks)',
      topic: 'Mechanics & Dynamics',
      year: 'WAEC 2024',
      totalMarks: '15 Marks',
      question:
        'State the Principle of Conservation of Linear Momentum. A bullet of mass 0.05 kg is fired horizontally from a rifle of mass 4.0 kg with an initial velocity of 400 m/s. Calculate the recoil velocity of the rifle.',
      markingScheme: [
        {
          step: 'Statement of principle: In a closed system of colliding bodies, the total linear momentum remains constant provided no external net force acts on the system',
          marks: '4 Marks',
        },
        {
          step: 'Momentum equation: Total initial momentum = Total final momentum. Before firing: (mb + mr) * 0 = 0',
          marks: '3 Marks',
        },
        {
          step: 'After firing: mb * vb + mr * vr = 0',
          marks: '3 Marks',
        },
        {
          step: 'Substitution: (0.05 kg * 400 m/s) + (4.0 kg * vr) = 0 => 20 + 4.0 vr = 0',
          marks: '3 Marks',
        },
        {
          step: 'Calculation & sign interpretation: vr = -20 / 4.0 = -5.0 m/s. The negative sign denotes that the rifle recoils in the opposite direction to the bullet',
          marks: '2 Marks',
        },
      ],
      modelAnswer:
        'Principle of Conservation of Linear Momentum states that the total momentum of an isolated system before collision or explosion equals the total momentum after the event, provided no external resultant force acts.\nBefore firing, system is at rest: P_initial = 0.\nAfter firing: P_final = m_bullet * v_bullet + m_rifle * v_rifle = 0.\n(0.05 * 400) + 4.0 * v_rifle = 0 => 20 + 4v = 0 => v = -5 m/s.\nThe rifle recoils backward with a velocity of 5 m/s.',
      examinerAdvice:
        'Always interpret the negative sign: it signifies opposite directional recoil velocity.',
    },
  ],
  Chemistry: [
    {
      id: 404,
      title: 'Faraday’s Laws of Electrolysis & Quantitative Calculation (15 Marks)',
      topic: 'Electrochemistry',
      year: 'WAEC Standard',
      totalMarks: '15 Marks',
      question:
        'State Faraday’s First Law of Electrolysis. Calculate the mass of copper deposited when a current of 2.5 Amperes is passed through a copper(II) sulfate solution for 1 hour and 20 minutes: [1 Faraday = 96,500 C, Cu = 64 g/mol]',
      markingScheme: [
        {
          step: 'Statement: The mass (m) of a substance discharged or deposited during electrolysis is directly proportional to the quantity of electricity (Q) passed through the electrolyte',
          marks: '4 Marks',
        },
        {
          step: 'Calculate time in seconds: t = 1 hr 20 min = (60 * 60) + (20 * 60) = 3600 + 1200 = 4800 seconds',
          marks: '3 Marks',
        },
        {
          step: 'Calculate quantity of electricity: Q = I * t = 2.5 A * 4800 s = 12,000 Coulombs',
          marks: '3 Marks',
        },
        {
          step: 'Electrode half-reaction: Cu²⁺ + 2e⁻ -> Cu(s). 2 Faradays (2 * 96,500 C) deposits 1 mole of Cu (64g)',
          marks: '3 Marks',
        },
        {
          step: 'Mass calculation: m = (12,000 * 64) / (2 * 96,500) = 768,000 / 193,000 = 3.98 grams of Copper',
          marks: '2 Marks',
        },
      ],
      modelAnswer:
        'Faraday’s First Law: m = Z * Q.\nTime t = (1 * 3600) + (20 * 60) = 4800 s.\nQuantity Q = I * t = 2.5 * 4800 = 12,000 C.\nCathode reaction: Cu²⁺ + 2e⁻ -> Cu(s).\nDeposit of 64g of Cu requires 2 * 96,500 C = 193,000 C.\nMass of Cu = (12,000 * 64) / 193,000 = 3.98 grams.',
      examinerAdvice:
        'Candidates commonly make the mistake of multiplying time in minutes instead of converting strictly to seconds (SI unit).',
    },
  ],
};
