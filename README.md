# apoyu-web

The public static site at `apoyu.app`: the landing page, the legal pages and support.

Plain static files. The legal pages are plain HTML on one stylesheet with no JavaScript. The home page is the Sep 2 2026 landing (collectible card hero), self contained in `index.html` with its art, the Fredoka subset, the ported CollectibleCardV3 and the vendored Rive runtime under `art/`. No external fonts, no CDNs, no analytics, no build step, no forms. `.nojekyll` tells GitHub Pages to serve the files as they are.

## What is published

| URL | File | Source of truth (main repo `itsapoyu/apoyu`) | State |
|---|---|---|---|
| `apoyu.app/` | `index.html`, `art/`, `og.png` | The Sep 2 landing from branch `review/landing-page-recovery` (restored 2026-11-23). Membership and device copy from `docs/launch/app-store-listing.md`: Apoyü Membership, 14 day trial, no free plan, no prices, Apple Watch worn to sleep | No waitlist: there is no signup backend |
| `apoyu.app/privacy` | `privacy.html` | Privacy policy v2, as published here on 2026-08-19 (commit `5169da4`) | **In effect since 2026-08-19.** Cited in App Store Connect. Text unchanged; one line at the top links the draft |
| `apoyu.app/privacy-draft` | `privacy-draft.html` | `docs/site/privacy.html` (from `docs/legal/drafts/privacy-policy-v3-draft.md`) | Draft, pending counsel review, not yet in effect |
| `apoyu.app/terms` | `terms.html` | `docs/site/terms.html` (from `terms-of-service-v3-draft.md`) | Draft, pending counsel review |
| `apoyu.app/health-privacy` | `health-privacy.html` | `docs/site/health-privacy.html` (from `health-data-disclosure-v3-draft.md`) | Draft, pending counsel review |
| `apoyu.app/support` | `support.html` | `docs/site/support.html` (from `support-page-draft.md`) | Draft banner, as in the source |
| (any missing page) | `404.html` | Hand written here | |
| | `styles.css` | `docs/site/styles.css` (Banked Hearth palette) | |

GitHub Pages serves `privacy.html` at both `/privacy.html` and `/privacy`, so the extensionless URLs used in App Store Connect and in the app keep working.

## How a legal page changes

Legal wording is owned by counsel and edited in the main repo, never here.

1. The change lands in the main repo: the Markdown draft in `docs/legal/drafts/` first, then the matching page in `docs/site/`, in the same PR (rules in `docs/site/README.md` there).
2. Copy the changed `docs/site/` file here byte for byte (`cmp` should report no difference), in a PR. Do not edit legal text in this repo.
3. The desk reviews the screenshots and merges. Pages deploys from `main` within a minute or two.
4. Tag the merge commit `<page>-YYYY-MM-DD` (for example `privacy-2026-12-01`) so every published version can be found again.

## Going from draft to in effect

Only after the items in the main repo's `docs/legal/drafts/README-legal-status.md` §3 to §5 are done (counsel review, effective dates, operator identity):

1. In the main repo, remove the draft banner and set the effective dates in the Markdown and in `docs/site/`.
2. Here, copy the final `docs/site/privacy.html` over `privacy.html`, keep the old policy reachable at a dated URL (for example `privacy-2026-08-19.html`), and remove `privacy-draft.html` or make it redirect to `/privacy`.
3. Copy the final terms, health privacy and support pages.

Never edit a published policy without moving its effective date forward, and never backdate one.

## Checking a change

Every page at a 390 pixel wide window and at desktop width: no sideways scroll on the page (wide tables scroll inside their own box), one `h1`, every link resolves, axe reports no WCAG A or AA issues. Copy rules for anything written here: no em dashes or en dashes, no hyphen ranges ("2 to 4"), Apoyü with the ü in display text, plain and warm.

## Hosting

GitHub Pages, deploy from branch `main`, root folder. Custom domain `apoyu.app` (the `CNAME` file), DNS A records at the registrar. Do not add trackers or third party scripts without a desk decision.
