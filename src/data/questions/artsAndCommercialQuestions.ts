import { CbtQuestion } from '../cbtExamData';

export const ADDITIONAL_ECONOMICS_QUESTIONS: CbtQuestion[] = [
  {
    id: 612,
    subject: "Economics",
    question: "When the price of a good increases from ₦100 to ₦120, the quantity demanded decreases from 50 units to 40 units. Calculate the price elasticity of demand (PED):",
    options: [
      { key: "A", text: "1.0 (Unitary elastic)" },
      { key: "B", text: "0.5 (Inelastic)" },
      { key: "C", text: "2.0 (Elastic)" },
      { key: "D", text: "1.5 (Elastic)" }
    ],
    correct: "A",
    explanation: "% change in quantity demanded = ((40 - 50) / 50) * 100% = -20%.\n% change in price = ((120 - 100) / 100) * 100% = +20%.\nPED = |-20% / 20%| = 1.0 (Unitary elasticity of demand).",
    trapWarning: "Remember elasticity uses absolute values (ignore negative sign for standard classification). 1.0 is unitary elastic.",
    hint: "% change in Q is 20%; % change in P is 20%. Ratio is 1.0.",
    year: "JAMB 2024 Past Question",
    topic: "Elasticity of Demand"
  },
  {
    id: 613,
    subject: "Economics",
    question: "Which of the following functions of commercial banks represents the unique process of creating money in an economy?",
    options: [
      { key: "A", text: "Safe keeping of jewelry and wills" },
      { key: "B", text: "Credit creation through multiple deposit expansion" },
      { key: "C", text: "Issuing national currency notes" },
      { key: "D", text: "Acting as lender of last resort" }
    ],
    correct: "B",
    explanation: "Commercial banks create money through fractional reserve banking and credit creation by lending out excess reserves. Issuing notes and acting as lender of last resort are Central Bank functions.",
    trapWarning: "Issuing currency notes is strictly a Central Bank (CBN) monopoly, not a commercial bank role.",
    hint: "Credit creation / Fractional reserve deposits create bank money.",
    year: "JAMB 2023 Past Question",
    topic: "Money & Banking"
  },
  {
    id: 614,
    subject: "Economics",
    question: "A tax system where the tax rate increases as the taxpayer's income increases is known as:",
    options: [
      { key: "A", text: "Regressive tax" },
      { key: "B", text: "Proportional tax" },
      { key: "C", text: "Progressive tax" },
      { key: "D", text: "Specific excise duty" }
    ],
    correct: "C",
    explanation: "Under a progressive tax system, higher income earners pay a higher percentage of their income in taxes (e.g., Pay-As-You-Earn / PAYE).",
    trapWarning: "Regressive tax takes a larger proportion of income from lower earners (like sales tax/VAT).",
    hint: "Progressive = progresses higher with income.",
    year: "JAMB 2024 Past Question",
    topic: "Public Finance & Taxation"
  }
];

export const ADDITIONAL_GOVERNMENT_QUESTIONS: CbtQuestion[] = [
  {
    id: 712,
    subject: "Government",
    question: "The 1954 Lyttelton Constitution was historic in Nigerian political development primarily because it:",
    options: [
      { key: "A", text: "Introduced the elective principle for the first time" },
      { key: "B", text: "Formally established Nigeria as a genuine Federation" },
      { key: "C", text: "Created the Senate as an upper legislative chamber" },
      { key: "D", text: "Ended British colonial rule completely" }
    ],
    correct: "B",
    explanation: "The 1954 Lyttelton Constitution formally introduced a federal system of government in Nigeria, creating autonomous regions (North, West, East) with separate premier leaders and civil services.",
    trapWarning: "The elective principle was introduced by the 1922 Clifford Constitution, not Lyttelton.",
    hint: "Lyttelton 1954 = Federalism & regional autonomy.",
    year: "JAMB 2024 Past Question",
    topic: "Nigerian Constitutional Development"
  },
  {
    id: 713,
    subject: "Government",
    question: "The doctrine of Separation of Powers is primarily designed to prevent:",
    options: [
      { key: "A", text: "Excessive speed in legislative debate" },
      { key: "B", text: "Tyranny and arbitrary exercise of government power" },
      { key: "C", text: "Civil service strikes" },
      { key: "D", text: "Judicial review of administrative decisions" }
    ],
    correct: "B",
    explanation: "Formulated by Baron de Montesquieu, separation of powers into Executive, Legislature, and Judiciary ensures checks and balances to prevent dictatorship, tyranny, and arbitrary rule.",
    trapWarning: "Montesquieu argued that when the legislative and executive powers are united in the same person, there can be no liberty.",
    hint: "Montesquieu: Prevents tyranny through checks and balances.",
    year: "JAMB 2023 Past Question",
    topic: "Political Concepts & Theories"
  },
  {
    id: 714,
    subject: "Government",
    question: "Under the 1999 Constitution of Nigeria, the power to create new local government areas lies with the:",
    options: [
      { key: "A", text: "President of the Federal Republic" },
      { key: "B", text: "State House of Assembly, subject to National Assembly constitutional listing" },
      { key: "C", text: "Federal Executive Council" },
      { key: "D", text: "Local Government Chairman" }
    ],
    correct: "B",
    explanation: "Section 8(3) and (4) gives State Houses of Assembly the power to create local government councils, which must then be transmitted to the National Assembly to amend Section 3 Part I of the First Schedule.",
    trapWarning: "State assemblies can pass the creation bill, but the LGA remains a Local Council Development Area (LCDA) until listed by the National Assembly.",
    hint: "State Assembly creates; National Assembly lists in the Constitution.",
    year: "JAMB 2024 Past Question",
    topic: "Nigerian Federalism & Local Government"
  }
];

