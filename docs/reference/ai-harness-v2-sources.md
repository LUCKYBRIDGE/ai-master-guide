# AI Development Harness v2 — compatibility and architecture sources

## Audit scope

- Verified: 2026-08-24
- Goal: provide a **project-neutral** portable Harness that lets Codex, Claude Code, and Google Antigravity work from the same durable project contract, design source, and reusable skills while preserving each client's native discovery paths, capability differences, and security model.
- Active website sources:
  - `src/components/SystemHarnessEngineeringView.tsx`
  - `src/data/aiHarnessV2Data.ts`
  - `src/components/DesignPreExtractionView.tsx`

## Current design rule

The Harness does **not** claim that one physical config file is natively consumed by all three products, and it does **not** assume a framework, package manager, database, deployment platform, design theme, MCP server, subagent, or external AI client for the downloaded project.

It uses:

1. a thin canonical project contract;
2. client-native adapters where discovery paths differ;
3. exact Skill mirrors only where the native Skill path differs;
4. focused workflow Skills plus a lightweight capability router;
5. minimal client config skeletons without pre-populated MCP servers;
6. durable task/handoff state only for long-running or cross-client work;
7. behavior evals that test routing and fallback semantics separately from static file validation.

Model selection, trust, sandboxing, auto-approval, external-service authentication, destructive-command permissions, MCP credentials, external-agent availability, and MCP/write permissions stay client-local.

For existing repositories, generated canonical/adapter/config files are **merge candidates**, not instructions to overwrite useful project-specific knowledge or working client configuration.

## Why this architecture

### Converging pattern in established agent-harness projects

The current design was compared against several widely adopted public systems on 2026-08-24. Star counts are a snapshot, not a quality proof, but these projects are useful evidence of patterns that survived broad real-world use.

#### obra/superpowers

- Repository: https://github.com/obra/superpowers
- Snapshot: roughly 276k GitHub stars on 2026-08-24.
- Supports Claude Code, Antigravity, Codex, and other harnesses through harness-specific installation paths.
- Uses composable focused Skills plus a small bootstrap/meta workflow.
- Core workflow separates design, planning, implementation, testing, code review, and branch finishing.
- Maintains behavior/eval tooling for Skills rather than treating file presence as proof that the workflow behaves correctly.

Harness lesson: keep Skills composable and evidence-driven, support native client paths, and test behavior separately from package shape. Do not copy its mandatory TDD methodology wholesale into a project-neutral starter.

#### affaan-m/ECC

- Repository: https://github.com/affaan-m/ECC
- Snapshot: roughly 242k GitHub stars on 2026-08-24.
- Explicitly supports multiple harnesses while warning users not to assume feature parity.
- Emphasizes `plan -> test -> implement -> review -> verify -> remember -> improve` and persistent state outside the context window.
- Warns against stacking multiple installation paths in the same harness because duplicate Skills, hooks, or configuration can conflict.

Harness lesson: preserve durable state for long work, acknowledge client capability differences, and warn against blindly stacking overlapping methodology packs.

#### addyosmani/agent-skills

- Repository: https://github.com/addyosmani/agent-skills
- Snapshot: roughly 89k GitHub stars on 2026-08-24.
- Organizes focused Skills by engineering lifecycle and includes a `using-agent-skills` meta-skill to map incoming work to the right procedure.
- States that not every task needs every Skill and uses Skill descriptions as activation signals.
- Provides native integration guidance for Claude Code, Antigravity, Codex, and other agents.

Harness lesson: a meta-skill is useful when it remains a thin selector. `capability-router` therefore stays default-selected but is explicitly **not** a mandatory hop for simple tasks.

#### intellectronica/ruler

- Repository: https://github.com/intellectronica/ruler
- Snapshot: roughly 2.8k GitHub stars on 2026-08-24.
- Focuses directly on distributing one source of truth to multiple coding-agent native files.
- Supports merge/backup/dry-run concepts and distinguishes native rule, Skill, and MCP paths by client.

Harness lesson: canonical-to-adapter distribution is valid, but existing-project adoption must be merge-safe. The ZIP therefore warns against overwriting existing native config or project rules.

#### openai/codex-plugin-cc

- Repository: https://github.com/openai/codex-plugin-cc
- Snapshot: roughly 32k GitHub stars on 2026-08-24.
- Official OpenAI plugin for using Codex from Claude Code.
- Separates read-only review, adversarial review, explicit delegation/rescue, transfer, and background-job control.
- Warns that an automatic review gate can create a long-running Claude/Codex loop and consume usage quickly.

Harness lesson: cross-agent cooperation should be bounded and role-specific. The optional `fresh-context-review` Skill defaults to one independent read-only pass and never assumes another agent is actually connected.

### Community workflow observations

Public multi-agent user workflows repeatedly use some version of:

- one agent plans or implements;
- another agent reviews from a fresh context;
- the primary agent reconciles findings;
- shared files carry goals, state, and evidence across sessions rather than relying on conversational memory.

These examples support a durable handoff format, but they do not justify hard-coding a role such as “Claude always plans” or “Codex always reviews.” Model/client roles remain task- and environment-dependent.

## Codex

### Project instructions

- OpenAI documents Codex project instructions through `AGENTS.md`, including hierarchical discovery from project/root context toward the working directory.
- Sources:
  - https://developers.openai.com/codex/guides/agents-md
  - https://openai.com/index/unrolling-the-codex-agent-loop/

Harness mapping: canonical contract `AGENTS.md`. The starter contains no invented project commands; users or agents adapt it from real repository evidence.

