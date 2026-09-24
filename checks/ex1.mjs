// Exercise 1 self-check: is the page built, is the agent work evidenced?
//   node checks/ex1.mjs
// Checks STRUCTURE, not quality: it cannot tell whether the page works in a browser.
// The разбор at the end of the exercise decides the mark.
import { check, filled, read, report, section } from './lib.mjs';

/** table rows under a heading whose second cell is filled in (header and separator rows skipped) */
const filledRows = (body) =>
  (body ?? '')
    .split('\n')
    .filter((l) => /^\s*\|/.test(l) && !/^\s*\|\s*-{2,}/.test(l))
    .slice(1)
    .map((l) => l.split('|').map((c) => c.trim()))
    .filter((cells) => cells.length > 2 && cells[2].length > 0);

const html = read('ex1/index.html');
check('ex1/index.html exists', html !== null, 'the template ships one, work in it');

if (html) {
  const script = (html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) ?? []).join('\n');
  const header = (html.match(/<header[\s\S]*?<\/header>/i) ?? [''])[0];
  const footer = (html.match(/<footer[\s\S]*?<\/footer>/i) ?? [''])[0];

  // Part A — by hand
  check('A1 · header carries your name', header.length > 0 && !/<h1>Frontend ↔ Backend Communication<\/h1>\s*<\/header>/.test(header), 'the <h1> still has the template text; add your name and faculty number');
  check('A2 · an image and a link to the API docs', /<img\b/i.test(html) && /<a\b[^>]*href=["']https?:\/\/api\.chucknorris\.io/i.test(html), 'add <img src="https://picsum.photos/200"> and <a href="https://api.chucknorris.io">');
  check('A3 · a footer with the year', footer.length > 0 && (/20\d\d/.test(footer) || /getFullYear/.test(html)), 'add <footer> with the current year (typed or via new Date().getFullYear())');
  check('A4 · Network observations are written', filledRows(section(read('ex1/README.md'), 'A4 · Network')).some((cells) => cells.some((c) => /^\d{3}$/.test(c))), 'fill the A4 table in ex1/README.md: method, URL, status, Content-Type');

  // Part B — with the agent, reviewed by you
  const comments = [...script.matchAll(/\/\/(.*)$/gm), ...script.matchAll(/\/\*([\s\S]*?)\*\//g)].map((m) => m[1]).join(' ').replace(/\s+/g, ' ');
  check('B1 · your own explanation is in a comment', /\b(fetch|await)\b/i.test(comments) && /(Promise|обещани|отговор|response|JSON)/i.test(comments) && comments.length > 300, 'write 3–4 sentences in a comment: what fetch() returns, why two awaits, what happens on click');
  check('B2 · the request is inside try/catch', /\bfetch\s*\(/.test(script) && /\btry\s*\{[\s\S]*?\bawait\b[\s\S]*?\}\s*catch\b/.test(script), 'wrap the awaited request in try { … } catch (err) { … }');
  check('B2 · the HTTP status is checked (response.ok)', /\.ok\b/.test(script), 'fetch does not throw on 404: check response.ok yourself');
  check('B2 · error scenarios are recorded', filledRows(section(read('ex1/README.md'), 'B2 · Error scenarios')).length >= 3, 'fill the three rows of the B2 table in ex1/README.md');
  check('B3 · the button is disabled while loading', /\.disabled\s*=\s*true/.test(script) && /finally/.test(script), 'set btn.disabled = true before the request and restore it in finally');
  check('B3 · the history list exists', /id=["']history["']/i.test(html), 'add <ul id="history"> and prepend each joke to it');
  check('vanilla JS only: no external scripts or frameworks', !/<script[^>]*\bsrc=/i.test(html) && !/jquery|axios|react|vue|angular/i.test(html), 'remove CDN scripts and libraries; fetch() needs none');
  check('data is rendered with textContent, not innerHTML', !/\.innerHTML\s*=\s*(?!["'`]{2})/.test(script) || /textContent/.test(script), 'API data is untrusted: build elements and set textContent');

  if (/encodeURIComponent/.test(script) && /jokes\/search/.test(script)) console.log('note  B4 · search is implemented (optional in class, required if assigned as homework)');
  else console.log('note  B4 · search not found yet (optional in class, required if assigned as homework)');
}

const readme = read('ex1/README.md');
check('How to run is written', filled(section(readme, 'How to run')).length >= 1, 'the exact command that serves your page');
check('the prompt experiment is written', filled(section(readme, 'Prompt experiment')).length >= 1, 'three sentences: what changed when you removed the constraints');
check('the reflection is written', filled(section(readme, 'Reflection')).filter((l) => !/:\s*$/.test(l) && l.length > 25).length >= 2, 'answer at least two of the three questions in your own words');

const log = read('AGENT_LOG.md');
check('AGENT_LOG.md has at least one entry', (log ?? '').includes('## ') && filled(log).length > 4, 'one entry per agent session: goal, delegated, checkpoints, went wrong, changed by hand');
const usage = read('USAGE.md');
check('USAGE.md has at least one row', ((usage ?? '').match(/^\|\s*\d{4}-\d{2}-\d{2}/gm) ?? []).length >= 1, 'one row per session');

report('Exercise 1 · frontend ↔ backend with an agent');
