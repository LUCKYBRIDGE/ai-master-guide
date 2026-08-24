# AI Development Harness v2 — compatibility, harness, and loop-engineering sources

## Audit scope

- Verified: 2026-08-24
- Goal: provide a **project-neutral** portable Harness that works well in one coding client and also allows Codex, Claude Code, and Google Antigravity to share durable project instructions, Skills, plans, and execution state across sessions/clients.
- Core execution model: inspect/explore -> plan when needed -> implement -> observe/verify -> correct -> re-verify -> complete.
- Cross-client continuation is a portability layer on top of the core single-client lifecycle, not a prerequisite for it.

Active website sources:
- `src/components/SystemHarnessEngineeringView.tsx`
- `src/data/aiHarnessV2Data.ts`
- `src/components/DesignPreExtractionView.tsx`

## Architecture rule

The Harness does **not** assume a language, framework, package manager, database, test runner, deployment platform, visual theme, MCP server, subagent, or external AI client.

It uses:
1. a thin canonical `AGENTS.md` project contract;
2. explicit root-to-target scoped instruction semantics;
3. a bounded evidence-driven engineering loop embedded in the shared contract and executable Skills;
4. focused lifecycle Skills rather than one giant mandatory orchestration Skill;
5. client-native adapters only where discovery behavior differs;
6. exact Skill mirrors only where the native Skill path differs;
7. `docs/tasks/ACTIVE.md` + plan/checkpoint files only when durable state is actually useful;
8. minimal client config skeletons without pre-populated MCP servers;
9. behavior evals that separate package shape from real agent behavior.

Model choice, trust, sandboxing, auto-approval, credentials, external-service authentication, destructive permissions, MCP connections, and external-agent availability remain client-local.

For existing repositories, generated canonical/adapter/config files are **merge candidates**, not blind overwrite instructions.

## Why loop engineering is part of the Harness

### OpenAI: the agent loop is core harness logic

OpenAI's January 23, 2026 article **Unrolling the Codex agent loop** describes the agent loop as the core logic in the Codex harness that orchestrates interaction among the user, model, and tools.

Source:
- https://openai.com/index/unrolling-the-codex-agent-loop/

Harness lesson: reliable behavior does not come from a prompt alone. The shared project contract should make tool use, observation, verification, and correction legible to the agent.

### OpenAI: Harness Engineering is environment + feedback loops

OpenAI's Harness Engineering write-up describes a repository engineered so agents can validate current state, implement changes, drive the product, collect review feedback, and iterate until quality gates are satisfied. It explicitly frames missing capability, guardrails, documentation, tools, and observability as Harness problems rather than reasons to ask the model to simply “try harder.”

Source:
- https://openai.com/index/harness-engineering/

Harness lessons applied here:
- humans/specifications define intent and acceptance criteria;
- agents execute against repository-native feedback;
- failures should feed back into code, tests, instructions, tooling, or architecture where appropriate;
- completion requires evidence rather than self-assessed confidence;
- review/repair loops must be bounded and should not become uncontrolled agent ping-pong;
- final cleanup matters because repeated agent iteration can create repository entropy.

### Google Antigravity: establish verification loops

Google Antigravity's current best-practices documentation calls local verification mechanisms such as tests, build commands, and formatting scripts the most effective way to ensure reliable autonomous modifications. It recommends running the local verifier after implementation and iterating automatically from the test output.

Source:
- https://antigravity.google/docs/cli/best-practices/

Harness lesson: verification is not merely a final checklist. The output of the closest useful verifier is feedback for the next action.

### Anthropic Claude Code: plan, code, verify

Anthropic's Claude Code documentation describes Claude Code as able to build from a description by planning changes, writing code, and verifying that the result works. Common-task guidance also explicitly supports running tests and fixing failures.

Sources:
- https://docs.anthropic.com/en/docs/claude-code/overview
- https://docs.anthropic.com/en/docs/claude-code/common-tasks

Harness lesson: the portable contract should preserve this end-to-end lifecycle rather than turning planning into a mandatory stopping point.

## Loop model used by Harness v2

The Harness deliberately avoids adding a mandatory `engineering-loop` meta-Skill. Loop behavior belongs to the common execution contract and to the Skills that actually edit/debug code.

### Inner evidence loop

