import React from 'react';
import {
  BarChart3,
  Palette,
  Terminal,
  Workflow,
  ShieldCheck,
  Zap,
  Plug,
} from 'lucide-react';

export type TabType =
  | 'models-ranking'
  | 'design-pre-extraction'
  | 'system-engineering'
  | 'mcp-hub'
  | 'dev-roadmap'
  | 'infra-architecture';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'models-ranking' as TabType, number: '1', label: 'AI 모델 데이터 & 성능 비교', subtitle: '공식 사양 · 독립 측정 · 공개 평가', icon: BarChart3, color: 'text-indigo-400', activeGradient: 'from-indigo-600 to-indigo-700' },
    { id: 'design-pre-extraction' as TabType, number: '2', label: '디자인 준비 (DESIGN.md)', subtitle: 'Figma · Stitch · 디자인 규격', icon: Palette, color: 'text-purple-400', activeGradient: 'from-purple-600 to-purple-700' },
    { id: 'system-engineering' as TabType, number: '3', label: '통합 AI 개발 환경 & 맞춤 ZIP', subtitle: 'Codex · Claude Code · Antigravity', icon: Terminal, color: 'text-emerald-400', activeGradient: 'from-emerald-600 to-teal-700' },
    { id: 'mcp-hub' as TabType, number: '4', label: 'MCP 도구 연결 허브', subtitle: 'Playwright · 파일 · GitHub', icon: Plug, color: 'text-teal-400', activeGradient: 'from-teal-600 to-emerald-700' },
    { id: 'dev-roadmap' as TabType, number: '5', label: '웹·앱 개발 6단계 로드맵', subtitle: '기획부터 배포까지 전 과정', icon: Workflow, color: 'text-cyan-400', activeGradient: 'from-cyan-600 to-blue-700' },
    { id: 'infra-architecture' as TabType, number: '6', label: '인프라 가이드 (보안·DB·서버)', subtitle: '기술 스택 결정 & 프롬프트', icon: ShieldCheck, color: 'text-rose-400', activeGradient: 'from-rose-600 to-red-700' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-3 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 shadow-lg shadow-indigo-500/20 text-white font-black">
              <Zap className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight">AI 기반 프로덕트 개발 마스터 가이드</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">v2026.08</span>
              </div>
              <p className="text-xs text-slate-400">기획 ➔ 디자인 시스템 ➔ 통합 AI 개발 환경 ➔ MCP 연동 ➔ 배포까지 원스톱 가이드</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">⚡ 데이터 검증: <strong className="text-emerald-400">2026.08.20</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl text-left transition-all shrink-0 border ${isActive ? `bg-gradient-to-r ${tab.activeGradient} text-white border-white/20 shadow-lg shadow-indigo-500/10 scale-[1.02]` : 'bg-slate-900/60 hover:bg-slate-850/80 text-slate-400 hover:text-slate-200 border-slate-850'}`}>
                <div className={`flex items-center justify-center w-7 h-7 rounded-xl transition-all ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800/80 text-slate-400 group-hover:text-white'}`}><Icon className="w-4 h-4" /></div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${isActive ? 'bg-black/20 text-white' : 'bg-slate-800 text-slate-400'}`}>{tab.number}</span>
                    <span className="text-xs font-bold whitespace-nowrap">{tab.label}</span>
                  </div>
                  <p className={`text-[10px] whitespace-nowrap ${isActive ? 'text-white/80' : 'text-slate-400'}`}>{tab.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
