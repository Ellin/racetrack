# Contributing
For team members.

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