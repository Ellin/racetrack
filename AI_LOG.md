# AI Log

**Template for log entries:**

```markdown
## <number>. <short title>

- **Asked:** what you asked AI to do.
- **Kept:** what you used as it was.
- **Changed or rejected:** what you changed or threw away, and why.
```
------------------------------------------------------------------------
## 5. JavaScript Array Methods and DOM Updates
- **Asked:** Explain how find(), some() work, how to validate duplicate values, and help debug race and driver management.
- **Kept:** Concepts of array methods, validation, and reusable function for displaying updated data.
- **Changed or rejected:** Rejected using nested loops and displaying data directly inside event listeners, chose a separate reusable function.

## 4. DOM Manipulation
- **Asked:** Explain how to dynamically create dropdown options using JavaScript, manage elements.
- **Kept:** updating dropdown options dynamically.
- **Changed or rejected:** Rejected rebuilding dropdown options using loops, preferring to update individual elements when data changes.

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
