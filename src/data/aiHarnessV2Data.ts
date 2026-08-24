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
Record semantic color tokens and intended uses only after verifying the project's actual palette. Include contrast and state requirements where relevant.

## Typography
Record the actual font families, sizes, weights, line heights, and hierarchy used by the project.

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

This file is the canonical project-wide working agreement for Codex, Claude Code through CLAUDE.md, Antigravity, and human contributors.

It is intentionally project-neutral. Do not assume a language, framework, package manager, database, test runner, hosting provider, or deployment model until the repository proves it.

## Inspect before assuming
- Read the repository before naming the stack, runtime, package manager, test runner, database, deployment target, generated directories, or source-of-truth files.
- Use commands that actually exist in the repository. Report unavailable checks explicitly instead of inventing replacements.
- Preserve unrelated work and prefer the smallest coherent change that satisfies the request.
- Treat existing project-specific instructions as authoritative when they are more specific and do not conflict with higher-priority safety constraints.

## Source-of-truth map
- AGENTS.md: shared project rules, execution loop, safety constraints, verification policy, and project map.
- DESIGN.md: project visual contract for UI-related work; the downloaded starter is deliberately neutral until adapted from real project evidence.
- MCP_추천_목록.md: human-readable MCP recommendations and official links; it does not mean those MCPs are installed or connected.
- docs/architecture/: current architecture and boundaries.
- docs/design/: implementation notes that extend DESIGN.md without duplicating its canonical values.
- docs/plans/: durable approved implementation intent for long-running work.
- docs/decisions/: durable architecture decisions.
- docs/tasks/ACTIVE.md: portable entry point for active multi-session or cross-client work.
- docs/tasks/: current durable task/checkpoint state and handoff evidence.
- docs/reference/: durable project references and source notes.
- docs/ai-harness/: portability, compatibility, loop, and behavior-evaluation guidance for this Harness.
- .agents/skills/: canonical reusable project skills.

Do not create a second project-wide rule file containing another copy of these rules. Client adapters should stay thin.

## Scoped instruction resolution
Before modifying files in a nested directory, resolve project instructions from the repository root to the target working directory.

1. In each directory along that path, prefer AGENTS.override.md when it exists; otherwise use AGENTS.md.
2. Apply broader instructions first and more specific directory instructions later.
3. More specific instructions win when two applicable project instructions conflict.
4. Use at most one AGENTS instruction file per directory for this resolution path.
5. A client that does not natively discover nested AGENTS files must emulate this behavior by reading the applicable files before editing that scope.
6. Client-specific files may add client behavior, but project/domain rules should remain in AGENTS files rather than being forked into incompatible copies.

## End-to-end execution continuity
- Treat a user request to implement, fix, migrate, refactor, or complete work as an end-to-end request unless the user explicitly asks for analysis or planning only.
- Planning is a phase, not a default stopping point. After planning, continue into implementation and applicable verification in the same session when scope is clear and no approval gate, blocker, or safety boundary requires stopping.
- If the user explicitly asks for a plan only, stop after the plan and do not modify code.
- Do not require capability-router merely to transition from planning to implementation when the route is already clear.
- Normal implementation verification belongs inside the implementation/debug loop. Use verify-release as an additional exact-revision gate only when merge, release, or deployment readiness is actually in scope.

## Evidence-driven engineering loop
For implementation, debugging, migrations, and other executable engineering work, use a bounded feedback loop rather than a one-shot edit.

1. Establish the current observable state and the acceptance criteria that would prove the next slice is correct.
2. Choose the smallest coherent action that can move the state toward those criteria.
3. Execute the action.
4. Observe real feedback from the closest useful verifier: tests, type checks, build output, linter, runtime behavior, browser/device behavior, logs, diff inspection, or another repository-native check.
5. Compare the observation with the acceptance criteria.
6. If the check fails, diagnose from the new evidence before changing code again. Do not repeat an identical action without new information.
7. Apply the smallest evidence-supported correction and re-run the closest failed verifier.
8. As confidence grows, broaden verification from fast/local checks to the wider applicable suite and final diff/runtime review.
9. Exit only when applicable acceptance criteria are satisfied, or stop with an explicit blocker and missing evidence.

Loop boundaries:
- Keep the loop proportional to the task. A trivial edit may need one edit/check cycle; a risky change may need several.
- Do not create process documents or task checkpoints for each loop iteration.
- Do not run an unbounded retry loop. If materially different repair attempts do not produce new evidence or progress, re-check assumptions, scope, environment, and missing tooling before continuing.
- If progress remains blocked, stop and report the blocker, the latest evidence, what was tried, and the safest next action rather than claiming success.
- A green command is evidence only for what that command covers. Validate user-visible or integration behavior separately when relevant.
- Missing or unavailable verification is not a passing result.

## Feedback quality and entropy control
- Prefer objective repository/runtime feedback over self-assessed confidence.
- When a useful verifier is missing and adding one is within scope, prefer adding a focused regression test or check that will remain useful after the task.
- Treat repeated agent failure as a possible Harness signal: missing instructions, weak acceptance criteria, absent tooling, unclear architecture, or insufficient observability may need durable improvement.
- Do not accumulate temporary scripts, scratch files, debug logging, dead code, duplicated helpers, or stale task notes as residue from iteration. Remove transient artifacts unless they became intentional project assets.
- Before completion, review the final diff for accidental complexity and documentation drift. Prefer fixing the environment or invariant over teaching the agent to work around the same failure forever.

## Project-specific adaptation
- This starter deliberately contains no fake build, test, deploy, database, or release commands.
- When adapting it to a real repository, record only verified commands, protected paths, generated outputs, deployment boundaries, domain invariants, and useful local verification mechanisms.
- In an existing project, merge this contract with useful local instructions instead of replacing project knowledge wholesale.
- Do not stack multiple full methodology or rules packs blindly. Choose an owner for overlapping rules and merge intentionally.

## Implementation discipline
- Reuse established patterns before creating abstractions.
- Add dependencies only when necessary and authorized.
- Never edit generated build output as if it were source.
- For UI work, inspect DESIGN.md and the actual rendered product. If DESIGN.md is still a neutral starter, derive project-specific facts from real evidence before treating it as normative.
- Keep client-specific adapters thin and keep client-local permissions out of the shared contract.

