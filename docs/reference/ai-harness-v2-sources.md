# AI Development Harness v2 — compatibility sources

## Audit scope

- Verified: 2026-08-24
- Goal: let Codex, Claude Code, and Google Antigravity work from the same project contract, design source, reusable skills, and selected MCP capabilities while preserving each client's native discovery paths and security model.
- Active website sources:
  - `src/components/SystemHarnessEngineeringView.tsx`
  - `src/data/aiHarnessV2Data.ts`
  - `src/components/DesignPreExtractionView.tsx`

## Design rule

The harness does **not** claim that one physical config file is natively consumed by all three products.

It uses:

1. canonical project sources;
2. thin client-specific adapters;
3. exact skill mirrors only where the native skill path differs;
4. a normalized MCP manifest rendered into each client's current project/workspace syntax.

Model selection, trust, sandboxing, auto-approval, and real credentials stay client-local.

## Codex

### Project instructions

- OpenAI describes Codex project instructions as aggregated from `AGENTS.md` (and configured fallback filenames) from the project root toward the current working directory.
- Sources:
  - https://openai.com/index/unrolling-the-codex-agent-loop/
  - https://github.com/openai/codex/blob/main/codex-rs/core/src/agents_md.rs

Harness mapping: canonical contract `AGENTS.md`.

### Skills

- Current repository skill path: `.agents/skills/<skill>/SKILL.md`.
- Skill discovery uses YAML metadata including `name` and `description`.
- Sources:
  - https://github.com/openai/codex
  - https://github.com/openai/skills

Harness mapping: canonical skill source `.agents/skills/`.

### Project MCP

- Current Codex configuration supports project `.codex/config.toml` for trusted repositories.
- MCP definitions use `[mcp_servers.<name>]` and support stdio fields such as `command`, `args`, `env`, and `env_vars`.
- Sources:
  - https://github.com/openai/codex
  - https://github.com/openai/skills/blob/main/skills/.curated/migrate-to-codex/references/differences.md

Harness mapping: generated adapter `.codex/config.toml`.

The generator intentionally omits model, reasoning, sandbox, trust, and approval defaults.

## Claude Code

### Project instructions

- Claude Code automatically reads repository `CLAUDE.md`.
- `CLAUDE.md` supports file imports with `@path`.
- Sources:
  - https://support.claude.com/en/articles/14553240-give-claude-context-claude-md-and-better-prompts
  - https://docs.anthropic.com/en/docs/claude-code/memory

Harness mapping: `CLAUDE.md` imports `@AGENTS.md` and contains only Claude-specific adapter guidance.

### Skills

- Project skills live under `.claude/skills/<skill>/SKILL.md`.
- Sources:
  - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
  - https://support.claude.com/en/articles/14553413-claude-code-cheatsheet

Harness mapping: canonical source `.agents/skills/`, exact generated mirror `.claude/skills/`.

### Project MCP

- Project-scope MCP config uses repository-root `.mcp.json` with an `mcpServers` object.
- Source: https://docs.anthropic.com/en/docs/claude-code/mcp

Harness mapping: generated adapter `.mcp.json`.

## Google Antigravity

### Workspace rules

- Current workspace rules live in `.agents/rules/`.
- Antigravity rules can reference other files with `@` mentions.
- Sources:
  - https://antigravity.google/docs/ide-rules
  - https://antigravity.google/docs/rules-workflows/

Harness mapping: `.agents/rules/project-context.md` references root `AGENTS.md` and `DESIGN.md`. Users should verify/enable its activation mode in the installed client; the package does not bypass client activation controls.

### Skills

- Current workspace skills live in `.agents/skills/<skill>/SKILL.md`.
- A skill uses `SKILL.md` with discovery metadata including `description`.
- Source: https://antigravity.google/docs/skills/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`.

### Workspace MCP

- Current workspace MCP config lives in `.agents/mcp_config.json`.
- Stdio entries use `command`/`args`/`env`; current remote entries use `serverUrl`.
- Sources:
  - https://antigravity.google/docs/mcp
  - https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: generated adapter `.agents/mcp_config.json`.

## DESIGN.md

- Google Labs open-sourced the draft DESIGN.md specification on 2026-04-21.
- Current format status is `alpha`.
- The format combines optional YAML frontmatter for normative machine-readable tokens with a Markdown body for human-readable rationale and guidance.
- Sources:
  - https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
  - https://github.com/google-labs-code/design.md
  - https://github.com/google-labs-code/design.md/blob/main/docs/spec.md

Harness mapping:
- canonical design source: root `DESIGN.md`;
- `docs/design/` is supplemental implementation documentation rather than a second token source;
- AI Master Guide does not add `@google/design.md` as a dependency. The optional `npx @google/design.md lint DESIGN.md` command is documentation only.

## Included MCP presets

### Microsoft Playwright MCP

- Current standard command: `npx @playwright/mcp@latest`.
- Sources:
  - https://github.com/microsoft/playwright-mcp
  - https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-mcp.md

Harness default: selected because it requires no project credential and supports real browser QA.

### GitHub official MCP server

- Official Docker image: `ghcr.io/github/github-mcp-server`.
- Read-only mode can be enabled with `GITHUB_READ_ONLY=1`.
- Codex can forward a host environment variable with `env_vars`; the generated Codex adapter uses that mechanism for `GITHUB_PERSONAL_ACCESS_TOKEN`.
- Source: https://github.com/github/github-mcp-server

Harness default:
- optional, not selected by default;
- generated example uses read-only mode;
- actual token values are never embedded in generated files.

## Known limits

- Product paths and schemas can change; re-check these sources before future structural updates.
- An adapter file being present does not prove the user's installed client trusts or activates it.
- The harness standardizes durable project context and selected capabilities; it cannot guarantee identical model behavior across vendors.
- Preview/build success does not prove each external client has been launched against the downloaded ZIP. A real cross-client smoke test remains the strongest validation.
- `src/data/templateFilesData.ts` is retained as unconnected legacy data during the v2 transition; the active harness view must not import it.