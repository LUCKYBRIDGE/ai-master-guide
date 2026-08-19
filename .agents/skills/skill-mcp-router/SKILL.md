# Skill: Intelligent Skill & MCP Router (skill-mcp-router)
> Purpose: Analyze task intent and dynamically route to optimal procedural skills, subagents, or MCP tools.

## Routing Rules
- **UI/Visual Testing**: Route to Puppeteer MCP or Browser tool.
- **Complex New Feature**: Route to `plan-feature` -> `implement-feature` -> `code-review`.
- **Unexpected Error / Build Failure**: Route to `debug`.
- **Large Context / Long Session**: Route to `session-context-compactor`.
- **Test Generation**: Route to `tdd-test-generator`.
