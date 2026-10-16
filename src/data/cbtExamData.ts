import { ADDITIONAL_ENGLISH_QUESTIONS } from './questions/englishQuestions';
import { ADDITIONAL_MATH_QUESTIONS } from './questions/mathematicsQuestions';
import {
  ADDITIONAL_BIOLOGY_QUESTIONS,
  ADDITIONAL_CHEMISTRY_QUESTIONS,
  ADDITIONAL_PHYSICS_QUESTIONS,
} from './questions/scienceQuestions';
import {
  ADDITIONAL_ECONOMICS_QUESTIONS,
  ADDITIONAL_GOVERNMENT_QUESTIONS,
  ADDITIONAL_LITERATURE_QUESTIONS,
  ADDITIONAL_NOVEL_QUESTIONS,
} from './questions/artsAndCommercialQuestions';
import { MULTI_EXAM_PAST_QUESTIONS } from './questions/multiExamPastQuestions';

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
  examBody?: 'JAMB' | 'WAEC' | 'NECO' | 'Post-UTME' | string;
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

export const CBT_EXAM_BODIES = [
  'All Exams',
  'JAMB UTME',
  'WAEC SSCE',
  'NECO SSCE',
  'Post-UTME',
] as const;

export type CbtExamBody = (typeof CBT_EXAM_BODIES)[number];

export const CBT_EXAM_YEARS = [
  'All Years',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
] as const;

export type CbtExamYear = (typeof CBT_EXAM_YEARS)[number];

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
    description: 'The Lekki Headmaster, The Life Changer & Compulsory UTME Literature',
  },
];

