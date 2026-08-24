# AI Development Harness v2 — compatibility, harness, and loop-engineering sources

## Audit scope

- Verified: 2026-08-24
- Goal: provide a **project-neutral** portable Harness that works efficiently in one coding client and preserves continuity when the **user explicitly chooses** to continue in another client.
- Primary execution model: `inspect/explore -> plan when needed -> implement -> observe/evaluate -> correct -> re-verify -> complete`.
- Default client policy: **stay in the current AI client**. The Harness does not continuously compare vendors/models, choose a cheaper/stronger client, or switch clients autonomously.
- Cross-session recovery and cross-client handoff are portability layers on top of the core single-client lifecycle, not prerequisites for it.
- PLAN / BUILD / REVIEW / VERIFY may be recorded as handoff role metadata, but they are not mandatory separate invocations or an automatic orchestration pipeline.
- Tests are one feedback mechanism, not a universal Harness requirement. The loop uses the strongest proportional evidence actually available in the repository/runtime.

Active website sources:
- `src/components/SystemHarnessEngineeringView.tsx`
- `src/data/aiHarnessV2Data.ts`
- `src/components/DesignPreExtractionView.tsx`

## Architecture rule

The Harness does **not** assume a language, framework, package manager, database, test runner, deployment platform, visual theme, MCP server, subagent, external AI client, or preferred vendor/model.

It uses:
1. a canonical root `AGENTS.md` project contract;
2. explicit root-to-target scoped instruction semantics;
3. a bounded evidence-driven engineering loop embedded in the shared contract and executable Skills;
4. focused lifecycle Skills rather than one giant mandatory orchestration Skill;
5. client-native adapters only where discovery behavior differs;
6. exact Skill mirrors only where the native Skill path differs;
7. `docs/tasks/ACTIVE.md` + plan/checkpoint files only when durable state is actually useful or the user explicitly requests cross-client handoff;
8. minimal client config **starters** without pre-populated MCP servers;
9. behavior evals that separate package shape from real agent behavior.

Model/client choice, trust, sandboxing, auto-approval, credentials, external-service authentication, destructive permissions, MCP connections, Antigravity Rule activation, and external-agent availability remain user/client-local.

For existing repositories, generated canonical/adapter/config files are **merge candidates**, not blind overwrite instructions.

## Why loop engineering is part of the Harness

### OpenAI: the agent loop is core harness logic

OpenAI's January 23, 2026 article **Unrolling the Codex agent loop** describes the agent loop as the core logic in the Codex harness that orchestrates interaction among the user, model, and tools.

Source:
- https://openai.com/index/unrolling-the-codex-agent-loop/

Harness lesson: reliable behavior does not come from a prompt alone. Tool use, observations, acceptance criteria, corrections, and stop conditions must be legible to the agent.

### OpenAI: Harness Engineering is environment + feedback loops

OpenAI's **Harness Engineering** write-up describes repositories engineered so agents can inspect current state, implement changes, drive the product, collect feedback, and iterate until quality gates are satisfied. Missing capability, guardrails, documentation, tooling, or observability are treated as Harness problems rather than reasons to ask a model to simply “try harder.”

Source:
- https://openai.com/index/harness-engineering/

Harness lessons applied here:
- specifications/acceptance criteria define desired outcomes;
- agents execute against repository/runtime feedback;
- failures feed the next diagnosis instead of triggering blind retries;
- repeated failures can expose a durable Harness gap;
- completion requires evidence rather than self-assessed confidence;
- review/repair loops must be bounded;
- final cleanup matters because repeated iteration can create repository entropy.

### Anthropic Claude Code: verification closes the loop

Anthropic's Claude Code guidance emphasizes giving Claude ways to verify its work and describes an agentic gather-context -> act -> verify -> repeat pattern. Explore/plan/code is useful, but planning is not a mandatory stopping point when execution was requested.

Sources:
- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/how-claude-code-works
- https://docs.anthropic.com/en/docs/claude-code/overview

Harness lesson: the same project contract should support end-to-end work inside a single Claude Code session and make verification feedback actionable.

### Google Antigravity: establish verification loops

Google Antigravity's best-practices documentation recommends establishing local verification mechanisms and iterating from their output.

Source:
- https://antigravity.google/docs/cli/best-practices/

Harness lesson: verification is feedback inside execution, not only a final checklist.

## Loop model used by Harness v2

The Harness deliberately avoids adding a mandatory `engineering-loop` meta-Skill. Loop behavior belongs to the common execution contract and to the focused Skills that actually edit or debug code.

