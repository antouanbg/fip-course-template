# Instructions for the agent

Read this file at the start of every session. Keep it short and correct; update it when the project changes.

## Project
<!-- One or two sentences: what this repository is. From Exercise 2 on, link SPEC.md. -->
Course workspace for "Fundamentals of Internet Programming" (TU-Sofia). Exercise 1 is a single static page in `ex1/` that calls a public JSON API with `fetch()`. The project (Exercises 2–5) will live in the repository root; see `SPEC.md` once it is written.

## Commands
<!-- How to install, run, test. Keep these exact and working. -->
- Install: `cd ex1 && npm install`
- Run: `cd ex1 && npm start` (serves index.html on port 8080)
- Test: `node checks/ex1.mjs`

## Conventions
<!-- Folder layout, naming, where business rules live, how errors are returned. -->
- Exercise 1: one file, `ex1/index.html`; vanilla JavaScript only — no libraries, frameworks or CDN scripts.
- Keep existing element ids, names and structure; change only what the task asks for.
- Errors are shown to the user in the page (`.error` class), never only in the console.
- Comments may be in Bulgarian or English.

## Always ask before
- deleting files or folders
- installing or removing dependencies
- rewriting a whole file when a small change was asked for
- pushing, tagging or changing CI
- anything that touches secrets or `.env`

## Never
- commit secrets, passwords or API keys
- weaken or delete a test or a check to make it pass
- write the parts the exercise says the student writes by hand (Exercise 1, Part A)
