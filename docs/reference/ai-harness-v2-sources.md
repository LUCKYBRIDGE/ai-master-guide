# AI Development Harness v2 — compatibility and architecture sources

## Audit scope

- Verified: 2026-08-24
- Goal: provide a **project-neutral** portable Harness that lets Codex, Claude Code, and Google Antigravity share durable project instructions, Skills, plans, and execution state while preserving each client's native discovery paths, capability differences, and security model.
- Active website sources:
  - `src/components/SystemHarnessEngineeringView.tsx`
  - `src/data/aiHarnessV2Data.ts`
  - `src/components/DesignPreExtractionView.tsx`

## Current design rule

The Harness does **not** claim that one physical config file is natively consumed by all three products, and it does **not** assume a framework, package manager, database, deployment platform, design theme, MCP server, subagent, or external AI client for the downloaded project.

It uses:

1. a thin canonical `AGENTS.md` project contract;
2. explicit root-to-target scoped instruction semantics;
3. client-native adapters only where discovery behavior differs;
4. exact Skill mirrors only where the native Skill path differs;
5. focused workflow Skills plus a lightweight capability router;
6. `docs/tasks/ACTIVE.md` + plan/checkpoint files for portable cross-client resume;
7. minimal client config skeletons without pre-populated MCP servers;
8. behavior evals that test routing, scoping, fallback, and resume semantics separately from static file validation.

Model selection, trust, sandboxing, auto-approval, external-service authentication, destructive-command permissions, MCP credentials, external-agent availability, and MCP/write permissions stay client-local.

For existing repositories, generated canonical/adapter/config files are **merge candidates**, not instructions to overwrite useful project-specific knowledge or working client configuration.

## Why this architecture

### Converging pattern in established agent-harness projects

The current design was compared against several widely adopted public systems on 2026-08-24. Star counts are a snapshot, not a quality proof, but these projects are useful evidence of recurring patterns.

#### obra/superpowers

- Repository: https://github.com/obra/superpowers
- Supports Claude Code, Antigravity, Codex, and other harnesses through harness-specific installation paths.
- Uses composable focused Skills plus a small bootstrap/meta workflow.
- Separates design, planning, implementation, testing, code review, and branch finishing.
- Maintains behavior/eval tooling for Skills rather than treating file presence as proof that the workflow behaves correctly.

Harness lesson: keep Skills composable and evidence-driven, support native client paths, and test behavior separately from package shape. Do not copy its mandatory methodology wholesale into a project-neutral starter.

#### affaan-m/ECC

- Repository: https://github.com/affaan-m/ECC
- Explicitly supports multiple harnesses while warning users not to assume feature parity.
- Emphasizes persistent state outside the context window.
- Warns against stacking multiple installation paths in the same harness because duplicate Skills, hooks, or configuration can conflict.

Harness lesson: preserve durable state for long work, acknowledge client capability differences, and warn against blindly stacking overlapping methodology packs.

#### addyosmani/agent-skills

- Repository: https://github.com/addyosmani/agent-skills
- Organizes focused Skills by engineering lifecycle and includes a meta-skill to map incoming work to the right procedure.
- States that not every task needs every Skill and uses Skill descriptions as activation signals.
- Provides native integration guidance for multiple coding agents.

Harness lesson: a meta-skill is useful when it remains a thin selector. `capability-router` therefore stays default-selected but is explicitly **not** a mandatory hop for simple tasks.

#### intellectronica/ruler

- Repository: https://github.com/intellectronica/ruler
- Focuses directly on distributing one source of truth to multiple coding-agent native files.
- Supports merge/backup/dry-run concepts and distinguishes native rule, Skill, and MCP paths by client.

Harness lesson: canonical-to-adapter distribution is valid, but existing-project adoption must be merge-safe.

#### openai/codex-plugin-cc

- Repository: https://github.com/openai/codex-plugin-cc
- Official OpenAI plugin for using Codex from Claude Code.
- Separates read-only review, adversarial review, explicit delegation/rescue, transfer, and background-job control.
- Warns that automatic review loops can become long-running and consume usage quickly.

Harness lesson: cross-agent cooperation should be bounded and role-specific. The optional `fresh-context-review` Skill defaults to one independent read-only pass and never assumes another agent is actually connected.

## Codex

### Project instructions

OpenAI documents exact `AGENTS.md` resolution behavior:

- project scope starts at the project root, typically the Git root;
- Codex walks down to the current working directory;
- in each directory it checks `AGENTS.override.md` first, then `AGENTS.md`, then configured fallback names;
- it includes at most one project instruction file per directory;
- more specific instructions closer to the current working directory are loaded later.

