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

    const getSmartReply = (query: string, chatHistory: any[] = []): string => {
    const text = (query || '').toLowerCase().trim();

    // Check restrictions (fraud, expo, abuse)
    if (text.includes('expo') || text.includes('runz') || text.includes('upgrade score') || text.includes('hack') || text.includes('cheat')) {
      return "⚠️ **Official Policy Notice:** Counselor Chioma does not assist with illegal exam runs, expo, or score upgrades. JAMB CBT scores cannot be altered externally. Focus on official past questions, syllabus mastery, and genuine university cut-off benchmarks!";
    }

    // Follow-ups like "why", "how", "what if"
    const recentHistory = (chatHistory || []).map((h: any) => h.content || '').join(' ').toLowerCase();
    if (text === 'why' || text === 'why?' || text === 'how' || text === 'how?' || text.startsWith('why ')) {
      if (recentHistory.includes('nurs') || recentHistory.includes('med')) {
        return "Here is why Medicine & Nursing have such high cut-offs:\n• High Demand: Over 10,000 applicants compete for just 100-150 NUC/MDCN accredited slots per federal university.\n• High Merit Filter: UNILAG, UI, and UNIBEN receive candidates scoring 280-330+.\n• Solution: If your score is 220-250, choose State Universities (e.g. LASU, OOU) or related courses like Medical Lab Science, Physiology, or Anatomy.";
      }
      if (recentHistory.includes('law')) {
        return "Here is why: The Council of Legal Education strictly regulates intake. Without Literature in English in both JAMB and WAEC, candidates are automatically disqualified, and federal merit aggregates regularly exceed 70%.";
      }
      if (recentHistory.includes('comp') || recentHistory.includes('software')) {
        return "Here is why: Computer Science is currently Nigeria's most subscribed science course. Federal schools enforce strict Mathematics & Physics prerequisites, leaving little room for lower UTME scores.";
      }
      return "Here is why: Admission into Nigerian higher institutions is strictly determined by NUC capacity quotas, Merit (45%), Catchment Area (35%), and Educationally Less Developed States (20%). Tell me your specific score, course, and state to give you an exact calculation!";
    }

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
      return "Hello there scholar! I am Counselor Chioma, your Admissions Advisor. How is your exam preparation going? Tell me the course or university you have in mind, and I'll give you the exact 4 JAMB subjects, safe cut-off score, and admission tricks!";
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
    return `Hello scholar! I hear you regarding "${query}". What course, score, or higher institution are you targeting? Tell me and I will give you the exact subject combinations, safe cut-offs, and admission tricks!`;
  };

  try {
    const { message, history } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ reply: getSmartReply(message, history) });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `You are Counselor Chioma, an elite, warm, highly knowledgeable Nigerian university, polytechnic & JAMB admissions advisor for Nigerian students and candidates for the 2026/2027 academic session.
CRITICAL INSTRUCTIONS:
1. ALWAYS respond directly and contextually to ANY message or question the student sends! Never reset to a generic template if they ask a specific question.
2. If they ask follow-ups ("Why", "How", "What do you mean?", "What if", etc.), answer based on conversation history.
3. If they ask about money/earnings (like Monetag, PayPal, or bank accounts at age 16 in Nigeria): explain kindly that in Nigeria, international payment platforms like PayPal and independent commercial bank accounts require being 18+ (with BVN/NIN). A 16-year-old student can legally receive funds through a trusted parent or guardian's bank/PayPal account, or use parent-guided teen accounts. Encourage them to stay focused on their studies.
4. If they ask about the age requirement for JAMB/universities: explain that the Federal Ministry of Education set guidelines regarding age 16 for university admission eligibility, and emphasize preparing well for their UTME.
5. RESTRICTIONS & POLICY:
   - Strictly refuse any requests for exam runs, expo, hacking JAMB, or illegal score upgrades. Tell them firmly but politely that JAMB CBT is automated and secure, and anyone offering score upgrade is a scammer.
   - Maintain a friendly, supportive Nigerian sisterly mentor tone ("scholar", "my friend").
Keep responses concise, clear, and easy to read on mobile.`;

    // Ensure contents starts with user and strictly alternates
    const validHistory: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
    let currentExpectedRole: 'user' | 'model' = 'user';

    const rawHistory = Array.isArray(history) ? history : [];
    for (const item of rawHistory) {
      if (!item || typeof item.content !== 'string' || !item.content.trim()) continue;
      const itemRole = item.role === 'model' ? 'model' : 'user';

      if (validHistory.length === 0) {
        if (itemRole === 'user') {
          validHistory.push({ role: 'user', parts: [{ text: item.content.trim() }] });
          currentExpectedRole = 'model';
        }
      } else {
        if (itemRole === currentExpectedRole) {
          validHistory.push({ role: itemRole, parts: [{ text: item.content.trim() }] });
          currentExpectedRole = currentExpectedRole === 'user' ? 'model' : 'user';
        } else {
          const last = validHistory[validHistory.length - 1];
          last.parts[0].text += `\n${item.content.trim()}`;
        }
      }
    }

    if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === 'user') {
      validHistory[validHistory.length - 1].parts[0].text += `\n${message.trim()}`;
    } else {
      validHistory.push({ role: 'user', parts: [{ text: message.trim() }] });
    }

    const timeoutPromise = new Promise<{ text?: string }>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 8000)
    );

    const apiPromise = ai.models
      .generateContent({
        model: 'gemini-3.8-flash',
        contents: validHistory,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      })
      .catch(() => ({ text: '' }));

    const response = (await Promise.race([apiPromise, timeoutPromise])) as { text?: string };
    const reply = response.text?.trim() || getSmartReply(message, history);
    return res.status(200).json({ reply });
  } catch {
    const message = req.body?.message || '';
    const history = req.body?.history || [];
    return res.status(200).json({ reply: getSmartReply(message, history) });
  }
}
