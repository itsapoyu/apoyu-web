# apoyu-web

Static site serving `apoyu.app` — landing page + legal policies.

## What's published here

| URL | Source markdown | Required for |
|---|---|---|
| `apoyu.app/` | `index.md` | Marketing landing (placeholder for now) |
| `apoyu.app/privacy` | `privacy.md` | App Store Connect Privacy Policy URL (HARD BLOCKER for Beta App Review) |
| `apoyu.app/terms` | `terms.md` | Paywall subscription disclosure (App Store §3.1.2) |
| `apoyu.app/health-privacy` | `health-privacy.md` | Washington My Health My Data Act |
| `apoyu.app/support` | `support.md` | App Store Connect Support URL |

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
