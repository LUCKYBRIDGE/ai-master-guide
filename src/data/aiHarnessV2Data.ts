export type HarnessClientId = 'codex' | 'claude' | 'antigravity';
export type HarnessSkillCategory =
  | 'Planning'
  | 'Implementation'
  | 'Quality'
  | 'Release'
  | 'UI'
  | 'Security'
  | 'Orchestration';

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

export interface HarnessMcpGuide {
  id: string;
  name: string;
  description: string;
  officialUrl: string;
  commandExample: string;
  note: string;
}

export interface GeneratedHarnessFile {
  path: string;
  role: 'canonical' | 'adapter' | 'mirror' | 'documentation' | 'helper';
  consumers: string[];
  description: string;
  content: string;
}

export const DESIGN_MD_TEMPLATE = `---
version: alpha
name: Project Design System
description: Neutral design contract starter. Populate it only from verified project or design-source evidence.
---

# Project Design System

## Status
This starter is intentionally neutral. It does not choose colors, typography, spacing, component libraries, CSS frameworks, or visual style for the project.

Before relying on this file for UI work:
1. Inspect the repository's existing styles, tokens, components, screenshots, and design sources.
2. Preserve established visual language unless the task explicitly changes it.
3. Replace the guidance below with verified project-specific values and decisions.
4. If no design system exists yet, establish one explicitly instead of silently inventing defaults.

## Sources
Document the authoritative design sources for this project, such as an existing token file, Figma library, Stitch DESIGN.md, production UI, or approved specification.

## Colors
Record semantic color tokens and their intended uses only after verifying the project's actual palette. Include contrast and state requirements where relevant.

## Typography
Record the actual font families, sizes, weights, line heights, and hierarchy used by the project. Do not introduce a font merely because it appears in this starter.

## Spacing and layout
Record the project's spacing scale, breakpoints, container behavior, grid rules, and representative responsive states.

## Shapes and elevation
Record border radius, borders, shadows, and elevation patterns that are actually part of the project.

## Components
Document project-specific behavior and states for buttons, forms, navigation, tables, dialogs, feedback, loading, empty, and error states.

## Accessibility
Record keyboard, focus, contrast, reduced-motion, semantic markup, and assistive-technology requirements that apply to the project.

## Do's and Don'ts
- Reuse existing components and verified tokens before introducing variants.
- Verify representative desktop and mobile behavior for visible changes.
- Do not infer a framework, component library, state library, or styling system without repository evidence.
- Do not replace an established project design system with this neutral starter.
- Do not treat this alpha-format file as a substitute for rendered browser or device QA.
`;

