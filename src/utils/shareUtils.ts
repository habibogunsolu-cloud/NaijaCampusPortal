import type { UniversityItem, CourseCutOff } from '../data/jambData';

// Public Share URL fallback for shared devices
export const PUBLIC_SHARE_URL = 'https://ais-dev-plncgcncprp64koelkyxtp-568682387608.europe-west3.run.app';

export function getSafeShareUrl(): string {
  if (typeof window === 'undefined') return PUBLIC_SHARE_URL;

  // 1. Check if user/admin configured a custom portal share URL in Admin settings
  try {
    const custom = localStorage.getItem('portal_custom_share_url');
    if (custom && custom.trim().startsWith('http')) {
      return custom.trim().replace(/\/$/, '');
    }
  } catch {
    // ignore
  }

  // 2. Validate current origin: if deployed on Vercel, Netlify, or custom domain, use that live URL!
  if (
    window.location &&
    window.location.origin &&
    window.location.origin !== 'null' &&
    !window.location.origin.includes('aistudio.google.com') &&
    !window.location.origin.includes('localhost') &&
    !window.location.origin.includes('127.0.0.1')
  ) {
    return window.location.origin;
  }

  return PUBLIC_SHARE_URL;
}

export function buildFreshersShareMessage(schoolName?: string): string {
  const url = getSafeShareUrl();
  const schoolLabel = schoolName || 'All Nigerian Universities, Polytechnics & Colleges';
  return (
    `🎓 *100 LEVEL FRESHERS & PHYSICAL SCREENING PORTAL*\n` +
    `_Official Screening Checklist • 100L CGPA Calculator • Resumption Guide_\n\n` +
    `Congratulations to all newly admitted students (${schoolLabel})! Prepare everything for your clearance:\n\n` +
    `✅ *Screening Checklist:* Original JAMB colored admission letter, scratch cards, medical fitness cert, NPC age declaration & attestation papers\n` +
    `✅ *100L CGPA Calculator:* Plan your 5.0 first semester target to secure First Class / MBBS safe standing\n` +
    `✅ *CAPS & Acceptance Fee Guide:* Step-by-step portal registration & file packaging\n` +
    `✅ *Counselor Chioma:* Ask any clearance question anytime\n\n` +
    `📲 *Open the Portal Free Here:*\n${url}`
  );
}

export function buildGeneralPortalShareMessage(): string {
  const url = getSafeShareUrl();
  return (
    `🇳🇬 *ALL-IN-ONE NIGERIAN EXAM & ADMISSION PORTAL*\n` +
    `_Official JAMB • WAEC • NECO • NABTEB • Cut-Off Marks • Read Hub_\n\n` +
    `Are you preparing for tertiary admission or O'Level exams? Check everything free:\n\n` +
    `✅ *JAMB UTME:* Official 4-subject combos, syllabus & brochure requirements\n` +
    `✅ *WAEC & NECO (SSCE/GCE):* 9-subject selection guide & compulsory subjects\n` +
    `✅ *TERTIARY CUT-OFF MARKS:* Course-by-course cut-offs for Federal, State, Private Universities & Polytechnics\n` +
    `✅ *CATCHMENT ADVANTAGE:* State of origin admission bonus checker\n` +
    `✅ *CBT MOCK EXAM & READ HUB:* 4-Subject timed exam hall, prescribed novels & past questions\n` +
    `✅ *ADMISSION PASS:* Instant eligibility slip verification\n\n` +
    `📲 *Open the Portal Free Here:*\n${url}`
  );
}

export function buildSchoolCutOffShareMessage(uni: UniversityItem, course?: CourseCutOff): string {
  const url = getSafeShareUrl();
  if (course) {
    return (
      `🏛️ *${uni.name} (${uni.code})*\n` +
      `📍 *State:* ${uni.state} | *Type:* ${uni.subType || uni.type}\n` +
      `🎯 *General School Cut-Off:* ${uni.generalCutOff} / 400\n\n` +
      `📖 *COURSE REQUIREMENT & CUT-OFF:*\n` +
      `• *Course:* ${course.courseName} (${course.degreeType})\n` +
      `• *Faculty:* ${course.faculty}\n` +
      `• *Merit Cut-Off Mark:* ${course.meritCutOff}\n` +
      (course.catchmentCutOff ? `• *Catchment State Cut-Off:* ${course.catchmentCutOff}\n` : '') +
      `• *Competition Level:* ${course.competitiveness}\n\n` +
      `📚 *Compulsory JAMB 4 Subjects:*\n` +
      course.jambSubjects.map((s) => `  - ${s}`).join('\n') +
      `\n\n` +
      `📝 *Mandatory 5 O'Level Credits (WAEC/NECO):*\n` +
      `  ${course.waecCredits.join(', ')}\n\n` +
      `🔗 *Check all course cut-offs & requirements here:*\n${url}`
    );
  }

  // School summary with top courses
  const sampleCourses = uni.courses ? uni.courses.slice(0, 5) : [];
  const coursesText = sampleCourses.length > 0
    ? `\n📋 *Sample Departmental Cut-Offs:*\n` +
      sampleCourses.map((c) => `• ${c.courseName}: ${c.meritCutOff}${c.catchmentCutOff ? ` (Catchment: ${c.catchmentCutOff})` : ''}`).join('\n') +
      `\n• ...plus ${Math.max(0, (uni.courses?.length || 0) - sampleCourses.length)} more accredited courses\n`
    : '';

  return (
    `🏛️ *OFFICIAL CUT-OFF MARKS: ${uni.name.toUpperCase()} (${uni.code})*\n` +
    `📍 *State:* ${uni.state} | *Category:* ${uni.subType || uni.type}\n` +
    `🎯 *General JAMB Benchmark:* ${uni.generalCutOff} / 400\n` +
    (uni.catchmentStates?.length
      ? `🌍 *Catchment States:* ${uni.catchmentStates.slice(0, 6).join(', ')}${uni.catchmentStates.length > 6 ? '...' : ''} (+${uni.catchmentCutOffBonus} pts advantage)\n`
      : '') +
    coursesText +
    `\n🔍 *Check all departmental cut-offs and test your eligibility free:*\n${url}`
  );
}

