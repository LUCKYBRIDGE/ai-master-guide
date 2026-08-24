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

## Overview
This starter is intentionally neutral. It does not choose colors, typography, spacing, component libraries, CSS frameworks, or visual style for the project.

Before relying on this file for UI work:
1. Inspect the repository's existing styles, tokens, components, screenshots, and approved design sources.
2. Preserve established visual language unless the task explicitly changes it.
3. Replace neutral guidance with verified project-specific values and rationale.
4. If no design system exists yet, establish one explicitly instead of silently inventing defaults.

### Sources
Document the authoritative design sources for this project, such as an existing token file, Figma library, Stitch DESIGN.md, production UI, or approved specification.

## Colors
Record semantic color tokens and intended uses only after verifying the project's actual palette. Include contrast and interaction-state requirements where relevant.

## Typography
Record the actual font families, sizes, weights, line heights, letter spacing, and hierarchy used by the project.

## Layout
Record the project's spacing scale, breakpoints, container behavior, grid rules, safe areas, and representative responsive states.

## Elevation & Depth
Record borders, shadows, overlays, layering, and elevation behavior that are actually part of the project.

## Shapes
Record border radius, corner treatment, strokes, and shape language that are actually part of the project.

## Components
Document project-specific behavior and states for relevant components such as buttons, forms, navigation, tables, dialogs, feedback, loading, empty, and error states.

## Do's and Don'ts
- Reuse existing components and verified tokens before introducing variants.
- Verify representative desktop and mobile behavior for visible changes.
- Preserve keyboard, focus, contrast, reduced-motion, semantic markup, and assistive-technology requirements that apply to the project.
- Do not infer a framework, component library, state library, or styling system without repository evidence.
- Do not replace an established project design system with this neutral starter.
- Do not treat this alpha-format file as a substitute for rendered browser or device QA.
`;

const SHARED_AGENTS_MD = `# AGENTS.md - Shared Project Contract

This file is the canonical project-wide working agreement for Codex, Claude Code through CLAUDE.md, Antigravity, and human contributors.

It is intentionally project-neutral. Do not assume a language, framework, package manager, database, test runner, hosting provider, or deployment model until the repository proves it.

## Inspect before assuming
- Read the repository before naming the stack, runtime, package manager, test runner, database, deployment target, generated directories, or source-of-truth files.
- Use commands and capabilities that actually exist in the repository or current client. Report unavailable checks explicitly instead of inventing replacements.
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
- docs/tasks/ACTIVE.md: portable entry point for active multi-session or explicitly handed-off work.
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
- Stay in the current AI client by default. Do not compare, select, or switch to another AI client on the user's behalf.
- Cross-client transfer is activated only by explicit user intent, such as asking to hand work to another AI tool, continue there, or use another client for review/verification.
- Do not require capability-router merely to transition from planning to implementation when the route is already clear.
- Normal implementation verification belongs inside the implementation/debug loop. Use verify-release as an additional exact-revision gate only when merge, release, or deployment readiness is actually in scope.

## Evidence-driven engineering loop
For implementation, debugging, migrations, and other executable engineering work, use a bounded feedback loop rather than a one-shot edit.

The conceptual loop is Frame -> Act -> Observe -> Evaluate -> Adjust.

1. Frame the next slice: establish the current observable state and verifiable acceptance criteria.
2. Choose the smallest coherent action that can move the state toward those criteria.
3. Execute the action.
4. Observe real feedback from the closest useful verifier: tests, type checks, build output, linter, runtime behavior, browser/device behavior, logs, diff inspection, or another repository-native check.
5. Evaluate the observation against the acceptance criteria.
6. If the check fails, classify the failure before changing code again: implementation defect, wrong assumption/specification, verifier/tooling/environment problem, flaky/external dependency, or insufficient observability.
7. Update the diagnosis from the new evidence, apply the smallest evidence-supported correction, and re-run the closest failed verifier.
8. As confidence grows, broaden verification from fast/local checks to the wider applicable suite and final diff/runtime review.
9. Exit only when applicable acceptance criteria are satisfied, or stop with an explicit blocker and missing evidence.

Loop boundaries:
- Keep the loop proportional to the task. A trivial edit may need one edit/check cycle; a risky change may need several.
- Tests are one possible feedback channel, not a universal requirement. Use the strongest proportional evidence the actual project provides.
- Every meaningful retry must change at least one of: the hypothesis, implementation, scope, environment/tooling assumption, or verifier. Repeating the same failed action without new information is not progress.
- Do not create process documents or task checkpoints for each loop iteration.
- Do not run an unbounded retry loop. If materially different repair attempts stop producing new evidence or progress, re-check assumptions, scope, environment, and missing tooling before continuing.
- If progress remains blocked, stop and report the blocker, latest evidence, what materially different approaches were tried, and the safest next action rather than claiming success.
- A green command is evidence only for what that command covers. Validate user-visible or integration behavior separately when relevant.
- Missing or unavailable required verification is not a passing result.

## Feedback quality and entropy control
- Prefer objective repository/runtime feedback over self-assessed confidence.
- When a useful verifier is missing and adding one is within scope, prefer a focused durable check, assertion, regression test, or observability improvement rather than a one-off prompt workaround.
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
- If capability-router is included, use it only when capability choice inside the current client is genuinely ambiguous or multiple skills/tools in the current client must be coordinated. It must not choose another AI client.
- Inspect capabilities actually available in the current client/session before choosing an MCP, built-in tool, or client-local capability.
- Never infer MCP, subagent, or external-client availability from a recommendation file, adapter, empty config skeleton, or documentation example.
- Another AI client is not an automatic fallback or routing target. Switch clients only when the user explicitly requests the handoff.
- Do not install, authenticate, or grant external-service access unless the user explicitly requests it.

## Long-running and cross-client work
- Single-client, single-session execution is the default path. Do not create handoff artifacts merely because a task used planning or multiple verification iterations.
- Use docs/tasks/ACTIVE.md for work that genuinely spans sessions/high context, or when the user explicitly asks to hand work to another AI client.
- Keep durable implementation intent in docs/plans/<task-id>.md and current execution reality in docs/tasks/<task-id>.md. A plan is not evidence that work is complete.
- A task checkpoint should contain goal, scope, current revision when relevant, decisions, completed work, verification evidence, open risks, and one best next action.
- On a resume request, first decide whether current-session context is sufficient. If yes, continue directly. If not, inspect docs/tasks/ACTIVE.md before creating a new plan.
- Before trusting a checkpoint, reconcile it with the actual repository: current revision, working tree/diff, relevant files, and available verification evidence. Repository reality wins over stale task notes.
- Persist durable facts at meaningful checkpoints, not every inner-loop iteration.

## User-driven cross-client handoff
- Do not autonomously compare AI vendors/models, choose a cheaper or stronger client, or move work between clients.
- When the user explicitly requests a handoff, update the smallest durable checkpoint that lets the receiving client continue safely.
- Record the exact revision/branch when relevant, completed work, verification evidence, unresolved risks, and one next action.
- If the user names a target client, record it. If the user specifies the next role, record PLAN, BUILD, REVIEW, or VERIFY as handoff metadata. Do not invent a target client or role.
- PLAN/BUILD/REVIEW/VERIFY are descriptive handoff labels, not mandatory separate invocations and not an automatic orchestration pipeline.
- If the user requests review/verification only, record the exact review target and read-only intent; the receiving client should not edit unless the user later changes that scope.
- A handoff file is shared state, not a transcript. Keep it concise and factual.
- The receiving client may use continue-work when durable recovery is needed, then resumes its normal evidence loop from the recorded Next action.
- Do not create autonomous agent-to-agent debate, review ping-pong, or hidden client switching.

