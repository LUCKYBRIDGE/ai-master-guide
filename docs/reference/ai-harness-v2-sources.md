# AI Development Harness v2 — compatibility sources

## Audit scope

- Verified: 2026-08-24
- Goal: let Codex, Claude Code, and Google Antigravity work from the same project contract, design source, and reusable skills while preserving each client's native discovery paths and security model.
- Active website sources:
  - `src/components/SystemHarnessEngineeringView.tsx`
  - `src/data/aiHarnessV2Data.ts`
  - `src/components/DesignPreExtractionView.tsx`

## Current design rule

The Harness does **not** claim that one physical config file is natively consumed by all three products.

It uses:

1. canonical project sources;
2. thin client-specific adapters;
3. exact Skill mirrors only where the native Skill path differs;
4. minimal client config skeletons without pre-populated MCP servers;
5. a human-readable root `MCP_추천_목록.md` containing recommendations and official links only;
6. a default `capability-router` Skill that selects among capabilities actually available in the current session.

Model selection, trust, sandboxing, auto-approval, external-service authentication, destructive-command permissions, MCP credentials, and MCP write permissions stay client-local.

## Codex

### Project instructions

- OpenAI documents Codex project instructions through `AGENTS.md`, including hierarchical discovery from project/root context toward the working directory.
- Sources:
  - https://developers.openai.com/codex/guides/agents-md
  - https://openai.com/index/unrolling-the-codex-agent-loop/

Harness mapping: canonical contract `AGENTS.md`.

### Skills

- Current repository Skill path: `.agents/skills/<skill>/SKILL.md`.
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

Harness mapping: always include a comment-only valid `.codex/config.toml` skeleton, but do **not** pre-populate any MCP server, model, sandbox, approval, trust, or credential setting.

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

Harness mapping: canonical source `.agents/skills/`, exact generated mirror for Harness-managed Skills under `.claude/skills/`. The sync helper does not delete unrelated Claude-only Skills.

### Project MCP

- Project-scope MCP config uses repository-root `.mcp.json` with an `mcpServers` object.
- Source:
  - https://docs.anthropic.com/en/docs/claude-code/mcp

Harness mapping: include a valid empty `.mcp.json` with `"mcpServers": {}`. Users add only the MCP servers their project actually needs.

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
- Source:
  - https://antigravity.google/docs/skills/

Harness mapping: Antigravity directly consumes canonical `.agents/skills/`.

### Workspace MCP

- Current workspace MCP config lives in `.agents/mcp_config.json`.
- Sources:
  - https://antigravity.google/docs/mcp
  - https://antigravity.google/docs/cli/gcli-migration/

Harness mapping: include a valid empty `.agents/mcp_config.json` with `"mcpServers": {}`. Users add external servers in their own workspace when needed.

## Capability router Skill

`capability-router` is included by default because the portable project may later be opened in clients with very different tool inventories.

The Skill must:

1. inspect the Skills, MCP tools, and built-in tools actually available in the current session;
2. prefer a matching project Skill for repeatable procedure;
3. use an MCP only when it is actually connected and materially useful;
4. treat `MCP_추천_목록.md` and empty config skeletons as reference/configuration hints, not availability signals;
5. continue with built-in tools or a safe manual workflow when no suitable MCP is connected;
6. never install, authenticate, or grant external-service access unless the user explicitly requests it;
7. respect each client's approval and least-privilege boundary for external writes or destructive actions.

This design remains valid when zero MCP servers are connected.

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

## MCP recommendation document

The generated root file is `MCP_추천_목록.md`. It is not an install manifest.

### Microsoft Playwright MCP

- Purpose: browser automation and browser-based UI verification.
- Current package/project: `@playwright/mcp`, Microsoft Playwright MCP.
- Sources:
  - https://github.com/microsoft/playwright-mcp
  - https://github.com/microsoft/playwright/blob/main/docs/src/getting-started-mcp.md

### GitHub official MCP server

- Purpose: repository, Issue, Pull Request, and related GitHub workflows when a user intentionally connects GitHub.
- Source:
  - https://github.com/github/github-mcp-server

The recommendation document tells users to configure authentication and repository permissions themselves and to prefer read-only/minimum privilege when possible.

### Context7 MCP

- Purpose: retrieve current library, framework, SDK, and API documentation when version freshness matters.
- Sources:
  - https://github.com/upstash/context7
  - https://context7.com

The Harness does not claim that Context7 is installed merely because it appears in the recommendation document.

## Generation boundaries

Always generated:
- `AGENTS.md`
- `CLAUDE.md`
- `DESIGN.md`
- `MCP_추천_목록.md`
- `.codex/config.toml` with no MCP server entries
- `.mcp.json` with an empty `mcpServers` object
- `.agents/mcp_config.json` with an empty `mcpServers` object
- `.agents/rules/project-core.md`
- selected canonical Skills under `.agents/skills/`
- exact Harness-managed Claude mirrors under `.claude/skills/`
- durable `docs/` structure and Harness documentation
- Skill sync/validation helpers

Never generated by the Harness:
- actual MCP server entries
- real tokens or credentials
- account authorization
- model defaults
- sandbox/approval/trust bypasses
- destructive-command permissions

The generator checks for duplicate output paths before ZIP creation. The validation helper verifies that the JSON MCP skeletons remain empty and that Codex config contains no `[mcp_servers.*]` block.

## Known limits

- Product paths and schemas can change; re-check these sources before future structural updates.
- A config or adapter file being present does not prove the user's installed client trusts or activates it.
- An MCP recommendation does not prove the server is installed, connected, authenticated, or authorized.
- The Harness standardizes durable project context and reusable procedure; it cannot guarantee identical model behavior across vendors.
- Preview/build success does not prove each external client has been launched against the downloaded ZIP.
- `src/data/templateFilesData.ts` remains unconnected legacy data during the v2 transition; the active Harness v2 view must not import it.
