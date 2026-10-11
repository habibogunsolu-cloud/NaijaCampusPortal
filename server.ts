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

// Counselor AI Chat Endpoint with Ultra-Fast gemini-3.1-flash-lite
app.post('/api/counselor', async (req, res) => {
  const msg = (req.body?.message || '').trim().toLowerCase();

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `You are Counselor Chioma, an elite, lightning-fast Nigerian university & JAMB admissions advisor.
Answer directly, warmly, and concisely in 2-4 sentences or quick bullet points.
Guidelines:
- Health Sciences (Medicine, Nursing, Pharmacy): 4 JAMB subjects = English, Biology, Chemistry, Physics.
- Law: Literature in English is strictly compulsory.
- Engineering/Computer Science: Mathematics & Physics are mandatory.
- State Universities (LASU, DELSU, OOU) and Polytechnics (YabaTech, Ilaro) are great alternatives for scores 160-220.
- Mention Catchment Area advantages when relevant.
- If the user greets (e.g., 'hi', 'hello', 'how far'), greet them warmly as Counselor Chioma and ask what course or university they are preparing for.
Keep responses concise, super helpful, and lightning fast.`;

    const contents = [
      ...(history || []).slice(-4).map((h: { role: string; content: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    // 12-second timeout safeguard to allow standard Gemini generation
    const timeoutPromise = new Promise<{ text: string }>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 12000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const response = await Promise.race([apiPromise, timeoutPromise]) as { text?: string };
    const reply = response.text || "Hello! For top Nigerian universities, what course or institution are you targeting? I can give you the exact 4 JAMB subjects, cut-off marks, and admission strategy right now.";

    res.json({ reply });
  } catch (error) {
    console.log('Gemini Fast Fallback triggered:', error);
    // Instant smart response based on keywords
    let smartReply = "Hello! I am Counselor Chioma. What course, university, or polytechnic are you aiming for? Tell me your dream course or score and I will tell you your exact chances!";

    if (msg === 'hi' || msg === 'hello' || msg.startsWith('hi ') || msg.startsWith('hello ') || msg === 'hey' || msg.includes('how far') || msg.includes('good morning') || msg.includes('good afternoon') || msg.includes('good evening')) {
      smartReply = "Hello there! I am Counselor Chioma, your Admissions Advisor. How is your exam preparation going? Tell me the course or university you have in mind, and I'll give you the exact subject combinations, safe cut-off score, and admission tricks!";
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
      model: 'gemini-3.1-flash-lite',
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