const SHARED_AGENTS_MD = `# AGENTS.md - Shared Project Contract

This file is the canonical project-wide working agreement for Codex, Claude Code through CLAUDE.md, Antigravity through its workspace rule bridge, and human contributors.

It is intentionally project-neutral. Do not assume a language, framework, package manager, database, test runner, hosting provider, or deployment model until the repository proves it.

## Inspect before assuming
- Read the repository before naming the stack, runtime, package manager, test runner, database, deployment target, generated directories, or source-of-truth files.
- Use commands that actually exist in the repository. Report unavailable checks explicitly instead of inventing replacements.
- Preserve unrelated work and prefer the smallest coherent change that satisfies the request.
- Treat existing project-specific instructions as authoritative when they are more specific and do not conflict with higher-priority safety constraints.

## Source-of-truth map
- AGENTS.md: shared project rules, safety constraints, verification policy, and project map.
- DESIGN.md: project visual contract for UI-related work; the downloaded starter is deliberately neutral until adapted from real project evidence.
- MCP_추천_목록.md: human-readable MCP recommendations and official links; it does not mean those MCPs are installed or connected.
- docs/architecture/: current architecture and boundaries.
- docs/design/: implementation notes that extend DESIGN.md without duplicating its canonical values.
- docs/plans/: approved implementation plans.
- docs/decisions/: durable architecture decisions.
- docs/tasks/: handoff and long-running task state.
- docs/reference/: durable project references and source notes.
- .agents/skills/: canonical reusable project skills.

Do not create a second project-wide rule file containing another copy of these rules. Client adapters should stay thin.

## Project-specific adaptation
- This starter deliberately contains no fake build, test, deploy, database, or release commands.
- When adapting it to a real repository, record only verified commands, protected paths, generated outputs, deployment boundaries, and domain invariants.
- In an existing project, merge this contract with useful local instructions instead of replacing project knowledge wholesale.

## Implementation discipline
- Reuse established patterns before creating abstractions.
- Add dependencies only when necessary and authorized.
- Never edit generated build output as if it were source.
- For UI work, inspect DESIGN.md and the actual rendered product. If DESIGN.md is still a neutral starter, derive project-specific facts from real evidence before treating it as normative.
- Keep client-specific adapters thin and keep client-local permissions out of the shared contract.

## Skills, tools, and MCP
- Use a dedicated project skill directly when the task clearly matches it.
- Use capability-router only when capability choice is genuinely ambiguous or multiple skills/tools must be coordinated; do not route every simple task through a meta-skill.
- Inspect capabilities actually available in the current client/session before choosing an MCP or built-in tool.
- Use an MCP tool only when it is actually connected and materially useful.
- Never infer MCP availability from MCP_추천_목록.md or an empty config skeleton.
- If no suitable MCP is connected, continue with available built-in tools or a safe manual workflow.
- Do not install, authenticate, or grant external-service access unless the user explicitly requests it.

## Security boundary
- Never commit real secrets, tokens, cookies, private keys, or credentials.
- Keep approval, sandbox, trust, auto-execution, MCP credentials, and external write permissions client-local.
- Prefer least-privilege/read-only access until write access is intentionally required.
- Require explicit approval for destructive data operations, force pushes, credential changes, or production-impacting actions.

## Verification
1. Run the repository's real applicable build, type, test, lint, and validation commands.
2. Verify representative user flows for changed behavior when applicable.
3. For visible changes, check relevant desktop, mobile, keyboard, accessibility, and error states where tooling permits.
4. Review the final diff for unrelated files, generated artifacts, secrets, stale assumptions, and broken references.
5. State any check that could not run. Missing evidence is not a passing result.

## Client adapters
- Codex: AGENTS.md and .agents/skills/ directly; .codex/config.toml is an intentionally minimal project-local skeleton.
- Claude Code: CLAUDE.md imports AGENTS.md; .claude/skills/ mirrors Harness-managed canonical skills; .mcp.json starts empty.
- Antigravity: .agents/rules/project-core.md bridges shared context; .agents/skills/ is canonical; .agents/mcp_config.json starts empty.
- MCP server entries are intentionally not pre-populated. Users connect only what they actually need.
`;

const CLAUDE_MD = `@AGENTS.md

# Claude Code adapter
- Use project skills from .claude/skills/. Harness-managed skills mirror canonical .agents/skills/.
- The included .mcp.json is an empty project skeleton. Preserve and merge an existing project config rather than overwriting it.
- MCP_추천_목록.md is a recommendation list, not an availability signal.
- Keep Claude-only behavior here; do not duplicate shared rules.
`;

const ANTIGRAVITY_PROJECT_CORE = `# Antigravity project-core bridge

@../../AGENTS.md
@../../DESIGN.md

Use AGENTS.md as the shared project contract and DESIGN.md as the visual source of truth for UI work after it has been adapted from real project evidence. Canonical project skills live in .agents/skills/.

The included .agents/mcp_config.json is intentionally empty. Preserve and merge an existing workspace config rather than overwriting it. Connect external MCP servers only when needed. MCP_추천_목록.md is reference material, not proof that a server is available.

Keep approval, trust, and execution-permission choices in Antigravity. Configure this workspace rule's activation mode in Antigravity rather than encoding an approval bypass in the project package.
`;

const CODEX_CONFIG_TOML = `# Codex project configuration skeleton.
# MCP servers are intentionally not preconfigured.
# If this repository already has .codex/config.toml, merge intentionally instead of overwriting it.
# Add project-specific settings only after confirming they are appropriate for this repository.
# Keep model, sandbox, approval, trust, and credentials client-local unless the project explicitly requires otherwise.
`;

