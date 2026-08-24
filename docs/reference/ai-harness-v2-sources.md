# AI Development Harness v2 — compatibility, harness, and loop-engineering sources

## Audit scope

- Verified: 2026-08-24
- Goal: provide a **project-neutral** portable Harness that works well in one coding client and also allows Codex, Claude Code, and Google Antigravity to share durable project instructions, Skills, plans, and execution state across sessions/clients.
- Primary execution model: inspect/explore -> plan when needed -> implement -> observe/evaluate -> correct -> re-verify -> complete.
- Cross-session/cross-client continuation is a portability layer on top of the core single-client lifecycle, not a prerequisite for it.
- Tests are one feedback mechanism, not a universal Harness requirement. The loop uses the strongest proportional evidence actually available in the repository/runtime.

Active website sources:
- `src/components/SystemHarnessEngineeringView.tsx`
- `src/data/aiHarnessV2Data.ts`
- `src/components/DesignPreExtractionView.tsx`

## Architecture rule

The Harness does **not** assume a language, framework, package manager, database, test runner, deployment platform, visual theme, MCP server, subagent, or external AI client.

It uses:
1. a canonical root `AGENTS.md` project contract;
2. explicit root-to-target scoped instruction semantics;
3. a bounded evidence-driven engineering loop embedded in the shared contract and executable Skills;
4. focused lifecycle Skills rather than one giant mandatory orchestration Skill;
5. client-native adapters only where discovery behavior differs;
6. exact Skill mirrors only where the native Skill path differs;
7. `docs/tasks/ACTIVE.md` + plan/checkpoint files only when durable state is actually useful;
8. minimal client config **starters** without pre-populated MCP servers;
9. behavior evals that separate package shape from real agent behavior.

Model choice, trust, sandboxing, auto-approval, credentials, external-service authentication, destructive permissions, MCP connections, Antigravity Rule activation, and external-agent availability remain client-local.

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

Anthropic's current Claude Code best-practices/how-it-works guidance emphasizes giving Claude ways to verify its work and describes an agentic gather-context -> act -> verify -> repeat pattern. Explore/plan/code is useful, but planning is not a mandatory stopping point when execution was requested.

Sources:
- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/how-claude-code-works
- https://docs.anthropic.com/en/docs/claude-code/overview

Harness lesson: the same project contract should support end-to-end work inside a single Claude Code session and should make verification feedback actionable.

### Google Antigravity: establish verification loops

Google Antigravity's best-practices documentation explicitly recommends establishing local verification mechanisms and iterating from their output.

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

### Failure classification

A failed check is not automatically a product-code defect. Before another edit, distinguish among:
- implementation defect;
- wrong assumption/specification;
- verifier/tooling/environment problem;
- flaky or external dependency;
- insufficient observability.

This prevents an agent from modifying correct product code merely to silence a broken verifier.

### Progress invariant

A meaningful retry must produce new evidence or change at least one of:
- hypothesis;
- implementation;
- scope;
- environment/tooling assumption;
- verifier.

Repeating an identical failed action without new information is not a valid loop iteration.

### Proportional evidence

Tests are useful when they exist and cover the changed behavior, but the Harness does not require every repository or task to have tests. Possible feedback includes:
- focused test/regression check;
- type/static validation;
- lint/formatter diagnostics;
- build/compiler output;
- runtime/log behavior;
- browser/device interaction;
- API/integration behavior;
- final diff and repository-state inspection.

The strongest practical evidence depends on the actual repository and task.

### Loop boundaries

- Keep loop effort proportional to risk and scope.
- Do not repeat an identical failed action without new information.
- Do not hide or downgrade failed verification.
- Do not claim success when required evidence is unavailable.
- Do not create `ACTIVE.md`/task-log noise for every loop iteration.
- If materially different attempts stop producing progress, re-check assumptions, environment, scope, verifier quality, and missing tooling.
- If still blocked, report the blocker and safest next action instead of looping indefinitely.

### Entropy control

Repeated agent iteration can leave temporary scripts, debug logs, duplicated helpers, stale task notes, dead code, or workaround complexity. The final loop therefore includes diff/hygiene review and removal of unintended residue.

Repeated failure can also reveal a durable Harness gap. When in scope, the long-term correction may be a focused regression check, clearer repository instruction, stronger observability, reusable helper, or architecture clarification rather than another prompt workaround.

## Single-client lifecycle

The default workflow must work in Codex alone, Claude Code alone, or Antigravity alone.

Examples:
- clear feature: `implement-feature` -> evidence loop -> complete;
- reproducible bug: `debug` -> reproduce/diagnose/fix/re-verify -> complete;
- broad/risky end-to-end request: `plan-feature` -> implementation -> evidence loop -> complete;
- explicit plan-only request: `plan-feature` -> stop;
- merge/release readiness: normal implementation verification plus `verify-release` as an exact-revision gate.

`capability-router` is not required merely to move from plan to implementation.