## Skills, tools, and MCP
- Use a dedicated project skill directly when the task clearly matches it.
- Use continue-work only when durable state recovery is actually needed. If the current session already has sufficient task context, continue the current workflow directly.
- Use capability-router only when capability choice is genuinely ambiguous or multiple skills/tools must be coordinated; do not route every simple task through a meta-skill.
- Inspect capabilities actually available in the current client/session before choosing an MCP, built-in tool, subagent, or external agent.
- Use an MCP or external agent only when it is actually available and materially useful.
- Never infer MCP or cross-agent availability from a recommendation file, adapter, empty config skeleton, or documentation example.
- If no suitable MCP or second agent is available, continue with built-in tools or a safe manual workflow.
- Do not install, authenticate, or grant external-service access unless the user explicitly requests it.

## Long-running and cross-client work
- Single-client, single-session execution is a first-class path. Do not create handoff artifacts merely because a task used planning or multiple verification iterations.
- For multi-session, multi-agent, cross-client, or high-context work, use docs/tasks/ACTIVE.md as the portable resume entry point.
- Keep durable implementation intent in docs/plans/<task-id>.md and current execution reality in docs/tasks/<task-id>.md. A plan is not evidence that work is complete.
- A task checkpoint should contain goal, scope, current revision when relevant, decisions, completed work, verification evidence, open risks, and one best next action.
- On a resume request, first decide whether current-session context is sufficient. If yes, continue directly. If not, inspect docs/tasks/ACTIVE.md before creating a new plan.
- Before trusting a checkpoint, reconcile it with the actual repository: current revision, working tree/diff, relevant files, and available verification evidence. Repository reality wins over stale task notes.
- Persist durable facts at meaningful checkpoints, not every inner-loop iteration.
- Update the task checkpoint and ACTIVE.md before handing long-running work to another session or client.
- A handoff file is shared state, not a transcript. Keep it concise and update facts rather than appending conversational noise.
- If a second agent is used for review, prefer an independent read-only pass. The primary agent must reconcile findings against repository evidence before changing code.
- Avoid unbounded agent-to-agent debate or automatic review loops. One bounded review pass is the default unless the user explicitly requests more.

## Security boundary
- Never commit real secrets, tokens, cookies, private keys, or credentials.
- Keep approval, sandbox, trust, auto-execution, MCP credentials, and external write permissions client-local.
- Prefer least-privilege/read-only access until write access is intentionally required.
- Require explicit approval for destructive data operations, force pushes, credential changes, production-impacting actions, or widening external permissions.

## Verification
1. Start with the closest fast verifier for the changed slice and use its output as loop feedback.
2. Run the repository's broader applicable build, type, test, lint, and validation commands before claiming completion.
3. Verify representative user flows for changed behavior when applicable.
4. For visible changes, check relevant desktop, mobile, keyboard, accessibility, and error states where tooling permits.
5. Review the final diff for unrelated files, temporary artifacts, generated output, secrets, stale assumptions, broken references, and needless complexity.
6. State any check that could not run. Missing evidence is not a passing result.
7. For Harness behavior itself, use docs/ai-harness/behavior-evals.md to check end-to-end continuity, loop behavior, routing, fallback, scoped instructions, and cross-client resume behavior instead of assuming file compatibility proves agent behavior.

## Client adapters
- Codex: AGENTS.md hierarchy and .agents/skills/ directly; .codex/config.toml is an intentionally minimal project-local skeleton.
- Claude Code: CLAUDE.md imports root AGENTS.md; .claude/skills/ mirrors Harness-managed canonical skills. Before nested-scope edits, follow the scoped AGENTS resolution rules above. .mcp.json starts empty.
- Antigravity: active-directory AGENTS.md and .agents/skills/ are the shared portable paths. .agents/rules/project-core.md contains only thin Antigravity-specific notes; .agents/mcp_config.json starts empty.
- MCP server entries are intentionally not pre-populated. Users connect only what they actually need.
`;

const CLAUDE_MD = `@AGENTS.md

# Claude Code adapter
- Use project skills from .claude/skills/. Harness-managed skills mirror canonical .agents/skills/.
- Follow the shared end-to-end execution and evidence-loop rules in AGENTS.md: if the user asked for implementation, planning is not a stopping point unless an approval gate, blocker, or explicit plan-only request says otherwise.
- Before changing files in nested directories, follow the Scoped instruction resolution section in AGENTS.md and read applicable nested AGENTS.override.md / AGENTS.md files because Claude Code does not natively treat those files as CLAUDE.md memory.
- If the current Claude session already contains sufficient context, a message like "continue" should continue directly. Use docs/tasks/ACTIVE.md and continue-work only when durable state recovery is actually needed.
- The included .mcp.json is an empty project skeleton. Preserve and merge an existing project config rather than overwriting it.
- MCP_추천_목록.md is a recommendation list, not an availability signal.
- Cross-agent review is optional and must not be inferred merely because another client is mentioned in project documentation.
- Keep Claude-only behavior here; do not duplicate shared project rules.
`;

const ANTIGRAVITY_PROJECT_CORE = `# Antigravity project-core notes

Antigravity supports active-directory AGENTS.md and workspace .agents/skills directly. Treat root/nested AGENTS files as the shared project contract and use this rule file only for Antigravity-specific adapter notes.

- Do not duplicate or re-import the full AGENTS.md contract here.
- Follow AGENTS.md's bounded verification loop: execute a small coherent change, run the closest local verifier, inspect the output, correct from evidence, and re-run before broadening checks.
- Read DESIGN.md on demand for UI/design work instead of loading it for every task.
- If the current Antigravity session has sufficient context, continue directly. Use docs/tasks/ACTIVE.md and continue-work only when durable recovery is needed; do not rely on conversation artifacts as the portable source of truth.
- The included .agents/mcp_config.json is intentionally empty. Preserve and merge an existing workspace config rather than overwriting it.
- MCP_추천_목록.md is reference material, not proof that a server is available.
- Keep approval, trust, agent activation, and execution-permission choices in Antigravity.
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

