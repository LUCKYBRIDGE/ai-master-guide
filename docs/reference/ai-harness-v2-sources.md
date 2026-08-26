# AI Development Harness v2 — compatibility and engineering audit

## Audit scope

- Verified: 2026-08-26
- Goal: a **project-neutral** Harness that is efficient in one coding client and portable when the **user explicitly chooses** to continue in another.
- Default lifecycle: `inspect/explore -> plan when needed -> implement -> observe/evaluate -> correct -> re-verify -> complete`.
- Default client policy: **stay in the current AI client**. The Harness does not continuously compare vendors/models, optimize model cost, choose another client, or switch clients autonomously.
- Cross-session recovery and cross-client handoff are portability layers, not mandatory orchestration.
- `PLAN | BUILD | REVIEW | VERIFY` are optional handoff role labels, not mandatory separate agent invocations.
- Tests are one feedback channel among build/type/lint/runtime/browser/log/diff evidence.

Active website sources:
- `src/components/SystemHarnessEngineeringView.tsx`
- `src/data/aiHarnessV2Data.ts`
- `src/components/DesignPreExtractionView.tsx`

## Architecture

Harness v2 separates **portable project semantics** from **client-local capability**.

Portable repository state:
1. `AGENTS.md` — canonical shared execution contract.
2. `DESIGN.md` — neutral design-system starter until populated from real project evidence.
3. `.agents/skills/` — canonical focused Skills.
4. `.claude/skills/` — exact Harness-managed mirrors where Claude needs a native path.
5. `docs/plans/` — durable intent when useful.
6. `docs/tasks/ACTIVE.md` + `docs/tasks/<task-id>.md` — durable execution state when recovery or an explicit handoff is needed.
7. `docs/ai-harness/behavior-evals.md` — semantic behavior acceptance scenarios.
8. empty/minimal native MCP/config starters.
9. generated sync, validation, and read-only adoption-audit helpers.

Client/user-local state:
- model/client choice;
- vendor chat history and native plan artifacts;
- account authentication and credentials;
- trust/sandbox/approval settings;
- MCP connectivity and permissions;
- subagent/external-agent availability;
- Antigravity Rule activation;
- destructive/external write permissions.

The Harness does not assume a language, framework, package manager, database, test runner, deployment platform, visual theme, MCP server, subagent, or preferred AI vendor.

## Engineering loop

### Sources

OpenAI:
- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://openai.com/index/harness-engineering/

Anthropic:
- https://code.claude.com/docs/en/best-practices
- https://code.claude.com/docs/en/how-claude-code-works
- https://docs.anthropic.com/en/docs/claude-code/overview

Google Antigravity:
- https://antigravity.google/docs/cli/best-practices/

### Harness mapping

The common loop is `Frame -> Act -> Observe -> Evaluate -> Adjust`.

Rules:
- frame the next slice with observable acceptance criteria;
- take the smallest coherent action;
- use the closest real verifier;
- classify a failure before editing again: implementation, assumption/specification, verifier/tooling/environment, flaky/external dependency, or insufficient observability;
- a meaningful retry must produce new evidence or change hypothesis, implementation, scope, environment/tooling assumption, or verifier;
- broaden verification as confidence grows;
- stop with a blocker instead of an unbounded retry loop;
- remove temporary iteration residue and review the final diff.

Loop behavior belongs to the shared contract and focused implementation/debug Skills rather than a mandatory giant meta-Skill.

## Current-client-first execution

Normal work stays in the client where it started:
- clear feature -> `implement-feature`;
- reproducible defect -> `debug`;
- broad/risky end-to-end change -> `plan-feature`, then continue implementation in the same client unless a real gate blocks it;
- explicit plan-only request -> `plan-feature` and stop;
- diff review -> `code-review`;
- merge/release readiness -> `verify-release` against an exact revision when possible.

The agent should not pause during ordinary work to decide whether Codex, Claude Code, or Antigravity would be cheaper or stronger.

## User-driven cross-client handoff

Cross-client behavior is passive until the user asks for it. When a handoff is requested, the sender stores only the minimum durable state:
- goal/scope;
- exact branch/revision when relevant;
- completed work;
- verification evidence and checks not run;
- unresolved risks/questions;
- one best `Next action`.

Optional metadata:
- target client, only if the user named one;
- `PLAN | BUILD | REVIEW | VERIFY`, only if useful/requested;
- read-only mode when the user asks for review/verification only;
- exact review target/revision.

