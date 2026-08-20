import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  BarChart3,
  Calculator,
  Database,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Gauge,
  Info,
  ShieldCheck,
} from 'lucide-react';
import {
  EVIDENCE_RULES,
  EXCEL_ARTIFACT_BENCHMARK,
  INDEPENDENT_MEASUREMENTS,
  MODEL_DATA_SNAPSHOT,
  MODEL_ML_BENCHMARK_SOURCE,
  OPENAI_BENCHMARK_SOURCE,
  OPENAI_PUBLISHED_BENCHMARKS,
  POWERPOINT_ARTIFACT_BENCHMARK,
  PUBLISHED_BENCHMARKS,
  REPRODUCIBLE_LAB_REQUIREMENTS,
  VERIFIED_MODEL_SPECS,
  type ArtifactBenchmarkMetric,
  type SourceReference,
} from '../data/modelRankingData';

type ViewId = 'specs' | 'independent' | 'published' | 'methodology';
type IndependentMetric = 'intelligenceIndex' | 'outputTokensPerSecond' | 'costPerIndexTaskUsd';

const VIEW_OPTIONS: Array<{ id: ViewId; label: string; hint: string; icon: React.ElementType }> = [
  { id: 'specs', label: '공식 사양·요금', hint: '제공사 API 문서', icon: Database },
  { id: 'independent', label: '독립 동일조건 측정', hint: 'Artificial Analysis', icon: Gauge },
  { id: 'published', label: '실제 공개 평가', hint: '코딩·업무·산출물', icon: BarChart3 },
  { id: 'methodology', label: '근거·검증 방법', hint: '출처와 한계', icon: ShieldCheck },
];

const INDEPENDENT_METRICS: Record<
  IndependentMetric,
  { label: string; unit: string; description: string; lowerIsBetter: boolean }
> = {
  intelligenceIndex: {
    label: 'Intelligence Index',
    unit: '점',
    description: 'Artificial Analysis Intelligence Index v4.1.1의 종합 지표',
    lowerIsBetter: false,
  },
  outputTokensPerSecond: {
    label: '출력 속도',
    unit: 'tokens/s',
    description: '동일 기관이 first-party API에서 측정한 출력 토큰 속도',
    lowerIsBetter: false,
  },
  costPerIndexTaskUsd: {
    label: '평가 과제당 비용',
    unit: 'USD',
    description: 'Intelligence Index 평가 과제 1건의 측정 비용',
    lowerIsBetter: true,
  },
};

const MODEL_COLORS: Record<string, string> = {
  'claude-opus-5': 'bg-purple-400',
  'claude-fable-5': 'bg-teal-400',
  'gpt-5-6-sol': 'bg-emerald-400',
  'grok-4-6': 'bg-orange-400',
  'gpt-5-6-terra': 'bg-slate-300',
  'claude-sonnet-5': 'bg-violet-400',
  'gpt-5-6-luna': 'bg-indigo-400',
  'gemini-3-7-flash': 'bg-blue-400',
};

