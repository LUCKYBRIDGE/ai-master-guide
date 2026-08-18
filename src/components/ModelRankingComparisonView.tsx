import React, { useState, useMemo } from 'react';
import { 
  OBJECTIVE_MODEL_RANKINGS, 
  REAL_WORLD_TEST_SCENARIOS, 
  DEVELOPER_BLIND_REVIEWS,
  GAME_BENCHMARK_SCENARIOS,
  ObjectiveModelRank,
  RealWorldTestScenario,
  DeveloperBlindReview,
  GameBenchmarkScenario
} from '../data/modelRankingData';
import { 
  BarChart3, 
  Clock, 
  Coins, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  Scale,
  Sliders,
  Calendar,
  Layers,
  Flame,
  Info,
  FlaskConical,
  MessageSquareHeart,
  Star,
  ShieldCheck,
  Check,
  Copy,
  Terminal,
  Sparkles,
  TrendingUp,
  Cpu,
  Gamepad2,
  Boxes,
  PlaySquare,
  Compass,
  Trophy,
  Activity,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  LayoutGrid,
  TableProperties
} from 'lucide-react';

export type TableSortField = 
  | 'rank' 
  | 'modelName' 
  | 'companyName' 
  | 'releaseDate' 
  | 'sweBenchScore' 
  | 'mathScore' 
  | 'contextWindow' 
  | 'speedTokensPerSec' 
  | 'outputCostPer1M' 
  | 'inputCostPer1M';