export const CBT_QUESTIONS_BANK: Record<string, CbtQuestion[]> = {
  "English": [
    {
      "id": 101,
      "subject": "English",
      "question": "Choose the word that has the SAME vowel sound as the underlined sound in \"C_ou_rt\":",
      "options": [
        {
          "key": "A",
          "text": "Hurt"
        },
        {
          "key": "B",
          "text": "Port"
        },
        {
          "key": "C",
          "text": "Curse"
        },
        {
          "key": "D",
          "text": "Shut"
        }
      ],
      "correct": "B",
      "explanation": "Court contains the long open back rounded vowel /ɔː/, which corresponds to Port /pɔːt/. Hurt and Curse have the central vowel /ɜː/.",
      "trapWarning": "JAMB frequently tests /ɔː/ versus /ɜː/. Do not assume letters \"ou\" produce the \"ur\" sound.",
      "hint": "Notice that \"Court\" rhymes with \"Sport\" and \"Port\", not \"Bird\".",
      "year": "JAMB 2024 Past Question",
      "topic": "Oral English (Vowel Sounds)"
    },
    {
      "id": 102,
      "subject": "English",
      "question": "Select the option OPPOSITE in meaning to the underlined word: \"The commissioner gave an _equivocal_ response regarding the tertiary grant allocation.\"",
      "options": [
        {
          "key": "A",
          "text": "Ambiguous"
        },
        {
          "key": "B",
          "text": "Clear and unambiguous"
        },
        {
          "key": "C",
          "text": "Diplomatic"
        },
        {
          "key": "D",
          "text": "Hesitant"
        }
      ],
      "correct": "B",
      "explanation": "Equivocal means ambiguous, open to multiple interpretations or vague. The direct antonym is clear and unambiguous.",
      "trapWarning": "Option A (Ambiguous) is a synonym, not an antonym. Always verify the question instruction (NEAREST vs OPPOSITE).",
      "hint": "Prefix \"equi-\" + \"vocal\" suggests speaking with double meaning.",
      "year": "JAMB 2024 Past Question",
      "topic": "Antonyms / Lexis"
    },
    {
      "id": 103,
      "subject": "English",
      "question": "From the words provided, select the word that has the primary stress on the SECOND syllable:",
      "options": [
        {
          "key": "A",
          "text": "Photograph"
        },
        {
          "key": "B",
          "text": "Photographer"
        },
        {
          "key": "C",
          "text": "Photographic"
        },
        {
          "key": "D",
          "text": "Photocopy"
        }
      ],
      "correct": "B",
      "explanation": "Photographer is stressed on the second syllable: pho-TO-graph-er. Photograph is stressed on the first syllable (PHO-to-graph), and Photographic on the third (pho-to-GRA-phic).",
      "trapWarning": "Suffix shifts: adding \"-er\" to photograph shifts stress to the second syllable, while \"-ic\" shifts it to the penultimate syllable.",
      "hint": "Pronounce pho-TOG-ra-pher naturally.",
      "year": "JAMB 2024 Past Question",
      "topic": "Stress Placement"
    },
    {
      "id": 104,
      "subject": "English",
      "question": "Fill in the blank: \"Neither the registrar nor the candidates _______ pleased with the revised timetable.\"",
      "options": [
        {
          "key": "A",
          "text": "was"
        },
        {
          "key": "B",
          "text": "were"
        },
        {
          "key": "C",
          "text": "is"
        },
        {
          "key": "D",
          "text": "are"
        }
      ],
      "correct": "B",
      "explanation": "In the \"neither... nor\" correlative construction, the verb agrees with the closer subject (rule of proximity). Here, \"candidates\" is plural and past tense context applies, so \"were\" is correct.",
      "trapWarning": "Do not automatically match the first subject \"registrar\". Look at the subject nearest to the verb (\"candidates\").",
      "hint": "Proximity rule: the plural noun \"candidates\" sits right next to the blank.",
      "year": "JAMB 2024 Past Question",
      "topic": "Concord (Proximity)"
    },
    {
      "id": 105,
      "subject": "English",
      "question": "Choose the option NEAREST in meaning to the underlined phrase: \"The legal counsel had to _bite the bullet_ and accept the settlement terms.\"",
      "options": [
        {
          "key": "A",
          "text": "Celebrate a historic victory"
        },
        {
          "key": "B",
          "text": "Face an inevitable unpleasant situation with courage"
        },
        {
          "key": "C",
          "text": "Reject the compromise outright"
        },
        {
          "key": "D",
          "text": "Postpone the proceeding indefinitely"
        }
      ],
      "correct": "B",
      "explanation": "To \"bite the bullet\" is an English idiom meaning to force oneself to endure a painful, difficult, or unpleasant situation that cannot be avoided.",
      "trapWarning": "Do not interpret idioms literally. There is no physical ammunition or weapon involved.",
      "hint": "Originates from soldiers biting lead bullets during surgery without anesthesia.",
      "year": "JAMB 2024 Past Question",
      "topic": "Idiomatic Expressions"
    },
    {
      "id": 106,
      "subject": "English",
      "question": "Choose the word that has the SAME consonant sound as the underlined letter(s) in \"Vi_si_on\":",
      "options": [
        {
          "key": "A",
          "text": "Mission"
        },
        {
          "key": "B",
          "text": "Measure"
        },
        {
          "key": "C",
          "text": "Station"
        },
        {
          "key": "D",
          "text": "Cheer"
        }
      ],
      "correct": "B",
      "explanation": "Vision contains the voiced post-alveolar fricative /ʒ/. Measure also contains the same voiced fricative /ʒ/ in the medial position.",
      "trapWarning": "Mission and Station have the voiceless fricative /ʃ/. Do not confuse voiced /ʒ/ with voiceless /ʃ/.",
      "hint": "Feel the vocal cord vibration in \"vi-zh-on\" and \"mea-zh-ure\".",
      "year": "JAMB 2023 Past Question",
      "topic": "Oral English (Consonant Sounds)"
    },
    {
      "id": 107,
      "subject": "English",
      "question": "Identify the sentence with the correct subjunctive mood usage:",
      "options": [
        {
          "key": "A",
          "text": "The Dean insisted that the student was present at the trial."
        },
        {
          "key": "B",
          "text": "The Dean insisted that the student be present at the trial."
        },
        {
          "key": "C",
          "text": "The Dean insisted that the student is present at the trial."
        },
        {
          "key": "D",
          "text": "The Dean insisted that the student will be present at the trial."
        }
      ],
      "correct": "B",
      "explanation": "Mandative subjunctive clauses following verbs like \"insist\", \"demand\", \"recommend\", or \"require\" use the base form of the verb (\"be\", \"go\", \"attend\"), regardless of subject number or tense.",
      "trapWarning": "Many candidates incorrectly choose \"was\" because the main clause verb \"insisted\" is past tense.",
      "hint": "Subjunctive uses bare infinitive (\"be\") without s or tense inflection.",
      "year": "JAMB 2023 Past Question",
      "topic": "Subjunctive Mood"
    },
    {
      "id": 108,
      "subject": "English",
      "question": "Select the option OPPOSITE in meaning to the underlined word: \"Her _meticulous_ approach to laboratory analysis prevented experimental errors.\"",
      "options": [
        {
          "key": "A",
          "text": "Painstaking"
        },
        {
          "key": "B",
          "text": "Careless and sloppy"
        },
        {
          "key": "C",
          "text": "Methodical"
        },
        {
          "key": "D",
          "text": "Scrupulous"
        }
      ],
      "correct": "B",
      "explanation": "Meticulous means showing great attention to detail, very careful and precise. The opposite is careless, sloppy, or negligent.",
      "trapWarning": "Painstaking, Methodical, and Scrupulous are all synonyms of meticulous.",
      "hint": "Meticulous = very careful; opposite = reckless/careless.",
      "year": "JAMB 2023 Past Question",
      "topic": "Antonyms"
    },
    {
      "id": 109,
      "subject": "English",
      "question": "Choose the correct preposition: \"The candidate was acquitted _______ all charges of examination misconduct.\"",
      "options": [
        {
          "key": "A",
          "text": "from"
        },
        {
          "key": "B",
          "text": "of"
        },
        {
          "key": "C",
          "text": "against"
        },
        {
          "key": "D",
          "text": "with"
        }
      ],
      "correct": "B",
      "explanation": "The verb \"acquit\" takes the preposition \"of\" when referring to accusations or charges: \"acquitted of all charges\".",
      "trapWarning": "Candidates often say \"acquitted from\" due to mother-tongue interference. Standard English uses \"acquit of\".",
      "hint": "Think \"acquit of\" just like \"convict of\".",
      "year": "JAMB 2023 Past Question",
      "topic": "Prepositional Concord"
    },
    {
      "id": 110,
      "subject": "English",
      "question": "Which of the following words contains a SILENT letter?",
      "options": [
        {
          "key": "A",
          "text": "Subtle"
        },
        {
          "key": "B",
          "text": "Public"
        },
        {
          "key": "C",
          "text": "Noble"
        },
        {
          "key": "D",
          "text": "Rumble"
        }
      ],
      "correct": "A",
      "explanation": "In the word \"Subtle\" (/ˈsʌt.əl/), the letter \"b\" is completely silent. In Public, Noble, and Rumble, all written letters correspond to spoken sounds.",
      "trapWarning": "Words with silent b after m or before t (doubt, debt, subtle, tomb, comb) are standard JAMB testing traps.",
      "hint": "Pronounced \"sut-tl\" without pronouncing the \"b\".",
      "year": "JAMB 2022 Past Question",
      "topic": "Oral English (Silent Letters)"
    },
    {
      "id": 111,
      "subject": "English",
      "question": "Choose the option NEAREST in meaning to: \"The senator’s speech was marked by _hyperbole_.\"",
      "options": [
        {
          "key": "A",
          "text": "Exaggeration"
        },
        {
          "key": "B",
          "text": "Understatement"
        },
        {
          "key": "C",
          "text": "Deception"
        },
        {
          "key": "D",
          "text": "Brevity"
        }
      ],
      "correct": "A",
      "explanation": "Hyperbole is a figure of speech involving deliberate and obvious exaggeration not intended to be taken literally.",
      "trapWarning": "Do not confuse hyperbole (exaggeration) with litotes or meiosis (understatement).",
      "hint": "Hyper = over / beyond the limit.",
      "year": "JAMB 2022 Past Question",
      "topic": "Synonyms & Figures of Speech"
    },
    {
      "id": 112,
      "subject": "English",
      "question": "Fill in the blank: \"The committee, together with its advisors, _______ reviewing the draft constitution.\"",
      "options": [
        {
          "key": "A",
          "text": "are"
        },
        {
          "key": "B",
          "text": "is"
        },
        {
          "key": "C",
          "text": "were"
        },
        {
          "key": "D",
          "text": "have been"
        }
      ],
      "correct": "B",
      "explanation": "Phrases such as \"together with\", \"as well as\", \"along with\", and \"in addition to\" are parenthetical and do not compound the grammatical subject. The main subject is the singular noun \"committee\".",
      "trapWarning": "Do not treat \"together with\" as equivalent to \"and\". The verb must agree solely with the primary subject.",
      "hint": "Isolate \"The committee [ignore together with its advisors] is reviewing...\".",
      "year": "JAMB 2022 Past Question",
      "topic": "Grammatical Concord"
    },
    {
      "id": 113,
      "subject": "English",
      "question": "Choose the word that rhymes with \"Key\":",
      "options": [
        {
          "key": "A",
          "text": "Quay"
        },
        {
          "key": "B",
          "text": "Bay"
        },
        {
          "key": "C",
          "text": "Day"
        },
        {
          "key": "D",
          "text": "May"
        }
      ],
      "correct": "A",
      "explanation": "Quay is pronounced /kiː/, exactly matching the pronunciation of \"key\" /kiː/. Bay, Day, and May end in the diphthong /eɪ/.",
      "trapWarning": "Many students mispronounce \"quay\" as \"kway\". It is a classic JAMB homophone trap.",
      "hint": "A quay (harbour dock) sounds identical to the key that opens a padlock.",
      "year": "JAMB 2021 Past Question",
      "topic": "Rhyme & Homophones"
    },
    {
      "id": 114,
      "subject": "English",
      "question": "Select the option that best explains the underlined idiom: \"The proposal turned out to be a _red herring_.\"",
      "options": [
        {
          "key": "A",
          "text": "A completely verified financial breakthrough"
        },
        {
          "key": "B",
          "text": "A misleading clue designed to divert attention from the real issue"
        },
        {
          "key": "C",
          "text": "An urgent emergency requiring prompt action"
        },
        {
          "key": "D",
          "text": "A unanimous decision among stakeholders"
        }
      ],
      "correct": "B",
      "explanation": "A \"red herring\" is something that misleads or distracts from a relevant or important question.",
      "trapWarning": "No aquatic fish or colour red is intended. It represents a diversionary tactic.",
      "hint": "Used in detective novels to point investigators to the wrong suspect.",
      "year": "JAMB 2021 Past Question",
      "topic": "Idioms & Figures of Speech"
    },
    {
      "id": 115,
      "subject": "English",
      "question": "Fill in the blank with the appropriate tag: \"She hardly ever arrives late to lectures, _______?\"",
      "options": [
        {
          "key": "A",
          "text": "doesn't she"
        },
        {
          "key": "B",
          "text": "does she"
        },
        {
          "key": "C",
          "text": "isn't she"
        },
        {
          "key": "D",
          "text": "is she"
        }
      ],
      "correct": "B",
      "explanation": "Adverbs like \"hardly\", \"scarcely\", \"barely\", and \"seldom\" impart a negative meaning to the main clause. Therefore, the question tag must be affirmative (\"does she?\").",
      "trapWarning": "Candidates see no explicit \"not\" in the statement and incorrectly attach a negative tag.",
      "hint": "Hardly = almost never (negative); tag must be positive.",
      "year": "JAMB 2021 Past Question",
      "topic": "Question Tags"
    },
    {
      "id": 116,
      "subject": "English",
      "question": "Choose the word that has the SAME vowel sound as \"Plumb\":",
      "options": [
        {
          "key": "A",
          "text": "Come"
        },
        {
          "key": "B",
          "text": "Tomb"
        },
        {
          "key": "C",
          "text": "Comb"
        },
        {
          "key": "D",
          "text": "Womb"
        }
      ],
      "correct": "A",
      "explanation": "Plumb contains the short open-mid back unrounded vowel /ʌ/. Come /kʌm/ has the same /ʌ/ sound. Tomb and Womb have /uː/, and Comb has /əʊ/.",
      "trapWarning": "Spelling with \"-omb\" does not mean identical pronunciation. Notice Plumb rhymes with Crumb and has /ʌ/.",
      "hint": "Plumb and Come both share the short \"uh\" vowel sound.",
      "year": "JAMB 2020 Past Question",
      "topic": "Oral English (Vowel Sounds)"
    },
    {
      "id": 117,
      "subject": "English",
      "question": "Select the correct conditional sentence construction: \"If I _______ you, I would register for the CBT mock examination immediately.\"",
      "options": [
        {
          "key": "A",
          "text": "was"
        },
        {
          "key": "B",
          "text": "am"
        },
        {
          "key": "C",
          "text": "were"
        },
        {
          "key": "D",
          "text": "have been"
        }
      ],
      "correct": "C",
      "explanation": "In second conditional (unreal or hypothetical condition in the present), the subjunctive \"were\" is used for all persons (\"If I were you\", \"If he were here\").",
      "trapWarning": "In formal standard English, \"was\" is incorrect in hypothetical conditions with \"I\" or \"he\".",
      "hint": "Hypothetical advice formula: \"If I were you...\".",
      "year": "JAMB 2020 Past Question",
      "topic": "Conditionals & Mood"
    },
    {
      "id": 118,
      "subject": "English",
      "question": "Choose the word that has the SAME consonant sound as the underlined sound in \"Bou_gh_t\":",
      "options": [
        {
          "key": "A",
          "text": "Rough"
        },
        {
          "key": "B",
          "text": "Tough"
        },
        {
          "key": "C",
          "text": "Thaw"
        },
        {
          "key": "D",
          "text": "Laugh"
        }
      ],
      "correct": "C",
      "explanation": "In \"Bought\" /bɔːt/, the letters \"gh\" are silent, meaning there is no /f/ sound. Thaw /θɔː/ has the same vowel sound and zero /f/ sound. Rough, Tough, and Laugh all end with the /f/ consonant.",
      "trapWarning": "Many candidates assume \"gh\" always sounds like /f/. In bought, thought, and caught, \"gh\" is completely silent.",
      "hint": "\"Bought\" has silent \"gh\", unlike \"Rough\" which ends in /f/.",
      "year": "JAMB 2022 Past Question",
      "topic": "Oral English (Silent Letters)"
    },
    {
      "id": 119,
      "subject": "English",
      "question": "Select the option that best interprets: \"The principal turned a deaf ear to the students’ petitions.\"",
      "options": [
        {
          "key": "A",
          "text": "The principal suffered a medical ear impairment"
        },
        {
          "key": "B",
          "text": "The principal deliberately refused to listen or take action"
        },
        {
          "key": "C",
          "text": "The principal granted all requested concessions"
        },
        {
          "key": "D",
          "text": "The principal referred the case to the police"
        }
      ],
      "correct": "B",
      "explanation": "To \"turn a deaf ear\" is an idiom meaning to deliberately refuse to listen, disregard, or ignore a request or petition.",
      "trapWarning": "Do not choose literal medical options when encountering idiomatic expressions.",
      "hint": "Deaf ear = ignored completely.",
      "year": "JAMB 2022 Past Question",
      "topic": "Idioms & Interpretation"
    },
    {
      "id": 120,
      "subject": "English",
      "question": "Choose the correctly punctuated sentence:",
      "options": [
        {
          "key": "A",
          "text": "The vice-chancellor said, \"Honesty is the bedrock of academic excellence.\""
        },
        {
          "key": "B",
          "text": "The vice-chancellor said \"Honesty is the bedrock of academic excellence\"."
        },
        {
          "key": "C",
          "text": "The vice chancellor said, \"Honesty is the bedrock of academic excellence\"."
        },
        {
          "key": "D",
          "text": "The vice-chancellor said; \"Honesty is the bedrock of academic excellence\"!"
        }
      ],
      "correct": "A",
      "explanation": "Direct speech requires a comma before the opening quotation mark, capital letter inside the quote, and punctuation (full stop) INSIDE the closing quotation mark.",
      "trapWarning": "In standard British/Nigerian English exam conventions, the period goes inside the closing quotation marks in direct speech.",
      "hint": "Comma before quote; period inside quote.",
      "year": "JAMB 2021 Past Question",
      "topic": "Punctuation & Direct Speech"
    },
    {
      "id": 121,
      "subject": "English",
      "question": "Choose the word that has the primary stress on the FIRST syllable:",
      "options": [
        {
          "key": "A",
          "text": "Educate"
        },
        {
          "key": "B",
          "text": "Explain"
        },
        {
          "key": "C",
          "text": "Resign"
        },
        {
          "key": "D",
          "text": "Confirm"
        }
      ],
      "correct": "A",
      "explanation": "E-du-cate has its primary stress on the first syllable (E-du-cate). Explain, Resign, and Confirm have primary stress on the second syllable.",
      "trapWarning": "Three-syllable verbs ending in -ate usually have stress on the antepenultimate (first) syllable.",
      "hint": "E-du-cate: first syllable is stressed.",
      "year": "JAMB 2021 Past Question",
      "topic": "Stress Placement"
    },
    {
      "id": 122,
      "subject": "English",
      "question": "Fill in the blank: \"No sooner had the invigilator entered the hall _______ the bell rang.\"",
      "options": [
        {
          "key": "A",
          "text": "when"
        },
        {
          "key": "B",
          "text": "than"
        },
        {
          "key": "C",
          "text": "then"
        },
        {
          "key": "D",
          "text": "that"
        }
      ],
      "correct": "B",
      "explanation": "\"No sooner\" is followed by the comparative conjunction \"than\" (No sooner... than). \"Hardly\" and \"Scarcely\" are followed by \"when\".",
      "trapWarning": "Do not confuse \"No sooner... than\" with \"Hardly/Scarcely... when\". Pairing \"No sooner\" with \"when\" is a major error.",
      "hint": "No sooner has \"-er\" (comparative) so it pairs with \"than\".",
      "year": "JAMB 2020 Past Question",
      "topic": "Correlative Conjunctions"
    },
    {
      "id": 123,
      "subject": "English",
      "question": "Choose the option OPPOSITE in meaning to the underlined word: \"The minister’s speech was very _terse_.\"",
      "options": [
        {
          "key": "A",
          "text": "Concise"
        },
        {
          "key": "B",
          "text": "Verbose and lengthy"
        },
        {
          "key": "C",
          "text": "Brief"
        },
        {
          "key": "D",
          "text": "Sharp"
        }
      ],
      "correct": "B",
      "explanation": "Terse means brief, concise, and using very few words (often abruptly). The direct antonym is verbose, wordy, or lengthy.",
      "trapWarning": "Concise and brief are synonyms of terse. Remember you are finding the OPPOSITE.",
      "hint": "Terse = brief; opposite = wordy/verbose.",
      "year": "JAMB 2020 Past Question",
      "topic": "Antonyms"
    }
  ],
  "Mathematics": [
    {
      "id": 201,
      "subject": "Mathematics",
      "question": "Solve for x: log₂ (x + 3) + log₂ (x - 1) = 5.",
      "options": [
        {
          "key": "A",
          "text": "x = 5"
        },
        {
          "key": "B",
          "text": "x = -7"
        },
        {
          "key": "C",
          "text": "x = 5 or x = -7"
        },
        {
          "key": "D",
          "text": "x = 7"
        }
      ],
      "correct": "A",
      "explanation": "By product rule: log₂((x+3)(x-1)) = 5 => (x+3)(x-1) = 2⁵ = 32. x² + 2x - 3 - 32 = 0 => x² + 2x - 35 = 0 => (x+7)(x-5) = 0. Since log argument must be positive, x = 5 is the only valid real root.",
      "trapWarning": "Extraneous root trap: x = -7 makes log arguments negative, which is undefined in real logarithms.",
      "hint": "Remember that log of a negative number does not exist.",
      "year": "JAMB 2024 Past Question",
      "topic": "Logarithms & Quadratic Equations"
    },
    {
      "id": 202,
      "subject": "Mathematics",
      "question": "Evaluate the derivative of y = (3x² - 5)⁴ with respect to x:",
      "options": [
        {
          "key": "A",
          "text": "24x (3x² - 5)³"
        },
        {
          "key": "B",
          "text": "12x (3x² - 5)³"
        },
        {
          "key": "C",
          "text": "4 (3x² - 5)³"
        },
        {
          "key": "D",
          "text": "6x (3x² - 5)⁴"
        }
      ],
      "correct": "A",
      "explanation": "Using the Chain Rule dy/dx = n(u)^(n-1) * (du/dx): dy/dx = 4(3x² - 5)³ * (6x) = 24x(3x² - 5)³.",
      "trapWarning": "Forgetting to differentiate the inner function (6x) is the most frequent calculus error.",
      "hint": "Multiply outer power derivative by inner function derivative.",
      "year": "JAMB 2024 Past Question",
      "topic": "Calculus (Chain Rule)"
    },
    {
      "id": 203,
      "subject": "Mathematics",
      "question": "The sum of the first n terms of an Arithmetic Progression (A.P.) is given by Sn = 2n² + 3n. Find the 6th term (T₆):",
      "options": [
        {
          "key": "A",
          "text": "25"
        },
        {
          "key": "B",
          "text": "23"
        },
        {
          "key": "C",
          "text": "90"
        },
        {
          "key": "D",
          "text": "65"
        }
      ],
      "correct": "A",
      "explanation": "T₆ = S₆ - S₅. S₆ = 2(6)² + 3(6) = 72 + 18 = 90. S₅ = 2(5)² + 3(5) = 50 + 15 = 65. Therefore T₆ = 90 - 65 = 25.",
      "trapWarning": "Do not simply plug n = 6 into Sn; Sn gives the sum of all 6 terms, not the 6th term itself.",
      "hint": "Formula: Tn = Sn - Sn-1.",
      "year": "JAMB 2024 Past Question",
      "topic": "Sequences & Series (AP)"
    },
    {
      "id": 204,
      "subject": "Mathematics",
      "question": "Find the determinant of the 2x2 matrix M = [[4, 2], [3, 5]]:",
      "options": [
        {
          "key": "A",
          "text": "14"
        },
        {
          "key": "B",
          "text": "26"
        },
        {
          "key": "C",
          "text": "10"
        },
        {
          "key": "D",
          "text": "-14"
        }
      ],
      "correct": "A",
      "explanation": "Det(M) = ad - bc = (4 * 5) - (2 * 3) = 20 - 6 = 14.",
      "trapWarning": "Do not add the products; determinant is leading diagonal product MINUS trailing diagonal product.",
      "hint": "Cross-multiply: (4)(5) - (2)(3).",
      "year": "JAMB 2024 Past Question",
      "topic": "Matrices & Determinants"
    },
    {
      "id": 205,
      "subject": "Mathematics",
      "question": "If the quadratic equation 2x² - kx + 8 = 0 has equal roots, find the possible values of k:",
      "options": [
        {
          "key": "A",
          "text": "± 8"
        },
        {
          "key": "B",
          "text": "± 4"
        },
        {
          "key": "C",
          "text": "± 16"
        },
        {
          "key": "D",
          "text": "± 64"
        }
      ],
      "correct": "A",
      "explanation": "Equal roots condition: Discriminant Δ = b² - 4ac = 0. (-k)² - 4(2)(8) = 0 => k² - 64 = 0 => k² = 64 => k = ±8.",
      "trapWarning": "Do not forget the negative solution; quadratic equations with equal roots yield both positive and negative values of k.",
      "hint": "b² = 4ac => k² = 4 * 2 * 8 = 64.",
      "year": "JAMB 2023 Past Question",
      "topic": "Quadratic Equations (Discriminant)"
    },
    {
      "id": 206,
      "subject": "Mathematics",
      "question": "Evaluate the definite integral ∫ from 1 to 3 of (3x² - 2x + 1) dx:",
      "options": [
        {
          "key": "A",
          "text": "20"
        },
        {
          "key": "B",
          "text": "22"
        },
        {
          "key": "C",
          "text": "18"
        },
        {
          "key": "D",
          "text": "26"
        }
      ],
      "correct": "A",
      "explanation": "Integral = [x³ - x² + x] from 1 to 3. Upper limit: (3³ - 3² + 3) = (27 - 9 + 3) = 21. Lower limit: (1³ - 1² + 1) = (1 - 1 + 1) = 1. Result = 21 - 1 = 20.",
      "trapWarning": "Always evaluate and subtract the lower limit carefully. Do not assume the lower limit is zero.",
      "hint": "[x³ - x² + x] evaluated at 3 minus evaluated at 1.",
      "year": "JAMB 2023 Past Question",
      "topic": "Calculus (Definite Integration)"
    },
    {
      "id": 207,
      "subject": "Mathematics",
      "question": "In how many different ways can the letters of the word \"BENIN\" be arranged?",
      "options": [
        {
          "key": "A",
          "text": "120"
        },
        {
          "key": "B",
          "text": "60"
        },
        {
          "key": "C",
          "text": "24"
        },
        {
          "key": "D",
          "text": "30"
        }
      ],
      "correct": "B",
      "explanation": "The word \"BENIN\" has 5 letters with the letter \"N\" repeated 2 times. Total arrangements = 5! / 2! = 120 / 2 = 60.",
      "trapWarning": "Always divide by the factorial of repeated letters; failing to divide gives 120 (Option A).",
      "hint": "Total letters factorial divided by repeated letter factorial.",
      "year": "JAMB 2023 Past Question",
      "topic": "Permutations & Combinations"
    },
    {
      "id": 208,
      "subject": "Mathematics",
      "question": "Simplify the surd expression: (3√2 + 2√3) / (3√2 - 2√3):",
      "options": [
        {
          "key": "A",
          "text": "5 + 2√6"
        },
        {
          "key": "B",
          "text": "5 - 2√6"
        },
        {
          "key": "C",
          "text": "3 + √6"
        },
        {
          "key": "D",
          "text": "6 + √6"
        }
      ],
      "correct": "A",
      "explanation": "Rationalize the denominator by multiplying top and bottom by conjugate (3√2 + 2√3): Numerator = (3√2 + 2√3)² = 18 + 12 + 12√6 = 30 + 12√6. Denominator = (3√2)² - (2√3)² = 18 - 12 = 6. Result = (30 + 12√6)/6 = 5 + 2√6.",
      "trapWarning": "Denominator is difference of squares: (a-b)(a+b) = a² - b².",
      "hint": "Multiply numerator and denominator by conjugate of denominator.",
      "year": "JAMB 2022 Past Question",
      "topic": "Surds & Rationalisation"
    },
    {
      "id": 209,
      "subject": "Mathematics",
      "question": "Two fair dice are thrown simultaneously. What is the probability of obtaining a total sum of 8?",
      "options": [
        {
          "key": "A",
          "text": "5/36"
        },
        {
          "key": "B",
          "text": "1/6"
        },
        {
          "key": "C",
          "text": "7/36"
        },
        {
          "key": "D",
          "text": "1/9"
        }
      ],
      "correct": "A",
      "explanation": "Total possible outcomes = 6 x 6 = 36. Favourable outcomes summing to 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes. P(Sum = 8) = 5/36.",
      "trapWarning": "(4,4) only occurs once, while (2,6) and (6,2) are two distinct pairs.",
      "hint": "List pairs: 2+6, 3+5, 4+4, 5+3, 6+2 = 5 pairs out of 36.",
      "year": "JAMB 2022 Past Question",
      "topic": "Probability"
    },
    {
      "id": 210,
      "subject": "Mathematics",
      "question": "Find the coordinates of the turning point of the curve y = 2x² - 8x + 5, and state its nature:",
      "options": [
        {
          "key": "A",
          "text": "(2, -3), Minimum"
        },
        {
          "key": "B",
          "text": "(2, -3), Maximum"
        },
        {
          "key": "C",
          "text": "(-2, 29), Minimum"
        },
        {
          "key": "D",
          "text": "(4, 5), Maximum"
        }
      ],
      "correct": "A",
      "explanation": "dy/dx = 4x - 8 = 0 => x = 2. When x = 2, y = 2(2)² - 8(2) + 5 = 8 - 16 + 5 = -3. Second derivative d²y/dx² = +4 > 0, which confirms a Minimum turning point.",
      "trapWarning": "Positive second derivative (+4) means minimum point, not maximum.",
      "hint": "d²y/dx² > 0 indicates local minimum.",
      "year": "JAMB 2021 Past Question",
      "topic": "Calculus (Maxima & Minima)"
    },
    {
      "id": 211,
      "subject": "Mathematics",
      "question": "Find the sum to infinity of the Geometric Progression (G.P.): 9, 3, 1, 1/3, ...",
      "options": [
        {
          "key": "A",
          "text": "13.5"
        },
        {
          "key": "B",
          "text": "12"
        },
        {
          "key": "C",
          "text": "15"
        },
        {
          "key": "D",
          "text": "18"
        }
      ],
      "correct": "A",
      "explanation": "First term a = 9, common ratio r = 3/9 = 1/3. Since |r| < 1, S∞ = a / (1 - r) = 9 / (1 - 1/3) = 9 / (2/3) = 9 * 3 / 2 = 27/2 = 13.5.",
      "trapWarning": "Sum to infinity formula is a/(1-r), not a/(r-1).",
      "hint": "9 divided by (1 - 1/3) = 9 / (2/3) = 13.5.",
      "year": "JAMB 2021 Past Question",
      "topic": "Sequences & Series (GP)"
    },
    {
      "id": 212,
      "subject": "Mathematics",
      "question": "If tan θ = 3/4, where θ is an acute angle, find the value of (sin θ + cos θ):",
      "options": [
        {
          "key": "A",
          "text": "7/5"
        },
        {
          "key": "B",
          "text": "5/7"
        },
        {
          "key": "C",
          "text": "1/5"
        },
        {
          "key": "D",
          "text": "12/25"
        }
      ],
      "correct": "A",
      "explanation": "From right-angled triangle with Opposite = 3 and Adjacent = 4, Hypotenuse = √(3² + 4²) = 5. sin θ = 3/5, cos θ = 4/5. sin θ + cos θ = 3/5 + 4/5 = 7/5.",
      "trapWarning": "Recognize the 3-4-5 Pythagorean triple immediately to save time in CBT.",
      "hint": "Opposite/Hypotenuse + Adjacent/Hypotenuse = (3+4)/5 = 7/5.",
      "year": "JAMB 2020 Past Question",
      "topic": "Trigonometry"
    },
    {
      "id": 213,
      "subject": "Mathematics",
      "question": "If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, calculate log₁₀ 12 without using tables:",
      "options": [
        {
          "key": "A",
          "text": "1.0791"
        },
        {
          "key": "B",
          "text": "0.7781"
        },
        {
          "key": "C",
          "text": "0.9542"
        },
        {
          "key": "D",
          "text": "1.2040"
        }
      ],
      "correct": "A",
      "explanation": "log₁₀ 12 = log₁₀ (2² * 3) = 2 log₁₀ 2 + log₁₀ 3 = 2(0.3010) + 0.4771 = 0.6020 + 0.4771 = 1.0791.",
      "trapWarning": "Express 12 as prime factors: 2² * 3. Do not add 2 and 3.",
      "hint": "2(0.3010) + 0.4771 = 1.0791.",
      "year": "JAMB 2022 Past Question",
      "topic": "Logarithms"
    },
    {
      "id": 214,
      "subject": "Mathematics",
      "question": "Find the gradient (slope) of the straight line perpendicular to the line 3x - 4y + 7 = 0:",
      "options": [
        {
          "key": "A",
          "text": "-4/3"
        },
        {
          "key": "B",
          "text": "3/4"
        },
        {
          "key": "C",
          "text": "4/3"
        },
        {
          "key": "D",
          "text": "-3/4"
        }
      ],
      "correct": "A",
      "explanation": "Rewriting 3x - 4y + 7 = 0 in y = mx + c form: 4y = 3x + 7 => y = (3/4)x + 7/4. The gradient m₁ = 3/4. For perpendicular lines, m₁ * m₂ = -1 => m₂ = -1 / (3/4) = -4/3.",
      "trapWarning": "Perpendicular gradient is negative reciprocal (-1/m).",
      "hint": "Flip 3/4 and change sign to get -4/3.",
      "year": "JAMB 2022 Past Question",
      "topic": "Coordinate Geometry"
    },
    {
      "id": 215,
      "subject": "Mathematics",
      "question": "Convert the binary number 11011₂ to base 10:",
      "options": [
        {
          "key": "A",
          "text": "27"
        },
        {
          "key": "B",
          "text": "25"
        },
        {
          "key": "C",
          "text": "29"
        },
        {
          "key": "D",
          "text": "31"
        }
      ],
      "correct": "A",
      "explanation": "1(2⁴) + 1(2³) + 0(2²) + 1(2¹) + 1(2⁰) = 16 + 8 + 0 + 2 + 1 = 27.",
      "trapWarning": "Powers start at 2⁰ from right to left: 1 + 2 + 0 + 8 + 16 = 27.",
      "hint": "16 + 8 + 2 + 1 = 27.",
      "year": "JAMB 2021 Past Question",
      "topic": "Number Bases"
    },
    {
      "id": 216,
      "subject": "Mathematics",
      "question": "Find the derivative of y = sin(3x) with respect to x:",
      "options": [
        {
          "key": "A",
          "text": "3 cos(3x)"
        },
        {
          "key": "B",
          "text": "-3 cos(3x)"
        },
        {
          "key": "C",
          "text": "cos(3x)"
        },
        {
          "key": "D",
          "text": "3 sin(3x)"
        }
      ],
      "correct": "A",
      "explanation": "By chain rule: d/dx[sin(kx)] = k cos(kx). With k = 3, dy/dx = 3 cos(3x).",
      "trapWarning": "Differentiating sin gives positive cos; differentiating cos gives negative sin.",
      "hint": "Derivative of sin(3x) is 3 cos(3x).",
      "year": "JAMB 2021 Past Question",
      "topic": "Calculus (Trigonometric Differentiation)"
    },
    {
      "id": 217,
      "subject": "Mathematics",
      "question": "Calculate the mean of the numbers: 12, 15, 18, 21, 24, 30:",
      "options": [
        {
          "key": "A",
          "text": "20"
        },
        {
          "key": "B",
          "text": "18"
        },
        {
          "key": "C",
          "text": "22"
        },
        {
          "key": "D",
          "text": "19.5"
        }
      ],
      "correct": "A",
      "explanation": "Sum = 12 + 15 + 18 + 21 + 24 + 30 = 120. Total count N = 6. Mean = 120 / 6 = 20.",
      "trapWarning": "Add accurately: (12+18=30) + (15+21+24=60) + 30 = 120 / 6 = 20.",
      "hint": "Sum is 120 divided by 6 = 20.",
      "year": "JAMB 2020 Past Question",
      "topic": "Statistics (Measures of Central Tendency)"
    },
    {
      "id": 218,
      "subject": "Mathematics",
      "question": "If A and B are mutually exclusive events with P(A) = 0.35 and P(B) = 0.45, find P(A ∪ B):",
      "options": [
        {
          "key": "A",
          "text": "0.80"
        },
        {
          "key": "B",
          "text": "0.1575"
        },
        {
          "key": "C",
          "text": "0.10"
        },
        {
          "key": "D",
          "text": "0.70"
        }
      ],
      "correct": "A",
      "explanation": "For mutually exclusive events, P(A ∩ B) = 0. Therefore, P(A ∪ B) = P(A) + P(B) = 0.35 + 0.45 = 0.80.",
      "trapWarning": "Do not multiply the probabilities; multiplication rule is for independent events, while addition is for union of mutually exclusive events.",
      "hint": "Mutually exclusive: simply add P(A) + P(B) = 0.80.",
      "year": "JAMB 2020 Past Question",
      "topic": "Probability (Addition Rule)"
    }
  ],
  "Biology": [
    {
      "id": 301,
      "subject": "Biology",
      "question": "Which of the following cellular organelles is responsible for the synthesis of adenosine triphosphate (ATP)?",
      "options": [
        {
          "key": "A",
          "text": "Ribosome"
        },
        {
          "key": "B",
          "text": "Mitochondrion"
        },
        {
          "key": "C",
          "text": "Golgi apparatus"
        },
        {
          "key": "D",
          "text": "Lysosome"
        }
      ],
      "correct": "B",
      "explanation": "The mitochondrion is known as the powerhouse of the cell because cellular respiration and oxidative phosphorylation generate ATP within its inner cristae.",
      "trapWarning": "Ribosomes synthesize proteins, not ATP. Do not confuse ATP production with protein assembly.",
      "hint": "Powerhouse of the eukaryotic cell.",
      "year": "JAMB 2024 Past Question",
      "topic": "Cell Biology (Organelles)"
    },
    {
      "id": 302,
      "subject": "Biology",
      "question": "A man with blood group AB marries a woman with blood group O. What are the possible blood groups of their biological offspring?",
      "options": [
        {
          "key": "A",
          "text": "Groups A and B only"
        },
        {
          "key": "B",
          "text": "Groups AB and O only"
        },
        {
          "key": "C",
          "text": "Group O only"
        },
        {
          "key": "D",
          "text": "Groups A, B, AB, and O"
        }
      ],
      "correct": "A",
      "explanation": "Father genotype is IᴬIᴮ and Mother is ii. The Punnett cross yields 50% Iᴬi (Blood Group A) and 50% Iᴮi (Blood Group B). Offspring can never be Group AB or Group O.",
      "trapWarning": "An AB parent can NEVER produce an O offspring with an O spouse because the AB parent always donates either Iᴬ or Iᴮ allele.",
      "hint": "Iᴬ combined with i gives A; Iᴮ combined with i gives B.",
      "year": "JAMB 2024 Past Question",
      "topic": "Genetics (ABO Blood Groups)"
    },
    {
      "id": 303,
      "subject": "Biology",
      "question": "During reflex action, what is the correct physiological pathway taken by nerve impulses?",
      "options": [
        {
          "key": "A",
          "text": "Receptor → Sensory neuron → Relay/Interneuron → Motor neuron → Effector"
        },
        {
          "key": "B",
          "text": "Effector → Motor neuron → Spinal cord → Sensory neuron → Receptor"
        },
        {
          "key": "C",
          "text": "Receptor → Motor neuron → Brain → Sensory neuron → Effector"
        },
        {
          "key": "D",
          "text": "Sensory neuron → Receptor → Relay neuron → Effector → Motor neuron"
        }
      ],
      "correct": "A",
      "explanation": "The reflex arc begins at the sensory receptor, travels along the afferent (sensory) neuron to the intermediate relay neuron in the spinal cord gray matter, and exits via the efferent (motor) neuron to trigger the effector muscle/gland.",
      "trapWarning": "Sensory precedes motor. Afferent brings stimulus in, efferent executes response out.",
      "hint": "Starts at receptor, ends at effector.",
      "year": "JAMB 2024 Past Question",
      "topic": "Nervous Coordination (Reflex Arc)"
    },
    {
      "id": 304,
      "subject": "Biology",
      "question": "In the mammalian kidney nephron, in which region does selective reabsorption of glucose, amino acids, and water primarily occur?",
      "options": [
        {
          "key": "A",
          "text": "Bowman’s capsule"
        },
        {
          "key": "B",
          "text": "Proximal convoluted tubule"
        },
        {
          "key": "C",
          "text": "Loop of Henle"
        },
        {
          "key": "D",
          "text": "Collecting duct"
        }
      ],
      "correct": "B",
      "explanation": "The proximal convoluted tubule (PCT) has microvilli and abundant mitochondria to actively reabsorb 100% of filtered glucose and amino acids, plus approximately 65-70% of water and electrolytes.",
      "trapWarning": "Ultrafiltration occurs at Bowman’s capsule; selective reabsorption occurs primarily at the PCT.",
      "hint": "Proximal = closest to glomerulus.",
      "year": "JAMB 2023 Past Question",
      "topic": "Excretory System (Nephron Physiology)"
    },
    {
      "id": 305,
      "subject": "Biology",
      "question": "Which plant hormone is primarily responsible for phototropic bending of shoot tips toward unilateral light?",
      "options": [
        {
          "key": "A",
          "text": "Auxin (Indole-3-acetic acid)"
        },
        {
          "key": "B",
          "text": "Gibberellin"
        },
        {
          "key": "C",
          "text": "Abscisic acid"
        },
        {
          "key": "D",
          "text": "Ethylene"
        }
      ],
      "correct": "A",
      "explanation": "Auxins diffuse away from light toward the shaded side of the shoot tip, stimulating greater cell elongation on the shaded side and causing the tip to curve toward the light source.",
      "trapWarning": "Auxin promotes cell elongation in shoots, but inhibits cell elongation in roots at high concentrations.",
      "hint": "Auxin migrates to the dark side.",
      "year": "JAMB 2023 Past Question",
      "topic": "Plant Physiology (Tropisms & Hormones)"
    },
    {
      "id": 306,
      "subject": "Biology",
      "question": "In an ecological pyramid of energy, what percentage of stored energy is approximately transferred from one trophic level to the next?",
      "options": [
        {
          "key": "A",
          "text": "90%"
        },
        {
          "key": "B",
          "text": "50%"
        },
        {
          "key": "C",
          "text": "10%"
        },
        {
          "key": "D",
          "text": "1%"
        }
      ],
      "correct": "C",
      "explanation": "According to Lindeman’s Ten Percent Law, only roughly 10% of the energy transferred to each trophic level is converted into new biomass; the remaining 90% is lost through respiration, heat, and excretion.",
      "trapWarning": "Candidates often confuse 90% lost with 10% transferred.",
      "hint": "Lindeman’s 10% ecological efficiency law.",
      "year": "JAMB 2023 Past Question",
      "topic": "Ecology (Energy Flow)"
    },
    {
      "id": 307,
      "subject": "Biology",
      "question": "Which of the following blood vessels carries OXYGENATED blood from the lungs back to the left atrium of the heart?",
      "options": [
        {
          "key": "A",
          "text": "Pulmonary artery"
        },
        {
          "key": "B",
          "text": "Pulmonary vein"
        },
        {
          "key": "C",
          "text": "Vena cava"
        },
        {
          "key": "D",
          "text": "Aorta"
        }
      ],
      "correct": "B",
      "explanation": "The pulmonary vein is the exception among veins: it transports oxygenated blood from the lungs into the left atrium.",
      "trapWarning": "Most veins carry deoxygenated blood, but the pulmonary vein carries oxygen-rich blood.",
      "hint": "Vein carries blood TO the heart; from lungs = pulmonary vein.",
      "year": "JAMB 2022 Past Question",
      "topic": "Circulatory System"
    },
    {
      "id": 308,
      "subject": "Biology",
      "question": "What type of ecological relationship is illustrated by nitrogen-fixing Rhizobium bacteria living in the root nodules of leguminous plants?",
      "options": [
        {
          "key": "A",
          "text": "Parasitism"
        },
        {
          "key": "B",
          "text": "Mutualism"
        },
        {
          "key": "C",
          "text": "Commensalism"
        },
        {
          "key": "D",
          "text": "Saprophytism"
        }
      ],
      "correct": "B",
      "explanation": "Mutualism is a symbiotic relationship where both organisms benefit: Rhizobium supplies fixed nitrates to the legume, while the plant provides carbohydrates and shelter.",
      "trapWarning": "Commensalism benefits only one partner without harming the other; here BOTH benefit, so it is Mutualism.",
      "hint": "Both partners gain (win-win).",
      "year": "JAMB 2022 Past Question",
      "topic": "Ecology (Symbiosis)"
    },
    {
      "id": 309,
      "subject": "Biology",
      "question": "Which eye defect is characterized by an eyeball that is too long from front to back, causing distant images to focus in front of the retina?",
      "options": [
        {
          "key": "A",
          "text": "Myopia (Short-sightedness)"
        },
        {
          "key": "B",
          "text": "Hypermetropia (Long-sightedness)"
        },
        {
          "key": "C",
          "text": "Presbyopia"
        },
        {
          "key": "D",
          "text": "Astigmatism"
        }
      ],
      "correct": "A",
      "explanation": "In myopia (nearsightedness), light rays from distant objects converge in front of the retina because the eyeball is elongated. It is corrected using concave (diverging) lenses.",
      "trapWarning": "Hypermetropia has an eyeball that is too short, focusing behind the retina.",
      "hint": "Short-sighted = focuses in front; corrected with concave lens.",
      "year": "JAMB 2021 Past Question",
      "topic": "Sensory Organs (The Eye)"
    },
    {
      "id": 310,
      "subject": "Biology",
      "question": "What is the phenotypic ratio obtained in the F2 generation of a classic Mendelian monohybrid cross with complete dominance?",
      "options": [
        {
          "key": "A",
          "text": "3 : 1"
        },
        {
          "key": "B",
          "text": "1 : 2 : 1"
        },
        {
          "key": "C",
          "text": "9 : 3 : 3 : 1"
        },
        {
          "key": "D",
          "text": "1 : 1"
        }
      ],
      "correct": "A",
      "explanation": "In a monohybrid cross (e.g., Tt x Tt), the phenotypic ratio is 3 Dominant : 1 Recessive (3 tall : 1 dwarf). The genotypic ratio is 1 TT : 2 Tt : 1 tt (1:2:1).",
      "trapWarning": "Pay close attention to whether the question asks for the PHENOTYPIC ratio (3:1) or GENOTYPIC ratio (1:2:1).",
      "hint": "Phenotypic looks (3 tall to 1 short).",
      "year": "JAMB 2021 Past Question",
      "topic": "Genetics (Mendelian Laws)"
    },
    {
      "id": 311,
      "subject": "Biology",
      "question": "Which digestive enzyme present in human saliva initiates the chemical breakdown of cooked starch into maltose?",
      "options": [
        {
          "key": "A",
          "text": "Pepsin"
        },
        {
          "key": "B",
          "text": "Ptyalin (Salivary Amylase)"
        },
        {
          "key": "C",
          "text": "Trypsin"
        },
        {
          "key": "D",
          "text": "Lipase"
        }
      ],
      "correct": "B",
      "explanation": "Ptyalin (salivary amylase) is secreted by the salivary glands and begins starch digestion in the alkaline/neutral environment of the mouth.",
      "trapWarning": "Pepsin operates in the stomach and digests proteins under highly acidic pH.",
      "hint": "Ptyalin digests cooked starch in the mouth.",
      "year": "JAMB 2020 Past Question",
      "topic": "Digestive System (Enzymes)"
    },
    {
      "id": 312,
      "subject": "Biology",
      "question": "Which plant vascular tissue is responsible for transporting dissolved organic food manufactured during photosynthesis from the leaves to all other parts of the plant?",
      "options": [
        {
          "key": "A",
          "text": "Phloem"
        },
        {
          "key": "B",
          "text": "Xylem"
        },
        {
          "key": "C",
          "text": "Cambium"
        },
        {
          "key": "D",
          "text": "Cortex"
        }
      ],
      "correct": "A",
      "explanation": "Phloem contains sieve tube elements and companion cells that translocate dissolved sucrose and amino acids (food) bidirectionally. Xylem transports water and inorganic mineral salts upwards.",
      "trapWarning": "Remember: Phloem transports Food; Xylem transports Water and minerals.",
      "hint": "Phloem = Food transport.",
      "year": "JAMB 2022 Past Question",
      "topic": "Plant Physiology (Vascular Tissues)"
    },
    {
      "id": 313,
      "subject": "Biology",
      "question": "What is the human dental formula for permanent adult dentition?",
      "options": [
        {
          "key": "A",
          "text": "I 2/2, C 1/1, PM 2/2, M 3/3"
        },
        {
          "key": "B",
          "text": "I 2/2, C 1/1, PM 0/0, M 2/2"
        },
        {
          "key": "C",
          "text": "I 3/3, C 1/1, PM 4/4, M 3/3"
        },
        {
          "key": "D",
          "text": "I 1/1, C 1/1, PM 2/2, M 3/3"
        }
      ],
      "correct": "A",
      "explanation": "The adult human permanent dental formula per half jaw is: Incisors 2/2, Canines 1/1, Premolars 2/2, Molars 3/3 = 16 per side * 2 = 32 teeth total.",
      "trapWarning": "Option B represents temporary milk teeth (which have 0 premolars). Adult dentition has 2 premolars and 3 molars per quadrant.",
      "hint": "2-1-2-3 per quadrant = 8 * 4 = 32 teeth.",
      "year": "JAMB 2021 Past Question",
      "topic": "Digestive System (Dental Formula)"
    },
    {
      "id": 314,
      "subject": "Biology",
      "question": "In which stage of cellular mitosis do sister chromatids separate and move toward opposite poles of the spindle?",
      "options": [
        {
          "key": "A",
          "text": "Anaphase"
        },
        {
          "key": "B",
          "text": "Metaphase"
        },
        {
          "key": "C",
          "text": "Prophase"
        },
        {
          "key": "D",
          "text": "Telophase"
        }
      ],
      "correct": "A",
      "explanation": "During Anaphase, the centromere divides and sister chromatids are pulled apart toward opposite spindle poles by shortening kinetochore microtubules.",
      "trapWarning": "Metaphase aligns chromosomes at the equatorial plate; Anaphase pulls them apart.",
      "hint": "Anaphase = Apart.",
      "year": "JAMB 2020 Past Question",
      "topic": "Cell Biology (Mitosis)"
    },
    {
      "id": 315,
      "subject": "Biology",
      "question": "Which of the following hormones is secreted by the beta cells of the islets of Langerhans in the pancreas to lower elevated blood glucose concentration?",
      "options": [
        {
          "key": "A",
          "text": "Insulin"
        },
        {
          "key": "B",
          "text": "Glucagon"
        },
        {
          "key": "C",
          "text": "Adrenaline"
        },
        {
          "key": "D",
          "text": "Thyroxine"
        }
      ],
      "correct": "A",
      "explanation": "Insulin is secreted by beta cells of the pancreas to stimulate liver and muscle cells to convert excess blood glucose into stored glycogen, lowering blood sugar.",
      "trapWarning": "Glucagon is secreted by alpha cells and INCREASES blood glucose.",
      "hint": "Insulin reduces blood sugar.",
      "year": "JAMB 2020 Past Question",
      "topic": "Endocrine System (Homeostasis)"
    }
  ],
  "Chemistry": [
    {
      "id": 401,
      "subject": "Chemistry",
      "question": "What is the oxidation state of Chromium in the dichromate ion, Cr₂O₇²⁻?",
      "options": [
        {
          "key": "A",
          "text": "+3"
        },
        {
          "key": "B",
          "text": "+6"
        },
        {
          "key": "C",
          "text": "+7"
        },
        {
          "key": "D",
          "text": "+12"
        }
      ],
      "correct": "B",
      "explanation": "Let Cr oxidation state = x. 2(x) + 7(-2) = -2 => 2x - 14 = -2 => 2x = +12 => x = +6. Thus, chromium has an oxidation number of +6.",
      "trapWarning": "Do not forget that the ion has an overall net charge of -2. Setting the total to zero gives +7, which is incorrect.",
      "hint": "2x + 7(-2) = -2 => x = +6.",
      "year": "JAMB 2024 Past Question",
      "topic": "Redox Reactions & Oxidation Numbers"
    },
    {
      "id": 402,
      "subject": "Chemistry",
      "question": "According to Le Chatelier’s principle, what will happen to the equilibrium of the exothermic Haber reaction: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92 kJ/mol, if the temperature is increased?",
      "options": [
        {
          "key": "A",
          "text": "Shifts to the right, increasing ammonia yield"
        },
        {
          "key": "B",
          "text": "Shifts to the left, decreasing ammonia yield"
        },
        {
          "key": "C",
          "text": "No change in equilibrium position"
        },
        {
          "key": "D",
          "text": "Equilibrium constant increases"
        }
      ],
      "correct": "B",
      "explanation": "Because the forward synthesis of ammonia is exothermic (releases heat), increasing temperature shifts the equilibrium in the endothermic direction (reverse) to absorb added heat, decreasing NH₃ yield.",
      "trapWarning": "Exothermic reactions are favored by low temperatures, not high temperatures.",
      "hint": "Adding heat shifts reaction in the direction that consumes heat (to the left).",
      "year": "JAMB 2024 Past Question",
      "topic": "Chemical Equilibrium & Le Chatelier"
    },
    {
      "id": 403,
      "subject": "Chemistry",
      "question": "How many Faradays of electricity are required to deposit 1.0 mole of aluminium from molten Al₂O₃ during Hall-Heroult electrolysis?",
      "options": [
        {
          "key": "A",
          "text": "1 Faraday"
        },
        {
          "key": "B",
          "text": "2 Faradays"
        },
        {
          "key": "C",
          "text": "3 Faradays"
        },
        {
          "key": "D",
          "text": "6 Faradays"
        }
      ],
      "correct": "C",
      "explanation": "The reduction half-reaction at the cathode is: Al³⁺ + 3e⁻ → Al(s). Each mole of Al requires 3 moles of electrons, which equals exactly 3 Faradays (3F).",
      "trapWarning": "Aluminium is trivalent (Al³⁺). Do not confuse it with divalent copper (Cu²⁺) or monovalent silver (Ag⁺).",
      "hint": "Faradays needed per mole equals the ionic valency of the metal (3+).",
      "year": "JAMB 2024 Past Question",
      "topic": "Electrochemistry (Faraday’s Laws)"
    },
    {
      "id": 404,
      "subject": "Chemistry",
      "question": "Which of the following organic compounds will decolorize acidified potassium tetraoxomanganate(VII) (KMnO₄) solution?",
      "options": [
        {
          "key": "A",
          "text": "Ethane"
        },
        {
          "key": "B",
          "text": "Ethene"
        },
        {
          "key": "C",
          "text": "Propane"
        },
        {
          "key": "D",
          "text": "Butane"
        }
      ],
      "correct": "B",
      "explanation": "Ethene is an unsaturated alkene containing a carbon-carbon double bond (C=C). It readily undergoes addition reaction with Baeyer’s reagent (cold alkaline or acidified KMnO₄), discharging the purple color.",
      "trapWarning": "Saturated alkanes (ethane, propane, butane) do not react with KMnO₄ under standard conditions.",
      "hint": "Unsaturated hydrocarbons (alkenes and alkynes) decolorize KMnO₄.",
      "year": "JAMB 2023 Past Question",
      "topic": "Organic Chemistry (Alkenes)"
    },
    {
      "id": 405,
      "subject": "Chemistry",
      "question": "What is the pH of a 0.001 mol/dm³ aqueous solution of hydrochloric acid (HCl)?",
      "options": [
        {
          "key": "A",
          "text": "1.0"
        },
        {
          "key": "B",
          "text": "2.0"
        },
        {
          "key": "C",
          "text": "3.0"
        },
        {
          "key": "D",
          "text": "11.0"
        }
      ],
      "correct": "C",
      "explanation": "HCl is a strong monobasic acid that ionizes completely: [H⁺] = 0.001 M = 10⁻³ M. pH = -log₁₀[H⁺] = -log₁₀(10⁻³) = 3.0.",
      "trapWarning": "0.001 = 10⁻³, so the negative logarithm is 3.",
      "hint": "Count the decimal places: 3 decimal places = pH 3.",
      "year": "JAMB 2023 Past Question",
      "topic": "Acids, Bases & pH Calculations"
    },
    {
      "id": 406,
      "subject": "Chemistry",
      "question": "According to Graham’s law of diffusion, if gas A has a relative molecular mass of 16 and gas B has a relative molecular mass of 64, what is the ratio of the rate of diffusion of A to B (R_A / R_B)?",
      "options": [
        {
          "key": "A",
          "text": "1 : 2"
        },
        {
          "key": "B",
          "text": "2 : 1"
        },
        {
          "key": "C",
          "text": "4 : 1"
        },
        {
          "key": "D",
          "text": "1 : 4"
        }
      ],
      "correct": "B",
      "explanation": "Graham’s law: R_A / R_B = √(M_B / M_A) = √(64 / 16) = √4 = 2 / 1. Gas A diffuses twice as fast as gas B.",
      "trapWarning": "The formula has an INVERSE square root: heavier gas in numerator inside the square root.",
      "hint": "Lighter gas diffuses faster: √(64/16) = 2.",
      "year": "JAMB 2023 Past Question",
      "topic": "Gas Laws (Graham’s Law of Diffusion)"
    },
    {
      "id": 407,
      "subject": "Chemistry",
      "question": "Which of the following compounds exhibits both ionic (electrovalent) and coordinate (dative) bonding?",
      "options": [
        {
          "key": "A",
          "text": "NH₄Cl (Ammonium chloride)"
        },
        {
          "key": "B",
          "text": "CH₄ (Methane)"
        },
        {
          "key": "C",
          "text": "NaCl (Sodium chloride)"
        },
        {
          "key": "D",
          "text": "H₂O (Water)"
        }
      ],
      "correct": "A",
      "explanation": "In NH₄Cl, the bond between NH₄⁺ and Cl⁻ is ionic. Inside the ammonium ion (NH₄⁺), three N-H bonds are covalent and one is coordinate (dative) from nitrogen’s lone pair to H⁺.",
      "trapWarning": "NH₄Cl contains all three bonding types: covalent, coordinate, and ionic.",
      "hint": "Ammonium chloride is the classic three-bond-type compound.",
      "year": "JAMB 2022 Past Question",
      "topic": "Chemical Bonding"
    },
    {
      "id": 408,
      "subject": "Chemistry",
      "question": "What is the IUPAC systematic name for the compound CH₃-CH(CH₃)-CH₂-CH₂-OH?",
      "options": [
        {
          "key": "A",
          "text": "2-methylbutan-4-ol"
        },
        {
          "key": "B",
          "text": "3-methylbutan-1-ol"
        },
        {
          "key": "C",
          "text": "Pentanol"
        },
        {
          "key": "D",
          "text": "Isopentanol"
        }
      ],
      "correct": "B",
      "explanation": "Number the 4-carbon chain starting from the end closest to the principal functional group (-OH): C1 has -OH, C3 has the methyl substituent. Name: 3-methylbutan-1-ol.",
      "trapWarning": "The principal functional group (-OH) takes priority in numbering over alkyl branches.",
      "hint": "Number from the -OH end: 1, 2, 3, 4.",
      "year": "JAMB 2022 Past Question",
      "topic": "Organic Chemistry (IUPAC Nomenclature)"
    },
    {
      "id": 409,
      "subject": "Chemistry",
      "question": "What catalyst is used in the industrial Contact Process for the manufacture of tetraoxosulphate(VI) acid (H₂SO₄)?",
      "options": [
        {
          "key": "A",
          "text": "Finely divided Iron"
        },
        {
          "key": "B",
          "text": "Vanadium(V) oxide (V₂O₅)"
        },
        {
          "key": "C",
          "text": "Nickel"
        },
        {
          "key": "D",
          "text": "Manganese(IV) oxide"
        }
      ],
      "correct": "B",
      "explanation": "Vanadium(V) oxide, V₂O₅, is the catalyst used in the Contact Process to oxidize SO₂ to SO₃ at 450°C and 1-2 atm.",
      "trapWarning": "Finely divided iron is used in Haber Process for ammonia; V₂O₅ is used for sulfuric acid.",
      "hint": "V₂O₅ = Contact Process catalyst.",
      "year": "JAMB 2021 Past Question",
      "topic": "Industrial Chemistry (Contact Process)"
    },
    {
      "id": 410,
      "subject": "Chemistry",
      "question": "Which of the following elements has the HIGHEST first ionization energy across Period 3 of the Periodic Table?",
      "options": [
        {
          "key": "A",
          "text": "Sodium (Na)"
        },
        {
          "key": "B",
          "text": "Silicon (Si)"
        },
        {
          "key": "C",
          "text": "Chlorine (Cl)"
        },
        {
          "key": "D",
          "text": "Argon (Ar)"
        }
      ],
      "correct": "D",
      "explanation": "Across a period from left to right, nuclear charge increases while atomic radius decreases, causing first ionization energy to increase. Argon, being a noble gas with a stable octet, has the highest ionization energy.",
      "trapWarning": "Chlorine is highly electronegative, but Argon has the highest ionization energy due to its completely filled stable outer shell.",
      "hint": "Noble gases hold electrons most tightly in any period.",
      "year": "JAMB 2020 Past Question",
      "topic": "Periodic Properties (Ionization Energy)"
    },
    {
      "id": 411,
      "subject": "Chemistry",
      "question": "What is the volume occupied by 8.0 g of oxygen gas (O₂) at standard temperature and pressure (STP)? (Molar mass of O = 16 g/mol, molar volume at STP = 22.4 dm³)",
      "options": [
        {
          "key": "A",
          "text": "5.6 dm³"
        },
        {
          "key": "B",
          "text": "11.2 dm³"
        },
        {
          "key": "C",
          "text": "22.4 dm³"
        },
        {
          "key": "D",
          "text": "2.8 dm³"
        }
      ],
      "correct": "A",
      "explanation": "Molar mass of O₂ = 16 * 2 = 32 g/mol. Moles of O₂ = 8.0 g / 32 g/mol = 0.25 mol. Volume at STP = 0.25 * 22.4 dm³ = 5.6 dm³.",
      "trapWarning": "Oxygen gas is diatomic (O₂ = 32 g/mol), not monatomic oxygen (16 g/mol). Using 16 gives 11.2 dm³ (Option B).",
      "hint": "O₂ molar mass is 32: 8/32 = 0.25 * 22.4 = 5.6 dm³.",
      "year": "JAMB 2022 Past Question",
      "topic": "Stoichiometry & Gas Molar Volume"
    },
    {
      "id": 412,
      "subject": "Chemistry",
      "question": "Which allotrope of carbon conducts electricity due to the presence of delocalized π electrons between its hexagonal layers?",
      "options": [
        {
          "key": "A",
          "text": "Graphite"
        },
        {
          "key": "B",
          "text": "Diamond"
        },
        {
          "key": "C",
          "text": "Fullerene"
        },
        {
          "key": "D",
          "text": "Carbon black"
        }
      ],
      "correct": "A",
      "explanation": "In graphite, each carbon atom is bonded to three others in planar hexagonal rings (sp² hybridization), leaving one free delocalized electron per carbon atom that enables electrical conductivity.",
      "trapWarning": "Diamond has all 4 valence electrons bonded in a rigid tetrahedral lattice (sp³), so it cannot conduct electricity.",
      "hint": "Graphite is a non-metal that conducts electricity.",
      "year": "JAMB 2021 Past Question",
      "topic": "Carbon & Its Allotropes"
    },
    {
      "id": 413,
      "subject": "Chemistry",
      "question": "What type of reaction occurs when an organic triglyceride fat is boiled with concentrated sodium hydroxide (NaOH) to produce soap and glycerol?",
      "options": [
        {
          "key": "A",
          "text": "Saponification (Alkaline hydrolysis)"
        },
        {
          "key": "B",
          "text": "Esterification"
        },
        {
          "key": "C",
          "text": "Hydrogenation"
        },
        {
          "key": "D",
          "text": "Polymerization"
        }
      ],
      "correct": "A",
      "explanation": "Saponification is the alkaline hydrolysis of fats and oils using strong alkali (NaOH or KOH) to produce salts of fatty acids (soap) and 1,2,3-propanetriol (glycerol).",
      "trapWarning": "Esterification creates esters from acid and alcohol; saponification hydrolyzes them into soap.",
      "hint": "Soap making = Saponification.",
      "year": "JAMB 2020 Past Question",
      "topic": "Organic Chemistry (Fats, Oils & Soaps)"
    }
  ],
  "Physics": [
    {
      "id": 501,
      "subject": "Physics",
      "question": "A projectile is launched from ground level with an initial velocity of 40 m/s at an angle of 30° to the horizontal. Calculate the maximum height reached (take g = 10 m/s²):",
      "options": [
        {
          "key": "A",
          "text": "20 m"
        },
        {
          "key": "B",
          "text": "40 m"
        },
        {
          "key": "C",
          "text": "80 m"
        },
        {
          "key": "D",
          "text": "10 m"
        }
      ],
      "correct": "A",
      "explanation": "Maximum height H = (u sin θ)² / (2g). u sin 30° = 40 * 0.5 = 20 m/s. H = (20)² / (2 * 10) = 400 / 20 = 20 m.",
      "trapWarning": "Do not use the full velocity 40 m/s in H = u² / 2g; only the vertical component (u sin θ) contributes to height.",
      "hint": "Vertical velocity is 40 * sin(30°) = 20 m/s.",
      "year": "JAMB 2024 Past Question",
      "topic": "Mechanics (Projectile Motion)"
    },
    {
      "id": 502,
      "subject": "Physics",
      "question": "A car traveling at 20 m/s applies its brakes and comes to rest uniformly over a distance of 50 m. Determine the magnitude of the deceleration:",
      "options": [
        {
          "key": "A",
          "text": "4 m/s²"
        },
        {
          "key": "B",
          "text": "2 m/s²"
        },
        {
          "key": "C",
          "text": "8 m/s²"
        },
        {
          "key": "D",
          "text": "5 m/s²"
        }
      ],
      "correct": "A",
      "explanation": "Using v² = u² + 2as: 0 = (20)² + 2(a)(50) => 0 = 400 + 100a => 100a = -400 => a = -4 m/s². The magnitude of deceleration is 4 m/s².",
      "trapWarning": "Deceleration magnitude is a positive scalar (4 m/s²); acceleration is -4 m/s².",
      "hint": "400 / (2 * 50) = 4 m/s².",
      "year": "JAMB 2024 Past Question",
      "topic": "Mechanics (Linear Motion)"
    },
    {
      "id": 503,
      "subject": "Physics",
      "question": "A 240 V electric kettle draws a current of 5 A for 10 minutes. Calculate the total electrical energy consumed in Joules:",
      "options": [
        {
          "key": "A",
          "text": "720,000 J"
        },
        {
          "key": "B",
          "text": "12,000 J"
        },
        {
          "key": "C",
          "text": "1,200 J"
        },
        {
          "key": "D",
          "text": "72,000 J"
        }
      ],
      "correct": "A",
      "explanation": "Energy E = P * t = V * I * t. Time must be in SI units (seconds): 10 minutes = 10 * 60 = 600 s. E = 240 * 5 * 600 = 1,200 * 600 = 720,000 J (720 kJ).",
      "trapWarning": "Never multiply by minutes directly! Time in physics equations must always be converted to seconds.",
      "hint": "Convert 10 mins into 600 seconds first: 240 * 5 * 600.",
      "year": "JAMB 2024 Past Question",
      "topic": "Current Electricity (Electrical Power & Energy)"
    },
    {
      "id": 504,
      "subject": "Physics",
      "question": "A radioactive isotope has a half-life of 4 hours. If a sample initially contains 80 g of the isotope, how much remains undecayed after 16 hours?",
      "options": [
        {
          "key": "A",
          "text": "5 g"
        },
        {
          "key": "B",
          "text": "10 g"
        },
        {
          "key": "C",
          "text": "2.5 g"
        },
        {
          "key": "D",
          "text": "20 g"
        }
      ],
      "correct": "A",
      "explanation": "Number of half-lives n = Total time / Half-life = 16 / 4 = 4 half-lives. Fraction remaining = (1/2)⁴ = 1/16. Mass remaining = 80 g / 16 = 5 g.",
      "trapWarning": "Do not simply divide 80 by 4; half-life is an exponential decay process: 80 -> 40 -> 20 -> 10 -> 5.",
      "hint": "Halve 80 four times: 80 -> 40 -> 20 -> 10 -> 5 g.",
      "year": "JAMB 2023 Past Question",
      "topic": "Modern Physics (Radioactivity & Half-life)"
    },
    {
      "id": 505,
      "subject": "Physics",
      "question": "What is the critical angle for light traveling from glass (refractive index n = 1.50) into air (n = 1.00)?",
      "options": [
        {
          "key": "A",
          "text": "41.8°"
        },
        {
          "key": "B",
          "text": "45.0°"
        },
        {
          "key": "C",
          "text": "30.0°"
        },
        {
          "key": "D",
          "text": "60.0°"
        }
      ],
      "correct": "A",
      "explanation": "Critical angle formula: sin c = 1 / n = 1 / 1.50 = 0.6667. c = arcsin(0.6667) ≈ 41.8°.",
      "trapWarning": "Total internal reflection can only occur when light travels from an optically denser medium to a rarer medium.",
      "hint": "sin c = 1 / 1.50 = 2/3 => 41.8°.",
      "year": "JAMB 2023 Past Question",
      "topic": "Optics (Refraction & Critical Angle)"
    },
    {
      "id": 506,
      "subject": "Physics",
      "question": "An ideal step-down transformer has 1,200 primary turns and 120 secondary turns. If the input primary voltage is 220 V, what is the output secondary voltage?",
      "options": [
        {
          "key": "A",
          "text": "22 V"
        },
        {
          "key": "B",
          "text": "2,200 V"
        },
        {
          "key": "C",
          "text": "110 V"
        },
        {
          "key": "D",
          "text": "12 V"
        }
      ],
      "correct": "A",
      "explanation": "Transformer equation: V_s / V_p = N_s / N_p => V_s = V_p * (N_s / N_p) = 220 * (120 / 1200) = 220 * (1/10) = 22 V.",
      "trapWarning": "Step-down transformers reduce voltage because N_s < N_p.",
      "hint": "Turns ratio is 10:1 step-down, so 220 V becomes 22 V.",
      "year": "JAMB 2023 Past Question",
      "topic": "Electromagnetism (Transformers)"
    },
    {
      "id": 507,
      "subject": "Physics",
      "question": "A sound wave of frequency 500 Hz travels through air at 340 m/s. What is the wavelength of the wave?",
      "options": [
        {
          "key": "A",
          "text": "0.68 m"
        },
        {
          "key": "B",
          "text": "1.47 m"
        },
        {
          "key": "C",
          "text": "170 m"
        },
        {
          "key": "D",
          "text": "0.34 m"
        }
      ],
      "correct": "A",
      "explanation": "Wave speed formula v = f * λ => λ = v / f = 340 / 500 = 0.68 m.",
      "trapWarning": "Do not multiply velocity by frequency; wavelength is velocity DIVIDED by frequency.",
      "hint": "340 / 500 = 34/50 = 0.68 m.",
      "year": "JAMB 2022 Past Question",
      "topic": "Waves & Sound"
    },
    {
      "id": 508,
      "subject": "Physics",
      "question": "Three resistors of resistances 2 Ω, 3 Ω, and 6 Ω are connected in parallel. What is their effective total resistance?",
      "options": [
        {
          "key": "A",
          "text": "1 Ω"
        },
        {
          "key": "B",
          "text": "11 Ω"
        },
        {
          "key": "C",
          "text": "0.5 Ω"
        },
        {
          "key": "D",
          "text": "2.5 Ω"
        }
      ],
      "correct": "A",
      "explanation": "1/R_total = 1/2 + 1/3 + 1/6 = (3 + 2 + 1) / 6 = 6/6 = 1 Ω⁻¹ => R_total = 1 Ω.",
      "trapWarning": "Total parallel resistance is ALWAYS less than the smallest individual resistor in the combination (less than 2 Ω).",
      "hint": "Common denominator is 6: (3+2+1)/6 = 1.",
      "year": "JAMB 2022 Past Question",
      "topic": "Current Electricity (Parallel Resistors)"
    },
    {
      "id": 509,
      "subject": "Physics",
      "question": "What is the period of oscillation T of a simple pendulum of length 1.0 m (take g = π² m/s²)?",
      "options": [
        {
          "key": "A",
          "text": "2.0 s"
        },
        {
          "key": "B",
          "text": "1.0 s"
        },
        {
          "key": "C",
          "text": "4.0 s"
        },
        {
          "key": "D",
          "text": "0.5 s"
        }
      ],
      "correct": "A",
      "explanation": "Period T = 2π √(L/g). Substituting g = π²: T = 2π √(1.0 / π²) = 2π * (1/π) = 2.0 seconds.",
      "trapWarning": "JAMB frequently uses g = π² ≈ 9.87 to allow quick algebraic cancellation without a calculator.",
      "hint": "T = 2π / π = 2 s.",
      "year": "JAMB 2021 Past Question",
      "topic": "Simple Harmonic Motion"
    },
    {
      "id": 510,
      "subject": "Physics",
      "question": "Which of the following devices operates on the principle of thermal expansion of solids?",
      "options": [
        {
          "key": "A",
          "text": "Bimetallic strip in a thermostat"
        },
        {
          "key": "B",
          "text": "Hydrometer"
        },
        {
          "key": "C",
          "text": "Barometer"
        },
        {
          "key": "D",
          "text": "Manometer"
        }
      ],
      "correct": "A",
      "explanation": "A bimetallic strip consists of two different metals (such as brass and iron) welded together. Because they have different linear expansivities, the strip bends upon heating, opening or closing an electrical circuit in thermostats.",
      "trapWarning": "Hydrometers operate on Archimedes’ principle of floatation, not thermal expansion.",
      "hint": "Bimetallic strip bends when temperature changes.",
      "year": "JAMB 2020 Past Question",
      "topic": "Thermal Physics (Expansion)"
    },
    {
      "id": 511,
      "subject": "Physics",
      "question": "According to Newton’s second law of motion, what net force is required to accelerate a 1,200 kg vehicle from rest to 25 m/s in 10 seconds?",
      "options": [
        {
          "key": "A",
          "text": "3,000 N"
        },
        {
          "key": "B",
          "text": "30,000 N"
        },
        {
          "key": "C",
          "text": "1,200 N"
        },
        {
          "key": "D",
          "text": "2,500 N"
        }
      ],
      "correct": "A",
      "explanation": "Acceleration a = (v - u) / t = (25 - 0) / 10 = 2.5 m/s². Net Force F = m * a = 1,200 kg * 2.5 m/s² = 3,000 N.",
      "trapWarning": "Calculate acceleration first: 25/10 = 2.5 m/s², then multiply by mass.",
      "hint": "F = m * a = 1200 * 2.5 = 3000 N.",
      "year": "JAMB 2022 Past Question",
      "topic": "Newton’s Laws of Motion"
    },
    {
      "id": 512,
      "subject": "Physics",
      "question": "An object is placed 20 cm in front of a convex lens with a focal length of 10 cm. What is the image distance and nature of the image formed?",
      "options": [
        {
          "key": "A",
          "text": "20 cm, Real and inverted"
        },
        {
          "key": "B",
          "text": "10 cm, Virtual and erect"
        },
        {
          "key": "C",
          "text": "40 cm, Real and magnified"
        },
        {
          "key": "D",
          "text": "Infinity"
        }
      ],
      "correct": "A",
      "explanation": "Using lens formula 1/f = 1/u + 1/v: 1/10 = 1/20 + 1/v => 1/v = 1/10 - 1/20 = 1/20 => v = 20 cm. Because the object is placed at 2F (twice focal length), the image is real, inverted, and the same size at 2F.",
      "trapWarning": "When u = 2f, v = 2f and magnification is exactly 1.",
      "hint": "Object at 2F produces real image at 2F.",
      "year": "JAMB 2021 Past Question",
      "topic": "Optics (Thin Lenses)"
    },
    {
      "id": 513,
      "subject": "Physics",
      "question": "A solid cube of edge length 0.1 m has a mass of 2.7 kg. What is the density of the material?",
      "options": [
        {
          "key": "A",
          "text": "2,700 kg/m³"
        },
        {
          "key": "B",
          "text": "270 kg/m³"
        },
        {
          "key": "C",
          "text": "27 kg/m³"
        },
        {
          "key": "D",
          "text": "27,000 kg/m³"
        }
      ],
      "correct": "A",
      "explanation": "Volume of cube V = (0.1 m)³ = 0.001 m³. Density ρ = Mass / Volume = 2.7 kg / 0.001 m³ = 2,700 kg/m³ (density of aluminium).",
      "trapWarning": "Volume is edge cubed: (0.1)³ = 0.001, not 0.01.",
      "hint": "2.7 / 0.001 = 2,700 kg/m³.",
      "year": "JAMB 2020 Past Question",
      "topic": "Properties of Matter (Density)"
    }
  ],
  "Economics": [
    {
      "id": 601,
      "subject": "Economics",
      "question": "If a 10% decrease in the price of petroleum motor spirit leads to a 25% increase in the quantity demanded, the price elasticity of demand is:",
      "options": [
        {
          "key": "A",
          "text": "2.5 (Elastic)"
        },
        {
          "key": "B",
          "text": "0.4 (Inelastic)"
        },
        {
          "key": "C",
          "text": "1.0 (Unitary)"
        },
        {
          "key": "D",
          "text": "25.0 (Perfect)"
        }
      ],
      "correct": "A",
      "explanation": "Price elasticity of demand (PED) = % change in Quantity Demanded / % change in Price = 25% / 10% = 2.5. Since PED > 1, demand is price elastic.",
      "trapWarning": "Always put % change in quantity on top (numerator) and % change in price on the bottom (denominator). Reversing gives 0.4.",
      "hint": "Quantity change (25) divided by price change (10) = 2.5.",
      "year": "JAMB 2024 Past Question",
      "topic": "Price Elasticity of Demand"
    },
    {
      "id": 602,
      "subject": "Economics",
      "question": "Which of the following instruments is an effective contractionary monetary policy tool used by the Central Bank of Nigeria (CBN) to combat rising inflation?",
      "options": [
        {
          "key": "A",
          "text": "Selling treasury bills via Open Market Operations (OMO)"
        },
        {
          "key": "B",
          "text": "Lowering the Cash Reserve Ratio (CRR)"
        },
        {
          "key": "C",
          "text": "Reducing the Monetary Policy Rate (MPR)"
        },
        {
          "key": "D",
          "text": "Printing more legal tender currency notes"
        }
      ],
      "correct": "A",
      "explanation": "When the Central Bank sells government securities (Treasury bills) in Open Market Operations, commercial banks and the public purchase them with cash, mopping up excess liquidity from the financial system and curbing demand-pull inflation.",
      "trapWarning": "Lowering CRR or lowering interest rates expands credit, worsening inflation.",
      "hint": "Selling securities absorbs money out of circulation.",
      "year": "JAMB 2024 Past Question",
      "topic": "Money & Banking (Monetary Policy)"
    },
    {
      "id": 603,
      "subject": "Economics",
      "question": "Under perfect competition in the short run, a profit-maximizing firm produces at the output level where:",
      "options": [
        {
          "key": "A",
          "text": "Price = Marginal Revenue = Marginal Cost (P = MR = MC)"
        },
        {
          "key": "B",
          "text": "Price exceeds Marginal Cost by the widest margin"
        },
        {
          "key": "C",
          "text": "Average Variable Cost is at its maximum"
        },
        {
          "key": "D",
          "text": "Total Revenue equals zero"
        }
      ],
      "correct": "A",
      "explanation": "A competitive firm is a price taker, so Average Revenue = Marginal Revenue = Price. Profit maximization occurs where Marginal Revenue equals Marginal Cost (MR = MC), thus P = MR = MC.",
      "trapWarning": "A firm does not maximize profit where price exceeds MC the most; it produces right up to MR = MC.",
      "hint": "Golden rule of profit maximization: MR = MC.",
      "year": "JAMB 2024 Past Question",
      "topic": "Market Structures (Perfect Competition)"
    },
    {
      "id": 604,
      "subject": "Economics",
      "question": "Gross Domestic Product (GDP) differs from Gross National Product (GNP) by:",
      "options": [
        {
          "key": "A",
          "text": "Net Factor Income from Abroad (NFIA)"
        },
        {
          "key": "B",
          "text": "Depreciation / Capital Consumption Allowance"
        },
        {
          "key": "C",
          "text": "Indirect business taxes"
        },
        {
          "key": "D",
          "text": "Subsidies"
        }
      ],
      "correct": "A",
      "explanation": "GNP = GDP + Net Factor Income from Abroad (NFIA). GDP measures output within the domestic boundary, while GNP measures output produced by citizens regardless of location.",
      "trapWarning": "Deducting depreciation from GDP gives Net Domestic Product (NDP), not GNP.",
      "hint": "GNP includes citizen earnings abroad minus foreigners’ domestic earnings.",
      "year": "JAMB 2023 Past Question",
      "topic": "National Income Accounting"
    },
    {
      "id": 605,
      "subject": "Economics",
      "question": "What is the opportunity cost of a decision in economics?",
      "options": [
        {
          "key": "A",
          "text": "The total monetary expense incurred"
        },
        {
          "key": "B",
          "text": "The next best alternative forgone"
        },
        {
          "key": "C",
          "text": "The price tag on the purchased commodity"
        },
        {
          "key": "D",
          "text": "The market equilibrium price"
        }
      ],
      "correct": "B",
      "explanation": "Opportunity cost is the real cost of satisfying any want expressed in terms of the next best alternative sacrificed or forgone.",
      "trapWarning": "Opportunity cost is not money cost; it is the alternative benefit given up.",
      "hint": "What you sacrifice when you make a choice.",
      "year": "JAMB 2023 Past Question",
      "topic": "Basic Economic Concepts"
    },
    {
      "id": 606,
      "subject": "Economics",
      "question": "According to Thomas Malthus, while food production increases in an arithmetic progression (1, 2, 3, 4, 5), human population grows in a:",
      "options": [
        {
          "key": "A",
          "text": "Geometric progression (1, 2, 4, 8, 16)"
        },
        {
          "key": "B",
          "text": "Logarithmic scale"
        },
        {
          "key": "C",
          "text": "Stationary rate"
        },
        {
          "key": "D",
          "text": "Declining trend"
        }
      ],
      "correct": "A",
      "explanation": "Malthus postulated that population grows geometrically (exponentially: 1, 2, 4, 8, 16...) when unchecked, whereas food production increases only arithmetically (1, 2, 3, 4, 5...).",
      "trapWarning": "Food = Arithmetic; Population = Geometric. Do not transpose the two.",
      "hint": "Population doubles exponentially (Geometric).",
      "year": "JAMB 2022 Past Question",
      "topic": "Population Theories (Malthusian Theory)"
    },
    {
      "id": 607,
      "subject": "Economics",
      "question": "Which of the following taxes is considered REGRESSIVE in its incidence?",
      "options": [
        {
          "key": "A",
          "text": "Value Added Tax (VAT) on flat consumable goods"
        },
        {
          "key": "B",
          "text": "Progressive Personal Income Tax (PAYE)"
        },
        {
          "key": "C",
          "text": "Corporate Profits Tax"
        },
        {
          "key": "D",
          "text": "Capital Gains Tax"
        }
      ],
      "correct": "A",
      "explanation": "A flat indirect tax like VAT takes a larger percentage of income from low-income earners than from high-income earners, making it regressive in real economic burden.",
      "trapWarning": "PAYE in Nigeria is progressive (higher earners pay higher percentage rates).",
      "hint": "Flat consumption taxes hurt low earners proportionately more.",
      "year": "JAMB 2021 Past Question",
      "topic": "Public Finance (Taxation)"
    },
    {
      "id": 608,
      "subject": "Economics",
      "question": "A persistent deficit in Nigeria’s Balance of Payments can be corrected in the long run by:",
      "options": [
        {
          "key": "A",
          "text": "Diversifying exports and promoting domestic industrial production"
        },
        {
          "key": "B",
          "text": "Increasing consumer imports of luxury vehicles"
        },
        {
          "key": "C",
          "text": "Abolishing all customs import tariffs"
        },
        {
          "key": "D",
          "text": "Fixing the exchange rate below market reality"
        }
      ],
      "correct": "A",
      "explanation": "Long-term BOP deficit correction requires boosting non-oil exports, domestic manufacturing substitution, and enhancing international competitiveness.",
      "trapWarning": "Importing more luxury goods expands foreign debt and worsens BOP deficits.",
      "hint": "Export more, manufacture locally.",
      "year": "JAMB 2020 Past Question",
      "topic": "International Trade & Balance of Payments"
    },
    {
      "id": 609,
      "subject": "Economics",
      "question": "If two goods X and Y have a POSITIVE cross elasticity of demand, they are:",
      "options": [
        {
          "key": "A",
          "text": "Substitute goods"
        },
        {
          "key": "B",
          "text": "Complementary goods"
        },
        {
          "key": "C",
          "text": "Inferior goods"
        },
        {
          "key": "D",
          "text": "Independent goods"
        }
      ],
      "correct": "A",
      "explanation": "A positive cross elasticity of demand means that an increase in the price of good Y causes an increase in the quantity demanded of good X (e.g., Milo and Bournvita), which defines substitutes.",
      "trapWarning": "Complementary goods (e.g., car and petrol) have a NEGATIVE cross elasticity of demand.",
      "hint": "Positive cross elasticity = Substitutes.",
      "year": "JAMB 2022 Past Question",
      "topic": "Cross Elasticity of Demand"
    },
    {
      "id": 610,
      "subject": "Economics",
      "question": "Which canon of taxation formulated by Adam Smith states that the amount, time, and manner of tax payment should be clear and plain to the contributor?",
      "options": [
        {
          "key": "A",
          "text": "Canon of Certainty"
        },
        {
          "key": "B",
          "text": "Canon of Equity"
        },
        {
          "key": "C",
          "text": "Canon of Convenience"
        },
        {
          "key": "D",
          "text": "Canon of Economy"
        }
      ],
      "correct": "A",
      "explanation": "Adam Smith’s Canon of Certainty stipulates that the tax each individual is bound to pay ought to be certain, not arbitrary (time of payment, manner of payment, and quantity to be paid must be clear).",
      "trapWarning": "Canon of Equity concerns fairness according to ability to pay; Certainty concerns clarity of rules.",
      "hint": "Clear and plain = Certainty.",
      "year": "JAMB 2021 Past Question",
      "topic": "Public Finance (Canons of Taxation)"
    },
    {
      "id": 611,
      "subject": "Economics",
      "question": "According to the Law of Diminishing Returns, as successive units of a variable factor are added to fixed factors of production:",
      "options": [
        {
          "key": "A",
          "text": "Marginal product will eventually decline"
        },
        {
          "key": "B",
          "text": "Total product immediately decreases to zero"
        },
        {
          "key": "C",
          "text": "Average cost decreases continuously"
        },
        {
          "key": "D",
          "text": "Fixed cost begins to rise"
        }
      ],
      "correct": "A",
      "explanation": "The law states that adding more of one factor of production while holding at least one other factor constant will at some point yield lower per-unit incremental output (marginal product declines).",
      "trapWarning": "Total product may still be increasing when marginal product starts declining.",
      "hint": "Marginal product eventually falls.",
      "year": "JAMB 2020 Past Question",
      "topic": "Theory of Production"
    }
  ],
  "Government": [
    {
      "id": 701,
      "subject": "Government",
      "question": "Under the pre-colonial Yoruba Oyo Empire, which political institution served as an effective constitutional check on the autocratic powers of the Alaafin?",
      "options": [
        {
          "key": "A",
          "text": "The Oyomesi headed by the Bashorun"
        },
        {
          "key": "B",
          "text": "The Ogboni cult alone"
        },
        {
          "key": "C",
          "text": "The Are Ona Kakanfo"
        },
        {
          "key": "D",
          "text": "The Council of Baales"
        }
      ],
      "correct": "A",
      "explanation": "The Oyomesi (council of seven kingmakers led by the Bashorun) checked the Alaafin’s authority. If an Alaafin became tyrannical, the Oyomesi presented him with an empty calabash or parrot’s eggs, obligating him to commit ritual suicide.",
      "trapWarning": "The Are Ona Kakanfo was the supreme military commander, not the constitutional kingmaker body.",
      "hint": "Oyomesi headed by the Bashorun.",
      "year": "JAMB 2024 Past Question",
      "topic": "Pre-colonial Political Systems (Yoruba Oyo Empire)"
    },
    {
      "id": 702,
      "subject": "Government",
      "question": "Which constitutional development introduced the elective principle for the first time in Nigeria, enabling voters in Lagos and Calabar to elect legislative council members?",
      "options": [
        {
          "key": "A",
          "text": "1922 Clifford Constitution"
        },
        {
          "key": "B",
          "text": "1946 Richards Constitution"
        },
        {
          "key": "C",
          "text": "1951 Macpherson Constitution"
        },
        {
          "key": "D",
          "text": "1954 Lyttelton Constitution"
        }
      ],
      "correct": "A",
      "explanation": "The 1922 Clifford Constitution introduced the elective principle, creating 4 elected seats (3 for Lagos, 1 for Calabar) in the Legislative Council, which spurred the founding of Nigeria’s first political party (Herbert Macaulay’s NNDP).",
      "trapWarning": "1946 Richards Constitution introduced regionalism, not the elective principle.",
      "hint": "Clifford 1922 = Elective principle.",
      "year": "JAMB 2024 Past Question",
      "topic": "Constitutional Development in Nigeria"
    },
    {
      "id": 703,
      "subject": "Government",
      "question": "What was the primary constitutional significance of the 1954 Lyttelton Constitution in Nigeria?",
      "options": [
        {
          "key": "A",
          "text": "It formally established a Federal system of government with regional autonomy"
        },
        {
          "key": "B",
          "text": "It abolished all traditional rulers"
        },
        {
          "key": "C",
          "text": "It granted unconditional political independence from Britain"
        },
        {
          "key": "D",
          "text": "It made Nigeria a constitutional Republic"
        }
      ],
      "correct": "A",
      "explanation": "The 1954 Lyttelton Constitution formally made Nigeria a federation of three autonomous regions (North, West, East) plus Lagos Federal Capital, with regional Premiers, civil services, and judiciaries.",
      "trapWarning": "Independence came in 1960; Republican status came in 1963. True federalism arrived with Lyttelton in 1954.",
      "hint": "1954 Lyttelton = True Federalism.",
      "year": "JAMB 2024 Past Question",
      "topic": "Constitutional History (Federalism)"
    },
    {
      "id": 704,
      "subject": "Government",
      "question": "Why did the British colonial policy of Indirect Rule face massive resistance and fail in Eastern Nigeria?",
      "options": [
        {
          "key": "A",
          "text": "Absence of centralized traditional monarchies and imposition of artificial Warrant Chiefs"
        },
        {
          "key": "B",
          "text": "High rate of literacy among Igbo youths"
        },
        {
          "key": "C",
          "text": "Direct military intervention by French colonial forces"
        },
        {
          "key": "D",
          "text": "Complete refusal of the people to engage in trade"
        }
      ],
      "correct": "A",
      "explanation": "Pre-colonial Igbo society was decentralized, acephalous, and democratic. When Lord Lugard created artificial \"Warrant Chiefs\" with authoritarian taxation powers, widespread resentment culminated in the historic 1929 Aba Women’s Riot.",
      "trapWarning": "Indirect rule worked smoothly in Northern Emirates because of existing centralized Islamic theocracy.",
      "hint": "Acephalous (stateless) society resisted artificial Warrant Chiefs.",
      "year": "JAMB 2023 Past Question",
      "topic": "Colonial Administration (Indirect Rule in Nigeria)"
    },
    {
      "id": 705,
      "subject": "Government",
      "question": "Under the 1963 Republican Constitution of Nigeria, the British Queen was replaced as Head of State by:",
      "options": [
        {
          "key": "A",
          "text": "A ceremonial President (Dr. Nnamdi Azikiwe)"
        },
        {
          "key": "B",
          "text": "An executive Prime Minister with absolute powers"
        },
        {
          "key": "C",
          "text": "A Military Supreme Commander"
        },
        {
          "key": "D",
          "text": "The Chief Justice of the Federation"
        }
      ],
      "correct": "A",
      "explanation": "The 1963 Republican Constitution severed constitutional allegiance to the British Crown, establishing the Federal Republic of Nigeria with Dr. Nnamdi Azikiwe as Ceremonial President and Sir Abubakar Tafawa Balewa as Prime Minister (Head of Government).",
      "trapWarning": "The 1963 system remained parliamentary (ceremonial president), not executive presidential (which arrived in 1979).",
      "hint": "1963 made Nigeria a Republic with Azikiwe as President.",
      "year": "JAMB 2023 Past Question",
      "topic": "Post-Independence Constitutional History"
    },
    {
      "id": 706,
      "subject": "Government",
      "question": "Which organ of the Economic Community of West African States (ECOWAS) is the supreme policymaking and decision-making body?",
      "options": [
        {
          "key": "A",
          "text": "The Authority of Heads of State and Government"
        },
        {
          "key": "B",
          "text": "The Council of Foreign Ministers"
        },
        {
          "key": "C",
          "text": "The ECOWAS Parliament"
        },
        {
          "key": "D",
          "text": "The Community Court of Justice"
        }
      ],
      "correct": "A",
      "explanation": "The Authority of Heads of State and Government is the highest governing body of ECOWAS, responsible for determining general policies and strategic decisions.",
      "trapWarning": "The Commission is the administrative executive, but the Heads of State Authority has ultimate supreme jurisdiction.",
      "hint": "Heads of State hold highest authority.",
      "year": "JAMB 2022 Past Question",
      "topic": "International Organizations (ECOWAS)"
    },
    {
      "id": 707,
      "subject": "Government",
      "question": "What is the cornerstone or centrepiece of Nigeria’s foreign policy as formulated by successive administrations?",
      "options": [
        {
          "key": "A",
          "text": "Afrocentrism (Africa as the centrepiece of foreign policy)"
        },
        {
          "key": "B",
          "text": "Non-alignment with Western democracies"
        },
        {
          "key": "C",
          "text": "Aggressive territorial expansion into neighbouring countries"
        },
        {
          "key": "D",
          "text": "Complete isolationism from global affairs"
        }
      ],
      "correct": "A",
      "explanation": "Since the First Republic under Sir Abubakar Tafawa Balewa, Nigeria’s foreign policy is anchored on Afrocentrism: championing African liberation, decolonisation, anti-apartheid struggles, and regional economic integration.",
      "trapWarning": "Nigeria actively participates in global multilateralism (UN, Commonwealth), but Africa remains the primary priority.",
      "hint": "Africa is the centrepiece of Nigeria’s foreign policy.",
      "year": "JAMB 2021 Past Question",
      "topic": "Nigerian Foreign Policy"
    },
    {
      "id": 708,
      "subject": "Government",
      "question": "In a parliamentary system of government, the Executive is drawn from and held directly accountable to the:",
      "options": [
        {
          "key": "A",
          "text": "Legislature (Parliament)"
        },
        {
          "key": "B",
          "text": "Judiciary"
        },
        {
          "key": "C",
          "text": "Electoral Commission"
        },
        {
          "key": "D",
          "text": "Council of Traditional Chiefs"
        }
      ],
      "correct": "A",
      "explanation": "In the parliamentary system (Westminster model), the Prime Minister and cabinet ministers are sitting members of the legislature, creating a fusion of powers rather than strict separation of powers.",
      "trapWarning": "In a presidential system (like USA and Nigeria’s 1999 Constitution), cabinet ministers CANNOT be members of parliament.",
      "hint": "Parliamentary = fusion of executive and legislature.",
      "year": "JAMB 2020 Past Question",
      "topic": "Systems of Government"
    },
    {
      "id": 709,
      "subject": "Government",
      "question": "In the pre-colonial Hausa-Fulani political system, what was the official administrative title of the Prime Minister and chief adviser to the Emir?",
      "options": [
        {
          "key": "A",
          "text": "The Waziri"
        },
        {
          "key": "B",
          "text": "The Galadima"
        },
        {
          "key": "C",
          "text": "The Madawaki"
        },
        {
          "key": "D",
          "text": "The Sarkin Fada"
        }
      ],
      "correct": "A",
      "explanation": "The Waziri was the senior administrative officer and Prime Minister in the Sokoto Caliphate / Emirate system, advising the Emir and overseeing administrative decisions.",
      "trapWarning": "The Madawaki was commander of the cavalry/army; the Galadima was the capital administrator.",
      "hint": "Waziri = Prime Minister.",
      "year": "JAMB 2022 Past Question",
      "topic": "Pre-colonial Systems (Hausa-Fulani)"
    },
    {
      "id": 710,
      "subject": "Government",
      "question": "Which constitutional conference or constitution was preceded by extensive nationwide village, district, provincial, and regional consultations across Nigeria?",
      "options": [
        {
          "key": "A",
          "text": "1951 Macpherson Constitution"
        },
        {
          "key": "B",
          "text": "1922 Clifford Constitution"
        },
        {
          "key": "C",
          "text": "1946 Richards Constitution"
        },
        {
          "key": "D",
          "text": "1960 Independence Constitution"
        }
      ],
      "correct": "A",
      "explanation": "Sir John Macpherson avoided Arthur Richards’ mistake of imposing a constitution without consultation; the 1951 Constitution was drafted after extensive conferences from village to regional levels, culminating in the 1950 Ibadan General Conference.",
      "trapWarning": "Richards was heavily criticized for not consulting Nigerians; Macpherson consulted thoroughly.",
      "hint": "Macpherson = nationwide consultations.",
      "year": "JAMB 2021 Past Question",
      "topic": "Constitutional Development"
    },
    {
      "id": 711,
      "subject": "Government",
      "question": "What is the main judicial mechanism by which courts determine whether an executive action or legislative enactment conforms with the supreme Constitution?",
      "options": [
        {
          "key": "A",
          "text": "Judicial Review"
        },
        {
          "key": "B",
          "text": "Habeas Corpus"
        },
        {
          "key": "C",
          "text": "Plea Bargaining"
        },
        {
          "key": "D",
          "text": "Injunction"
        }
      ],
      "correct": "A",
      "explanation": "Judicial review is the constitutional power of superior courts to examine laws and executive actions and declare them null and void if they violate constitutional provisions.",
      "trapWarning": "Judicial independence is the principle of autonomy; Judicial Review is the specific constitutional review power.",
      "hint": "Judicial Review declares unconstitutional laws void.",
      "year": "JAMB 2020 Past Question",
      "topic": "The Judiciary & Constitutionalism"
    }
  ],
  "Literature": [
    {
      "id": 801,
      "subject": "Literature",
      "question": "What figure of speech is employed in the line: \"The arid winds of the Sahara wept bitterly over the abandoned village\"?",
      "options": [
        {
          "key": "A",
          "text": "Personification"
        },
        {
          "key": "B",
          "text": "Irony"
        },
        {
          "key": "C",
          "text": "Oxymoron"
        },
        {
          "key": "D",
          "text": "Euphemism"
        }
      ],
      "correct": "A",
      "explanation": "Personification attributes human qualities, emotions, or actions (weeping bitterly) to an inanimate or non-human entity (the arid wind).",
      "trapWarning": "Do not confuse personification with apostrophe (which directly addresses an absent person or entity).",
      "hint": "Wind given the human ability to weep.",
      "year": "JAMB 2024 Past Question",
      "topic": "Figures of Speech (Literary Devices)"
    },
    {
      "id": 802,
      "subject": "Literature",
      "question": "When a dramatic character speaks their private thoughts aloud on stage while completely alone, what theatrical convention is being utilized?",
      "options": [
        {
          "key": "A",
          "text": "Soliloquy"
        },
        {
          "key": "B",
          "text": "Aside"
        },
        {
          "key": "C",
          "text": "Dialogue"
        },
        {
          "key": "D",
          "text": "Chorus"
        }
      ],
      "correct": "A",
      "explanation": "A soliloquy is a dramatic convention where a character stands alone on stage and voices their intimate thoughts and dilemmas directly to the audience (e.g., Hamlet’s \"To be or not to be\").",
      "trapWarning": "An aside is spoken in the presence of other characters who are conventionally understood not to hear it.",
      "hint": "Soliloquy = Solo speech on stage.",
      "year": "JAMB 2024 Past Question",
      "topic": "Dramatic Conventions"
    },
    {
      "id": 803,
      "subject": "Literature",
      "question": "In tragedy, what Greek literary term denotes the protagonist’s fatal tragic flaw that precipitates their ultimate downfall?",
      "options": [
        {
          "key": "A",
          "text": "Hamartia"
        },
        {
          "key": "B",
          "text": "Catharsis"
        },
        {
          "key": "C",
          "text": "Hubris"
        },
        {
          "key": "D",
          "text": "Peripeteia"
        }
      ],
      "correct": "A",
      "explanation": "Hamartia is the inherent fatal tragic flaw (such as excessive ambition in Macbeth or indecisiveness in Hamlet) leading to the protagonist’s catastrophic downfall.",
      "trapWarning": "Hubris is a specific form of hamartia (excessive pride), while Catharsis is the purgation of pity and fear in the audience.",
      "hint": "Hamartia = Tragic flaw.",
      "year": "JAMB 2024 Past Question",
      "topic": "Dramatic Terms (Tragedy)"
    },
    {
      "id": 804,
      "subject": "Literature",
      "question": "A lyric poem consisting of fourteen lines with a strict rhyme scheme and iambic pentameter meter is called a:",
      "options": [
        {
          "key": "A",
          "text": "Sonnet"
        },
        {
          "key": "B",
          "text": "Ballad"
        },
        {
          "key": "C",
          "text": "Elegy"
        },
        {
          "key": "D",
          "text": "Ode"
        }
      ],
      "correct": "A",
      "explanation": "A sonnet is a 14-line poetic composition written in iambic pentameter, categorized into Shakespearean (ABAB CDCD EFEF GG) or Petrarchan/Italian (ABBAABBA CDECDE) forms.",
      "trapWarning": "Elegies mourn the dead and have flexible length; Ballads are narrative songs composed in quatrains.",
      "hint": "14 lines = Sonnet.",
      "year": "JAMB 2023 Past Question",
      "topic": "Poetic Forms"
    },
    {
      "id": 805,
      "subject": "Literature",
      "question": "Identify the figure of speech in the phrase: \"A deafening silence enveloped the auditorium.\"",
      "options": [
        {
          "key": "A",
          "text": "Oxymoron"
        },
        {
          "key": "B",
          "text": "Metaphor"
        },
        {
          "key": "C",
          "text": "Hyperbole"
        },
        {
          "key": "D",
          "text": "Simile"
        }
      ],
      "correct": "A",
      "explanation": "An oxymoron juxtaposes two contradictory or opposite terms side by side (\"deafening\" vs \"silence\") to achieve a striking rhetorical effect.",
      "trapWarning": "A paradox is a contradictory statement or situation, while an oxymoron is a direct pairing of contradictory words side by side.",
      "hint": "Two opposite words paired together.",
      "year": "JAMB 2023 Past Question",
      "topic": "Figures of Speech (Oxymoron)"
    },
    {
      "id": 806,
      "subject": "Literature",
      "question": "When the audience knows a crucial secret that other characters on stage are ignorant of, the literary device is:",
      "options": [
        {
          "key": "A",
          "text": "Dramatic irony"
        },
        {
          "key": "B",
          "text": "Situational irony"
        },
        {
          "key": "C",
          "text": "Verbal irony"
        },
        {
          "key": "D",
          "text": "Sarcasm"
        }
      ],
      "correct": "A",
      "explanation": "Dramatic irony occurs when the audience possesses knowledge of events, identities, or plots of which the characters on stage are blissfully unaware.",
      "trapWarning": "Verbal irony is when a speaker says the opposite of what they mean.",
      "hint": "Audience knows what character does not.",
      "year": "JAMB 2022 Past Question",
      "topic": "Literary Devices (Irony)"
    },
    {
      "id": 807,
      "subject": "Literature",
      "question": "A poem of lamentation written solemnly to mourn the demise of a deceased person is classified as an:",
      "options": [
        {
          "key": "A",
          "text": "Elegy"
        },
        {
          "key": "B",
          "text": "Epigram"
        },
        {
          "key": "C",
          "text": "Epitaph"
        },
        {
          "key": "D",
          "text": "Ode"
        }
      ],
      "correct": "A",
      "explanation": "An elegy is a mournful, contemplative poem lamenting the death of an individual or reflecting upon sorrow and mortality.",
      "trapWarning": "An epitaph is an inscription on a tombstone; an elegy is the complete mournful poem.",
      "hint": "Elegy = poem of mourning.",
      "year": "JAMB 2021 Past Question",
      "topic": "Poetry (Elegy)"
    },
    {
      "id": 808,
      "subject": "Literature",
      "question": "What figure of speech is demonstrated in: \"Milton! Thou shouldst be living at this hour\"?",
      "options": [
        {
          "key": "A",
          "text": "Apostrophe"
        },
        {
          "key": "B",
          "text": "Alliteration"
        },
        {
          "key": "C",
          "text": "Assonance"
        },
        {
          "key": "D",
          "text": "Metonymy"
        }
      ],
      "correct": "A",
      "explanation": "Apostrophe is a figure of speech in which a speaker directly addresses an absent person, a dead historical figure (Milton), or a personified abstract idea as if present.",
      "trapWarning": "Do not confuse the figure of speech \"apostrophe\" with the punctuation mark (’).",
      "hint": "Directly calling out to an absent or dead person.",
      "year": "JAMB 2020 Past Question",
      "topic": "Figures of Speech (Apostrophe)"
    },
    {
      "id": 809,
      "subject": "Literature",
      "question": "What figure of speech is demonstrated in the sentence: \"The courtroom was stunned when the convicted swindler claimed he was as honest as daylight\"?",
      "options": [
        {
          "key": "A",
          "text": "Irony"
        },
        {
          "key": "B",
          "text": "Euphemism"
        },
        {
          "key": "C",
          "text": "Litotes"
        },
        {
          "key": "D",
          "text": "Alliteration"
        }
      ],
      "correct": "A",
      "explanation": "Irony involves an outcome or statement that is contrary to what is expected. A convicted swindler calling himself honest as daylight is ironic.",
      "trapWarning": "Although \"as honest as daylight\" uses the word \"as\", the context in which a criminal claims innocence is situational/verbal irony.",
      "hint": "Contradiction between reality and claim.",
      "year": "JAMB 2022 Past Question",
      "topic": "Figures of Speech (Irony)"
    },
    {
      "id": 810,
      "subject": "Literature",
      "question": "What is the primary role of a \"Chorus\" in classical Greek and Elizabethan drama?",
      "options": [
        {
          "key": "A",
          "text": "To comment on moral themes, provide exposition, and reflect on the tragic action"
        },
        {
          "key": "B",
          "text": "To serve as comic relief between acts"
        },
        {
          "key": "C",
          "text": "To manage the stage lights and backstage costumes"
        },
        {
          "key": "D",
          "text": "To duel with the antagonist"
        }
      ],
      "correct": "A",
      "explanation": "The Chorus acts as an omniscient commentator and collective conscience, offering background exposition, moral reflections, and foreshadowing for the audience.",
      "trapWarning": "The chorus does not engage in physical action or stagehand management.",
      "hint": "Chorus provides moral commentary and exposition.",
      "year": "JAMB 2021 Past Question",
      "topic": "Dramatic Conventions"
    },
    {
      "id": 811,
      "subject": "Literature",
      "question": "In narrative fiction, what is a \"dynamic character\"?",
      "options": [
        {
          "key": "A",
          "text": "A character who undergoes significant internal moral or psychological growth during the story"
        },
        {
          "key": "B",
          "text": "A character who never changes from beginning to end"
        },
        {
          "key": "C",
          "text": "A minor character with only one dialogue line"
        },
        {
          "key": "D",
          "text": "The narrator’s alter ego"
        }
      ],
      "correct": "A",
      "explanation": "A dynamic character experiences substantial internal transformation, moral evolution, or maturity as a consequence of story events (as opposed to a static character who remains unchanged).",
      "trapWarning": "Static characters remain unchanged; dynamic characters change and develop.",
      "hint": "Dynamic = undergoes growth and transformation.",
      "year": "JAMB 2020 Past Question",
      "topic": "Characterisation in Prose"
    }
  ],
  "Novel": [
    {
      "id": 901,
      "subject": "Novel",
      "question": "In Kabir Alabi Garba’s \"The Lekki Headmaster\", what is the full name of the disciplined educator appointed to head Prestige Academy in Lekki, Lagos?",
      "options": [
        {
          "key": "A",
          "text": "Mr. Sylvester Oludare"
        },
        {
          "key": "B",
          "text": "Chief Adeleke"
        },
        {
          "key": "C",
          "text": "Mr. Samuel Johnson"
        },
        {
          "key": "D",
          "text": "Alhaji Danjuma"
        }
      ],
      "correct": "A",
      "explanation": "Mr. Sylvester Oludare is the veteran, uncompromising mainland educator who accepts the appointment as headmaster of Prestige Academy in the affluent Lekki Peninsula of Lagos.",
      "trapWarning": "Chief Adeleke is the proprietor and Board Chairman; Sylvester Oludare is the Headmaster.",
      "hint": "First name is Sylvester.",
      "year": "JAMB 2024 Past Question",
      "topic": "The Lekki Headmaster (Protagonist)"
    },
    {
      "id": 902,
      "subject": "Novel",
      "question": "In \"The Lekki Headmaster\", what immediate policy announced by Mr. Sylvester at the morning assembly ignited outrage among spoiled students and wealthy parents?",
      "options": [
        {
          "key": "A",
          "text": "A total ban on unauthorized smartphones and entertainment gadgets in classrooms"
        },
        {
          "key": "B",
          "text": "A 200% increase in boarding fees"
        },
        {
          "key": "C",
          "text": "Cancelling all sports and cultural festivals"
        },
        {
          "key": "D",
          "text": "Mandatory French language classes"
        }
      ],
      "correct": "A",
      "explanation": "Mr. Sylvester strictly outlawed unauthorized smartphones and gadgets during school hours to curb social media distractions and restore reading culture.",
      "trapWarning": "Sylvester focused on academic discipline and integrity, never on fees.",
      "hint": "Relates to smartphones and social media distractions.",
      "year": "JAMB 2024 Past Question",
      "topic": "The Lekki Headmaster (Discipline Policies)"
    },
    {
      "id": 903,
      "subject": "Novel",
      "question": "In \"The Lekki Headmaster\", who is Demilade Adeleke and what trouble does he initiate?",
      "options": [
        {
          "key": "A",
          "text": "The Board Chairman’s son who defied the smartphone rule and recorded viral videos during study hours"
        },
        {
          "key": "B",
          "text": "The head boy who won the National Olympiad"
        },
        {
          "key": "C",
          "text": "An external bursary auditor"
        },
        {
          "key": "D",
          "text": "A transfer student from Abuja"
        }
      ],
      "correct": "A",
      "explanation": "Demilade is the pampered son of Board Chairman Chief Adeleke; he flaunted his phone, created disruptions, and relied on his father’s wealth until Sylvester enforced discipline.",
      "trapWarning": "Demilade is a student and the Chairman’s son, not a staff member.",
      "hint": "Son of Chief Adeleke.",
      "year": "JAMB 2024 Past Question",
      "topic": "The Lekki Headmaster (Characters)"
    },
    {
      "id": 904,
      "subject": "Novel",
      "question": "What major academic achievement ultimately vindicated Mr. Sylvester’s strict policies before the Board and parents in \"The Lekki Headmaster\"?",
      "options": [
        {
          "key": "A",
          "text": "Prestige Academy won gold at the National Inter-School Academic Olympiad purely on merit"
        },
        {
          "key": "B",
          "text": "The school built an Olympic swimming pool"
        },
        {
          "key": "C",
          "text": "They won the Lagos State Football Cup"
        },
        {
          "key": "D",
          "text": "A foreign embassy awarded grants to all teachers"
        }
      ],
      "correct": "A",
      "explanation": "Students trained diligently under Sylvester and Teacher Bisi won the prestigious National Inter-School Academic Olympiad without examination malpractice, vindicating his integrity.",
      "trapWarning": "The competition was an Academic Olympiad, not sports.",
      "hint": "Academic Olympiad gold medal.",
      "year": "JAMB 2024 Past Question",
      "topic": "The Lekki Headmaster (Climax & Resolution)"
    },
    {
      "id": 905,
      "subject": "Novel",
      "question": "In Khadija Abubakar Jalli’s \"The Life Changer\", what was Omar’s official UTME score that prompted the family celebration in Chapter 1?",
      "options": [
        {
          "key": "A",
          "text": "180"
        },
        {
          "key": "B",
          "text": "210"
        },
        {
          "key": "C",
          "text": "230"
        },
        {
          "key": "D",
          "text": "275"
        }
      ],
      "correct": "C",
      "explanation": "Omar scored 230 points in his JAMB examination, securing him admission to study Law at Lafayette University.",
      "trapWarning": "Do not guess round figures like 250 or 200. The exact score stated in Chapter 1 is 230.",
      "hint": "Omar rushed home with 230 points.",
      "year": "JAMB 2023 Past Question",
      "topic": "The Life Changer (Plot & Setting)"
    },
    {
      "id": 906,
      "subject": "Novel",
      "question": "What is the dramatic irony surrounding Salma’s examination malpractice trial in \"The Life Changer\"?",
      "options": [
        {
          "key": "A",
          "text": "She cheated in a university course titled \"Moral Philosophy\""
        },
        {
          "key": "B",
          "text": "Her father was the chief invigilator"
        },
        {
          "key": "C",
          "text": "The exam was an open-book test"
        },
        {
          "key": "D",
          "text": "She had already scored 100% in continuous assessment"
        }
      ],
      "correct": "A",
      "explanation": "The irony is that Salma committed cheating and dishonest malpractice in an academic course titled \"Moral Philosophy\", which teaches ethical values.",
      "trapWarning": "Cheating in a course dedicated to morality represents dramatic irony.",
      "hint": "Morality course vs Cheating.",
      "year": "JAMB 2023 Past Question",
      "topic": "The Life Changer (Literary Devices)"
    },
    {
      "id": 907,
      "subject": "Novel",
      "question": "Who swindled Salma out of the money meant to bribe the Examination Malpractice Committee (EMC) in \"The Life Changer\"?",
      "options": [
        {
          "key": "A",
          "text": "Kabir"
        },
        {
          "key": "B",
          "text": "Habib"
        },
        {
          "key": "C",
          "text": "Labaran"
        },
        {
          "key": "D",
          "text": "Dabo"
        }
      ],
      "correct": "A",
      "explanation": "Kabir falsely claimed he was a member of the EMC, took the money from Salma, and squandered it at a local gambling den.",
      "trapWarning": "Habib and Labaran provided financial assistance; Kabir was the trickster who stole the money.",
      "hint": "Kabir gambled the money away.",
      "year": "JAMB 2023 Past Question",
      "topic": "The Life Changer (Characters)"
    },
    {
      "id": 908,
      "subject": "Novel",
      "question": "In \"The Life Changer\", what was the name of Salma’s roommate who was modest, religious, and always advised her against bad company?",
      "options": [
        {
          "key": "A",
          "text": "Tomilola"
        },
        {
          "key": "B",
          "text": "Ada"
        },
        {
          "key": "C",
          "text": "Ngozi"
        },
        {
          "key": "D",
          "text": "Salma herself"
        }
      ],
      "correct": "A",
      "explanation": "Tomilola was the level-headed, sensible roommate who constantly warned Salma about reckless campus behavior.",
      "trapWarning": "Salma ignored Tomilola’s advice and fell into trouble with Kolawole and Kabir.",
      "hint": "Tomilola was the sensible roommate.",
      "year": "JAMB 2022 Past Question",
      "topic": "The Life Changer (Roommates)"
    },
    {
      "id": 909,
      "subject": "Novel",
      "question": "In \"Sweet Sixteen\" by Bolaji Abdullahi, what special birthday gift did Mr. Bello give to his daughter Aliya on her 16th birthday?",
      "options": [
        {
          "key": "A",
          "text": "A personalized letter titled \"Letter to My Daughter\" containing 7 life lessons"
        },
        {
          "key": "B",
          "text": "An iPhone 12 Pro Max"
        },
        {
          "key": "C",
          "text": "A bank account debit card"
        },
        {
          "key": "D",
          "text": "A trip to London"
        }
      ],
      "correct": "A",
      "explanation": "Mr. Bello gave Aliya an inspiring intellectual gift: a booklet titled \"Letter to My Daughter\" to guide her through adolescence, body image, and peer pressure.",
      "trapWarning": "Mr. Bello gave moral and fatherly guidance rather than luxury electronics.",
      "hint": "Letter to My Daughter.",
      "year": "JAMB 2021 Past Question",
      "topic": "Sweet Sixteen (Major Themes)"
    },
    {
      "id": 910,
      "subject": "Novel",
      "question": "In \"The Last Days at Forcados High School\" by A.H. Mohammed, who broke into the school chemistry laboratory at night to steal valuable equipment?",
      "options": [
        {
          "key": "A",
          "text": "Jimi Solade"
        },
        {
          "key": "B",
          "text": "Wole Solade (Jimi’s troubled older brother)"
        },
        {
          "key": "C",
          "text": "Efua Coker"
        },
        {
          "key": "D",
          "text": "Anse"
        }
      ],
      "correct": "B",
      "explanation": "Wole broke into the chemistry laboratory to steal items to pay off gambling debts. Jimi took the blame to protect his brother until Wole finally confessed.",
      "trapWarning": "Jimi was suspected and suspended, but his brother Wole was the actual burglar.",
      "hint": "Wole Solade.",
      "year": "JAMB 2020 Past Question",
      "topic": "The Last Days at Forcados High School (Conflicts)"
    },
    {
      "id": 911,
      "subject": "Novel",
      "question": "In Kabir Alabi Garba’s \"The Lekki Headmaster\", what ethical dilemma does Teacher Bisi face during the school term?",
      "options": [
        {
          "key": "A",
          "text": "Torn between lucrative private tutoring for wealthy parents versus upholding the Headmaster’s strict code of honesty and merit"
        },
        {
          "key": "B",
          "text": "Applying for a visa to relocate abroad"
        },
        {
          "key": "C",
          "text": "Resigning to launch a catering company"
        },
        {
          "key": "D",
          "text": "Accusing the bursar of financial embezzlement"
        }
      ],
      "correct": "A",
      "explanation": "Teacher Bisi initially faces temptations to cater to wealthy parents for extra financial gratification, but Sylvester’s uncompromising integrity inspires her to commit fully to honest academic mentorship.",
      "trapWarning": "Bisi chose integrity and helped the students win the National Olympiad.",
      "hint": "Integrity vs lucrative shortcuts.",
      "year": "JAMB 2022 Past Question",
      "topic": "The Lekki Headmaster (Themes of Integrity)"
    },
    {
      "id": 912,
      "subject": "Novel",
      "question": "In \"The Life Changer\", what French greeting does little Bint teach her parents after her clever classroom display in Chapter 1?",
      "options": [
        {
          "key": "A",
          "text": "\"Comment ça va?\" (How are you?)"
        },
        {
          "key": "B",
          "text": "\"Bonjour tout le monde\""
        },
        {
          "key": "C",
          "text": "\"Au revoir\""
        },
        {
          "key": "D",
          "text": "\"Merci beaucoup\""
        }
      ],
      "correct": "A",
      "explanation": "In Chapter 1 of The Life Changer, Bint proudly shares how she questioned her French teacher and asked: \"Comment ça va?\" which means \"How are you?\".",
      "trapWarning": "Bint’s story in Chapter 1 sets the lighthearted family atmosphere before Ummi begins recounting university lessons.",
      "hint": "Comment ça va.",
      "year": "JAMB 2021 Past Question",
      "topic": "The Life Changer (Chapter 1 Exposition)"
    },
    {
      "id": 913,
      "subject": "Novel",
      "question": "In \"Sweet Sixteen\", how does Mr. Bello describe the phenomenon of \"peer pressure\" to Aliya?",
      "options": [
        {
          "key": "A",
          "text": "As an invisible force that compels adolescents to compromise their core values to feel accepted"
        },
        {
          "key": "B",
          "text": "As a mandatory requirement for popularity"
        },
        {
          "key": "C",
          "text": "As an exclusively negative psychological disorder"
        },
        {
          "key": "D",
          "text": "As something only boys experience"
        }
      ],
      "correct": "A",
      "explanation": "Mr. Bello discusses peer pressure as a subtle social force that leads teenagers into compromising their morals and identity for group acceptance, urging Aliya to build self-worth from within.",
      "trapWarning": "Mr. Bello advises independent thinking and self-confidence.",
      "hint": "Compromising values for group acceptance.",
      "year": "JAMB 2020 Past Question",
      "topic": "Sweet Sixteen (Peer Pressure & Identity)"
    }
  ]
};

