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
  Newspaper,
  ShieldCheck,
} from 'lucide-react';
import {
  AGENTS_LAST_EXAM_SNAPSHOT,
  BENCHMARK_EXPLANATION_SOURCES,
  EVIDENCE_RULES,
  EXCEL_ARTIFACT_BENCHMARK,
  EXTERNAL_BENCHMARK_RESOURCES,
  INDEPENDENT_METHODOLOGY_SOURCE,
  INDEPENDENT_MEASUREMENTS,
  INDEPENDENT_MEASUREMENT_SNAPSHOT,
  INDEPENDENT_UNAVAILABLE_MODELS,
  MODEL_DATA_SNAPSHOT,
  MODEL_ML_BENCHMARK_SOURCE,
  OPENAI_BENCHMARK_SOURCE,
  OPENAI_PUBLISHED_BENCHMARK_GROUPS,
  POWERPOINT_ARTIFACT_BENCHMARK,
  PUBLISHED_BENCHMARKS,
  REPRODUCIBLE_LAB_REQUIREMENTS,
  VERIFIED_COST_EFFICIENCY_UPDATES,
  VERIFIED_MODEL_SPECS,
  type ArtifactBenchmarkMetric,
  type SourceReference,
} from '../data/modelRankingData';
import { MajorIssuesView } from './MajorIssuesView';

type ViewId = 'specs' | 'independent' | 'published' | 'issues' | 'methodology';
type IndependentMetric = 'intelligenceIndex' | 'outputTokensPerSecond' | 'costPerIndexTaskUsd';

const VIEW_OPTIONS: Array<{ id: ViewId; label: string; hint: string; icon: React.ElementType }> = [
  { id: 'specs', label: '공식 사양·요금', hint: '제공사 API 문서', icon: Database },
  { id: 'independent', label: '독립 동일조건 측정', hint: 'Artificial Analysis', icon: Gauge },
  { id: 'published', label: '실제 공개 평가', hint: '코딩·업무·산출물', icon: BarChart3 },
  { id: 'issues', label: '주요 이슈·변경사항', hint: '사용량 · 정책 · 장애 · 보상', icon: Newspaper },
  { id: 'methodology', label: '근거·검증 방법', hint: '출처와 한계', icon: ShieldCheck },
];

const INDEPENDENT_METRICS: Record<
  IndependentMetric,
  {
    label: string;
    unit: string;
    description: string;
    easyExplanation: string;
    interpretation: string;
    lowerIsBetter: boolean;
  }
