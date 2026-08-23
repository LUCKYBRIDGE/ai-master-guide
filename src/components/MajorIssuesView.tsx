import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
  Filter,
  Landmark,
  RotateCcw,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  CATEGORY_LABELS,
  COMMUNITY_SCALE_LABELS,
  EVIDENCE_LEVEL_LABELS,
  MAJOR_ISSUES,
  MAJOR_ISSUES_SNAPSHOT,
  PROVIDER_LABELS,
  VERIFICATION_STATUS_LABELS,
  type CommunityScale,
  type IssueCategory,
  type IssueProvider,
  type IssueSource,
  type VerificationStatus,
} from '../data/majorIssuesData';

type EvidenceFilter = 'all' | 'user' | 'staff' | 'official-status' | 'official-doc';

type FilterOption<T extends string> = {
  value: T;
  label: string;
};

const PROVIDER_OPTIONS: Array<FilterOption<'all' | IssueProvider>> = [
  { value: 'all', label: '전체' },
  ...Object.entries(PROVIDER_LABELS).map(([value, label]) => ({ value: value as IssueProvider, label })),
];

const CATEGORY_OPTIONS: Array<FilterOption<'all' | IssueCategory>> = [
  { value: 'all', label: '전체' },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value: value as IssueCategory, label })),
];

const COMMUNITY_OPTIONS: Array<FilterOption<'all' | CommunityScale>> = [
  { value: 'all', label: '전체' },
  { value: 'individual', label: '개별' },
  { value: 'multiple', label: '복수' },
  { value: 'many', label: '다수' },
  { value: 'broad-discussion', label: '광범위' },
  { value: 'unknown', label: '판단 어려움' },
];

const EVIDENCE_OPTIONS: Array<FilterOption<EvidenceFilter>> = [
  { value: 'all', label: '전체' },
  { value: 'user', label: '사용자 보고' },
  { value: 'staff', label: '관계자' },
  { value: 'official-status', label: '공식 상태' },
  { value: 'official-doc', label: '공식 문서·공지' },
];

const STATUS_OPTIONS: Array<FilterOption<'all' | VerificationStatus>> = [
  { value: 'all', label: '전체' },
  { value: 'watching', label: '관찰 중' },
  { value: 'partially-confirmed', label: '부분 확인' },
  { value: 'confirmed', label: '공식 확인' },
  { value: 'resolved', label: '해결' },
  { value: 'refuted', label: '반박' },
];

const sourceTypeLabel: Record<IssueSource['sourceType'], string> = {
  'official-doc': '공식 문서',
  'official-status': '공식 상태',
  'official-announcement': '공식 발표',
  staff: '관계자',
  support: '공식 커뮤니티',
  github: 'GitHub',
  media: '언론',
  community: '사용자 보고',
};

const communityBadgeClass: Record<CommunityScale, string> = {
  individual: 'border-slate-600 bg-slate-800/70 text-slate-300',
  multiple: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  many: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
  'broad-discussion': 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300',
  unknown: 'border-slate-700 bg-slate-900 text-slate-400',
};

const statusBadgeClass: Record<VerificationStatus, string> = {
  watching: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  'partially-confirmed': 'border-orange-500/30 bg-orange-500/10 text-orange-300',
  confirmed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  resolved: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  refuted: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
};

const providerBadgeClass: Record<IssueProvider, string> = {
  OpenAI: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  Anthropic: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  Google: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  xAI: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
};

const matchesEvidenceFilter = (sources: IssueSource[], filter: EvidenceFilter) => {
  if (filter === 'all') return true;
  if (filter === 'user') return sources.some((source) => ['community', 'github'].includes(source.sourceType));
  if (filter === 'staff') return sources.some((source) => source.sourceType === 'staff');
  if (filter === 'official-status') return sources.some((source) => source.sourceType === 'official-status');
  return sources.some((source) => ['official-doc', 'official-announcement'].includes(source.sourceType));
};