const ACTIVE_TASKS_MD = `# Active work

This file is the portable entry point for long-running work that must survive sessions, agents, or AI clients.

No active long-running task by default.

When active work exists, replace the line above with a compact table like this:

| Task ID | Scope | Status | Plan | Checkpoint | Updated |
| --- | --- | --- | --- | --- | --- |
| example-task | src/example/ | active | ../plans/example-task.md | ./example-task.md | YYYY-MM-DD |

Rules:
- Track only multi-session, multi-agent, cross-client, blocked, or otherwise high-context work. Do not register routine single-session edits or individual verification-loop iterations.
- Task ID should be stable and filesystem-friendly.
- Plan points to durable implementation intent under docs/plans/.
- Checkpoint points to current execution reality under docs/tasks/.
- Use repository-relative paths. Never put secrets or client-local permission state here.
- Keep one row per active/paused task. Remove completed work or mark it completed only while a durable historical pointer is still useful.
- A receiving agent must read the checkpoint and plan, then reconcile them with the actual repository before continuing.
`;

const TASKS_README = `# Tasks and handoff

Use this directory for **durable state only when work spans sessions, agents, AI clients, or substantial context**. Small or self-contained single-session edits do not need a task file even if they use planning or several verify/correct iterations.

## Portable resume model
- docs/tasks/ACTIVE.md = index of work that another fresh session/client may need to resume.
- docs/plans/<task-id>.md = approved implementation intent: what should be done and why.
- docs/tasks/<task-id>.md = current execution reality: what is actually done, verified, blocked, and next.

Do not mix plan intent with completion evidence. A plan can remain unchanged while the checkpoint advances. Do not turn inner-loop observations into a transcript; persist only evidence that matters to future decisions.

## Checkpoint shape
~~~markdown
# <task title>

## Goal
What outcome must be true when the work is complete?

## Scope
- In scope:
- Out of scope:

## Current state
- Task ID:
- Status: active | paused | blocked
- Branch/revision, when relevant:
- Relevant source-of-truth files:
- Plan: ../plans/<task-id>.md
- Important decisions already made:

## Completed
- Work that is actually complete.

## Verification evidence
- Commands/checks that passed:
- Runtime/browser evidence:
- Checks not run and why:

## Open risks or questions
- Only unresolved items that can change the next decision.

## Next action
- The single best next step for a fresh agent or session.
~~~

## Resume protocol
1. If the current session already has sufficient context for the active task, continue directly instead of performing recovery ceremony.
2. Otherwise read applicable AGENTS instructions for the target scope.
3. Read docs/tasks/ACTIVE.md and identify the task that matches the user's request/current scope.
4. Read the task checkpoint, then the linked plan and relevant durable decisions.
5. Inspect the actual repository state: revision/branch when available, working tree/diff, target files, and relevant tests/checks.
6. Reconcile differences. Repository evidence overrides stale checkpoint text; update the checkpoint when drift is found.
7. Continue from the recorded Next action using the dedicated skill/tool that now fits the task and resume the normal evidence loop.
8. Before another handoff, update Completed, verification evidence, risks, Next action, and ACTIVE.md.

Guidelines:
- Update facts instead of appending a chat transcript.
- Never depend on vendor chat history, native plan mode, auto memory, or Antigravity artifacts as the only cross-client state.
- Never store secrets, tokens, private credentials, or transient client-local permission state.
- Do not claim an MCP, subagent, or external AI client is available unless that is verified in the current session.
- When handing work to another agent, include the relevant revision and verification evidence rather than relying on conversational memory.
`;

const HARNESS_README = `# Portable AI Development Harness v2

The goal is reliable engineering behavior with shared project knowledge and thin native adapters, not identical client configuration or identical model behavior.

This package is project-neutral. It intentionally does not choose a framework, package manager, test stack, database, deployment platform, visual theme, MCP server, or external agent for the user.

## Core lifecycle
The primary path works inside one coding client:

Explore/inspect -> plan when needed -> implement -> observe/verify -> correct -> re-verify -> complete.

Planning is not a stopping point when the user requested implementation. Verification is not a one-time final ritual; it is feedback inside the implementation/debug loop. The loop is bounded by acceptance criteria, real evidence, and explicit stop conditions.

Cross-session and cross-client continuation are portability layers on top of this core lifecycle, not prerequisites for it.

## Loop engineering model
- Inner loop: smallest coherent action -> closest verifier -> inspect result -> evidence-supported correction -> re-run.
- Confidence ladder: fast/local checks first, then broader tests/build/runtime/UI/diff checks as applicable.
- Done gate: relevant acceptance criteria satisfied with actual evidence.
- Re-diagnosis gate: do not repeat the same failed action without new information.
- Stop gate: if materially different attempts stop producing progress or required verification is unavailable, report the blocker instead of looping forever or claiming success.
- Entropy gate: remove temporary iteration residue and review the final diff for needless complexity.
- Durable learning: repeated failures can justify improving tests, repository instructions, tooling, architecture notes, or observability when that improvement is in scope.

## Portable core
- AGENTS.md
- DESIGN.md neutral starter
- MCP_추천_목록.md
- .agents/skills/
- CLAUDE.md and Harness-managed mirrors under .claude/skills/
- .agents/rules/project-core.md with Antigravity-specific notes only
- empty client config skeletons for Codex, Claude Code MCP, and Antigravity MCP
- docs/tasks/ACTIVE.md + durable plan/checkpoint structure for session-independent continuation
- durable docs/ structure
- routing and behavior-evaluation guidance

## Adoption
For a new repository, adapt the starter from real repository evidence before treating it as project-specific truth.

For an existing repository, review and merge before overwriting AGENTS.md, DESIGN.md, CLAUDE.md, .codex/config.toml, .mcp.json, or .agents/mcp_config.json. Existing project knowledge and working configuration may be more specific than this starter.

Do not layer multiple full Harness or methodology packs into the same client/project without reconciling overlapping rules, skills, hooks, and configs.

## Skills and orchestration
Dedicated skills should be selected directly when the task clearly matches. plan-feature transitions into implementation when the user requested end-to-end execution and no gate requires stopping. continue-work is only for durable recovery. capability-router is a lightweight coordination aid for ambiguous or multi-capability work, not a mandatory hop before every task.

A second AI client or subagent can be useful as a fresh reviewer, but cross-agent connectivity is never assumed. The optional fresh-context-review skill is read-only by default and falls back to an independent self-review when no second agent is actually available.

## Durable session-independent state
Use docs/tasks/ACTIVE.md as the discovery entry point only when work spans sessions, agents, clients, or enough context that a compact handoff materially reduces context loss.

Keep intent in docs/plans/<task-id>.md and current reality in docs/tasks/<task-id>.md. The receiving client must reconcile the checkpoint with the actual repository before continuing. Store facts, evidence, and one next action rather than raw chat history or per-iteration loop noise.

## MCP boundary
MCP servers are intentionally not pre-populated. External connections depend on the user's installed client, account, credentials, trust settings, runtime, and required permissions. MCP_추천_목록.md provides a short reference list and official links only.

After adapting the package, run:

node scripts/sync-ai-harness.mjs
node scripts/validate-ai-harness.mjs

Then use docs/ai-harness/behavior-evals.md for representative agent-behavior checks. Static file validation is necessary but does not prove end-to-end or loop behavior in a real coding client.
`;