const EMPTY_MCP_JSON = `{
  "mcpServers": {}
}
`;

const HARNESS_README = `# Portable AI Development Harness v2

The goal is shared project knowledge with thin native adapters, not identical client configuration or identical model behavior.

This package is project-neutral. It intentionally does not choose a framework, package manager, test stack, database, deployment platform, visual theme, or MCP server for the user.

Included portable core:
- AGENTS.md
- DESIGN.md neutral starter
- MCP_추천_목록.md
- .agents/skills/
- CLAUDE.md and Harness-managed mirrors under .claude/skills/
- .agents/rules/project-core.md
- empty client config skeletons for Codex, Claude Code MCP, and Antigravity MCP
- durable docs/ structure

For an existing repository, review and merge before overwriting AGENTS.md, DESIGN.md, CLAUDE.md, .codex/config.toml, .mcp.json, or .agents/mcp_config.json. Existing project knowledge and working configuration may be more specific than this starter.

MCP servers are intentionally not pre-populated. External connections depend on the user's installed client, account, credentials, trust settings, runtime, and required permissions. MCP_추천_목록.md provides a short reference list and official links only.

Use capability-router only for ambiguous or multi-capability work. A task with an obvious dedicated skill should use that skill directly. A recommendation or empty config file never means an MCP server is connected.

The sync helper updates canonical skill paths inside .claude/skills and preserves unrelated Claude-only skills. It intentionally does not delete stale extra directories automatically; review them manually before removal.

After adapting the package, run:

node scripts/sync-ai-harness.mjs
node scripts/validate-ai-harness.mjs
`;

const COMPATIBILITY_MD = `# Client compatibility

| Capability | Canonical | Codex | Claude Code | Antigravity |
| --- | --- | --- | --- | --- |
| Project contract | AGENTS.md | native | CLAUDE.md import | project-core rule bridge |
| Design | DESIGN.md | project context | project context | rule bridge import |
| Skills | .agents/skills/ | native | .claude/skills/ Harness mirror | native |
| MCP config skeleton | no shared server list | .codex/config.toml | .mcp.json | .agents/mcp_config.json |
| MCP server entries | user-owned | user adds locally | user adds locally | user adds locally |
| Security approvals | client-local | client-local | client-local | client-local |

The package keeps native file locations visible without pretending that external services are portable project dependencies. MCP server entries, credentials, permissions, and account authorization remain user-owned. Existing native configs should be merged, not blindly overwritten.
`;