1. Establish current observable state and testable acceptance criteria.
2. Choose the smallest coherent action.
3. Execute it.
4. Run the closest useful repository/runtime verifier.
5. Inspect actual output.
6. Compare output with the acceptance criteria.
7. If failing, update the diagnosis from the new evidence.
8. Apply the smallest evidence-supported correction.
9. Re-run the closest failed verifier.
10. Broaden verification as confidence grows.

### Loop boundaries

- Do not repeat an identical failed action without new information.
- Do not hide or downgrade failed verification.
- Do not claim success when required evidence is unavailable.
- Do not create `ACTIVE.md`/task-log noise for every loop iteration.
- If materially different attempts stop producing progress, re-check assumptions, environment, scope, and missing tooling.
- If still blocked, report the blocker and safest next action instead of looping indefinitely.

### Confidence ladder

Use the cheapest/closest meaningful feedback first, then broaden as applicable:

1. targeted unit/regression check;
2. type/lint/static validation;
3. related test subset;
4. broader suite/build;
5. runtime/integration/browser/device behavior;
6. final diff, documentation, temporary-artifact, and complexity review.

Not every project has every layer. The Harness records only mechanisms that actually exist in the repository.

### Entropy control

Repeated agent iteration can leave temporary scripts, debug logs, duplicated helpers, stale task notes, dead code, or workaround complexity. The final loop therefore includes diff/hygiene review and removal of unintended residue.

Repeated failure can also reveal a durable Harness gap. When in scope, a better long-term correction may be a regression test, clearer repository instruction, stronger observability, a reusable helper, or an architecture clarification rather than another prompt workaround.

## Single-client lifecycle

The default workflow must work in Codex alone, Claude Code alone, or Antigravity alone.

Examples:
- clear feature: `implement-feature` -> evidence loop -> complete;
- reproducible bug: `debug` -> reproduce/diagnose/fix/re-verify -> complete;
- broad/risky end-to-end request: `plan-feature` -> implementation -> evidence loop -> complete;
- explicit plan-only request: `plan-feature` -> stop;
- merge/release readiness: normal implementation verification plus `verify-release` as an exact-revision gate.

`capability-router` is not required merely to move from plan to implementation.

## Durable session-independent state

`continue-work` is for recovery when current-session context is insufficient. It is not a ceremony for every “continue” message.

If the active session already has sufficient reliable context:
- continue the current workflow directly.

If recovery is needed:
- `docs/tasks/ACTIVE.md` = discovery index;
- `docs/plans/<task-id>.md` = durable approved intent;
- `docs/tasks/<task-id>.md` = current execution reality.

The receiving session/client reconciles checkpoint claims against actual repository revision, diff, files, and verification evidence before continuing.

## Codex compatibility

### Project instructions

OpenAI documents exact `AGENTS.md` resolution behavior:
- project scope begins at the project root, typically the Git root;
- Codex walks down toward the current working directory;
- each directory prefers `AGENTS.override.md`, then `AGENTS.md`, then configured fallback names;
- at most one project instruction file is included per directory;
- more-specific instructions are loaded later and therefore override broader project guidance.

Sources:
- https://developers.openai.com/codex/guides/agents-md
- https://learn.chatgpt.com/docs/agent-configuration/agents-md

Harness mapping: root `AGENTS.md` defines the same portable scoped-resolution rule. Codex consumes it natively; other clients emulate it where necessary.

### Skills

OpenAI documents repository Skill discovery through `.agents/skills` locations from the working directory toward repository root.

Sources:
- https://developers.openai.com/codex/skills
- https://learn.chatgpt.com/docs/build-skills
- https://github.com/openai/skills

Harness mapping: canonical Skill source `.agents/skills/`.

### Project config and MCP

Sources:
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/config-reference

Harness mapping: comment-only `.codex/config.toml`; no pre-populated MCP/model/sandbox/approval/trust/credential values.

## Claude Code compatibility

### Project instructions

Anthropic documents `CLAUDE.md` project memory and supports importing existing project instructions with `@AGENTS.md`.

Sources:
- https://docs.anthropic.com/en/docs/claude-code/memory
- https://code.claude.com/docs/en/memory

Harness mapping:
- root `CLAUDE.md` imports root `@AGENTS.md`;
- nested AGENTS semantics are explicitly emulated before nested-scope edits;
- same-session continuation proceeds directly when context is sufficient;
- durable recovery uses repository task state instead of requiring Claude conversation memory.

### Skills

Sources:
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://docs.anthropic.com/en/docs/claude-code/slash-commands