Sources:
- https://developers.openai.com/codex/guides/agents-md
- current redirected docs: https://learn.chatgpt.com/docs/agent-configuration/agents-md

Harness mapping: root `AGENTS.md` defines these semantics as the portable project rule. Codex uses them natively; other clients emulate the same project-scoping rule when they do not natively discover nested `AGENTS` files.

### Skills

OpenAI documents repository Skill discovery from the current working directory up to repository root through `.agents/skills` locations.

Sources:
- https://developers.openai.com/codex/skills
- current redirected docs: https://learn.chatgpt.com/docs/build-skills
- https://github.com/openai/skills

Harness mapping: canonical Skill source `.agents/skills/`.

### Project config and MCP

- Codex can use project `.codex/config.toml` in trusted projects.
- MCP definitions, when a user chooses to add them, use `[mcp_servers.<name>]`.
- Sources:
  - https://developers.openai.com/codex/mcp
  - https://developers.openai.com/codex/config-reference

Harness mapping: always include a comment-only `.codex/config.toml` skeleton, but do **not** pre-populate any MCP server, model, sandbox, approval, trust, or credential setting. Existing project config should be reviewed and merged instead of replaced blindly.

## Claude Code

### Project instructions

Anthropic documents that:

- Claude Code reads `CLAUDE.md`, not `AGENTS.md` directly;
- when a repository already uses `AGENTS.md`, Anthropic explicitly recommends importing it from `CLAUDE.md` with `@AGENTS.md` so instructions are shared without duplication;
- `CLAUDE.md` files have their own directory hierarchy and load semantics;
- nested `AGENTS.md` files are therefore not automatically equivalent to nested `CLAUDE.md` memory.

Source:
- https://docs.anthropic.com/en/docs/claude-code/memory
- current canonical docs: https://code.claude.com/docs/en/memory

Harness mapping:
- root `CLAUDE.md` imports root `@AGENTS.md`;
- the adapter explicitly instructs Claude Code to follow the `Scoped instruction resolution` section in `AGENTS.md` and read applicable nested `AGENTS.override.md` / `AGENTS.md` before changing nested scopes;
- cross-client resume uses repository `docs/tasks/ACTIVE.md` rather than Claude auto memory or chat history.

### Skills

- Project Skills live under `.claude/skills/<skill>/SKILL.md`.
- Sources:
  - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
  - https://docs.anthropic.com/en/docs/claude-code/slash-commands

Harness mapping: canonical source `.agents/skills/`, exact generated mirror for Harness-managed Skills under `.claude/skills/`. The sync helper updates canonical paths without deleting unrelated Claude-only Skills.

### Project MCP

- Project-scope MCP config uses repository-root `.mcp.json` with an `mcpServers` object.
- Source:
  - https://docs.anthropic.com/en/docs/claude-code/mcp

Harness mapping: include a valid empty `.mcp.json` with `"mcpServers": {}`. Users add only the MCP servers their project actually needs and preserve/merge an existing project config.

## Google Antigravity

### AGENTS and workspace rules

Google's current Antigravity CLI migration documentation says the agent continues to parse and enforce `GEMINI.md` and `AGENTS.md` constraints defined inside the active directory. Antigravity IDE workspace Rules live under `.agents/rules/` and support activation modes plus `@` references.

Sources:
- https://antigravity.google/docs/cli/gcli-migration/
- https://antigravity.google/docs/ide/rules/
- https://antigravity.google/docs/rules-workflows/

Harness mapping:
- root/active-directory `AGENTS.md` is the portable shared contract for Antigravity;
- `.agents/rules/project-core.md` is reduced to **thin Antigravity-specific notes** and no longer re-imports the entire `AGENTS.md` or `DESIGN.md`, avoiding unnecessary duplicate always-on context;
- `DESIGN.md` is read on demand for UI/design work rather than injected into every task;
- cross-client resume uses `docs/tasks/ACTIVE.md`, not Antigravity conversation artifacts as the only source of truth.

### Skills

Google documents:

- workspace Skills under `<workspace-root>/.agents/skills/<skill-folder>/SKILL.md`;
- progressive disclosure: the agent sees Skill names/descriptions and loads full Skill instructions when relevant;
- focused Skills and clear descriptions as best practices.

Sources:
- https://antigravity.google/docs/ide/skills/
- https://antigravity.google/docs/skills/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`.

### Workspace MCP