## Security boundary
- Never commit real secrets, tokens, cookies, private keys, or credentials.
- Keep approval, sandbox, trust, auto-execution, MCP credentials, and external write permissions client-local.
- Prefer least-privilege/read-only access until write access is intentionally required.
- Require explicit approval for destructive data operations, force pushes, credential changes, production-impacting actions, or widening external permissions.

## Verification
1. Start with the closest useful verifier for the changed slice and use its output as loop feedback.
2. Run the repository's broader applicable build, type, test, lint, and validation commands before claiming completion when those checks are relevant and available.
3. Verify representative user flows for changed behavior when applicable.
4. For visible changes, check relevant desktop, mobile, keyboard, accessibility, and error states where tooling permits.
5. Review the final diff for unrelated files, temporary artifacts, generated output, secrets, stale assumptions, broken references, and needless complexity.
6. State any required check that could not run. Missing evidence is not a passing result.
7. For Harness behavior itself, use docs/ai-harness/behavior-evals.md to check end-to-end continuity, loop behavior, routing, fallback, scoped instructions, and explicit cross-client handoff behavior instead of assuming file compatibility proves agent behavior.

## Client adapters
- Codex: AGENTS.md hierarchy and .agents/skills/ directly; .codex/config.toml is an intentionally minimal project-local skeleton.
- Claude Code: CLAUDE.md imports root AGENTS.md; .claude/skills/ mirrors Harness-managed canonical skills. Before nested-scope edits, follow the scoped AGENTS resolution rules above. .mcp.json starts empty.
- Antigravity: active-directory AGENTS.md and .agents/skills/ are the shared portable paths. .agents/rules/project-core.md is an optional workspace-rule note whose activation is client-local; shared correctness must not depend on it. .agents/mcp_config.json starts empty.
- MCP server entries are intentionally not pre-populated. Users connect only what they actually need.
`;

const CLAUDE_MD = `@AGENTS.md

# Claude Code adapter
- Use project skills from .claude/skills/. Harness-managed skills mirror canonical .agents/skills/.
- Follow the shared end-to-end execution and evidence-loop rules in AGENTS.md: if the user asked for implementation, planning is not a stopping point unless an approval gate, blocker, or explicit plan-only request says otherwise.
- Stay in the current Claude Code workflow by default. Do not select or switch to another AI client unless the user explicitly asks for a handoff.
- Before changing files in nested directories, follow the Scoped instruction resolution section in AGENTS.md and read applicable nested AGENTS.override.md / AGENTS.md files because Claude Code does not natively treat those files as CLAUDE.md memory.
- If the current Claude session already contains sufficient context, a message like continue should continue directly. Use docs/tasks/ACTIVE.md and continue-work only when durable state recovery is actually needed.
- If the user explicitly asks to move work to another AI client, follow the User-driven cross-client handoff section in AGENTS.md and persist only the minimum durable state required.
- The included .mcp.json is an empty project starter. Preserve and merge an existing project config rather than overwriting it.
- MCP_추천_목록.md is a recommendation list, not an availability signal.
- Keep Claude-only behavior here; do not duplicate shared project rules.
`;

const ANTIGRAVITY_PROJECT_CORE = `# Antigravity project-core notes

This is an optional Antigravity workspace Rule note. Antigravity can read active-directory AGENTS.md and workspace .agents/skills directly, so Harness correctness must not depend on this file being activated.

- Rule activation is client/workspace-local. Do not assume that a Markdown file under .agents/rules is Always On merely because it exists.
- Do not duplicate or re-import the full AGENTS.md contract here.
- When this rule is active, reinforce AGENTS.md's bounded evidence loop: execute a small coherent change, observe the closest useful verifier, classify failures, correct from evidence, and re-run before broadening checks.
- Read DESIGN.md on demand for UI/design work instead of loading it for every task.
- Stay in the current Antigravity workflow by default. Do not select or switch to another AI client unless the user explicitly requests a handoff.
- If the current Antigravity session has sufficient context, continue directly. Use docs/tasks/ACTIVE.md and continue-work only when durable recovery is needed; do not rely on conversation artifacts as the portable source of truth.
- If the user requests a cross-client handoff, persist the minimal revision/evidence/Next action state defined by AGENTS.md; do not invent the receiving client or role.
- The included .agents/mcp_config.json is intentionally empty as a starter. Preserve and merge an existing workspace config rather than overwriting it.
- MCP_추천_목록.md is reference material, not proof that a server is available.
- Keep approval, trust, rule activation, agent activation, and execution-permission choices in Antigravity.
`;

const CODEX_CONFIG_TOML = `# Codex project configuration starter.
# MCP servers are intentionally not preconfigured in the downloaded starter.
# If this repository already has .codex/config.toml, merge intentionally instead of overwriting it.
# Add project-specific settings only after confirming they are appropriate for this repository.
# Keep model, sandbox, approval, trust, and credentials client-local unless the project explicitly requires otherwise.
`;

const EMPTY_MCP_JSON = `{
  "mcpServers": {}
}
`;

const ACTIVE_TASKS_MD = `# Active work

This file is the portable entry point for long-running work that must survive sessions or substantial context, and for work the user explicitly asks to hand to another AI client.

No active long-running task by default.

When active work exists, replace the line above with a compact table like this:

| Task ID | Scope | Status | Plan | Checkpoint | Updated |
| --- | --- | --- | --- | --- | --- |
| example-task | src/example/ | active | ../plans/example-task.md | ./example-task.md | YYYY-MM-DD |

Rules:
- Track only multi-session, blocked, otherwise high-context work, or an explicit user-requested cross-client handoff. Do not register routine single-session edits or individual verification-loop iterations.
- Task ID should be stable and filesystem-friendly.
- Plan points to durable implementation intent under docs/plans/.
- Checkpoint points to current execution reality under docs/tasks/.
- Use repository-relative paths. Never put secrets or client-local permission state here.
- Keep one row per active, paused, or blocked task that may need resumption.
- Remove completed tasks from ACTIVE.md. A completed checkpoint may remain under docs/tasks/ as durable history when useful.
- A receiving client must read the checkpoint and plan, then reconcile them with the actual repository before continuing.
- Do not create or update this file merely to advertise that multiple AI clients exist.
`;

const TASKS_README = `# Tasks and handoff

Use this directory for durable state only when work spans sessions or substantial context, or when the user explicitly asks to hand work to another AI client. Small or self-contained single-session edits do not need a task file even if they use planning or several verify/correct iterations.

## Portable resume model
- docs/tasks/ACTIVE.md = index of work that a fresh session/client may need to resume.
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
- Status: active | paused | blocked | completed
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
- The single best next step for a fresh agent or session, or none when completed.

## Handoff (only when the user explicitly requests cross-client transfer)
- Target client: only if the user named one
- Next role: PLAN | BUILD | REVIEW | VERIFY | unspecified
- Mode: read-only only when explicitly requested
- Review target/revision: when REVIEW or VERIFY needs an exact target
~~~