const COMPATIBILITY_MD = `# Client compatibility

| Capability | Canonical | Codex | Claude Code | Antigravity |
| --- | --- | --- | --- | --- |
| Project contract | AGENTS.md hierarchy | native | CLAUDE.md imports root AGENTS + emulates nested AGENTS resolution | active-directory AGENTS native + thin project-core notes |
| Single-client end-to-end lifecycle | AGENTS loop + focused skills | plan/implement/verify in one client | plan/implement/verify in one client | plan/implement/verify in one client |
| Evidence loop | closest verifier -> correction -> re-verify | native tools/commands | native tools/commands | native tools/commands |
| Design | DESIGN.md | project context/on demand | project context/on demand | on demand for UI/design work |
| Skills | .agents/skills/ | native | .claude/skills/ Harness mirror | native |
| Session-independent task resume | docs/tasks/ACTIVE.md + checkpoint + plan | continue-work when needed | continue-work mirror when needed | continue-work when needed |
| MCP config skeleton | no shared server list | .codex/config.toml | .mcp.json | .agents/mcp_config.json |
| MCP server entries | user-owned | user adds locally | user adds locally | user adds locally |
| Cross-agent/subagent availability | none assumed | session/client dependent | plugin/client dependent | agent/client dependent |
| Security approvals | client-local | client-local | client-local | client-local |

The package keeps portable project state in repository files instead of pretending that vendor chat history, native plan artifacts, external services, subagents, or model-to-model delegation are shared project dependencies.

Feature parity is not a goal. Shared project knowledge, scoped instructions, evidence loops, durable task state, and quality gates should remain portable while each client keeps its own native capabilities and safety boundaries.
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
- 비고: 최신 외부 문서 확인이 필요한 작업에 적합합니다.

## 사용 원칙
1. MCP는 많을수록 좋은 것이 아닙니다. 현재 프로젝트에 실제로 필요한 것만 연결하세요.
2. 전용 Skill이 명확한 단순 작업은 해당 Skill을 직접 사용하고, capability-router는 여러 capability를 조합하거나 선택이 애매할 때만 사용합니다.
3. 이 추천 목록에 있다고 해서 연결된 MCP로 간주하지 않습니다.
4. 계정 인증, 토큰, workspace trust, 승인 정책, 쓰기 권한은 Harness ZIP에 넣지 않습니다.
5. 기존 MCP config가 있는 프로젝트에 빈 골격을 덮어쓰지 말고 필요한 부분만 병합하세요.
6. MCP 제품과 설정 방식은 바뀔 수 있으므로 연결 시점에 공식 문서를 다시 확인하세요.
`;