## Core Skills vs optional Skills

The generated contract directly refers to the following Core Skills, so the website keeps them included as structural parts of Harness v2 rather than presenting them as removable options:
- `plan-feature`
- `continue-work`
- `implement-feature`
- `debug`
- `code-review`
- `verify-release`
- `capability-router`

Optional project-specific Skills remain selectable:
- `browser-qa`
- `git-pr`
- `security-review`
- `fresh-context-review`

This avoids generating an `AGENTS.md`/behavior-eval contract that references a Skill the same package omitted. In the current generator, `defaultSelected` denotes this locked Core set; optional Skills are not selected by default and remain toggleable.

## Durable session-independent state

`continue-work` is for recovery when current-session context is insufficient. It is not a ceremony for every “continue” message.

If the active session already has sufficient reliable context:
- continue the current workflow directly.

If recovery is needed:
- `docs/tasks/ACTIVE.md` = discovery index;
- `docs/plans/<task-id>.md` = durable approved intent;
- `docs/tasks/<task-id>.md` = current execution reality.

Active-index consistency:
- ACTIVE.md contains resumable `active`, `paused`, or `blocked` work;
- a retained checkpoint may use `completed`;
- completed work is removed from ACTIVE.md so it is not advertised as resumable active work.

The receiving session/client reconciles checkpoint claims against actual repository revision, diff, files, and verification evidence before continuing.

## Codex compatibility

### Project instructions

OpenAI documents root-to-working-directory `AGENTS.md` discovery and per-directory precedence including `AGENTS.override.md` before `AGENTS.md`.

Sources:
- https://developers.openai.com/codex/guides/agents-md
- https://learn.chatgpt.com/docs/agent-configuration/agents-md

Harness mapping: root `AGENTS.md` defines the same portable scoped-resolution rule. Codex consumes the hierarchy natively; other clients emulate the shared rule where necessary.

### Skills

Sources:
- https://developers.openai.com/codex/skills
- https://learn.chatgpt.com/docs/build-skills
- https://github.com/openai/skills

Harness mapping: canonical Skill source `.agents/skills/`.

### Project config and MCP

Sources:
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/config-reference

Harness mapping: comment-only `.codex/config.toml` in the downloaded starter; configured project MCP entries are allowed after adoption.

## Claude Code compatibility

### Project instructions

Anthropic documents `CLAUDE.md` project memory and supports importing existing project instructions with `@AGENTS.md`.

Sources:
- https://code.claude.com/docs/en/memory
- https://docs.anthropic.com/en/docs/claude-code/memory

Harness mapping:
- root `CLAUDE.md` imports root `@AGENTS.md`;
- nested AGENTS semantics are explicitly emulated before nested-scope edits;
- same-session continuation proceeds directly when context is sufficient;
- durable recovery uses repository task state instead of requiring Claude conversation memory.

### Skills

Sources:
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://docs.anthropic.com/en/docs/claude-code/slash-commands

Harness mapping: exact Harness-managed mirrors under `.claude/skills/`.

The provided sync helper is intentionally **merge-only** so unrelated Claude-only Skills survive. Consequence: if a canonical Harness Skill is deleted or renamed, an obsolete Harness-managed Claude mirror must be removed intentionally; sync does not guess ownership and delete arbitrary Claude-only content.

### Project MCP

Source:
- https://docs.anthropic.com/en/docs/claude-code/mcp

Harness mapping: valid root `.mcp.json` starter with `"mcpServers": {}`; non-empty valid configuration is permitted after adoption.

## Google Antigravity compatibility

### AGENTS and workspace Rules

Sources:
- https://antigravity.google/docs/cli/gcli-migration/
- https://antigravity.google/docs/ide/rules/
- https://antigravity.google/docs/rules-workflows/

Harness mapping:
- active-directory/root `AGENTS.md` is the portable project contract;
- `.agents/rules/project-core.md` is only an **optional thin workspace Rule note**;
- shared correctness does not depend on that file being active;
- Antigravity Rule activation can be Manual, Always On, Model Decision, or Glob and is therefore client/workspace-local;
- the optional note does not re-import the full AGENTS/DESIGN context;
- DESIGN.md remains on-demand for UI/design work.

This corrects the earlier “bridge” framing. A file merely existing under `.agents/rules` is not proof that it is an Always On bridge.

### Skills

Sources:
- https://antigravity.google/docs/ide/skills/
- https://antigravity.google/docs/skills/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`.

### Workspace MCP

Sources:
- https://antigravity.google/docs/mcp
- https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: valid `.agents/mcp_config.json` starter with `"mcpServers": {}`; users may configure servers after adoption.

## DESIGN.md structural audit

Google's current `design.md` alpha spec defines the recognized Markdown section order:
1. `Overview` (alias: Brand & Style)
2. `Colors`
3. `Typography`
4. `Layout` (alias: Layout & Spacing)
5. `Elevation & Depth` (alias: Elevation)
6. `Shapes`
7. `Components`
8. `Do's and Don'ts`

