# Security policy

## Reporting a vulnerability

Please do not open a public issue for a security problem.

Report it privately through GitHub: open the **Security** tab of this repository and choose **Report a vulnerability**.

Include what you found, where (file or manifest), and how to reproduce it. We will acknowledge your report and keep you updated.

## What is in scope

This repository holds skills (instructions) and plugin manifests only. Examples of in-scope problems:

- A skill or manifest that could make an AI app leak a user's data, or act without the user's approval.
- A manifest that points at the wrong server or an untrusted address.
- A secret, token or private detail committed by mistake.
- Anything in the repo that could mislead a user about what Finsplore does with their data.

## What is out of scope here

The Finsplore server, its sign-in (OAuth) and its tools are not in this repository. If your finding is about the server or the app, report it the same way and say so. We will route it.

## If you find a secret in this repo

Report it privately as above. Do not copy or use it. We will rotate it and remove it from history.

## Supported versions

Only the latest commit on `main` and the latest release are supported.
