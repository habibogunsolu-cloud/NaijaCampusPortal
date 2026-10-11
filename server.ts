import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Counselor AI Chat Endpoint with gemini-3.8-flash
app.post('/api/counselor', async (req, res) => {
  const msg = (req.body?.message || '').trim().toLowerCase();
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Restrictions check (expo, runs, hacking, abuse)
  if (
    msg.includes('expo') ||
    msg.includes('runz') ||
    msg.includes('upgrade score') ||
    msg.includes('hack') ||
    msg.includes('leak question') ||
    msg.includes('cheat')
  ) {
    return res.json({
      reply: "⚠️ **Official Policy Notice:** Counselor Chioma does NOT assist with exam runs, expo, or illegal score upgrades. JAMB CBT scores cannot be altered externally. Focus on syllabus mastery, official 4-subject combos, and genuine cutoff benchmarks!",
    });
  }

  try {
    const systemInstruction = `You are Counselor Chioma, an elite, warm, highly knowledgeable Nigerian university, polytechnic & JAMB admissions advisor for Nigerian students and candidates for the 2026/2027 academic session.
CRITICAL INSTRUCTIONS:
1. ALWAYS respond directly and contextually to ANY message or question the student sends! Never give a generic template if they ask a specific question.
2. If they ask follow-ups ("Why", "How", "What do you mean?", "What if", etc.), answer based on conversation history.
3. If they ask about money/earnings (like Monetag, PayPal, or bank accounts at age 16 in Nigeria): explain kindly that in Nigeria, international payment platforms like PayPal and independent commercial bank accounts require being 18+ (with BVN/NIN). A 16-year-old student can legally receive funds through a trusted parent or guardian's bank/PayPal account, or use parent-guided teen accounts. Encourage them to stay focused on their studies.
4. If they ask about the age requirement for JAMB/universities: explain that the Federal Ministry of Education set guidelines regarding age 16 for university admission eligibility, and emphasize preparing well for their UTME.
5. RESTRICTIONS & POLICY:
   - Strictly refuse any requests for exam runs, expo, hacking JAMB, or illegal score upgrades. Tell them firmly but politely that JAMB CBT is automated and secure, and anyone offering score upgrade is a scammer.
   - Maintain a friendly, supportive Nigerian sisterly mentor tone ("scholar", "my friend").
Keep responses concise, clear, and easy to read on mobile.`;

    const contents = [
      ...(history || []).slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    // 8-second timeout safeguard to allow standard Gemini generation without hanging
    const timeoutPromise = new Promise<{ text: string }>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 8000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const response = (await Promise.race([apiPromise, timeoutPromise])) as { text?: string };
    const reply = response.text || "Hello scholar! How is your exam preparation going? Tell me what course, score, or institution you are targeting, and I will give you the exact 4 JAMB subjects, cut-off marks, and admission strategy right now.";

    res.json({ reply });
  } catch {
    // Intelligent contextual fallback when network/API is unavailable
    let smartReply = `Hello scholar! I hear you regarding "${message}". Tell me more about what you need assistance with — whether it is choosing your 4 JAMB subjects, calculating your cut-off aggregate, study schedules, or institution advice!`;

    const recentHistory = (history || []).map((h: any) => h.content || '').join(' ').toLowerCase();

    // 16 years old / monetag / paypal / student finances
    if (msg.includes('16') && (msg.includes('paypal') || msg.includes('bank') || msg.includes('earn') || msg.includes('monetag') || msg.includes('dollar') || msg.includes('money'))) {
      smartReply = "Here is practical advice regarding online earnings (Monetag/PayPal) at age 16 in Nigeria:\n\n• **Age Restriction:** PayPal and Nigerian commercial banks require users to be at least 18 years old to own an independent account with BVN and NIN verification.\n• **How to Withdraw Legally:** You can have a trusted parent, older sibling, or legal guardian connect their verified PayPal or local bank account to receive the funds for you.\n• **Important Reminder:** Keep your priority on your upcoming examinations (JAMB UTME / WAEC). Building digital skills is great, but getting your university admission secured gives you the best long-term foundation!";
    } else if (msg.includes('age') || msg.includes('16 year') || msg.includes('16yr') || msg.includes('underage')) {
      smartReply = "Regarding Age Requirements for Nigerian Universities:\n• Official NUC / JAMB benchmark expects candidates to be at least 16 years of age by admission year.\n• Top federal institutions (UNILAG, UI, UNIBEN) strictly enforce the 16-year age minimum at screening.\n• If you are 16 or turning 16, you are qualified to write JAMB and gain admission!";
    } else if (msg === 'why' || msg === 'why?' || msg === 'how' || msg === 'how?' || msg.startsWith('why ')) {
      if (recentHistory.includes('nurs') || recentHistory.includes('med')) {
        smartReply = "Here is why Medicine & Nursing have such high cut-offs:\n• High Demand: Over 10,000 applicants compete for just 100-150 NUC/MDCN accredited slots per federal university.\n• High Merit Filter: UNILAG, UI, and UNIBEN receive candidates scoring 280-330+.\n• Solution: If your score is 220-250, choose State Universities (e.g. LASU, OOU) or related courses like Medical Lab Science, Physiology, or Anatomy.";
      } else if (recentHistory.includes('law')) {
        smartReply = "Here is why: The Council of Legal Education strictly regulates intake. Without Literature in English in both JAMB and WAEC, candidates are automatically disqualified, and federal merit aggregates regularly exceed 70%.";
      } else if (recentHistory.includes('comp') || recentHistory.includes('software')) {
        smartReply = "Here is why: Computer Science is currently Nigeria's most subscribed science course. Federal schools enforce strict Mathematics & Physics prerequisites, leaving little room for lower UTME scores.";
      } else {
        smartReply = "Here is why: Admission into Nigerian higher institutions is strictly determined by NUC capacity quotas, Merit (45%), Catchment Area (35%), and Educationally Less Developed States (20%). Tell me your specific score, course, and state to give you an exact calculation!";
      }
    } else if (msg === 'hi' || msg === 'hello' || msg.startsWith('hi ') || msg.startsWith('hello ') || msg === 'hey' || msg.includes('how far') || msg.includes('good morning') || msg.includes('good afternoon') || msg.includes('good evening')) {
      smartReply = "Hello there scholar! I am Counselor Chioma, your Admissions Advisor. How is your exam preparation going? Tell me the course or university you have in mind, and I'll give you the exact subject combinations, safe cut-off score, and admission tricks!";
    } else if (msg.includes('nurs') || msg.includes('med')) {
      smartReply = "For Nursing & Medicine in Nigeria:\n• 4 JAMB Subjects: English, Biology, Chemistry, Physics.\n• WAEC: 5 credits in ONE sitting for UNILAG, UI, UNIBEN, OAU.\n• Safe UTME score: 250+ for Nursing, 275+ for Medicine.\n• Alternative: Medical Lab Science, Physiology, or Anatomy if your score is 210-245.";
    } else if (msg.includes('law')) {
      smartReply = "For Law (LL.B) in Nigeria:\n• 4 JAMB Subjects: English, Literature in English, Government, and any Arts/Social Science subject.\n• Critical Warning: Candidates without Literature in English are immediately disqualified.\n• Safe UTME score: 260+ for Federal Universities (UNILAG, UI, OAU, UNN).";
    } else if (msg.includes('comp') || msg.includes('software') || msg.includes('cyber')) {
      smartReply = "For Computer Science / Software Engineering / Cybersecurity:\n• 4 JAMB Subjects: English, Mathematics, Physics, and Chemistry.\n• Top choices: UNILAG, FUTA, UNN, LASU, and YABATECH (for ND/HND).\n• Minimum benchmark: 210+ for competitive Federal Universities, 160+ for Polytechnics.";
    } else if (msg.includes('date') || msg.includes('when') || msg.includes('timetable') || msg.includes('schedule') || msg.includes('exam')) {
      smartReply = "National Examination Schedule Overview:\n• JAMB UTME: Registration opens annually in January; Mock CBT in March; Main National Exam in April.\n• WAEC SSCE: May/June annually.\n• NECO SSCE: June/July.\n• Post-UTME Screening: July through October annually.\nCheck the 'Exam Dates' tab for live countdowns and official deadlines!";
    } else if (msg.includes('sitting') || msg.includes('two')) {
      smartReply = "O'Level Sittings Rule:\n• Top Federal Universities (UNILAG, UI, UNIBEN) strictly insist on ONE sitting for Medicine, Pharmacy, and Law.\n• Most State Universities (LASU, OOU, DELSU, EKSU) and Polytechnics accept TWO sittings (WAEC + NECO combined).";
    } else if (msg.includes('poly') || msg.includes('yaba')) {
      smartReply = "Top Nigerian Polytechnics:\n• Yaba College of Technology (YABATECH) - Cut-off 160-180\n• Federal Poly Ilaro - Cut-off 150-170\n• Auchi Polytechnic - Cut-off 140-160\nPolytechnic ND/HND is a fantastic, highly practical path that allows direct entry into university 200 Level!";
    } else if (msg.includes('catchment')) {
      smartReply = "Catchment Area Rule:\nFederal universities reserve 35% of their admission quota for candidates from their surrounding catchment states. For example, UNILAG gives lower merit cut-offs to students from Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti!";
    }

    res.json({ reply: smartReply });
  }
});

// Dedicated Read Hub AI Study Partner Endpoint (Hints, Explanations, Strategy)
app.post('/api/readhub-ai', async (req, res) => {
  const { question, subject, exam, mode, userPrompt } = req.body;
  const prompt = (userPrompt || '').toLowerCase();

  try {
    const systemInstruction = `You are the Naija Read Hub AI Tutor for Nigerian secondary and university entrance exams (${exam || 'JAMB UTME'}).
Subject: ${subject || 'General'}.
Mode: ${mode || 'study'}.
Help the candidate understand the concept, learn exam tricks, avoid examiner traps, and master CBT speed.
Keep your explanation clear, practical, direct, and encouraging. Never be verbose; focus on high-yield exam insights.`;

    let userText = `Subject: ${subject}, Exam: ${exam}.\nQuestion/Topic: ${question || 'General revision'}.\nUser Request: ${userPrompt || 'Explain the solution step-by-step and show examiner trap'}`;

    if (mode === 'hint') {
      userText = `Provide a clever HINT for this question WITHOUT revealing the final answer directly. Point the student to the formula or rule to use. Question: ${question}`;
    }

    const timeoutPromise = new Promise<{ text: string }>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 12000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: [{ text: userText }] }],
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    const response = await Promise.race([apiPromise, timeoutPromise]) as { text?: string };
    res.json({ reply: response.text });
  } catch {
    // Intelligent instant study fallback
    let fallbackReply = `Here is the key strategy for ${subject || 'this subject'}: Master the fundamental definitions, eliminate extreme distractor options first, and beware of negative question keywords like 'EXCEPT' or 'CANNOT'.`;

    if (mode === 'hint') {
      fallbackReply = `💡 Tutor Hint: Look closely at the core principle in ${subject}. Eliminate options with negative or invalid values first, and recall the standard formula before calculating!`;
    } else if (prompt.includes('trick') || prompt.includes('trap')) {
      fallbackReply = `🎯 Examiner Trap in ${subject}: Examiners intentionally place the result of the intermediate step as Option A to trap hasty candidates. Always complete the final substitution before picking your option!`;
    }

    res.json({ reply: fallbackReply });
  }
});

// Serve static assets from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.get(['/manifest.json', '/manifest.webmanifest'], (_req, res) => {
  res.type('application/manifest+json');
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

// Vite Middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
