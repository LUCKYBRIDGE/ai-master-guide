# Security & Secret Isolation Policy

## 1. Secret Hygiene
- **Never Hardcode Secrets**: API keys, tokens, passwords, and private certificates must NEVER be committed to Git.
- **Environment Variables**: Load secrets from `.env` files or runtime environment variables.
- **Template Provided**: Every project must maintain a sanitized `.env.example` with dummy placeholders.

## 2. Git Hygiene
- Ensure `.gitignore` explicitly ignores:
  - `.env`, `.env.local`, `.env.*.local`
  - `*.pem`, `*.key`, `*.pfx`
  - `node_modules/`, `dist/`, `build/`, `coverage/`
- Before pushing or committing, verify `git status` to ensure no secret or build artifact is staged.
