# AI IDE Project Setup Prompt
## Codex + Claude Code + Antigravity Unified Project Structure

You are working inside an existing software project.

Your task is to inspect the current repository first, then create or update the project instruction structure so that the same project can be used efficiently with:

- OpenAI Codex
- Claude Code
- Google Antigravity

Do not blindly overwrite existing files.

---

# 1. Safety rules

Before changing anything:

1. Inspect the current project structure.
2. Detect whether any of the following already exist:
   - `AGENTS.md`
   - `CLAUDE.md`
   - `.agents/`
   - `.claude/`
   - `.codex/`
   - `docs/`
   - existing rule files
   - existing skills
   - existing project documentation
3. Preserve useful existing content.
4. If an existing file conflicts with this structure, merge carefully instead of deleting it.
5. Do not modify application source code unless required for the setup itself.
6. Do not change package dependencies.
7. Do not rename existing application folders without a strong reason.
8. Do not create duplicate documentation containing the same instructions.
9. Prefer one source of truth for shared project instructions.
10. After changes, show a concise summary of:
    - files created
    - files modified
    - files intentionally left unchanged
    - any conflicts or recommendations

---

# 2. Target architecture

Use this as the preferred structure.

```text
project-root/
│
├── AGENTS.md
├── CLAUDE.md
│
├── .agents/
│   ├── rules/
│   │   ├── frontend.md
│   │   ├── ui-design.md
│   │   └── testing.md
│   │
│   └── skills/
│       ├── plan-feature/
│       │   └── SKILL.md
│       ├── implement-feature/
│       │   └── SKILL.md
│       ├── debug/
│       │   └── SKILL.md
│       └── code-review/
│           └── SKILL.md
│
├── .claude/
│   ├── rules/
│   │   ├── frontend.md
│   │   ├── ui-design.md
│   │   └── testing.md
│   │
│   └── skills/
│       └── [Claude-specific skills or links to shared skills]
│
├── docs/
│   ├── architecture/
│   ├── plans/
│   ├── tasks/
│   ├── decisions/
│   └── reference/
│
├── src/
├── tests/
└── ...
```

Do not create `.codex/rules/` unless the project specifically needs Codex command execution / sandbox policy rules.

`.codex/rules/` is NOT the location for ordinary coding style, architecture, testing, or UI instructions.

---

# 3. Shared instruction strategy

The project must have ONE primary shared instruction file:

```text
AGENTS.md
```

Treat `AGENTS.md` as the project constitution and the main source of truth.

It should contain only durable, high-value project instructions that are useful across agents.

Recommended sections:

```markdown
# Project Overview

# Technology Stack

# Repository Structure

# Development Principles

# Coding Rules

# UI / UX Principles

# Testing and Verification

# Change Safety Rules

# Documentation Rules

# Task Execution Workflow

# Definition of Done
```

Keep `AGENTS.md` concise enough to be loaded frequently.

Do not fill it with temporary task details.

Do not duplicate large amounts of documentation already stored under `/docs`.

Instead, reference the appropriate documentation paths.

---

# 4. Codex configuration

Codex should primarily use:

```text
AGENTS.md
```

Use nested `AGENTS.md` files only when a particular subdirectory genuinely needs different or more specific instructions.

Example:

```text
project/
├── AGENTS.md
├── frontend/
│   └── AGENTS.md
└── backend/
    └── AGENTS.md
```

Do NOT create nested `AGENTS.md` files merely for symmetry.

Use them only if local rules differ meaningfully.

For reusable project skills, use:

```text
.agents/skills/<skill-name>/SKILL.md
```

Do not use `.codex/rules/` for ordinary project instructions.

---

# 5. Claude Code configuration

Create or update:

```text
CLAUDE.md
```

The preferred design is to make Claude consume the same shared project rules by importing `AGENTS.md`.

Use this pattern:

```markdown
@AGENTS.md

# Claude Code Specific Instructions

Follow the shared project instructions in `AGENTS.md`.

Follow applicable Claude-specific rules under `.claude/rules/`.

Use project documentation under `/docs` when relevant.

Do not duplicate shared rules here unless Claude requires tool-specific behavior.
```

Claude-specific detailed rules belong under:

```text
.claude/rules/
```

Examples:

```text
.claude/rules/frontend.md
.claude/rules/ui-design.md
.claude/rules/testing.md
```

Only place Claude-specific behavior there.

Do not copy the entire contents of `AGENTS.md` into these files.

---

# 6. Antigravity configuration

Antigravity should also rely on the root:

```text
AGENTS.md
```

for common project guidance.

Use:

```text
.agents/rules/
```

for Antigravity-specific workspace rules.

Examples:

```text
.agents/rules/frontend.md
.agents/rules/ui-design.md
.agents/rules/testing.md
```

Keep these files focused on Antigravity-specific rule behavior.

Do not duplicate shared rules already contained in `AGENTS.md`.

---

# 7. Shared skills strategy

Prefer to store reusable skills in:

```text
.agents/skills/
```

because this can serve as the shared skill source for Codex and Antigravity.