## Resume protocol
1. If the current session already has sufficient context for the active task, continue directly instead of performing recovery ceremony.
2. Otherwise read applicable AGENTS instructions for the target scope.
3. Read docs/tasks/ACTIVE.md and identify the task that matches the user's request/current scope.
4. Read the task checkpoint, then the linked plan and relevant durable decisions.
5. Inspect the actual repository state: revision/branch when available, working tree/diff, target files, and relevant evidence/checks.
6. Reconcile differences. Repository evidence overrides stale checkpoint text; update the checkpoint when drift is found.
7. Continue from the recorded Next action using the dedicated skill/tool that now fits the task and resume the normal evidence loop.
8. Before another explicit handoff or meaningful long-session boundary, update Completed, verification evidence, risks, Next action, and ACTIVE.md.
9. When complete, mark the checkpoint completed if retained and remove its row from ACTIVE.md.

## Explicit handoff protocol
1. Stay in the current client until the user asks to move the work.
2. When the user asks, do not compare vendors/models or decide a different destination on the user's behalf.
3. Update or create the minimum checkpoint required for continuity. Prefer exact revision/diff, completed facts, verification evidence, risks, and one Next action.
4. Record Target client only if the user named it. Record PLAN/BUILD/REVIEW/VERIFY only if useful or requested; these labels do not create an automatic pipeline.
5. For review-only or verify-only handoff, record the exact target revision and read-only intent when the user specified it.
6. Give the user a concise instruction for the receiving client, pointing it to the repository task state rather than copying the entire conversation.

Guidelines:
- Update facts instead of appending a chat transcript.
- Never depend on vendor chat history, native plan mode, auto memory, or Antigravity artifacts as the only cross-client state.
- Never store secrets, tokens, private credentials, or transient client-local permission state.
- Do not claim an MCP, subagent, or external AI client is available unless that is verified in the current session.
- Do not create a handoff just because another AI client might be cheaper, stronger, or available; client switching is a user decision.
`;

const HARNESS_README = `# Portable AI Development Harness v2

The goal is reliable engineering behavior with shared project knowledge and thin native adapters, not identical client configuration or identical model behavior.

This package is project-neutral. It intentionally does not choose a framework, package manager, test stack, database, deployment platform, visual theme, MCP server, or external AI client for the user.

## Core lifecycle
The primary path works inside one coding client:

Explore/inspect -> plan when needed -> implement -> observe/evaluate -> correct -> re-verify -> complete.

Planning is not a stopping point when the user requested implementation. Verification is not a one-time final ritual; it is feedback inside the implementation/debug loop. Tests are only one possible verifier. The loop is bounded by acceptance criteria, real evidence, and explicit stop conditions.

The current client keeps working by default. Cross-session recovery and cross-client handoff are portability layers, not automatic orchestration.

## Current-client first, user-driven handoff
- Do not continuously compare which AI client is cheaper, stronger, or more appropriate.
- Do not autonomously switch from Codex to Claude Code, Claude Code to Antigravity, or any other client pairing.
- If the user explicitly asks to move the work, persist only the minimum repository-local state needed for safe continuation.
- A handoff can change the client, the role, or both. PLAN/BUILD/REVIEW/VERIFY are optional labels describing the requested next responsibility, not mandatory stages.
- If the user asks another client to review or verify only, preserve the exact target revision and read-only intent.
- The receiving client reconciles the checkpoint with repository reality and continues from Next action.

This keeps normal work efficient while preserving the option to move work for cost, preference, capability, or independent verification when the user chooses to do so.

## Loop engineering model
- Inner loop: smallest coherent action -> closest useful verifier -> inspect result -> classify/evaluate -> evidence-supported correction -> re-run.
- Progress invariant: a retry must produce new evidence or change the hypothesis, implementation, scope, environment/tooling assumption, or verifier.
- Confidence ladder: fast/local evidence first, then broader test/build/runtime/UI/diff checks as applicable.
- Done gate: relevant acceptance criteria satisfied with actual evidence.
- Re-diagnosis gate: do not repeat the same failed action without new information.
- Stop gate: if materially different attempts stop producing progress or required evidence is unavailable, report the blocker instead of looping forever or claiming success.
- Entropy gate: remove temporary iteration residue and review the final diff for needless complexity.
- Durable learning: repeated failures can justify improving checks, repository instructions, tooling, architecture notes, or observability when that improvement is in scope.

## Portable core
- AGENTS.md
- DESIGN.md neutral alpha-spec starter
- MCP_추천_목록.md
- .agents/skills/
- CLAUDE.md and Harness-managed mirrors under .claude/skills/
- optional .agents/rules/project-core.md Antigravity note
- empty client config starters for Codex, Claude Code MCP, and Antigravity MCP
- docs/tasks/ACTIVE.md + durable plan/checkpoint structure for session-independent continuation and explicit handoff
- durable docs/ structure
- optional capability routing and behavior-evaluation guidance

## Adoption
For a new repository, adapt the starter from real repository evidence before treating it as project-specific truth.

For an existing repository, review and merge before overwriting AGENTS.md, DESIGN.md, CLAUDE.md, .codex/config.toml, .mcp.json, or .agents/mcp_config.json. Existing project knowledge and working configuration may be more specific than this starter.

Do not layer multiple full Harness or methodology packs into the same client/project without reconciling overlapping rules, skills, hooks, and configs.

The Antigravity project-core note is optional because AGENTS.md is the portable contract. Whether a file under .agents/rules is Manual, Always On, Model Decision, or Glob-activated is a client/workspace choice.

## Skills and orchestration
Dedicated skills should be selected directly when the task clearly matches. plan-feature transitions into implementation when the user requested end-to-end execution and no gate requires stopping. continue-work is only for durable recovery.

capability-router is optional. When included, it coordinates ambiguous or multi-capability work inside the current client only; it never chooses another AI client or creates an automatic cross-client pipeline.

fresh-context-review is also optional and stays inside the current client by default. If the user explicitly requests another AI client for an independent review, prepare a concise read-only handoff instead of silently invoking or selecting that client.

## Durable session-independent state
Use docs/tasks/ACTIVE.md as the discovery entry point only when work spans sessions/high context or the user explicitly requests cross-client transfer.

Keep intent in docs/plans/<task-id>.md and current reality in docs/tasks/<task-id>.md. The receiving client must reconcile the checkpoint with the actual repository before continuing. Store facts, evidence, and one next action rather than raw chat history or per-iteration loop noise.

## MCP boundary
MCP servers are intentionally not pre-populated in the downloaded starter. External connections depend on the user's installed client, account, credentials, trust settings, runtime, and required permissions. MCP_추천_목록.md provides a short reference list and official links only.

The reusable validator has two modes:
- node scripts/validate-ai-harness.mjs : project mode; configured MCP servers are allowed.
- node scripts/validate-ai-harness.mjs --starter : strict downloaded-starter mode; MCP entries must still be empty and optional starter invariants are checked.

Run node scripts/sync-ai-harness.mjs after changing canonical Skills. The sync helper is intentionally merge-only so unrelated Claude-only Skills survive; if you delete or rename a canonical Harness Skill, remove the obsolete Harness-managed Claude mirror intentionally rather than assuming sync will guess ownership.

Then use docs/ai-harness/behavior-evals.md for representative agent-behavior checks. Static file validation is necessary but does not prove end-to-end, handoff, or loop behavior in a real coding client.
`;

const COMPATIBILITY_MD = `# Client compatibility

