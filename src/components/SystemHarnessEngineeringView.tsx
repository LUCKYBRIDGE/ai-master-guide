import React, { useMemo, useState } from 'react';
import JSZip from 'jszip';
import {
  AlertTriangle,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileCode2,
  FileText,
  FolderArchive,
  Layers3,
  LockKeyhole,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
} from 'lucide-react';
import {
  buildHarnessFiles,
  CLIENT_COMPATIBILITY,
  DEFAULT_SKILL_IDS,
  HARNESS_MCP_GUIDES,
  HARNESS_SKILLS,
  type GeneratedHarnessFile,
} from '../data/aiHarnessV2Data';

interface SystemHarnessEngineeringViewProps {
  onCopy?: (text: string, title: string) => void;
}

const ROLE_LABELS: Record<GeneratedHarnessFile['role'], string> = {
  canonical: '공통 원본',
  adapter: '도구별 어댑터',
  mirror: '동기화 미러',
  documentation: '프로젝트 문서',
  helper: '동기화·검증',
};

const ROLE_STYLES: Record<GeneratedHarnessFile['role'], string> = {
  canonical: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  adapter: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
  mirror: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  documentation: 'border-slate-600 bg-slate-800/70 text-slate-300',
  helper: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
};

export const SystemHarnessEngineeringView: React.FC<SystemHarnessEngineeringViewProps> = ({ onCopy }) => {
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(DEFAULT_SKILL_IDS);
  const [selectedFilePath, setSelectedFilePath] = useState<string>('AGENTS.md');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);

  const generatedFiles = useMemo(() => buildHarnessFiles(selectedSkillIds), [selectedSkillIds]);

  const currentFile = useMemo(
    () => generatedFiles.find((file) => file.path === selectedFilePath) ?? generatedFiles[0],
    [generatedFiles, selectedFilePath],
  );

  const counts = useMemo(() => {
    const countRole = (role: GeneratedHarnessFile['role']) => generatedFiles.filter((file) => file.role === role).length;
    return {
      total: generatedFiles.length,
      canonical: countRole('canonical'),
      adapters: countRole('adapter'),
      mirrors: countRole('mirror'),
    };
  }, [generatedFiles]);

  const coreSkillCount = DEFAULT_SKILL_IDS.length;
  const optionalSelectedCount = selectedSkillIds.filter((id) => !DEFAULT_SKILL_IDS.includes(id)).length;
  const optionalSkillCount = HARNESS_SKILLS.length - coreSkillCount;

  const toggleSkill = (id: string) => {
    const skill = HARNESS_SKILLS.find((item) => item.id === id);
    if (skill?.defaultSelected) return;
    setSelectedSkillIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const resetHarness = () => {
    setSelectedSkillIds(DEFAULT_SKILL_IDS);
    setSelectedFilePath('AGENTS.md');
    setZipError(null);
  };

  const handleCopy = async (file: GeneratedHarnessFile) => {
    if (onCopy) onCopy(file.content, file.path);
    else if (navigator.clipboard) await navigator.clipboard.writeText(file.content);
    setCopiedPath(file.path);
    window.setTimeout(() => setCopiedPath(null), 1600);
  };

  const downloadZip = async () => {
    setIsZipping(true);
    setZipError(null);
    try {
      const zip = new JSZip();
      generatedFiles.forEach((file) => zip.file(file.path, file.content));
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `portable-ai-harness-v2-${selectedSkillIds.length}skills.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      setZipError('ZIP 생성 중 오류가 발생했습니다. 선택 상태를 유지한 채 다시 시도해 주세요.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/20 p-5 sm:p-8 shadow-2xl">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300"><Layers3 className="h-5 w-5" /></span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Portable AI Development Harness v2</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">하나의 도구로 끝까지, 필요하면 다른 도구가 이어서</h2>
              <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">
                기본 경로는 <strong className="text-white">single-client end-to-end engineering</strong>입니다. Codex·Claude Code·Antigravity 어느 하나만 사용해도 계획이 필요하면 계획하고, 작은 실행→관찰→판정→수정→재검증의 bounded loop로 완료까지 진행합니다. 세션이나 도구가 바뀔 때만 repository-local durable state를 사용합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                ['AGENTS.md', '공통 실행 계약', 'scoped rules · end-to-end continuity · bounded evidence loop'],
                ['.agents/skills', '집중형 Skill 원본', 'Codex + Antigravity native · Claude mirror'],
                ['docs/tasks/ACTIVE.md', '필요할 때만 durable recovery', 'same-session direct · cross-session/client resume'],
              ].map(([title, label, detail]) => (
                <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="font-mono font-bold text-emerald-300">{title}</div>
                  <div className="mt-1 font-bold text-white">{label}</div>
                  <div className="mt-1 leading-5 text-slate-400">{detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full xl:w-[350px] shrink-0 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 font-bold text-amber-300"><LockKeyhole className="h-4 w-4" />외부 연결과 기존 config는 사용자 소유</div>
            <p className="mt-2 text-xs leading-5 text-slate-300">MCP 서버, 계정 인증, 토큰, workspace trust, 쓰기 권한은 ZIP에 넣지 않습니다. 기존 프로젝트에서는 빈 config 골격도 그대로 덮어쓰지 말고 기존 설정과 병합해야 합니다.</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-500/20 bg-slate-900/70 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2"><Workflow className="h-5 w-5 text-emerald-300" /><h3 className="text-lg font-bold text-white">Loop Engineering 기본 모델</h3></div>
        <p className="mt-1 text-xs sm:text-sm leading-6 text-slate-400">테스트 자체가 목적이 아니라, 현재 작업에 가장 가까운 실제 피드백을 다음 판단의 입력으로 사용하는 것이 핵심입니다. 테스트가 없으면 build·type·lint·runtime·browser·log·diff 등 존재하는 증거를 사용합니다.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {[
            ['1', 'Plan / Frame', '목표·acceptance criteria·다음 작은 slice'],
            ['2', 'Act', '가장 작은 coherent change 실행'],
            ['3', 'Observe', '가까운 verifier의 실제 출력 수집'],
            ['4', 'Evaluate', '기준과 비교·실패 유형 재진단'],
            ['5', 'Adjust', '근거 있는 최소 수정 후 재검증'],
          ].map(([step, title, text]) => <div key={step} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><div className="text-[10px] font-black uppercase tracking-wide text-emerald-300">{step}</div><div className="mt-1 font-bold text-white">{title}</div><p className="mt-2 leading-5 text-slate-400">{text}</p></div>)}
        </div>
        <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs leading-5 text-slate-300"><strong className="text-white">Stop condition:</strong> 같은 행동을 새 정보 없이 반복하지 않습니다. 새 evidence나 state change가 없으면 assumption·environment·verifier·scope를 재진단하고, 계속 막히면 blocker를 명시합니다. 무한 retry는 Loop Engineering이 아닙니다.</div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2"><Bot className="h-5 w-5 text-indigo-300" /><h3 className="text-lg font-bold text-white">3개 클라이언트 호환성 계층</h3></div>
        <p className="mt-1 mb-4 text-xs sm:text-sm text-slate-400">공통 실행 계약·scoped instructions·evidence loop는 저장소에 공유하고, 각 클라이언트의 네이티브 capability와 외부 연결·권한 경계는 분리합니다.</p>
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="min-w-[900px] w-full text-xs">
            <thead className="bg-slate-950 text-slate-400"><tr><th className="px-4 py-3 text-left">도구</th><th className="px-4 py-3 text-left">프로젝트 규칙</th><th className="px-4 py-3 text-left">Skills</th><th className="px-4 py-3 text-left">MCP</th><th className="px-4 py-3 text-left">설계 원칙</th></tr></thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60">
              {CLIENT_COMPATIBILITY.map((client) => (
                <tr key={client.id}><td className="px-4 py-4 font-bold text-white">{client.name}</td><td className="px-4 py-4 font-mono text-emerald-300">{client.projectContract}</td><td className="px-4 py-4 font-mono text-indigo-300">{client.skills}</td><td className="px-4 py-4 font-mono text-cyan-300">{client.mcp}</td><td className="px-4 py-4 leading-5 text-slate-300">{client.note}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between gap-3 mb-4"><div><div className="flex items-center gap-2"><Workflow className="h-5 w-5 text-purple-300" /><h3 className="font-bold text-white">공통 Skills</h3></div><p className="mt-1 text-xs text-slate-400">Harness 계약이 직접 참조하는 Core Skill은 항상 포함하고, 프로젝트 특화 Skill만 선택적으로 추가합니다. .agents/skills가 canonical source이고 Claude 경로에는 같은 내용을 생성합니다.</p></div><span className="rounded-lg bg-purple-500/10 px-2 py-1 text-xs font-bold text-purple-300">Core {coreSkillCount} · 선택 {optionalSelectedCount}/{optionalSkillCount}</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {HARNESS_SKILLS.map((skill) => {
              const selected = selectedSkillIds.includes(skill.id);
              const core = skill.defaultSelected;
              return <button key={skill.id} type="button" aria-pressed={selected} disabled={core} onClick={() => toggleSkill(skill.id)} className={`rounded-2xl border p-4 text-left transition ${selected ? 'border-purple-500/40 bg-purple-500/10' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'} ${core ? 'cursor-default' : ''}`}><div className="flex items-start gap-3"><span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border ${selected ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-600 text-transparent'}`}><Check className="h-3.5 w-3.5" /></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><div className="font-bold text-white">{skill.name}</div>{core && <span className="rounded-md border border-purple-500/25 bg-purple-500/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-purple-300">Core</span>}</div><div className="mt-0.5 text-[10px] uppercase tracking-wide text-purple-300">{skill.category}</div><p className="mt-2 text-xs leading-5 text-slate-400">{skill.shortDescription}</p></div></div></button>;
            })}
          </div>
          <div className="mt-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 text-xs leading-5 text-slate-300"><Sparkles className="mr-1 inline h-4 w-4 text-purple-300" /><strong className="text-white">기본 흐름</strong>은 Core Skill 안의 evidence loop입니다. <strong className="text-white">Continue work</strong>는 현재 context가 부족한 recovery에서만 <span className="font-mono text-purple-200">ACTIVE.md → checkpoint → plan → actual repo</span>를 사용하고, Capability router는 capability 선택이 실제로 애매한 복합 작업에서만 사용합니다.</div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between gap-3 mb-4"><div><div className="flex items-center gap-2"><ServerCog className="h-5 w-5 text-cyan-300" /><h3 className="font-bold text-white">MCP 추천 목록</h3></div><p className="mt-1 text-xs text-slate-400">ZIP 최상위의 <span className="font-mono text-cyan-300">MCP_추천_목록.md</span>와 동일한 방향의 참고 카탈로그입니다.</p></div><span className="rounded-lg bg-cyan-500/10 px-2 py-1 text-xs font-bold text-cyan-300">자동 연결 안 함</span></div>
          <div className="space-y-3">
            {HARNESS_MCP_GUIDES.map((server) => (
              <div key={server.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2"><div><div className="font-bold text-white">{server.name}</div><p className="mt-1 text-xs leading-5 text-slate-400">{server.description}</p></div><a href={server.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:bg-cyan-500/15">공식 링크<ExternalLink className="h-3 w-3" /></a></div>
                <div className="mt-3 rounded-lg bg-slate-950 px-3 py-2 font-mono text-[10px] text-slate-500">{server.commandExample}</div>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">{server.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs leading-5 text-slate-400"><ShieldCheck className="mr-1 inline h-4 w-4 text-emerald-300" />추천 목록은 설치 여부와 무관합니다. 실제 연결·인증·권한 부여는 사용자가 각 AI 클라이언트에서 직접 진행합니다.</div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div><div className="flex items-center gap-2"><FolderArchive className="h-5 w-5 text-emerald-300" /><h3 className="text-lg font-bold text-white">생성 패키지</h3></div><p className="mt-1 text-xs sm:text-sm text-slate-400">공통 원본·focused Skill·필요할 때만 쓰는 portable task state를 생성하고, MCP는 비어 있는 네이티브 config starter와 추천 문서만 포함합니다.</p></div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300">전체 <strong className="text-white">{counts.total}</strong></span>
            <span className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">원본 {counts.canonical}</span>
            <span className="rounded-xl border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-300">어댑터 {counts.adapters}</span>
            <span className="rounded-xl border border-purple-500/25 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300">Claude mirrors {counts.mirrors}</span>
            <button type="button" onClick={resetHarness} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white"><RefreshCw className="h-3.5 w-3.5" />기본값</button>
            <button type="button" onClick={downloadZip} disabled={isZipping} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60"><Download className="h-4 w-4" />{isZipping ? 'ZIP 생성 중…' : 'Harness v2 ZIP 다운로드'}</button>
          </div>
        </div>

        {zipError && <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{zipError}</div>}

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-4">
          <div className="max-h-[620px] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/70 p-2">
            {generatedFiles.map((file) => {
              const active = currentFile?.path === file.path;
              return <button type="button" key={file.path} onClick={() => setSelectedFilePath(file.path)} className={`mb-1 flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left transition ${active ? 'bg-indigo-500/15 ring-1 ring-indigo-500/30' : 'hover:bg-slate-900'}`}><FileText className={`mt-0.5 h-4 w-4 shrink-0 ${active ? 'text-indigo-300' : 'text-slate-500'}`} /><span className="min-w-0 flex-1"><span className={`block break-all font-mono text-xs ${active ? 'text-white' : 'text-slate-300'}`}>{file.path}</span><span className="mt-1 block text-[10px] leading-4 text-slate-500">{file.description}</span></span><ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-600" /></button>;
            })}
          </div>

          {currentFile && <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 px-4 py-3">
              <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><FileCode2 className="h-4 w-4 text-indigo-300" /><span className="break-all font-mono text-xs font-bold text-white">{currentFile.path}</span><span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${ROLE_STYLES[currentFile.role]}`}>{ROLE_LABELS[currentFile.role]}</span></div><div className="mt-1 text-[10px] text-slate-500">대상: {currentFile.consumers.join(' · ')}</div></div>
              <button type="button" onClick={() => handleCopy(currentFile)} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white">{copiedPath === currentFile.path ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}{copiedPath === currentFile.path ? '복사됨' : '내용 복사'}</button>
            </div>
            <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[11px] leading-5 text-slate-300">{currentFile.content}</pre>
          </div>}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: Sparkles, title: 'Engineering Loop', text: 'Plan/Frame → Act → Observe → Evaluate → Adjust를 evidence와 stop condition으로 닫습니다.' },
          { icon: TerminalSquare, title: 'Durable Resume', text: 'ACTIVE.md와 checkpoint/plan은 같은 세션이 아니라 실제 recovery가 필요한 장기 작업에서만 사용합니다.' },
          { icon: ShieldCheck, title: 'Native Boundaries', text: '각 클라이언트에서 실제 연결된 Skill·MCP·내장 도구만 사용하며 권한과 인증은 로컬에 둡니다.' },
        ].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><Icon className="h-5 w-5 text-emerald-300" /><div className="mt-2 font-bold text-white">{title}</div><p className="mt-1 text-xs leading-5 text-slate-400">{text}</p></div>)}
      </section>
    </div>
  );
};