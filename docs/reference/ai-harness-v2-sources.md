# AI Development Harness v2 — compatibility and engineering audit

## Audit scope

- Verified: 2026-08-24
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

Cross-client behavior is passive until the user asks for it.

Examples:
- “이제 Codex로 넘길래.”
- “Claude Code에서 이어서 할 거야.”
- “Antigravity에서는 검증만 할래.”

At that point the sender stores only the minimum durable state:
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

The Harness does **not**:
- choose the destination client;
- compare AI prices/performance as a routing step;
- invoke another vendor automatically;
- turn role labels into a mandatory pipeline;
- start agent-to-agent review ping-pong.

The receiving client uses `continue-work` only when durable recovery is needed, reconciles the checkpoint with repository reality, and resumes its normal evidence loop.

## Skill set

### Locked Core — 6

- `plan-feature`
- `continue-work`
- `implement-feature`
- `debug`
- `code-review`
- `verify-release`

### Optional

- `capability-router`
- `browser-qa`
- `git-pr`
- `security-review`
- `fresh-context-review`

### Why capability-router is optional

A meta-router should not be a tax on clear tasks. When selected, `capability-router` coordinates ambiguous or multi-capability work **inside the current client only**. It never selects another AI client.

### Why fresh-context-review is optional

`fresh-context-review` is one bounded independent read-only pass in the current client. If the user explicitly wants another AI client to review, it prepares a concise exact-revision/read-only handoff instead of selecting or invoking that client autonomously.

## Durable state model

`continue-work` is recovery, not ceremony.

If current-session context is sufficient, continue directly.

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

## Validator modes

- `node scripts/validate-ai-harness.mjs`
  - adopted-project mode;
  - validates required package shape, Skill mirrors, MCP JSON shape, contract/eval markers, and credential indicators;
  - valid user-configured MCP entries are allowed.
- `node scripts/validate-ai-harness.mjs --starter`
  - strict untouched-starter mode;
  - additionally requires empty MCP starters, DESIGN section order, and thin Antigravity-rule invariants.

Important current markers include:
- `User-driven cross-client handoff`;
- `No cross-client handoff requested`;
- `Explicit cross-client handoff fixture`;
- `Explicit review-only handoff`.

## Behavior evals

Generated `docs/ai-harness/behavior-evals.md` covers:
- direct single-client feature/bug work;
- broad plan -> same-client implement -> verify continuity;
- plan-only stop behavior;
- same-session continuation without recovery ceremony;
- **no user handoff request -> remain in current client**;
- explicit cross-client handoff -> compact repository state;
- review/verify-only transfer -> exact revision/read-only scope;
- verification failure classification and correction;
- bounded retry/blocker behavior;
- nested AGENTS scoping;
- optional current-client router behavior;
- zero-MCP fallback;
- long-task durable state;
- receiving-client resume in all three client directions after explicit handoff;
- existing-project config merge safety.

Static/CI validation cannot mathematically guarantee identical behavior from real Codex, Claude Code, and Antigravity models. Real-client behavior sampling remains a separate acceptance layer.

## Generation boundaries

Always generated:
- canonical `AGENTS.md`;
- thin `CLAUDE.md` adapter;
- neutral `DESIGN.md`;
- minimal/empty native config starters;
- optional Antigravity rule note;
- task/handoff guidance;
- compatibility and behavior-eval docs;
- sync/validation helpers;
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
- price/performance-based AI switching.

## Validation evidence

User-driven-handoff source revision validated before this evidence-only documentation update:
- feature source: `e5214da058c9645ff6426c7afde7e6fb500312ef`
- validation branch: `bec71ef2f5fcac2d5912480c2706b2e7f781cb10`
- GitHub Actions `PR Production Build` run `32731675361` (#21): **success**

Successful checks:
- `npm ci`;
- `npm run build` (`tsc && vite build`);
- Vite preview;
- real Chromium desktop and 390x844 mobile smoke;
- default Core package contains `continue-work` and excludes optional `capability-router`;
- optional capability-router selection creates canonical + Claude mirror and reset removes them;
- optional Browser QA selection/reset;
- actual Harness ZIP download/unzip;
- new `User-driven cross-client handoff` AGENTS contract;
- no-auto-switch / explicit-handoff / review-only behavior markers;
- generated project-mode and starter-mode validator success;
- empty MCP starter invariants;
- credential scan;
- merge-only Skill sync and unrelated Claude-only Skill preservation.

The pre-existing dependency audit still reports `2 vulnerabilities (1 moderate, 1 high)`; this Harness work changes no dependency/package files.

A final validation run is performed again after this documentation-only evidence update so the PR head and validation record can be aligned exactly.

No production deployment is part of this validation.
