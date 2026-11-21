# Contributing
For team members.

## Environment variables

The server needs three access keys, one per employee interface.
It will not start if any of them is missing.

| Variable           | Interface          |
|--------------------|--------------------|
| `RECEPTIONIST_KEY` | `/front-desk`      |
| `SAFETY_KEY`       | `/race-control`    |
| `OBSERVER_KEY`     | `/lap-line-tracker`|

### Option 1: `.env` file (recommended for development)

Copy the example file and fill in your own keys:

```sh
cp .env.example .env
```

`.env` is loaded automatically by `npm start` and `npm run dev`.
It is in `.gitignore`, so **never commit it**.

### Option 2: export in the terminal

```sh
export receptionist_key=8ded6076
export observer_key=662e0f6c
export safety_key=a2d393bc
npm start
```

Exported values only last for the current terminal session.

### Good to know

- If a variable is set both in the terminal and in `.env`, the **terminal value wins**.
  If your `.env` changes seem to be ignored, run `unset <name>` or open a new terminal.
- Names are case-sensitive: `safety_key` and `SAFETY_KEY` are different variables.
- `npm run dev` uses the same keys, but the race timer lasts 1 minute instead of 10.

## Git hook: AI log reminder

This repo includes a pre-commit hook that reminds you to update `AI_LOG.md`.
If `AI_LOG.md` is not part of a commit, the hook asks whether you used AI:

- **y**: the commit is cancelled so you can add your log entry first.
- **n** (or anything else): the commit goes ahead.

### Setup (once per clone)

After cloning, run this from the project root:

```sh
git config core.hooksPath .githooks
```

This tells Git to use the hooks in `.githooks/` instead of the default `.git/hooks/`.
The setting is stored locally, so every team member needs to run it.