### Conceptual loop

`Frame -> Act -> Observe -> Evaluate -> Adjust`

1. Frame the next slice with current observable state and verifiable acceptance criteria.
2. Choose the smallest coherent action.
3. Execute it.
4. Observe the closest useful feedback.
5. Evaluate the observation against the criteria.
6. Classify failures before editing again.
7. Adjust the hypothesis/implementation/environment/verifier from evidence.
8. Re-run the closest failed verifier.
9. Broaden verification as confidence grows.
10. Complete only when applicable criteria are satisfied, or stop with an explicit blocker.

### Failure classification and progress invariant

A failed check is not automatically a product-code defect. Before another edit, distinguish among:
- implementation defect;
- wrong assumption/specification;
- verifier/tooling/environment problem;
- flaky or external dependency;
- insufficient observability.

A meaningful retry must produce new evidence or change at least one of:
- hypothesis;
- implementation;
- scope;
- environment/tooling assumption;
- verifier.

Repeating an identical failed action without new information is not a valid loop iteration.

### Proportional evidence

Possible feedback includes:
- focused test/regression check;
- type/static validation;
- lint/formatter diagnostics;
- build/compiler output;
- runtime/log behavior;
- browser/device interaction;
- API/integration behavior;
- final diff and repository-state inspection.

The strongest practical evidence depends on the actual repository and task.

### Loop boundaries and entropy control

- Keep effort proportional to risk and scope.
- Do not hide or downgrade failed verification.
- Do not claim success when required evidence is unavailable.
- Do not create `ACTIVE.md`/task-log noise for every loop iteration.
- If materially different attempts stop producing progress, re-check assumptions, environment, scope, verifier quality, and missing tooling.
- If still blocked, report the blocker and safest next action instead of looping indefinitely.
- Remove accidental scratch scripts, debug logging, stale notes, dead code, duplicate helpers, and workaround complexity before completion.

## Current-client-first lifecycle

The default workflow must work in Codex alone, Claude Code alone, or Antigravity alone.

Examples:
- clear feature: `implement-feature` -> evidence loop -> complete;
- reproducible bug: `debug` -> reproduce/diagnose/fix/re-verify -> complete;
- broad/risky end-to-end request: `plan-feature` -> implementation -> evidence loop -> complete;
- explicit plan-only request: `plan-feature` -> stop;
- merge/release readiness: normal implementation verification plus `verify-release` as an exact-revision gate.

The agent should **not** pause to compare Codex vs Claude Code vs Antigravity during ordinary work. It continues in the current client until the user explicitly asks for a transfer.

## User-driven cross-client handoff

Cross-client support is intentionally **passive until requested**.

Trigger examples:
- “이제 Codex로 넘길래.”
- “Claude Code에서 이어서 할 거야.”
- “Antigravity에서는 검증만 할래.”

At that point the sender persists the minimum durable state needed for continuity:
- goal/scope;
- exact branch/revision when relevant;
- completed work;
- verification evidence and checks not run;
- unresolved risks/questions;
- one best Next action.

Optional handoff metadata:
- target client, only if the user named it;
- next role: `PLAN | BUILD | REVIEW | VERIFY`, only when useful/requested;
- read-only mode for review/verification-only transfer;
- exact review target/revision.

These labels are descriptive state, not a scheduler. The Harness does not automatically invoke the receiving AI, compare prices, choose a destination, or start agent-to-agent review loops.

The receiving client uses `continue-work` only when durable recovery is actually needed, reconciles checkpoint claims against repository reality, and then resumes its normal evidence loop.

## Core Skills vs optional Skills

The locked Core set is deliberately small:
- `plan-feature`
- `continue-work`
- `implement-feature`
- `debug`
- `code-review`
- `verify-release`

Optional Skills:
- `capability-router`
- `browser-qa`
- `git-pr`
- `security-review`
- `fresh-context-review`

### Why `capability-router` is optional

A meta-router should not become a tax on every request. Clear tasks go directly to their focused Skill. When selected, `capability-router` only coordinates ambiguous or multi-capability work **inside the current client**. It must not select or switch to another AI client.

### Why `fresh-context-review` is optional

`fresh-context-review` provides one bounded independent read-only pass in the current client. If the user explicitly wants another AI client to review, the Harness prepares a concise review handoff with an exact revision/read-only scope instead of autonomously invoking or selecting another client.

## Durable session-independent state

`continue-work` is for recovery when current-session context is insufficient. It is not a ceremony for every “continue” message.