const MCP_RECOMMENDATIONS_MD = `# MCP 추천 목록

이 파일은 **추천 목록과 공식 링크**만 제공합니다. 아래 MCP가 설치되었거나 현재 AI 클라이언트에 연결되어 있다는 뜻이 아닙니다.

실제 연결은 프로젝트에 필요할 때 사용자가 Codex, Claude Code, Antigravity 등 각 클라이언트에서 직접 진행하세요. 인증이 필요한 서비스는 최소 권한으로 시작하고, 쓰기 권한은 실제 작업에 필요할 때만 추가하는 것을 권장합니다.

## 1. Playwright MCP

- 용도: 실제 브라우저 조작, UI 확인, 폼 입력, 반응형·브라우저 기반 QA
- 추천 상황: 웹 UI를 실제 브라우저에서 확인해야 할 때
- 공식 프로젝트: https://github.com/microsoft/playwright-mcp
- 실행 예시: npx -y @playwright/mcp@latest
- 비고: 웹 프로젝트가 아니거나 브라우저 자동화가 필요하지 않다면 연결할 이유가 없습니다.

## 2. GitHub MCP Server

- 용도: 저장소, Issue, Pull Request 등 GitHub 작업을 AI 클라이언트에서 다룰 때
- 추천 상황: GitHub 정보를 직접 읽거나 명시적으로 승인된 GitHub 작업을 수행할 때
- 공식 프로젝트: https://github.com/github/github-mcp-server
- 비고: 계정 인증과 저장소 권한은 사용자가 직접 설정해야 합니다. 가능하면 read-only 또는 최소 권한으로 시작하세요.

## 3. Context7 MCP

- 용도: 라이브러리·프레임워크·SDK의 최신 문서와 코드 예시 조회
- 추천 상황: 버전 변화가 잦은 API, 설정, 마이그레이션, 라이브러리 문법을 확인할 때
- 공식 프로젝트: https://github.com/upstash/context7
- 프로젝트 사이트: https://context7.com
- 비고: 일반적인 코드 작성 자체보다 최신 외부 문서 확인이 필요한 작업에 적합합니다.

## 사용 원칙

1. MCP는 많을수록 좋은 것이 아닙니다. 현재 프로젝트에 실제로 필요한 것만 연결하세요.
2. 전용 Skill이 명확한 단순 작업은 해당 Skill을 직접 사용하고, capability-router는 여러 capability를 조합하거나 선택이 애매할 때만 사용합니다.
3. 이 추천 목록에 있다고 해서 연결된 MCP로 간주하지 않습니다.
4. 계정 인증, 토큰, workspace trust, 승인 정책, 쓰기 권한은 Harness ZIP에 넣지 않습니다.
5. 기존 MCP config가 있는 프로젝트에 빈 골격을 덮어쓰지 말고 필요한 부분만 병합하세요.
6. MCP 제품과 설정 방식은 바뀔 수 있으므로 연결 시점에 공식 문서를 다시 확인하세요.
`;

const SYNC_SCRIPT = `import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const canonicalSkills = path.join(root, '.agents', 'skills');
const claudeSkills = path.join(root, '.claude', 'skills');

function copyTreeMerge(source, target) {
  if (!fs.existsSync(source)) return;
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyTreeMerge(from, to);
    else fs.copyFileSync(from, to);
  }
}

copyTreeMerge(canonicalSkills, claudeSkills);
console.log('AI harness skills synchronized. Existing unrelated Claude-only skills were preserved.');
`;

const VALIDATE_SCRIPT = `import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const required = [
  'AGENTS.md',
  'CLAUDE.md',
  'DESIGN.md',
  'MCP_추천_목록.md',
  '.codex/config.toml',
  '.mcp.json',
  '.agents/rules/project-core.md',
  '.agents/mcp_config.json',
];
const errors = required.filter((p) => !fs.existsSync(path.join(root, p))).map((p) => 'Missing required file: ' + p);

function files(base) {
  if (!fs.existsSync(base)) return [];
  const out = [];
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full); else out.push(path.relative(base, full));
  });
  walk(base);
  return out.sort();
}
function hash(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }

const canonical = path.join(root, '.agents', 'skills');
const mirror = path.join(root, '.claude', 'skills');
for (const relative of files(canonical)) {
  const source = path.join(canonical, relative);
  const target = path.join(mirror, relative);
  if (!fs.existsSync(target)) errors.push('Missing Claude skill mirror: ' + relative);
  else if (hash(source) !== hash(target)) errors.push('Skill mirror drift: ' + relative);
}

for (const relative of ['.mcp.json', '.agents/mcp_config.json']) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
    if (!parsed.mcpServers || typeof parsed.mcpServers !== 'object' || Array.isArray(parsed.mcpServers)) errors.push('Invalid MCP skeleton: ' + relative);
    else if (Object.keys(parsed.mcpServers).length !== 0) errors.push('MCP skeleton must not pre-populate servers: ' + relative);
  } catch {
    errors.push('Invalid JSON config: ' + relative);
  }
}

const codexConfig = fs.existsSync(path.join(root, '.codex', 'config.toml')) ? fs.readFileSync(path.join(root, '.codex', 'config.toml'), 'utf8') : '';
if (codexConfig.includes('[mcp_servers.')) errors.push('Codex config must not pre-populate MCP servers.');

const scanTargets = ['.codex/config.toml', '.mcp.json', '.agents/mcp_config.json'];
const suspiciousMarkers = ['ghp_', 'gho_', 'ghu_', 'ghs_', 'ghr_', 'sk-', 'BEGIN PRIVATE KEY', 'BEGIN RSA PRIVATE KEY', 'BEGIN EC PRIVATE KEY', 'BEGIN OPENSSH PRIVATE KEY'];
for (const relative of scanTargets) {
  if (!fs.existsSync(path.join(root, relative))) continue;
  const text = fs.readFileSync(path.join(root, relative), 'utf8');
  if (suspiciousMarkers.some((marker) => text.includes(marker))) errors.push('Potential credential detected: ' + relative);
}

if (errors.length) {
  console.error(errors.join('\\n'));
  process.exit(1);
}
console.log('AI harness portability validation passed.');
`;