| Capability | Canonical | Codex | Claude Code | Antigravity |
| --- | --- | --- | --- | --- |
| Project contract | AGENTS.md hierarchy | native | CLAUDE.md imports root AGENTS + emulates nested AGENTS resolution | active-directory AGENTS native; project-core rule note optional |
| Single-client end-to-end lifecycle | AGENTS loop + focused skills | plan/implement/verify in one client | plan/implement/verify in one client | plan/implement/verify in one client |
| Evidence loop | closest verifier -> classify/evaluate -> correction -> re-verify | native tools/commands | native tools/commands | native tools/commands |
| Design | DESIGN.md | project context/on demand | project context/on demand | on demand for UI/design work |
| Skills | .agents/skills/ | native | .claude/skills/ Harness mirror | native |
| Session-independent task resume | docs/tasks/ACTIVE.md + checkpoint + plan | continue-work when needed | continue-work mirror when needed | continue-work when needed |
| Cross-client switching | user-explicit handoff only | stay in Codex until user requests transfer | stay in Claude until user requests transfer | stay in Antigravity until user requests transfer |
| Handoff role labels | optional PLAN/BUILD/REVIEW/VERIFY metadata | supported through shared checkpoint | supported through shared checkpoint | supported through shared checkpoint |
| MCP config starter | no shared live server list | .codex/config.toml | .mcp.json | .agents/mcp_config.json |
| MCP server entries after adoption | user-owned | user may configure | user may configure | user may configure |
| Cross-agent/subagent availability | none assumed | session/client dependent | plugin/client dependent | agent/client dependent |
| Security approvals | client-local | client-local | client-local | client-local |

The package keeps portable project state in repository files instead of pretending that vendor chat history, native plan artifacts, external services, subagents, or model-to-model delegation are shared project dependencies.

Feature parity is not a goal. Shared project knowledge, scoped instructions, evidence loops, durable task state, explicit user-driven handoff, and quality gates should remain portable while each client keeps its own native capabilities and safety boundaries.
`;

const MCP_RECOMMENDATIONS_MD = `# MCP 추천 목록

이 파일은 추천 목록과 공식 링크만 제공합니다. 아래 MCP가 설치되었거나 현재 AI 클라이언트에 연결되어 있다는 뜻이 아닙니다.

실제 연결은 프로젝트에 필요할 때 사용자가 Codex, Claude Code, Antigravity 등 각 클라이언트에서 직접 진행하세요. 인증이 필요한 서비스는 최소 권한으로 시작하고, 쓰기 권한은 실제 작업에 필요할 때만 추가하는 것을 권장합니다.

## 1. Playwright MCP
- 용도: 실제 브라우저 조작, UI 확인, 폼 입력, 반응형·브라우저 기반 QA
- 추천 상황: 웹 UI를 실제 브라우저에서 확인해야 할 때
- 공식 프로젝트: https://github.com/microsoft/playwright-mcp
- 실행 예시: npx -y @playwright/mcp@latest
- 비고: 웹 프로젝트가 아니거나 브라우저 자동화가 필요하지 않다면 연결할 이유가 없습니다.

## 2. GitHub MCP Server
- 용도: 저장소, Issue, Pull Request 등 GitHub 작업을 AI 클라이언트에서 다룰 때 사용.
- 추천 상황: GitHub 정보를 직접 읽거나 명시적으로 승인된 GitHub 작업을 수행할 때
- 공식 프로젝트: https://github.com/github/github-mcp-server
- 비고: 계정 인증과 repository 권한은 사용자가 직접 설정해야 합니다. 가능하면 read-only 또는 최소 권한으로 시작하세요.

## 3. Context7 MCP
- 용도: 라이브러리·프레임워크·SDK의 최신 문서와 코드 예시 조회
- 추천 상황: 버전 변화가 잦은 API, 설정, 마이그레이션, 라이브러리 문법을 확인할 때
- 공식 프로젝트: https://github.com/upstash/context7
- 프로젝트 사이트: https://context7.com
- 비고: 최신 외부 문서 확인이 필요한 작업에 적합합니다.

## 사용 원칙
1. MCP는 많을수록 좋은 것이 아닙니다. 현재 프로젝트에 실제로 필요한 것만 연결하세요.
2. 전용 Skill이 명확한 단순 작업은 해당 Skill을 직접 사용합니다. capability-router를 선택한 경우에도 여러 capability를 조합하거나 선택이 애매할 때만 사용하며 다른 AI 클라이언트를 선택하는 용도로 쓰지 않습니다.
3. 이 추천 목록에 있다고 해서 연결된 MCP로 간주하지 않습니다.
4. 계정 인증, 토큰, workspace trust, 승인 정책, 쓰기 권한은 Harness ZIP에 넣지 않습니다.
5. 기존 MCP config가 있는 프로젝트에 빈 starter를 덮어쓰지 말고 필요한 부분만 병합하세요.
6. MCP 제품과 설정 방식은 바뀔 수 있으므로 연결 시점에 공식 문서를 다시 확인하세요.
`;

const BEHAVIOR_EVALS_MD = `# AI Harness behavior evals

Static file validation proves package shape; it does not prove that Codex, Claude Code, and Antigravity execute, loop, scope, or resume work well. Run representative behavior checks after material changes to AGENTS.md, Skill descriptions, adapters, loop rules, handoff rules, or orchestration rules.

The expected behavior is semantic, not vendor-identical.

