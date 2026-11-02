# Finsplore plugin

The Finsplore plugin lets an AI app work with your Finsplore ledger: accounts, transactions, budgets, goals and net worth. Finsplore is built for Australians. It gives **general information only**, not personal financial advice, and it does not move money.

> **Status: being set up.** This repo currently holds licence, community and AI-agent files. The skills, plugin manifests and install steps are not published yet, so there is nothing to install today.

## What this repo is

- A **plugin**: skills (plain-text instructions) plus a manifest that tells an AI app where the Finsplore MCP server is.
- One repo for many AI platforms: Claude, Cursor, ChatGPT and Codex, Grok Build, Perplexity, Gemini CLI, Antigravity and GitHub Copilot.
- **Not** the Finsplore server. The server, sign-in and tools are in a separate private repo.

## Files for AI agents and contributors

Every AI tool that works on this repo reads the same rules, from `AGENTS.md`.

| File | Who reads it | What it is |
|---|---|---|
| [`AGENTS.md`](AGENTS.md) | Codex, Cursor, Copilot, Gemini CLI, Claude Code and other tools | The rules for working in this repo. The single source of truth. |
| [`CLAUDE.md`](CLAUDE.md) | Claude Code | One line that imports `AGENTS.md`. |
| [`GEMINI.md`](GEMINI.md) | Gemini CLI | One line that imports `AGENTS.md`. |
| [`.github/copilot-instructions.md`](.github/copilot-instructions.md) | GitHub Copilot | Points at `AGENTS.md`. |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | People | How to propose a change. |
| [`SECURITY.md`](SECURITY.md) | People | How to report a vulnerability privately. |
| [`.github/pull_request_template.md`](.github/pull_request_template.md) | People | The pull-request checklist. |
| [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE) | People | Bug report form, and a link to private security reporting. |
| [`LICENSE`](LICENSE) | Everyone | Apache-2.0. |

Edit `AGENTS.md` for rule changes. The other agent files only point to it.

## Planned contents

| Path | Purpose |
|---|---|
| `skills/<name>/SKILL.md` | The skills, one folder each. Same for every platform. |
| `plugin.json`, `mcp.json`, `.mcp.json` | The open-standard manifest and the server URL. |
| `.claude-plugin/`, `.cursor-plugin/`, `.codex-plugin/` | Per-platform manifests. |
| `assets/` | Logos. |
| `scripts/` | Checks for manifests and skills. |

These do not exist yet.

## Installing

Install steps for each AI app will be added here when the plugin is published.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). Do not report security problems as public issues.

## Licence and trademark

Code and text in this repo are licensed under [Apache-2.0](LICENSE). The licence does not give you the right to use the Finsplore name, logo or other trademarks.
