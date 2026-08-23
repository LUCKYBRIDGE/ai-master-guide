export type HarnessClientId = 'codex' | 'claude' | 'antigravity';
export type HarnessSkillCategory = 'Planning' | 'Implementation' | 'Quality' | 'Release' | 'UI' | 'Security';

export interface HarnessClientCompatibility {
  id: HarnessClientId;
  name: string;
  projectContract: string;
  skills: string;
  mcp: string;
  note: string;
}

export interface HarnessSkillDefinition {
  id: string;
  name: string;
  category: HarnessSkillCategory;
  shortDescription: string;
  defaultSelected: boolean;
  content: string;
}

export interface HarnessMcpDefinition {
  id: string;
  name: string;
  description: string;
  defaultSelected: boolean;
  needsAuth: boolean;
  command: string;
  args: string[];
  requiredEnv?: string[];
}

export interface GeneratedHarnessFile {
  path: string;
  role: 'canonical' | 'adapter' | 'mirror' | 'documentation' | 'helper' | 'secret-template';
  consumers: string[];
  description: string;
  content: string;
}

export const DESIGN_MD_TEMPLATE = `---
version: alpha
name: Project Design System
description: Shared visual source of truth for humans and AI coding agents.
colors:
  primary: "#4F46E5"
  secondary: "#7C3AED"
  background: "#020617"
  surface: "#0F172A"
  text-primary: "#F8FAFC"
  text-muted: "#94A3B8"
  success: "#10B981"
  danger: "#EF4444"
typography:
  heading:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 8px
  md: 12px
  lg: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---

# Project Design System

## Overview
Keep the interface coherent, accessible, and consistent across screens. YAML tokens are normative; prose explains how to apply them.

## Colors
Use primary for main actions and selection states. Preserve readable contrast and never communicate state by color alone.

## Typography
Use a stable hierarchy and readable line lengths. Do not shrink text simply to solve layout problems.

## Layout
Use the spacing scale consistently and verify representative mobile and desktop widths.

## Shapes
Use the rounded scale consistently for controls, cards, and containers.

## Components
Document project-specific button, form, navigation, table, modal, and feedback patterns here as the product evolves.

## Do's and Don'ts
- Reuse existing components and tokens before introducing variants.
- Verify keyboard focus, contrast, responsive behavior, loading, empty, and error states.
- Do not hard-code a framework, CSS library, state library, or component library unless the repository actually uses it.
- Do not treat this alpha-format file as a substitute for real browser visual QA.
`;

const SHARED_AGENTS_MD = `# AGENTS.md - Shared Project Contract

This is the canonical project-wide working agreement for Codex, Claude Code through CLAUDE.md, Antigravity through its workspace context bridge, and human contributors.

## Inspect before assuming
- Read the repository before naming the framework, runtime, package manager, test runner, database, or deployment target.
- Use commands that are actually defined in the repository. Report unavailable checks explicitly.
- Preserve unrelated work and prefer the smallest coherent change.

## Source-of-truth map
- AGENTS.md: shared rules, commands, safety constraints, and definition of done.
- DESIGN.md: shared visual source of truth for UI-related work.
- docs/architecture/: current architecture and boundaries.
- docs/plans/: approved implementation plans.
- docs/decisions/: durable architecture decisions.
- docs/tasks/: handoff and long-running task state.
- .agents/skills/: canonical reusable skills.
- docs/ai-harness/mcp-manifest.json: canonical selected MCP capability manifest.

Do not create a second project-wide rule file containing another copy of these rules.

## Implementation discipline
- Reuse existing patterns before creating abstractions.
- Add dependencies only when necessary and authorized.
- Never edit generated build output as source.
- For UI work, read DESIGN.md and verify the rendered result.
- Keep client-specific adapters thin.

## Security boundary
The harness standardizes project context and capabilities, not security bypasses.
- Never commit real secrets, tokens, cookies, or credentials.
- Keep approval, sandbox, trust, and auto-execution settings local to each AI client.
- Prefer least-privilege and read-only external-tool access until write access is intentionally needed.
- Require explicit approval for destructive data operations, force pushes, credential changes, or production-impacting actions.

## Verification
1. Run the repository's real applicable build/type/test/lint commands.
2. Verify representative user flows for changed behavior.
3. For visible changes, check desktop, mobile, and relevant accessibility states.
4. Review the final diff for unrelated files, generated artifacts, secrets, stale assumptions, and broken links.
5. State any check that could not run; missing evidence is not a passing result.

## Client adapters
- Codex: AGENTS.md, .agents/skills/, .codex/config.toml.
- Claude Code: CLAUDE.md imports AGENTS.md; .claude/skills/ mirrors canonical skills; .mcp.json supplies project MCP.
- Antigravity: .agents/rules/, .agents/skills/, .agents/mcp_config.json.
`;