If the active session already has sufficient reliable context:
- continue the current workflow directly.

If durable recovery or explicit handoff is needed:
- `docs/tasks/ACTIVE.md` = discovery index;
- `docs/plans/<task-id>.md` = durable approved intent;
- `docs/tasks/<task-id>.md` = current execution reality and optional handoff metadata.

Active-index consistency:
- ACTIVE.md contains resumable `active`, `paused`, or `blocked` work;
- a retained checkpoint may use `completed`;
- completed work is removed from ACTIVE.md so it is not advertised as resumable active work.

Repository revision, diff, files, and verification evidence override stale checkpoint text.

## Codex compatibility

### Project instructions

OpenAI documents root-to-working-directory `AGENTS.md` discovery and per-directory precedence including `AGENTS.override.md` before `AGENTS.md`.

Sources:
- https://developers.openai.com/codex/guides/agents-md
- https://learn.chatgpt.com/docs/agent-configuration/agents-md

Harness mapping: root `AGENTS.md` defines the portable scoped-resolution rule; Codex consumes the hierarchy natively.

### Skills and project config

Sources:
- https://developers.openai.com/codex/skills
- https://learn.chatgpt.com/docs/build-skills
- https://github.com/openai/skills
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/config-reference

Harness mapping: canonical Skill source `.agents/skills/`; comment-only `.codex/config.toml` starter with no pre-populated MCP servers.

## Claude Code compatibility

### Project instructions

Anthropic documents `CLAUDE.md` project memory and importing existing project instructions with `@AGENTS.md`.

Sources:
- https://code.claude.com/docs/en/memory
- https://docs.anthropic.com/en/docs/claude-code/memory

Harness mapping:
- root `CLAUDE.md` imports root `@AGENTS.md`;
- nested AGENTS semantics are explicitly emulated before nested-scope edits;
- same-session continuation proceeds directly when context is sufficient;
- explicit transfer uses repository task state rather than requiring Claude conversation memory.

### Skills and MCP

Sources:
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://docs.anthropic.com/en/docs/claude-code/slash-commands
- https://docs.anthropic.com/en/docs/claude-code/mcp

Harness mapping: exact Harness-managed mirrors under `.claude/skills/`; valid root `.mcp.json` starter with `"mcpServers": {}`. The sync helper remains merge-only so unrelated Claude-only Skills survive.

## Google Antigravity compatibility

### AGENTS and workspace Rules

Sources:
- https://antigravity.google/docs/cli/gcli-migration/
- https://antigravity.google/docs/ide/rules/
- https://antigravity.google/docs/rules-workflows/

Harness mapping:
- active-directory/root `AGENTS.md` is the portable project contract;
- `.agents/rules/project-core.md` is only an optional thin workspace Rule note;
- shared correctness does not depend on that file being active;
- Antigravity Rule activation remains client/workspace-local;
- DESIGN.md remains on-demand for UI/design work.

### Skills and workspace MCP

