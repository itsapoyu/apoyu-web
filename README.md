# apoyu-web

Static site serving `apoyu.app` — landing page + legal policies.

## What's published here

| URL | Source | Required for |
|---|---|---|
| `apoyu.app/` | `index.html` | Interactive waitlist landing ("Today's Pull": egg hatch prologue + daily card reveal). No build step, no third-party dependencies; illustrated art layer in `art/` (see below) |
| `apoyu.app/privacy` | `privacy.md` | App Store Connect Privacy Policy URL (HARD BLOCKER for Beta App Review) |
| `apoyu.app/terms` | `terms.md` | Paywall subscription disclosure (App Store §3.1.2) |
| `apoyu.app/health-privacy` | `health-privacy.md` | Washington My Health My Data Act |
| `apoyu.app/support` | `support.md` | App Store Connect Support URL |
| `apoyu.app/trust` | `trust.md` | "What leaves your phone" positioning page (linked from landing; counsel C2 glance pending) |
| `apoyu.app/press` | `press.md` | Press kit page (placeholders in [BRACKETS] to fill before launch) |
| `apoyu.app/og.png` | `og.png` | Social share image referenced by index.html og:image |
| `apoyu.app/art/*` | `art/` | Illustrated background layer (6 JPGs, ~1.2 MB) mounted as decorative mask-feathered layers over the procedural night; the page degrades to the procedural-only version if any file is absent |

## Landing page (index.html)

- **Before launch:** set `WAITLIST_ENDPOINT` at the top of the inline script (empty = demo mode:
  stores the email in localStorage and shows the success state). Fill the `[BRACKETS]` in
  `trust.md` and `press.md`.
- **Card content:** archetype names and voice lines are verbatim from the app's Gold canon
  (`apoyu/apps/mobile/.../launch_voice_lines.json`). The daily card is date-seeded and communal.
- **Designer art contract:** every animated visual is a named slot (`#slot-egg`, `#slot-mascot`,
  `#slot-cardback`, `#slot-cardart`) whose JS states mirror Rive state-machine inputs. See the
  comment block at the top of index.html.
- **Debug hooks (safe in prod):** `#skiphatch` skips the egg prologue, `#reveal` jumps to the
  revealed card, `#autoplay` clicks the card after load, `#reveal-sharepreview` displays the
  generated 1080x1920 share PNG (layout per the share-card audit "The Pull" spec).
- **Illustrated art layer:** 6 JPGs in `art/` (dusk hero wide+tall, two night bands, dawn, card face), mounted as decorative mask-feathered layers over the procedural night; dawn art opacity is driven by the `dawnP` scroll value. Art plan + Leonardo prompts + §5 wiring/acceptance notes: `apoyu/docs/design/leonardo-web-background-prompts-2026-07-08.md`.
- **Design brief and research:** `apoyu/docs/research/landing-page-interactive-concepts-2026-07-06.md`.

Drafts live in the main repo at `apoyu/docs/legal/` and are copied here at publication time. Manual sync — when policies update, edit there, copy here, push.

## Deploy

GitHub Pages, deploy from branch `main`, root directory. Custom domain `apoyu.app` configured via DNS A records at the registrar (Spaceship.com).

## Updating a policy

1. Edit the draft in `apoyu/docs/legal/`
2. Update the effective date at the top of the policy body
3. Copy the file into this repo, commit, push
4. Verify the new version serves at the public URL
5. Tag the commit with `policy-YYYY-MM-DD` for rollback reference

## Version pinning

Every policy carries an `**Effective date:** YYYY-MM-DD` line at the top. The git history of this repo is the authoritative rollback path.

## Rollback

Identify the commit tag for the previous policy version. Revert or checkout that commit's version of the affected file. Republish via the deploy flow above. Bump the effective date forward (don't claim the policy retroactively reverted).
