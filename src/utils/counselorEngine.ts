/**
 * Counselor Chioma Intelligent Offline/Fallback Reasoning Engine
 * Handles full contextual Nigerian JAMB/WAEC/Admission logic with rate-limiting,
 * restrictions (inappropriate/exam fraud warnings), and offline awareness.
 */

export interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}

export interface CounselorResponse {
  reply: string;
  category?: string;
  isRestricted?: boolean;
}

// Maximum questions allowed per student per 10-minute window to avoid spam/overload
const RATE_LIMIT_KEY = 'chioma_rate_limit';
const MAX_QUESTIONS_PER_WINDOW = 30;
const WINDOW_DURATION_MS = 10 * 60 * 1000;

export function checkCounselorRateLimit(): { allowed: boolean; remaining: number; resetMinutes: number } {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let data: { count: number; windowStart: number } = raw
      ? JSON.parse(raw)
      : { count: 0, windowStart: now };

    if (now - data.windowStart > WINDOW_DURATION_MS) {
      data = { count: 0, windowStart: now };
    }

    if (data.count >= MAX_QUESTIONS_PER_WINDOW) {
      const resetMinutes = Math.max(1, Math.ceil((WINDOW_DURATION_MS - (now - data.windowStart)) / 60000));
      return { allowed: false, remaining: 0, resetMinutes };
    }

    return { allowed: true, remaining: MAX_QUESTIONS_PER_WINDOW - data.count, resetMinutes: 0 };
  } catch {
    return { allowed: true, remaining: 10, resetMinutes: 0 };
  }
}

