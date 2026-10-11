import React, { useState } from 'react';
import {
  getDynamicExamSchedules,
  SYLLABUS_HOT_TOPICS,
  ExamEvent,
} from '../data/jambData';
import {
  Calendar,
  BookOpen,
  Clock,
  AlertCircle,
  Download,
  Flame,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Filter,
} from 'lucide-react';
import { CountdownWidget } from './CountdownWidget';
import { safeOpenLink } from '../utils/safeOpen';

interface ExamScheduleTabProps {
  monetagLink: string;
  onAdTriggered: () => void;
  onExploreTimetable?: () => void;
}

export const ExamScheduleTab: React.FC<ExamScheduleTabProps> = ({
  monetagLink,
  onAdTriggered,
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<'dates' | 'syllabus'>('dates');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'upcoming' | 'closed'>('all');
  const [activeSubject, setActiveSubject] = useState<string>('Use of English');

  // Compute live schedules
  const allSchedules = getDynamicExamSchedules();

  const filteredSchedules = allSchedules.filter((item) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'open') return item.status === 'Open';
    if (statusFilter === 'upcoming') return item.status === 'Upcoming';
    if (statusFilter === 'closed') return item.status === 'Closed';
    return true;
  });

  const currentTopic =
    SYLLABUS_HOT_TOPICS.find((s) => s.subject === activeSubject) || SYLLABUS_HOT_TOPICS[0];

  const handleDownloadSyllabus = () => {
    if (monetagLink) {
      safeOpenLink(monetagLink);
      onAdTriggered();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      {/* Live Exam Countdown Clock */}
      <CountdownWidget onExploreTimetable={() => setSelectedSubTab('dates')} />

      {/* Sub-Tab Navigation */}
      <div className="flex bg-slate-200 p-1 rounded-xl text-xs font-bold max-w-md mx-auto">
        <button
          onClick={() => setSelectedSubTab('dates')}
          className={`flex-1 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedSubTab === 'dates'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>🗓️ Real Exam Timetables</span>
        </button>

        <button
          onClick={() => setSelectedSubTab('syllabus')}
          className={`flex-1 py-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
            selectedSubTab === 'syllabus'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>🔥 Syllabus & Hot Topics</span>
        </button>
      </div>

      {/* ============ VIEW 1: EXAM SCHEDULES & DEADLINES ============ */}
      {selectedSubTab === 'dates' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-800" />
                  <span>National Exam Schedules & Real Status</span>
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded font-bold">
                  {currentYear}/{currentYear + 1}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified live dates for JAMB UTME, WAEC SSCE, NECO SSCE, and Post-UTME screening.
              </p>
            </div>

            {/* Status Filter Pills */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold w-full sm:w-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('open')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  statusFilter === 'open'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Ongoing</span>
              </button>
              <button
                onClick={() => setStatusFilter('upcoming')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'upcoming'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setStatusFilter('closed')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'closed'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Concluded
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchedules.map((item) => (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3 transition ${
                  item.status === 'Open'
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                    : item.status === 'Closed'
                    ? 'border-slate-200 opacity-90'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                        {item.exam}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.session}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                        item.status === 'Open'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Closed'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {item.status === 'Open' && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                          <span>🟢 Active / Ongoing Now</span>
                        </>
                      )}
                      {item.status === 'Closed' && <span>🔴 Concluded / Closed</span>}
                      {item.status === 'Upcoming' && <span>⏳ Upcoming Next Cycle</span>}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900">{item.title}</h4>

                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-2 font-mono">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      {item.startDate} &rarr; {item.endDate}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{item.importantNotice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ VIEW 2: SYLLABUS & HOT TOPICS ============ */}
      {selectedSubTab === 'syllabus' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                <span>Repeated Examination Questions & Hot Syllabus Topics</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Core areas where over 70% of questions are drawn annually by examiners.
              </p>
            </div>

            <button
              onClick={handleDownloadSyllabus}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full Syllabus (PDF)</span>
            </button>
          </div>

          {/* Subject Pills */}
          <div className="flex flex-wrap gap-2">
            {SYLLABUS_HOT_TOPICS.map((topic) => (
              <button
                key={topic.subject}
                onClick={() => setActiveSubject(topic.subject)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeSubject === topic.subject
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {topic.subject}
              </button>
            ))}
          </div>

          {/* Active Subject Deep Dive */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold block">
                Primary Examination Focus
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {currentTopic.subject}: {currentTopic.compulsoryNovelOrFocus}
              </h4>
            </div>

            <div>
              <strong className="text-xs font-bold text-slate-800 uppercase tracking-wide block mb-2">
                Most Frequently Tested Topics in Past Questions:
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentTopic.hotTopics.map((item: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 font-medium flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-950 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-rose-900">
                  Critical Pitfall Warning:
                </strong>
                <p className="mt-0.5">{currentTopic.pitfallWarning}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
