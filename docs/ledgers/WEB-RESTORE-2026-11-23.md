# WEB-RESTORE ledger, 2026-11-23

Lane WEB-RESTORE for merge desk 29. Ruling: apoyu.app shows the Sep 2 designed landing (collectible card hero), not the plain static page from 36944b3.

## Done

- Serving model: static, as on main (`.nojekyll`, no Jekyll). The Sep 2 `index.html` becomes the home page; `art/` and `og.png` come from `review/landing-page-recovery` unchanged. The Jekyll `_config.yml` and the `.md` pages from that branch are not brought over: main's static legal pages stay byte for byte (privacy v2 in effect with the draft link, privacy-draft, terms, health-privacy, support, 404, favicons, CNAME, .nojekyll).
- Removed `assets/landing.css` (only the replaced home page used it).
- Copy fixes on the home page:
  - Removed "Daily recovery is free", "Pro is optional" and the "free forever" FAQ. Added the Apoyü Membership block: yearly or monthly, 14 day free trial for eligible new subscribers, no free plan, no prices (App Store shows the price), Archive Mode when membership ends.
  - Says Apoyü requires an Apple Watch worn to sleep (hero, meta description, What you need, new FAQ).
  - Trust paragraph now uses the wording on main (what is saved, what the AI services see) and links `health-privacy.html`; `/trust` does not exist on main, so that link is gone.
  - "15-minute" is now "15 minute". No dashes in visible text, titles, alt text or aria labels (checked from the rendered page).
- Waitlist removed: the email form, the floating "Get early access" pill and all form and localStorage code. Nothing on the page collects anything.
- Footer links use `.html` (same as main's pages), plus the support email and ages 13+.
- Collection rail gets `tabindex="0"` (axe scrollable-region-focusable).

## Checked

- Served locally (`python3 -m http.server`), Playwright at 390x844 and 1280x800 with reduced motion, every page: horizontal overflow 0, axe WCAG 2.0/2.1 A and AA: no violations, no failed requests. Hero specimen mounts with Rive (`data-specimen=rive`).
- Screenshots in `docs/pr-shots/restore-card-hero/`: full page for home and 404, first screen for each legal page. Read by eye.

## Open for the desk

- Could not read `itsapoyu/apoyu` `docs/launch/app-store-listing.md`: attaching that repository was refused in this session. Membership and device wording comes from main's home page (36944b3), which was written from that listing on Nov 17. One deliberate difference: main said "your first full morning is on us, with no subscription needed"; I left that out because the ruling says no free plan. Put it back if the listing still says it.
- "53 cards in the launch deck" and "Never sold, never used to train models" are kept from the Sep 2 page as written; worth one check against the current app and privacy policy.

## Desk 29 review, round 2

- Desk confirmed from itsapoyu/apoyu `docs/launch/app-store-listing.md` line 99 that the one preview morning stays (it is the Membership law's preview, not a free plan). Restored "Your first full morning is on us, start to finish, with no subscription needed." in the Membership section and in the "Do I need a subscription?" answer.
- "53 cards" changed to "Over 50 cards in the launch deck." (the manifest count drifts).
- "Never sold, never used to train models" and "Ages 13 and up" confirmed by the desk; kept.
- Re-took all screenshots; checks re-run.
