import React, { useState } from 'react';
import { Calculator, Award, Sparkles, ExternalLink } from 'lucide-react';
import { safeOpenLink } from '../utils/safeOpen';

interface AggregateCalculatorProps {
  monetagLink: string;
  onAdTriggered: () => void;
  onNavigateToCutoffs?: () => void;
}

const GRADE_POINTS: Record<string, number> = {
  A1: 8,
  B2: 7,
  B3: 6,
  C4: 5,
  C5: 4,
  C6: 3,
  D7: 0,
  E8: 0,
  F9: 0,
};

export const AggregateCalculator: React.FC<AggregateCalculatorProps> = ({
  monetagLink,
  onAdTriggered,
  onNavigateToCutoffs,
}) => {
  const [jambScore, setJambScore] = useState<number>(240);
  const [grades, setGrades] = useState<string[]>(['A1', 'B2', 'B3', 'B2', 'A1']);
  const [postUtmeScore, setPostUtmeScore] = useState<number>(65);

  const handleGradeChange = (index: number, val: string) => {
    const updated = [...grades];
    updated[index] = val;
    setGrades(updated);
  };

  // Standard Federal Aggregate formula (UNILAG/UNIBEN/UI Model)
  // JAMB: (Score / 400) * 50 = max 50 points
  // O'Level 5 subjects: (Sum of points / 40) * 20 = max 20 points
  // Post-UTME: (Score / 100) * 30 = max 30 points
  // Total Aggregate = out of 100%
  const oLevelPointsSum = grades.reduce((acc, g) => acc + (GRADE_POINTS[g] || 0), 0);
  const oLevelAggregate = Number(((oLevelPointsSum / 40) * 20).toFixed(2));
  const jambAggregate = Number(((jambScore / 400) * 50).toFixed(2));
  const postUtmeAggregate = Number(((postUtmeScore / 100) * 30).toFixed(2));
  const totalCompositeScore = Number((jambAggregate + oLevelAggregate + postUtmeAggregate).toFixed(2));

  const handleTriggerAd = () => {
    if (monetagLink) {
      safeOpenLink(monetagLink);
      onAdTriggered();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            <span>O’Level & Post-UTME Aggregate Calculator</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Official 50% UTME + 20% O’Level + 30% Screening formula used across Nigerian Universities.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
          <span className="text-[10px] font-bold text-emerald-800 uppercase block">Composite Aggregate</span>
          <span className="text-2xl font-black text-emerald-800 font-mono">
            {totalCompositeScore}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* JAMB Score Input */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            UTME Score (Out of 400)
          </label>
          <input
            type="number"
            min={100}
            max={400}
            value={jambScore}
            onChange={(e) => setJambScore(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 font-mono focus:outline-hidden focus:border-emerald-600"
          />
          <span className="text-[11px] text-slate-500 mt-2 block font-medium">
            Points Contributed: <strong className="text-emerald-700">{jambAggregate} / 50 pts</strong>
          </span>
        </div>

        {/* Post-UTME Score Input */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Post-UTME / Screening (Out of 100)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={postUtmeScore}
            onChange={(e) => setPostUtmeScore(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 font-mono focus:outline-hidden focus:border-emerald-600"
          />
          <span className="text-[11px] text-slate-500 mt-2 block font-medium">
            Points Contributed: <strong className="text-emerald-700">{postUtmeAggregate} / 30 pts</strong>
          </span>
        </div>

        {/* O'Level Points Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            5 Core O’Level Subjects
          </label>
          <div className="text-lg font-black text-slate-900 font-mono mt-2">
            {oLevelPointsSum} / 40 Points
          </div>
          <span className="text-[11px] text-slate-500 mt-2 block font-medium">
            Points Contributed: <strong className="text-emerald-700">{oLevelAggregate} / 20 pts</strong>
          </span>
        </div>
      </div>

      {/* 5 O'Level Grades Picker */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
          Select Your 5 Best Core Subjects (WAEC / NECO / NABTEB):
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {['English Lang.', 'Mathematics', 'Subject #3', 'Subject #4', 'Subject #5'].map((label, idx) => (
            <div
              key={idx}
              className={`bg-slate-50 border border-slate-200 rounded-lg p-2.5 ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <span className="text-[10px] text-slate-500 block truncate font-medium">{label}</span>
              <select
                value={grades[idx]}
                onChange={(e) => handleGradeChange(idx, e.target.value)}
                className="w-full bg-white border border-slate-300 rounded mt-1 text-xs font-bold py-1 px-1.5 text-slate-900"
              >
                <option value="A1">A1 (8 pts)</option>
                <option value="B2">B2 (7 pts)</option>
                <option value="B3">B3 (6 pts)</option>
                <option value="C4">C4 (5 pts)</option>
                <option value="C5">C5 (4 pts)</option>
                <option value="C6">C6 (3 pts)</option>
                <option value="D7">D7 (0 pts)</option>
                <option value="F9">F9 (0 pts)</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Aggregate Analysis Callout & Ad Trigger */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-700" />
            <strong className="text-xs text-emerald-950 font-bold">
              {totalCompositeScore >= 70
                ? 'Excellent Merit Standing (High Chance for Competitive Courses)'
                : totalCompositeScore >= 55
                ? 'Strong Competitive Candidate (Admissible on General Merit)'
                : 'Supplementary / Catchment Standing'}
            </strong>
          </div>
          <p className="text-[11px] text-emerald-800">
            Compare this composite percentage with past UNILAG, UI, and OAU merit lists.
          </p>
        </div>

        <button
          onClick={() => {
            if (onNavigateToCutoffs) {
              onNavigateToCutoffs();
            } else if (monetagLink) {
              handleTriggerAd();
            }
          }}
          className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-xs"
        >
          <span>Compare With University Cut-Offs &rarr;</span>
        </button>
      </div>
    </div>
  );
};
