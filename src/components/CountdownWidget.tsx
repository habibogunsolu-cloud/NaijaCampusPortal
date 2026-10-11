import React, { useState, useEffect } from 'react';
import { Clock, Flame, Calendar, ChevronRight } from 'lucide-react';

interface CountdownWidgetProps {
  onExploreTimetable: () => void;
}

export const CountdownWidget: React.FC<CountdownWidgetProps> = ({ onExploreTimetable }) => {
  const [targetExam, setTargetExam] = useState<'jamb' | 'waec' | 'postUtme'>('jamb');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate target dates dynamically
  const now = new Date();
  const currentYear = now.getFullYear();

  // Next JAMB UTME: Typically mid-April next year (or April 18)
  const nextJambYear = now.getMonth() >= 4 ? currentYear + 1 : currentYear;
  const jambDate = new Date(`${nextJambYear}-04-18T08:00:00`);

  // Next WAEC: Typically early May
  const nextWaecYear = now.getMonth() >= 5 ? currentYear + 1 : currentYear;
  const waecDate = new Date(`${nextWaecYear}-05-06T08:00:00`);

  // Post-UTME portal deadline: Typically end of current screening window (Nov 15)
  const postUtmeDate = new Date(`${currentYear}-11-15T23:59:59`);

  useEffect(() => {
    const updateCountdown = () => {
      const target =
        targetExam === 'jamb' ? jambDate : targetExam === 'waec' ? waecDate : postUtmeDate;
      const difference = target.getTime() - new Date().getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetExam]);

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-2 border-amber-500/80 rounded-2xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-emerald-800/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>National Exam Countdown Clock</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/40">
                LIVE
              </span>
            </h3>
            <p className="text-[11px] text-slate-300">
              Prepare with urgency &bull; Time waits for no candidate
            </p>
          </div>
        </div>

        {/* Exam Mode Toggle */}
        <div className="flex w-full sm:w-auto bg-slate-900 border border-emerald-800 rounded-xl p-1 text-[11px] sm:text-xs">
          <button
            onClick={() => setTargetExam('jamb')}
            className={`flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 rounded-lg font-bold transition cursor-pointer text-center ${
              targetExam === 'jamb' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            JAMB UTME
          </button>
          <button
            onClick={() => setTargetExam('waec')}
            className={`flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 rounded-lg font-bold transition cursor-pointer text-center ${
              targetExam === 'waec' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            WAEC SSCE
          </button>
          <button
            onClick={() => setTargetExam('postUtme')}
            className={`flex-1 sm:flex-initial px-2 sm:px-2.5 py-1 rounded-lg font-bold transition cursor-pointer text-center ${
              targetExam === 'postUtme' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            Post-UTME
          </button>
        </div>
      </div>

      {/* Countdown Digits Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 my-3 text-center">
        <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2 sm:p-3">
          <span className="text-xl sm:text-3xl font-black text-white font-mono block">
            {timeLeft.days}
          </span>
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Days</span>
        </div>

        <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2 sm:p-3">
          <span className="text-xl sm:text-3xl font-black text-white font-mono block">
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Hours</span>
        </div>

        <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2 sm:p-3">
          <span className="text-xl sm:text-3xl font-black text-white font-mono block">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Minutes</span>
        </div>

        <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2 sm:p-3">
          <span className="text-xl sm:text-3xl font-black text-amber-400 font-mono block animate-pulse">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-amber-300 uppercase">Seconds</span>
        </div>
      </div>

      {/* Bottom Motivation Callout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs pt-1 text-slate-300 gap-2">
        <span className="text-[11px]">
          Target Date:{' '}
          <strong className="text-amber-300 font-mono">
            {targetExam === 'jamb'
              ? `April 18, ${nextJambYear}`
              : targetExam === 'waec'
              ? `May 6, ${nextWaecYear}`
              : `November 15, ${currentYear}`}
          </strong>
        </span>

        <button
          onClick={onExploreTimetable}
          className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>View Timetable & Syllabus &rarr;</span>
        </button>
      </div>
    </div>
  );
};