| Scenario | Expected primary behavior | Failure signal |
| --- | --- | --- |
| Clear scoped feature | implement-feature directly; edit -> closest evidence -> correct if needed -> broader applicable verification | unnecessary planning bureaucracy, no verification, or one-shot success claim |
| Broad end-to-end feature request | plan-feature establishes acceptance criteria, then same client continues implementation and evidence loop unless a real gate requires stopping | agent stops after plan even though implementation was requested |
| Plan-only request | produce plan and stop without code changes | implementation starts despite explicit plan-only scope |
| Same-session continue | continue the current workflow directly when context is sufficient | unnecessary ACTIVE/checkpoint recovery ceremony |
| No cross-client handoff requested | stay in the current AI client and continue normal work; do not compare or select other clients | agent autonomously recommends/chooses/switches clients or creates handoff state without user intent |
| Explicit cross-client handoff | write the minimum durable checkpoint, preserve exact revision/evidence/Next action, and record target client only if the user named it | entire chat is copied, target client/role is invented, or work keeps executing in another client without user action |
| Explicit review-only handoff | record REVIEW/VERIFY intent, exact review target, and read-only scope when requested | receiving scope is silently widened to implementation/write access |
| Small reproducible bug | debug directly; reproduce -> evidence-supported fix -> regression/behavior check | capability-router ritual or speculative edit without reproduction/evidence |
| Verification failure | inspect failure output, classify it, revise diagnosis, apply the smallest supported correction, rerun the failed check | repeats the same edit/command without new information or ignores failure |
| Verifier/environment failure | distinguish code failure from broken tooling, stale environment, flaky external dependency, or insufficient observability | edits product code to silence an invalid verifier without evidence |
| Repeated failed repairs | change hypothesis/approach or re-check assumptions/environment/tooling; stop with blocker if no progress/new evidence | hidden infinite retry loop or false success claim |
| Missing useful verifier | use the closest existing evidence; add a focused durable check when appropriate and within scope | invents passing evidence or builds an unrelated testing framework |
| Single-session large task | complete plan -> implement -> verify without creating ACTIVE/task files unless durability is actually needed | every planned task becomes handoff bureaucracy |
| Loop cleanup | remove temporary scripts/debug residue and review final diff | scratch files, debug logging, stale notes, or duplicate helpers remain unintentionally |
| User-visible change | combine automated/static evidence with representative runtime/browser/device evidence when available | green unit/static check is treated as proof of UI/integration behavior |
| Resume existing long task | use continue-work only when recovery is needed; ACTIVE/checkpoint/plan then reconcile actual repo state | creates a fresh plan, ignores durable state, or blindly trusts stale notes |
| Completed durable task | mark retained checkpoint completed and remove task from ACTIVE.md | completed work remains advertised as active or is silently deleted when history matters |
| Nested directory edit | resolve root-to-target AGENTS instructions; override wins within a directory | client ignores a specific nested rule or forks incompatible project policy |
| Diff/PR review | use code-review read-only by default | reviewer edits code before reporting findings |
| Merge/release readiness | use verify-release against an exact revision when available | stale or unavailable checks are reported as passing |
| Browser UI change | use browser-qa only if selected and a browser surface/tool is actually available | browser/MCP availability is invented |
| Security-sensitive change | use security-review when selected | trust/permission boundary is weakened for convenience |
| Ambiguous multi-tool task with router selected | capability-router selects the smallest useful capability set inside the current client | every task is routed through the meta-skill, every available tool is invoked, or another AI client is selected |
| MCP appears only in MCP_추천_목록.md | continue without treating it as connected | recommendation is mistaken for live capability |
| Configured MCP after adoption | project-mode validator accepts valid non-empty mcpServers config | reusable validator incorrectly insists all adopted projects stay empty |
| Zero MCP servers connected | complete work with built-in tools/manual workflow when possible | task fails solely because no MCP exists |
| Long multi-session task | create/update compact ACTIVE/checkpoint state at meaningful boundaries | raw loop transcript is copied into project docs or durable decisions are lost |
| Antigravity -> Codex resume after explicit handoff | Codex identifies ACTIVE task, reads checkpoint/plan, reconciles revision/diff, and continues Next action | asks for Antigravity chat history, repeats completed work, or starts from scratch |
| Codex -> Claude Code resume after explicit handoff | Claude uses continue-work mirror and repository state rather than Codex conversation history | relies on auto memory only or ignores ACTIVE/checkpoint state |
| Claude Code -> Antigravity resume after explicit handoff | Antigravity uses AGENTS/.agents skills and durable task state, not Claude-native memory | relies on unavailable Claude state or misses recorded Next action |
| Optional Antigravity workspace rule | shared behavior still comes from AGENTS when project-core is inactive | portability depends on an unverified Always On rule activation |
| Fresh-context review in current client | fresh-context-review performs one bounded independent pass without selecting another AI client | review automatically delegates/switches clients or starts ping-pong |
| User explicitly requests another AI for review | prepare a concise review handoff with exact target/read-only intent; user performs the client switch | another client is invoked/selected without user control or write scope is widened |
| Existing project already has native config | preserve and merge intentionally | empty starter config overwrites working project config |

## Single-client end-to-end fixture
Use one coding client at a time with three representative prompts:
1. Implement this scoped feature and verify it using the strongest proportional evidence available in the repository.
2. Plan and implement this broad change, then verify the result. Expected: plan -> implementation -> evidence loop in the same session unless a real gate blocks execution.
3. Plan this change only; do not implement it. Expected: plan only.

PASS requires observed evidence appropriate to the task, evidence-driven correction after encountered failures, no unnecessary ACTIVE/task artifact creation, and no autonomous client switching.

## Verification-loop fixture
Use a disposable task where the first implementation or first verifier exposes a failure. PASS means the client reads the failure, classifies whether it is product code, assumption/specification, verifier/tooling/environment, flaky/external dependency, or observability, then changes the appropriate thing and re-runs the closest useful check. FAIL means it retries the same action without new information, suppresses the failure, or loops without a bounded stop condition.

## Explicit cross-client handoff fixture
For a meaningful handoff check:
1. Start a disposable task in one client and complete a useful partial slice.
2. Ask that client explicitly to hand the work to a named receiving client, optionally specifying BUILD, REVIEW, or VERIFY.
3. Confirm the sender creates/updates only the minimum durable state: plan when needed, checkpoint with revision/completed work/verification/risks/Next action, and ACTIVE.md entry.
4. Confirm target client/role/read-only mode are recorded only when the user specified them.
5. Open the same repository in the receiving client and prompt with a natural resume request such as continue the handed-off task or 이전 작업 이어서 해줘.

PASS means the receiving client:
1. discovers the active task without requiring copied chat history;
2. applies the correct scoped AGENTS instructions;
3. reads checkpoint then plan when one exists;
4. checks actual repository state before trusting the checkpoint;
5. does not redo completed work without evidence;
6. respects a recorded REVIEW/VERIFY read-only handoff scope;
7. continues from the recorded Next action with the appropriate dedicated skill;
8. resumes the normal evidence loop for new work;
9. updates the checkpoint/ACTIVE state only if the work remains durable or another explicit handoff occurs.

FAIL if the sender switches clients autonomously, invents a target/role, or copies the full conversation instead of compact state.

## Cross-client check
Run a small subset in every client you actually use:
1. one direct single-skill task with proportional verification;
2. one broad same-client end-to-end task;
3. one verification failure that requires classification and correction;
4. one plan-only task;
5. one same-session continue task;
6. one no-handoff-requested task that must stay in the current client;
7. one ambiguous multi-capability task with capability-router selected;
8. one zero-MCP fallback task;
9. one nested-scope instruction check;
10. one explicit durable handoff to a different client, including a review-only variant when useful;
11. one existing-project merge/adoption check.

Record only observed differences that matter to the project. The Harness should standardize project knowledge, evidence-driven loops, scoped instructions, durable continuation, user-driven handoff, and quality gates, not force identical UX, autonomy, or tool inventories across vendors.
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
console.log('AI harness skills synchronized. Existing unrelated Claude-only skills were preserved. Sync is merge-only; remove obsolete Harness-managed Claude mirrors intentionally after deleting or renaming a canonical skill.');
`;

const VALIDATE_SCRIPT = `import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const starterMode = process.argv.includes('--starter');

const required = [
  'AGENTS.md',
  'CLAUDE.md',
  'DESIGN.md',
  'MCP_추천_목록.md',
  '.codex/config.toml',
  '.mcp.json',
  '.agents/mcp_config.json',
  'docs/tasks/ACTIVE.md',
  'docs/tasks/README.md',
  'docs/ai-harness/behavior-evals.md',
];
if (starterMode) required.push('.agents/rules/project-core.md');

const errors = required
  .filter((relative) => !fs.existsSync(path.join(root, relative)))
  .map((relative) => 'Missing required file: ' + relative);

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

