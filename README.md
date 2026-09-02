# apoyu-web

Static site serving `apoyu.app` — landing page + legal policies.

## What's published here

| URL | Source | Required for |
|---|---|---|
| `apoyu.app/` | `index.html` | Mobile-first landing experience in five beats (hero, today's pull, the daily loop, the collection, trust + conversion). No build step, no framework, no third-party runtime dependency; art, cards and the Fredoka subset live in `art/` |
| `apoyu.app/privacy` | `privacy.md` | App Store Connect Privacy Policy URL (HARD BLOCKER for Beta App Review) |
| `apoyu.app/terms` | `terms.md` | Paywall subscription disclosure (App Store §3.1.2) |
| `apoyu.app/health-privacy` | `health-privacy.md` | Washington My Health My Data Act |
| `apoyu.app/support` | `support.md` | App Store Connect Support URL |
| `apoyu.app/trust` | `trust.md` | "What leaves your phone" positioning page (linked from landing; counsel C2 glance pending) |
| `apoyu.app/press` | `press.md` | Press kit page (placeholders in [BRACKETS] to fill before launch) |
| `apoyu.app/og.png` | `og.png` | Social share image referenced by index.html og:image |
| `apoyu.app/art/*` | `art/` | `art/cards/` the real collectible art (9 WebP, 214 KB), `art/font/fredoka-var.ttf` the app's Fredoka subset (41 KB, weight axis only), and 5 environment WebPs used as low-opacity atmosphere. WebP only; the JPG twins were removed. The page degrades to the procedural substrate if any art file is absent |

## Landing page (index.html)

- **🔴 Before launch:** set `WAITLIST_ENDPOINT` at the top of the inline script. Empty is DEMO MODE:
  the form validates, then answers "Preview mode. The signup backend is not connected yet. Nothing
  was submitted." It sends nothing, stores nothing, and never shows the real success state, so a
  reviewer is never told they joined a list that does not exist. Publishing while it is empty still
  drops every signup, it just no longer pretends otherwise. Also fill the `[BRACKETS]` in
  `trust.md` and `press.md`.
- **Visual source of truth is the app, not this repo's history.** The ground reproduces the app's
  Banked Hearth substrate (`GradientBackdrop`): the same plum-to-ember stops, hearth glow from
  below, corner vignette, 0.025 film grain and rising sparks. Type is the app's Fredoka, subset to
  Latin with the weight axis kept. Tokens are mirrored from `apps/mobile/src/constants/theme.ts`.
- **The collectible grammar** is the app's, three independent channels: comfort = material,
  archetype = art/world, rarity = finish. Their independence is load-bearing, so nothing on the
  page may imply that high recovery produces high rarity.
- **Card content:** archetype names, rarities and voice lines are verbatim from the app's Gold
  canon (`apoyu/apps/mobile/.../launch_voice_lines.json`). Card art is the app's
  `collectible-v3-posters`, resized to WebP. Today's pull is date-seeded on a local-date key.
- **Beats:** hero, today's pull, the daily loop (call, card, dare), the collection rail, trust +
  conversion, then three FAQ accordions. `/press` is deliberately NOT linked while the press kit
  still carries placeholders.
- **Debug hooks (safe in prod, no visible controls):** `#reveal` opens with today's card already
  flipped, `#collection` jumps to the rail, `#cta` jumps to the conversion block, `#calm` forces
  the reduced-motion presentation for review.
- **Motion:** card float, rarity sweep, card flip, ambient sparks, scroll-in. All CSS-driven and
  GPU-composited, with no requestAnimationFrame loop. `prefers-reduced-motion` settles everything
  and drops the sparks. Scroll-in is opt-in and carries a failsafe, so motion can never leave
  content hidden.

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
