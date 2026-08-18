import React from 'react';
import { CalendarCheck, ShieldCheck, RefreshCw, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Update & Maintenance Info Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <RefreshCw className="w-4 h-4 text-blue-400" />
              <span>지속 가능한 업데이트 및 유지보수 가이드</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
              본 웹페이지는 데이터와 UI가 완벽히 분리되어 있어, <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">src/data/</code> 디렉토리의 데이터 파일만 수정하면 새로운 AI 모델, 벤치마크, 최신 프롬프트가 즉시 자동 반영됩니다.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
            <CalendarCheck className="w-4 h-4" />
            <span>최신 데이터 기준일: 2026년 8월</span>
          </div>
        </div>

        {/* Links & Attribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-900">
          <div>
            <h5 className="font-bold text-white mb-2">OpenAI 생태계</h5>
            <ul className="space-y-1.5">
              <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">OpenAI Docs <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://openai.com/index/introducing-canvas/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Canvas Guide <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">Google 생태계</h5>
            <ul className="space-y-1.5">
              <li><a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Google AI Studio <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://deepmind.google/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Google DeepMind <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">Anthropic 생태계</h5>
            <ul className="space-y-1.5">
              <li><a href="https://docs.anthropic.com/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Claude Documentation <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Claude Code CLI <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">xAI 생태계</h5>
            <ul className="space-y-1.5">
              <li><a href="https://x.ai/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">xAI Official <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://docs.x.ai/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">xAI API Docs <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900 text-slate-500 text-[11px]">
          <div>
            © 2026 AI Master Guide & Knowledge Hub. Built with AI & Data Visualization Best Practices.
          </div>
          <div className="flex items-center gap-1.5">
            <span>신뢰와 공신력 기반의 검증된 정보만 큐레이션합니다</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
