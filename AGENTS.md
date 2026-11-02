# Finsplore plugin: instructions for AI coding agents

This file is read by Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot and any other tool that supports `AGENTS.md`. `CLAUDE.md`, `GEMINI.md` and `.github/copilot-instructions.md` point here. Edit this file, not those.

## What this repo is

The public home of the Finsplore **plugin**: a bundle of skills (plain-text instructions) and a manifest that tells an AI app where the Finsplore MCP server is. One repo serves many AI platforms (Claude, Cursor, ChatGPT and Codex, Grok Build, Perplexity, Gemini CLI, Antigravity, GitHub Copilot).

It is **not** the Finsplore server. The MCP server (`/mcp`), OAuth and all tools live in a separate private repo and are not copied here.

Finsplore is for Australian users, uses their personal-finance ledger, and gives general information only. It does not give personal financial advice and does not move money.

## Current state

The six skills, the manifests for Claude, Cursor and ChatGPT/Codex, and the check script exist. The MCP server address in `mcp.json` and `.mcp.json` is a placeholder (`mcp.finsplore.invalid`) until the server is public. Logos (`assets/`), Gemini CLI and Antigravity files do not exist yet. Do not describe planned files as if they exist.

## Layout

```
skills/<name>/SKILL.md      one folder per skill, the source of truth
plugin.json                 open Agent Plugins standard manifest
mcp.json, .mcp.json         the MCP server URL (keep both, with the same URL)
.claude-plugin/             Claude manifest
.cursor-plugin/             Cursor manifest
.codex-plugin/              ChatGPT and Codex manifest
scripts/check.mjs           the one CI check (run: node scripts/check.mjs)
assets/                     logos (planned)
```

Keep `name` and `version` identical in every manifest. Change the server URL in both `mcp.json` and `.mcp.json` together.

## Rules

1. **This repo is public.** Never commit secrets, tokens, `.env` files, private hostnames, customer or user data, Jira or QA notes, or anything copied from the private server repo that is not meant to be public.
2. **No server code.** Do not add API, OAuth or tool-handler code.
3. **One skills folder for every platform.** Do not fork skill text per platform. Put platform differences in the manifests.
4. **Skills are plain instructions.** No claims that cannot be backed by a tool the server really provides. Money figures are computed by Finsplore and quoted as returned.
5. **Keep the wording honest.** General information only, Australia only, no advice, no money movement. Do not add marketing claims.
6. **Do not invent URLs, versions or sizes.** If a value is unknown, leave a clear `TODO` and tell the maintainer.
7. **Licence:** Apache-2.0. The licence does not grant the right to use the Finsplore name or logo (see the README).
8. **Manifests must stay valid.** Run `node scripts/check.mjs` before you finish. It needs no install.

## Commits and pull requests

- Use Conventional Commits: `feat(skills): ...`, `fix(manifest): ...`, `docs: ...`, `chore: ...`.
- Do not add AI attribution trailers (such as `Co-Authored-By`) to commits.
- Default branch is `main`. Follow the pull-request template.
- Keep a change to one concern. Mention any platform whose manifest changed.

## Where to look

- [README.md](README.md): what the plugin is and how to install it.
- [CONTRIBUTING.md](CONTRIBUTING.md): how people contribute.
- [SECURITY.md](SECURITY.md): how to report a vulnerability.