Sources:
- https://antigravity.google/docs/ide/skills/
- https://antigravity.google/docs/skills/
- https://antigravity.google/docs/mcp
- https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`; `.agents/mcp_config.json` starts with `"mcpServers": {}` and may be configured by the user after adoption.

## DESIGN.md structural audit

Google's current `design.md` alpha spec defines the recognized Markdown section order:
1. `Overview`
2. `Colors`
3. `Typography`
4. `Layout`
5. `Elevation & Depth`
6. `Shapes`
7. `Components`
8. `Do's and Don'ts`

Sources:
- https://github.com/google-labs-code/design.md
- https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
- https://github.com/google-labs-code/design.md/blob/main/packages/cli/src/linter/spec-config.yaml

The generated template uses this section order, keeps Sources under Overview, preserves accessibility guidance in prose, and invents no palette/font/framework values.

Optional official linter:
- `npx @google/design.md lint DESIGN.md`

The package is not added as a dependency to AI Master Guide.

## Validator structural audit

Two modes are intentionally separated:
- `node scripts/validate-ai-harness.mjs`
  - adopted-project mode;
  - validates required Harness shape, Skill mirrors, MCP JSON shape, contract markers, behavior-eval markers, and credential indicators;
  - valid configured MCP servers are allowed.
- `node scripts/validate-ai-harness.mjs --starter`
  - untouched-starter mode;
  - additionally requires empty MCP starters;
  - checks DESIGN.md canonical section order;
  - checks the Antigravity Rule note does not re-import AGENTS/DESIGN.

Current contract markers include `User-driven cross-client handoff`. Behavior-eval markers include the single-client fixture, verification-loop fixture, no-auto-switch scenario, explicit handoff fixture, and explicit review-only handoff.

## File/folder role audit

- `AGENTS.md` — canonical project execution contract.
- `CLAUDE.md` — thin Claude import/adapter, not a duplicate contract.
- `DESIGN.md` — canonical visual contract only for design/UI facts.
- `.agents/skills/` — canonical focused Skills for Codex/Antigravity.
- `.claude/skills/` — Claude-native mirrors of Harness-managed Skills.
- `.agents/rules/project-core.md` — optional Antigravity note, never canonical policy.
- `.codex/config.toml`, `.mcp.json`, `.agents/mcp_config.json` — native config starters, not proof of connected MCPs.
- `docs/architecture/` — current architecture description.
- `docs/design/` — supplemental implementation notes.
- `docs/plans/` — durable future intent only when useful.
- `docs/decisions/` — durable architecture decisions.
- `docs/tasks/ACTIVE.md` — resumable work/explicit handoff index only.
- `docs/tasks/<task-id>.md` — current checkpoint reality and optional handoff metadata.
- `docs/reference/` — durable source/reference notes.
- `docs/ai-harness/` — Harness-specific compatibility/behavior guidance.
- `scripts/sync-ai-harness.mjs` — merge-only Skill mirror helper.
- `scripts/validate-ai-harness.mjs` — project/starter structural validator.

No generated folder is intended to become a second project-wide rule source.

## MCP recommendation document

The generated root `MCP_추천_목록.md` is a human-readable reference, not an install manifest or availability signal.

Recommended references:
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- GitHub MCP Server: https://github.com/github/github-mcp-server
- Context7 MCP: https://github.com/upstash/context7

Authentication, credentials, workspace trust, approval, sandbox, and write permissions remain user/client-owned.

## Behavior evals

Generated `docs/ai-harness/behavior-evals.md` covers:
- clear single-client feature implementation;
- broad plan -> implement -> verify continuity;
- explicit plan-only behavior;
- same-session continuation without unnecessary durable recovery;
- **no cross-client handoff requested -> stay in current client**;
- explicit cross-client handoff -> compact repository state only;
- explicit review/verify-only handoff -> exact revision/read-only scope;
- verification failure classification;
- verifier/environment failure vs code failure;
- bounded failure/re-diagnosis behavior;
- no unnecessary handoff artifacts for single-session work;
- cleanup of temporary loop residue;
- root-to-target scoped AGENTS resolution;
- optional current-client capability-router behavior;
- zero-MCP fallback;
- optional Antigravity Rule behavior;
- three receiving-client resume directions after explicit user handoff;
- existing-config merge safety.

Static validation can verify package invariants and the presence of these contracts. Real-client behavior must still be sampled in actual Codex/Claude Code/Antigravity because file compatibility and CI do not mathematically guarantee identical model behavior.

## Generation boundaries

Always generated:
- `AGENTS.md` with project-neutral scoped instructions, end-to-end continuity, bounded evidence loop, security, verification, and user-driven handoff rules;
- `CLAUDE.md` thin root import/adapter;
- neutral alpha-spec `DESIGN.md` starter;
- empty client MCP/config starters;
- optional Antigravity workspace Rule note;
- `docs/tasks/ACTIVE.md` + task/handoff guidance;
- `docs/ai-harness/README.md`;
- `docs/ai-harness/compatibility.md`;
- `docs/ai-harness/behavior-evals.md`;
- sync/validation helpers;
- six Core focused Skills and their Claude mirrors;
- any user-selected optional Skills and mirrors.

Never generated or decided automatically:
- framework/package-manager/database/deployment assumptions;
- fake build/test/deploy commands;
- arbitrary design tokens;
- live MCP server entries;
- credentials or auth state;
- client trust/sandbox/approval settings;
- Antigravity Rule activation state;
- destructive permissions;
- external-client connectivity;
- which AI client should plan/build/review/verify;
- price/performance-based AI switching.

## Validation evidence boundary

The previous validation-only run `32721817897` (#18) succeeded on an earlier Harness revision. It is **not** evidence for the current user-driven-handoff revision.

A new validation-only run must succeed against the final source head before this pass is described as fully validated. Until then, the current changes are source-level architecture updates only.

Real Codex/Claude Code/Antigravity semantic behavior remains a separate empirical behavior-eval concern even after CI/build/browser/ZIP validation passes.
