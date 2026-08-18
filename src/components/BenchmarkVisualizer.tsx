import React, { useState } from 'react';
import { BENCHMARK_METRICS_DATA, MODEL_RADAR_PROFILES } from '../data/benchmarkData';
import { BenchmarkMetric, ModelBenchmarkScore, ModelRadarProfile, ModelTier } from '../types/ai';
import { ReasoningEffortSimulator } from './ReasoningEffortSimulator';
import { 
  BarChart3, 
  Trophy, 
  Sparkles, 
  Flame, 
  Zap, 
  CalendarCheck, 
  HelpCircle, 
  Compass, 
  Cpu, 
  Coins, 
  Layers, 
  Filter, 
  CheckCircle2, 
  Globe2, 
  Brain,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const BenchmarkVisualizer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'benchmarks' | 'reasoning-effort'>('benchmarks');
  const [selectedMetricId, setSelectedMetricId] = useState<string>('swe-bench-verified');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | ModelTier>('all');

  const currentMetric = BENCHMARK_METRICS_DATA.find((m: BenchmarkMetric) => m.id === selectedMetricId) || BENCHMARK_METRICS_DATA[0];

  const filteredScores = currentMetric.scores.filter((score: ModelBenchmarkScore) => {
    if (selectedTierFilter === 'all') return true;
    return score.tier === selectedTierFilter;
  });

  const getCompanyColor = (company: string) => {
    switch (company) {
      case 'anthropic': return { bar: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 'openai': return { bar: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
      case 'google': return { bar: 'bg-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
      case 'xai': return { bar: 'bg-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
      case 'opensource': return { bar: 'bg-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
      case 'meta': return { bar: 'bg-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' };
      default: return { bar: 'bg-slate-500', text: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/30' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Switcher: 14-Model Benchmarks vs Reasoning Effort Simulator */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('benchmarks')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'benchmarks'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>📊 14대 AI 모델 벤치마크 그래프</span>
          </button>

          <button
            onClick={() => setActiveSubTab('reasoning-effort')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'reasoning-effort'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-indigo-400 hover:text-indigo-300 border border-indigo-500/20'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>🧠 추론 강도별 (Low ~ Max) 차이 시뮬레이터</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono px-3 hidden sm:block">
          2026.08 Verified Benchmarks
        </div>
      </div>

      {/* SubTab 1: 14-Model Benchmarks */}
      {activeSubTab === 'benchmarks' && (
        <div className="space-y-8">
          {/* Intro Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <BarChart3 className="w-6 h-6" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    2026 차세대 AI 모델 공식 벤치마크 & 멀티 모델 비교
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  OpenAI(Sol/Terra/Luna), Anthropic(Opus/Fable/Sonnet), Google(Gemini 3.7 Flash/Pro), xAI(Grok 4.6) 및 오픈소스 SOTA(DeepSeek-V3.5, Llama 4, Qwen 3)를 아우르는 <strong>14개 주요 모델의 벤치마크 점수</strong>를 비교합니다.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs text-emerald-400 font-bold px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 self-start md:self-auto">
                <CalendarCheck className="w-4 h-4" />
                <span>최신 검증 기준: 2026년 8월</span>
              </div>
            </div>

            {/* Benchmark Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
              {BENCHMARK_METRICS_DATA.map((metric: BenchmarkMetric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetricId(metric.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    selectedMetricId === metric.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-102'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${selectedMetricId === metric.id ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>{metric.name.split('(')[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Interactive Bar Chart Section */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
            {/* Metric Info & Official Source Link */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                    {currentMetric.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {currentMetric.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  {currentMetric.whatItMeasures}
                </p>
              </div>

              {/* Official Source Link Button */}
              <a
                href={currentMetric.officialLeaderboardUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shrink-0 self-start lg:self-auto"
              >
                <ShieldCheck className="w-4 h-4 text-blue-200" />
                <span>출처: {currentMetric.sourceOrgName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Tier Filter Buttons */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 self-start lg:self-auto overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-slate-500" /> 필터:
                </span>
                <button
                  onClick={() => setSelectedTierFilter('all')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedTierFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  전체 ({currentMetric.scores.length})
                </button>
                <button
                  onClick={() => setSelectedTierFilter('flagship')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedTierFilter === 'flagship'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                >
                  👑 플래그십
                </button>
                <button
                  onClick={() => setSelectedTierFilter('balanced')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedTierFilter === 'balanced'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  ⚖️ 밸런스/워크호스
                </button>
                <button
                  onClick={() => setSelectedTierFilter('opensource')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedTierFilter === 'opensource'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-purple-300'
                  }`}
                >
                  🌐 오픈소스/가성비
                </button>
              </div>

              <div className="text-[11px] text-slate-400">
                공식 검증 데이터 (클릭 시 원본 페이지 이동)
              </div>
            </div>

            {/* Real-World Meaning Callout */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
              <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">실무 관점의 해석:</strong>
                {currentMetric.realWorldMeaning}
              </div>
            </div>

            {/* Horizontal Bar Chart List */}
            <div className="space-y-3.5 pt-2">
              {filteredScores.map((scoreItem: ModelBenchmarkScore, idx: number) => {
                const colors = getCompanyColor(scoreItem.company);
                const percentage = (scoreItem.score / currentMetric.maxScore) * 100;
                return (
                  <div
                    key={scoreItem.modelId}
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-white text-sm">
                          {scoreItem.modelName}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} uppercase`}>
                          {scoreItem.company}
                        </span>
                        {scoreItem.costNote && (
                          <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                            {scoreItem.costNote}
                          </span>
                        )}
                        {scoreItem.isWinner && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-amber-400" />
                            1위 Winner
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="font-mono font-black text-sm sm:text-base text-white shrink-0">
                          {scoreItem.score}
                          <span className="text-xs font-normal text-slate-400 ml-0.5">{scoreItem.unit}</span>
                        </div>

                        {scoreItem.sourceDocUrl && (
                          <a
                            href={scoreItem.sourceDocUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-500 hover:text-blue-400 transition-colors p-1"
                            title="공식 개발자 문서 바로가기"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Bar */}
                    <div className="w-full h-3 sm:h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model Capabilities & Cost-Efficiency Profile Cards (8 Major Models) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-extrabold text-white">
                  8대 주요 모델 종합 역량 및 비용 경제성 분석
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                * 100점 만점 환산 지표 (클릭 시 공식 요금표/문서 이동)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MODEL_RADAR_PROFILES.map((profile: ModelRadarProfile) => {
                const colors = getCompanyColor(profile.company);
                return (
                  <div
                    key={profile.modelId}
                    className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-4 hover:shadow-2xl hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                        <div>
                          <h4 className="font-extrabold text-sm text-white">{profile.modelName}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${colors.bg} ${colors.text} uppercase`}>
                            {profile.company}
                          </span>
                        </div>

                        <a
                          href={profile.officialPricingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800"
                          title="공식 가격표 및 문서 보기"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Cost Tier Badge */}
                      <div className="mt-2.5 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-bold text-slate-200">
                        {profile.costTierLabel}
                      </div>

                      {/* Capability Metric Sliders */}
                      <div className="space-y-2 mt-3 text-xs">
                        <div>
                          <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                            <span>💻 실전 코딩 역량</span>
                            <span className="font-mono font-bold text-white">{profile.codingStrength}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${profile.codingStrength}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                            <span>📐 수학/논리 추론</span>
                            <span className="font-mono font-bold text-white">{profile.mathReasoning}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${profile.mathReasoning}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                            <span>🧬 박사급 과학 지식</span>
                            <span className="font-mono font-bold text-white">{profile.phdScience}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${profile.phdScience}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                            <span>📚 롱컨텍스트 메모리</span>
                            <span className="font-mono font-bold text-white">{profile.longContext}/100</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${profile.longContext}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                            <span>💰 토큰 비용 경제성</span>
                            <span className={`font-mono font-bold ${profile.costEfficiency > 70 ? 'text-emerald-400' : profile.costEfficiency < 40 ? 'text-rose-400' : 'text-amber-400'}`}>
                              {profile.costEfficiency}/100
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                profile.costEfficiency > 70 ? 'bg-emerald-500' : profile.costEfficiency < 40 ? 'bg-rose-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${profile.costEfficiency}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 mt-2">
                      {profile.highlightSummary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 2: Reasoning Effort Simulator */}
      {activeSubTab === 'reasoning-effort' && (
        <section>
          <ReasoningEffortSimulator />
        </section>
      )}
    </div>
  );
};