> = {
  intelligenceIndex: {
    label: 'Intelligence Index',
    unit: '점',
    description: 'Artificial Analysis Intelligence Index v4.1.1의 종합 지표',
    easyExplanation: '전문 업무·도구 사용·터미널·과학 추론·지식·긴 문맥 등 9개 시험 결과를 하나로 묶은 점수입니다.',
    interpretation: '높을수록 이 평가 묶음에서는 강합니다. 모든 실제 업무의 성공률이나 모델의 절대 IQ를 뜻하지 않습니다.',
    lowerIsBetter: false,
  },
  outputTokensPerSecond: {
    label: '출력 속도',
    unit: 'tokens/s',
    description: '동일 기관이 first-party API에서 측정한 출력 토큰 속도',
    easyExplanation: '답변이 나오기 시작한 뒤 1초에 텍스트를 얼마나 빠르게 생성하는지 잽니다.',
    interpretation: '높을수록 생성은 빠르지만, 첫 답이 나오기까지의 대기 시간과 전체 작업 시간은 별도입니다.',
    lowerIsBetter: false,
  },
  costPerIndexTaskUsd: {
    label: '평가 과제당 비용',
    unit: 'USD',
    description: 'Intelligence Index 평가 과제 1건의 측정 비용',
    easyExplanation: '9개 평가를 돌릴 때 실제 사용한 입력·캐시·추론·출력 토큰을 가격표에 적용한 과제당 평균 비용입니다.',
    interpretation: '낮을수록 같은 평가를 싸게 수행한 것입니다. 월 구독료나 일반 사용자 질문 1회의 고정 가격은 아닙니다.',
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
        <p className="mt-2 leading-6 text-amber-100/80">
          날짜는 <strong>시험 실행일</strong>, <strong>결과 공개일</strong>, <strong>사이트 확인일</strong>, <strong>별도 가격 발표일</strong>을
          서로 바꾸어 쓰지 않습니다. 가격 발표는 기존 시험 점수·토큰 수·평가 비용을 소급 수정하지 않습니다.
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
        const longContextPricing = model.longContextPricing;
        const hasProviderLongContextTier =
          longContextPricing !== undefined && inputTokens >= longContextPricing.thresholdTokens;
        const inputRate = hasProviderLongContextTier
          ? longContextPricing.inputCostPer1M
          : model.inputCostPer1M * (hasOpenAiLongContextSurcharge ? 2 : 1);
        const outputRate = hasProviderLongContextTier
          ? longContextPricing.outputCostPer1M
          : model.outputCostPer1M * (hasOpenAiLongContextSurcharge ? 1.5 : 1);
        const pricingNote = hasProviderLongContextTier
          ? longContextPricing.label
          : hasOpenAiLongContextSurcharge
            ? 'OpenAI 272K 초과 장문 컨텍스트 할증'
            : '기본 Standard 단가 적용';
        return {
          model,
          cost: (inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate,
          adjustedPricing: hasProviderLongContextTier || hasOpenAiLongContextSurcharge,
          pricingNote,
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
            비용은 포함하지 않습니다. 각 모델에는 현재 단가의 적용 기간과 확인 가능한 이전·예정 단가를 함께
            표시하며, 원문 재확인일은 {MODEL_DATA_SNAPSHOT.localeDate}입니다.
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
                  <td className="px-4 py-4 text-slate-300">
                    <p>{model.releaseDate}</p>
                    <p className="mt-1 text-[10px] text-slate-600">원문 확인 {MODEL_DATA_SNAPSHOT.verifiedAt}</p>
                  </td>
                  <td className="px-4 py-4 font-mono font-bold text-white">{formatTokens(model.contextWindowTokens)}</td>
                  <td className="px-4 py-4 font-mono text-slate-200">{model.maxOutputNote ?? formatTokens(model.maxOutputTokens)}</td>
                  <td className="px-4 py-4">
                    <p className="font-mono font-bold text-emerald-300">{model.priceLabel}</p>
                    <p className="mt-1 max-w-[250px] text-xs leading-5 text-slate-500">{model.priceNote}</p>
                    <div className="mt-2 max-w-[270px] space-y-1 border-t border-slate-800 pt-2 text-[10px] leading-4">
                      <p className="text-emerald-200/80"><span className="font-bold">현재 적용:</span> {model.priceTiming.current}</p>
                      {model.priceTiming.previous && (
                        <p className="text-slate-500"><span className="font-bold text-slate-400">이전:</span> {model.priceTiming.previous}</p>
                      )}
                      {model.priceTiming.scheduled && (
                        <p className="text-amber-200/80"><span className="font-bold">예정·변경:</span> {model.priceTiming.scheduled}</p>
                      )}
                    </div>
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

      <section className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
          <div>
            <p className="text-xs font-bold text-emerald-300">테스트 결과와 분리한 공식 가격·정책 발표 · {MODEL_DATA_SNAPSHOT.localeDate} 확인</p>
            <h2 className="mt-1 font-black text-white">별도 가격·토큰 효율 업데이트</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
              단가 인하, 캐시 재사용, 한시 가격은 모두 현재 비용에 영향을 줍니다. 이 카드는 시험·측정 결과와
              별개인 가격 발표를 날짜와 함께 기록한 것이며, 기존 평가의 점수·토큰 수·비용값을 다시 계산하지 않습니다.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {VERIFIED_COST_EFFICIENCY_UPDATES.map((update) => (
            <article key={update.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black text-emerald-300">{update.provider} · 가격·정책 발표일 {update.priceAnnouncementDate}</p>
                  <h3 className="mt-1 text-sm font-black text-white">{update.title}</h3>
                </div>
                <SourceLink source={update.source} compact />
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-300">{update.summary}</p>
              <p className="mt-3 border-t border-slate-800 pt-3 text-[11px] leading-5 text-slate-400">
                <span className="font-bold text-slate-300">실무 해석: </span>{update.practicalMeaning}
              </p>
              <p className="mt-3 rounded-lg border border-amber-500/15 bg-amber-500/5 p-2 text-[10px] leading-4 text-amber-100/75">
                {update.caveat}
              </p>
            </article>
          ))}
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
              토큰 단가만 적용한 추정치입니다. OpenAI는 입력 272K 초과 시 입력 2배·출력 1.5배를,
              Grok 4.6은 입력 200K 이상일 때 $4/$12 장문 컨텍스트 단가를 자동 반영합니다. 캐시·배치·도구 비용은 제외합니다.
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
          {costs.map(({ model, cost, adjustedPricing, pricingNote }) => (
            <div key={model.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs font-bold text-slate-400">{model.modelName}</p>
              <p className="mt-1 font-mono text-xl font-black text-white">{formatMoney(cost)}</p>
              <p className={`mt-1 text-[11px] ${adjustedPricing ? 'text-amber-300' : 'text-slate-500'}`}>
                {pricingNote}
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
              독립 측정 · {INDEPENDENT_MEASUREMENT_SNAPSHOT.snapshotLabel} · max effort
            </span>
            <h2 className="mt-3 text-xl font-black text-white">Artificial Analysis 동일 스냅샷 비교</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              2026-08-20에 같은 기관의 모델 페이지에서 관측한 값을 고정 스냅샷으로 사용합니다. 이후 페이지 수치가
              바뀌어도 과거 관측값을 최신값처럼 덮어쓰지 않습니다. Intelligence Index는 절대적 ‘모델 서열’이 아니라
              해당 버전의 9개 평가 묶음에 대한 종합 지표입니다.
            </p>
            <p className="mt-2 text-xs leading-5 text-cyan-100/75">
              시험 실행일: {INDEPENDENT_MEASUREMENT_SNAPSHOT.resultRunDate} · 스냅샷 확인일: {INDEPENDENT_MEASUREMENT_SNAPSHOT.sourceCheckedAt}
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

        <div className="mt-5 grid gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-black text-cyan-300">쉽게 말하면</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">{meta.easyExplanation}</p>
          </div>
          <div>
            <p className="text-xs font-black text-cyan-300">점수를 읽는 법</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">{meta.interpretation}</p>
          </div>
        </div>

        {metric === 'costPerIndexTaskUsd' && (
          <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-xs leading-5 text-amber-100/80">
            <p><span className="font-black text-amber-200">이 비용 지표의 가격 기준: </span>{INDEPENDENT_MEASUREMENT_SNAPSHOT.costBasis}</p>
            <p className="mt-2">{INDEPENDENT_MEASUREMENT_SNAPSHOT.warning}</p>
          </div>
        )}

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
                    <a
                      href={row.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden items-center gap-1 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 sm:inline-flex"
                    >
                      원문 <ExternalLink className="h-3 w-3" />
                    </a>
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

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black text-white">전체 비교 대상의 측정 상태</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                수치가 없는 모델도 숨기지 않습니다. 미확인 값은 0점이 아니며 순위 계산에서 제외합니다.
              </p>
            </div>
            <a
              href={INDEPENDENT_METHODOLOGY_SOURCE.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-cyan-300 hover:text-cyan-200"
            >
              측정 방법 원문 <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {INDEPENDENT_UNAVAILABLE_MODELS.map((model) => (
              <div key={model.modelId} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-300">{model.modelName}</p>
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    동일조건 미확인
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-5 text-slate-500">{model.reason}</p>
              </div>
            ))}
          </div>
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
                  <div className="flex items-center gap-2">
                    <span>{row.metric}</span>
                    <span className="text-[10px] text-slate-600">{row.higherIsBetter ? '↑' : '↓'}</span>
                  </div>
                  <p className="mt-1 max-w-[260px] text-[11px] font-normal leading-4 text-slate-500">
                    {row.easyExplanation}
                  </p>
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
  const [comparisonGroupId, setComparisonGroupId] = useState(OPENAI_PUBLISHED_BENCHMARK_GROUPS[0].id);
  const benchmark = PUBLISHED_BENCHMARKS.find((item) => item.id === benchmarkId) ?? PUBLISHED_BENCHMARKS[0];
  const comparisonGroup =
    OPENAI_PUBLISHED_BENCHMARK_GROUPS.find((item) => item.id === comparisonGroupId) ??
    OPENAI_PUBLISHED_BENCHMARK_GROUPS[0];
  const reportedResults = benchmark.results.filter((result) => result.score !== null);
  const maxValue = Math.max(...reportedResults.map((result) => result.score ?? 0));
  const missingResults = benchmark.results.length - reportedResults.length;

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
              <div className="rounded-lg bg-slate-900 p-3 sm:col-span-3">
                <dt className="text-slate-600">결과 공개일 · 시험 실행일</dt>
                <dd className="mt-1 font-bold text-slate-300">
                  결과 공개 {benchmark.source.publishedAt ?? '원문 미기재'} · 개별 시험 실행일은 원문 미공개
                </dd>
              </div>
            </dl>
            <div className="mt-4 grid gap-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 lg:grid-cols-3">
              <div>
                <p className="text-xs font-black text-orange-300">쉽게 말하면</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{benchmark.easyExplanation}</p>
              </div>
              <div>
                <p className="text-xs font-black text-orange-300">예시 과제</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{benchmark.exampleTask}</p>
              </div>
              <div>
                <p className="text-xs font-black text-orange-300">점수를 읽는 법</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{benchmark.scoreMeaning}</p>
              </div>
            </div>
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
                  <span
                    className={`w-20 text-right font-mono text-sm font-black ${result.score === null ? 'text-amber-400/70' : 'text-white'}`}
                    title={result.score === null ? '이 원문의 같은 버전 표에 수치가 없습니다. 0점이 아닙니다.' : undefined}
                  >
                    {result.score === null ? '— 미보고' : result.score}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-5 text-slate-500">
              원문 보고 {reportedResults.length}/{benchmark.results.length}개 모델
              {missingResults > 0 && ` · 미보고 ${missingResults}개는 성능 0점이 아니라 이 원문에 비교 가능한 수치가 없다는 뜻입니다.`}
            </p>
            <p className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-5 text-amber-100/80">
              {benchmark.warning}
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="flex flex-col gap-4 border-b border-slate-800 p-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-300">2026-07-09 제공사 보고 · 원문 전체 비교 열 반영</p>
            <h2 className="mt-1 font-black text-white">OpenAI 공개 평가표 상세 보기</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              기존 화면은 원문에 있는 8~10개 모델 중 4개 열만 보였습니다. 이제 선택한 분야의 공개 모델 열을
              빠짐없이 옮기고, 원문이 비워 둔 값만 ‘미보고’로 남깁니다. 위 2026년 8월 모델 카드와는
              버전·하네스가 달라 직접 병합하지 않습니다. 결과 공개일은 2026-07-09이며, 원문이 행별 시험
              실행일을 일괄 공개하지 않은 경우에는 그 날짜를 시험일로 바꾸어 쓰지 않습니다.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 xl:items-end">
            <SourceLink source={OPENAI_BENCHMARK_SOURCE} />
            <div className="flex flex-wrap gap-2">
              {OPENAI_PUBLISHED_BENCHMARK_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setComparisonGroupId(group.id)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                    comparisonGroup.id === group.id
                      ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                      : 'border-slate-700 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-b border-slate-800 bg-slate-950/30 px-5 py-4">
          <p className="text-sm font-black text-white">{comparisonGroup.title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{comparisonGroup.description}</p>
        </div>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            style={{ minWidth: `${Math.max(900, comparisonGroup.columns.length * 142 + 350)}px` }}
          >
            <thead className="bg-slate-950/50 text-xs text-slate-500">
              <tr>
                <th className="sticky left-0 z-20 w-[350px] bg-slate-950 px-5 py-3 text-left">무엇을 테스트하나</th>
                {comparisonGroup.columns.map((column) => (
                  <th key={column.id} className="min-w-[138px] px-3 py-3 text-right">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {comparisonGroup.rows.map((row) => {
                const reportedValues = comparisonGroup.columns
                  .map((column) => row.values[column.id])
                  .filter((value): value is number => value !== null && value !== undefined);
                const best = Math.max(...reportedValues);
                return (
                  <tr key={row.benchmark}>
                    <td className="sticky left-0 z-10 bg-slate-950 px-5 py-4 align-top text-slate-300">
                      <p className="font-black">
                        {row.benchmark} <span className="text-[10px] text-slate-600">({row.metric})</span>
                      </p>
                      <p className="mt-1.5 text-[11px] font-normal leading-5 text-slate-400">{row.easyExplanation}</p>
                      <p className="mt-1 text-[10px] font-normal leading-4 text-emerald-300/70">{row.scoreMeaning}</p>
                      {row.caveat && (
                        <p className="mt-2 rounded border border-amber-500/20 bg-amber-500/5 p-2 text-[10px] font-normal leading-4 text-amber-200/70">
                          {row.caveat}
                        </p>
                      )}
                    </td>
                    {comparisonGroup.columns.map((column) => {
                      const value = row.values[column.id];
                      return (
                        <td
                          key={`${row.benchmark}-${column.id}`}
                          className={`px-3 py-4 text-right font-mono ${
                            value === null || value === undefined
                              ? 'text-amber-400/60'
                              : value === best
                                ? 'font-black text-emerald-300'
                                : 'text-slate-300'
                          }`}
                          title={value === null || value === undefined ? '원문 미보고 · 0점 아님' : undefined}
                        >
                          {value === null || value === undefined ? '— 미보고' : value.toLocaleString('en-US')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-slate-800 px-5 py-3 text-[11px] leading-5 text-slate-500">
          초록색은 같은 행에서 가장 높은 ‘보고값’입니다. 제공사 발표표이므로 독립 재측정으로 간주하지 않으며,
          미보고는 0점이나 실패가 아닙니다. 모델·에이전트 설정이 다르면 점수 차이에 하네스 영향도 포함됩니다.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold text-indigo-300">실제 에이전트 산출물 평가</p>
            <h2 className="mt-1 font-black text-white">Model ML 네이티브 PowerPoint·Excel 벤치마크</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
              Model ML의 에이전트 하네스로 문서와 워크북을 생성해 채점한 공개 결과입니다. PowerPoint는
              수백 개 덱과 세부 루브릭을 사용했습니다. OpenAI 고객 사례에 게시된 제3자 자체 평가이므로
              독립 기관 점수와는 구분합니다. 이 원문이 공개한 비교 대상은 아래 4개 모델뿐이므로 다른 모델의
              칸을 추정해 추가하지 않았습니다. 결과 공개일은 {MODEL_ML_BENCHMARK_SOURCE.publishedAt ?? '원문 미기재'}이며,
              상세 실행일은 원문 미공개입니다.
            </p>
          </div>
          <SourceLink source={MODEL_ML_BENCHMARK_SOURCE} />
        </div>
        <div className="mt-5 grid gap-4 2xl:grid-cols-2">
          <ArtifactTable title="PowerPoint 제작" icon={FileText} rows={POWERPOINT_ARTIFACT_BENCHMARK} />
          <ArtifactTable title="Excel 제작" icon={FileSpreadsheet} rows={EXCEL_ARTIFACT_BENCHMARK} />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/60">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold text-cyan-300">독립 운영 주체의 공개 리더보드 스냅샷</p>
            <h2 className="mt-1 font-black text-white">Agents’ Last Exam: 장기 전문 업무 실행 기록</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
              여러 산업의 실제 업무를 에이전트가 끝까지 수행하는지를 측정합니다. 모델 이름만이 아니라 사용한
              하네스, 부분 점수, 비용, 총 실행 시간을 같이 보므로 실제 도입 판단에 더 가까운 자료입니다.
            </p>
          </div>
          <SourceLink source={AGENTS_LAST_EXAM_SNAPSHOT.source} />
        </div>
        <div className="border-b border-slate-800 bg-cyan-500/5 px-5 py-3 text-xs leading-5 text-cyan-100/80">
          리더보드 스냅샷 확인일 {AGENTS_LAST_EXAM_SNAPSHOT.capturedAt} · {AGENTS_LAST_EXAM_SNAPSHOT.split} · 개별 실행일·당시 가격 기준은 원문 미공개
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-slate-950/50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">하네스</th>
                <th className="px-3 py-3 text-left">모델 · 설정</th>
                <th className="px-3 py-3 text-right">완벽 통과율</th>
                <th className="px-3 py-3 text-right">부분 점수</th>
                <th className="px-3 py-3 text-right">추정 총비용</th>
                <th className="px-5 py-3 text-right">총 실행 시간</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {AGENTS_LAST_EXAM_SNAPSHOT.runs.map((run) => (
                <tr key={`${run.harness}-${run.modelName}`} className="align-top hover:bg-slate-800/30">
                  <td className="px-5 py-3 font-bold text-cyan-200">{run.harness}</td>
                  <td className="px-3 py-3">
                    <p className="font-bold text-slate-200">{run.modelName}</p>
                    <p className="mt-1 text-[10px] text-slate-500">{run.effort}</p>
                    {run.note && <p className="mt-1 text-[10px] leading-4 text-amber-300/80">{run.note}</p>}
                  </td>
                  <td className="px-3 py-3 text-right font-mono font-black text-white">{run.passRate}%</td>
                  <td className="px-3 py-3 text-right font-mono text-slate-300">{run.partialScore}</td>
                  <td className="px-3 py-3 text-right font-mono text-slate-300">
                    {run.estimatedCostUsd === null ? '원문 미기재' : formatMoney(run.estimatedCostUsd)}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-slate-300">{run.totalRuntime ?? '원문 미기재'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-amber-500/20 bg-amber-500/5 px-5 py-3 text-[11px] leading-5 text-amber-100/80">
          {AGENTS_LAST_EXAM_SNAPSHOT.warning}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div>
          <p className="text-xs font-bold text-violet-300">추가로 참고할 공식 테스트·리더보드</p>
          <h2 className="mt-1 font-black text-white">한 가지 점수 대신, 작업 종류에 맞는 시험을 함께 보세요</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
            이 목록은 서로 다른 작업을 재는 운영 주체의 공식 자료입니다. 수치를 한 순위로 합치지 않고,
            실제 도입하려는 업무와 맞는 자료를 열어 조건·날짜·하네스를 확인하는 용도로 제공합니다.
          </p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
          {EXTERNAL_BENCHMARK_RESOURCES.map((resource) => (
            <article key={resource.id} className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black text-violet-300">{resource.category}</p>
                  <h3 className="mt-1 text-sm font-black text-white">{resource.title}</h3>
                </div>
                <a
                  href={resource.source.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${resource.title} 원문 열기`}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-800 hover:text-violet-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-300">{resource.easyExplanation}</p>
              <dl className="mt-4 space-y-2 border-t border-slate-800 pt-3 text-[11px] leading-5">
                <div>
                  <dt className="font-bold text-slate-500">이럴 때 참고</dt>
                  <dd className="text-slate-400">{resource.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-500">점수 해석</dt>
                  <dd className="text-slate-400">{resource.scoreGuide}</dd>
                </div>
              </dl>
              <p className="mt-3 rounded-lg border border-amber-500/15 bg-amber-500/5 p-2 text-[10px] leading-4 text-amber-100/70">
                {resource.comparabilityNote}
              </p>
              <a
                href={resource.source.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-300 hover:text-violet-200"
              >
                {resource.source.publisher} 원문 <ExternalLink className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

const MethodologyView = () => {
  const sources = useMemo(() => {
    const allSources = [
      ...VERIFIED_MODEL_SPECS.flatMap((model) => model.sources),
      ...INDEPENDENT_MEASUREMENTS.map((measurement): SourceReference => ({
        title: `${measurement.modelName} 독립 측정`,
        publisher: 'Artificial Analysis',
        url: measurement.sourceUrl,
      })),
      INDEPENDENT_METHODOLOGY_SOURCE,
      ...BENCHMARK_EXPLANATION_SOURCES,
      AGENTS_LAST_EXAM_SNAPSHOT.source,
      ...EXTERNAL_BENCHMARK_RESOURCES.map((resource) => resource.source),
      ...PUBLISHED_BENCHMARKS.map((benchmark) => benchmark.source),
      OPENAI_BENCHMARK_SOURCE,
      MODEL_ML_BENCHMARK_SOURCE,
    ];
    return Array.from(
      new Map<string, SourceReference>(allSources.map((source) => [source.url, source])).values(),
    );
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

      <nav className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5" aria-label="모델 비교 자료 종류">
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
      {activeView === 'issues' && <MajorIssuesView />}
      {activeView === 'methodology' && <MethodologyView />}
    </div>
  );
};