const FilterPills = <T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<FilterOption<T>>;
  onChange: (value: T) => void;
}) => (
  <div className="min-w-0">
    <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p>
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label={label}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`shrink-0 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${
              selected
                ? 'border-indigo-400/50 bg-indigo-500/15 text-indigo-100'
                : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  </div>
);

export const MajorIssuesView: React.FC = () => {
  const [provider, setProvider] = useState<'all' | IssueProvider>('all');
  const [category, setCategory] = useState<'all' | IssueCategory>('all');
  const [communityScale, setCommunityScale] = useState<'all' | CommunityScale>('all');
  const [evidence, setEvidence] = useState<EvidenceFilter>('all');
  const [status, setStatus] = useState<'all' | VerificationStatus>('all');

  const issues = useMemo(
    () =>
      MAJOR_ISSUES.filter((issue) => {
        const providerMatch = provider === 'all' || issue.provider === provider;
        const categoryMatch = category === 'all' || issue.category === category;
        const communityMatch = communityScale === 'all' || issue.communityScale === communityScale;
        const evidenceMatch = matchesEvidenceFilter(issue.sources, evidence);
        const statusMatch = status === 'all' || issue.verificationStatus === status;
        return providerMatch && categoryMatch && communityMatch && evidenceMatch && statusMatch;
      }).sort(
        (a, b) => new Date(b.lastMajorUpdateAt).getTime() - new Date(a.lastMajorUpdateAt).getTime(),
      ),
    [provider, category, communityScale, evidence, status],
  );

  const hasActiveFilters =
    provider !== 'all' || category !== 'all' || communityScale !== 'all' || evidence !== 'all' || status !== 'all';

  const resetFilters = () => {
    setProvider('all');
    setCategory('all');
    setCommunityScale('all');
    setEvidence('all');
    setStatus('all');
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-900/60">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-black text-indigo-300">
                  {MAJOR_ISSUES_SNAPSHOT.earliestIncludedDate} 이후
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-950/60 px-2.5 py-1 text-xs font-bold text-slate-400">
                  원문 재확인 {MAJOR_ISSUES_SNAPSHOT.verifiedAt}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">AI 주요 이슈·변경사항 타임라인</h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
                사용량 한도, reset·보상, 장애, 가격·결제, 모델 접근과 정책 변화를 최신 주요 업데이트 순으로 정리합니다.
                사용자들이 많이 이야기했다는 사실과 실제 공식 영향 범위는 서로 다른 정보이므로 별도 배지와 문장으로 표시합니다.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs leading-5 text-slate-400 lg:max-w-sm">
              <p className="font-black text-slate-200">정렬 원칙</p>
              <p className="mt-1">
                <strong className="text-indigo-300">최근 주요 업데이트 날짜</strong>가 가장 최신인 항목이 위에 옵니다.
                단순 재확인일은 순서를 바꾸지 않습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-px border-t border-slate-800 bg-slate-800 sm:grid-cols-3">
          <div className="bg-slate-950/80 p-4">
            <div className="flex items-center gap-2 text-fuchsia-300">
              <Users className="h-4 w-4" aria-hidden="true" />
              <p className="text-xs font-black">사용자 논의 규모</p>
            </div>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">소수·다수 여부를 나타내며 사실 확인 수준이나 피해율은 아닙니다.</p>
          </div>
          <div className="bg-slate-950/80 p-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <p className="text-xs font-black">근거 수준</p>
            </div>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">사용자 보고, 관계자 발언, 공식 Status·문서를 구분합니다.</p>
          </div>
          <div className="bg-slate-950/80 p-4">
            <div className="flex items-center gap-2 text-cyan-300">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              <p className="text-xs font-black">공식 영향 범위</p>
            </div>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">커뮤니티 반응과 별도로 회사가 밝힌 실제 영향 범위를 표시합니다.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5" aria-label="주요 이슈 필터">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-indigo-300" aria-hidden="true" />
            <h3 className="text-sm font-black text-white">필터</h3>
            <span className="text-xs text-slate-500">{issues.length}/{MAJOR_ISSUES.length}건</span>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-bold text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            필터 초기화
          </button>
        </div>
        <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          <FilterPills label="제공사" value={provider} options={PROVIDER_OPTIONS} onChange={setProvider} />
          <FilterPills label="유형" value={category} options={CATEGORY_OPTIONS} onChange={setCategory} />
          <FilterPills label="사용자 논의" value={communityScale} options={COMMUNITY_OPTIONS} onChange={setCommunityScale} />
          <FilterPills label="근거" value={evidence} options={EVIDENCE_OPTIONS} onChange={setEvidence} />
          <FilterPills label="상태" value={status} options={STATUS_OPTIONS} onChange={setStatus} />
        </div>
      </section>

      {issues.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center">
          <Activity className="mx-auto h-8 w-8 text-slate-600" aria-hidden="true" />
          <h3 className="mt-3 font-black text-white">선택한 조건에 맞는 이슈가 없습니다.</h3>
          <p className="mt-1 text-sm text-slate-500">필터를 하나씩 해제하거나 전체 조건으로 돌아가세요.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-black text-indigo-200 hover:bg-indigo-500/20"
          >
            필터 초기화
          </button>
        </section>
      ) : (
        <div className="space-y-4" aria-live="polite">
          {issues.map((issue) => (
            <article key={issue.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-black text-slate-200">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {issue.displayDate}
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${providerBadgeClass[issue.provider]}`}>
                      {PROVIDER_LABELS[issue.provider]}
                    </span>
                    <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-400">
                      {CATEGORY_LABELS[issue.category]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-7 text-white sm:text-xl">{issue.title}</h3>
                  <p className="mt-1 text-xs font-bold text-slate-500">{issue.product}</p>
                </div>
                <div className="flex max-w-xl flex-wrap gap-2 lg:justify-end">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${communityBadgeClass[issue.communityScale]}`}>
                    사용자 논의: {COMMUNITY_SCALE_LABELS[issue.communityScale]}
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-black text-emerald-300">
                    근거: {EVIDENCE_LEVEL_LABELS[issue.evidenceLevel]}
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${statusBadgeClass[issue.verificationStatus]}`}>
                    상태: {VERIFICATION_STATUS_LABELS[issue.verificationStatus]}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">{issue.summary}</p>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">관측·적용 기간</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-slate-300">
                    {issue.periodStart
                      ? issue.periodEnd
                        ? `${issue.periodStart} ~ ${issue.periodEnd}`
                        : `${issue.periodStart} ~`
                      : issue.displayDate}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">공식 영향 범위</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-cyan-200">{issue.officialImpact?.label ?? '공식 영향 범위 미공개'}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">영향 대상</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{issue.affectedScope.join(' · ')}</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">마지막 원문 확인</p>
                  <p className="mt-1 text-xs font-bold text-slate-300">{issue.lastCheckedAt}</p>
                  <p className="mt-1 text-[10px] text-slate-600">정렬에는 사용하지 않음</p>
                </div>
              </div>

              {issue.officialImpact?.detail && (
                <div className="mt-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-xs leading-5 text-cyan-100/80">
                  <strong className="text-cyan-200">공식 영향 해석: </strong>{issue.officialImpact.detail}
                </div>
              )}

              {issue.communityScaleBasis && (
                <div className="mt-3 rounded-xl border border-fuchsia-500/15 bg-fuchsia-500/5 p-3 text-xs leading-5 text-fuchsia-100/75">
                  <strong className="text-fuchsia-200">논의 규모 판정 근거: </strong>{issue.communityScaleBasis}
                </div>
              )}

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    <h4 className="text-xs font-black">확인된 사실</h4>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-300">
                    {issue.confirmedFacts.map((fact) => (
                      <li key={fact} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    <h4 className="text-xs font-black">아직 확인되지 않은 부분</h4>
                  </div>
                  {issue.unverifiedPoints.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-300">
                      {issue.unverifiedPoints.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-xs leading-5 text-slate-500">이 카드에서 별도로 남긴 핵심 미확인 사항이 없습니다.</p>
                  )}
                </section>
              </div>

              <div className="mt-5 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-indigo-300" aria-hidden="true" />
                  <h4 className="text-xs font-black text-white">근거·원문</h4>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {issue.sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-[11px] font-bold text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-indigo-200"
                    >
                      <span className="text-slate-500">{sourceTypeLabel[source.sourceType]}</span>
                      <span>{source.publisher}</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
