import React, { useState, useMemo } from 'react';
import { 
  AGENT_ARCHITECTURE_GUIDE, 
  CUSTOM_SKILL_TEMPLATES, 
  RULE_FILE_TEMPLATES, 
  DAILY_ROUTINES_GUIDES,
  CustomSkillTemplate,
  RuleFileTemplate,
  DailyRoutineGuide
} from '../data/agentSkillsRoutinesData';
import { 
  Bot, 
  Boxes, 
  ScrollText, 
  Workflow, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Sun, 
  Moon, 
  Clock, 
  Code2, 
  HelpCircle, 
  ArrowRight,
  Database,
  GitPullRequest,
  GraduationCap,
  BookOpen,
  Filter
} from 'lucide-react';

interface AgentSkillsRoutinesViewProps {
  onCopy?: (text: string, title: string) => void;
}

export const AgentSkillsRoutinesView: React.FC<AgentSkillsRoutinesViewProps> = ({ onCopy }) => {
  const [activeSection, setActiveSection] = useState<'architecture' | 'skills' | 'rules' | 'routines'>('skills');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('ALL');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('skill-mcp-router');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string, title: string) => {
    if (onCopy) onCopy(text, title);
    else navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter skills by category
  const filteredSkills = useMemo(() => {
    if (selectedSkillCategory === 'ALL') return CUSTOM_SKILL_TEMPLATES;
    return CUSTOM_SKILL_TEMPLATES.filter(s => s.category === selectedSkillCategory);
  }, [selectedSkillCategory]);

  const currentSkill = useMemo(() => {
    return CUSTOM_SKILL_TEMPLATES.find((s: CustomSkillTemplate) => s.id === selectedSkillId) || filteredSkills[0] || CUSTOM_SKILL_TEMPLATES[0];
  }, [selectedSkillId, filteredSkills]);

  const getRoutineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-purple-400" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const skillCategories = [
    'ALL',
    '교사/교육자 특화',
    '도구 라우팅/오케스트레이션',
    '교육/수업/활동지',
    '독서/문화/글쓰기',
    '학급/모임/도구',
    'Git/DevOps',
    'Database',
    '보안/감사',
    '아키텍처/컨벤션'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Workflow className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                에이전트 · SKILL · 교사 특화 · 일일 루틴 마스터 가이드
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              단순 질문용 챗봇을 넘어 <strong>선생님/교육자 필수 스킬(생기부 과세특 작성, 수업 지도안, 가정통신문, 피드백 코치, STEAM 융합)</strong>과 <strong>스마트 도구 자동 라우터(Skill-MCP-Router), 15종 커스텀 SKILL.md 교본, 프로젝트 영구 규칙(Rules), 실무 4대 자동화 루틴</strong>을 완벽하게 마스터하고 즉시 복사해 사용하세요.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs text-purple-300 font-bold px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 self-start md:self-auto">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>교사 & 교육자 실무 완벽 지원</span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-purple-500/20">
          <button
            onClick={() => setActiveSection('skills')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSection === 'skills'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-102'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>📦 1. 커스텀 SKILL.md 팩 (인기 15종)</span>
          </button>

          <button
            onClick={() => setActiveSection('architecture')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSection === 'architecture'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-102'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>🤖 2. 에이전트 작동 원리 & 라우터</span>
          </button>

          <button
            onClick={() => setActiveSection('rules')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSection === 'rules'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-102'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ScrollText className="w-4 h-4 text-emerald-400" />
            <span>📜 3. 프로젝트 영구 룰 템플릿</span>
          </button>

          <button
            onClick={() => setActiveSection('routines')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSection === 'routines'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-102'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4 text-pink-400" />
            <span>⚡ 4. 교사 & 실무 일일 4대 루틴</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Custom SKILL.md Suite */}
      {activeSection === 'skills' && (
        <div className="space-y-6">
          {/* Skill Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSkillCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedSkillCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md scale-102'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {cat === 'ALL' ? '전체 스킬 (15종)' : cat}
              </button>
            ))}
          </div>

          {/* Skill Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {filteredSkills.map((skill: CustomSkillTemplate) => {
              const isSelected = selectedSkillId === skill.id;
              const isTeacherSkill = skill.category === '교사/교육자 특화';
              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between select-none ${
                    isSelected
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl scale-102 border-purple-300 ring-2 ring-purple-500/30'
                      : isTeacherSkill
                      ? 'bg-slate-900/90 hover:bg-slate-850 text-slate-300 border-emerald-500/30 hover:border-emerald-400'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-850 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase block w-fit truncate ${
                        isTeacherSkill ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-950/80 text-slate-300 border border-slate-700'
                      }`}>
                        {skill.category}
                      </span>
                      {isTeacherSkill && <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </div>
                    <h4 className="font-extrabold text-xs text-white leading-snug">
                      {skill.name}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block line-clamp-2">
                    {skill.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Skill Detail & Copyable Code Box */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {currentSkill.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {currentSkill.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {currentSkill.description}
                </p>
              </div>

              <button
                onClick={() => handleCopy(currentSkill.id, currentSkill.skillMdContent, `${currentSkill.name} SKILL.md`)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shrink-0 self-start lg:self-auto border border-purple-400"
              >
                {copiedId === currentSkill.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>SKILL.md 교본 복사</span>
              </button>
            </div>

            {/* Trigger Example & Directory Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="font-bold text-purple-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> AI에게 내릴 자연어 명령(트리거) 예시
                </span>
                <p className="text-slate-200 font-mono bg-slate-900/60 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {currentSkill.triggerExample}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="font-bold text-blue-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> 권장 스킬 디렉토리 구조
                </span>
                <pre className="text-slate-200 font-mono text-[11px] bg-slate-900/60 p-3 rounded-xl border border-slate-800 whitespace-pre-wrap">
                  {currentSkill.directoryStructure}
                </pre>
              </div>
            </div>

            {/* SKILL.md Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SKILL.md 표준 코드 본문 (YAML Frontmatter + 워크플로우)</span>
              </div>
              <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-200 overflow-x-auto leading-relaxed max-h-[480px]">
                {currentSkill.skillMdContent}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Agent & Multi-Agent Architecture */}
      {activeSection === 'architecture' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {AGENT_ARCHITECTURE_GUIDE.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {AGENT_ARCHITECTURE_GUIDE.tagline}
              </p>
            </div>

            {/* Architecture Steps Flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {AGENT_ARCHITECTURE_GUIDE.principles.map((item, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 block w-fit">
                      STEP 0{idx + 1}
                    </span>
                    <h4 className="font-extrabold text-white text-xs leading-snug">
                      {item.step}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual Workflow Architecture Diagram */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-purple-500/20 font-mono text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-purple-400 font-bold text-[11px] pb-2 border-b border-slate-800">
                <span>[2026 Multi-Agent Orchestration Flowchart]</span>
                <span>Reactive & Safe Execution Loop</span>
              </div>
              <pre className="text-[11px] text-purple-200 overflow-x-auto leading-relaxed p-2">
{`사용자 요청 입력 (예: "초등 과학 수업 지도안과 평가 루브릭 작성하고 브라우저로 렌더링 검증해줘")
  └── 1. Intent Analysis & Smart Router (skill-mcp-router가 lesson-plan-rubric-gen 등 최적 도구 자동 매칭)
        └── 2. Planning Mode (단원 구성안 & implementation_plan.md 작성)
              └── 3. 사용자 검토 및 [승인] 버튼 클릭
                    └── 4. 메인 에이전트(Supervisor)가 서브에이전트 동시 스폰
                          ├── 🔍 Research Agent (2022 개정 교육과정 성취기준 탐색)
                          ├── ✍️ Lesson Plan Agent (도입-전개-정리 타임라인 및 루브릭 생성)
                          └── 🌐 Browser Agent (Puppeteer 스크린샷 렌더링 검사)
                    └── 5. 비동기 빌드 완료 (Reactive Wakeup 알림 수신)
                          └── 6. 최종 사후 검증 (walkthrough.md 증명 & 산출물 전달)`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Permanent Rules System */}
      {activeSection === 'rules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RULE_FILE_TEMPLATES.map((rule: RuleFileTemplate) => (
              <div
                key={rule.id}
                className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase">
                        {rule.toolName}
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-1">
                        {rule.fileName}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleCopy(rule.id, rule.content, rule.fileName)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all border border-slate-700"
                      title="규칙 파일 복사"
                    >
                      {copiedId === rule.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 mb-3">
                    {rule.purpose}
                  </p>

                  <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed max-h-64">
                    {rule.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Daily 4 AI Routines */}
      {activeSection === 'routines' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {DAILY_ROUTINES_GUIDES.map((routine: DailyRoutineGuide, idx: number) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-5 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 shrink-0">
                      {getRoutineIcon(routine.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/30">
                        {routine.timeSlot}
                      </span>
                      <h4 className="text-lg font-extrabold text-white mt-1">
                        {routine.routineName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        <strong>목표:</strong> {routine.objective}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 max-w-xs shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">
                      ⚡ 루틴 발동 트리거
                    </span>
                    <code className="text-purple-300 font-mono text-[11px] block">{routine.triggerCommand}</code>
                  </div>
                </div>

                {/* 3 Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {routine.steps.map((st) => (
                    <div
                      key={st.stepNumber}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {st.stepNumber}
                        </span>
                        <h5 className="font-extrabold text-white text-xs">{st.title}</h5>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {st.desc}
                      </p>
                      {st.commandSnippet && (
                        <code className="text-[10px] font-mono text-purple-300 bg-slate-900 p-1.5 rounded block overflow-x-auto border border-slate-800">
                          {st.commandSnippet}
                        </code>
                      )}
                    </div>
                  ))}
                </div>

                {/* Expected Output & Pro-Tip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
                    <strong>🎯 최종 산출물:</strong> {routine.expectedOutput}
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
                    <strong>💡 실무 꿀팁:</strong> {routine.proTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