Sources:
- https://github.com/google-labs-code/design.md
- https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
- https://github.com/google-labs-code/design.md/blob/main/packages/cli/src/linter/spec-config.yaml

Audit correction:
- previous neutral starter headings such as `Status`, `Spacing and layout`, and combined `Shapes and elevation` were understandable prose but not the cleanest alpha-spec starter;
- the generated template now uses the canonical section order above;
- project Sources stay as a subsection under Overview;
- accessibility constraints are preserved in the prose/Do's and Don'ts instead of inventing an extra required canonical section;
- no palette/font/framework values are invented.

Optional official linter:
- `npx @google/design.md lint DESIGN.md`

The package is not added as a dependency to AI Master Guide.

## Validator structural audit

A reusable validator must distinguish an untouched downloaded starter from a real adopted project.

Previous problem:
- the validator required MCP server maps to remain empty forever;
- a user who legitimately configured MCP after adopting the Harness would therefore fail validation.

Corrected modes:
- `node scripts/validate-ai-harness.mjs`
  - project mode;
  - validates required Harness shape, Skill mirrors, MCP JSON shape, contract markers, behavior-eval markers, and credential indicators;
  - valid configured MCP servers are allowed.
- `node scripts/validate-ai-harness.mjs --starter`
  - strict downloaded-starter mode;
  - additionally requires intentionally empty MCP starters;
  - checks DESIGN.md canonical section order;
  - checks the generated Antigravity Rule note does not re-import AGENTS/DESIGN.

This keeps “safe starter defaults” separate from “valid user configuration after adoption.”

## File/folder role audit

Current generated structure intentionally separates roles:

- `AGENTS.md` — canonical project execution contract.
- `CLAUDE.md` — thin Claude import/adapter, not a duplicate contract.
- `DESIGN.md` — canonical visual contract only for design/UI facts.
- `.agents/skills/` — canonical focused Skills for Codex/Antigravity.
- `.claude/skills/` — Claude-native mirrors of Harness-managed Skills.
- `.agents/rules/project-core.md` — optional Antigravity note, never canonical policy.
- `.codex/config.toml`, `.mcp.json`, `.agents/mcp_config.json` — native config starters, not proof of connected MCPs.
- `docs/architecture/` — current architecture description.
- `docs/design/` — supplemental implementation notes; not duplicate design tokens.
- `docs/plans/` — durable future intent only when useful.
- `docs/decisions/` — durable architecture decisions.
- `docs/tasks/ACTIVE.md` — resumable work index only.
- `docs/tasks/<task-id>.md` — current checkpoint reality.
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
- verification failure classification;
- verifier/environment failure vs code failure;
- bounded failure/re-diagnosis behavior;
- no unnecessary handoff artifacts for single-session work;
- cleanup of temporary loop residue;
- completed durable-task ACTIVE cleanup;
- configured MCP acceptance in project-mode validation;
- root-to-target scoped AGENTS resolution;
- zero-MCP fallback;
- optional Antigravity Rule behavior;
- cross-client durable resume in all three directions;
- existing-config merge safety.

Static validation can verify package invariants and the presence of these contracts. Real-client behavior must still be sampled in actual Codex/Claude Code/Antigravity because file compatibility does not mathematically guarantee identical model behavior.

## Generation boundaries

Always generated:
- `AGENTS.md` with project-neutral scoped instructions, end-to-end continuity, bounded evidence loop, security, verification, and handoff rules;
- `CLAUDE.md` thin root import/adapter;
- neutral alpha-spec `DESIGN.md` starter;
- empty client MCP/config starters;
- optional Antigravity workspace Rule note;
- `docs/tasks/ACTIVE.md` + task/handoff guidance;
- `docs/ai-harness/README.md`;
- `docs/ai-harness/compatibility.md`;
- `docs/ai-harness/behavior-evals.md`;
- sync/validation helpers;
- Core focused Skills and their Claude mirrors;
- any user-selected optional Skills and mirrors.

Never generated automatically:
- framework/package-manager/database/deployment assumptions;
- fake build/test/deploy commands;
- arbitrary design tokens;
- live MCP server entries;
- credentials or auth state;
- client trust/sandbox/approval settings;
- Antigravity Rule activation state;
- destructive permissions;
- fictional subagents or external-client connectivity.

## Latest validation evidence boundary

The latest previously executed validation-only run was GitHub Actions run `32721817897` (#18), and it succeeded on the Harness source revision that existed **before** the final Loop/structure static-audit corrections in this pass.

The latest pass deliberately did **not** run another build/browser/ZIP test because the user requested the structural/semantic corrections without requiring another test execution. Therefore:
- the old successful run remains evidence for the earlier revision only;
- it is not presented as proof of the latest head;
- the newest corrections were checked by static source/structure analysis against current official client/spec documentation;
- real client semantic behavior still requires the generated behavior-eval scenarios when stronger empirical evidence is desired.