### Skills

- Current project Skill path: `.agents/skills/<skill>/SKILL.md`.
- Skills use `SKILL.md` with discovery metadata such as `name` and `description`.
- Sources:
  - https://developers.openai.com/codex/skills
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

- Claude Code reads project `CLAUDE.md` context.
- `CLAUDE.md` supports file imports with `@path`.
- Sources:
  - https://docs.anthropic.com/en/docs/claude-code/memory
  - https://docs.anthropic.com/en/docs/claude-code/settings

Harness mapping: `CLAUDE.md` imports `@AGENTS.md` and contains only Claude-specific adapter guidance.

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

### Workspace rules

- Current workspace rules live in `.agents/rules/`.
- Antigravity rules can reference other files with `@` mentions.
- Sources:
  - https://antigravity.google/docs/ide-rules
  - https://antigravity.google/docs/rules-workflows/

Harness mapping: `.agents/rules/project-core.md` references root `AGENTS.md` and `DESIGN.md`. Users must still configure/verify rule activation in the installed client; the package does not bypass client activation or trust controls.

### Skills

- Current workspace Skills live in `.agents/skills/<skill>/SKILL.md`.
- Antigravity uses progressive disclosure: the agent sees Skill names/descriptions first and loads the full `SKILL.md` only when relevant.
- Google explicitly recommends focused Skills and clear descriptions.
- Source:
  - https://antigravity.google/docs/skills/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`. The Harness intentionally keeps the default set small instead of shipping a large generic Skill library.

### Workspace MCP

- Current workspace MCP config lives in `.agents/mcp_config.json`.
- Sources:
  - https://antigravity.google/docs/mcp
  - https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: include a valid empty `.agents/mcp_config.json` with `"mcpServers": {}`. Users add external servers in their own workspace when needed and preserve/merge an existing config.

## Skill orchestration model

### Dedicated Skills first

Simple tasks route directly:

- reproducible bug -> `debug`
- clear scoped change -> `implement-feature`
- diff review -> `code-review`
- merge/release readiness -> `verify-release`

Broad or risky work can use `plan-feature -> implement-feature`.

### capability-router

`capability-router` remains in the default portable Skill set because a downloaded project may be opened in clients with different tool inventories. It is intentionally lightweight.

Use it only when capability choice is genuinely ambiguous or the task requires coordination across multiple Skills, connected MCP tools, built-in tools, subagents, or external agents.

It must:

1. inspect only capabilities actually available in the current session;
2. prefer the smallest sufficient Skill/tool set;
3. avoid exhaustive inventory when a dedicated Skill clearly matches;
4. use an MCP, subagent, or external agent only when actually available and materially useful;
5. treat recommendation/config files as reference, not availability signals;
6. continue with built-in tools or a safe manual workflow when no MCP or second agent is available;
7. never install, authenticate, or widen external access unless the user explicitly requests it;
8. respect approval and least-privilege boundaries;
9. re-evaluate only after tool failure or material scope change.

Zero MCP servers is a normal supported state.

### fresh-context-review

`fresh-context-review` is optional, not default-selected.

Use it when an independent second pass is materially valuable for high-risk, unfamiliar, architecturally significant, or pre-release work. It freezes the review target, prefers a fresh context, and may ask another **actually available** agent for one read-only pass. If no second agent is available, it falls back to an independent self-review and states the limitation.

The primary agent reconciles findings against repository evidence. Automatic writes, permission widening, invented agent connectivity, and unbounded agent-to-agent loops are prohibited by the Skill.

## Durable task and handoff state

Generated `docs/tasks/README.md` now contains a compact handoff schema for long-running, multi-session, or multi-agent work:

- goal;
- scope/out-of-scope;
- current revision and source-of-truth files;
- completed work;
- verification evidence;
- unresolved risks/questions;
- one next action.

It explicitly discourages transcript dumping and forbids storing secrets or unverified capability state. Small single-session edits do not require a task document.

## Behavior evals

Generated `docs/ai-harness/behavior-evals.md` separates **behavioral correctness** from static package validation.

Representative scenarios include:

- direct single-Skill routing;
- broad/risky work;
- zero-MCP fallback;
- catalog-only MCP not being mistaken for a connection;
- existing-config merge safety;
- long-task handoff;
- bounded second-agent review;
- no-second-agent fallback.

The expected behavior is semantic rather than vendor-identical. The Harness standardizes shared knowledge, procedure, and quality gates while allowing each client to retain its native UX, autonomy model, and tool inventory.

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
- `AGENTS.md` project-neutral starter contract
- `CLAUDE.md`
- `DESIGN.md` neutral starter
- `MCP_추천_목록.md`
- `.codex/config.toml` with no MCP server entries
- `.mcp.json` with an empty `mcpServers` object
- `.agents/mcp_config.json` with an empty `mcpServers` object
- `.agents/rules/project-core.md`
- selected canonical Skills under `.agents/skills/`
- exact Harness-managed Claude mirrors under `.claude/skills/`
- durable `docs/` structure
- `docs/tasks/README.md` handoff guidance
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

## Existing-project adoption boundary

The ZIP is usable as a reference package for existing repositories, but these paths may already contain valuable project state:
- `AGENTS.md`
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
- The Harness standardizes durable project context and reusable procedure; it cannot guarantee identical model behavior across vendors.
- Preview/build success does not prove each external client has been launched against the downloaded ZIP.
- `src/data/templateFilesData.ts` remains unconnected legacy data during the v2 transition; the active Harness v2 view must not import it.
