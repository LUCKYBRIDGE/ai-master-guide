import React, { useState } from 'react';
import { 
  INFRA_DECISION_DATA, 
  InfraDecisionSection 
} from '../data/infrastructureData';
import { 
  ShieldCheck, 
  Database, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Terminal, 
  Layers,
  HelpCircle,
  Cpu,
  Lock
} from 'lucide-react';

interface InfraArchitectureGuideViewProps {
  onCopy?: (text: string, title: string) => void;
}

export const InfraArchitectureGuideView: React.FC<InfraArchitectureGuideViewProps> = ({ onCopy }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('infra-security');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedSection = INFRA_DECISION_DATA.find((s: InfraDecisionSection) => s.id === selectedSectionId) || INFRA_DECISION_DATA[0];

  const handleCopy = (id: string, text: string, title: string) => {
    if (onCopy) {
      onCopy(text, title);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-400" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-400" />;
      case 'Server': return <Server className="w-5 h-5 text-cyan-400" />;
      default: return <Layers className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Lock className="w-5 h-5 text-rose-300" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                인프라 의사결정: 보안 · 데이터베이스 · 서버 가이드
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              인증·DB·백엔드의 필요성을 요구사항과 위험에 따라 판단하는 출발점입니다. 보안·금융·개인정보는 이 페이지의 예시만으로 결정하지 말고 최신 공식 지침과 담당 전문가의 검토를 거치세요.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs text-rose-300 font-medium px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/30 self-start md:self-auto">
            <span>Architecture Decision Tree</span>
          </div>
        </div>
      </div>

      {/* 3 Pillars Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {INFRA_DECISION_DATA.map((sec: InfraDecisionSection) => (
          <button
            key={sec.id}
            onClick={() => setSelectedSectionId(sec.id)}
            className={`p-5 rounded-2xl text-left transition-all border ${
              selectedSectionId === sec.id
                ? 'bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl scale-102 border-indigo-500/50 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${sec.badgeColor}`}>
                {sec.categoryBadge}
              </span>
              {getSectionIcon(sec.iconName)}
            </div>
            <h4 className="text-sm font-bold text-white leading-snug">
              {sec.categoryTitle.split(' (')[0]}
            </h4>
            <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {sec.oneLineSummary}
            </p>
          </button>
        ))}
      </div>

      {/* Selected Infrastructure Guide Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedSection.badgeColor}`}>
              {selectedSection.categoryBadge}
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
              {selectedSection.categoryTitle}
            </h4>
            <p className="text-xs text-slate-300">
              {selectedSection.oneLineSummary}
            </p>
          </div>
        </div>

        {/* When Needed vs When Not Needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* When Needed */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/20 space-y-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4" /> 도입을 검토할 조건
            </span>
            <ul className="space-y-1.5 text-slate-300 leading-relaxed">
              {selectedSection.whenDoYouNeedIt.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When Not Needed */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="font-bold text-slate-400 flex items-center gap-1.5 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-400" /> 전용 구성이 불필요할 수 있는 조건
            </span>
            <ul className="space-y-1.5 text-slate-300 leading-relaxed">
              {selectedSection.whenYouDoNotNeedIt.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Tech Stack */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-white block">
            🛠️ 비교할 기술 선택지:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {selectedSection.recommendedTechStack.map((tech, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <span className="font-bold text-indigo-300 block text-xs">{tech.name}</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{tech.description}</p>
                <div className="pt-1.5 text-[10px] text-emerald-400">
                  👉 검토 대상: {tech.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Checklist */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
          <span className="font-bold text-slate-200 block">
            📋 아키텍처 점검 항목:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
            {selectedSection.architectureChecklist.map((chk: string, idx: number) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>{chk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ready-to-use Prompt */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-400" /> 구현 전 조사·설계를 요청하는 프롬프트
            </span>

            <button
              onClick={() => handleCopy(
                selectedSection.id,
                selectedSection.copyableAgentPrompt,
                selectedSection.categoryTitle
              )}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
            >
              {copiedId === selectedSection.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === selectedSection.id ? '복사됨!' : '프롬프트 복사'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {selectedSection.copyableAgentPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
};