const formatTokens = (value: number | null) => {
  if (value === null) return '공식 문서 미기재';
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 2)}M`;
  return `${Math.round(value / 1_000)}K`;
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 4 : 2,
  }).format(value);

const SourceLink: React.FC<{ source: SourceReference; compact?: boolean }> = ({ source, compact = false }) => (
  <a
    href={source.url}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/40 underline-offset-4"
  >
    {compact ? source.publisher : source.title}
    <ExternalLink className="h-3 w-3" aria-hidden="true" />
  </a>
);

const EvidenceNotice = () => (
  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
    <div className="flex items-start gap-3">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
      <div>
        <p className="font-bold">먼저 확인할 점</p>
        <p className="mt-1 leading-6 text-amber-100/80">
          아래 수치는 이 사이트가 API를 직접 돌려 만든 결과가 아닙니다. 공식 API 문서, 독립 평가기관의
          측정값, 공개된 모델 카드·실사용 벤치마크를 출처별로 옮겼습니다. 실행 조건이 다른 결과를 하나의
          종합 순위로 합산하지 않습니다.
        </p>
      </div>
    </div>
  </div>
);

const SpecsView = () => {
  const [inputTokens, setInputTokens] = useState(50_000);
  const [outputTokens, setOutputTokens] = useState(5_000);

  const costs = useMemo(
    () =>
      VERIFIED_MODEL_SPECS.map((model) => {
        const hasOpenAiLongContextSurcharge =
          model.companyName === 'OpenAI' && inputTokens > 272_000;
        const inputRate = model.inputCostPer1M * (hasOpenAiLongContextSurcharge ? 2 : 1);
        const outputRate = model.outputCostPer1M * (hasOpenAiLongContextSurcharge ? 1.5 : 1);
        return {
          model,
          cost: (inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate,
          surcharge: hasOpenAiLongContextSurcharge,
        };
      }),
    [inputTokens, outputTokens],
  );

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="border-b border-slate-800 p-5">
          <div className="flex items-center gap-2 text-emerald-300">
            <BadgeCheck className="h-5 w-5" />
            <h2 className="font-black text-white">제공사 공식 API 사양</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            가격은 입력 / 출력 100만 토큰당 Standard API 요금입니다. 캐시·배치·Fast mode·도구 호출
            비용은 포함하지 않습니다.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[1120px] w-full text-left text-sm">
            <thead className="bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">모델</th>
                <th className="px-4 py-3">출시·문서 기준</th>
                <th className="px-4 py-3">컨텍스트</th>
                <th className="px-4 py-3">최대 출력</th>
                <th className="px-4 py-3">입력 / 출력 요금</th>
                <th className="px-4 py-3">입력 모달리티</th>
                <th className="px-4 py-3">공식 출처</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {VERIFIED_MODEL_SPECS.map((model) => (
                <tr key={model.id} className="align-top hover:bg-slate-800/30">
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${model.badgeColor}`}>
                      {model.modelName}
                    </span>
                    <p className="mt-2 max-w-[220px] text-xs leading-5 text-slate-400">{model.role}</p>
                    <code className="mt-1 block text-[11px] text-slate-500">{model.apiModelId}</code>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{model.releaseDate}</td>
                  <td className="px-4 py-4 font-mono font-bold text-white">{formatTokens(model.contextWindowTokens)}</td>
                  <td className="px-4 py-4 font-mono text-slate-200">{formatTokens(model.maxOutputTokens)}</td>
                  <td className="px-4 py-4">
                    <p className="font-mono font-bold text-emerald-300">{model.priceLabel}</p>
                    <p className="mt-1 max-w-[250px] text-xs leading-5 text-slate-500">{model.priceNote}</p>
                  </td>
                  <td className="px-4 py-4 max-w-[180px] text-slate-300">{model.inputModalities}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-start gap-2 text-xs">
                      {model.sources.map((source) => (
                        <SourceLink key={source.url} source={source} compact />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-300" />
              <h2 className="font-black text-white">공식 단가 기반 요청 비용 계산기</h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              토큰 단가만 적용한 추정치입니다. OpenAI 모델은 입력이 272K를 넘으면 공식 장문 컨텍스트
              할증(입력 2배·출력 1.5배)을 자동 반영합니다.
            </p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-xl">
            <label className="text-xs font-bold text-slate-400">
              입력 토큰
              <input
                type="number"
                min={0}
                value={inputTokens}
                onChange={(event) => setInputTokens(Math.max(0, Number(event.target.value) || 0))}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-indigo-500"
              />
            </label>
            <label className="text-xs font-bold text-slate-400">
              출력 토큰
              <input
                type="number"
                min={0}
                value={outputTokens}
                onChange={(event) => setOutputTokens(Math.max(0, Number(event.target.value) || 0))}
                className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-indigo-500"
              />
            </label>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {costs.map(({ model, cost, surcharge }) => (
            <div key={model.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs font-bold text-slate-400">{model.modelName}</p>
              <p className="mt-1 font-mono text-xl font-black text-white">{formatMoney(cost)}</p>
              <p className={`mt-1 text-[11px] ${surcharge ? 'text-amber-300' : 'text-slate-500'}`}>
                {surcharge ? '장문 컨텍스트 할증 적용' : '기본 Standard 단가 적용'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const IndependentView = () => {
  const [metric, setMetric] = useState<IndependentMetric>('intelligenceIndex');
  const meta = INDEPENDENT_METRICS[metric];
  const rows = useMemo(
    () =>
      [...INDEPENDENT_MEASUREMENTS].sort((a, b) =>
        meta.lowerIsBetter ? a[metric] - b[metric] : b[metric] - a[metric],
      ),
    [metric, meta.lowerIsBetter],
  );
  const maxValue = Math.max(...rows.map((row) => row[metric]));

  const formatMetric = (value: number) => {
    if (metric === 'costPerIndexTaskUsd') return formatMoney(value);
    return `${value.toLocaleString('en-US')} ${meta.unit}`;
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-300">
              독립 측정 · v4.1.1 · max effort
            </span>
            <h2 className="mt-3 text-xl font-black text-white">Artificial Analysis 동일 스냅샷 비교</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              같은 기관이 공개한 현재 모델 페이지의 값을 사용했습니다. Intelligence Index는 절대적
              ‘모델 서열’이 아니라 해당 버전의 9개 평가 묶음에 대한 종합 지표입니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(INDEPENDENT_METRICS) as IndependentMetric[]).map((metricId) => (
              <button
                key={metricId}
                type="button"
                onClick={() => setMetric(metricId)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
                  metric === metricId
                    ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {INDEPENDENT_METRICS[metricId].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-white">{meta.label}</p>
              <p className="mt-1 text-xs text-slate-500">{meta.description}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400">
              {meta.lowerIsBetter ? <ArrowDown className="h-3.5 w-3.5" /> : <ArrowUp className="h-3.5 w-3.5" />}
              {meta.lowerIsBetter ? '낮을수록 좋음' : '높을수록 좋음'}
            </span>
          </div>
          <div className="mt-5 space-y-4">
            {rows.map((row, index) => (
              <div key={row.modelId}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="w-5 font-mono text-xs text-slate-600">{index + 1}</span>
                    <span className="truncate font-bold text-slate-200">{row.modelName}</span>
                    <span className="hidden text-[11px] text-slate-500 sm:inline">{row.effort}</span>
                  </div>
                  <span className="shrink-0 font-mono font-black text-white">{formatMetric(row[metric])}</span>
                </div>
                <div className="ml-7 h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${MODEL_COLORS[row.modelId] ?? 'bg-indigo-400'}`}
                    style={{ width: `${Math.max(2, (row[metric] / maxValue) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-xs leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Grok 4.6과 Gemini 3.7 Flash는 이 스냅샷에서 동일 조건 모델 페이지를 확인하지 못해 표에서
            제외했습니다. 0점이나 추정값으로 채우지 않았습니다.
          </p>
          <a
            href={INDEPENDENT_MEASUREMENTS[0].sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 font-bold text-cyan-300 hover:text-cyan-200"
          >
            원문 예시 <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </section>
    </div>
  );
};

const ArtifactTable: React.FC<{
  title: string;
  icon: React.ElementType;
  rows: ArtifactBenchmarkMetric[];
}> = ({ title, icon: Icon, rows }) => (
  <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
    <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
      <Icon className="h-4 w-4 text-emerald-300" />
      <h4 className="font-bold text-white">{title}</h4>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-[660px] w-full text-sm">
        <thead className="text-xs text-slate-500">
          <tr>
            <th className="px-4 py-3 text-left">실제 측정 항목</th>
            <th className="px-3 py-3 text-right">GPT-5.6 Sol</th>
            <th className="px-3 py-3 text-right">Claude Opus 5</th>
            <th className="px-3 py-3 text-right">Claude Fable 5</th>
            <th className="px-4 py-3 text-right">GPT-5.6 Terra</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row) => {
            const values = [row.sol, row.opus, row.fable, row.terra];
            const best = row.higherIsBetter ? Math.max(...values) : Math.min(...values);
            const format = (value: number) =>
              row.unit === '%' ? `${value}%` : `${value} ${row.unit}`;
            return (
              <tr key={row.metric}>
                <td className="px-4 py-3 font-medium text-slate-300">
                  {row.metric}
                  <span className="ml-2 text-[10px] text-slate-600">
                    {row.higherIsBetter ? '↑' : '↓'}
                  </span>
                </td>
                {[row.sol, row.opus, row.fable, row.terra].map((value, index) => (
                  <td
                    key={`${row.metric}-${index}`}
                    className={`px-3 py-3 text-right font-mono ${
                      value === best ? 'font-black text-emerald-300' : 'text-slate-300'
                    }`}
                  >
                    {format(value)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const PublishedView = () => {
  const [benchmarkId, setBenchmarkId] = useState(PUBLISHED_BENCHMARKS[0].id);
  const benchmark = PUBLISHED_BENCHMARKS.find((item) => item.id === benchmarkId) ?? PUBLISHED_BENCHMARKS[0];
  const reportedResults = benchmark.results.filter((result) => result.score !== null);
  const maxValue = Math.max(...reportedResults.map((result) => result.score ?? 0));

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
          <div className="xl:w-72 xl:shrink-0">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-xs font-bold text-orange-300">
              공개된 실제 평가 결과
            </span>
            <h2 className="mt-3 text-xl font-black text-white">Grok 4.6 모델 카드 교차 평가</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              SpaceXAI가 공개한 모델 카드에서 최신 모델을 함께 제시한 표입니다. 사이트 자체 측정이 아니며,
              표마다 평가자와 하네스를 표시합니다.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {PUBLISHED_BENCHMARKS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBenchmarkId(item.id)}
                  className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    benchmark.id === item.id
                      ? 'border-orange-400/50 bg-orange-500/15 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block text-xs font-black">{item.title}</span>
                  <span className="mt-0.5 block text-[10px]">{item.category} · {item.metric}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold text-orange-300">{benchmark.category} · {benchmark.metric}</p>
                <h3 className="mt-1 text-lg font-black text-white">{benchmark.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{benchmark.description}</p>
              </div>
              <SourceLink source={benchmark.source} />
            </div>
            <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
              <div className="rounded-lg bg-slate-900 p-3">
                <dt className="text-slate-600">평가자</dt>
                <dd className="mt-1 font-bold text-slate-300">{benchmark.evaluator}</dd>
              </div>
              <div className="rounded-lg bg-slate-900 p-3">
                <dt className="text-slate-600">하네스</dt>
                <dd className="mt-1 font-bold text-slate-300">{benchmark.harness}</dd>
              </div>
              <div className="rounded-lg bg-slate-900 p-3">
                <dt className="text-slate-600">표본·산식</dt>
                <dd className="mt-1 font-bold text-slate-300">{benchmark.sampleInfo}</dd>
              </div>
            </dl>
            <div className="mt-5 space-y-3">
              {benchmark.results.map((result) => (
                <div key={result.modelId} className="grid grid-cols-[minmax(130px,220px)_1fr_auto] items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-300">{result.modelName}</p>
                    <p className="text-[10px] text-slate-600">{result.effort}</p>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    {result.score !== null && (
                      <div
                        className={`h-full rounded-full ${MODEL_COLORS[result.modelId] ?? 'bg-indigo-400'}`}
                        style={{ width: `${Math.max(2, (result.score / maxValue) * 100)}%` }}
                      />
                    )}
                  </div>
                  <span className={`w-16 text-right font-mono text-sm font-black ${result.score === null ? 'text-slate-600' : 'text-white'}`}>
                    {result.score === null ? '미보고' : result.score}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-5 text-amber-100/80">
              {benchmark.warning}
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-300">2026-07-09 공개 당시의 실제 평가표</p>
            <h2 className="mt-1 font-black text-white">OpenAI GPT-5.6 계열 비교</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              OpenAI 발표 자료 한 표에 함께 실린 결과입니다. 위의 2026년 8월 모델 카드 수치와는 버전·하네스가
              달라 직접 병합하지 않습니다.
            </p>
          </div>
          <SourceLink source={OPENAI_BENCHMARK_SOURCE} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-sm">
            <thead className="bg-slate-950/50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">벤치마크</th>
                <th className="px-3 py-3 text-right">GPT-5.6 Sol</th>
                <th className="px-3 py-3 text-right">GPT-5.6 Terra</th>
                <th className="px-3 py-3 text-right">GPT-5.6 Luna</th>
                <th className="px-5 py-3 text-right">Claude Fable 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {OPENAI_PUBLISHED_BENCHMARKS.map((row) => {
                const best = Math.max(row.sol, row.terra, row.luna, row.fable);
                return (
                  <tr key={row.benchmark}>
                    <td className="px-5 py-3 font-bold text-slate-300">
                      {row.benchmark} <span className="text-[10px] text-slate-600">({row.metric})</span>
                    </td>
                    {[row.sol, row.terra, row.luna, row.fable].map((value, index) => (
                      <td
                        key={`${row.benchmark}-${index}`}
                        className={`px-3 py-3 text-right font-mono ${value === best ? 'font-black text-emerald-300' : 'text-slate-300'}`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold text-indigo-300">실제 에이전트 산출물 평가</p>
            <h2 className="mt-1 font-black text-white">Model ML 네이티브 PowerPoint·Excel 벤치마크</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
              Model ML의 에이전트 하네스로 문서와 워크북을 생성해 채점한 공개 결과입니다. PowerPoint는
              수백 개 덱과 세부 루브릭을 사용했습니다. OpenAI 고객 사례에 게시된 제3자 자체 평가이므로
              독립 기관 점수와는 구분합니다.
            </p>
          </div>
          <SourceLink source={MODEL_ML_BENCHMARK_SOURCE} />
        </div>
        <div className="mt-5 grid gap-4 2xl:grid-cols-2">
          <ArtifactTable title="PowerPoint 제작" icon={FileText} rows={POWERPOINT_ARTIFACT_BENCHMARK} />
          <ArtifactTable title="Excel 제작" icon={FileSpreadsheet} rows={EXCEL_ARTIFACT_BENCHMARK} />
        </div>
      </section>
    </div>
  );
};

const MethodologyView = () => {
  const sources = useMemo(() => {
    const allSources = [
      ...VERIFIED_MODEL_SPECS.flatMap((model) => model.sources),
      ...PUBLISHED_BENCHMARKS.map((benchmark) => benchmark.source),
      OPENAI_BENCHMARK_SOURCE,
      MODEL_ML_BENCHMARK_SOURCE,
    ];
    return Array.from(new Map(allSources.map((source) => [source.url, source])).values());
  }, []);

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-300" />
          <h2 className="font-black text-white">이 페이지의 증거 규칙</h2>
        </div>
        <ol className="mt-5 space-y-3">
          {EVIDENCE_RULES.map((rule, index) => (
            <li key={rule} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm leading-6 text-slate-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 font-mono text-xs font-black text-emerald-300">
                {index + 1}
              </span>
              {rule}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-cyan-300" />
          <h2 className="font-black text-white">향후 ‘자체 실측’ 공개 조건</h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          아래 조건과 원본 로그가 모두 공개되기 전에는 사이트 자체 실측 결과로 표시하지 않습니다.
        </p>
        <ul className="mt-5 space-y-3">
          {REPRODUCIBLE_LAB_REQUIREMENTS.map((requirement) => (
            <li key={requirement} className="flex gap-3 text-sm leading-6 text-slate-300">
              <Activity className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
              {requirement}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 xl:col-span-2">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-300" />
          <h2 className="font-black text-white">원문 출처 목록</h2>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          검증일 {MODEL_DATA_SNAPSHOT.localeDate}. 가격과 모델 사양은 변동될 수 있으므로 구매·도입 전 원문을 다시 확인하세요.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-indigo-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-indigo-300">{source.publisher}</p>
                  <p className="mt-1 text-sm font-bold leading-5 text-slate-200 group-hover:text-white">{source.title}</p>
                  {source.publishedAt && <p className="mt-2 text-[11px] text-slate-600">발행 {source.publishedAt}</p>}
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-indigo-300" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ModelRankingComparisonView: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewId>('published');

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-5 sm:p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
              출처 검증 완료
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-950/50 px-2.5 py-1 text-slate-400">
              데이터 기준 {MODEL_DATA_SNAPSHOT.verifiedAt}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl text-2xl font-black tracking-tight text-white sm:text-4xl">
            프론티어 AI 모델 공식 데이터와 실제 성능 비교
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
            공식 사양과 가격, 독립 기관의 동일 조건 측정, 실제 공개 코딩·업무·산출물 평가를 분리해
            보여줍니다. 출처가 다른 점수를 억지로 평균내거나 ‘종합 1위’로 만들지 않습니다.
          </p>
        </div>
      </section>

      <EvidenceNotice />

      <nav className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="모델 비교 자료 종류">
        {VIEW_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = activeView === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setActiveView(option.id)}
              className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                isActive
                  ? 'border-indigo-400/50 bg-indigo-500/15 shadow-lg shadow-indigo-950/30'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <span className={`rounded-xl p-2 ${isActive ? 'bg-indigo-500/20 text-indigo-200' : 'bg-slate-800 text-slate-400'}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className={`block text-xs font-black ${isActive ? 'text-white' : 'text-slate-300'}`}>{option.label}</span>
                <span className="mt-0.5 block text-[10px] text-slate-500">{option.hint}</span>
              </span>
            </button>
          );
        })}
      </nav>

      {activeView === 'specs' && <SpecsView />}
      {activeView === 'independent' && <IndependentView />}
      {activeView === 'published' && <PublishedView />}
      {activeView === 'methodology' && <MethodologyView />}
    </div>
  );
};
