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

  const toggleSkill = (id: string) => {
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
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">하나의 프로젝트 규칙, 세 도구의 네이티브 환경</h2>
              <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">
                Codex·Claude Code·Antigravity가 같은 프로젝트 계약, 공통 Skill, durable task state를 활용하도록 구성합니다. MCP는 프로젝트에 미리 연결하지 않고 <strong className="text-white">빈 네이티브 config 골격 + 추천 목록</strong>만 제공해 사용자가 필요한 연결만 직접 추가합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                ['AGENTS.md', '공통 프로젝트 계약', 'Codex/Antigravity native · Claude import + nested emulation'],
                ['docs/tasks/ACTIVE.md', '교차 클라이언트 재개 지점', 'plan + checkpoint + actual repo state'],
                ['.agents/skills', '공통 Skill 원본', 'Codex + Antigravity native · Claude mirror'],
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
            <div className="flex items-center gap-2 font-bold text-amber-300"><LockKeyhole className="h-4 w-4" />외부 연결은 사용자 소유</div>
            <p className="mt-2 text-xs leading-5 text-slate-300">MCP 서버, 계정 인증, 토큰, workspace trust, 쓰기 권한은 ZIP에 넣지 않습니다. 빈 config 파일은 경로 안내용이며 실제 연결 상태를 뜻하지 않습니다.</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2"><Bot className="h-5 w-5 text-indigo-300" /><h3 className="text-lg font-bold text-white">3개 클라이언트 호환성 계층</h3></div>
        <p className="mt-1 mb-4 text-xs sm:text-sm text-slate-400">공통 지식·scoped instructions·장기 작업 상태는 저장소에 공유하고, 각 클라이언트의 네이티브 capability와 외부 연결 경계는 분리합니다.</p>
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
          <div className="flex items-center justify-between gap-3 mb-4"><div><div className="flex items-center gap-2"><Workflow className="h-5 w-5 text-purple-300" /><h3 className="font-bold text-white">공통 Skills 선택</h3></div><p className="mt-1 text-xs text-slate-400">.agents/skills를 canonical source로 만들고 Claude 경로에는 같은 내용을 생성합니다.</p></div><span className="rounded-lg bg-purple-500/10 px-2 py-1 text-xs font-bold text-purple-300">{selectedSkillIds.length}/{HARNESS_SKILLS.length}</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {HARNESS_SKILLS.map((skill) => {
              const selected = selectedSkillIds.includes(skill.id);
              return <button key={skill.id} type="button" aria-pressed={selected} onClick={() => toggleSkill(skill.id)} className={`rounded-2xl border p-4 text-left transition ${selected ? 'border-purple-500/40 bg-purple-500/10' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'}`}><div className="flex items-start gap-3"><span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border ${selected ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-600 text-transparent'}`}><Check className="h-3.5 w-3.5" /></span><div><div className="font-bold text-white">{skill.name}</div><div className="mt-0.5 text-[10px] uppercase tracking-wide text-purple-300">{skill.category}</div><p className="mt-2 text-xs leading-5 text-slate-400">{skill.shortDescription}</p></div></div></button>;
            })}
          </div>
          <div className="mt-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 text-xs leading-5 text-slate-300"><Sparkles className="mr-1 inline h-4 w-4 text-purple-300" /><strong className="text-white">Continue work</strong>는 다른 세션·클라이언트의 chat history가 없어도 <span className="font-mono text-purple-200">ACTIVE.md → checkpoint → plan → actual repo</span> 순서로 상태를 복원합니다. Capability router는 capability 선택이 애매한 복합 작업에서만 사용합니다.</div>
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
          <div><div className="flex items-center gap-2"><FolderArchive className="h-5 w-5 text-emerald-300" /><h3 className="text-lg font-bold text-white">생성 패키지</h3></div><p className="mt-1 text-xs sm:text-sm text-slate-400">공통 원본·Skill·portable task state를 실제로 생성하고, MCP는 비어 있는 네이티브 config 골격과 한글 추천 문서만 포함합니다.</p></div>
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
          { icon: Sparkles, title: 'Portable Core', text: 'AGENTS.md · DESIGN.md · docs · canonical skills를 프로젝트 지식의 중심으로 둡니다.' },
          { icon: TerminalSquare, title: 'Cross-client Resume', text: 'ACTIVE.md와 checkpoint/plan을 통해 Antigravity·Codex·Claude Code가 같은 작업을 이어받습니다.' },
          { icon: ShieldCheck, title: 'Native Capabilities', text: '각 클라이언트에서 실제 연결된 Skill·MCP·내장 도구만 사용하며 권한과 인증은 로컬에 둡니다.' },
        ].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><Icon className="h-5 w-5 text-emerald-300" /><div className="mt-2 font-bold text-white">{title}</div><p className="mt-1 text-xs leading-5 text-slate-400">{text}</p></div>)}
      </section>
    </div>
  );
};