export function recordCounselorQuestion(): void {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let data: { count: number; windowStart: number } = raw
      ? JSON.parse(raw)
      : { count: 0, windowStart: now };

    if (now - data.windowStart > WINDOW_DURATION_MS) {
      data = { count: 1, windowStart: now };
    } else {
      data.count += 1;
    }
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

/**
 * Filter out abusive queries, illegal exam expo requests, or non-educational spam.
 * CRITICAL: Strictly protects administrative passcodes, internal PINs, and monetization secrets.
 */
export function checkMessageRestrictions(message: string): { restricted: boolean; response?: string } {
  const lower = message.toLowerCase().trim();

  // 1. Strict Secret & Admin Protection (Zero leak of PIN 017014, Monetag earnings, or internal controls)
  if (
    lower.includes('secret') ||
    lower.includes('pin') ||
    lower.includes('passcode') ||
    lower.includes('admin') ||
    lower.includes('017014') ||
    lower.includes('password') ||
    lower.includes('monetag') ||
    lower.includes('revenue') ||
    lower.includes('balance') ||
    (lower.includes('how much') && (lower.includes('earn') || lower.includes('make') || lower.includes('profit'))) ||
    lower.includes('system prompt') ||
    lower.includes('instruction') ||
    lower.includes('developer') ||
    lower.includes('backdoor')
  ) {
    return {
      restricted: true,
      response:
        "Hello scholar! 😊 I am Counselor Chioma, an academic advisor dedicated strictly to helping candidates with admission clearance, 100L courses, screening documents, and study plans.\n\n" +
        "I do not possess or disclose administrative passcodes, internal system configurations, or developer credentials.\n\n" +
        "How can I help you with your university clearance, 100L CGPA target, or faculty documents today?",
    };
  }

  // 2. Cheating / Expo / Malpractice restriction
  if (
    lower.includes('expo') ||
    lower.includes('runz') ||
    lower.includes('leak question') ||
    lower.includes('hack jamb') ||
    lower.includes('upgrade score') ||
    lower.includes('change my jamb result') ||
    lower.includes('cheat')
  ) {
    return {
      restricted: true,
      response:
        "⚠️ **Official Policy & Ethics Warning:**\n" +
        "Counselor Chioma does NOT assist with exam runs, expo, illegal score upgrades, or malpractice.\n\n" +
        "JAMB uses centralized biometric verification and CBT computer algorithms — anyone claiming they can 'upgrade' your score is a scammer looking to steal your money.\n\n" +
        "You can gain admission genuinely! Ask me about syllabus topics, official 4-subject combinations, past questions, or realistic cutoff marks for your chosen institution.",
    };
  }

  // 3. Vulgarity / Abusive spam check
  const vulgarWords = ['fool', 'idiot', 'bastard', 'fuck', 'stupid', 'mad', 'nonsense', 'mumu'];
  const hasOnlyAbuse = vulgarWords.some((w) => lower === w || lower === `${w}!`);
  if (hasOnlyAbuse) {
    return {
      restricted: true,
      response:
        "Calm down, scholar! 😊 I am here to genuinely help you secure university admission without stress.\n\n" +
        "What course, JAMB score, or university do you want us to analyze together right now?",
    };
  }

  return { restricted: false };
}

/**
 * Deep, context-aware rule-based reasoning when offline or when API is unreachable.
 * Reads previous messages (history) so questions like "Why", "How", "Tell me more" make complete sense!
 */
export function generateSmartCounselorReply(
  userMessage: string,
  history: ChatHistoryItem[] = []
): string {
  const query = userMessage.trim();
  const lower = query.toLowerCase();

  // Find the last topic discussed from recent history
  const recentUserTexts = history
    .filter((h) => h.role === 'user')
    .slice(-3)
    .map((h) => h.content.toLowerCase())
    .join(' ');
  const recentModelTexts = history
    .filter((h) => h.role === 'model')
    .slice(-2)
    .map((h) => h.content.toLowerCase())
    .join(' ');
  const context = `${recentUserTexts} ${recentModelTexts}`;

  // 0A. FUMMSA (Federal University of Medicine and Medical Sciences, Abeokuta) Guidance
  if (
    lower.includes('fummsa') ||
    (lower.includes('abeokuta') && (lower.includes('medicine') || lower.includes('medical') || lower.includes('admission') || lower.includes('clearance')))
  ) {
    return (
      "🏥 **FUMMSA Abeokuta — 100L Freshers & Clearance Guide:**\n\n" +
      "Congratulations on your admission to the Federal University of Medicine and Medical Sciences, Abeokuta (FUMMSA)!\n\n" +
      "**1. Physical Clearance Documents You Must Bring:**\n" +
      "• Original JAMB Admission Letter (Colored — Candidate & Institution copies)\n" +
      "• JAMB Original Result Slip with photograph\n" +
      "• O'Level Result (WAEC/NECO) + fresh unused Scratch Card Pin for verification\n" +
      "• FUMMSA Acceptance Fee Payment Receipt (via Remita)\n" +
      "• Birth Certificate or NPC Age Declaration\n" +
      "• Local Government (LGA) Identification Certificate\n" +
      "• Medical Fitness Certificate & Lab Test Report (Blood Group, Genotype, Urinalysis, Chest X-Ray)\n" +
      "• Two (2) Attestation/Reference letters (from Clergy, Lawyer, or Senior Civil Servant)\n" +
      "• 8–12 Passport photographs (white background)\n\n" +
      "**2. 100L MBBS & Health Sciences Academic Targets:**\n" +
      "In 100L, you will write General Biology (BIO 101/102), Chemistry (CHM 101/102), Physics (PHY 101/102), and GST courses. To remain safe in Medicine & Surgery (MBBS) or Pharmacy, target a 4.5+ CGPA on the 5.0 scale!\n\n" +
      "Check our **Freshers Hub** tab to tick off your clearance checklist and calculate your 100L CGPA!"
    );
  }

  // 0B. University Screening Documents & Physical Clearance Queries
  if (
    lower.includes('clearance') ||
    lower.includes('screening document') ||
    lower.includes('physical screening') ||
    lower.includes('documents to carry') ||
    lower.includes('what documents') ||
    lower.includes('screening day')
  ) {
    return (
      "📋 **Official University Physical Screening Checklist for Freshers:**\n\n" +
      "When travelling to campus for screening, prepare **3 photocopies of each** in 3 separate office file jackets:\n\n" +
      "1. **JAMB Original Admission Letter:** Colored printout from portal.jamb.gov.ng\n" +
      "2. **JAMB Result Slip:** Showing your passport photograph and full score breakdown\n" +
      "3. **O'Level Result & Scratch Card:** WAEC/NECO/NABTEB slip plus a new verification scratch card for the screening officer\n" +
      "4. **Acceptance Fee Receipt:** University Remita RRR receipt\n" +
      "5. **Birth Certificate / NPC Age Declaration:** High Court affidavit or National Population Commission cert\n" +
      "6. **LGA Certificate of Origin:** Proving your catchment/state eligibility\n" +
      "7. **Medical Fitness Report:** Including blood group, genotype, and chest X-ray\n" +
      "8. **Reference / Attestation Letters:** 2 copies on official letterhead\n" +
      "9. **Passports:** 8–12 copies with your name and JAMB reg number written on the back\n\n" +
      "You can tick these off live inside our **Freshers Hub** tab!"
    );
  }

  // 0C. 100L CGPA / First Class / 5.0 Scale Advice
  if (
    lower.includes('cgpa') ||
    lower.includes('gpa') ||
    lower.includes('first class') ||
    lower.includes('5.0') ||
    lower.includes('grade point') ||
    lower.includes('quality point') ||
    lower.includes('carryover')
  ) {
    return (
      "📊 **100L CGPA & First Class Target Guide (5.0 Scale):**\n\n" +
      "• **Grading Scale in Nigerian Universities:**\n" +
      "  - A (70–100%) = 5 Points\n" +
      "  - B (60–69%) = 4 Points\n" +
      "  - C (50–59%) = 3 Points\n" +
      "  - D (45–49%) = 2 Points\n" +
      "  - E (40–44%) = 1 Point\n" +
      "  - F (0–39%) = 0 Points (Carryover!)\n\n" +
      "• **How CGPA is Calculated:**\n" +
      "  Multiply each course grade point by its credit units (e.g. A in 3-unit BIO 101 = 15 quality points). Divide Total Quality Points by Total Credit Units.\n\n" +
      "• **Honours Classes:**\n" +
      "  - 4.50 – 5.00: First Class Honours (MBBS Distinction)\n" +
      "  - 3.50 – 4.49: Second Class Upper (2:1)\n" +
      "  - 2.40 – 3.49: Second Class Lower (2:2)\n\n" +
      "💡 *Tip:* 100 Level is where you build your cushion! Never miss Continuous Assessment (CA) tests — they count for 30–40% of your total score!"
    );
  }

  // 0D. JAMB CAPS Acceptance & Acceptance Fee Payment
  if (
    lower.includes('caps') ||
    lower.includes('accept admission') ||
    lower.includes('acceptance fee') ||
    lower.includes('admission letter') ||
    lower.includes('remita')
  ) {
    return (
      "📑 **How to Accept Admission on JAMB CAPS & Pay Acceptance Fee:**\n\n" +
      "1. **Check CAPS on Phone:** Go to `portal.jamb.gov.ng/efacility`. Switch Chrome/browser to **'Desktop site'**.\n" +
      "2. **Check Admission Status:** Click 'Check Admission Status' &rarr; 'Access My CAPS'.\n" +
      "3. **Accept Prompt:** If admitted, click **'ACCEPT ADMISSION'** (never click Reject!).\n" +
      "4. **Print Colored Admission Letter:** Print both the Candidate and Institution copies.\n" +
      "5. **Pay University Acceptance Fee:** Log in to your university portal, generate your Remita RRR invoice, and pay via debit card or commercial bank before the deadline.\n\n" +
      "Keep all printed receipts in your physical clearance folder!"
    );
  }

  // 1. Handle short contextual follow-ups ("Why", "Why?", "How", "Explain", "What if", "Really")
  if (
    lower === 'why' ||
    lower === 'why?' ||
    lower === 'how' ||
    lower === 'how?' ||
    lower.startsWith('why ') ||
    lower === 'explain' ||
    lower === 'tell me more'
  ) {
    if (context.includes('nurs') || context.includes('med') || context.includes('doctor')) {
      return (
        "Here is why: Medicine & Surgery and Nursing Science are the most applied-for courses in Nigeria.\n\n" +
        "1. **Strict NUC & MDCN Quota:** The Medical and Dental Council of Nigeria caps each university's intake (e.g., UNILAG can only admit around 150 medicine students per year, while over 10,000 apply).\n" +
        "2. **Massive Competition:** Top applicants typically score between 280 and 340 in JAMB and 75%+ in Post-UTME.\n" +
        "3. **What You Should Do:** If your score is around 220–250, shift focus to state universities (like LASU, OOU, DELSU) or related health sciences (Medical Lab Science, Physiology, Anatomy, or Public Health) where admission is much more realistic!"
      );
    }

    if (context.includes('law')) {
      return (
        "Here is why: The Council of Legal Education strictly regulates law admissions in Nigeria.\n\n" +
        "1. **Literature in English is Non-Negotiable:** Candidates without Literature in English in both JAMB and WAEC are disqualified automatically, regardless of high scores.\n" +
        "2. **High Post-UTME Benchmarks:** UNILAG, UI, and OAU typically require an aggregate score above 72% for Law.\n" +
        "3. **Alternative:** If your score is 200–240, check out State Universities or related courses like Criminology, Political Science, or International Relations."
      );
    }

    if (context.includes('comp') || context.includes('software') || context.includes('cyber')) {
      return (
        "Here is why: Computer Science is currently the #1 most competitive non-medical course in Nigeria.\n\n" +
        "1. **Maths & Physics Compulsory:** You cannot substitute Commercial or Arts subjects in JAMB.\n" +
        "2. **Federal vs State:** Federal schools like FUTA, UNILAG, and UNN receive thousands of applications. Top candidates average 240–290+.\n" +
        "3. **Polytechnic Advantage:** Top polytechnics like YABATECH and Federal Poly Ilaro admit 160–190 and allow you to transition directly to 200 Level in university via Direct Entry."
      );
    }

    if (context.includes('150') || context.includes('160') || context.includes('170') || context.includes('180') || context.includes('190') || context.includes('low')) {
      return (
        "Here is why low JAMB scores (150–190) fail at top Federal universities:\n\n" +
        "• Most Federal Universities set their general cutoff at 200, automatically screening out scores below that.\n" +
        "• **However, you are NOT stranded!** You have 3 viable paths:\n" +
        "  1. **Accredited State Universities** (e.g., TASUED, EKSU, AAUA, FUOYE for certain faculties).\n" +
        "  2. **Top Polytechnics** (YABATECH, Poly Ilaro, Auchi) for National Diploma (ND) leading to 200L Direct Entry.\n" +
        "  3. **Direct Entry Foundations** (JUPEB or IJMB) which bypass JAMB entirely."
      );
    }

    return (
      "Here is the detailed reason:\n\n" +
      "Admission into Nigerian higher institutions is determined by three official pillars:\n" +
      "1. **Merit (45%)**: Highest aggregate scorers nationwide.\n" +
      "2. **Catchment Area (35%)**: Candidates from the university's geographic zone.\n" +
      "3. **Educationally Less Developed States (ELDS) (20%)**: Candidates from designated development states.\n\n" +
      "Tell me your specific score, course, and state of origin, and I will calculate your exact chances!"
    );
  }

  // 2. Greetings & Salutations
  if (
    lower === 'hi' ||
    lower === 'hello' ||
    lower.startsWith('hi ') ||
    lower.startsWith('hello ') ||
    lower === 'hey' ||
    lower.includes('how far') ||
    lower.includes('good morning') ||
    lower.includes('good afternoon') ||
    lower.includes('good evening')
  ) {
    return (
      "Hello scholar! I am Counselor Chioma, your Admissions Advisor. How is your preparation going?\n\n" +
      "Tell me the course, university, or score you have in mind, and I will give you the exact 4 JAMB subjects, safe cut-off benchmark, and admission strategy right now!"
    );
  }

  // 3. Health Sciences & Medicine
  if (lower.includes('nurs') || lower.includes('med') || lower.includes('pharm') || lower.includes('doctor')) {
    return (
      "📋 **Official Health Sciences & Medicine Guide (2026/2027):**\n\n" +
      "• **Compulsory 4 JAMB Subjects:** English Language, Biology, Chemistry, Physics.\n" +
      "• **O'Level Requirements:** Minimum 5 Credits (English, Maths, Biology, Chemistry, Physics) in **ONE sitting** for UNILAG, UI, UNIBEN, OAU.\n" +
      "• **Safe UTME Benchmarks:** 250+ for Nursing, 275+ for Medicine & Surgery.\n" +
      "• **Smart Alternatives:** Medical Laboratory Science, Physiology, Anatomy, or Nursing in top State Universities (LASU, OOU, DELSU) if your score is 210–245."
    );
  }

  // 4. Law
  if (lower.includes('law') || lower.includes('ll.b') || lower.includes('barrister')) {
    return (
      "⚖️ **Official Law (LL.B) Guidelines:**\n\n" +
      "• **Compulsory 4 JAMB Subjects:** English Language, Literature in English, Government/History, and any Arts or Social Science subject (e.g. CRS/IRS, Economics).\n" +
      "• **Strict Warning:** Candidates who write JAMB without Literature in English are automatically disqualified from Law across ALL universities in Nigeria.\n" +
      "• **Safe UTME Score:** 260+ for Federal Universities (UNILAG, UI, OAU, UNN), 235+ for State Universities."
    );
  }

  // 5. Tech / Computer Science / Engineering
  if (
    lower.includes('comp') ||
    lower.includes('software') ||
    lower.includes('cyber') ||
    lower.includes('engineering') ||
    lower.includes('mechanical') ||
    lower.includes('electrical')
  ) {
    return (
      "💻 **Official Engineering & Computer Science Guidelines:**\n\n" +
      "• **Compulsory 4 JAMB Subjects:** English Language, Mathematics, Physics, and Chemistry.\n" +
      "• **Top Federal Tech Schools:** FUTA, UNILAG, UNN, FUTMINNA, Covenant University.\n" +
      "• **Top Practical Polytechnics:** Yaba College of Technology (YABATECH), Federal Poly Ilaro.\n" +
      "• **Safe Benchmarks:** 230+ for Federal Universities, 160+ for Polytechnics (ND/HND)."
    );
  }

  // 6. Low Scores (140 - 199)
  if (
    lower.includes('140') ||
    lower.includes('150') ||
    lower.includes('160') ||
    lower.includes('170') ||
    lower.includes('180') ||
    lower.includes('190') ||
    lower.includes('low score')
  ) {
    return (
      "🎯 **Strategic Action Plan for Scores Between 140 and 199:**\n\n" +
      "1. **Apply to Accredited Polytechnics:** Top schools like YABATECH, Federal Poly Ilaro, and Auchi Poly accept 150–180. An ND with Upper Credit qualifies you for 200 Level Direct Entry in university.\n" +
      "2. **Target State Universities:** Many State Universities (e.g., TASUED, EKSU, AAUA, OOU) have cut-offs starting around 160–180 for non-competitive courses.\n" +
      "3. **Change of Course Strategy:** Shift from over-subscribed courses (Medicine, Law) to high-value alternatives like Science Laboratory Tech, Biochemistry, or Educational Management."
    );
  }

  // 7. Student Finances, Monetag, PayPal, and 16 Years Old in Nigeria
  if (
    lower.includes('monetag') ||
    lower.includes('paypal') ||
    (lower.includes('16') && (lower.includes('bank') || lower.includes('dollar') || lower.includes('earn') || lower.includes('withdraw') || lower.includes('money')))
  ) {
    return (
      "💵 **Online Earnings & Banking Advice for 16-Year-Old Students:**\n\n" +
      "1. **The 18+ Age Policy:** Under international regulations and CBN rules, opening an independent PayPal account or standard commercial bank account requires being 18 years old with verified BVN and NIN.\n" +
      "2. **How to Withdraw Your Monetag Earnings ($5+):**\n" +
      "   • Speak to your parents, older sibling, or trusted legal guardian.\n" +
      "   • Link their verified PayPal or bank account to receive and disburse the money to you safely.\n" +
      "3. **Focus on Your Studies:** While learning web monetisation and tech skills at 16 is impressive, your primary focus right now should be clearing your JAMB UTME and WAEC with top grades. That opens up university scholarships and true long-term financial independence!"
    );
  }

  // 8. Age Requirements for Nigerian Higher Institutions
  if (lower.includes('age') || lower.includes('16 year') || lower.includes('16yr') || lower.includes('underage')) {
    return (
      "🎂 **Official University Age Benchmark in Nigeria:**\n\n" +
      "• **Minimum Admission Age:** The standard regulatory age benchmark set by the National Universities Commission (NUC) and JAMB is **16 years old** in the year of admission.\n" +
      "• **Federal University Screening:** UNILAG, UI, UNIBEN, and OAU strictly enforce that candidates must be at least 16 by September/October of the admission year.\n" +
      "• **Good News:** If you are currently 16 or turning 16 this year, you are eligible to register, sit for JAMB UTME, and gain admission without age hindrance!"
    );
  }

  // 9. The Lekki Headmaster Novel Queries
  if (lower.includes('lekki') || lower.includes('headmaster') || lower.includes('oludare') || lower.includes('prestige academy')) {
    return (
      "📖 **The Lekki Headmaster (by Kabir Alabi Garba) Study Summary:**\n\n" +
      "• **Protagonist:** Mr. Sylvester Oludare, an uncompromising, principled veteran educator posted to lead Prestige Academy in Lekki, Lagos.\n" +
      "• **Setting:** The affluent Lekki Peninsula, highlighting the clash between opulent privilege and moral discipline.\n" +
      "• **Core Conflict:** Sylvester institutes strict smartphone bans and integrity policies, clashing with the commercial interests of the Board Chairman (Chief Adeleke) and pampered students like Demilade.\n" +
      "• **Climax:** Sylvester dismantles an external mock exam malpractice syndicate and leads his disciplined students to win the National Inter-School Academic Olympiad on pure merit.\n" +
      "• **JAMB Focus:** Expect questions on characters (Sylvester, Bisi, Chief Adeleke, Demilade), themes of anti-malpractice, and the Sylvester Oludare Character Award."
    );
  }

  // 10. The Life Changer Novel Queries
  if (lower.includes('life changer') || lower.includes('salma') || lower.includes('ummi') || lower.includes('omar')) {
    return (
      "📖 **The Life Changer (by Khadija Abubakar Jalli) Revision Summary:**\n\n" +
      "• **Narrator:** Ummi telling moral campus tales to her children (Omar, Teemah, Jamila, Bint) as Omar celebrates his 230 JAMB score for Law.\n" +
      "• **Central Character:** Salma at Lafayette University, whose pursuit of freedom and materialism leads her to cheat in Moral Philosophy.\n" +
      "• **Examination Malpractice Irony:** Salma cheats using notes from Kolawole Abdul, tries to bribe the Malpractice Committee via Kabir (who gambles the money away), and is expelled.\n" +
      "• **Key Lesson:** Integrity, consequences of peer pressure, and humility in higher institutions."
    );
  }

  // 11. CBT 8-Key Navigation System
  if (lower.includes('8-key') || lower.includes('keyboard') || lower.includes('shortcut') || lower.includes('mouse') || lower.includes('navigation')) {
    return (
      "⌨️ **Official JAMB 8-Key Keyboard System (Zero Mouse Needed):**\n\n" +
      "• **A, B, C, D:** Choose corresponding options.\n" +
      "• **N:** Move to the Next question.\n" +
      "• **P:** Move to the Previous question.\n" +
      "• **S:** Submit exam (requires secondary confirmation).\n" +
      "• **R:** Reverse / Clear selected option.\n" +
      "Using the 8-key system saves you up to 25 minutes of mouse dragging during the 2-hour exam!"
    );
  }

  // 12. Negative marking & exam strategy
  if (lower.includes('negative mark') || lower.includes('guess') || lower.includes('time management')) {
    return (
      "⏱️ **JAMB UTME Time Management & Scoring Secrets:**\n\n" +
      "1. **NO Negative Marking:** JAMB never deducts marks for wrong answers. NEVER leave any question unanswered! If running out of time, make an educated guess.\n" +
      "2. **Total Time:** 2 Hours (120 Minutes) for 180 Questions across 4 subjects.\n" +
      "3. **Time Breakdown:** Allocate 40 mins to English (60 questions), and 25-27 mins each to your other 3 subjects (40 questions each).\n" +
      "4. **Speed Rule:** If a calculation takes longer than 60 seconds, flag it and move on. Return to it after securing simple theory and definitions."
    );
  }

  // 13. Exam dates / Timetables
  if (
    lower.includes('date') ||
    lower.includes('when') ||
    lower.includes('timetable') ||
    lower.includes('schedule') ||
    lower.includes('calendar')
  ) {
    return (
      "📅 **National Examination Schedule (2026/2027 Academic Session):**\n\n" +
      "• **JAMB UTME:** Registration January–February; Mock CBT in March; Main National Examination in April.\n" +
      "• **WAEC SSCE:** May/June annually.\n" +
      "• **NECO SSCE:** June/July annually.\n" +
      "• **Post-UTME Screening:** July through October annually.\n\n" +
      "Check the **Exam Dates** tab on our portal for live countdown clocks to your exact exam date!"
    );
  }

  // 14. O'Level sittings / WAEC / NECO combination
  if (
    lower.includes('sitting') ||
    lower.includes('waec') ||
    lower.includes('neco') ||
    lower.includes('combine') ||
    lower.includes("o'level") ||
    lower.includes('olevel')
  ) {
    return (
      "📝 **Official O'Level Sittings & Subject Rules:**\n\n" +
      "• **One-Sitting Mandate:** UNILAG, UI, UNIBEN, and OAU strictly insist on ONE sitting (5 credits at once) for Medicine, Pharmacy, and Law.\n" +
      "• **Two-Sittings Acceptance:** Most State Universities (LASU, OOU, DELSU) and ALL Polytechnics accept TWO sittings (WAEC + NECO combined).\n" +
      "• **Core Rule:** You must have at least 5 credit passes including English Language and Mathematics."
    );
  }

  // 15. Catchment area
  if (lower.includes('catchment') || lower.includes('quota') || lower.includes('state of origin')) {
    return (
      "🌍 **How Catchment Area Advantage Works:**\n\n" +
      "Federal Universities in Nigeria reserve **35% of their total admission capacity** strictly for candidates whose State of Origin is within their geographical catchment zone.\n\n" +
      "• **Example:** For UNILAG, candidates from Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti receive lower merit cut-offs than candidates from other states.\n" +
      "• **Tip:** Always verify your Local Government (LGA) Identification Certificate so your catchment status is validated during Post-UTME screening."
    );
  }

  // 16. Default adaptive response
  return (
    `Hello scholar! I hear you regarding "${query.slice(0, 45)}".\n\n` +
    "To help you achieve the best outcome:\n" +
    "1. Tell me what course or institution you are targeting\n" +
    "2. Your current JAMB or target mock score\n" +
    "3. Any specific challenge (e.g. calculation speed, subject combos, admissions cut-offs)\n\n" +
    "Let me know and I will give you exact guidance tailored to your academic journey!"
  );
}