function skill(
  id: string,
  name: string,
  category: HarnessSkillCategory,
  shortDescription: string,
  description: string,
  body: string,
  defaultSelected = false,
): HarnessSkillDefinition {
  return {
    id,
    name,
    category,
    shortDescription,
    defaultSelected,
    content: `---\nname: ${id}\ndescription: ${description}\n---\n\n# ${name}\n\n${body.trim()}\n`,
  };
}

export const CLIENT_COMPATIBILITY: HarnessClientCompatibility[] = [
  {
    id: 'codex',
    name: 'OpenAI Codex',
    projectContract: 'AGENTS.md',
    skills: '.agents/skills/<skill>/SKILL.md',
    mcp: '.codex/config.toml 골격 · 서버는 사용자 추가',
    note: '공통 계약과 canonical skills를 직접 사용. config는 제공하되 MCP·model·sandbox·approval·trust 값은 선설정하지 않음.',
  },
  {
    id: 'claude',
    name: 'Claude Code',
    projectContract: 'CLAUDE.md → @AGENTS.md',
    skills: '.claude/skills/<skill>/SKILL.md',
    mcp: '.mcp.json 빈 골격 · 서버는 사용자 추가',
    note: '공통 규칙은 import하고 Harness-managed canonical skill만 네이티브 경로에 동일 생성. 다른 Claude 전용 skill은 보존.',
  },
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    projectContract: '.agents/rules/project-core.md → AGENTS.md',
    skills: '.agents/skills/<skill>/SKILL.md',
    mcp: '.agents/mcp_config.json 빈 골격 · 서버는 사용자 추가',
    note: 'workspace rule bridge와 canonical skills를 사용. MCP 연결·rule activation·권한은 설치된 클라이언트에서 결정.',
  },
];

