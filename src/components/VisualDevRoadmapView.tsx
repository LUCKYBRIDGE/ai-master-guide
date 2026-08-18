import React, { useState } from 'react';
import { 
  DEV_ROADMAP_STAGES, 
  DevRoadmapStage 
} from '../data/masterRoadmapData';
import { 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  FileCode, 
  Sparkles, 
  Building2, 
  LayoutGrid, 
  Layers, 
  ShieldCheck,
  Terminal,
  Lightbulb
} from 'lucide-react';

interface VisualDevRoadmapViewProps {
  onCopy?: (text: string, title: string) => void;
}

export const VisualDevRoadmapView: React.FC<VisualDevRoadmapViewProps> = ({ onCopy }) => {
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedStage = DEV_ROADMAP_STAGES.find((s: DevRoadmapStage) => s.stageNumber === selectedStageNumber) || DEV_ROADMAP_STAGES[0];

  const handleCopy = (id: string, text: string, title: string) => {
    if (onCopy) {
      onCopy(text, title);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-blue-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-amber-400" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-cyan-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-400" />;
      default: return <Workflow className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Workflow className="w-5 h-5 text-cyan-300" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                시각적 웹·앱 개발 로드맵 & 계획 수립
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              아이디어부터 배포까지 <strong>웹과 앱이 실제로 개발되는 6단계 흐름</strong>을 시각적으로 한눈에 확인하고, 각 단계마다 AI에게 어떤 지침과 계획서를 내려야 하는지 확인하세요.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs text-cyan-300 font-medium px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 self-start md:self-auto">
            <span>6-Stage Development Map</span>
          </div>
        </div>
      </div>

      {/* 6-Stage Interactive Visual Stepper Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {DEV_ROADMAP_STAGES.map((stage: DevRoadmapStage) => (
          <button
            key={stage.stageNumber}
            onClick={() => setSelectedStageNumber(stage.stageNumber)}
            className={`p-4 rounded-2xl text-left transition-all border ${
              selectedStageNumber === stage.stageNumber
                ? 'bg-gradient-to-br from-indigo-600 to-cyan-700 text-white shadow-xl scale-102 border-cyan-400 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/10">
                STEP 0{stage.stageNumber}
              </span>
              {getStageIcon(stage.iconName)}
            </div>
            <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
              {stage.stageName.split('. ')[1]}
            </h5>
            <span className="text-[10px] text-cyan-200 block mt-1.5 opacity-80 truncate">
              {stage.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Stage Detail Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-cyan-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedStage.badgeColor}`}>
                {selectedStage.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedStage.stageSubtitle}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
              {selectedStage.stageName}
            </h4>
          </div>
        </div>

        {/* Action & Critical Why */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="font-bold text-white flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 이 단계에서 하는 일
            </span>
            <p className="text-slate-300 leading-relaxed">
              {selectedStage.whatYouDo}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              📦 최종 산출물: <strong className="text-emerald-300">{selectedStage.primaryDeliverable}</strong>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/20 space-y-2">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
              <Lightbulb className="w-4 h-4" /> 왜 이 단계가 중요한가요?
            </span>
            <p className="text-slate-300 leading-relaxed">
              {selectedStage.whyThisStepIsCritical}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              실무 체크리스트: {selectedStage.practicalActionChecklist[0]}
            </div>
          </div>
        </div>

        {/* Deliverable File Example Box */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <span className="font-mono font-bold text-slate-400 block">
            📄 산출물 예시 파일 형태:
          </span>
          <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            {selectedStage.deliverableFileExample}
          </pre>
        </div>

        {/* Universal Prompt Template for This Stage */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-400" /> 이 단계에서 AI 에이전트에 내리는 프롬프트
            </span>

            <button
              onClick={() => handleCopy(
                `stage-prompt-${selectedStage.stageNumber}`,
                selectedStage.universalPromptTemplate,
                selectedStage.stageName
              )}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
            >
              {copiedId === `stage-prompt-${selectedStage.stageNumber}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === `stage-prompt-${selectedStage.stageNumber}` ? '복사됨!' : '프롬프트 복사'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {selectedStage.universalPromptTemplate}
          </pre>
        </div>
      </div>
    </div>
  );
};
