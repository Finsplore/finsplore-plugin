# Contributing

Thanks for helping. This repo holds the Finsplore plugin: skills and manifests for AI apps. It does not hold the Finsplore server.

## Before you start

- Read [AGENTS.md](AGENTS.md). It lists the rules for both people and AI agents.
- For a big change, open an issue first so we can agree on the approach.
- Security problems go through [SECURITY.md](SECURITY.md), not a public issue.

## Making a change

1. Fork the repo and create a branch.
2. Keep the change to one concern.
3. Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, for example `feat(skills): add a budget check-in skill`.
4. Open a pull request against `main` and fill in the template.

## What we will not accept

- Secrets, tokens, `.env` files or private hostnames.
- Server code.
- Per-platform copies of skill text. Platform differences belong in the manifests.
- Claims about Finsplore that the product does not support, or anything that reads as personal financial advice.

## Licence

By contributing you agree that your contribution is licensed under Apache-2.0, the same as the rest of the repo.
