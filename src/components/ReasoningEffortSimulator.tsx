import React, { useState } from 'react';
import { 
  REASONING_EFFORT_TIERS_DATA, 
  REASONING_BENCHMARK_SCENARIOS, 
  API_PLATFORM_PRESETS,
  ReasoningBenchmarkScenario,
  ScenarioStepResult,
  ApiPlatformPreset
} from '../data/reasoningEffortData';
import { ReasoningEffortTier, ReasoningLevel, ReasoningLevelModelData } from '../types/ai';
import { 
  Brain, 
  Clock, 
  Coins, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Code2, 
  Layers, 
  Gauge, 
  SlidersHorizontal, 
  FileCode, 
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Flame,
  HelpCircle,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const ReasoningEffortSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tiers' | 'scenarios' | 'api-presets'>('scenarios');
  const [selectedLevel, setSelectedLevel] = useState<ReasoningLevel>('High');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scenario-async-race-condition');
  const [selectedScenarioLevel, setSelectedScenarioLevel] = useState<ReasoningLevel>('High');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentTier = REASONING_EFFORT_TIERS_DATA.find((t: ReasoningEffortTier) => t.level === selectedLevel) || REASONING_EFFORT_TIERS_DATA[2];
  const currentScenario = REASONING_BENCHMARK_SCENARIOS.find((s: ReasoningBenchmarkScenario) => s.id === selectedScenarioId) || REASONING_BENCHMARK_SCENARIOS[0];
  const currentScenarioStep = currentScenario.levels.find((l: ScenarioStepResult) => l.level === selectedScenarioLevel) || currentScenario.levels[2];

  const handleCopyCode = (id: string, code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCompanyBadge = (company: string) => {
    switch (company) {
      case 'anthropic': return { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 'openai': return { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
      case 'google': return { text: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
      case 'xai': return { text: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
      case 'opensource': return { text: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
      default: return { text: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/30' };
    }
  };

  const getLevelColor = (level: ReasoningLevel) => {
    switch (level) {
      case 'Low': return 'from-emerald-600 to-teal-600';
      case 'Medium': return 'from-blue-600 to-indigo-600';
      case 'High': return 'from-amber-600 to-orange-600';
      case 'Extra High': return 'from-purple-600 to-pink-600';
      case 'Max': return 'from-rose-600 to-red-600';
    }
  };

  const getVerdictBadge = (verdict: string) => {
    if (verdict.includes('100% 성공')) {
      return 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30';
    }
    if (verdict.includes('초과 달성')) {
      return 'bg-purple-500/10 text-purple-300 border border-purple-500/30';
    }
    if (verdict.includes('부분 해결')) {
      return 'bg-amber-500/10 text-amber-300 border border-amber-500/30';
    }
    return 'bg-rose-500/10 text-rose-300 border border-rose-500/30';
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Brain className="w-6 h-6" />
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                추론 강도(Reasoning Effort) 5단계 실전 심층 분석기
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              OpenAI(reasoning_effort), Claude(thinking_budget), Gemini(thinking_config)의 <strong>Low부터 Max까지 강도별 사고 깊이(CoT), 지연 시간, 비용, 그리고 동일 과제에서의 극적인 해결 수준 차이</strong>를 실시간으로 비교합니다.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs text-indigo-300 font-bold px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 self-start md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            <span>CoT 5-Tier Simulator</span>
          </div>
        </div>

        {/* SubTab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-indigo-500/20">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'scenarios'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-102'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span>🔬 1. 동일 난제 강도별 단계적 해결 비교 (Scenario Arena)</span>
          </button>

          <button
            onClick={() => setActiveTab('tiers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'tiers'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-102'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>📊 2. 5단계 레벨별 특성 & 4사 모델 지표</span>
          </button>

          <button
            onClick={() => setActiveTab('api-presets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'api-presets'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-102'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>💻 3. 4대사 공식 API 파라미터 코드</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Real Scenario Step-by-step Walkthrough */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          {/* Scenario Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REASONING_BENCHMARK_SCENARIOS.map((scenario: ReasoningBenchmarkScenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  selectedScenarioId === scenario.id
                    ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-600/20 scale-101'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-indigo-300 block w-fit mb-1 border border-indigo-500/30">
                  {scenario.category}
                </span>
                <h4 className="font-extrabold text-sm text-white">{scenario.title}</h4>
              </button>
            ))}
          </div>

          {/* Scenario Header & Problem Statement */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 shadow-xl">
            <div className="space-y-1 pb-3 border-b border-slate-800">
              <h4 className="text-base sm:text-lg font-extrabold text-white">
                {currentScenario.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>과제 상황:</strong> {currentScenario.problemStatement}
              </p>
              <p className="text-xs text-indigo-300 font-medium">
                💡 <strong>추론 강도가 결정적인 이유:</strong> {currentScenario.whyThinkingMatters}
              </p>
            </div>

            {/* 5-Level Stepper */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">
                👇 추론 강도를 클릭하여 AI의 사고 깊이와 해결 코드 변화를 확인하세요:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {currentScenario.levels.map((lvl: ScenarioStepResult) => (
                  <button
                    key={lvl.level}
                    onClick={() => setSelectedScenarioLevel(lvl.level)}
                    className={`p-3 rounded-2xl text-left transition-all border ${
                      selectedScenarioLevel === lvl.level
                        ? `bg-gradient-to-br ${getLevelColor(lvl.level)} text-white shadow-xl scale-102 border-white/40`
                        : 'bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs sm:text-sm">{lvl.level}</span>
                      <span className="text-[10px] font-mono opacity-80">{lvl.thinkingTime}</span>
                    </div>
                    <span className="text-[10px] block mt-1 font-bold truncate">
                      {lvl.verdict.split(' ')[0]} {lvl.verdict.split(' ')[1]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Level Deep-Dive Result Card */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-indigo-500/30 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-white bg-indigo-600 px-3 py-1 rounded-xl">
                    {currentScenarioStep.level} 모드 실행 결과
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-xl ${getVerdictBadge(currentScenarioStep.verdict)}`}>
                    {currentScenarioStep.verdict}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> {currentScenarioStep.thinkingTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5 text-purple-400" /> {currentScenarioStep.tokensUsed}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-300 font-bold">
                    <Coins className="w-3.5 h-3.5 text-yellow-400" /> {currentScenarioStep.cost}
                  </span>
                </div>
              </div>

              {/* AI Thought Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <span className="text-purple-300 font-bold flex items-center gap-1.5">
                  <Brain className="w-4 h-4" /> AI 내부 사고 과정 요약 (Chain-of-Thought):
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {currentScenarioStep.thoughtSummary}
                </p>
              </div>

              {/* Output Snippet */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>실제 산출 코드 / 증명 스니펫:</span>
                </span>
                <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed max-h-56">
                  {currentScenarioStep.outputCodeOrSnippet}
                </pre>
              </div>

              {/* Explanation */}
              <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300">
                <strong className="text-white block mb-0.5">최종 판정 및 원인:</strong>
                {currentScenarioStep.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Tiers Overview & 4 Models Metrics */}
      {activeTab === 'tiers' && (
        <div className="space-y-6">
          {/* 5-Tier Interactive Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {REASONING_EFFORT_TIERS_DATA.map((tier: ReasoningEffortTier) => (
              <button
                key={tier.level}
                onClick={() => setSelectedLevel(tier.level)}
                className={`p-3 rounded-2xl text-left transition-all border ${
                  selectedLevel === tier.level
                    ? `bg-gradient-to-br ${getLevelColor(tier.level)} text-white shadow-xl scale-102 border-white/30`
                    : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs sm:text-sm">{tier.level}</span>
                  <Gauge className="w-3.5 h-3.5 opacity-80" />
                </div>
                <span className="text-[11px] block mt-1 opacity-90 font-mono">{tier.avgThinkingTime}</span>
              </button>
            ))}
          </div>

          {/* Selected Tier Overview Bento Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
            {/* Tier Header & Summary */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${currentTier.badgeBg} ${currentTier.badgeColor}`}>
                    {currentTier.badge}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                  추론 강도: {currentTier.level} 모드 특성
                </h4>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  {currentTier.summary}
                </p>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-2.5 shrink-0 self-start lg:self-auto">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" /> 생각 시간
                  </span>
                  <span className="font-mono font-extrabold text-xs text-white">
                    {currentTier.avgThinkingTime}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
                    <Brain className="w-3 h-3 text-purple-400" /> Thinking 토큰
                  </span>
                  <span className="font-mono font-extrabold text-xs text-purple-300">
                    {currentTier.tokenConsumption.split(' ')[0]}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 block flex items-center justify-center gap-1">
                    <Coins className="w-3 h-3 text-yellow-400" /> 비용 배수
                  </span>
                  <span className="font-mono font-extrabold text-xs text-yellow-300">
                    {currentTier.costMultiplier}
                  </span>
                </div>
              </div>
            </div>

            {/* Best Use Cases & Caution Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <CheckCircle2 className="w-4 h-4" /> 이 추론 강도가 최적인 작업 (Best For)
                </span>
                <ul className="space-y-1 text-slate-300">
                  {currentTier.bestUseCases.map((useCase: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <AlertTriangle className="w-4 h-4" /> 주의사항 및 오남용 방지 (Caution)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {currentTier.cautionNote}
                </p>
              </div>
            </div>

            {/* 4 Models Performance at this Reasoning Level */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h5 className="text-base font-extrabold text-white">
                  {currentTier.level} 모드에서 모델별 실제 API 파라미터 & 벤치마크 점수
                </h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTier.models.map((m: ReasoningLevelModelData, idx: number) => {
                  const colors = getCompanyBadge(m.company);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                        <div>
                          <h6 className="font-extrabold text-white text-sm">{m.modelName}</h6>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${colors.bg} ${colors.text} uppercase`}>
                            {m.company}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right font-mono">
                            <span className="text-[10px] text-slate-400 block">건당 추정 비용</span>
                            <span className="font-extrabold text-xs text-yellow-300">{m.estimatedCostPerQuery}</span>
                          </div>

                          <a
                            href={m.officialDocsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800"
                            title="공식 CoT API 레퍼런스 문서 바로가기"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* API Parameter snippet */}
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center justify-between">
                        <span className="text-slate-500">API 설정:</span>
                        <code className="text-indigo-300 font-bold">{m.settingName}</code>
                      </div>

                      {/* Scores and Latency */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                          <span className="text-[10px] text-slate-400 block">응답 지연</span>
                          <span className="font-mono font-bold text-white text-xs">{m.latencySeconds}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                          <span className="text-[10px] text-slate-400 block">SWE-bench 코딩</span>
                          <span className="font-mono font-bold text-blue-400 text-xs">{m.sweBenchScore}%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                          <span className="text-[10px] text-slate-400 block">AIME 수학</span>
                          <span className="font-mono font-bold text-emerald-400 text-xs">{m.aimeMathScore}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: API Platform Presets & Code Generator */}
      {activeTab === 'api-presets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {API_PLATFORM_PRESETS.map((preset: ApiPlatformPreset, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-white">{preset.platform}</h4>
                      <span className="text-xs font-mono text-indigo-400">
                        파라미터: {preset.parameterName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={preset.docsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700"
                        title="공식 문서 바로가기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleCopyCode(`api-${idx}`, preset.codeSnippet)}
                        className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
                        title="코드 복사"
                      >
                        {copiedId === `api-${idx}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">최소 예산</span>
                      <span className="font-mono text-slate-300">{preset.minBudget}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">최대 예산</span>
                      <span className="font-mono text-indigo-300 font-bold">{preset.maxBudget}</span>
                    </div>
                  </div>

                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
                    {preset.codeSnippet}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