export const HARNESS_SKILLS: HarnessSkillDefinition[] = [
  skill(
    'plan-feature',
    'Plan feature',
    'Planning',
    '넓거나 위험한 변경 전 저장소·요구사항·위험·검증 계획을 확정',
    'Plans repository changes before implementation and should be used before broad, cross-cutting, ambiguous, or risky edits.',
    `1. Read AGENTS.md and relevant architecture, design, and plan documents.\n2. Inspect the actual files likely to change and find reusable patterns.\n3. Define behavior, edge states, exclusions, rollback, and exact files.\n4. Define verification using commands that really exist.\n5. Stop for approval when the project workflow requires it.\n\nDo not invent architecture, commands, APIs, or completion evidence.`,
    true,
  ),
  skill(
    'implement-feature',
    'Implement feature',
    'Implementation',
    '명확한 범위를 최소 변경으로 구현하고 실제 검증 증거를 기록',
    'Implements a scoped repository change and should be used when the intended behavior and edit scope are sufficiently clear.',
    `1. Re-check the branch and relevant files before writing.\n2. Reuse established components, utilities, data shapes, and styles.\n3. Avoid unrelated refactors and unauthorized dependencies.\n4. Run actual applicable build/type/test/lint commands.\n5. For visible changes, verify representative behavior where tooling permits.\n6. Review the final diff for secrets, generated output, and unrelated files.`,
    true,
  ),
  skill(
    'debug',
    'Debug',
    'Quality',
    '재현→근본 원인→최소 패치→회귀 검증',
    'Diagnoses reproducible defects and should be used when tracing an observed failure to its root cause.',
    `1. Reproduce or precisely characterize the failure.\n2. Trace data/control flow to the earliest incorrect assumption.\n3. Distinguish root cause from symptoms.\n4. Apply the smallest fix that restores the intended invariant.\n5. Run the closest regression checks and report unavailable evidence explicitly.`,
    true,
  ),
  skill(
    'code-review',
    'Code review',
    'Quality',
    '변경 diff의 정확성·보안·회귀·유지보수성·검증 증거를 리뷰',
    'Reviews repository diffs and should be used to assess correctness, safety, maintainability, and evidence gaps without changing code by default.',
    `Review scope and behavior first, then edge states, destructive/security risk, types, architecture, UI accessibility/responsiveness when relevant, dependency/config changes, verification evidence, documentation accuracy, and rollback. Report concrete findings; do not manufacture defects.`,
    true,
  ),
  skill(
    'verify-release',
    'Verify release',
    'Release',
    '정확한 revision을 기준으로 병합·릴리스·배포 전 검증 증거를 확인',
    'Verifies a release or merge candidate and should be used before decisions that depend on a specific revision being ready.',
    `1. Pin the exact revision or head SHA when version control is available.\n2. Confirm base, changed-file scope, and conflicts.\n3. Run available build/type/test/lint checks against that revision.\n4. Verify applicable normal, empty, error, responsive, and accessibility states.\n5. Separate deployment status from browser/runtime verification.\n6. Never treat failed, pending, stale, or unavailable required evidence as passing.`,
    true,
  ),
  skill(
    'capability-router',
    'Capability router',
    'Orchestration',
    '여러 Skill·MCP·내장 도구를 조합해야 하거나 선택이 애매한 복합 작업을 라우팅',
    'Coordinates capabilities when tool or skill choice is ambiguous or multiple capabilities must be combined; do not use it for simple tasks that clearly match one dedicated skill.',
    `Use this skill only when capability selection is genuinely ambiguous or the task needs coordinated use of multiple skills, connected MCP tools, or built-in tools.\n\n1. Read the task and AGENTS.md.\n2. Inventory only capabilities actually available in the current client/session.\n3. Prefer an obvious dedicated project skill directly when one clearly matches; do not add a routing hop for simple work.\n4. Use a specific MCP only when it is actually connected and materially improves the task.\n5. Treat MCP_추천_목록.md and empty config skeletons as reference only, never as availability signals.\n6. If no suitable MCP is connected, continue with available built-in tools or a safe manual workflow.\n7. Do not install, authenticate, or grant external-service access unless the user explicitly requests it.\n8. For external writes or destructive actions, use the narrowest permission available and respect the client's approval boundary.\n9. Re-evaluate the route after a tool failure or a material change in task scope.`,
    true,
  ),
  skill(
    'browser-qa',
    'Browser QA',
    'UI',
    '브라우저 기반 UI 작업에서 반응형·키보드·콘솔·주요 흐름을 검증',
    'Verifies rendered browser UI and should be used only when the project has a browser surface and the task needs responsive, accessibility, interaction, or console checks.',
    `Open the real preview or deployed test surface, exercise the main and relevant empty/error flows, check representative desktop and mobile widths, use keyboard navigation, and inspect console/network for JavaScript, CSS, asset, and MIME errors. Record the tested URL and revision when available.`,
  ),
  skill(
    'git-pr',
    'Git PR',
    'Release',
    'Git 저장소의 브랜치·diff·PR 검토와 revision 기반 검증을 보조',
    'Prepares focused Git branches and pull requests and should be used only when the project actually uses Git and a PR-based review workflow.',
    `Start from the intended base, keep one coherent task per PR, review the full diff, never force push or bypass checks without explicit authority, record the head SHA, and merge only after explicit user approval and the agreed verification gate.`,
  ),
  skill(
    'security-review',
    'Security review',
    'Security',
    '비밀정보·권한·외부 입력·파괴적 작업·최소 권한을 검토',
    'Reviews secrets, trust boundaries, permissions, external input, and destructive-operation risk and should be used for security-sensitive changes.',
    `Identify credentials, PII, privileged APIs, untrusted inputs, and destructive operations. Keep secrets in approved environment or secret stores, prefer least privilege/read-only access, verify authorization separately from authentication, and do not weaken sandbox, approval, or trust controls for convenience.`,
  ),
];