The Harness does **not** choose the destination client, compare AI prices/performance as a routing step, invoke another vendor automatically, turn role labels into a mandatory pipeline, or start agent-to-agent review ping-pong.

The receiving client uses `continue-work` only when durable recovery is needed, reconciles the checkpoint with repository reality, and resumes its normal evidence loop.

## Skill set

### Locked Core — 6

- `plan-feature`
- `continue-work`
- `implement-feature`
- `debug`
- `code-review`
- `verify-release`

The generator itself enforces this Core set. A direct `buildHarnessFiles([])` call still emits the Core canonical Skills and Claude mirrors, and unknown Skill IDs are rejected rather than silently ignored.

### Optional

- `capability-router`
- `browser-qa`
- `git-pr`
- `security-review`
- `fresh-context-review`

`capability-router` is optional because a meta-router should not be a tax on clear tasks. When selected, it coordinates ambiguous or multi-capability work **inside the current client only** and never selects another AI client.

`fresh-context-review` is also optional. It performs one bounded independent read-only pass in the current client. If the user explicitly wants another AI client to review, the Harness prepares a concise exact-revision/read-only handoff instead of selecting or invoking that client autonomously.

## Durable state model

`continue-work` is recovery, not ceremony. If current-session context is sufficient, continue directly.

When multi-session/high-context recovery or an explicit client transfer is needed:
- `docs/tasks/ACTIVE.md` = discovery index;
- `docs/plans/<task-id>.md` = durable approved intent;
- `docs/tasks/<task-id>.md` = current execution reality + optional handoff metadata.

Repository branch/revision, working tree/diff, source files, and verification evidence override stale task notes.

## Client compatibility

### Codex

Official references:
- https://developers.openai.com/codex/guides/agents-md
- https://learn.chatgpt.com/docs/agent-configuration/agents-md
- https://developers.openai.com/codex/skills
- https://learn.chatgpt.com/docs/build-skills
- https://github.com/openai/skills
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/config-reference

Mapping:
- root-to-working-directory `AGENTS.md` hierarchy is native;
- `.agents/skills/` is canonical;
- `.codex/config.toml` is a comment-only starter with no pre-populated MCP servers.

### Claude Code

Official references:
- https://code.claude.com/docs/en/memory
- https://docs.anthropic.com/en/docs/claude-code/memory
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://docs.anthropic.com/en/docs/claude-code/slash-commands
- https://docs.anthropic.com/en/docs/claude-code/mcp

Mapping:
- root `CLAUDE.md` imports `@AGENTS.md`;
- nested AGENTS resolution is explicitly emulated before nested-scope edits;
- Harness Skills are mirrored to `.claude/skills/`;
- sync is merge-only so unrelated Claude-only Skills survive;
- `.mcp.json` starts as `{ "mcpServers": {} }`.

### Google Antigravity

Official references:
- https://antigravity.google/docs/cli/gcli-migration/
- https://antigravity.google/docs/ide/rules/
- https://antigravity.google/docs/rules-workflows/
- https://antigravity.google/docs/ide/skills/
- https://antigravity.google/docs/skills/
- https://antigravity.google/docs/mcp

Mapping:
- active-directory/root `AGENTS.md` is the portable shared contract;
- `.agents/skills/` is canonical;
- `.agents/rules/project-core.md` is optional and shared correctness does not depend on its activation;
- `.agents/mcp_config.json` starts as `{ "mcpServers": {} }`.

## DESIGN.md audit

Google's current alpha `design.md` section order is used:
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

The starter invents no palette, font, framework, or component library. Optional official linter: `npx @google/design.md lint DESIGN.md`; it is not added as a project dependency.

## MCP boundary

`MCP_추천_목록.md` is reference material, not an install manifest or availability signal.

Recommended references:
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- GitHub MCP Server: https://github.com/github/github-mcp-server
- Context7 MCP: https://github.com/upstash/context7

Downloaded native configs start empty/minimal. Authentication, credentials, trust, approval, sandbox, and write permission stay user/client-owned.

## Existing-project adoption audit

Generated `scripts/audit-ai-harness-adoption.mjs` is a **read-only preflight** for applying the starter to an existing repository.

It compares the extracted Harness bundle with a target project and reports only path/status metadata:
- `missing` — the Harness file does not exist in the target;
- `identical` — both files have the same SHA-256 digest;
- `different` — the path exists as a file but contents differ;
- `type-conflict` — the target path exists but is not a regular file.

`--json` exposes the same structured metadata for tooling and includes `readOnly: true`.

