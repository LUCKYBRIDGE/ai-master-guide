# Tool Selection & Capability Rules

- Prefer built-in file, search, execution, browser, Git, and connector capabilities that are actually available in the current client/session.
- Use a project skill directly when the task clearly matches it. Core workflow transitions do not require a routing skill.
- Treat MCP recommendation documents and empty config examples as documentation only; they are not availability signals.
- Do not assume Puppeteer, Playwright, GitHub, filesystem, database, or any other MCP is connected. Verify availability before use.
- Stay in the current AI client by default. Move work to another client only when the user explicitly requests a handoff.
- Do not install, authenticate, or widen external permissions without explicit user intent.