export const HARNESS_MCP_GUIDES: HarnessMcpGuide[] = [
  {
    id: 'playwright',
    name: 'Playwright MCP',
    description: '브라우저 조작과 실제 웹 UI 검증이 필요한 프로젝트용.',
    officialUrl: 'https://github.com/microsoft/playwright-mcp',
    commandExample: 'npx -y @playwright/mcp@latest',
    note: '브라우저 자동화가 실제로 필요한 프로젝트에서만 사용자가 직접 연결.',
  },
  {
    id: 'github',
    name: 'GitHub MCP Server',
    description: 'Repository, Issue, Pull Request 등 GitHub 작업을 AI 클라이언트에서 다룰 때 사용.',
    officialUrl: 'https://github.com/github/github-mcp-server',
    commandExample: '공식 문서의 현재 설치 방법 확인',
    note: '인증과 repository 권한은 사용자가 직접 설정. 가능하면 read-only/최소 권한부터 시작.',
  },
  {
    id: 'context7',
    name: 'Context7 MCP',
    description: '라이브러리·프레임워크·SDK의 최신 문서와 코드 예시 확인용.',
    officialUrl: 'https://github.com/upstash/context7',
    commandExample: '공식 문서의 현재 설치 방법 확인',
    note: '최신 외부 문서가 중요한 API·설정·마이그레이션 작업에 적합.',
  },
];

export const DEFAULT_SKILL_IDS = HARNESS_SKILLS.filter((item) => item.defaultSelected).map((item) => item.id);

function assertUniquePaths(files: GeneratedHarnessFile[]): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  files.forEach((file) => {
    if (seen.has(file.path)) duplicates.add(file.path);
    seen.add(file.path);
  });
  if (duplicates.size > 0) throw new Error(`Duplicate generated harness paths: ${Array.from(duplicates).join(', ')}`);
}

