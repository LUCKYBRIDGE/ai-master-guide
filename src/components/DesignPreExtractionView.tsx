import React, { useState } from 'react';
import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  FileCheck2,
  Info,
  Layers3,
  Palette,
} from 'lucide-react';
import { DESIGN_MD_TEMPLATE } from '../data/aiHarnessV2Data';

interface DesignPreExtractionViewProps {
  onCopy?: (text: string, title: string) => void;
}

type DesignSource = 'stitch' | 'figma' | 'prototype';

export const DesignPreExtractionView: React.FC<DesignPreExtractionViewProps> = ({ onCopy }) => {
  const [selectedSource, setSelectedSource] = useState<DesignSource>('stitch');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (onCopy) onCopy(DESIGN_MD_TEMPLATE, 'DESIGN.md');
    else if (navigator.clipboard) await navigator.clipboard.writeText(DESIGN_MD_TEMPLATE);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const sourceCards = [
    {
      id: 'stitch' as const,
      title: 'Google Stitch',
      eyebrow: 'DESIGN.md import / export',
      body: 'Stitch에서 디자인 규칙을 추출하거나 기존 DESIGN.md를 가져와 프로젝트 간 시각 언어를 재사용합니다. 현재 DESIGN.md 형식은 Google이 공개한 alpha 사양이므로 버전 변화는 다시 확인해야 합니다.',
      href: 'https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/',
      linkLabel: 'Google 공식 DESIGN.md 발표',
    },
    {
      id: 'figma' as const,
      title: 'Figma',
      eyebrow: '실제 화면·변수 검토',
      body: 'Figma 변수, Auto Layout, 컴포넌트 상태와 실제 시안을 근거로 DESIGN.md의 토큰과 적용 원칙을 채웁니다. 화면 수치를 복사하는 것만으로 브라우저 결과가 자동으로 동일해지는 것은 아닙니다.',
      href: 'https://www.figma.com/',
      linkLabel: 'Figma 열기',
    },
    {
      id: 'prototype' as const,
      title: '실행 가능한 프로토타입',
      eyebrow: '동작·반응형 검증',
      body: 'Claude Artifacts 같은 실행 가능한 프로토타입이나 기존 웹 화면을 이용해 인터랙션과 반응형 규칙을 확인한 뒤 DESIGN.md의 Components, Layout, Do’s and Don’ts를 구체화합니다.',
      href: 'https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them',
      linkLabel: 'Claude Artifacts 가이드',
    },
  ];

  const selected = sourceCards.find((source) => source.id === selectedSource) ?? sourceCards[0];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-purple-500/25 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/20 p-5 sm:p-8 shadow-2xl">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-purple-300"><Palette className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.18em]">Shared design source</span></div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white tracking-tight">DESIGN.md를 세 AI 개발 도구가 공유하는 디자인 원본으로</h2>
            <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">
              디자인 준비 단계에서 만든 <code className="text-purple-300">./DESIGN.md</code>를 통합 AI 개발 환경의 맞춤 ZIP에도 그대로 사용합니다. 별도의 <code className="text-slate-200">docs/design/tokens.md</code>에 같은 값을 중복 저장하지 않고, 세부 구현 메모만 <code className="text-slate-200">docs/design/</code> 아래에 추가하는 구조를 권장합니다.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 text-xs leading-5 text-slate-300 xl:max-w-sm"><Info className="mr-1 inline h-4 w-4 text-amber-300" />DESIGN.md는 2026년 Google이 공개한 오픈 포맷이지만 현재 사양 버전은 <strong className="text-amber-200">alpha</strong>입니다. 보편적인 고정 표준처럼 취급하지 말고 프로젝트에서 사용하는 버전과 실제 렌더링을 함께 검증하세요.</div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4"><Layers3 className="h-5 w-5 text-indigo-300" /><div><h3 className="font-bold text-white">디자인 근거를 DESIGN.md로 정리하기</h3><p className="mt-0.5 text-xs text-slate-400">디자인 도구는 입력 근거이고, 최종 프로젝트 디자인 계약은 하나의 DESIGN.md로 정리합니다.</p></div></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {sourceCards.map((source) => {
            const active = selectedSource === source.id;
            return <button key={source.id} type="button" aria-pressed={active} onClick={() => setSelectedSource(source.id)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-indigo-400/50 bg-indigo-500/15' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'}`}><span className="text-[10px] font-bold uppercase tracking-wide text-indigo-300">{source.eyebrow}</span><span className="mt-1 block font-bold text-white">{source.title}</span></button>;
          })}
        </div>
        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><h4 className="font-bold text-white">{selected.title}</h4><p className="mt-2 max-w-4xl text-xs sm:text-sm leading-6 text-slate-300">{selected.body}</p></div><a href={selected.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-indigo-200">{selected.linkLabel}<ExternalLink className="h-3.5 w-3.5" /></a></div>
        </div>
      </section>

      <section className="rounded-3xl border border-indigo-500/30 bg-slate-950 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 p-4 sm:px-6">
          <div><div className="flex items-center gap-2 text-indigo-300"><Code2 className="h-4 w-4" /><span className="text-xs font-mono font-bold">./DESIGN.md · alpha-compatible starter</span></div><p className="mt-1 text-xs text-slate-400">YAML frontmatter의 토큰이 규범값이고 Markdown 본문은 적용 이유와 가이드를 설명합니다.</p></div>
          <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? '복사됨' : 'DESIGN.md 복사'}</button>
        </div>
        <pre className="max-h-[650px] overflow-auto whitespace-pre-wrap p-4 sm:p-6 font-mono text-[11px] leading-5 text-emerald-300">{DESIGN_MD_TEMPLATE}</pre>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          ['1', '디자인 근거 수집', 'Stitch·Figma·프로토타입에서 실제 규칙과 상태를 확인합니다.'],
          ['2', 'DESIGN.md 확정', '토큰과 디자인 rationale을 한 파일에서 관리합니다.'],
          ['3', 'Harness v2 연결', '맞춤 ZIP의 AGENTS.md와 Antigravity bridge가 DESIGN.md를 참조합니다.'],
        ].map(([step, title, text]) => <div key={step} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500/15 text-xs font-black text-purple-300">{step}</span><span className="font-bold text-white">{title}</span></div><p className="mt-2 text-xs leading-5 text-slate-400">{text}</p></div>)}
      </section>

      <div className="flex items-start gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs leading-5 text-slate-300"><FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /><span>선택적으로 Google의 <code className="text-emerald-300">npx @google/design.md lint DESIGN.md</code>로 구조를 검사할 수 있지만, AI Master Guide 자체에는 이 패키지를 의존성으로 추가하지 않습니다.</span></div>
    </div>
  );
};