export const ADDITIONAL_LITERATURE_QUESTIONS: CbtQuestion[] = [
  {
    id: 812,
    subject: "Literature",
    question: "A speech delivered by an actor alone on stage that reveals their innermost thoughts to the audience is a:",
    options: [
      { key: "A", text: "Monologue" },
      { key: "B", text: "Soliloquy" },
      { key: "C", text: "Aside" },
      { key: "D", text: "Prologue" }
    ],
    correct: "B",
    explanation: "A soliloquy is delivered when the speaker is alone on stage to reveal inner psychological thoughts. A monologue can be delivered to other silent characters.",
    trapWarning: "Do not confuse soliloquy (alone on stage) with monologue (long speech to others) or aside (short comment overheard only by audience).",
    hint: "Solitary speaker expressing thoughts = Soliloquy (e.g., Hamlet's 'To be or not to be').",
    year: "JAMB 2024 Past Question",
    topic: "Literary Devices & Dramatic Terms"
  },
  {
    id: 813,
    subject: "Literature",
    question: "\"The wind wailed mournfully through the deserted corridors.\" The dominant literary device here is:",
    options: [
      { key: "A", text: "Hyperbole" },
      { key: "B", text: "Personification" },
      { key: "C", text: "Euphemism" },
      { key: "D", text: "Synecdoche" }
    ],
    correct: "B",
    explanation: "Personification attributes human qualities (wailing mournfully) to an inanimate, natural phenomenon (the wind).",
    trapWarning: "The wind is given the human ability to wail and mourn.",
    hint: "Giving human emotional traits to nature = Personification.",
    year: "JAMB 2023 Past Question",
    topic: "Figures of Speech"
  }
];

export const ADDITIONAL_NOVEL_QUESTIONS: CbtQuestion[] = [
  {
    id: 914,
    subject: "Novel",
    question: "In \"The Lekki Headmaster\", how does Mr. Sylvester Oludare respond when influential parents demand that their children be allowed to use smartphones in school?",
    options: [
      { key: "A", text: "He yields to the board's commercial demands" },
      { key: "B", text: "He institutes a strict digital detox policy to protect academic focus" },
      { key: "C", text: "He expels all board members" },
      { key: "D", text: "He allows smartphones only for video games" }
    ],
    correct: "B",
    explanation: "Mr. Sylvester firmly resists elite parental pressure, enforcing a disciplined digital policy that prioritizes student focus, study habits, and authentic intellectual growth over smartphone distractions.",
    trapWarning: "Sylvester represents moral integrity and principled school administration against commercial compromise.",
    hint: "Sylvester stands for discipline and moral boundaries.",
    year: "JAMB 2025/2026 Prescribed Novel",
    topic: "The Lekki Headmaster - Themes"
  },
  {
    id: 915,
    subject: "Novel",
    question: "In \"The Life Changer\", what major consequence followed Salma’s entanglement with Kabir at the examination malpractice committee?",
    options: [
      { key: "A", text: "She was awarded an academic scholarship" },
      { key: "B", text: "She was swindled of her money and faced university expulsion" },
      { key: "C", text: "She became a committee member" },
      { key: "D", text: "She transferred to Oxford University" }
    ],
    correct: "B",
    explanation: "Kabir swindled Salma of the bribe money at a gambling house, offering zero assistance. Salma was subsequently expelled from Lafayette University for exam malpractice.",
    trapWarning: "Kabir was a swindler; bribery failed completely to protect Salma from expulsion.",
    hint: "Kabir squandered the money, and Salma faced total expulsion.",
    year: "JAMB Prescribed Classic",
    topic: "The Life Changer - Plot"
  },
  {
    id: 916,
    subject: "Novel",
    question: "In \"The Lekki Headmaster\", what was the immediate catalyst for Demilade Adeleke’s change of attitude towards his studies?",
    options: [
      { key: "A", text: "He was suspended from the soccer team" },
      { key: "B", text: "Mr. Sylvester helped him uncover his natural talent for mathematics and Olympiad problem solving" },
      { key: "C", text: "His parents bought him a new laptop" },
      { key: "D", text: "He relocated to another country" }
    ],
    correct: "B",
    explanation: "Through patient, firm mentorship and personalized academic intervention, Mr. Sylvester guided Demilade away from frivolous peer pursuits and directed his intellect toward competitive Mathematics Olympiad preparation.",
    trapWarning: "Sylvester used mentorship and academic motivation, not material indulgence.",
    hint: "Sylvester channelled his talent into Mathematics Olympiad.",
    year: "JAMB 2025/2026 Prescribed Novel",
    topic: "The Lekki Headmaster - Character Development"
  },
  {
    id: 917,
    subject: "Novel",
    question: "In \"The Life Changer\", how did Ummi’s father react when she was granted admission into the university?",
    options: [
      { key: "A", text: "He refused to sponsor her" },
      { key: "B", text: "He agreed on the condition that she married before graduating" },
      { key: "C", text: "He celebrated and immediately paid for her hostel accommodation" },
      { key: "D", text: "He required her to study exclusively from home" }
    ],
    correct: "B",
    explanation: "Ummi recounts that her conservative community expected women to marry early; her father only conceded to her tertiary education on the condition that she married as soon as a suitable suitor proposed.",
    trapWarning: "Cultural expectations regarding female education in the novel form a critical theme.",
    hint: "Father's condition was marriage before graduation.",
    year: "JAMB Prescribed Classic",
    topic: "The Life Changer - Cultural Themes"
  }
];