Harness mapping: exact Harness-managed mirrors under `.claude/skills/`; unrelated Claude-only Skills are preserved by the sync helper.

### Project MCP

Source:
- https://docs.anthropic.com/en/docs/claude-code/mcp

Harness mapping: valid empty root `.mcp.json` with `"mcpServers": {}`.

## Google Antigravity compatibility

### AGENTS and workspace rules

Sources:
- https://antigravity.google/docs/cli/gcli-migration/
- https://antigravity.google/docs/ide/rules/
- https://antigravity.google/docs/rules-workflows/

Harness mapping:
- active-directory/root `AGENTS.md` is the portable project contract;
- `.agents/rules/project-core.md` contains only thin Antigravity-specific notes;
- it does not re-import the full AGENTS/DESIGN context;
- it explicitly reinforces the evidence loop using Antigravity's local verification capability;
- DESIGN.md remains on-demand for design/UI work.

### Skills

Sources:
- https://antigravity.google/docs/ide/skills/
- https://antigravity.google/docs/skills/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`.

### Workspace MCP

Sources:
- https://antigravity.google/docs/mcp
- https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: valid empty `.agents/mcp_config.json` with `"mcpServers": {}`.

## Skill orchestration

### Dedicated Skills first

- clear scoped implementation -> `implement-feature`
- reproducible bug -> `debug`
- broad/risky work -> `plan-feature`, then continue into implementation if execution was requested
- explicit plan-only request -> `plan-feature` and stop
- recovery from durable state -> `continue-work` only when recovery is actually needed
- diff review -> `code-review`
- merge/release readiness -> `verify-release`

### capability-router

`capability-router` remains lightweight and is not the owner of the normal engineering loop. Use it only when capability selection is genuinely ambiguous or several capabilities must be coordinated.

Zero MCP servers is a normal supported state.

### fresh-context-review

`fresh-context-review` is optional and bounded. It is useful for high-risk plans/diffs but is not an inner-loop retry mechanism. A second agent is used only when actually available and should default to a read-only pass.

## Behavior evals

Generated `docs/ai-harness/behavior-evals.md` includes separate fixtures for:
- clear single-client feature implementation;
- broad plan -> implement -> verify continuity;
- explicit plan-only behavior;
- same-session continuation without unnecessary durable recovery;
- intentionally failing verification-loop behavior;
- bounded failure/re-diagnosis behavior;
- no unnecessary handoff artifacts for single-session work;
- cleanup of temporary loop residue;
- root-to-target scoped AGENTS resolution;
- zero-MCP fallback;
- cross-client durable resume in all three directions;
- existing-config merge safety.

Static validation confirms package invariants and presence of these loop contracts. Real-client behavior must still be sampled in the actual Codex/Claude Code/Antigravity clients because file compatibility does not mathematically guarantee model behavior.

## DESIGN.md

Sources:
- https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
- https://github.com/google-labs-code/design.md
- https://github.com/google-labs-code/design.md/blob/main/docs/spec.md

Harness mapping:
- root `DESIGN.md` is a neutral alpha-format starter;
- no color/font/spacing/framework/theme is preselected;
- project-specific values come only from verified project/design evidence;
- `docs/design/` remains supplemental implementation documentation.

## MCP recommendation document

The generated root `MCP_추천_목록.md` is a human-readable reference, not an install manifest.

Recommended references:
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- GitHub MCP Server: https://github.com/github/github-mcp-server
- Context7 MCP: https://github.com/upstash/context7

Authentication, credentials, workspace trust, approval, sandbox, and write permissions remain user/client-owned.

## Generation boundaries

Always generated:
- `AGENTS.md` with project-neutral scoped instructions, end-to-end continuity, bounded evidence loop, security, verification, and handoff rules;
- `CLAUDE.md` thin root import/adapter;
- neutral `DESIGN.md`;
- empty client MCP/config skeletons;
- `docs/tasks/ACTIVE.md` + task/handoff guidance;
- `docs/ai-harness/README.md`;
- `docs/ai-harness/compatibility.md`;
- `docs/ai-harness/behavior-evals.md`;
- sync/validation helpers;
- selected focused Skills and Claude mirrors.

Never generated automatically:
- framework/package-manager/database/deployment assumptions;
- fake build/test/deploy commands;
- arbitrary design tokens;
- live MCP server entries;
- credentials or auth state;
- client trust/sandbox/approval settings;
- destructive permissions;
- fictional subagents or external-client connectivity.