// Massively expand question bank with authentic past questions across years
if (CBT_QUESTIONS_BANK['English']) {
  CBT_QUESTIONS_BANK['English'].push(...ADDITIONAL_ENGLISH_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Mathematics']) {
  CBT_QUESTIONS_BANK['Mathematics'].push(...ADDITIONAL_MATH_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Biology']) {
  CBT_QUESTIONS_BANK['Biology'].push(...ADDITIONAL_BIOLOGY_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Chemistry']) {
  CBT_QUESTIONS_BANK['Chemistry'].push(...ADDITIONAL_CHEMISTRY_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Physics']) {
  CBT_QUESTIONS_BANK['Physics'].push(...ADDITIONAL_PHYSICS_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Economics']) {
  CBT_QUESTIONS_BANK['Economics'].push(...ADDITIONAL_ECONOMICS_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Government']) {
  CBT_QUESTIONS_BANK['Government'].push(...ADDITIONAL_GOVERNMENT_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Literature']) {
  CBT_QUESTIONS_BANK['Literature'].push(...ADDITIONAL_LITERATURE_QUESTIONS);
}
if (CBT_QUESTIONS_BANK['Novel']) {
  CBT_QUESTIONS_BANK['Novel'].push(...ADDITIONAL_NOVEL_QUESTIONS);
}

// Merge Authentic Multi-Exam Past Questions Bank (WAEC, NECO, JAMB, Post-UTME 2020-2026)
Object.entries(MULTI_EXAM_PAST_QUESTIONS).forEach(([subj, questions]) => {
  if (CBT_QUESTIONS_BANK[subj]) {
    // Avoid duplicate IDs if already present
    const existingIds = new Set(CBT_QUESTIONS_BANK[subj].map((q) => q.id));
    const newQuestions = questions.filter((q) => !existingIds.has(q.id));
    CBT_QUESTIONS_BANK[subj].push(...newQuestions);
  } else {
    CBT_QUESTIONS_BANK[subj] = [...questions];
  }
});

export interface CbtMockExamState {
  registeredSubjects: string[];
  currentSubjectIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, Record<number, 'A' | 'B' | 'C' | 'D'>>;
  flagged: Record<string, Record<number, boolean>>;
  timeRemainingSeconds: number;
  isCompleted: boolean;
  scoreBreakdown?: {
    totalScore: number;
    subjectScores: { subject: string; score: number; maxScore: number; correctCount: number; totalCount: number }[];
    performanceTier: string;
    advice: string;
  };
}

export function getQuestionsForSubject(subject: string, year?: string, examBody?: string): CbtQuestion[] {
  const bank = CBT_QUESTIONS_BANK[subject] || CBT_QUESTIONS_BANK['English'] || [];
  
  const hasYearFilter = year && year !== 'All Years';
  const hasExamFilter = examBody && examBody !== 'All Exams';

  if (!hasYearFilter && !hasExamFilter) {
    return bank;
  }

  // Helper to match exam body
  const matchExam = (q: CbtQuestion) => {
    if (!hasExamFilter) return true;
    const bodyLower = examBody.toLowerCase();
    const qBody = (q.examBody || '').toLowerCase();
    const qYear = q.year.toLowerCase();
    if (bodyLower.includes('waec')) return qBody.includes('waec') || qYear.includes('waec');
    if (bodyLower.includes('neco')) return qBody.includes('neco') || qYear.includes('neco');
    if (bodyLower.includes('jamb')) return qBody.includes('jamb') || qYear.includes('jamb') || qYear.includes('utme');
    if (bodyLower.includes('post-utme') || bodyLower.includes('screening')) return qBody.includes('post') || qYear.includes('post') || qYear.includes('screening');
    return true;
  };

  // Helper to match year
  const matchYear = (q: CbtQuestion) => {
    if (!hasYearFilter) return true;
    return q.year.includes(year);
  };

  // 1. Try exact match for both year and exam body
  const exactMatches = bank.filter((q) => matchExam(q) && matchYear(q));
  if (exactMatches.length > 0) {
    return exactMatches;
  }

  // 2. If no exact match for both, try matching year first
  if (hasYearFilter) {
    const yearMatches = bank.filter((q) => matchYear(q));
    if (yearMatches.length > 0) {
      return yearMatches;
    }
  }

  // 3. Try matching exam body
  if (hasExamFilter) {
    const examMatches = bank.filter((q) => matchExam(q));
    if (examMatches.length > 0) {
      return examMatches;
    }
  }

  // Fallback if specific combo has fewer questions
  return bank;
}

export function calculateExamResults(
  registeredSubjects: string[],
  answers: Record<string, Record<number, 'A' | 'B' | 'C' | 'D'>>,
  year?: string,
  examBody?: string
) {
  let totalScoreScaled = 0;
  const subjectScores = registeredSubjects.map((subj) => {
    const questions = getQuestionsForSubject(subj, year, examBody);
    const subjAnswers = answers[subj] || {};
    let correctCount = 0;
    questions.forEach((q) => {
      if (subjAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const totalCount = questions.length || 1;
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