const CLAUDE_MD = `@AGENTS.md

# Claude Code adapter
- Use project skills from .claude/skills/. They mirror canonical .agents/skills/.
- Use project MCP definitions from .mcp.json.
- Keep Claude-only behavior here; do not duplicate shared rules.
`;

const ANTIGRAVITY_PROJECT_CONTEXT = `# Antigravity project-context bridge

@../../AGENTS.md
@../../DESIGN.md

Use AGENTS.md as the shared project contract and DESIGN.md as the visual source of truth for UI work. Project skills live in .agents/skills/ and workspace MCP lives in .agents/mcp_config.json.

Keep approval, trust, and execution-permission choices in Antigravity. If required by the installed version, configure this workspace rule as Always On in Antigravity Customizations.
`;

const HARNESS_README = `# Portable AI Development Harness v2

The goal is behavioral parity, not identical client config files.

Canonical sources:
- AGENTS.md
- DESIGN.md
- .agents/skills/
- docs/ai-harness/mcp-manifest.json

Native adapters:
- Codex: .codex/config.toml
- Claude Code: CLAUDE.md, .claude/skills/, .mcp.json
- Antigravity: .agents/rules/project-context.md, .agents/skills/, .agents/mcp_config.json

Do not synchronize model choice, sandboxing, trust, auto-approval, or credentials. After editing canonical skills or the MCP manifest, run:

node scripts/sync-ai-harness.mjs
node scripts/validate-ai-harness.mjs
`;

const COMPATIBILITY_MD = `# Client compatibility

| Capability | Canonical | Codex | Claude Code | Antigravity |
| --- | --- | --- | --- | --- |
| Project contract | AGENTS.md | native | CLAUDE.md import | workspace rule bridge |
| Design | DESIGN.md | project file | project file | workspace rule import |
| Skills | .agents/skills/ | native | .claude/skills/ mirror | native |
| MCP | mcp-manifest.json | .codex/config.toml | .mcp.json | .agents/mcp_config.json |
| Security approvals | client-local | client-local | client-local | client-local |

One canonical source plus thin native adapters prevents silent drift while preserving each client's supported format.
`;

const SYNC_SCRIPT = `import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'docs', 'ai-harness', 'mcp-manifest.json');

function copyDir(source, target) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
  if (!fs.existsSync(source)) return;
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function q(value) { return JSON.stringify(String(value)); }
function renderJson(servers) {
  const mcpServers = {};
  for (const [name, server] of Object.entries(servers)) {
    mcpServers[name] = { command: server.command, args: server.args || [] };
  }
  return JSON.stringify({ mcpServers }, null, 2) + '\\n';
}
function renderCodex(servers) {
  const lines = ['# Generated from docs/ai-harness/mcp-manifest.json.', '# Keep security settings client-local.', ''];
  for (const [name, server] of Object.entries(servers)) {
    lines.push('[mcp_servers.' + name + ']');
    lines.push('command = ' + q(server.command));
    lines.push('args = [' + (server.args || []).map(q).join(', ') + ']');
    if (server.requiredEnv?.length) lines.push('env_vars = [' + server.requiredEnv.map(q).join(', ') + ']');
    lines.push('');
  }
  return lines.join('\\n') + '\\n';
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
copyDir(path.join(root, '.agents', 'skills'), path.join(root, '.claude', 'skills'));
fs.mkdirSync(path.join(root, '.codex'), { recursive: true });
fs.writeFileSync(path.join(root, '.codex', 'config.toml'), renderCodex(manifest.servers), 'utf8');
fs.writeFileSync(path.join(root, '.mcp.json'), renderJson(manifest.servers), 'utf8');
fs.writeFileSync(path.join(root, '.agents', 'mcp_config.json'), renderJson(manifest.servers), 'utf8');
console.log('AI harness adapters synchronized.');
`;

