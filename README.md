# Finsplore plugin

Connect your AI assistant to your [Finsplore](https://finsplore.io) ledger, so you can ask about your accounts, spending, budgets, goals and net worth in plain language.

Finsplore is built for Australians. It gives **general information only**, not personal financial advice, and it **does not move money**.

> **Status: being set up.** This repo has its licence, community and AI-agent files. The skills, plugin manifests and install steps are not published yet, so there is nothing to install today. Nothing has been submitted to any marketplace.

## What you will be able to ask

The plugin ships ready-made skills for common jobs:

| Skill | What it does |
|---|---|
| Monthly money review | A plain-language review of one month: income, spending by category, budgets, net worth, unusual transactions and goals. |
| Budget check-in | How you are tracking against your budgets this month, with the transactions behind any overspend. |
| Categorise transactions | Suggests categories for uncategorised transactions in batches and applies the ones you approve. |
| Goal progress | Where each savings goal stands, with the projected date and contribution history. |
| FIRE what-if | Financial-independence readiness and what-if projections, with the assumptions stated. Projections, not guarantees. |
| Import and reconcile | Imports CSV statement text into an account and reconciles it against a known bank balance. |

You can also ask your own questions. The assistant uses Finsplore's tools to read your data.

## How it works

```
Your AI app  --installs-->  this plugin (skills + a pointer to the server)
     |
     |  signs in with OAuth, you approve
     v
Finsplore MCP server  (separate, private; this repo has no server code)
```

- The plugin holds **instructions and a manifest only**.
- Your data stays in Finsplore. The assistant reads it through tools after you sign in and approve the connection.

## Safety

- A new connection is **read-only** unless you grant more.
- Every change an assistant asks for is a **proposal**. Nothing changes until it is approved.
- Some changes can only be approved by you, inside Finsplore.
- You can revoke a connected app in Finsplore under Settings > Connected AI.
- Figures are computed by Finsplore and quoted as returned, not recalculated by the assistant.

## Planned platforms

| Platform | What we plan to publish | Status |
|---|---|---|
| Claude | Connector (the server listing) and plugin | Not submitted |
| ChatGPT and Codex | Plugin | Not submitted |
| Cursor | Plugin | Not submitted |
| Grok Build | Plugin | Not submitted |
| Perplexity | Connector; users import the plugin themselves | Not submitted |
| Gemini CLI | Plugin (extension) | Not submitted |
| Antigravity | Plugin | Not submitted |
| GitHub Copilot | Plugin | Not submitted |

Install steps for each will appear here once it is published.

## Repo contents

| Path | Purpose | Exists |
|---|---|---|
| `AGENTS.md` | Rules for AI tools and people working in this repo. | Yes |
| `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md` | Point Claude Code, Gemini CLI and Copilot at `AGENTS.md`. | Yes |
| `CONTRIBUTING.md`, `SECURITY.md`, `.github/` templates | How to contribute and report problems. | Yes |
| `LICENSE` | Apache-2.0. | Yes |
| `skills/<name>/SKILL.md` | The skills. One folder each, the same for every platform. | Planned |
| `plugin.json`, `mcp.json`, `.mcp.json` | The open-standard manifest and the server address. | Planned |
| `.claude-plugin/`, `.cursor-plugin/`, `.codex-plugin/` | Per-platform manifests. | Planned |
| `assets/`, `scripts/` | Logos, and checks for manifests and skills. | Planned |

Every AI tool working on this repo reads the same rules from [`AGENTS.md`](AGENTS.md). Edit that file for rule changes; the others only point to it.

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Report security problems privately as described in [SECURITY.md](SECURITY.md), not as public issues.

## Licence and trademark

Code and text in this repo are licensed under [Apache-2.0](LICENSE). The licence does not give you the right to use the Finsplore name, logo or other trademarks.