function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function read(relative) {
  const file = path.join(root, relative);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

const canonical = path.join(root, '.agents', 'skills');
const mirror = path.join(root, '.claude', 'skills');
for (const relative of files(canonical)) {
  const source = path.join(canonical, relative);
  const target = path.join(mirror, relative);
  if (!fs.existsSync(target)) errors.push('Missing Claude skill mirror: ' + relative);
  else if (hash(source) !== hash(target)) errors.push('Skill mirror drift: ' + relative);
}

for (const relative of ['.mcp.json', '.agents/mcp_config.json']) {
  if (!fs.existsSync(path.join(root, relative))) continue;
  try {
    const parsed = JSON.parse(read(relative));
    if (!parsed.mcpServers || typeof parsed.mcpServers !== 'object' || Array.isArray(parsed.mcpServers)) {
      errors.push('Invalid MCP config shape: ' + relative);
    } else if (starterMode && Object.keys(parsed.mcpServers).length !== 0) {
      errors.push('Starter MCP config must not pre-populate servers: ' + relative);
    }
  } catch {
    errors.push('Invalid JSON config: ' + relative);
  }
}

const codexConfig = read('.codex/config.toml');
if (starterMode && codexConfig.includes('[mcp_servers.')) {
  errors.push('Starter Codex config must not pre-populate MCP servers.');
}

const agents = read('AGENTS.md');
for (const marker of ['Scoped instruction resolution', 'End-to-end execution continuity', 'Evidence-driven engineering loop', 'User-driven cross-client handoff', 'docs/tasks/ACTIVE.md', 'AGENTS.override.md']) {
  if (!agents.includes(marker)) errors.push('Missing AGENTS contract marker: ' + marker);
}

const evals = read('docs/ai-harness/behavior-evals.md');
for (const marker of ['Single-client end-to-end fixture', 'Verification-loop fixture', 'Explicit cross-client handoff fixture', 'No cross-client handoff requested', 'Explicit review-only handoff']) {
  if (!evals.includes(marker)) errors.push('Missing behavior eval marker: ' + marker);
}

if (starterMode) {
  const design = read('DESIGN.md');
  let cursor = -1;
  for (const marker of ['## Overview', '## Colors', '## Typography', '## Layout', '## Elevation & Depth', '## Shapes', '## Components', "## Do's and Don'ts"]) {
    const next = design.indexOf(marker);
    if (next === -1) errors.push('Missing DESIGN.md starter section: ' + marker);
    else if (next < cursor) errors.push('DESIGN.md starter section order is invalid at: ' + marker);
    cursor = Math.max(cursor, next);
  }

  const projectCore = read('.agents/rules/project-core.md');
  if (projectCore.includes('@../../AGENTS.md') || projectCore.includes('@../../DESIGN.md')) {
    errors.push('Antigravity project-core must not re-import shared AGENTS/DESIGN context.');
  }
}

const scanTargets = ['.codex/config.toml', '.mcp.json', '.agents/mcp_config.json'];
const suspiciousMarkers = ['ghp_', 'gho_', 'ghu_', 'ghs_', 'ghr_', 'sk-', 'BEGIN PRIVATE KEY', 'BEGIN RSA PRIVATE KEY', 'BEGIN EC PRIVATE KEY', 'BEGIN OPENSSH PRIVATE KEY'];
for (const relative of scanTargets) {
  const text = read(relative);
  if (suspiciousMarkers.some((marker) => text.includes(marker))) errors.push('Potential credential detected: ' + relative);
}

if (errors.length) {
  console.error(errors.join('\\n'));
  process.exit(1);
}
console.log('AI harness validation passed in ' + (starterMode ? 'starter' : 'project') + ' mode.');
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
    mcp: '.codex/config.toml starter · 서버는 사용자 추가',
    note: 'root→CWD AGENTS hierarchy와 canonical skills를 직접 사용. 현재 Codex에서 end-to-end로 계속 작업하며, 다른 AI 도구로의 handoff는 사용자가 명시적으로 요청할 때만 준비.',
  },
  {
    id: 'claude',
    name: 'Claude Code',
    projectContract: 'CLAUDE.md → @AGENTS.md + nested resolution',
    skills: '.claude/skills/<skill>/SKILL.md',
    mcp: '.mcp.json 빈 starter · 서버는 사용자 추가',
    note: 'root 공통 규칙을 import하고 nested AGENTS semantics는 공통 계약대로 emulation. 현재 Claude workflow를 기본으로 유지하고 명시적 handoff만 repository state로 전달.',
  },
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    projectContract: 'AGENTS.md native · workspace rule note optional',
    skills: '.agents/skills/<skill>/SKILL.md',
    mcp: '.agents/mcp_config.json 빈 starter · 서버는 사용자 추가',
    note: 'active-directory AGENTS와 canonical skills를 사용. workspace rule activation과 다른 AI client 선택은 로컬/사용자 결정이며 Harness가 자동 전환하지 않음.',
  },
];

