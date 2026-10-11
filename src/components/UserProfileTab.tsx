import React, { useState, useEffect } from 'react';
import { User, signInWithGoogle, logOut, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  LogIn,
  LogOut,
  User as UserIcon,
  CheckCircle2,
  Lock,
  ExternalLink,
  Save,
  Check,
  Award,
  Trash2,
  BookOpen,
  Download,
  Smartphone,
} from 'lucide-react';
import {
  getAllAvailableNovels,
  getActiveNovel,
  setActiveNovelId,
  saveCustomNovel,
} from '../data/readHubData';

interface UserProfileTabProps {
  currentUser: User | null;
  monetagLink: string;
  onSaveMonetagLink: (newLink: string) => void;
  triggerCount: number;
  onOpenInstallModal?: () => void;
}

interface SavedSlip {
  id: string;
  courseName: string;
  score: number;
  date: string;
}

export const UserProfileTab: React.FC<UserProfileTabProps> = ({
  currentUser,
  monetagLink,
  onSaveMonetagLink,
  triggerCount,
  onOpenInstallModal,
}) => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [linkInput, setLinkInput] = useState(monetagLink);
  const [shareUrlInput, setShareUrlInput] = useState(() => {
    try {
      return localStorage.getItem('portal_custom_share_url') || '';
    } catch {
      return '';
    }
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isShareUrlSaved, setIsShareUrlSaved] = useState(false);
  const [activeNovelState, setActiveNovelState] = useState(() => getActiveNovel().id);
  const [isNovelSaved, setIsNovelSaved] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  const [savedSlips, setSavedSlips] = useState<SavedSlip[]>([]);

  const availableNovels = getAllAvailableNovels();

  // Fetch user's saved slips from both localStorage (instant Vercel offline support) and Firestore
  useEffect(() => {
    const fetchSlips = async () => {
      const combined: SavedSlip[] = [];

      // 1. Instant local storage slips
      try {
        const local = JSON.parse(localStorage.getItem('naija_saved_slips') || '[]');
        if (Array.isArray(local)) {
          combined.push(...local);
        }
      } catch {
        // ignore
      }

      // 2. Firebase Cloud slips if user is signed in
      if (currentUser) {
        try {
          const q = query(collection(db, 'saved_slips'), where('userId', '==', currentUser.uid));
          const snap = await getDocs(q);
          snap.forEach((docSnap) => {
            const d = docSnap.data();
            const exists = combined.some(
              (s) => s.id === docSnap.id || (s.courseName === d.courseName && s.score === d.jambScore)
            );
            if (!exists) {
              combined.push({
                id: docSnap.id,
                courseName: d.courseName || 'General UTME',
                score: d.jambScore || 200,
                date: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'Recent',
              });
            }
          });
        } catch (err) {
          console.log('Firestore fetch notice:', err);
        }
      }

      setSavedSlips(combined);
    };

    fetchSlips();
  }, [currentUser]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setLoginNotice(null);
    try {
      const user = await signInWithGoogle();
      if (!user) {
        setLoginNotice('Instant Student Mode active! Your slips and novels are automatically saved on your device.');
      }
    } catch {
      setLoginNotice('Instant Student Mode active! Your slips and novels are automatically saved on your device.');
    }
    setIsLoggingIn(false);
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Strictly PIN 017014
    if (adminPin === '017014') {
      setIsAdminUnlocked(true);
      setAdminPin('');
      setPinError('');
    } else {
      setPinError('Access Denied. Passcode incorrect.');
      setAdminPin('');
    }
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveMonetagLink(linkInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSaveShareUrl = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanUrl = shareUrlInput.trim().replace(/\/$/, '');
      if (cleanUrl) {
        localStorage.setItem('portal_custom_share_url', cleanUrl);
      } else {
        localStorage.removeItem('portal_custom_share_url');
      }
      setIsShareUrlSaved(true);
      setTimeout(() => setIsShareUrlSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleResetShareUrl = () => {
    try {
      localStorage.removeItem('portal_custom_share_url');
      setShareUrlInput('');
      setIsShareUrlSaved(true);
      setTimeout(() => setIsShareUrlSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDeleteSlip = async (slipId: string) => {
    try {
      const local = JSON.parse(localStorage.getItem('naija_saved_slips') || '[]');
      const updated = local.filter((s: { id: string }) => s.id !== slipId);
      localStorage.setItem('naija_saved_slips', JSON.stringify(updated));
    } catch {
      // ignore
    }

    try {
      await deleteDoc(doc(db, 'saved_slips', slipId));
    } catch {
      // ignore
    }

    setSavedSlips((prev) => prev.filter((s) => s.id !== slipId));
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-6 border-b border-slate-100 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'User'}
                className="w-16 h-16 rounded-full border-2 border-emerald-800 object-cover shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-800 text-emerald-900 flex items-center justify-center font-bold text-xl shadow-sm">
                <UserIcon className="w-8 h-8" />
              </div>
            )}

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {currentUser?.displayName || 'Student Candidate Profile'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser?.email || 'Your admission slips & progress are saved directly to your device.'}
              </p>
              {currentUser ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-2 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Firebase Cloud Account Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-2 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active &amp; Ready (Zero Setup Required)
                </span>
              )}
            </div>
          </div>

          <div>
            {currentUser ? (
              <button
                onClick={logOut}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoggingIn ? 'Connecting...' : 'Sign In with Google (Optional)'}</span>
              </button>
            )}
          </div>
        </div>

        {loginNotice && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{loginNotice}</span>
          </div>
        )}

        {/* Saved Slips */}
        <div className="pt-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-800" />
            <span>My Saved Admission Slips:</span>
          </h4>

          {savedSlips.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 bg-slate-50 rounded-xl px-4 border border-slate-100">
              No saved slips yet. Tap &apos;Save Slip to Profile&apos; on the <strong>Slip Card</strong> tab to store your eligibility slips here.
            </p>
          ) : (
            <div className="space-y-2">
              {savedSlips.map((slip) => (
                <div
                  key={slip.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <strong className="text-slate-900 block">{slip.courseName}</strong>
                    <span className="text-[11px] text-emerald-800 font-mono font-bold">
                      Score: {slip.score} / 400 &bull; {slip.date}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSlip(slip.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile App Download Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 shadow-md">
            <Download className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h4 className="font-black text-sm text-white">
                Download NaijaCampus App to Phone
              </h4>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold px-2 py-0.5 rounded-full">
                Offline Ready
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              Install directly to your phone screen. Full-screen experience, zero app store wait.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenInstallModal}
          className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer shrink-0"
        >
          <Smartphone className="w-4 h-4" />
          <span>Install / Download App</span>
        </button>
      </div>

      {/* Secret Publisher Section (100% Hidden PIN, Zero Hints) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-slate-700">
            <Lock className="w-4 h-4 text-slate-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Administration Portal
            </h4>
          </div>
          <span className="text-[10px] text-slate-400">Restricted</span>
        </div>

        {!isAdminUnlocked ? (
          <div>
            <form onSubmit={handleUnlockAdmin} className="flex gap-2 max-w-xs pt-2">
              <input
                type="password"
                value={adminPin}
                onChange={(e) => {
                  setAdminPin(e.target.value);
                  if (pinError) setPinError('');
                }}
                placeholder="••••••"
                maxLength={6}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 flex-1 tracking-widest font-mono focus:outline-hidden focus:border-emerald-700"
              />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-1.5 rounded-xl text-xs transition cursor-pointer"
              >
                Enter
              </button>
            </form>
            {pinError && (
              <p className="text-[11px] text-rose-600 font-bold mt-1.5">{pinError}</p>
            )}
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs flex items-center justify-between">
              <div>
                <span className="text-emerald-900 font-bold block">Active Monetag Clicks:</span>
                <span className="text-slate-600 text-[11px]">Recorded across student actions</span>
              </div>
              <span className="text-xl font-black text-emerald-800 font-mono">
                {triggerCount} impressions
              </span>
            </div>

            <form onSubmit={handleSaveLink} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Active Monetag Direct Link:
                </label>
                <input
                  type="url"
                  required
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="https://publishers.monetag.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Monetag Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="submit"
                  className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
                  <span>{isSaved ? 'Updated!' : 'Save Direct Link'}</span>
                </button>
              </div>
            </form>

            {/* Portal Public Share URL Management */}
            <div className="pt-4 border-t border-slate-200">
              <form onSubmit={handleSaveShareUrl} className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Portal Share Link (Attached to WhatsApp &amp; Counselor Shares):
                    </label>
                    <button
                      type="button"
                      onClick={handleResetShareUrl}
                      className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Reset to Default
                    </button>
                  </div>
                  <input
                    type="url"
                    placeholder="https://... (Leave blank to use current active URL)"
                    value={shareUrlInput}
                    onChange={(e) => setShareUrlInput(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-hidden focus:border-emerald-700"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Active URL used right now:{' '}
                    <code className="text-emerald-800 font-bold font-mono">
                      {shareUrlInput || (typeof window !== 'undefined' ? window.location.origin : '')}
                    </code>
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {isShareUrlSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
                    <span>{isShareUrlSaved ? 'Link Updated!' : 'Save Portal Link'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* JAMB Prescribed Novel Real-Time Controller */}
            <div className="pt-4 border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveNovelId(activeNovelState);
                  setIsNovelSaved(true);
                  setTimeout(() => setIsNovelSaved(false), 2000);
                }}
                className="space-y-3"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <label className="text-xs font-bold text-slate-800">
                      Official JAMB Prescribed Novel (Real-Time Synchronizer):
                    </label>
                  </div>
                  <select
                    value={activeNovelState}
                    onChange={(e) => setActiveNovelState(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700 cursor-pointer"
                  >
                    {availableNovels.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.title} — {n.author} ({n.sessionTag || 'Prescribed Text'})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    When JAMB changes or updates the prescribed literature book, changing this here immediately updates the questions, summaries, and Read Hub study desk for all students in real time.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    {isNovelSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>{isNovelSaved ? 'Novel Synced!' : 'Set Active JAMB Novel'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