Create the following starter skills only if they are useful for this project:

```text
.agents/skills/
├── plan-feature/
│   └── SKILL.md
├── implement-feature/
│   └── SKILL.md
├── debug/
│   └── SKILL.md
└── code-review/
    └── SKILL.md
```

Each `SKILL.md` should be procedural rather than project-documentation-heavy.

A skill should explain HOW to perform a repeatable task.

Examples:

- how to plan a feature
- how to implement a feature safely
- how to debug a bug
- how to review a change
- how to validate UI behavior
- how to run project tests

Do not put long-term architecture documentation inside skills.

---

# 8. Claude skills

Claude Code uses:

```text
.claude/skills/
```

When practical, avoid maintaining duplicate copies of the same skill.

If the current operating system, repository workflow, and tooling make symbolic links appropriate and safe, `.claude/skills/` may reference shared skills from `.agents/skills/`.

However:

1. Do not create symlinks automatically if they could create portability problems.
2. Prefer compatibility across macOS, Windows, Git, CI, and other contributors.
3. If symlinks are not appropriate, create only Claude-specific skills under `.claude/skills/`.
4. Do not duplicate shared skills unless necessary.

---

# 9. Documentation architecture

Use `/docs` for persistent project knowledge.

Preferred structure:

```text
docs/
├── architecture/
├── plans/
├── tasks/
├── decisions/
└── reference/
```

## `docs/architecture/`

Describes the current system.

Examples:

```text
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/backend.md
docs/architecture/database.md
```

Do not create files for components that do not exist.

## `docs/plans/`

Contains implementation plans for significant upcoming work.

Do not use it for tiny tasks.

## `docs/tasks/`

Tracks active or completed work when persistent task tracking is useful.

A reasonable structure is:

```text
docs/tasks/current.md
docs/tasks/backlog.md
docs/tasks/completed/
```

Only create this if the project benefits from persistent task tracking.

## `docs/decisions/`

Stores significant architectural or technical decisions.

Use ADR-like files when appropriate.

Example:

```text
001-use-nextjs.md
002-auth-strategy.md
003-data-storage.md
```

## `docs/reference/`

Stores project-specific reference material that agents may need to consult.

---

# 10. Avoid `docs/rules/` as the primary rule system

Do not create:

```text
docs/rules/
```

as the main AI rule location unless the existing project already uses it intentionally.

The preferred rule locations are:

```text
AGENTS.md
CLAUDE.md
.agents/rules/
.claude/rules/
```

Use `/docs` for project knowledge, not duplicated agent instruction sets.

If an existing `docs/rules/` directory already exists:

1. inspect its contents;
2. identify which rules are genuinely shared and durable;
3. move or merge high-value common instructions into `AGENTS.md`;
4. move tool-specific rules into `.agents/rules/` or `.claude/rules/` when appropriate;
5. preserve historical/reference material under `/docs` if it still has value;
6. do not delete anything without understanding its purpose.

---

# 11. Starter content for AGENTS.md

Adapt this to the actual project after inspecting the repository.

Do NOT leave generic statements that are irrelevant.

```markdown
# Project Overview

Describe what this project does and who it serves.

# Technology Stack

List only technologies actually used in the repository.

# Repository Structure

Explain the important directories and their responsibilities.

# Development Principles

- Preserve existing architecture unless a change is justified.
- Prefer small, focused changes over broad rewrites.
- Reuse existing components, utilities, patterns, and conventions before creating new ones.
- Do not introduce new dependencies without a clear need.
- Avoid speculative abstractions.

# Coding Rules

- Follow the existing language and framework conventions.
- Keep functions and modules focused.
- Prefer readable code over clever code.
- Maintain type safety where applicable.
- Do not silently suppress errors.

# UI / UX Principles

- Preserve the established visual language.
- Keep interaction patterns consistent.
- Verify responsive behavior after UI changes.
- Consider accessibility for interactive elements.
- Avoid redesigning unrelated screens while implementing a focused feature.

# Testing and Verification

- Run the most relevant available checks after changes.
- Verify behavior, not only compilation.
- Fix regressions introduced by the current change.
- Do not claim success without verification.

# Change Safety Rules

- Inspect relevant existing code before editing.
- Do not delete working functionality unless explicitly required.
- Avoid unrelated refactoring during focused tasks.
- Preserve backward compatibility when practical.
- Clearly report assumptions and unresolved issues.

# Documentation Rules

Project documentation lives under `/docs`.

- `/docs/architecture/` describes the current system.
- `/docs/plans/` contains implementation plans.
- `/docs/tasks/` contains persistent task tracking when used.
- `/docs/decisions/` records important technical decisions.
- `/docs/reference/` contains useful reference material.

Read relevant documentation before major changes.

Update documentation when a significant architectural decision or persistent behavior changes.

# Task Execution Workflow

For non-trivial work:

1. inspect the relevant code and documentation;
2. understand current behavior;
3. make a concise plan;
4. implement the smallest coherent change;
5. run relevant verification;
6. review the diff;
7. update persistent documentation if required;
8. summarize what changed and any remaining risks.

# Definition of Done

A task is complete only when:

- the requested behavior is implemented;
- relevant tests or checks pass where available;
- obvious regressions have been checked;
- unnecessary unrelated changes are absent;
- persistent documentation is updated when necessary;
- remaining limitations are explicitly reported.
```