export const ModelRankingComparisonView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'leaderboard' | 'test-lab' | 'game-lab' | 'developer-reviews'>('leaderboard');
  const [leaderboardViewMode, setLeaderboardViewMode] = useState<'chart' | 'table'>('chart');
  const [chartMetricSort, setChartMetricSort] = useState<'coding' | 'speed' | 'cost' | 'efficiency'>('coding');
  
  // Table Sorting State
  const [tableSortField, setTableSortField] = useState<TableSortField>('rank');
  const [tableSortDirection, setTableSortDirection] = useState<'asc' | 'desc'>('asc');

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [selectedGameScenarioIndex, setSelectedGameScenarioIndex] = useState<number>(0);
  const [scenarioDisplayMode, setScenarioDisplayMode] = useState<'both' | 'chart' | 'card'>('both');
  const [gameScenarioDisplayMode, setGameScenarioDisplayMode] = useState<'both' | 'chart' | 'card'>('both');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const currentScenario = REAL_WORLD_TEST_SCENARIOS[selectedScenarioIndex];
  const currentGameScenario = GAME_BENCHMARK_SCENARIOS[selectedGameScenarioIndex];

  const formatUsdCost = (cost: number) => {
    if (cost < 0.01) {
      return `$${cost.toFixed(3)}`; // e.g. $0.003, $0.005
    }
    return `$${cost.toFixed(2)}`; // e.g. $0.12, $0.78
  };

  const handleCopyPrompt = (promptText: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promptText);
    }
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Sorted model list for visual charts (Standardized on SWE-bench Verified)
  const sortedModelsForChart = useMemo(() => {
    const list = [...OBJECTIVE_MODEL_RANKINGS];
    if (chartMetricSort === 'coding') {
      return list.sort((a, b) => b.sweBenchScore - a.sweBenchScore);
    }
    if (chartMetricSort === 'speed') {
      return list.sort((a, b) => b.speedTokensPerSec - a.speedTokensPerSec);
    }
    if (chartMetricSort === 'cost') {
      return list.sort((a, b) => a.outputCostPer1M - b.outputCostPer1M);
    }
    if (chartMetricSort === 'efficiency') {
      // Efficiency ratio: (SWE-bench Verified Score / Output Cost)
      return list.sort((a, b) => {
        const effA = a.sweBenchScore / a.outputCostPer1M;
        const effB = b.sweBenchScore / b.outputCostPer1M;
        return effB - effA;
      });
    }
    return list;
  }, [chartMetricSort]);

  // Table sorting logic
  const handleTableSort = (field: TableSortField) => {
    if (tableSortField === field) {
      setTableSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setTableSortField(field);
      // High-to-low default for scores, speeds, context, releaseDate
      if (['sweBenchScore', 'mathScore', 'contextWindow', 'speedTokensPerSec', 'releaseDate'].includes(field)) {
        setTableSortDirection('desc');
      } else {
        setTableSortDirection('asc');
      }
    }
  };

  const resetTableSort = () => {
    setTableSortField('rank');
    setTableSortDirection('asc');
  };

  const sortedModelsForTable = useMemo(() => {
    const list = [...OBJECTIVE_MODEL_RANKINGS];
    return list.sort((a, b) => {
      let comparison = 0;
      switch (tableSortField) {
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'modelName':
          comparison = a.modelName.localeCompare(b.modelName);
          break;
        case 'companyName':
          comparison = a.companyName.localeCompare(b.companyName);
          break;
        case 'releaseDate':
          comparison = a.releaseDate.localeCompare(b.releaseDate);
          break;
        case 'sweBenchScore':
          comparison = a.sweBenchScore - b.sweBenchScore;
          break;
        case 'mathScore': {
          const numA = parseFloat(a.mathScore.replace(/[^0-9.]/g, '')) || 0;
          const numB = parseFloat(b.mathScore.replace(/[^0-9.]/g, '')) || 0;
          comparison = numA - numB;
          break;
        }
        case 'contextWindow': {
          const parseContext = (val: string) => {
            if (val.includes('2M')) return 2000000;
            if (val.includes('1M')) return 1000000;
            if (val.includes('200k') || val.includes('200K')) return 200000;
            if (val.includes('128k') || val.includes('128K')) return 128000;
            return parseInt(val.replace(/[^0-9]/g, '')) || 0;
          };
          comparison = parseContext(a.contextWindow) - parseContext(b.contextWindow);
          break;
        }
        case 'speedTokensPerSec':
          comparison = a.speedTokensPerSec - b.speedTokensPerSec;
          break;
        case 'outputCostPer1M':
          comparison = a.outputCostPer1M - b.outputCostPer1M;
          break;
        case 'inputCostPer1M':
          comparison = a.inputCostPer1M - b.inputCostPer1M;
          break;
        default:
          comparison = a.rank - b.rank;
      }
      return tableSortDirection === 'asc' ? comparison : -comparison;
    });
  }, [tableSortField, tableSortDirection]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <BarChart3 className="w-5 h-5 text-indigo-300" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                2026 최신 8대 프론티어 AI 모델 비교 & 실무·게임 구현 실측 랩
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              <strong>클로드 오퍼스5 / 소넷5, GPT-5.6 솔 / 테라 / 루나, 제미나 3.7 플래시 / 페이블(Fable), 그록 4.6</strong> 등 최신 모델들의 <strong>시각적 성능·비용·속도 비교 그래프, 3D 마인크래프트/게임 실측, 개발자 블라인드 리뷰</strong>를 한눈에 확인하세요.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-300 font-medium px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 self-start md:self-auto">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>2026.08 최신 실측 검증 데이터</span>
          </div>
        </div>

        {/* 4 Master Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('leaderboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-300" />
            <span>1. 시각적 비교 차트 & 공식 순위표</span>
          </button>

          <button
            onClick={() => setActiveSubTab('test-lab')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'test-lab'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-cyan-300" />
            <span>2. 실무 개발자 실측 비교 랩 (코딩 난제)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('game-lab')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'game-lab'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-400/30'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-emerald-300" />
            <span>3. 3D 게임 & 마인크래프트 월드 구현 실측 랩</span>
          </button>

          <button
            onClick={() => setActiveSubTab('developer-reviews')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'developer-reviews'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquareHeart className="w-4 h-4 text-pink-300" />
            <span>4. 실사용자 체감 평가 & 블라인드 리뷰</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Visual Metric Charts & Objective Leaderboard */}
      {activeSubTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* View Mode Toggle Bar (Visual Chart vs Table) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-400" /> 보기 방식 선택:
              </span>
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setLeaderboardViewMode('chart')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    leaderboardViewMode === 'chart'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>시각적 비교 그래프</span>
                </button>
                <button
                  onClick={() => setLeaderboardViewMode('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    leaderboardViewMode === 'table'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TableProperties className="w-3.5 h-3.5" />
                  <span>상세 제원표 (Table)</span>
                </button>
              </div>
            </div>

            {leaderboardViewMode === 'chart' && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                <span className="text-slate-400 font-mono text-[11px] shrink-0">정렬 기준:</span>
                <button
                  onClick={() => setChartMetricSort('coding')}
                  className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    chartMetricSort === 'coding'
                      ? 'bg-purple-600/30 text-purple-300 border-purple-500/50 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-850 hover:text-white'
                  }`}
                >
                  코딩 점수순
                </button>
                <button
                  onClick={() => setChartMetricSort('speed')}
                  className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    chartMetricSort === 'speed'
                      ? 'bg-cyan-600/30 text-cyan-300 border-cyan-500/50 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-850 hover:text-white'
                  }`}
                >
                  속도 빠른순
                </button>
                <button
                  onClick={() => setChartMetricSort('cost')}
                  className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    chartMetricSort === 'cost'
                      ? 'bg-amber-600/30 text-amber-300 border-amber-500/50 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-850 hover:text-white'
                  }`}
                >
                  비용 저렴한순
                </button>
                <button
                  onClick={() => setChartMetricSort('efficiency')}
                  className={`px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    chartMetricSort === 'efficiency'
                      ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-850 hover:text-white'
                  }`}
                >
                  가성비 효율순
                </button>
              </div>
            )}
          </div>

          {/* VISUAL CHARTS VIEW */}
          {leaderboardViewMode === 'chart' && (
            <div className="space-y-6">
              {/* Top 3 Core Metric Comparison Horizontal Bar Grids */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Chart A: Coding Intelligence Score */}
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-400" /> 코딩 벤치마크 (SWE-bench Verified 기준)
                    </span>
                    <span className="text-[10px] text-purple-300 font-mono">최고: Claude Opus 5 (74.8%)</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {sortedModelsForChart.map((m) => (
                      <div key={m.modelName} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-200 font-bold">{m.modelName}</span>
                            {m.secondaryCodingScore && (
                              <span className="text-[10px] text-slate-400 font-normal">({m.secondaryCodingScore})</span>
                            )}
                          </div>
                          <span className="text-purple-300 font-bold">{m.codingScore}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${(m.sweBenchScore / 80) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart B: Output Speed (Tokens/sec) */}
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-cyan-400" /> 출력 반응 속도 (초당 토큰수 t/s)
                    </span>
                    <span className="text-[10px] text-cyan-300 font-mono">최고 속도: Luna (220 t/s)</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {sortedModelsForChart.map((m) => (
                      <div key={m.modelName} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-200 font-bold">{m.modelName}</span>
                          <span className="text-cyan-300 font-bold">{m.speedTokensPerSec} t/s</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${(m.speedTokensPerSec / 220) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart C: Output Cost per 1M Tokens ($) */}
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-amber-400" /> 100만 토큰당 가격 (낮을수록 경제적)
                    </span>
                    <span className="text-[10px] text-emerald-300 font-mono">최저가: Gemini 3.7 Flash ($0.40/1M)</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {sortedModelsForChart.map((m) => (
                      <div key={m.modelName} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-200 font-bold">{m.modelName}</span>
                          <span className="text-amber-300 font-bold">
                            입력 ${m.inputCostPer1M.toFixed(2)} / 출력 ${m.outputCostPer1M.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (m.outputCostPer1M / 75) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2D Quadrant Positioning Map (성능 vs 비용 vs 속도 매트릭스) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-indigo-500/30 space-y-5 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-850">
                  <div className="space-y-0.5">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-indigo-400" /> 모델별 포지셔닝 및 활용 가이드
                    </h4>
                    <p className="text-xs text-slate-400">
                      프로젝트의 성격(고난도 아키텍처 설계 vs 빠른 풀스택 개발 vs 대용량 분석)에 맞춰 적합한 모델을 선택하세요.
                    </p>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono self-start sm:self-auto">2026.08 기준</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Zone 1 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-300 font-mono">
                        심층 추론 플래그십
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 font-mono">Deep Reasoning</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      복잡한 대규모 리팩토링이나 분산 시스템 난제 해결 시 가장 높은 자가 수정률을 보여주는 최상위 체급.
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-slate-850 text-xs font-mono">
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• Claude Opus 5</span>
                        <span className="text-purple-300">SWE 74.8%</span>
                      </div>
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• GPT-5.6 Sol</span>
                        <span className="text-emerald-300">AIME 96.7%</span>
                      </div>
                    </div>
                  </div>

                  {/* Zone 2 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300 font-mono">
                        고속 풀스택 주력 모델
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 font-mono">Fast & Smart</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      우수한 코딩 지능을 유지하면서도 빠른 속도와 합리적인 비용으로 일상 개발을 안정적으로 수행.
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-slate-850 text-xs font-mono">
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• Grok 4.6</span>
                        <span className="text-orange-300">190 t/s</span>
                      </div>
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• Claude Sonnet 5</span>
                        <span className="text-purple-300">$7.20 / 1M</span>
                      </div>
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• Claude Fable</span>
                        <span className="text-teal-300">UI/UX 특화</span>
                      </div>
                    </div>
                  </div>

                  {/* Zone 3 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 font-mono">
                        초광속 대용량 & 자동완성
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 font-mono">High Speed</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      초당 210~220토큰의 압도적 속도와 200만 대용량 컨텍스트로 대용량 코드와 일상 작업을 초고속 처리.
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-slate-850 text-xs font-mono">
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• Gemini 3.7 Flash</span>
                        <span className="text-cyan-300">210 t/s · 2M</span>
                      </div>
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• GPT-5.6 Terra</span>
                        <span className="text-slate-300">155 t/s</span>
                      </div>
                      <div className="flex items-center justify-between text-white font-bold">
                        <span>• GPT-5.6 Luna</span>
                        <span className="text-indigo-300">220 t/s · $2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DETAILED SPEC TABLE VIEW */}
          {leaderboardViewMode === 'table' && (
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <TableProperties className="w-5 h-5 text-cyan-400" /> 2026 최신 8대 프론티어 AI 모델 공식 제원표
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Anthropic, OpenAI, xAI, Google 공식 발표 데이터 기준 (표 헤더를 클릭하여 항목별 정렬 가능)
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono flex items-center gap-1.5 text-slate-300">
                    <span className="text-slate-400">정렬 기준:</span>
                    <strong className="text-cyan-300">
                      {tableSortField === 'rank' && '순위'}
                      {tableSortField === 'modelName' && '모델명'}
                      {tableSortField === 'companyName' && '제조사'}
                      {tableSortField === 'releaseDate' && '출시일'}
                      {tableSortField === 'sweBenchScore' && '코딩 점수 (SWE)'}
                      {tableSortField === 'mathScore' && '수학/추론 (AIME)'}
                      {tableSortField === 'contextWindow' && '컨텍스트 창'}
                      {tableSortField === 'speedTokensPerSec' && '출력 속도'}
                      {tableSortField === 'outputCostPer1M' && '토큰 요금 (출력)'}
                      {tableSortField === 'inputCostPer1M' && '토큰 요금 (입력)'}
                    </strong>
                    <span className="text-cyan-400">({tableSortDirection === 'asc' ? '▲ 오름차순' : '▼ 내림차순'})</span>
                  </div>

                  {tableSortField !== 'rank' && (
                    <button
                      onClick={resetTableSort}
                      className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono flex items-center gap-1 transition-all"
                      title="기본 순위로 초기화"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>초기화</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      {/* Rank Header */}
                      <th
                        onClick={() => handleTableSort('rank')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'rank' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>순위</span>
                          {tableSortField === 'rank' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Model Name Header */}
                      <th
                        onClick={() => handleTableSort('modelName')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'modelName' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>모델명</span>
                          {tableSortField === 'modelName' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Company Name Header */}
                      <th
                        onClick={() => handleTableSort('companyName')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'companyName' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>제조사</span>
                          {tableSortField === 'companyName' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Release Date Header */}
                      <th
                        onClick={() => handleTableSort('releaseDate')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'releaseDate' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>출시일</span>
                          {tableSortField === 'releaseDate' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Coding Score (SWE-bench) Header */}
                      <th
                        onClick={() => handleTableSort('sweBenchScore')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'sweBenchScore' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>코딩 점수 (SWE)</span>
                          {tableSortField === 'sweBenchScore' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Math Score (AIME) Header */}
                      <th
                        onClick={() => handleTableSort('mathScore')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'mathScore' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>수학/추론 (AIME)</span>
                          {tableSortField === 'mathScore' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Context Window Header */}
                      <th
                        onClick={() => handleTableSort('contextWindow')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'contextWindow' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>컨텍스트 창</span>
                          {tableSortField === 'contextWindow' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Output Speed Header */}
                      <th
                        onClick={() => handleTableSort('speedTokensPerSec')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'speedTokensPerSec' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>출력 속도</span>
                          {tableSortField === 'speedTokensPerSec' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Pricing Header */}
                      <th
                        onClick={() => handleTableSort('outputCostPer1M')}
                        className={`py-3 px-3 cursor-pointer select-none transition-colors rounded-t-lg group ${
                          tableSortField === 'outputCostPer1M' ? 'text-cyan-300 font-bold bg-slate-900/90' : 'hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>100만 토큰 가격 (입력/출력)</span>
                          {tableSortField === 'outputCostPer1M' ? (
                            tableSortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-cyan-400" /> : <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-40 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </th>

                      {/* Performance Tier Header */}
                      <th className="py-3 px-3">성능 체급 및 핵심 강점</th>
                      <th className="py-3 px-3 text-center">공식 문서</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-200">
                    {sortedModelsForTable.map((m: ObjectiveModelRank) => (
                      <tr key={m.modelName} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3.5 px-3 font-black text-sm text-indigo-400 font-mono">
                          #{m.rank}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-sm flex items-center gap-1.5">
                            <span>{m.modelName}</span>
                            <span className="text-[11px] text-slate-400 font-normal">({m.koreanName.split(' ')[0]})</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border inline-block mt-0.5 ${m.badgeColor}`}>
                            {m.badge}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-400 font-medium">{m.companyName}</td>
                        <td className="py-3.5 px-3 font-mono text-cyan-400">{m.releaseDate}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-purple-300">{m.codingScore}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-emerald-300">{m.mathScore}</td>
                        <td className="py-3.5 px-3 font-mono text-slate-300">{m.contextWindow}</td>
                        <td className="py-3.5 px-3 font-mono text-cyan-300 font-bold">{m.speedTokensPerSec} t/s</td>
                        <td className="py-3.5 px-3 font-mono">
                          <div className="text-[11px] space-y-0.5 font-bold">
                            <div className="text-slate-300">입력 <span className="text-amber-300">${m.inputCostPer1M.toFixed(2)}</span></div>
                            <div className="text-slate-300">출력 <span className="text-amber-400">${m.outputCostPer1M.toFixed(2)}</span></div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-300 max-w-sm leading-relaxed">{m.performanceTier}</td>
                        <td className="py-3.5 px-3 text-center">
                          <a
                            href={m.officialDocUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 text-xs"
                          >
                            <span>보기</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: Real-World Test Lab (Identical Practical Scenarios) */}
      {activeSubTab === 'test-lab' && (
        <div className="space-y-6">
          {/* Top Intro Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-cyan-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <FlaskConical className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">다양한 일상 & 실무 분야별 동일 프롬프트 실측 랩</strong>
                <span className="text-slate-300">교육용 앱, 비즈니스 문서, 데이터 시각화, 쇼핑몰 결제, AI 튜터, 코드 정리 등 7대 실무 과제를 동일 조건에서 측정한 결과</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-indigo-300 font-mono shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>총 7개 실무 시나리오 전수 비교</span>
            </div>
          </div>

          {/* Scenario Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {REAL_WORLD_TEST_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  selectedScenarioIndex === idx
                    ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white shadow-xl border-indigo-400 scale-[1.01] ring-1 ring-indigo-500/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {sc.category}
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">{sc.difficulty}</span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                    {sc.title}
                  </h5>
                </div>
              </button>
            ))}
          </div>

          {/* Active Scenario Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4" /> 실측 테스트 시나리오 상세
                </span>
                <span className="text-xs font-mono text-slate-400">
                  난이도: <strong className="text-amber-300">{currentScenario.difficulty}</strong>
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">{currentScenario.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentScenario.description}</p>
            </div>

            {/* Test Prompt Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 font-mono">
                  <Terminal className="w-3.5 h-3.5" /> 테스트에 사용된 실제 프롬프트:
                </span>
                <button
                  onClick={() => handleCopyPrompt(currentScenario.testPrompt)}
                  className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-white font-mono"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? '복사됨!' : '프롬프트 복사'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-emerald-300 leading-relaxed">
                "{currentScenario.testPrompt}"
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase font-mono flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-cyan-400" /> 동일 조건 8대 프론티어 AI 모델 실측 결과 (2026.08)
              </span>
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setScenarioDisplayMode('both')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    scenarioDisplayMode === 'both'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ✨ 종합 뷰 (그래프+카드)
                </button>
                <button
                  onClick={() => setScenarioDisplayMode('chart')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    scenarioDisplayMode === 'chart'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📊 시각적 그래프 뷰
                </button>
                <button
                  onClick={() => setScenarioDisplayMode('card')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    scenarioDisplayMode === 'card'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📋 상세 진단 카드 뷰
                </button>
              </div>
            </div>

            {/* VISUAL GRAPHS SECTION (소요시간, 비용, 통과율 바 차트) */}
            {(scenarioDisplayMode === 'both' || scenarioDisplayMode === 'chart') && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="space-y-0.5">
                    <h5 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" /> 실측 비교 시각화 그래프 (소요 시간 · 비용 · 성공률)
                    </h5>
                    <p className="text-xs text-slate-400">
                      동일한 프롬프트로 8대 모델을 전수 실행하여 실측된 객관적 지표를 가시적으로 비교합니다.
                    </p>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">
                    8대 모델 전수 측정 완료
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chart 1: 완결 소요 시간 (초) - 빠른 순 */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
                        <Zap className="w-3.5 h-3.5" /> 완결 소요 시간 (초)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">빠를수록 우수</span>
                    </div>

                    <div className="space-y-2.5">
                      {[...currentScenario.results]
                        .sort((a, b) => a.timeSeconds - b.timeSeconds)
                        .map((res, idx) => {
                          const maxTime = Math.max(...currentScenario.results.map(r => r.timeSeconds), 45);
                          const pct = (res.timeSeconds / maxTime) * 100;
                          return (
                            <div key={res.modelName} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${idx === 0 ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'}`}>
                                    #{idx + 1}
                                  </span>
                                  <span className="text-white font-bold">{res.modelName}</span>
                                </div>
                                <span className="text-cyan-300 font-bold">{res.timeSeconds}초</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    idx === 0
                                      ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-sm'
                                      : 'bg-cyan-500/70'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Chart 2: 실제 API 소모 비용 ($) - 경제적인 순 */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 font-mono">
                        <Coins className="w-3.5 h-3.5" /> 1회 생성 비용 ($)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">낮을수록 경제적</span>
                    </div>

                    <div className="space-y-2.5">
                      {[...currentScenario.results]
                        .sort((a, b) => a.estimatedCostUsd - b.estimatedCostUsd)
                        .map((res, idx) => {
                          const maxCost = Math.max(...currentScenario.results.map(r => r.estimatedCostUsd), 0.80);
                          const pct = (res.estimatedCostUsd / maxCost) * 100;
                          return (
                            <div key={res.modelName} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${idx === 0 ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'}`}>
                                    #{idx + 1}
                                  </span>
                                  <span className="text-white font-bold">{res.modelName}</span>
                                </div>
                                <span className="text-emerald-300 font-bold">{formatUsdCost(res.estimatedCostUsd)}</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    idx === 0
                                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-sm'
                                      : 'bg-emerald-500/70'
                                  }`}
                                  style={{ width: `${Math.max(4, pct)}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Chart 3: 1차 빌드 통과율 vs 에러 자가 수정 성공률 (%) */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 1차 통과율 / 자가 수정률
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">100% 만점</span>
                    </div>

                    <div className="space-y-2.5">
                      {[...currentScenario.results]
                        .sort((a, b) => b.firstPassPassRate - a.firstPassPassRate)
                        .map((res, idx) => (
                          <div key={res.modelName} className="space-y-1">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-white font-bold">{res.modelName}</span>
                              <span className="text-purple-300 font-bold">
                                {res.firstPassPassRate}% <span className="text-slate-500 font-normal">/</span> {res.selfHealingScore}%
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div
                                  className="h-full bg-purple-500 rounded-full"
                                  style={{ width: `${res.firstPassPassRate}%` }}
                                  title="1차 빌드 통과율"
                                ></div>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: `${res.selfHealingScore}%` }}
                                  title="자가 수정 성공률"
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid by Model (8대 모델 상세 진단 카드) */}
            {(scenarioDisplayMode === 'both' || scenarioDisplayMode === 'card') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase font-mono block">
                    🧪 8대 모델별 상세 진단 & 장단점 분석 ({currentScenario.results.length}개 모델)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    모든 모델 동일 프롬프트 실측
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {currentScenario.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div>
                            <h5 className="font-bold text-white text-sm">{res.modelName}</h5>
                            <span className="text-[10px] text-slate-400 font-mono">{res.company}</span>
                          </div>

                          <div className="text-right font-mono">
                            <span className="text-xs font-bold text-cyan-300 block">
                              ⏱️ {res.timeSeconds}초
                            </span>
                            <span className="text-[10px] text-emerald-400 block font-bold">
                              💰 {formatUsdCost(res.estimatedCostUsd)}
                            </span>
                          </div>
                        </div>

                        {/* Stat Bars */}
                        <div className="space-y-1 text-[10px] font-mono">
                          <div className="flex justify-between text-slate-300">
                            <span>1차 실행 성공:</span>
                            <strong className="text-purple-300">{res.firstPassPassRate}%</strong>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${res.firstPassPassRate}%` }}
                            ></div>
                          </div>

                          <div className="flex justify-between text-slate-300 pt-0.5">
                            <span>에러 자가 수정:</span>
                            <strong className="text-emerald-300">{res.selfHealingScore}%</strong>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${res.selfHealingScore}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Verdict */}
                        <div className="p-2 rounded-xl bg-slate-950 text-[11px] text-slate-300 leading-snug">
                          👉 {res.verdict}
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div className="pt-2 border-t border-slate-800 text-[10px] space-y-1">
                        <div className="text-emerald-400">
                          <strong>👍</strong> {res.pros}
                        </div>
                        <div className="text-amber-400">
                          <strong>⚠️</strong> {res.cons}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Game & World Generation Lab (3D Minecraft / DOOM / Physics / Roguelike) */}
      {activeSubTab === 'game-lab' && (
        <div className="space-y-6">
          {/* Top Intro Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Boxes className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">인터랙티브 3D 게임 & 월드 생성 실측 벤치마크 (8대 모델 전수 측정)</strong>
                <span className="text-slate-300">실제 Three.js 복셀 마인크래프트, 3D 레이캐스팅 FPS, 물리 엔진, 절차적 맵 생성을 1회 프롬프트로 구현한 실측 데이터</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>공식 오픈소스 & 데모 링크 검증 완료</span>
            </div>
          </div>

          {/* Game Benchmark Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {GAME_BENCHMARK_SCENARIOS.map((game, idx) => (
              <button
                key={game.id}
                onClick={() => setSelectedGameScenarioIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  selectedGameScenarioIndex === idx
                    ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 text-white shadow-xl border-purple-400 scale-[1.01] ring-1 ring-purple-500/30 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {game.categoryBadge}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">{game.difficulty}</span>
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                  {game.title}
                </h5>
                <span className="text-[11px] text-cyan-300 font-mono mt-1 block">
                  🛠️ {game.techStack}
                </span>
              </button>
            ))}
          </div>

          {/* Active Game Benchmark Scenario Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                    {currentGameScenario.categoryBadge}
                  </span>
                  <h4 className="text-lg font-bold text-white">{currentGameScenario.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentGameScenario.description}
                </p>
              </div>

              {/* Verified Sources & Demo Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
                <a
                  href={currentGameScenario.verifiedSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-mono transition-all border border-slate-800"
                >
                  <span>공식 레포/튜토리얼</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                {currentGameScenario.demoUrl && (
                  <a
                    href={currentGameScenario.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-mono transition-all border border-purple-500/30"
                  >
                    <span>실제 데모 확인</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
                  </a>
                )}
              </div>
            </div>

            {/* Prompt Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 font-mono">
                  <Terminal className="w-3.5 h-3.5" /> 게임 생성에 사용된 실제 프롬프트:
                </span>
                <button
                  onClick={() => handleCopyPrompt(currentGameScenario.promptUsed)}
                  className="flex items-center gap-1 text-[11px] text-purple-300 hover:text-white font-mono"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? '복사됨!' : '프롬프트 복사'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-purple-200 leading-relaxed whitespace-pre-wrap">
                "{currentGameScenario.promptUsed}"
              </p>
            </div>

            {/* View Mode Toggle for Games */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase font-mono flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-purple-400" /> 8대 모델 게임 구현 실측 지표
              </span>
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setGameScenarioDisplayMode('both')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    gameScenarioDisplayMode === 'both'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ✨ 종합 뷰
                </button>
                <button
                  onClick={() => setGameScenarioDisplayMode('chart')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    gameScenarioDisplayMode === 'chart'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📊 렌더링/FPS 그래프
                </button>
                <button
                  onClick={() => setGameScenarioDisplayMode('card')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    gameScenarioDisplayMode === 'card'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📋 상세 카드 뷰
                </button>
              </div>
            </div>

            {/* GAME VISUAL CHARTS (생성 소요시간 & FPS 바 차트) */}
            {(gameScenarioDisplayMode === 'both' || gameScenarioDisplayMode === 'chart') && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h5 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-400" /> 3D 게임 엔진 구현 속도 & 렌더링 프레임(FPS) 그래프
                  </h5>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 font-mono border border-purple-500/20">
                    목표치: 60 FPS 무결점 렌더링
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Game Chart 1: 게임 엔진 생성 소요 시간 (초) */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
                        <Zap className="w-3.5 h-3.5" /> 게임 생성 소요 시간 (초)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">빠를수록 우수</span>
                    </div>

                    <div className="space-y-2.5">
                      {[...currentGameScenario.results]
                        .sort((a, b) => a.buildTimeSec - b.buildTimeSec)
                        .map((res, idx) => {
                          const maxTime = Math.max(...currentGameScenario.results.map(r => r.buildTimeSec), 40);
                          const pct = (res.buildTimeSec / maxTime) * 100;
                          return (
                            <div key={res.modelName} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${idx === 0 ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'}`}>
                                    #{idx + 1}
                                  </span>
                                  <span className="text-white font-bold">{res.modelName}</span>
                                </div>
                                <span className="text-cyan-300 font-bold">{res.buildTimeSec}초</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    idx === 0
                                      ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-sm'
                                      : 'bg-cyan-500/70'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Game Chart 2: 렌더링 프레임 레이트 (FPS) */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 font-mono">
                        <Activity className="w-3.5 h-3.5" /> 렌더링 프레임 (FPS)
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">60 FPS 만점</span>
                    </div>

                    <div className="space-y-2.5">
                      {[...currentGameScenario.results]
                        .sort((a, b) => b.fps - a.fps)
                        .map((res, idx) => {
                          const pct = (res.fps / 60) * 100;
                          return (
                            <div key={res.modelName} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <span className="text-white font-bold">{res.modelName}</span>
                                <span className={`font-bold ${res.fps >= 60 ? 'text-emerald-300' : 'text-cyan-300'}`}>
                                  {res.fps} FPS {res.fps >= 60 && '🎯'}
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    res.fps >= 60
                                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm'
                                      : 'bg-cyan-500/70'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Model Game Performance Cards (8대 모델 상세 진단 카드) */}
            {(gameScenarioDisplayMode === 'both' || gameScenarioDisplayMode === 'card') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase font-mono">
                    🎮 8대 모델별 게임 구현 상세 카드 ({currentGameScenario.results.length}개 모델)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    기준: 60fps 부드러움 / 버그 없는 충돌 판정
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {currentGameScenario.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div>
                            <h5 className="font-bold text-white text-sm flex items-center gap-1.5">
                              {idx === 0 && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                              {res.modelName}
                            </h5>
                            <span className="text-[10px] text-slate-400 font-mono">{res.company}</span>
                          </div>

                          <div className="text-right font-mono">
                            <span className="text-xs font-bold text-cyan-300 block">
                              ⏱️ {res.buildTimeSec}초
                            </span>
                            <span className="text-[10px] text-emerald-400 font-bold block">
                              🎯 {res.fps} FPS
                            </span>
                          </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> 1회 성공
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
                            <Activity className="w-3 h-3" /> {res.fps} FPS
                          </span>
                        </div>

                        {/* Mechanics Verdict */}
                        <div className="p-2 rounded-xl bg-slate-950 text-[11px] text-slate-300 leading-snug">
                          🎮 {res.mechanicsVerdict}
                        </div>
                      </div>

                      {/* Strengths & Limitations */}
                      <div className="pt-2 border-t border-slate-800 text-[10px] space-y-1">
                        <div className="text-emerald-400">
                          <strong>✨</strong> {res.keyStrength}
                        </div>
                        <div className="text-amber-400">
                          <strong>⚠️</strong> {res.limitations}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 4: Developer Feedback & Workflow Guide */}
      {activeSubTab === 'developer-reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-pink-400" /> 현업 개발자들의 실무 체감 피드백 & 활용 가이드
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                실제 개발 현장에서 각 모델을 활용해본 엔지니어들의 특징 분석 및 권장 작업
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">총 8개 모델 가이드</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEVELOPER_BLIND_REVIEWS.map((rev: DeveloperBlindReview) => (
              <div
                key={rev.id}
                className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3.5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <div>
                      <h5 className="font-bold text-white text-sm">{rev.modelName}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">{rev.developerRole}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {rev.company}
                    </span>
                  </div>

                  {/* Real Experience Quote */}
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-2xl border border-slate-850">
                    "{rev.realExperience}"
                  </p>

                  {/* Key Advantage & Consideration */}
                  <div className="space-y-1.5 text-[10px] font-mono">
                    <div className="text-emerald-400">
                      <strong>✨ 장점:</strong> {rev.keyAdvantage}
                    </div>
                    <div className="text-slate-400">
                      <strong>💡 유의:</strong> {rev.consideration}
                    </div>
                  </div>
                </div>

                {/* Recommended Workflow */}
                <div className="pt-2 border-t border-slate-850 text-[11px] text-indigo-300 font-mono">
                  🎯 <strong>권장 작업:</strong> {rev.recommendedWorkflow}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