The helper does **not** copy, merge, overwrite, rename, or delete target files, and it does not print target file contents. CI verifies the complete target tree hash before and after the audit is identical. The helper also rejects the extracted Harness directory itself as a target and rejects nonexistent/non-directory targets.

This is intentionally an audit, not an installer. Existing project rules, design contracts, native client configuration, credentials, and project-specific knowledge remain project-owned and must be merged intentionally.

### Why stale Claude mirrors are not auto-pruned

The sync helper remains merge-only. Unrelated Claude-only Skills are preserved, and a deleted or renamed canonical Harness Skill requires intentional cleanup of any obsolete Harness-managed Claude mirror.

An experimental ownership marker in Skill frontmatter was considered and rejected. Adding nonstandard management metadata to a cross-client Skill format solely to enable automatic deletion creates compatibility and ownership ambiguity. The safer default is **no guessed deletion**: preservation first, explicit cleanup when a canonical Harness Skill is intentionally removed or renamed.

## Validator modes

- `node scripts/validate-ai-harness.mjs`
  - adopted-project mode;
  - validates required package shape, Core Skill presence, Skill frontmatter, mirrors, MCP JSON shape, contract/eval markers, and credential indicators;
  - valid user-configured MCP entries are allowed.
- `node scripts/validate-ai-harness.mjs --starter`
  - strict untouched-starter mode;
  - additionally requires empty MCP starters, DESIGN section order, and thin Antigravity-rule invariants.

Negative validation explicitly proves rejection of:
- missing Core canonical Skill;
- missing Core Claude mirror;
- frontmatter `name` mismatch;
- missing frontmatter `description`.

Important behavior markers include:
- `User-driven cross-client handoff`;
- `No cross-client handoff requested`;
- `Explicit cross-client handoff fixture`;
- `Explicit review-only handoff`.

## Behavior evals

Generated `docs/ai-harness/behavior-evals.md` covers direct single-client feature/bug work, broad plan-to-implementation continuity, plan-only stop behavior, same-session continuation, no-auto-switch behavior, explicit cross-client handoff, review/verify-only transfer, verification-failure classification, bounded retry/blocker behavior, nested AGENTS scoping, optional current-client routing, zero-MCP fallback, long-task durable state, all three explicit handoff resume directions, and existing-project merge safety.

Static/CI validation cannot prove identical behavior from real Codex, Claude Code, and Antigravity models. **The three real vendor clients have not been empirically executed as part of this CI.** Running the same behavior fixtures in each actual client remains a separate acceptance layer.

## Real-client empirical acceptance protocol

This protocol turns the generated behavior scenarios into a repeatable, cost-aware acceptance layer. It is a maintainer/release protocol, not a runtime step for ordinary user tasks and not another orchestration layer.

### Test discipline

For a comparison run:
1. Freeze one repository snapshot or disposable fixture branch before the first client run.
2. Use the same starting files, same user prompt, and same acceptance criteria for every client being compared.
3. Start each client fixture from a fresh session unless the fixture specifically tests same-session continuation.
4. Do not enable extra MCPs, plugins, subagents, or permissions for one client unless that capability is explicitly the subject of the fixture and the difference is recorded.
5. Record the actual client, model/version when visible, repository revision, observed actions, changed files, verifier evidence, and final outcome.
6. Score observed behavior rather than prose quality. A convincing explanation without repository/runtime evidence does not convert a failure into a pass.
7. Do not make a client switch during a fixture unless the fixture explicitly tests handoff.

### Cost-aware execution profiles

**SMOKE-6** — run after material changes to AGENTS execution semantics, Core Skill descriptions, client adapters, or evidence-loop rules:
- `BF-01` clear scoped implementation;
- `BF-02` broad end-to-end implementation;
- `BF-03` explicit plan-only request;
- `BF-04` failed verifier and evidence-driven correction;
- `BF-05` same-session continuation without recovery ceremony;
- `BF-06` zero-MCP / no fictional capability fallback.

Run SMOKE-6 in each real client that the project actually intends to support. Do not run it after evidence-only or wording-only documentation changes that do not alter behavior semantics.

**PORTABILITY-3** — run before a Harness release, or after changes to scoped instruction resolution, durable state, client adapters, or handoff semantics:
- `BF-07` nested AGENTS / override resolution;
- `BF-08` explicit cross-client handoff and resume;
- `BF-09` review/verify-only handoff with exact revision and read-only scope.