- Current workspace MCP config lives in `.agents/mcp_config.json`.
- Sources:
  - https://antigravity.google/docs/mcp
  - https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: include a valid empty `.agents/mcp_config.json` with `"mcpServers": {}`. Users add external servers in their own workspace when needed and preserve/merge an existing config.

## Skill orchestration model

### Dedicated Skills first

Simple tasks route directly:

- resume/handoff of durable existing work -> `continue-work`
- reproducible bug -> `debug`
- clear scoped change -> `implement-feature`
- diff review -> `code-review`
- merge/release readiness -> `verify-release`

Broad or risky work can use `plan-feature -> implement-feature`.

### continue-work

`continue-work` is default-selected because cross-session and cross-client continuation is a core portability requirement.

Activation keywords intentionally include natural resume language such as `continue`, `resume`, `pick up`, `handoff`, `이어서`, `계속`, `재개`, and `인계`.

When activated it:

1. resolves applicable root-to-target `AGENTS` instructions;
2. reads `docs/tasks/ACTIVE.md` to discover the durable active task;
3. reads the task checkpoint, then its linked plan and durable decisions;
4. reconciles checkpoint claims against actual repository revision, working tree/diff, relevant files, and available verification evidence;
5. treats repository reality as authoritative when notes are stale;
6. preserves completed work and continues from the recorded `Next action` using the smallest dedicated Skill/tool that fits;
7. updates checkpoint/ACTIVE state before another handoff.

It does **not** require vendor chat history, Claude auto memory, native plan modes, or Antigravity conversation artifacts.

### capability-router

`capability-router` remains in the default portable Skill set because a downloaded project may be opened in clients with different tool inventories. It is intentionally lightweight.

Use it only when capability choice is genuinely ambiguous or the task requires coordination across multiple Skills, connected MCP tools, built-in tools, subagents, or external agents.

It must:

1. route resume/handoff requests to `continue-work`;
2. inspect only capabilities actually available in the current session;
3. prefer the smallest sufficient Skill/tool set;
4. avoid exhaustive inventory when a dedicated Skill clearly matches;
5. use an MCP, subagent, or external agent only when actually available and materially useful;
6. treat recommendation/config files as reference, not availability signals;
7. continue with built-in tools or a safe manual workflow when no MCP or second agent is available;
8. never install, authenticate, or widen external access unless the user explicitly requests it;
9. respect approval and least-privilege boundaries.

Zero MCP servers is a normal supported state.

### fresh-context-review

`fresh-context-review` is optional, not default-selected.

Use it when an independent second pass is materially valuable for high-risk, unfamiliar, architecturally significant, or pre-release work. It freezes the review target, prefers a fresh context, and may ask another **actually available** agent for one read-only pass. If no second agent is available, it falls back to an independent self-review and states the limitation.

The primary agent reconciles findings against repository evidence. Automatic writes, permission widening, invented agent connectivity, and unbounded agent-to-agent loops are prohibited by the Skill.

## Durable cross-client task state

The generated task structure now has three distinct roles:

- `docs/tasks/ACTIVE.md` — portable discovery entry point for currently active/paused long-running work;
- `docs/plans/<task-id>.md` — durable approved **intent**: what should be done and why;
- `docs/tasks/<task-id>.md` — current execution **reality**: what is actually complete, verified, blocked, and next.

A checkpoint includes:

- task ID and status;
- goal;
- scope/out-of-scope;
- current revision when relevant;
- linked plan and source-of-truth files;
- completed work;
- verification evidence;
- unresolved risks/questions;
- one best next action.

The receiving client must reconcile this state against the actual repository before continuing. A plan is never treated as completion evidence, and a stale checkpoint never overrides current code/revision/diff evidence.

Small single-session edits do not require ACTIVE/task documents.

## Behavior evals

Generated `docs/ai-harness/behavior-evals.md` separates **behavioral correctness** from static package validation.

Representative scenarios include:

- direct single-Skill routing;
- broad/risky work;
- root-to-target scoped AGENTS resolution;
- zero-MCP fallback;
- catalog-only MCP not being mistaken for a connection;
- existing-config merge safety;
- long-task ACTIVE/checkpoint handoff;
- bounded second-agent review;
- no-second-agent fallback;
- Antigravity -> Codex resume;
- Codex -> Claude Code resume;
- Claude Code -> Antigravity resume.

The cross-client resume fixture passes only when the receiving client can discover the active task without copied chat history, load applicable scoped instructions, read checkpoint + plan, inspect actual repository state, avoid repeating completed work, continue from `Next action`, and update durable state when necessary.

