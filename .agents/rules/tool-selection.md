# Tool Selection & MCP Routing Rules

## 1. Routing Strategy
- **File System & Code Inspection**: Use built-in fast file viewing, ripgrep search, and directory listing tools.
- **Execution & Build**: Run commands in project subdirectories with clean cwd isolation.
- **Web & Visual Verification**: Utilize Puppeteer MCP or Browser tools when visual layout, DOM inspection, or end-to-end user workflows need validation.
- **Specialized Tasks**: Delegate deep research or multi-file refactoring to dedicated subagents or procedural skills in `.agents/skills/`.
