import React from 'react';
import { AITool } from '../types/ai';
import { 
  X, 
  CalendarCheck, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  DollarSign, 
  Workflow, 
  Lightbulb
} from 'lucide-react';

interface AIToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
  onCopyPrompt: (text: string, title: string) => void;
}

export const AIToolDetailModal: React.FC<AIToolDetailModalProps> = ({
  tool,
  onClose,
  onCopyPrompt
}) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tool.badgeBg} ${tool.badgeColor}`}>
              {tool.companyName}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
              {tool.category} 특화
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{tool.verifiedDate} 검증</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {tool.name}
            {tool.subName && (
              <span className="text-base font-normal text-slate-400 ml-2">
                ({tool.subName})
              </span>
            )}
          </h2>
          <p className="text-sm font-medium text-blue-400 mt-1">
            {tool.tagline}
          </p>
        </div>

        {/* Overview */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-300 leading-relaxed">
          {tool.overview}
        </div>

        {/* Key Features Grid */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            핵심 주요 기능
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.keyFeatures.map((feat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/40">
                <h5 className="text-xs font-bold text-slate-200 mb-1">{feat.title}</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Limitations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 주요 강점
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {tool.strengths.map((st, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> 유의점 및 한계
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {tool.limitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prompt Best Practices (Dos & Donts) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
          <h4 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            {tool.promptTips.title} (공식 권장 지침)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block">권장사항 (DO)</span>
              <ul className="space-y-1 text-xs text-slate-300">
                {tool.promptTips.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-rose-400 block">피해야 할 사항 (DON'T)</span>
              <ul className="space-y-1 text-xs text-slate-300">
                {tool.promptTips.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Example Prompt */}
          {tool.promptTips.examplePrompt && (
            <div className="mt-3 pt-3 border-t border-slate-700/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-300">실전 예시 프롬프트</span>
                <button
                  onClick={() => onCopyPrompt(tool.promptTips.examplePrompt!, `${tool.name} 예시 프롬프트`)}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>복사하기</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800">
                {tool.promptTips.examplePrompt}
              </pre>
            </div>
          )}
        </div>

        {/* Recommended Workflow */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Workflow className="w-4 h-4 text-purple-400" />
            추천 실무 워크플로우
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tool.recommendedWorkflow.map((wf, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                {wf}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Info */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="font-semibold text-white">무료 티어:</span> {tool.pricing.freeTier}
            </div>
          </div>
          <div>
            <span className="font-semibold text-white">유료 플랜:</span> {tool.pricing.paidTier}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <a
            href={tool.officialDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 py-2 px-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all"
          >
            <span>공식 문서 및 레퍼런스 열기</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