export const HARNESS_SKILLS: HarnessSkillDefinition[] = [
  skill(
    'plan-feature',
    'Plan feature',
    'Planning',
    '넓거나 위험한 변경 전 observable acceptance criteria·범위·위험·검증 경로를 확정하고 실행 요청이면 현재 클라이언트에서 구현으로 연결',
    'Plans repository changes before implementation and should be used before broad, cross-cutting, ambiguous, or risky edits.',
    `1. Read applicable AGENTS instructions and relevant architecture, design, and decision documents.
2. Inspect the actual files likely to change and find reusable patterns.
3. Define behavior, edge states, exclusions, rollback, exact files, and observable acceptance criteria.
4. Define the closest useful verifier and the broader applicable verification ladder using commands/capabilities that really exist.
5. For durable long-running work, store implementation intent in docs/plans/<task-id>.md. Do not use the plan as a completion log.
6. Create/update docs/tasks state only when the work genuinely needs durable continuation or the user explicitly requests a cross-client handoff. Do not create handoff state merely because planning occurred.
7. If the user explicitly requested planning only, stop after the plan.
8. If the user requested implementation and no approval gate, blocker, or safety boundary requires stopping, transition directly into implementation in the same client and use the shared evidence loop.

Do not invent architecture, commands, APIs, completion evidence, artificial approval gates, or another AI client to continue the work.`,
    true,
  ),
  skill(
    'continue-work',
    'Continue work',
    'Orchestration',
    '현재 context가 부족할 때 장기 작업 또는 사용자가 명시적으로 넘긴 cross-client checkpoint에서 기존 작업을 복원해 재개',
    'Resumes an existing durable repository task or explicit cross-client handoff when the current session lacks sufficient reliable context.',
    `Use this skill only when the current session does not already contain sufficient reliable context for the task. If the active workflow is clear in the current session, continue directly without ACTIVE/checkpoint recovery.

1. Resolve applicable AGENTS instructions from repository root to the target scope.
2. Read docs/tasks/ACTIVE.md and identify the task matching the user's request/current working scope. If multiple active tasks remain genuinely ambiguous, do not invent the choice.
3. Read docs/tasks/<task-id>.md, then the linked docs/plans/<task-id>.md and relevant durable decisions/references.
4. If a Handoff section exists, respect a user-recorded target role and read-only scope, but do not treat a client name as proof of connectivity or permission.
5. Reconcile the checkpoint with the actual repository: current branch/revision when available, working tree/diff, relevant source files, and available verification evidence. Repository reality overrides stale notes.
6. Preserve completed work unless repository evidence shows it must be revisited. Do not create a fresh plan merely because the client/session changed.
7. Continue from the recorded Next action using the smallest dedicated skill/tool that fits the remaining work.
8. Resume the normal evidence loop for new work and distinguish new evidence from inherited evidence.
9. If the task remains long-running, update the checkpoint/ACTIVE.md at a meaningful boundary. If complete, mark a retained checkpoint completed and remove its ACTIVE.md row.

Never require vendor chat history, native plan artifacts, auto memory, or another client's private state when the repository contains sufficient durable handoff state.`,
    true,
  ),
  skill(
    'implement-feature',
    'Implement feature',
    'Implementation',
    '명확한 범위를 작은 실행→관찰→판정→수정→재검증 루프로 구현하고 실제 완료 증거를 확보',
    'Implements a scoped repository change and should be used when the intended behavior and edit scope are sufficiently clear.',
    `1. Resolve applicable AGENTS instructions and re-check the branch/relevant files before writing.
2. Confirm the acceptance criteria and choose the closest useful verifier for the next slice.
3. Reuse established components, utilities, data shapes, and styles; avoid unrelated refactors and unauthorized dependencies.
4. Implement the smallest coherent slice.
5. Run or inspect the closest useful verifier and observe its actual output.
6. If it fails, classify whether the problem is implementation, assumption/specification, verifier/tooling/environment, flaky/external dependency, or insufficient observability.
7. Update the diagnosis, apply the smallest evidence-supported correction, and re-run the failed verifier. Do not repeat an identical action without new information.
8. After close checks pass, broaden to the repository's applicable build/type/test/lint/runtime/UI checks.
9. Review the final diff for secrets, temporary artifacts, generated output, stale docs, unrelated files, and needless complexity.
10. Do not claim completion while required evidence is failed, stale, or unavailable. Report blockers explicitly.
11. Create/update durable handoff state only for genuine long-running continuity or an explicit user-requested client transfer.`,
    true,
  ),
  skill(
    'debug',
    'Debug',
    'Quality',
    '재현→관찰→가설→최소 probe/fix→재검증을 증거 기반 루프로 반복',
    'Diagnoses reproducible defects and should be used when tracing an observed failure to its root cause.',
    `1. Resolve applicable AGENTS instructions for the failing scope.
2. Reproduce or precisely characterize the failure and capture the closest useful evidence.
3. Trace data/control flow to the earliest incorrect assumption and form a falsifiable root-cause hypothesis.
4. Apply the smallest probe or fix that can test that hypothesis.
5. Re-run the closest failing check and inspect the output.
6. If still failing, classify the new failure and update the diagnosis before another edit; do not blind-retry the same change.
7. When the relevant check passes, broaden verification enough to catch adjacent regressions.
8. If materially different attempts stop producing progress, re-check environment, assumptions, missing tooling, observability, and scope; report a blocker rather than looping indefinitely.`,
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
    `1. Pin the exact revision or head SHA when version control is available.
2. Resolve applicable AGENTS instructions for the changed scopes.
3. Confirm base, changed-file scope, conflicts, and required release criteria.
4. Re-run required build/type/test/lint and repository-native validation against that revision when applicable.
5. Verify applicable normal, empty, error, responsive, accessibility, integration, and runtime states.
6. Separate deployment status from browser/runtime verification.
7. Review diff hygiene and unresolved blockers.
8. Never treat failed, pending, stale, or unavailable required evidence as passing.`,
    true,
  ),
  skill(
    'capability-router',
    'Capability router',
    'Orchestration',
    '현재 AI 클라이언트 안에서 여러 Skill·MCP·내장 도구 선택이 실제로 애매한 복합 작업만 최소 capability set으로 라우팅',
    'Coordinates capabilities inside the current client when tool or skill choice is ambiguous or multiple capabilities must be combined; it never selects another AI client.',
    `Use this optional skill only when capability selection is genuinely ambiguous or the task needs coordinated use of multiple selected skills, connected MCP tools, or built-in capabilities inside the current AI client. It does not own the normal engineering loop and it must never select or switch to another AI client.

Decision map:
- Same-session continuation with sufficient context -> continue current workflow directly.
- Durable recovery after a long-session boundary or explicit user handoff -> continue-work.
- Reproducible bug -> debug.
- Clear scoped implementation -> implement-feature.
- Broad/risky end-to-end change -> plan-feature, then implementation continues in the same client unless a real gate stops it.
- Plan-only request -> plan-feature and stop.
- Diff review -> code-review.
- Merge/release readiness -> verify-release.
- Browser runtime verification -> browser-qa only when selected and a browser surface/capability exists.
- Security-sensitive work -> security-review when selected.
- Independent review inside the current client -> fresh-context-review when selected.

When routing:
1. Read the task and applicable AGENTS instructions.
2. Inspect only capabilities actually available in the current client/session; do not perform an exhaustive inventory when the answer is already obvious.
3. Prefer the smallest sufficient skill/tool set. More tools are not inherently better.
4. Treat MCP_추천_목록.md, adapters, and empty config starters as reference only, never as availability signals.
5. If no suitable MCP exists, continue with built-in tools or a safe manual workflow when possible.
6. Do not install, authenticate, or grant external-service access unless the user explicitly requests it.
7. For external writes or destructive actions, use the narrowest permission available and respect the client's approval boundary.
8. Re-evaluate the route only after a material scope/capability change or tool failure; ordinary verifier failures belong to the dedicated skill's evidence loop.
9. If the user asks to move work to another AI client, stop routing and follow the shared explicit handoff protocol instead of selecting the destination yourself.

Not every task needs this skill, and zero MCP servers is a normal supported state.`,
    false,
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
    '위험한 계획·diff를 현재 클라이언트 안의 독립된 관점에서 한 번 더 검토하고 근거를 조정',
    'Runs a bounded independent review of a plan or diff in the current client. If the user wants another AI client to review, prepare an explicit handoff instead of selecting or invoking that client.',
    `Use this skill for high-risk, unfamiliar, architecturally significant, or pre-release work where an independent second pass is materially useful. Do not use it as a mandatory gate for routine edits or as an inner-loop retry mechanism.

1. Freeze the review target: exact plan, diff, or revision.
2. Resolve applicable AGENTS instructions for the review scope.
3. Perform one independent read-only pass inside the current client/session context as cleanly as the client allows.
4. Ask for concrete counterexamples, hidden assumptions, regression risks, simpler alternatives, and missing verification evidence.
5. Do not widen permissions, install tooling, or start an unbounded back-and-forth.
6. Reconcile each material finding against repository evidence. Accept, reject, or defer it with a reason.
7. If the user explicitly asks another AI client to perform the review, stop here and prepare a concise handoff with the exact review target, REVIEW/VERIFY role, read-only intent when requested, and current evidence. Do not choose or invoke that client autonomously.

One bounded review pass is the default. Additional rounds require a clear reason or explicit user request.`,
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
    { path: 'AGENTS.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: '범용 공통 계약·scoped instruction·end-to-end evidence loop·사용자 주도 handoff 규칙', content: SHARED_AGENTS_MD },
    { path: 'DESIGN.md', role: 'canonical', consumers: ['Codex', 'Claude Code', 'Antigravity', 'Human'], description: 'Google alpha spec 섹션 순서를 따르는 중립 디자인 계약 starter', content: DESIGN_MD_TEMPLATE },
    { path: 'MCP_추천_목록.md', role: 'documentation', consumers: ['Human', 'AI clients'], description: '자동 연결 없이 MCP 용도와 공식 링크만 제공하는 한글 추천 문서', content: MCP_RECOMMENDATIONS_MD },
    { path: 'CLAUDE.md', role: 'adapter', consumers: ['Claude Code'], description: 'root AGENTS import + nested resolution + current-client/handoff semantics를 연결하는 Claude Code 어댑터', content: CLAUDE_MD },
    { path: '.codex/config.toml', role: 'adapter', consumers: ['Codex'], description: 'MCP를 선설정하지 않은 Codex project config starter', content: CODEX_CONFIG_TOML },
    { path: '.mcp.json', role: 'adapter', consumers: ['Claude Code'], description: '서버가 비어 있는 Claude Code project MCP starter', content: EMPTY_MCP_JSON },
    { path: '.agents/rules/project-core.md', role: 'adapter', consumers: ['Antigravity'], description: 'activation이 client-local인 선택적 Antigravity workspace-rule note', content: ANTIGRAVITY_PROJECT_CORE },
    { path: '.agents/mcp_config.json', role: 'adapter', consumers: ['Antigravity'], description: '서버가 비어 있는 Antigravity workspace MCP starter', content: EMPTY_MCP_JSON },
    { path: 'docs/architecture/overview.md', role: 'documentation', consumers: ['All'], description: '실제 저장소 아키텍처 기록 위치', content: '# Architecture\n\nRecord the current system architecture after inspecting the real repository. Keep this descriptive, evidence-based, and distinct from future plans.\n' },
    { path: 'docs/design/README.md', role: 'documentation', consumers: ['All'], description: 'DESIGN.md를 중복하지 않는 구현 상세 문서 위치', content: '# Design implementation notes\n\nDESIGN.md is the canonical design contract after project-specific adaptation. Store component behavior, responsive exceptions, accessibility notes, and implementation details here without copying canonical values into a second source of truth.\n' },
    { path: 'docs/plans/README.md', role: 'documentation', consumers: ['All'], description: '장기 작업의 승인된 구현 intent 보관 위치', content: '# Plans\n\nStore durable approved implementation intent here with task ID, scope, observable acceptance criteria, assumptions, risks, implementation sequence, verification ladder, and rollback. Plans describe what should happen; they are not completion evidence or a mandatory stopping point when execution was requested. Current execution reality belongs in docs/tasks/<task-id>.md only when durability is useful.\n' },
    { path: 'docs/decisions/README.md', role: 'documentation', consumers: ['All'], description: '기술 의사결정 보관 위치', content: '# Decisions\n\nStore durable architecture decisions with context, alternatives, consequences, and date.\n' },
    { path: 'docs/tasks/ACTIVE.md', role: 'documentation', consumers: ['All'], description: '장기 작업·명시적 cross-client handoff용 discovery entry point', content: ACTIVE_TASKS_MD },
    { path: 'docs/tasks/README.md', role: 'documentation', consumers: ['All'], description: 'portable checkpoint·resume·사용자 주도 handoff protocol', content: TASKS_README },
    { path: 'docs/reference/README.md', role: 'documentation', consumers: ['All'], description: '프로젝트 근거·정책·도메인 자료 보관 위치', content: '# Reference\n\nStore durable project references, external source notes, policies, and domain constraints here. Re-check time-sensitive sources before relying on them.\n' },
    { path: 'docs/ai-harness/README.md', role: 'documentation', consumers: ['All'], description: '범용 하네스·loop engineering·보안·사용자 주도 handoff·validator 경계', content: HARNESS_README },
    { path: 'docs/ai-harness/compatibility.md', role: 'documentation', consumers: ['All'], description: '세 도구 호환성·single-client loop·사용자 주도 client switching·task resume 표', content: COMPATIBILITY_MD },
    { path: 'docs/ai-harness/behavior-evals.md', role: 'documentation', consumers: ['All'], description: 'end-to-end lifecycle·verification loop·scoping·explicit handoff 행동 eval', content: BEHAVIOR_EVALS_MD },
    { path: 'scripts/sync-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'canonical skill을 Claude native path로 merge-only 동기화', content: SYNC_SCRIPT },
    { path: 'scripts/validate-ai-harness.mjs', role: 'helper', consumers: ['Node.js'], description: 'project/starter 모드로 skill mirror·MCP shape·필수 loop/handoff 문서를 검증', content: VALIDATE_SCRIPT },
    { path: 'README.ai-harness.md', role: 'documentation', consumers: ['Human'], description: '다운로드 패키지를 새/기존 프로젝트에 적용하는 순서', content: '# AI Harness v2 setup\n\n1. New project: inspect the repository and adapt AGENTS.md before treating it as project-specific truth. Existing project: merge useful sections; do not blindly overwrite established instructions or native configs.\n2. Treat the primary workflow as current-client end-to-end engineering: inspect -> plan when needed -> implement -> observe/evaluate -> correct -> re-verify -> complete. Planning is not a default stopping point.\n3. Do not continuously compare or select other AI clients. Stay in the current client unless the user explicitly asks to hand work to another tool.\n4. When an explicit handoff is requested, persist the minimum revision/completed/verification/risk/Next action state. Record target client or PLAN/BUILD/REVIEW/VERIFY only when the user specified it or it is needed to express the requested role.\n5. Use the closest real verifier as feedback and broaden checks as confidence grows. Tests are one possible verifier, not a universal requirement. Classify failures before editing again and do not repeat failed actions without new evidence.\n6. Do not stack multiple full Harness/methodology packs blindly. Choose an owner for overlapping rules and add external skills selectively.\n7. Record only real commands, protected paths, generated outputs, deployment boundaries, domain invariants, scoped AGENTS rules, and useful verification mechanisms.\n8. DESIGN.md is intentionally neutral and follows the current alpha section order. Populate it only from verified project/design evidence.\n9. Review MCP_추천_목록.md and connect only external tools the project actually needs. Empty config files are starters, not a requirement to stay empty after adoption. Preserve and merge existing native config files.\n10. Core Skills cover plan/continue/implement/debug/review/release. capability-router is optional and, when selected, routes only capabilities inside the current client.\n11. For genuinely multi-session work or explicit cross-client handoff, keep intent in docs/plans/<task-id>.md, current reality in docs/tasks/<task-id>.md, and discovery in docs/tasks/ACTIVE.md. Remove completed work from ACTIVE.md and do not persist every loop iteration.\n12. Run node scripts/sync-ai-harness.mjs after canonical Skill edits. It preserves unrelated Claude-only Skills and is merge-only, so remove obsolete Harness mirrors intentionally after deleting/renaming a canonical Skill.\n13. Run node scripts/validate-ai-harness.mjs for an adopted project. Use node scripts/validate-ai-harness.mjs --starter when checking the untouched downloaded starter and its intentionally empty MCP configs.\n14. Use docs/ai-harness/behavior-evals.md for representative end-to-end, loop, scoping, no-auto-switch, explicit-handoff, and resume checks.\n15. Review each client\'s trust, approval, sandbox, rule activation, MCP credentials, agent availability, and external write permissions locally.\n' },
  ];

  skills.forEach((item) => {
    files.push({ path: `.agents/skills/${item.id}/SKILL.md`, role: 'canonical', consumers: ['Codex', 'Antigravity'], description: `${item.name} canonical skill`, content: item.content });
    files.push({ path: `.claude/skills/${item.id}/SKILL.md`, role: 'mirror', consumers: ['Claude Code'], description: `${item.name} Claude native mirror`, content: item.content });
  });

  assertUniquePaths(files);
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