---

# 12. Starter skill: plan-feature

Create only if useful.

Path:

```text
.agents/skills/plan-feature/SKILL.md
```

Suggested content:

```markdown
# Plan Feature

Use this skill before implementing a significant feature.

## Procedure

1. Read `AGENTS.md`.
2. Inspect relevant project documentation.
3. Inspect the existing implementation.
4. Identify affected modules and dependencies.
5. Identify risks, edge cases, and compatibility constraints.
6. Define the smallest reasonable implementation scope.
7. Produce a step-by-step implementation plan.
8. Identify how the result will be verified.
9. Record a persistent plan under `/docs/plans/` only when the work is large enough to justify it.
```

---

# 13. Starter skill: implement-feature

Path:

```text
.agents/skills/implement-feature/SKILL.md
```

Suggested content:

```markdown
# Implement Feature

Use this skill when implementing an approved feature or plan.

## Procedure

1. Read `AGENTS.md`.
2. Read the relevant implementation plan if one exists.
3. Inspect affected files before modifying them.
4. Reuse existing patterns and components.
5. Implement the smallest coherent change.
6. Avoid unrelated refactoring.
7. Run relevant tests, type checks, linting, build steps, or manual verification.
8. Review the diff for accidental changes.
9. Update documentation if persistent behavior or architecture changed.
10. Summarize completed work, verification, and remaining limitations.
```

---

# 14. Starter skill: debug

Path:

```text
.agents/skills/debug/SKILL.md
```

Suggested content:

```markdown
# Debug

Use this skill to diagnose and fix defects.

## Procedure

1. Reproduce or clearly identify the failure.
2. Gather evidence before changing code.
3. Trace the relevant execution path.
4. Identify the root cause rather than only the visible symptom.
5. Check for related regressions.
6. Implement the smallest safe fix.
7. Verify the original failure no longer occurs.
8. Run relevant regression checks.
9. Avoid unrelated cleanup.
10. Explain the root cause and the fix.
```

---

# 15. Starter skill: code-review

Path:

```text
.agents/skills/code-review/SKILL.md
```

Suggested content:

```markdown
# Code Review

Review changes for correctness, regressions, maintainability, and consistency.

## Review order

1. Functional correctness
2. Regression risk
3. Data loss or security risk
4. Error handling
5. Type safety
6. Test coverage
7. Architecture consistency
8. Maintainability
9. UI / UX consistency where relevant
10. Documentation impact

Report concrete findings first.

Do not invent issues solely to produce a longer review.
```

---

# 16. Tool-specific rule files

Only create tool-specific rule files when they contain behavior that should NOT simply live in `AGENTS.md`.

For example:

```text
.agents/rules/ui-design.md
```

should contain Antigravity-specific UI rule behavior if needed.

```text
.claude/rules/ui-design.md
```

should contain Claude-specific UI rule behavior if needed.

If there is no real tool-specific difference, keep the shared rule only in `AGENTS.md`.

Empty or redundant rule files are worse than having fewer files.

---

# 17. Existing repository adaptation

Do not assume this is a greenfield project.

Inspect:

- package files
- framework configuration
- source directories
- tests
- README
- existing docs
- lint configuration
- formatting configuration
- CI
- environment files
- database configuration
- deployment configuration

Use these findings to customize `AGENTS.md`.

For example, do not say:

> Run npm test

unless that command actually exists.

Do not state:

> This project uses Next.js

unless the repository actually uses Next.js.

Do not invent architecture.

---

# 18. Final validation

Before finishing:

1. Verify that all created paths are valid.
2. Verify that `CLAUDE.md` imports `AGENTS.md`.
3. Verify that shared project instructions are not duplicated unnecessarily.
4. Verify that `.codex/rules/` was not created for ordinary coding instructions.
5. Verify that `.agents/skills/` uses valid `SKILL.md` files.
6. Verify that documentation reflects the actual repository.
7. Verify that no application code was unintentionally changed.
8. Show the final directory tree for all AI-related files.
9. Explain any decisions where you intentionally deviated from this template.

---

# 19. Desired result

The final setup should follow this principle:

```text
                         AGENTS.md
                   shared source of truth
                    /        |        \
                   /         |         \
              Codex     Antigravity    Claude
                           |             |
                   .agents/rules   .claude/rules
                           |
                  .agents/skills
                   /            \
                Codex       Antigravity

Claude:
CLAUDE.md -> @AGENTS.md
.claude/skills/ -> Claude-specific skills or carefully shared equivalents

Persistent project knowledge:
docs/
```

Optimize for:

- minimal duplication
- clear ownership
- reliable automatic discovery
- maintainability
- safe AI-assisted development
- compatibility across Codex, Claude Code, and Antigravity

Now inspect the current repository and apply this structure carefully.