export function buildReadHubShareMessage(subject?: string, exam?: string): string {
  const url = getSafeShareUrl();
  return (
    `📚 *READ HUB & CBT EXAM HALL — SPEED DRILLS & NOVEL REVISION*\n` +
    `_Master ${exam || 'JAMB, WAEC & NECO'} with past questions, novel summaries & hall strategies_\n\n` +
    (subject ? `🎯 *Studying:* ${subject}\n\n` : '') +
    `💡 *What you get in Read Hub & CBT Hall:*\n` +
    `• Step-by-step topic breakdown & core formula summaries\n` +
    `• Interactive Objective (CBT) & Theory questions with instant explanations\n` +
    `• 120-minute timed mock exam with official 400-mark scaled score slip\n` +
    `• Complete summaries & character profiles for prescribed JAMB novels\n` +
    `• Proven Exam Hall Time Management & elimination strategies\n` +
    `• Official WAEC & NECO 9-subject selection advice\n\n` +
    `📖 *Start practicing free right now:*\n${url}`
  );
}

export function buildOLevelGuideShareMessage(): string {
  const url = getSafeShareUrl();
  return (
    `📝 *WAEC & NECO OFFICIAL 9-SUBJECT COMBINATION GUIDE*\n` +
    `_Ensure your O'Level credits match your university admission goals_\n\n` +
    `⚠️ *Crucial Rules:*\n` +
    `• English Language & Mathematics are compulsory for ALL candidates\n` +
    `• Science tracks require: English, Maths, Biology, Chemistry, Physics\n` +
    `• Commercial tracks require: English, Maths, Economics, Accounting/Commerce\n` +
    `• Arts tracks require: English, Maths, Literature-in-English, CRS/IRS, Government\n` +
    `• You need at least 5 Credit passes in relevant subjects in not more than 2 sittings\n\n` +
    `🎯 *Check your exact degree combination and cut-off marks:*\n${url}`
  );
}

export function buildCounselorAdviceShareMessage(advice?: string, topic?: string): string {
  const url = getSafeShareUrl();
  const defaultAdvice =
    `Hello scholar! I am Counselor Chioma, your Senior Admissions Advisor for the 2026/2027 academic session.\n\n` +
    `I provide verified guidance on:\n` +
    `• Official JAMB 4-Subject Combinations (preventing disqualification)\n` +
    `• WAEC/NECO 9-Subject Requirements & One-Sitting vs Two-Sittings Rules\n` +
    `• Real University & Polytechnic Cut-Off Benchmarks (Federal, State, Private)\n` +
    `• Low Score Remedies (140 - 199 Points) & Change of Institution Strategies\n` +
    `• Catchment Area Quotas & Direct Entry (DE) Pathways\n\n` +
    `What course, score, or institution are you targeting?`;

  const finalAdvice = (advice && advice.trim()) ? advice.trim() : defaultAdvice;

  return (
    `🎓 *COUNSELOR CHIOMA'S ADMISSION & JAMB ADVICE*\n` +
    `_Official Nigerian University & Polytechnic Guidance_\n\n` +
    (topic ? `📌 *Topic / Question:* ${topic}\n\n` : '') +
    `💡 *Counselor Chioma's Verified Advice:*\n${finalAdvice}\n\n` +
    `🔗 *Ask Counselor Chioma more questions free on the portal:*\n${url}`
  );
}

export function openWhatsAppShare(text: string): boolean {
  try {
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/?text=${encoded}`;
    
    // Copy text to clipboard as safety guarantee in case popup is blocked
    copyTextToClipboard(text);

    // Create an anchor tag to trigger new tab safely without navigating current window
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.warn('Safe WhatsApp launch fallback:', err);
    // As final fallback, ensure clipboard has the text
    copyTextToClipboard(text);
    return false;
  }
}

export async function shareNativeOrFallback(data: {
  title: string;
  text: string;
  url?: string;
}): Promise<'native' | 'whatsapp' | 'copied'> {
  const shareUrl = data.url || getSafeShareUrl();
  const fullText = data.text.includes(shareUrl) ? data.text : `${data.text}\n\n${shareUrl}`;

  // Check if Web Share API is actually available and permitted in this context
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: data.title,
        text: fullText,
      });
      return 'native';
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        // User deliberately canceled or dismissed the share sheet
        return 'native';
      }
      console.warn('Native Web Share unavailable or blocked in iframe, using safe fallback', e);
    }
  }

  // Safe fallback to WhatsApp and copy text
  await copyTextToClipboard(fullText);
  openWhatsAppShare(fullText);
  return 'whatsapp';
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