const VALIDATE_SCRIPT = `import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const required = ['AGENTS.md','CLAUDE.md','DESIGN.md','.codex/config.toml','.mcp.json','.agents/rules/project-context.md','.agents/mcp_config.json','docs/ai-harness/mcp-manifest.json'];
const errors = required.filter((p) => !fs.existsSync(path.join(root, p))).map((p) => 'Missing required file: ' + p);
function files(base) {
  if (!fs.existsSync(base)) return [];
  const out = [];
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full); else out.push(path.relative(base, full));
  });
  walk(base); return out.sort();
}
function hash(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
const canonical = path.join(root, '.agents', 'skills');
const mirror = path.join(root, '.claude', 'skills');
const a = files(canonical); const b = files(mirror);
if (JSON.stringify(a) !== JSON.stringify(b)) errors.push('Claude skills mirror file set differs from canonical skills.');
else a.forEach((relative) => { if (hash(path.join(canonical, relative)) !== hash(path.join(mirror, relative))) errors.push('Skill mirror drift: ' + relative); });
const manifest = path.join(root, 'docs', 'ai-harness', 'mcp-manifest.json');
if (fs.existsSync(manifest)) {
  const text = fs.readFileSync(manifest, 'utf8');
  if (/gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/.test(text)) errors.push('Potential credential detected in MCP manifest.');
}
if (errors.length) { console.error(errors.join('\\n')); process.exit(1); }
console.log('AI harness parity validation passed.');
`;

function skill(id: string, name: string, category: HarnessSkillCategory, shortDescription: string, description: string, body: string, defaultSelected = false): HarnessSkillDefinition {
  return { id, name, category, shortDescription, defaultSelected, content: `---\nname: ${id}\ndescription: ${description}\n---\n\n# ${name}\n\n${body.trim()}\n` };
}

export const CLIENT_COMPATIBILITY: HarnessClientCompatibility[] = [
  { id: 'codex', name: 'OpenAI Codex', projectContract: 'AGENTS.md', skills: '.agents/skills/<skill>/SKILL.md', mcp: '.codex/config.toml', note: '공통 계약과 canonical skills를 직접 사용. 보안·모델 설정은 생성하지 않음.' },
  { id: 'claude', name: 'Claude Code', projectContract: 'CLAUDE.md → @AGENTS.md', skills: '.claude/skills/<skill>/SKILL.md', mcp: '.mcp.json', note: '공통 규칙은 import하고 canonical skill을 네이티브 경로로 동일 복제.' },
  { id: 'antigravity', name: 'Google Antigravity', projectContract: '.agents/rules/project-context.md → AGENTS.md', skills: '.agents/skills/<skill>/SKILL.md', mcp: '.agents/mcp_config.json', note: 'workspace rule bridge와 canonical skills를 사용. 필요 시 rule을 Always On으로 활성화.' },
];

export const HARNESS_SKILLS: HarnessSkillDefinition[] = [
  skill('plan-feature', 'Plan feature', 'Planning', '코드 수정 전 저장소·요구사항·위험·검증 계획을 확정', 'Plan repository changes before implementation; inspect structure, constraints, risks, and validation evidence before editing.', `1. Read AGENTS.md and relevant architecture, design, and plan documents.\n2. Inspect the actual files likely to change and find reusable patterns.\n3. Define behavior, edge states, exclusions, rollback, and exact files.\n4. Define verification using commands that really exist.\n5. Stop for approval when the project workflow requires it.\n\nDo not invent architecture, commands, APIs, or completion evidence.`, true),
  skill('implement-feature', 'Implement feature', 'Implementation', '승인 범위만 최소 변경으로 구현하고 실제 검증 증거를 기록', 'Implement an approved feature or content change using existing project patterns and narrow diffs.', `1. Re-check the branch and relevant files before writing.\n2. Reuse established components, utilities, data shapes, and styles.\n3. Avoid unrelated refactors and unauthorized dependencies.\n4. Run actual applicable build/type/test/lint commands.\n5. For visible changes, verify representative desktop/mobile behavior where tooling permits.\n6. Review the final diff for secrets, generated output, and unrelated files.`, true),
  skill('debug', 'Debug', 'Quality', '재현→근본 원인→최소 패치→회귀 검증', 'Diagnose a reproducible defect, identify root cause, and apply the smallest safe correction.', `1. Reproduce or precisely characterize the failure.\n2. Trace data/control flow to the earliest incorrect assumption.\n3. Distinguish root cause from symptoms.\n4. Apply the smallest fix that restores the intended invariant.\n5. Run the closest regression checks and report unavailable evidence explicitly.`, true),
  skill('code-review', 'Code review', 'Quality', '정확성·타입·보안·접근성·회귀·검증을 순서대로 리뷰', 'Review a diff or pull request for correctness, safety, maintainability, and evidence gaps.', `Review scope and behavior first, then edge states, destructive/security risk, types, architecture, UI accessibility/responsiveness, dependency/config changes, verification evidence, documentation accuracy, and rollback. Report concrete findings; do not manufacture defects.`, true),
  skill('verify-release', 'Verify release', 'Release', '정확한 SHA를 고정해 PR·미리보기·배포를 분리 검증', 'Verify a release candidate, pull request, or deployment without treating missing checks as passing.', `1. Pin the exact head SHA.\n2. Confirm base, changed-file scope, and conflicts.\n3. Run available build/type/test/lint checks against that SHA.\n4. Verify applicable normal, empty, error, mobile, desktop, and accessibility states.\n5. Separate deployment status from browser/runtime verification.\n6. Never treat failed, pending, stale, or unavailable required evidence as passing.`, true),
  skill('browser-qa', 'Browser QA', 'UI', '실제 브라우저에서 데스크톱·모바일·키보드·콘솔을 검증', 'Use browser tooling to verify responsive, interaction, accessibility, and console behavior.', `Open the real preview/local build, exercise the main and relevant empty/error flows, check desktop and mobile widths, use keyboard navigation, and inspect console/network for JavaScript, CSS, asset, and MIME errors. Record the tested URL and SHA.`),
  skill('git-pr', 'Git PR', 'Release', '한 작업 한 브랜치·PR 원칙과 head SHA 기반 검증', 'Prepare a focused Git branch and pull request while preserving repository safety constraints.', `Start from the intended base, keep one coherent task per PR, review the full diff, never force push or bypass checks without explicit authority, record the head SHA, and merge only after explicit user approval and the agreed verification gate.`),
  skill('security-review', 'Security review', 'Security', '비밀정보·권한·파괴적 작업·최소 권한을 검토', 'Review security boundaries, secrets, permissions, and destructive-operation risk.', `Identify credentials, PII, privileged APIs, and destructive operations. Keep secrets in approved environment/secret stores, prefer least privilege/read-only access, verify authorization separately from authentication, and do not weaken sandbox, approval, or trust controls for convenience.`),
];

