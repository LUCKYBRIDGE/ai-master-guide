import React, { useState, useMemo } from 'react';
import { ComparisonRow, AICompany } from '../types/ai';
import { 
  Trophy, 
  Sparkles, 
  CalendarCheck, 
  Info, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface ComparisonTableProps {
  data: ComparisonRow[];
  searchQuery: string;
  onSelectTool: (toolId: string) => void;
}

const CATEGORIES = [
  '전체',
  '추론/기본성능',
  '코딩/개발',
  '에이전트/자동화',
  '멀티모달/비전',
  '컨텍스트/검색',
  '가격/접근성'
];

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  data,
  searchQuery,
  onSelectTool
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchCategory =
        selectedCategory === '전체' || row.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        row.feature.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.openai.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.google.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.anthropic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.xai.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.note.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [data, selectedCategory, searchQuery]);

  const getCompanyBadge = (company?: AICompany) => {
    switch (company) {
      case 'openai':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">OpenAI</span>;
      case 'google':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">Google</span>;
      case 'anthropic':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">Anthropic</span>;
      case 'xai':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">xAI</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-700/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-500/20 text-blue-400">
              <Trophy className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">4대 AI 생태계 핵심 역량 비교 매트릭스</h2>
          </div>
          <p className="text-sm text-slate-300">
            OpenAI(ChatGPT), Google(Gemini/AGY), Anthropic(Claude/Claude Code), xAI(Grok/Build)의 강점과 용도를 정밀 대조한 공식 기준 표입니다.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs text-emerald-400 font-medium px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CalendarCheck className="w-4 h-4" />
          <span>전체 항목 2026.08 검증 완료</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-2xl glass-panel">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">
              <th className="py-4 px-4 min-w-[200px]">비교 항목 & 카테고리</th>
              <th className="py-4 px-4 min-w-[220px] bg-emerald-950/20 border-l border-r border-emerald-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-extrabold">OpenAI</span>
                  <span className="text-[10px] text-slate-400 lowercase">ChatGPT / Canvas</span>
                </div>
              </th>
              <th className="py-4 px-4 min-w-[220px] bg-blue-950/20 border-r border-blue-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-extrabold">Google</span>
                  <span className="text-[10px] text-slate-400 lowercase">Gemini / AGY</span>
                </div>
              </th>
              <th className="py-4 px-4 min-w-[220px] bg-amber-950/20 border-r border-amber-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-extrabold">Anthropic</span>
                  <span className="text-[10px] text-slate-400 lowercase">Claude / Code</span>
                </div>
              </th>
              <th className="py-4 px-4 min-w-[220px] bg-cyan-950/20">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-extrabold">xAI</span>
                  <span className="text-[10px] text-slate-400 lowercase">Grok / Build</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredData.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {/* Feature Name & Category */}
                <td className="py-4 px-4 align-top">
                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {row.feature}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {row.category}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <CalendarCheck className="w-3 h-3 text-emerald-500" />
                      {row.verifiedDate}
                    </span>
                  </div>
                  {/* Summary / Note */}
                  <div className="mt-2 text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="font-medium text-slate-300">최고 추천:</span>
                        {getCompanyBadge(row.winner)}
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{row.note}</p>
                    </div>
                  </div>
                </td>

                {/* OpenAI */}
                <td className={`py-4 px-4 align-top border-l border-r border-slate-800/60 bg-emerald-950/5 ${row.winner === 'openai' ? 'ring-1 ring-inset ring-emerald-500/30 bg-emerald-500/5' : ''}`}>
                  <div className="text-xs leading-relaxed text-slate-200">
                    {row.openai}
                  </div>
                  {row.winner === 'openai' && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      <Trophy className="w-3 h-3" /> 우수
                    </div>
                  )}
                </td>

                {/* Google */}
                <td className={`py-4 px-4 align-top border-r border-slate-800/60 bg-blue-950/5 ${row.winner === 'google' ? 'ring-1 ring-inset ring-blue-500/30 bg-blue-500/5' : ''}`}>
                  <div className="text-xs leading-relaxed text-slate-200">
                    {row.google}
                  </div>
                  {row.winner === 'google' && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/20 px-1.5 py-0.5 rounded">
                      <Trophy className="w-3 h-3" /> 우수
                    </div>
                  )}
                </td>

                {/* Anthropic */}
                <td className={`py-4 px-4 align-top border-r border-slate-800/60 bg-amber-950/5 ${row.winner === 'anthropic' ? 'ring-1 ring-inset ring-amber-500/30 bg-amber-500/5' : ''}`}>
                  <div className="text-xs leading-relaxed text-slate-200">
                    {row.anthropic}
                  </div>
                  {row.winner === 'anthropic' && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">
                      <Trophy className="w-3 h-3" /> 우수
                    </div>
                  )}
                </td>

                {/* xAI */}
                <td className={`py-4 px-4 align-top bg-cyan-950/5 ${row.winner === 'xai' ? 'ring-1 ring-inset ring-cyan-500/30 bg-cyan-500/5' : ''}`}>
                  <div className="text-xs leading-relaxed text-slate-200">
                    {row.xai}
                  </div>
                  {row.winner === 'xai' && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-cyan-400 bg-cyan-500/20 px-1.5 py-0.5 rounded">
                      <Trophy className="w-3 h-3" /> 우수
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            검색 결과가 없습니다. 검색어나 카테고리를 변경해 보세요.
          </div>
        )}
      </div>
    </div>
  );
};