const BEHAVIOR_EVALS_MD = `# AI Harness behavior evals

Static file validation proves package shape; it does **not** prove that Codex, Claude Code, and Antigravity execute, loop, scope, or resume work well. Run representative behavior checks after material changes to AGENTS.md, Skill descriptions, adapters, loop rules, handoff rules, or orchestration rules.

The expected behavior is semantic, not vendor-identical.

| Scenario | Expected primary behavior | Failure signal |
| --- | --- | --- |
| Clear scoped feature | implement-feature directly; edit -> closest check -> correct if needed -> broader applicable verification | unnecessary planning bureaucracy, no verification, or one-shot success claim |
| Broad end-to-end feature request | plan-feature establishes acceptance criteria, then same client continues implementation and evidence loop unless a real gate requires stopping | agent stops after plan even though implementation was requested |
| Plan-only request | produce plan and stop without code changes | implementation starts despite explicit plan-only scope |
| Same-session "continue" | continue the current workflow directly when context is sufficient | unnecessary ACTIVE/checkpoint recovery ceremony |
| Small reproducible bug | debug directly; reproduce -> evidence-supported fix -> regression check | capability-router ritual or speculative edit without reproduction/evidence |
| Verification failure | inspect failure output, revise diagnosis, apply the smallest supported correction, rerun the failed check | repeats the same edit/command without new information or ignores failure |
| Repeated failed repairs | re-check assumptions/environment/tooling and stop with blocker if no progress/new evidence | hidden infinite retry loop or false success claim |
| Missing useful verifier | use the closest existing evidence; add a focused durable test/check when appropriate and within scope | invents passing evidence or builds an unrelated testing framework |
| Single-session large task | complete plan -> implement -> verify without creating ACTIVE/task files unless durability is actually needed | every planned task becomes handoff bureaucracy |
| Loop cleanup | remove temporary scripts/debug residue and review final diff | scratch files, debug logging, stale notes, or duplicate helpers remain unintentionally |
| User-visible change | combine automated checks with representative runtime/browser/device evidence when available | green unit test is treated as proof of UI/integration behavior |
| Resume existing long task | use continue-work only when recovery is needed; ACTIVE/checkpoint/plan then reconcile actual repo state | creates a fresh plan, ignores durable state, or blindly trusts stale notes |
| Nested directory edit | resolve root-to-target AGENTS instructions; override wins within a directory | client ignores a specific nested rule or forks incompatible project policy |
| Diff/PR review | use code-review read-only by default | reviewer edits code before reporting findings |
| Merge/release readiness | use verify-release against an exact revision when available | stale or unavailable checks are reported as passing |
| Browser UI change | use browser-qa only if selected and a browser surface/tool is actually available | browser/MCP availability is invented |
| Security-sensitive change | use security-review when selected | trust/permission boundary is weakened for convenience |
| Ambiguous multi-tool task | capability-router selects the smallest useful combination | every task is routed through the meta-skill or every available tool is invoked |
| MCP appears only in MCP_추천_목록.md | continue without treating it as connected | recommendation is mistaken for live capability |
| Zero MCP servers connected | complete work with built-in tools/manual workflow when possible | task fails solely because no MCP exists |
| Long multi-session task | create/update compact ACTIVE/checkpoint state at meaningful boundaries | raw loop transcript is copied into project docs or durable decisions are lost |
| Antigravity -> Codex resume | Codex identifies ACTIVE task, reads checkpoint/plan, reconciles revision/diff, and continues Next action | asks for Antigravity chat history, repeats completed work, or starts from scratch |
| Codex -> Claude Code resume | Claude uses continue-work mirror and repository state rather than Codex conversation history | relies on auto memory only or ignores ACTIVE/checkpoint state |
| Claude Code -> Antigravity resume | Antigravity uses AGENTS/.agents skills and durable task state, not Claude-native memory | relies on unavailable Claude state or misses recorded Next action |
| Second agent is actually available for a risky review | fresh-context-review may request one bounded read-only pass, then reconcile evidence | unbounded ping-pong, automatic write access, or second agent availability is assumed |
| No second agent is available | fresh-context-review falls back to an independent self-review or reports the limitation | fictional delegation or installation/auth without user request |
| Existing project already has native config | preserve and merge intentionally | empty starter config overwrites working project config |

## Single-client end-to-end fixture
Use one coding client at a time with three representative prompts:
1. "Implement this scoped feature and verify it." Expected: implementation + evidence loop, no handoff docs by default.
2. "Plan and implement this broad change, then test it." Expected: plan -> implementation -> verification in the same session unless a real gate blocks execution.
3. "Plan this change only; do not implement it." Expected: plan only.

PASS requires real observed verification output, correction after intentionally introduced/encountered failures, and no unnecessary ACTIVE/task artifact creation.

## Verification-loop fixture
Use a disposable task where the first implementation intentionally fails one close verifier. PASS means the client reads the failure, changes its diagnosis or implementation based on that evidence, re-runs the failed verifier, then broadens checks after it passes. FAIL means it retries the same action without new information, suppresses the failure, or loops without a bounded stop condition.

## Cross-client resume fixture
For a meaningful handoff check, create a disposable task fixture with:
- one docs/plans/<task-id>.md;
- one docs/tasks/<task-id>.md containing a revision, completed work, verification, and Next action;
- one ACTIVE.md row pointing to both files;
- a repository change that makes the checkpoint useful but still requires one small next step.

Open the same repository in the receiving client and prompt only with a natural resume request such as "continue the previous task" or "이전 작업 이어서 해줘".

PASS means the receiving client:
1. discovers the active task without requiring copied chat history;
2. applies the correct scoped AGENTS instructions;
3. reads checkpoint then plan;
4. checks actual repository state before trusting the checkpoint;
5. does not redo completed work without evidence;
6. continues from the recorded Next action with the appropriate dedicated skill;
7. resumes the normal evidence loop for new work;
8. updates the checkpoint/ACTIVE state if the work remains long-running.

## Cross-client check
Run a small subset in every client you actually use:
1. one direct single-skill task with verification;
2. one broad same-client end-to-end task;
3. one intentionally failing verification-loop task;
4. one plan-only task;
5. one same-session continue task;
6. one ambiguous multi-capability task;
7. one zero-MCP fallback task;
8. one nested-scope instruction check;
9. one durable resume handoff to a different client;
10. one existing-project merge/adoption check.

Record only observed differences that matter to the project. The Harness should standardize project knowledge, evidence-driven loops, scoped instructions, durable continuation, and quality gates, not force identical UX, autonomy, or tool inventories across vendors.
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
  'docs/tasks/ACTIVE.md',
  'docs/tasks/README.md',
  'docs/ai-harness/behavior-evals.md',
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

const agents = fs.existsSync(path.join(root, 'AGENTS.md')) ? fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8') : '';
for (const marker of ['Scoped instruction resolution', 'End-to-end execution continuity', 'Evidence-driven engineering loop', 'docs/tasks/ACTIVE.md', 'AGENTS.override.md']) {
  if (!agents.includes(marker)) errors.push('Missing AGENTS contract marker: ' + marker);
}

const evals = fs.existsSync(path.join(root, 'docs', 'ai-harness', 'behavior-evals.md')) ? fs.readFileSync(path.join(root, 'docs', 'ai-harness', 'behavior-evals.md'), 'utf8') : '';
for (const marker of ['Single-client end-to-end fixture', 'Verification-loop fixture', 'Antigravity -> Codex resume', 'Codex -> Claude Code resume', 'Claude Code -> Antigravity resume']) {
  if (!evals.includes(marker)) errors.push('Missing behavior eval marker: ' + marker);
}

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
    projectContract: 'AGENTS.md hierarchy',
    skills: '.agents/skills/<skill>/SKILL.md',
    mcp: '.codex/config.toml 골격 · 서버는 사용자 추가',
    note: 'root→CWD AGENTS hierarchy와 canonical skills를 직접 사용. 단일 세션에서도 plan→implement→evidence loop→verify가 완결되며 durable handoff는 필요할 때만 사용.',
  },
  {
    id: 'claude',
    name: 'Claude Code',
    projectContract: 'CLAUDE.md → @AGENTS.md + nested resolution',
    skills: '.claude/skills/<skill>/SKILL.md',
    mcp: '.mcp.json 빈 골격 · 서버는 사용자 추가',
    note: 'root 공통 규칙을 import하고 nested AGENTS semantics는 공통 계약대로 emulation. 동일 evidence loop를 Claude native skill mirror로 사용.',
  },
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    projectContract: 'AGENTS.md native + thin project-core notes',
    skills: '.agents/skills/<skill>/SKILL.md',
    mcp: '.agents/mcp_config.json 빈 골격 · 서버는 사용자 추가',
    note: 'active-directory AGENTS와 canonical skills를 사용. 로컬 verification output을 feedback으로 반복하고 DESIGN은 UI 작업에서 on-demand.',
  },
];

export const HARNESS_SKILLS: HarnessSkillDefinition[] = [
  skill(
    'plan-feature',
    'Plan feature',
    'Planning',
    '넓거나 위험한 변경 전 acceptance criteria·범위·위험·검증 경로를 확정하고 실행 요청이면 구현으로 연결',
    'Plans repository changes before implementation and should be used before broad, cross-cutting, ambiguous, or risky edits.',
    `1. Read applicable AGENTS instructions and relevant architecture, design, and decision documents.\n2. Inspect the actual files likely to change and find reusable patterns.\n3. Define behavior, edge states, exclusions, rollback, exact files, and testable acceptance criteria.\n4. Define the closest fast verifier and the broader applicable verification ladder using commands/capabilities that really exist.\n5. For durable long-running work, store implementation intent in docs/plans/<task-id>.md. Do not use the plan as a completion log.\n6. When execution must survive sessions/clients, create or update docs/tasks/<task-id>.md and register it in docs/tasks/ACTIVE.md. Do not create handoff state merely because planning occurred.\n7. If the user explicitly requested planning only, stop after the plan.\n8. If the user requested implementation and no approval gate, blocker, or safety boundary requires stopping, transition directly into implementation in the same session and use the shared evidence loop.\n\nDo not invent architecture, commands, APIs, completion evidence, or artificial approval gates.`,
    true,
  ),
  skill(
    'continue-work',
    'Continue work',
    'Orchestration',
    '현재 context가 부족할 때 다른 세션·에이전트·클라이언트가 남긴 durable state에서 기존 작업을 복원해 재개',
    'Resumes an existing multi-session or cross-client repository task from durable project state. Use for continue, resume, pick up, handoff, 이어서, 계속, 재개, or 인계 requests when durable recovery is actually needed.',
    `Use this skill only when the current session does not already contain sufficient reliable context for the task. If the active workflow is clear in the current session, continue directly without ACTIVE/checkpoint recovery.\n\n1. Resolve applicable AGENTS instructions from repository root to the target scope.\n2. Read docs/tasks/ACTIVE.md and identify the task matching the request/current working scope. If multiple active tasks remain genuinely ambiguous, do not invent the choice.\n3. Read docs/tasks/<task-id>.md, then the linked docs/plans/<task-id>.md and relevant durable decisions/references.\n4. Reconcile the checkpoint with the actual repository: current branch/revision when available, working tree/diff, relevant source files, and available verification evidence. Repository reality overrides stale notes.\n5. Preserve completed work unless repository evidence shows it must be revisited. Do not create a fresh plan merely because the client/session changed.\n6. Continue from the recorded Next action using the smallest dedicated skill/tool that fits the remaining work.\n7. Resume the normal evidence loop for new work and distinguish new evidence from inherited evidence.\n8. If the task remains long-running, update the checkpoint and ACTIVE.md at a meaningful handoff boundary. If complete, remove or close the active entry as appropriate.\n\nNever require vendor chat history, native plan artifacts, auto memory, or another client's private state when the repository contains sufficient durable handoff state.`,
    true,
  ),
  skill(
    'implement-feature',
    'Implement feature',
    'Implementation',
    '명확한 범위를 작은 실행→관찰→수정→재검증 루프로 구현하고 실제 완료 증거를 확보',
    'Implements a scoped repository change and should be used when the intended behavior and edit scope are sufficiently clear.',
    `1. Resolve applicable AGENTS instructions and re-check the branch/relevant files before writing.\n2. Confirm the acceptance criteria and choose the closest useful verifier for the next slice.\n3. Reuse established components, utilities, data shapes, and styles; avoid unrelated refactors and unauthorized dependencies.\n4. Implement the smallest coherent slice.\n5. Run the closest useful verifier and inspect its actual output.\n6. If it fails, diagnose from that evidence, apply the smallest supported correction, and re-run the failed verifier. Do not repeat an identical action without new information.\n7. After close checks pass, broaden to the repository's applicable build/type/test/lint/runtime/UI checks.\n8. Review the final diff for secrets, temporary artifacts, generated output, stale docs, unrelated files, and needless complexity.\n9. Do not claim completion while required evidence is failed, stale, or unavailable. Report blockers explicitly.\n10. Update durable task state only when another session/agent/client genuinely needs to continue the work.`,
    true,
  ),
  skill(
    'debug',
    'Debug',
    'Quality',
    '재현→관찰→가설→최소 패치→회귀검증을 증거 기반 루프로 반복',
    'Diagnoses reproducible defects and should be used when tracing an observed failure to its root cause.',
    `1. Resolve applicable AGENTS instructions for the failing scope.\n2. Reproduce or precisely characterize the failure and capture the closest useful evidence.\n3. Trace data/control flow to the earliest incorrect assumption and form a falsifiable root-cause hypothesis.\n4. Apply the smallest probe or fix that can test that hypothesis.\n5. Re-run the closest failing check and inspect the output.\n6. If still failing, update the diagnosis from the new evidence before another edit; do not blind-retry the same change.\n7. When the regression passes, broaden verification enough to catch adjacent regressions.\n8. If materially different attempts stop producing progress, re-check environment, assumptions, missing tooling, and scope; report a blocker rather than looping indefinitely.`,
    true,
  ),
  skill(
    'code-review',
    'Code review',
    'Quality',
    '변경 diff의 정확성·보안·회귀·loop evidence·유지보수성을 read-only로 리뷰',
    'Reviews repository diffs and should be used to assess correctness, safety, maintainability, and evidence gaps without changing code by default.',
    `Resolve applicable AGENTS instructions for changed scopes. Review intended behavior and acceptance criteria first, then edge states, destructive/security risk, types, architecture, UI accessibility/responsiveness when relevant, dependency/config changes, verification evidence, documentation accuracy, temporary loop residue, and rollback. Distinguish observed evidence from claims. Report concrete findings; do not manufacture defects or edit code before the review findings are clear.`,
    true,
  ),
  skill(
    'verify-release',
    'Verify release',
    'Release',
    '정확한 revision 기준으로 병합·릴리스·배포 readiness를 별도 gate로 검증',
    'Verifies a release or merge candidate and should be used before decisions that depend on a specific revision being ready.',
    `1. Pin the exact revision or head SHA when version control is available.\n2. Resolve applicable AGENTS instructions for the changed scopes.\n3. Confirm base, changed-file scope, conflicts, and required release criteria.\n4. Re-run required build/type/test/lint and repository-native validation against that revision.\n5. Verify applicable normal, empty, error, responsive, accessibility, integration, and runtime states.\n6. Separate deployment status from browser/runtime verification.\n7. Review diff hygiene and unresolved blockers.\n8. Never treat failed, pending, stale, or unavailable required evidence as passing.`,
    true,
  ),
  skill(
    'capability-router',
    'Capability router',
    'Orchestration',
    '여러 Skill·MCP·내장 도구 선택이 실제로 애매한 복합 작업만 최소 capability set으로 라우팅',
    'Coordinates capabilities when tool or skill choice is ambiguous or multiple capabilities must be combined; do not use it for simple tasks that clearly match one dedicated skill.',
    `Use this skill only when capability selection is genuinely ambiguous or the task needs coordinated use of multiple skills, connected MCP tools, built-in tools, subagents, or external agents. It does not own the normal engineering loop.\n\nDecision map:\n- Same-session continuation with sufficient context -> continue current workflow directly.\n- Resume/handoff requiring durable recovery -> continue-work.\n- Reproducible bug -> debug.\n- Clear scoped implementation -> implement-feature.\n- Broad/risky end-to-end change -> plan-feature, then implementation continues unless a real gate stops it.\n- Plan-only request -> plan-feature and stop.\n- Diff review -> code-review.\n- Merge/release readiness -> verify-release.\n- Browser runtime verification -> browser-qa only when selected and a browser surface/capability exists.\n- Security-sensitive work -> security-review when selected.\n- Independent second opinion -> fresh-context-review when selected.\n\nWhen routing:\n1. Read the task and applicable AGENTS instructions.\n2. Inspect only capabilities actually available in the current client/session; do not perform an exhaustive inventory when the answer is already obvious.\n3. Prefer the smallest sufficient skill/tool set. More tools are not inherently better.\n4. Use a specific MCP, subagent, or external agent only when it is actually available and materially improves the task.\n5. Treat MCP_추천_목록.md, adapters, and empty config skeletons as reference only, never as availability signals.\n6. If no suitable MCP or external agent is available, continue with built-in tools or a safe manual workflow.\n7. Do not install, authenticate, or grant external-service access unless the user explicitly requests it.\n8. For external writes or destructive actions, use the narrowest permission available and respect the client's approval boundary.\n9. Re-evaluate the route only after a material scope/capability change or tool failure; ordinary verifier failures belong to the dedicated skill's evidence loop.\n\nNot every task needs multiple skills, and zero MCP servers is a normal supported state.`,
    true,
  ),
  skill(
    'browser-qa',
    'Browser QA',
    'UI',
    '브라우저 기반 UI에서 실제 관찰→수정→재검증 루프로 반응형·키보드·콘솔·주요 흐름 검증',
    'Verifies rendered browser UI and should be used only when the project has a browser surface and the task needs responsive, accessibility, interaction, or console checks.',
    `Resolve applicable AGENTS instructions. Open the real preview or deployed test surface, exercise the main and relevant empty/error flows, inspect observed behavior, and feed failures back into the implementation loop. Check representative desktop/mobile widths, keyboard navigation, console/network, assets, and MIME errors. Re-run the failed user flow after corrections and record the tested URL/revision when available.`,
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
    `Resolve applicable AGENTS instructions. Identify credentials, PII, privileged APIs, untrusted inputs, destructive operations, and verification gaps. Keep secrets in approved environment or secret stores, prefer least privilege/read-only access, verify authorization separately from authentication, and do not weaken sandbox, approval, or trust controls for convenience.`,
  ),
  skill(
    'fresh-context-review',
    'Fresh-context review',
    'Orchestration',
    '위험한 계획·diff를 독립된 관점에서 한 번 더 검토하고 근거를 조정',
    'Runs a bounded independent review of a plan or diff when a fresh perspective is materially useful; it may use another available agent read-only, but must not assume cross-agent connectivity.',
    `Use this skill for high-risk, unfamiliar, architecturally significant, or pre-release work where an independent second pass is materially useful. Do not use it as a mandatory gate for routine edits or as an inner-loop retry mechanism.\n\n1. Freeze the review target: exact plan, diff, or revision.\n2. Resolve applicable AGENTS instructions for the review scope.\n3. Prefer a fresh context that has not authored the change. If another authorized agent is actually available, request one read-only review pass; otherwise perform an independent self-review and state the limitation.\n4. Ask for concrete counterexamples, hidden assumptions, regression risks, simpler alternatives, and missing verification evidence.\n5. Do not let the reviewer edit code, widen permissions, install tooling, or start an unbounded back-and-forth by default.\n6. Reconcile each material finding against repository evidence. Accept, reject, or defer it with a reason.\n7. If a durable handoff is needed, record only reconciled findings and the next action.\n\nOne bounded review pass is the default. Additional rounds require a clear reason or explicit user request.`,
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
    { path: 'AGENTS.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: '범용 공통 계약·scoped instruction·end-to-end evidence loop·handoff 규칙', content: SHARED_AGENTS_MD },
    { path: 'DESIGN.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: '특정 테마를 강요하지 않는 중립 디자인 계약 starter', content: DESIGN_MD_TEMPLATE },
    { path: 'MCP_추천_목록.md', role: 'documentation', consumers: ['Human', 'AI clients'], description: '자동 연결 없이 MCP 용도와 공식 링크만 제공하는 한글 추천 문서', content: MCP_RECOMMENDATIONS_MD },
    { path: 'CLAUDE.md', role: 'adapter', consumers: ['Claude Code'], description: 'root AGENTS import + nested resolution + loop/handoff semantics를 연결하는 Claude Code 어댑터', content: CLAUDE_MD },
    { path: '.codex/config.toml', role: 'adapter', consumers: ['Codex'], description: 'MCP를 선설정하지 않은 Codex project config 골격', content: CODEX_CONFIG_TOML },
    { path: '.mcp.json', role: 'adapter', consumers: ['Claude Code'], description: '서버가 비어 있는 Claude Code project MCP 골격', content: EMPTY_MCP_JSON },
    { path: '.agents/rules/project-core.md', role: 'adapter', consumers: ['Antigravity'], description: '공통 AGENTS를 중복하지 않고 verification loop를 연결하는 Antigravity thin notes', content: ANTIGRAVITY_PROJECT_CORE },
    { path: '.agents/mcp_config.json', role: 'adapter', consumers: ['Antigravity'], description: '서버가 비어 있는 Antigravity workspace MCP 골격', content: EMPTY_MCP_JSON },
    { path: 'docs/architecture/overview.md', role: 'documentation', consumers: ['All'], description: '실제 저장소 아키텍처 기록 위치', content: '# Architecture\n\nRecord the current system architecture after inspecting the real repository. Keep this descriptive, evidence-based, and distinct from future plans.\n' },
    { path: 'docs/design/README.md', role: 'documentation', consumers: ['All'], description: 'DESIGN.md를 중복하지 않는 구현 상세 문서 위치', content: '# Design implementation notes\n\nDESIGN.md is the canonical design contract after project-specific adaptation. Store component behavior, responsive exceptions, accessibility notes, and implementation details here without copying canonical values into a second source of truth.\n' },
    { path: 'docs/plans/README.md', role: 'documentation', consumers: ['All'], description: '장기 작업의 승인된 구현 intent 보관 위치', content: '# Plans\n\nStore durable approved implementation intent here with task ID, scope, testable acceptance criteria, assumptions, risks, implementation sequence, validation ladder, and rollback. Plans describe what should happen; they are not completion evidence or a mandatory stopping point when execution was requested. Current execution reality belongs in docs/tasks/<task-id>.md only when durability is useful.\n' },
    { path: 'docs/decisions/README.md', role: 'documentation', consumers: ['All'], description: '기술 의사결정 보관 위치', content: '# Decisions\n\nStore durable architecture decisions with context, alternatives, consequences, and date.\n' },
    { path: 'docs/tasks/ACTIVE.md', role: 'documentation', consumers: ['All'], description: '세션·에이전트·클라이언트 간 현재 작업 discovery entry point', content: ACTIVE_TASKS_MD },
    { path: 'docs/tasks/README.md', role: 'documentation', consumers: ['All'], description: 'portable task checkpoint와 resume/handoff protocol', content: TASKS_README },
    { path: 'docs/reference/README.md', role: 'documentation', consumers: ['All'], description: '프로젝트 근거·정책·도메인 자료 보관 위치', content: '# Reference\n\nStore durable project references, external source notes, policies, and domain constraints here. Re-check time-sensitive sources before relying on them.\n' },
    { path: 'docs/ai-harness/README.md', role: 'documentation', consumers: ['All'], description: '범용 하네스·loop engineering·보안·handoff 경계', content: HARNESS_README },
    { path: 'docs/ai-harness/compatibility.md', role: 'documentation', consumers: ['All'], description: '세 도구 호환성·single-client loop·scoped instructions·task resume 표', content: COMPATIBILITY_MD },
    { path: 'docs/ai-harness/behavior-evals.md', role: 'documentation', consumers: ['All'], description: 'end-to-end lifecycle·verification loop·routing·scoping·resume 행동 eval', content: BEHAVIOR_EVALS_MD },
    { path: 'scripts/sync-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'canonical skill을 Claude native path로 안전하게 동기화', content: SYNC_SCRIPT },
    { path: 'scripts/validate-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'skill mirror·빈 MCP config·필수 loop/handoff/Harness 문서를 검증', content: VALIDATE_SCRIPT },
    { path: 'README.ai-harness.md', role: 'documentation', consumers: ['Human'], description: '다운로드 패키지를 새/기존 프로젝트에 적용하는 순서', content: '# AI Harness v2 setup\n\n1. New project: inspect the repository and adapt AGENTS.md before treating it as project-specific truth. Existing project: merge useful sections; do not blindly overwrite established instructions.\n2. Treat the primary workflow as single-client end-to-end engineering: inspect -> plan when needed -> implement -> observe/verify -> correct -> re-verify -> complete. Planning is not a default stopping point.\n3. Use the closest real verifier as feedback and broaden checks as confidence grows. Do not repeat failed actions without new evidence and do not claim success when required verification is unavailable.\n4. Do not stack multiple full Harness/methodology packs blindly. Choose an owner for overlapping rules and add external skills selectively.\n5. Record only real commands, protected paths, generated outputs, deployment boundaries, domain invariants, scoped AGENTS rules, and useful verification mechanisms.\n6. DESIGN.md is intentionally neutral. Populate it only from verified project/design evidence.\n7. Review MCP_추천_목록.md and connect only external tools the project actually needs. Empty config skeletons do not mean an MCP is installed. Preserve and merge existing native config files.\n8. Keep only skills that help the project. continue-work is for durable recovery, not same-session continuation ceremony; capability-router is only for ambiguous or multi-capability work.\n9. For genuinely multi-session or cross-client work, keep intent in docs/plans/<task-id>.md, current reality in docs/tasks/<task-id>.md, and discovery in docs/tasks/ACTIVE.md. Do not persist every loop iteration.\n10. Run node scripts/sync-ai-harness.mjs and node scripts/validate-ai-harness.mjs. Then use docs/ai-harness/behavior-evals.md for representative end-to-end, loop, routing, scoping, and resume checks.\n11. Review each client\'s trust, approval, sandbox, MCP credentials, agent availability, and external write permissions locally.\n' },
  ];

  skills.forEach((item) => {
    files.push({ path: `.agents/skills/${item.id}/SKILL.md`, role: 'canonical', consumers: ['Codex', 'Antigravity'], description: `${item.name} canonical skill`, content: item.content });
    files.push({ path: `.claude/skills/${item.id}/SKILL.md`, role: 'mirror', consumers: ['Claude Code'], description: `${item.name} Claude native mirror`, content: item.content });
  });

  assertUniquePaths(files);
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