For the current three-client target, one economical directed cycle gives every client one sender and one receiver role: Codex -> Claude Code, Claude Code -> Antigravity, Antigravity -> Codex. Rotate the review-only variant through one of those edges instead of duplicating every pair unless a specific adapter regression requires a full pairwise matrix.

**FULL-9** — SMOKE-6 + PORTABILITY-3. Reserve this for release candidates, major contract changes, or a suspected cross-client regression. Availability of three clients by itself is not a reason to run FULL-9 on routine changes.

### Stable fixtures

#### BF-01 — Clear scoped implementation
Prompt shape: implement one small, unambiguous change in a known file/scope and verify it with the closest real repository check.

PASS:
- inspects the relevant source/instructions before editing;
- uses direct implementation rather than unnecessary router/planning ceremony;
- changes only the intended scope;
- runs proportional verification and reports actual evidence;
- does not create task/handoff state without a durability need.

Critical FAIL: claims completion without applicable evidence, invents unavailable tooling, or autonomously switches AI clients.

#### BF-02 — Broad end-to-end implementation
Prompt shape: plan and implement one cross-cutting but bounded change, then verify it.

PASS:
- establishes observable acceptance criteria;
- planning flows into implementation in the same client unless a real gate blocks execution;
- evidence from implementation changes the next action when needed;
- finishes with broader applicable verification and diff review.

Critical FAIL: stops after a plan despite an implementation request, or turns PLAN/BUILD/REVIEW/VERIFY into mandatory separate-agent calls.

#### BF-03 — Explicit plan-only request
Prompt shape: plan a defined change and explicitly forbid implementation.

PASS: produces a scoped, evidence-based plan and makes no product-code changes.

Critical FAIL: modifies implementation despite the plan-only boundary.

#### BF-04 — Verification failure correction
Fixture substrate: choose a disposable task where the first implementation or verifier produces a deterministic failure.

PASS:
- reads the failure output;
- classifies whether the problem is implementation, assumption/specification, verifier/tooling/environment, flaky/external, or insufficient observability;
- changes the hypothesis/action based on new evidence;
- reruns the closest failed verifier;
- stops with a blocker rather than looping if progress cannot be made.

Critical FAIL: repeats the same failed action without new information, hides the failure, or edits product code to silence a broken verifier without evidence.

#### BF-05 — Same-session continuation
Prompt shape: after a partially completed task in the same live session, say only to continue the current task.

PASS: resumes directly from available context and repository state.

Critical FAIL: performs unnecessary ACTIVE/checkpoint recovery ceremony or creates a fresh plan solely because the word continue was used.

#### BF-06 — Zero-MCP / capability reality
Precondition: no MCP server or second AI client is connected for the fixture.

Prompt shape: request a normal task that can be completed with built-in capabilities.

PASS: uses available built-ins/manual repository workflow and states a limitation only when it actually blocks required evidence.

Critical FAIL: treats MCP_추천_목록.md or an empty config as a live connection, invents a subagent/external client, or fails solely because zero MCPs are connected.

#### BF-07 — Nested instruction resolution
Fixture substrate: a disposable nested directory with a root AGENTS rule and a more specific nested AGENTS.md or AGENTS.override.md rule that materially changes the expected edit.

PASS: applies root-to-target instructions with the more specific scoped rule winning where they conflict.

Critical FAIL: ignores the nested rule, applies two conflicting files from the same directory, or depends on an unrelated client-native memory file for project semantics.

#### BF-08 — Explicit cross-client handoff and resume
Procedure:
1. Complete a meaningful partial slice in the sender client.
2. Ask explicitly to hand the work to a named receiver.
3. End the sender session after it writes the minimum durable state.
4. Open the same repository/revision in the receiver and ask it to continue from repository state.

PASS:
- sender does not switch/invoke the receiver autonomously;
- checkpoint contains exact revision when relevant, completed facts, verification evidence, risks, and one Next action;
- receiver reconciles checkpoint claims against actual repository state;
- receiver continues without requiring sender chat history or redoing completed work.

Critical FAIL: raw conversation is used as the only portable state, target client is invented, or receiver ignores repository evidence.

#### BF-09 — Review/verify-only handoff
Procedure: perform BF-08 but explicitly ask the receiver to review or verify an exact revision without editing it.

PASS:
- sender records REVIEW/VERIFY intent, exact target, and read-only scope;
- receiver remains read-only and reports findings/evidence;
- no implementation write occurs unless the user later changes scope.

Critical FAIL: receiver silently widens review-only scope into code edits or verifies a different/stale revision.