export const HARNESS_MCP_PRESETS: HarnessMcpDefinition[] = [
  { id: 'playwright', name: 'Playwright', description: 'Microsoft Playwright MCP for browser automation and real UI verification.', defaultSelected: true, needsAuth: false, command: 'npx', args: ['-y', '@playwright/mcp@latest'] },
  { id: 'github-readonly', name: 'GitHub (read-only)', description: 'GitHub official MCP server in Docker with read-only mode enabled by default.', defaultSelected: false, needsAuth: true, command: 'docker', args: ['run', '-i', '--rm', '-e', 'GITHUB_PERSONAL_ACCESS_TOKEN', '-e', 'GITHUB_READ_ONLY=1', 'ghcr.io/github/github-mcp-server'], requiredEnv: ['GITHUB_PERSONAL_ACCESS_TOKEN'] },
];

export const DEFAULT_SKILL_IDS = HARNESS_SKILLS.filter((item) => item.defaultSelected).map((item) => item.id);
export const DEFAULT_MCP_IDS = HARNESS_MCP_PRESETS.filter((item) => item.defaultSelected).map((item) => item.id);

function renderManifest(servers: HarnessMcpDefinition[]): string {
  const entries = Object.fromEntries(servers.map((server) => [server.id, { transport: 'stdio', command: server.command, args: server.args, ...(server.requiredEnv?.length ? { requiredEnv: server.requiredEnv } : {}) }]));
  return `${JSON.stringify({ schemaVersion: 1, servers: entries }, null, 2)}\n`;
}

function renderJsonMcp(servers: HarnessMcpDefinition[]): string {
  return `${JSON.stringify({ mcpServers: Object.fromEntries(servers.map((server) => [server.id, { command: server.command, args: server.args }])) }, null, 2)}\n`;
}

function renderCodexMcp(servers: HarnessMcpDefinition[]): string {
  const q = (value: string) => JSON.stringify(value);
  const lines = ['# Generated from docs/ai-harness/mcp-manifest.json.', '# Keep model, sandbox, approval, trust, and credentials client-local.', ''];
  servers.forEach((server) => {
    lines.push(`[mcp_servers.${server.id}]`);
    lines.push(`command = ${q(server.command)}`);
    lines.push(`args = [${server.args.map(q).join(', ')}]`);
    if (server.requiredEnv?.length) lines.push(`env_vars = [${server.requiredEnv.map(q).join(', ')}]`);
    lines.push('');
  });
  return `${lines.join('\n')}\n`;
}

function envExample(servers: HarnessMcpDefinition[]): string {
  const names = Array.from(new Set(servers.flatMap((server) => server.requiredEnv ?? [])));
  return names.length ? ['# Configure real values outside Git.', '# Never commit real credentials.', ...names.map((name) => `${name}=`), ''].join('\n') : '';
}

