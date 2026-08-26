import React from 'react';
import { CalendarCheck, ShieldCheck, RefreshCw, ExternalLink } from 'lucide-react';
import { SITE_META } from '../data/siteMeta';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <RefreshCw className="w-4 h-4 text-blue-400" />
              <span>지속 가능한 업데이트 및 유지보수 가이드</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
              모델·MCP·보안 정보는 변경될 수 있습니다. 수치에는 측정 주체·버전·조건·원문을 함께 표시하고, 제품 기능과 설치 명령은 제작사 공식 문서에서 재확인합니다. 일부 설명은 <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">src/data/</code>가 아니라 화면 컴포넌트에도 있으므로 함께 검토합니다.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
            <CalendarCheck className="w-4 h-4" />
            <span>최신 데이터 기준일: {SITE_META.auditMonthLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-900">
          <div>
            <h5 className="font-bold text-white mb-2">OpenAI 개발</h5>
            <ul className="space-y-1.5">
              <li><a href="https://developers.openai.com/codex/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Codex Documentation <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://developers.openai.com/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">OpenAI Developers <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">Anthropic 개발</h5>
            <ul className="space-y-1.5">
              <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Claude Code <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://docs.anthropic.com/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Anthropic Documentation <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">Google 개발</h5>
            <ul className="space-y-1.5">
              <li><a href="https://antigravity.google/docs/overview" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Antigravity Documentation <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="hover:text-slate-200 flex items-center gap-1">Google AI for Developers <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900 text-slate-500 text-[11px]">
          <div>© 2026 AI Master Guide & Knowledge Hub. Built with AI & Data Visualization Best Practices.</div>
          <div className="flex items-center gap-1.5">
            <span>공식 1차 자료 우선 · 조건 없는 수치와 무결성 보증 금지</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
