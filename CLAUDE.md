@AGENTS.md

# Claude Code Specific Instructions

Follow the shared project instructions in `AGENTS.md`.

- Follow Claude-specific rules under `.claude/rules/`.
- Use the Harness-managed Core 6 mirrors under `.claude/skills/`; `.agents/skills/` remains the shared canonical procedure set.
- Stay in the current Claude Code workflow unless the user explicitly requests a cross-client handoff.
- Treat MCP recommendations as documentation, not proof of a live connection. Preserve client-local permissions and credentials outside the repository.
- Consult persistent project documentation under `/docs` and reconcile it with current code before relying on it.