export function buildHarnessFiles(selectedSkillIds: string[], selectedMcpIds: string[]): GeneratedHarnessFile[] {
  const skills = HARNESS_SKILLS.filter((item) => selectedSkillIds.includes(item.id));
  const servers = HARNESS_MCP_PRESETS.filter((item) => selectedMcpIds.includes(item.id));
  const files: GeneratedHarnessFile[] = [
    { path: 'AGENTS.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: '공통 프로젝트 계약과 source-of-truth 지도', content: SHARED_AGENTS_MD },
    { path: 'DESIGN.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: 'Google alpha 형식 기반 공통 디자인 시스템 원본', content: DESIGN_MD_TEMPLATE },
    { path: 'CLAUDE.md', role: 'adapter', consumers: ['Claude Code'], description: 'AGENTS.md를 import하는 Claude Code 어댑터', content: CLAUDE_MD },
    { path: '.agents/rules/project-context.md', role: 'adapter', consumers: ['Antigravity'], description: 'AGENTS.md와 DESIGN.md를 연결하는 Antigravity workspace rule', content: ANTIGRAVITY_PROJECT_CONTEXT },
    { path: 'docs/ai-harness/mcp-manifest.json', role: 'canonical', consumers: ['Harness sync', 'Human'], description: '선택 MCP capability의 공통 manifest', content: renderManifest(servers) },
    { path: '.codex/config.toml', role: 'adapter', consumers: ['Codex'], description: 'Codex project MCP adapter', content: renderCodexMcp(servers) },
    { path: '.mcp.json', role: 'adapter', consumers: ['Claude Code'], description: 'Claude Code project MCP adapter', content: renderJsonMcp(servers) },
    { path: '.agents/mcp_config.json', role: 'adapter', consumers: ['Antigravity'], description: 'Antigravity workspace MCP adapter', content: renderJsonMcp(servers) },
    { path: 'docs/architecture/overview.md', role: 'documentation', consumers: ['All'], description: '실제 저장소 아키텍처 기록 위치', content: '# Architecture\n\nRecord the current system architecture after inspecting the real repository. Keep this descriptive, not aspirational.\n' },
    { path: 'docs/plans/README.md', role: 'documentation', consumers: ['All'], description: '승인된 구현 계획 보관 위치', content: '# Plans\n\nStore approved implementation plans here with scope, risks, validation, and rollback.\n' },
    { path: 'docs/decisions/README.md', role: 'documentation', consumers: ['All'], description: '기술 의사결정 보관 위치', content: '# Decisions\n\nStore durable architecture decisions with context, alternatives, consequences, and date.\n' },
    { path: 'docs/tasks/README.md', role: 'documentation', consumers: ['All'], description: '세션 간 작업 상태와 handoff', content: '# Tasks and handoff\n\nRecord durable task status, verified evidence, remaining work, and blockers.\n' },
    { path: 'docs/ai-harness/README.md', role: 'documentation', consumers: ['All'], description: '하네스 사용법과 보안 경계', content: HARNESS_README },
    { path: 'docs/ai-harness/compatibility.md', role: 'documentation', consumers: ['All'], description: '세 도구 호환성 표', content: COMPATIBILITY_MD },
    { path: 'scripts/sync-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'canonical skill과 MCP adapter 동기화', content: SYNC_SCRIPT },
    { path: 'scripts/validate-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'skill mirror와 credential 위험 검사', content: VALIDATE_SCRIPT },
    { path: 'README.ai-harness.md', role: 'documentation', consumers: ['Human'], description: '다운로드 패키지 적용 순서', content: '# AI Harness v2 setup\n\n1. Review before overwriting an existing project.\n2. Fill AGENTS.md with real commands and boundaries.\n3. Replace DESIGN.md sample tokens with the project design system.\n4. Configure required credentials outside Git.\n5. Run node scripts/sync-ai-harness.mjs and node scripts/validate-ai-harness.mjs.\n6. Review each client\'s trust, approval, sandbox, and MCP prompts locally.\n' },
  ];

  skills.forEach((item) => {
    files.push({ path: `.agents/skills/${item.id}/SKILL.md`, role: 'canonical', consumers: ['Codex', 'Antigravity'], description: `${item.name} canonical skill`, content: item.content });
    files.push({ path: `.claude/skills/${item.id}/SKILL.md`, role: 'mirror', consumers: ['Claude Code'], description: `${item.name} Claude native mirror`, content: item.content });
  });

  const env = envExample(servers);
  if (env) files.push({ path: '.env.example', role: 'secret-template', consumers: ['Human', 'Runtime'], description: '필요한 환경변수 이름만 포함하는 템플릿', content: env });

  return files.sort((a, b) => a.path.localeCompare(b.path));
}
