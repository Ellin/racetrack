# AI Log

**Template for log entries:**

```markdown
## <number>. <short title>

- **Asked:** what you asked AI to do.
- **Kept:** what you used as it was.
- **Changed or rejected:** what you changed or threw away, and why.
```
------------------------------------------------------------------------
## 3. Instructions for configuring environment variables
- **Asked:** Write docs for configuring environment variable.
- **Kept:** Added the new instructions to CONTRIBUTING.md.

## 2. Configure npm start
- **Asked:** How to read environment variables from an environment file.
- **Kept:** Configuring npm start to use variables from .env file.

## 1. AI_LOG
- **Asked:** Create git commit hook for reminding to use the AI_LOG and also documenting the hook set up for team members.
- **Kept:** Written content for docs and main hook logic.
- **Changed or rejected:** Changed hook to prompt user if AI was used, cancelling the commit if AI was used but not logged. Original version reminded but immediately proceeded with the commit even if the log should have been used. Also moved the git hook setup docs into CONTRIBUTING.md instead of the main README.md since it's for contributing team members only. 