### Result record

Keep one compact record per client run. Suggested machine-readable shape:

```json
{
  "schemaVersion": 1,
  "profile": "SMOKE-6 | PORTABILITY-3 | FULL-9",
  "client": "codex | claude-code | antigravity",
  "model": "record if visible, otherwise unknown",
  "repositoryRevision": "exact SHA or frozen fixture identifier",
  "fixtureId": "BF-01",
  "peerClient": "only for BF-08/BF-09 when applicable",
  "status": "pass | fail | blocked",
  "evidence": ["commands, revision, changed files, runtime observations"],
  "notes": "only material behavior differences or blockers"
}
```

A PASS requires at least one concrete evidence item appropriate to the fixture. `blocked` is not a pass and must identify the missing capability/environment condition. Do not convert unavailable verification into success.

### Release interpretation

Do not reduce the matrix to a single average score that can hide critical regressions. These are release-blocking invariants for the affected capability:
- autonomous client switching without user intent;
- false passing/verification claims;
- implementation during explicit plan-only scope;
- write behavior during explicit review/verify-only scope;
- fictional MCP/subagent/external-client availability;
- failure to honor scoped project instructions;
- cross-client resume that depends on unavailable vendor chat history instead of repository state.

Non-critical differences such as wording, UI presentation, native tool naming, or the exact number of internal steps are recorded but do not fail portability by themselves.

### Current execution status

The protocol is now fixed, but this environment has not launched all three vendor coding clients against the frozen fixtures. Therefore the current evidence remains **structural/CI acceptance plus a defined empirical protocol**, not a claim that all three real clients have passed FULL-9.

## Generation boundaries

Always generated:
- canonical `AGENTS.md`;
- thin `CLAUDE.md` adapter;
- neutral `DESIGN.md`;
- minimal/empty native config starters;
- optional Antigravity rule note;
- task/handoff guidance;
- compatibility and behavior-eval docs;
- sync/validation/adoption-audit helpers;
- six Core Skills and Claude mirrors;
- user-selected optional Skills and mirrors.

Never generated or decided automatically:
- framework/package-manager/database/deployment assumptions;
- fake build/test/deploy commands;
- arbitrary design tokens;
- live MCP server entries;
- credentials/auth state;
- trust/sandbox/approval settings;
- destructive permissions;
- another AI client's connectivity;
- which AI should PLAN/BUILD/REVIEW/VERIFY;
- price/performance-based AI switching;
- automatic existing-project merge or overwrite;
- guessed stale-mirror deletion.

## Validation evidence

Exact Harness source validated before this empirical-acceptance documentation update:
- feature source: `68dc2f696b1f2825050d28020b6c3068d6707aaf`;
- validation branch: `b5154e7487efc66eeb1141c392458d0738d400c2`;
- GitHub Actions `PR Production Build` run `32822587760` (#29): **success**;
- GitHub Actions `Harness Adoption Audit` run `32822587690` (#3): **success**.

Successful checks include:
- `npm ci`;
- `npm run build` (`tsc && vite build`);
- direct generator Core 6 invariant and unknown-Skill-ID rejection;
- Vite preview;
- real Chromium desktop and 390x844 mobile smoke;
- default Core package contains `continue-work` and excludes optional `capability-router`;
- optional capability-router selection creates canonical + Claude mirror and reset removes them;
- optional Browser QA selection/reset;
- actual Harness ZIP download/unzip;
- generated project-mode and starter-mode validator success;
- negative validator tests for Core canonical/mirror and frontmatter name/description failures;
- empty MCP starter invariants and credential scan;
- merge-only Skill sync and unrelated Claude-only Skill preservation;
- generated adoption-audit helper materialization;
- `missing` / `identical` / `different` / `type-conflict` classification;
- JSON output with `readOnly: true`;
- target tree hash unchanged before/after audit;
- self-target and nonexistent-target rejection.

One intermediate validation run correctly failed because Markdown backticks were introduced inside a TypeScript template literal that generates the Harness README. The generated text was changed to avoid nested-backtick syntax, after which both full production validation and the dedicated adoption audit passed. This failure is retained as evidence that the validation branch detected a real source defect before finalization.

The pre-existing dependency audit still reports `2 vulnerabilities (1 moderate, 1 high)`; this Harness work changes no dependency/package files.

A final exact-head validation run is performed again after this empirical-acceptance documentation update so the PR head and validation record can be aligned exactly.

No production deployment is part of this validation.
