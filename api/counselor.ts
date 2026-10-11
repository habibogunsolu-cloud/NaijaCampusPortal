import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const getSmartReply = (query: string): string => {
    const text = (query || '').toLowerCase().trim();
    if (
      text === 'hi' ||
      text === 'hello' ||
      text.startsWith('hi ') ||
      text.startsWith('hello ') ||
      text === 'hey' ||
      text.includes('how far') ||
      text.includes('good morning') ||
      text.includes('good afternoon') ||
      text.includes('good evening')
    ) {
      return "Hello there! I am Counselor Chioma, your Admissions Advisor. How is your exam preparation going? Tell me the course or university you have in mind, and I'll give you the exact 4 JAMB subjects, safe cut-off score, and admission tricks!";
    } else if (text.includes('nurs') || text.includes('med')) {
      return "For Nursing & Medicine in Nigeria:\n• 4 JAMB Subjects: English, Biology, Chemistry, Physics.\n• WAEC: 5 credits in ONE sitting for UNILAG, UI, UNIBEN, OAU.\n• Safe UTME score: 250+ for Nursing, 275+ for Medicine.\n• Alternative: Medical Lab Science, Physiology, or Anatomy if your score is 210-245.";
    } else if (text.includes('law')) {
      return "For Law (LL.B) in Nigeria:\n• 4 JAMB Subjects: English, Literature in English, Government, and any Arts/Social Science subject.\n• Critical Warning: Candidates without Literature in English are immediately disqualified.\n• Safe UTME score: 260+ for Federal Universities (UNILAG, UI, OAU, UNN).";
    } else if (text.includes('comp') || text.includes('software') || text.includes('cyber')) {
      return "For Computer Science / Software Engineering / Cybersecurity:\n• 4 JAMB Subjects: English, Mathematics, Physics, and Chemistry.\n• Top choices: UNILAG, FUTA, UNN, LASU, and YABATECH (for ND/HND).\n• Minimum benchmark: 210+ for competitive Federal Universities, 160+ for Polytechnics.";
    } else if (
      text.includes('date') ||
      text.includes('when') ||
      text.includes('timetable') ||
      text.includes('schedule') ||
      text.includes('exam')
    ) {
      return "National Examination Schedule Overview:\n• JAMB UTME: Registration opens annually in January; Mock CBT in March; Main National Exam in April.\n• WAEC SSCE: May/June annually.\n• NECO SSCE: June/July.\n• Post-UTME Screening: July through October annually.\nCheck the 'Exam Dates' tab for live countdowns and official deadlines!";
    } else if (text.includes('sitting') || text.includes('two')) {
      return "O'Level Sittings Rule:\n• Top Federal Universities (UNILAG, UI, UNIBEN) strictly insist on ONE sitting for Medicine, Pharmacy, and Law.\n• Most State Universities (LASU, OOU, DELSU, EKSU) and Polytechnics accept TWO sittings (WAEC + NECO combined).";
    } else if (text.includes('poly') || text.includes('yaba')) {
      return "Top Nigerian Polytechnics:\n• Yaba College of Technology (YABATECH) - Cut-off 160-180\n• Federal Poly Ilaro - Cut-off 150-170\n• Auchi Polytechnic - Cut-off 140-160\nPolytechnic ND/HND is a fantastic, highly practical path that allows direct entry into university 200 Level!";
    } else if (text.includes('catchment')) {
      return "Catchment Area Rule:\nFederal universities reserve 35% of their admission quota for candidates from their surrounding catchment states. For example, UNILAG gives lower merit cut-offs to students from Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti!";
    }
    return "Hello! For top Nigerian universities, what course or institution are you targeting? I can give you the exact 4 JAMB subjects, cut-off marks, and admission strategy right now.";
  };

  try {
    const { message, history } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ reply: getSmartReply(message) });
    }

    const ai = new GoogleGenAI({ apiKey });
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

    const timeoutPromise = new Promise<{ text?: string }>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 9000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const response = (await Promise.race([apiPromise, timeoutPromise])) as { text?: string };
    const reply = response.text || getSmartReply(message);
    return res.status(200).json({ reply });
  } catch {
    const message = req.body?.message || '';
    return res.status(200).json({ reply: getSmartReply(message) });
  }
}
