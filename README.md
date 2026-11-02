# Finsplore plugin

[![check](https://github.com/Finsplore/finsplore-plugin/actions/workflows/check.yml/badge.svg)](https://github.com/Finsplore/finsplore-plugin/actions/workflows/check.yml)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

Skills and manifests that connect an AI assistant to your [Finsplore](https://finsplore.io) ledger, so you can ask about your accounts, spending, budgets, goals and net worth in plain language.

Finsplore is built for Australians. It gives **general information only**, not personal financial advice, and it **does not move money**.

> **Availability:** this plugin is not yet listed in any AI app's directory. The server address in the manifests is a placeholder until the Finsplore server is public, so the plugin cannot connect yet.

## Skills

Six ready-made skills cover the common jobs. You can also ask your own questions; the assistant reads your data through Finsplore's tools.

| Skill | What it does |
|---|---|
| `monthly-money-review` | A plain-language review of one month: income, spending by category, budgets, net worth, unusual transactions and goals. |
| `budget-check-in` | How you are tracking against your budgets this month, with the transactions behind any overspend. |
| `categorise-transactions` | Suggests categories for uncategorised transactions in batches and applies the ones you approve. |
| `goal-progress` | Where each savings goal stands, with the projected date and contribution history. |
| `fire-what-if` | Financial-independence readiness and what-if projections, with the assumptions stated. Projections, not guarantees. |
| `import-and-reconcile` | Imports CSV statement text into an account and reconciles it against a known bank balance. |

## How it works

```
AI app  --installs-->  this plugin (skills + server address)
   |
   |  OAuth sign-in, you approve the connection
   v
Finsplore MCP server  (private; no server code in this repo)
```

The plugin contains instructions and manifests only. Your data stays in Finsplore, and the assistant reads it through tools after you sign in and approve the connection.

## Safety

- A new connection is **read-only** unless you grant more.
- Every change an assistant asks for is a **proposal**. Nothing changes until it is approved.
- Some changes can only be approved by you, inside Finsplore.
- You can revoke a connected app at any time in Finsplore under **Settings > Connected AI**.
- Figures are computed by Finsplore and quoted as returned, not recalculated by the assistant.

See the [Privacy Policy](https://finsplore.io/legal/privacy-policy/) and [Terms of Service](https://finsplore.io/legal/terms-of-service/).

## Supported AI apps

One set of skills serves every app. Only the manifest differs.

| App | Manifest |
|---|---|
| Claude | `.claude-plugin/plugin.json` |
| ChatGPT and Codex | `.codex-plugin/plugin.json` |
| Cursor | `.cursor-plugin/plugin.json` |
| Perplexity | reads the Claude or Codex manifest |

Install instructions for each app will be added here when it is listed.

## Repository layout

```
skills/<name>/SKILL.md      one folder per skill, shared by every app
plugin.json                 open Agent Plugins manifest
mcp.json, .mcp.json         Finsplore MCP server address
.claude-plugin/             Claude manifest
.codex-plugin/              ChatGPT and Codex manifest
.cursor-plugin/             Cursor manifest
assets/logo.png             logo used by the manifests
scripts/check.mjs           validation script used by CI
AGENTS.md                   rules for people and AI agents (CLAUDE.md, GEMINI.md and
                            .github/copilot-instructions.md point to it)
```

## Development

The check validates the manifests, the skills and the repo content (secrets, private details, wording). It needs Node.js 18 or later and no install:

```sh
node scripts/check.mjs            # all sections
node scripts/check.mjs skills     # one section: manifests, skills or content
```

CI runs the same script on every pull request and on pushes to `main`.

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) before opening a pull request. Report security problems privately as described in [SECURITY.md](SECURITY.md), not as public issues.

## Licence and trademark

Code and text in this repo are licensed under [Apache-2.0](LICENSE). The licence does not grant the right to use the Finsplore name, logo or other trademarks.
