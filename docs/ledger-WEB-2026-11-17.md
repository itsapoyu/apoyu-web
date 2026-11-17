# Ledger: lane WEB, desk #24, 2026-11-17

Branch `web/qa-ledger` (never merged; it holds this ledger, QA screenshots and the QA tools so nothing internal is served on apoyu.app).

## Inputs
- Main repo `itsapoyu/apoyu` at `7120d42` (read only): `docs/site/`, `docs/legal/drafts/`, `docs/launch/app-store-listing.md`, CLAUDE.md, APOYU_DECISIONS 2026-11-15 (AP-159 = A, Watch required).
- apoyu-web `main` at `5169da4` before this lane.

## Desk calls (desk #24, 2026-11-17)
- D1: `/privacy` keeps serving the in-effect v2 policy (2026-08-19) with its text unchanged, plus one line at the top: "An updated policy is being prepared. Read the draft." The v3 draft goes to `/privacy-draft`, with its banner and Pending date as in docs/site. Terms and health privacy: v3 as in docs/site. Swapping v3 into `/privacy` comes in a later PR with no banner, after counsel review. Daryll may overrule.
- D2: no prices on the landing page. The legal and support source text is copied word for word, including the support FAQ price line ($49.99 / $7.99 "in the US"). That line is reported in the PR body, with no upstream change.
- PR shape: (1) static site from docs/site, (2) landing, (3) QA.

## PR sequence and state
| # | Branch | PR | Head | State |
|---|---|---|---|---|
| 1 | `web/static-site` | #2 | `151cb19` | open, awaiting desk |
| 2 | `web/landing` (base `web/static-site`) | #3 | `4427595` | open, awaiting desk |
| 3 | `web/qa` (base `web/landing`) | #4 | `76d91e2` | open, awaiting desk |

Merge order: #2, then #3, then #4. Retarget each to `main` after the one below it merges.

## Findings to carry
- **Drift upstream, the Markdown drafts lag the HTML** (the main repo rule says the Markdown wins; here the HTML is newer and correct):
  - `support-page-draft.md` "What do I need" still says "(or another device that writes heart rate variability...)". `docs/site/support.html` has the AP-159 Watch-required text (main repo #1173). Fix the draft upstream.
  - `health-data-disclosure-v3-draft.md` lacks the "heartbeat series, if granted" wording that `docs/site/health-privacy.html` has (main repo #1079, AP-049), in two places. Fix the draft upstream.
  - Other differences are expected: internal notes dropped, straight vs curly quotes, `---` rules.
- **A11y (fixed in #4, still needs the same change upstream):** axe `scrollable-region-focusable` (serious) on `.table-wrap` at 390px in privacy, privacy-draft, terms and health-privacy. Fix: `tabindex="0" role="region" aria-label="..."` on the wrapper. This is markup only, but it touches docs/site copies, so it also needs the same upstream fix to keep them byte-identical.
- Links from the draft pages to `privacy.html` land on the in-effect v2 policy, which links to the draft. This is intended under D1.
- The interim `index.html` in PR 1 is replaced by PR 2.
- `tools/v2page.py` does not add the table region attributes. If `privacy.html` is ever regenerated, re-apply them (see #4) or add them to the script.
- Lighthouse 12.2.1 mobile: 100 in all four categories on all six pages (`lighthouse/summary.txt`). Re-run: `npm i lighthouse@12.2.1`, `node tools/lh.js <site>` (port 8765), `CHROME_PATH=/opt/pw-browsers/chromium npx lighthouse http://127.0.0.1:8765/<page> --chrome-flags="--headless --no-sandbox"`.

## Remaining (not this lane, or needs a GO)
- Upstream in the main repo: sync the two Markdown drafts to the HTML, and add the table region markup to docs/site.
- Later PR, after counsel: v3 to `/privacy` with no banner, v2 to a dated URL, effective dates set (README "Going from draft to in effect").
- App Store badge and link once the app has a URL.

## How to re-run QA
`npm i axe-core@4.10.2` next to `tools/qa.js`, then `node tools/qa.js <apoyu-web checkout> <outdir>`. It serves the folder locally (with extensionless URLs and 404 handling), checks each page at 390 and 1280 for no sideways scroll, one h1, `lang`, img alt, axe WCAG A/AA plus best practice, internal links and in-page anchors, and writes the screenshots.