export function buildHarnessFiles(selectedSkillIds: string[]): GeneratedHarnessFile[] {
  const skills = HARNESS_SKILLS.filter((item) => selectedSkillIds.includes(item.id));
  const files: GeneratedHarnessFile[] = [
    { path: 'AGENTS.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: '스택을 가정하지 않는 공통 프로젝트 계약과 source-of-truth 지도', content: SHARED_AGENTS_MD },
    { path: 'DESIGN.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: '특정 테마를 강요하지 않는 중립 디자인 계약 starter', content: DESIGN_MD_TEMPLATE },
    { path: 'MCP_추천_목록.md', role: 'documentation', consumers: ['Human', 'AI clients'], description: '자동 연결 없이 MCP 용도와 공식 링크만 제공하는 한글 추천 문서', content: MCP_RECOMMENDATIONS_MD },
    { path: 'CLAUDE.md', role: 'adapter', consumers: ['Claude Code'], description: 'AGENTS.md를 import하는 Claude Code 어댑터', content: CLAUDE_MD },
    { path: '.codex/config.toml', role: 'adapter', consumers: ['Codex'], description: 'MCP를 선설정하지 않은 Codex project config 골격', content: CODEX_CONFIG_TOML },
    { path: '.mcp.json', role: 'adapter', consumers: ['Claude Code'], description: '서버가 비어 있는 Claude Code project MCP 골격', content: EMPTY_MCP_JSON },
    { path: '.agents/rules/project-core.md', role: 'adapter', consumers: ['Antigravity'], description: 'AGENTS.md와 DESIGN.md를 연결하는 Antigravity workspace rule', content: ANTIGRAVITY_PROJECT_CORE },
    { path: '.agents/mcp_config.json', role: 'adapter', consumers: ['Antigravity'], description: '서버가 비어 있는 Antigravity workspace MCP 골격', content: EMPTY_MCP_JSON },
    { path: 'docs/architecture/overview.md', role: 'documentation', consumers: ['All'], description: '실제 저장소 아키텍처 기록 위치', content: '# Architecture\n\nRecord the current system architecture after inspecting the real repository. Keep this descriptive, evidence-based, and distinct from future plans.\n' },
    { path: 'docs/design/README.md', role: 'documentation', consumers: ['All'], description: 'DESIGN.md를 중복하지 않는 구현 상세 문서 위치', content: '# Design implementation notes\n\nDESIGN.md is the canonical design contract after project-specific adaptation. Store component behavior, responsive exceptions, accessibility notes, and implementation details here without copying canonical values into a second source of truth.\n' },
    { path: 'docs/plans/README.md', role: 'documentation', consumers: ['All'], description: '승인된 구현 계획 보관 위치', content: '# Plans\n\nStore approved implementation plans here with scope, assumptions, risks, validation, and rollback. Do not treat proposals as current architecture.\n' },
    { path: 'docs/decisions/README.md', role: 'documentation', consumers: ['All'], description: '기술 의사결정 보관 위치', content: '# Decisions\n\nStore durable architecture decisions with context, alternatives, consequences, and date.\n' },
    { path: 'docs/tasks/README.md', role: 'documentation', consumers: ['All'], description: '세션 간 작업 상태와 handoff', content: '# Tasks and handoff\n\nRecord durable task status, verified evidence, remaining work, blockers, and exact revision when useful.\n' },
    { path: 'docs/reference/README.md', role: 'documentation', consumers: ['All'], description: '프로젝트 근거·정책·도메인 자료 보관 위치', content: '# Reference\n\nStore durable project references, external source notes, policies, and domain constraints here. Re-check time-sensitive sources before relying on them.\n' },
    { path: 'docs/ai-harness/README.md', role: 'documentation', consumers: ['All'], description: '범용 하네스 사용법과 보안·병합 경계', content: HARNESS_README },
    { path: 'docs/ai-harness/compatibility.md', role: 'documentation', consumers: ['All'], description: '세 도구 호환성 표', content: COMPATIBILITY_MD },
    { path: 'scripts/sync-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'canonical skill을 Claude native path로 안전하게 동기화', content: SYNC_SCRIPT },
    { path: 'scripts/validate-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'skill mirror와 빈 MCP config 골격을 검증', content: VALIDATE_SCRIPT },
    { path: 'README.ai-harness.md', role: 'documentation', consumers: ['Human'], description: '다운로드 패키지를 새/기존 프로젝트에 적용하는 순서', content: '# AI Harness v2 setup\n\n1. New project: inspect the repository and adapt AGENTS.md before treating it as project-specific truth. Existing project: merge useful sections; do not blindly overwrite established instructions.\n2. Record only real commands, protected paths, generated outputs, deployment boundaries, and domain invariants in AGENTS.md.\n3. DESIGN.md is intentionally neutral. Populate it only from verified project/design evidence; do not adopt imaginary starter colors or fonts.\n4. Review MCP_추천_목록.md and connect only external tools the project actually needs. Empty config skeletons do not mean an MCP is installed. Preserve and merge existing native config files.\n5. Keep only skills that help the project. Dedicated skills should be selected directly; capability-router is for ambiguous or multi-capability work.\n6. Run node scripts/sync-ai-harness.mjs and node scripts/validate-ai-harness.mjs. The sync helper preserves unrelated Claude-only skill directories.\n7. Review each client\'s trust, approval, sandbox, MCP credentials, and external write permissions locally.\n' },
  ];

  skills.forEach((item) => {
    files.push({ path: `.agents/skills/${item.id}/SKILL.md`, role: 'canonical', consumers: ['Codex', 'Antigravity'], description: `${item.name} canonical skill`, content: item.content });
    files.push({ path: `.claude/skills/${item.id}/SKILL.md`, role: 'mirror', consumers: ['Claude Code'], description: `${item.name} Claude native mirror`, content: item.content });
  });

  assertUniquePaths(files);
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
