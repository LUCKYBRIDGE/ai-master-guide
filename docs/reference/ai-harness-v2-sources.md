# AI Development Harness v2 — compatibility sources

## Audit scope

- Verified: 2026-08-24
- Goal: let Codex, Claude Code, and Google Antigravity work from the same project contract, design source, reusable skills, and optionally selected MCP capabilities while preserving each client's native discovery paths and security model.
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
4. an optional normalized MCP manifest rendered into each client's current project/workspace syntax.

Model selection, trust, sandboxing, auto-approval, destructive-command permissions, and real credentials stay client-local.

The default package is valid with **no MCP selected**. MCP manifest/config files are generated only when at least one MCP capability is selected.

## Codex

### Project instructions

- OpenAI documents Codex project instructions through `AGENTS.md`, including hierarchical discovery from project/root context toward the working directory.
- Sources:
  - https://developers.openai.com/codex/guides/agents-md
  - https://openai.com/index/unrolling-the-codex-agent-loop/

Harness mapping: canonical contract `AGENTS.md`.

### Skills

- Current repository skill path: `.agents/skills/<skill>/SKILL.md`.
- Skills use `SKILL.md` with discovery metadata such as `name` and `description`.
- Sources:
  - https://developers.openai.com/codex/skills
  - https://github.com/openai/skills

Harness mapping: canonical skill source `.agents/skills/`.

### Project MCP

- Codex configuration can use project `.codex/config.toml` in trusted projects.
- MCP definitions use `[mcp_servers.<name>]` and support stdio fields such as `command`, `args`, and environment forwarding.
- Sources:
  - https://developers.openai.com/codex/mcp
  - https://developers.openai.com/codex/config-reference

Harness mapping: optional generated adapter `.codex/config.toml`, emitted only when MCP is selected.

The generator intentionally omits model, reasoning, sandbox, trust, and approval defaults.

## Claude Code

### Project instructions

- Claude Code reads project `CLAUDE.md` context.
- `CLAUDE.md` supports file imports with `@path`.
- Sources:
  - https://docs.anthropic.com/en/docs/claude-code/memory
  - https://docs.anthropic.com/en/docs/claude-code/settings

Harness mapping: `CLAUDE.md` imports `@AGENTS.md` and contains only Claude-specific adapter guidance.

### Skills

- Project skills live under `.claude/skills/<skill>/SKILL.md`.
- Sources:
  - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
  - https://docs.anthropic.com/en/docs/claude-code/slash-commands

Harness mapping: canonical source `.agents/skills/`, exact generated mirror `.claude/skills/`.

### Project MCP

- Project-scope MCP config uses repository-root `.mcp.json` with an `mcpServers` object.
- Source:
  - https://docs.anthropic.com/en/docs/claude-code/mcp

Harness mapping: optional generated adapter `.mcp.json`, emitted only when MCP is selected.

## Google Antigravity

### Workspace rules

- Current workspace rules live in `.agents/rules/`.
- Antigravity rules can reference other files with `@` mentions.
- Sources:
  - https://antigravity.google/docs/ide-rules
  - https://antigravity.google/docs/rules-workflows/

Harness mapping: `.agents/rules/project-core.md` references root `AGENTS.md` and `DESIGN.md`. Users must still configure/verify rule activation in the installed client; the package does not bypass client activation or trust controls.

### Skills

- Current workspace skills live in `.agents/skills/<skill>/SKILL.md`.
- A skill uses `SKILL.md` with discovery metadata including `description`.
- Source:
  - https://antigravity.google/docs/skills/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`.

### Workspace MCP

- Current workspace MCP config lives in `.agents/mcp_config.json`.
- Stdio entries use `command`/`args`/`env`; remote entries use client-specific server URL fields.
- Sources:
  - https://antigravity.google/docs/mcp
  - https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: optional generated adapter `.agents/mcp_config.json`, emitted only when MCP is selected.

## DESIGN.md

- Google Labs open-sourced the draft DESIGN.md specification on 2026-04-21.
- Current format status is `alpha`.
- The format combines optional YAML front matter for machine-readable design tokens with a Markdown body for rationale and guidance.
- Sources:
  - https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
  - https://github.com/google-labs-code/design.md
  - https://github.com/google-labs-code/design.md/blob/main/docs/spec.md

Harness mapping:
- canonical design source: root `DESIGN.md`;
- `docs/design/` is supplemental implementation documentation rather than a second token source;
- AI Master Guide does not add `@google/design.md` as a dependency. Optional lint usage remains documentation-only.

## Included MCP presets

### Microsoft Playwright MCP

- Current standard command: `npx @playwright/mcp@latest`.
- Sources:
  - https://github.com/microsoft/playwright-mcp
  - https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-mcp.md

Harness default: **not selected**. The user opts in when browser automation is needed.

### GitHub official MCP server

- Official Docker image: `ghcr.io/github/github-mcp-server`.
- Read-only mode can be enabled with `GITHUB_READ_ONLY=1`.
- Codex can forward a host environment variable through its MCP config; the generated Codex adapter uses the environment-variable name rather than embedding a token value.
- Source:
  - https://github.com/github/github-mcp-server

Harness default:
- optional, not selected by default;
- generated example uses read-only mode;
- actual token values are never embedded in generated files.

## Generation boundaries

Always generated:
- `AGENTS.md`
- `CLAUDE.md`
- `DESIGN.md`
- `.agents/rules/project-core.md`
- selected canonical skills under `.agents/skills/`
- exact Claude mirrors under `.claude/skills/`
- durable `docs/` structure and Harness documentation
- sync/validation helpers

Generated only when at least one MCP is selected:
- `docs/ai-harness/mcp-manifest.json`
- `.codex/config.toml`
- `.mcp.json`
- `.agents/mcp_config.json`
- `.env.example` only when a selected MCP requires environment variables

The generator checks for duplicate output paths before ZIP creation.

## Known limits

- Product paths and schemas can change; re-check these sources before future structural updates.
- An adapter file being present does not prove the user's installed client trusts or activates it.
- The harness standardizes durable project context and selected capabilities; it cannot guarantee identical model behavior across vendors.
- Preview/build success does not prove each external client has been launched against the downloaded ZIP. A real cross-client smoke test remains the strongest validation.
- `src/data/templateFilesData.ts` remains unconnected legacy data during the v2 transition; the active Harness v2 view must not import it.
