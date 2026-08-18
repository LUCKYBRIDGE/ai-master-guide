import React from 'react';
import { AITool } from '../types/ai';
import { 
  CalendarCheck, 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Lightbulb
} from 'lucide-react';

interface AIToolCardProps {
  tool: AITool;
  onOpenDetail: (tool: AITool) => void;
  onCopyPrompt: (text: string, title: string) => void;
}

export const AIToolCard: React.FC<AIToolCardProps> = ({
  tool,
  onOpenDetail,
  onCopyPrompt
}) => {
  return (
    <div className={`rounded-2xl glass-card p-6 flex flex-col justify-between transition-all duration-300 ${tool.borderHover} hover:shadow-2xl hover:-translate-y-1 group relative overflow-hidden`}>
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 rounded-full bg-slate-700/10 blur-3xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

      <div>
        {/* Header: Company & Verified Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tool.badgeBg} ${tool.badgeColor}`}>
            {tool.companyName}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <CalendarCheck className="w-3 h-3" />
            <span>{tool.verifiedDate} 검증</span>
          </div>
        </div>

        {/* Tool Name & Version */}
        <div className="mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
            {tool.name}
            {tool.subName && (
              <span className="text-xs font-normal text-slate-400 block sm:inline">
                {tool.subName}
              </span>
            )}
          </h3>
          <p className="text-xs font-medium text-slate-400 mt-1">
            {tool.tagline}
          </p>
        </div>

        {/* Overview */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {tool.overview}
        </p>

        {/* Key Strengths (Badges) */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            핵심 강점
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tool.strengths.slice(0, 3).map((st, idx) => (
              <span 
                key={idx} 
                className="text-[11px] px-2 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50 flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                {st}
              </span>
            ))}
          </div>
        </div>

        {/* Best For */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            추천 활용 분야
          </span>
          <ul className="text-xs text-slate-300 space-y-1">
            {tool.bestFor.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Official Tip Box */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{tool.promptTips.title}</span>
          </div>
          <p className="text-[11px] text-slate-300 line-clamp-2">
            💡 {tool.promptTips.dos[0]}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
        <button
          onClick={() => onOpenDetail(tool)}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 py-1.5 px-3 rounded-lg hover:bg-blue-500/10 transition-colors"
        >
          <span>심층 가이드 & 프롬프트 보기</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={tool.officialDocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          title="공식 문서 바로가기"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