The expected behavior is semantic rather than vendor-identical. The Harness standardizes shared knowledge, procedure, scoped instructions, durable continuation, and quality gates while allowing each client to retain its native UX, autonomy model, and tool inventory.

## DESIGN.md

- Google Labs open-sourced the draft DESIGN.md specification on 2026-04-21.
- Current format status is `alpha`.
- The format combines optional YAML front matter with a Markdown body for design rationale and guidance.
- Sources:
  - https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
  - https://github.com/google-labs-code/design.md
  - https://github.com/google-labs-code/design.md/blob/main/docs/spec.md

Harness mapping:
- canonical design source: root `DESIGN.md`;
- generated starter is intentionally **neutral** and does not preselect colors, fonts, spacing, component libraries, styling frameworks, or visual theme;
- project-specific design values should be populated only from verified repository/design evidence;
- `docs/design/` is supplemental implementation documentation rather than a second canonical token source;
- AI Master Guide does not add `@google/design.md` as a dependency.

## MCP recommendation document

The generated root file is `MCP_추천_목록.md`. It is not an install manifest.

### Microsoft Playwright MCP

- Purpose: browser automation and browser-based UI verification for projects that actually have a browser surface.
- Sources:
  - https://github.com/microsoft/playwright-mcp
  - https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-mcp.md

### GitHub official MCP server

- Purpose: repository, Issue, Pull Request, and related GitHub workflows when a user intentionally connects GitHub.
- Source:
  - https://github.com/github/github-mcp-server

### Context7 MCP

- Purpose: retrieve current library, framework, SDK, and API documentation when version freshness matters.
- Sources:
  - https://github.com/upstash/context7
  - https://context7.com

The recommendation document tells users to configure authentication and permissions themselves and never treats a recommendation as installed capability.

## Generation boundaries

Always generated:
- `AGENTS.md` project-neutral starter contract with scoped instruction and handoff rules
- `CLAUDE.md` root import + nested AGENTS emulation guidance
- `DESIGN.md` neutral starter
- `MCP_추천_목록.md`
- `.codex/config.toml` with no MCP server entries
- `.mcp.json` with an empty `mcpServers` object
- `.agents/mcp_config.json` with an empty `mcpServers` object
- `.agents/rules/project-core.md` thin Antigravity notes without full AGENTS/DESIGN re-import
- selected canonical Skills under `.agents/skills/`
- exact Harness-managed Claude mirrors under `.claude/skills/`
- `continue-work` in the default Skill set
- durable `docs/` structure
- `docs/tasks/ACTIVE.md`
- `docs/tasks/README.md` resume/handoff guidance
- `docs/ai-harness/behavior-evals.md`
- Skill sync/validation helpers

Never generated or assumed by the Harness:
- project-specific framework/package-manager/database assumptions
- fake build/test/deploy commands
- arbitrary default color/font/theme
- actual MCP server entries
- real tokens or credentials
- account authorization
- model defaults
- sandbox/approval/trust bypasses
- destructive-command permissions
- a live second AI client, custom agent, or subagent
- vendor chat history or native planning artifacts as portable state

## Existing-project adoption boundary

The ZIP is usable as a reference package for existing repositories, but these paths may already contain valuable project state:
- `AGENTS.md`
- nested `AGENTS.md` / `AGENTS.override.md`
- `DESIGN.md`
- `CLAUDE.md`
- `.codex/config.toml`
- `.mcp.json`
- `.agents/mcp_config.json`

Inspect and merge deliberately rather than blindly overwriting existing content. Do not layer multiple full Harness/methodology installations into one client without reconciling overlapping rules, Skills, hooks, and config ownership.

## Known limits

- Product paths and schemas can change; re-check official sources before future structural updates.
- GitHub stars indicate adoption/attention, not correctness; community projects are used here for recurring workflow patterns rather than as normative specifications.
- A config or adapter file being present does not prove the installed client trusts or activates it.
- An MCP recommendation does not prove the server is installed, connected, authenticated, or authorized.
- Cross-agent review does not prove another agent is installed or reachable.
- Repository handoff files improve cross-client continuity but cannot force every vendor model to select the same Skill or interpret ambiguous task IDs identically.
- The Harness standardizes durable project context and reusable procedure; it cannot guarantee identical model behavior across vendors.
- Preview/build success does not prove each external client has been manually launched against the downloaded ZIP; cross-client behavior evals remain an explicit runtime check.
- `src/data/templateFilesData.ts` remains unconnected legacy data during the v2 transition; the active Harness v2 view must not import it.
