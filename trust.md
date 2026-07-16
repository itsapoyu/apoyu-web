---
layout: page
title: What leaves your phone
---

<!-- Copy of record: apoyu/docs/launch/apoyu-app-site-content-2026-07-06.md §2.
     Counsel note (C2 pass): this page is positioning, not the privacy policy, and links to it.
     Placeholders in [BRACKETS] to fill before launch. -->

# What leaves your phone

This page is the plain accounting. It is written to be checked, not believed.

**Stays on your phone, always:** the raw overnight readings. Intra-night heart rate samples, beat to
beat variability readings, resting heart rate samples, sleep stages, respiratory readings, workout
raw data. These are read from Apple Health on the device, processed on the device, and never
uploaded. There is no server copy. If Apoyu shut down tomorrow, there would be no trove of your raw
readings anywhere to sell, leak, or subpoena, because it never existed.

**Syncs to our servers:** the small derived results. The day's recovery score and comfort band, which
card you pulled (name and rarity), your dares and whether you kept them, your settings, your
subscription state. This is what makes your collection and your monthly record work across
reinstalls. It is the least we can store and still keep your shelf.

**How the reading happens.** The overnight math runs in a native package on the phone. Your score is
computed against your own recent baseline, which also lives on the phone. The server's job is to
remember small results and to ask a language model to phrase Apoyü's commentary. The model providers
receive only derived values, never raw readings.

**Who we work with**

| Service | Why | What it receives |
|---|---|---|
| Supabase | Accounts, storage, server functions | The derived results listed above |
| OpenAI and Anthropic | Phrasing Apoyü's briefings, dares, and card commentary | Recovery score, archetype id, intensity level. Not used for training or tracking; not retained beyond the request |
| RevenueCat | Purchase processing | App Store receipt state |
| Sentry | Crash reporting | Error reports, scrubbed of tokens and personal metadata before sending |

No ad networks. No analytics brokers. No data sales, ever.

**Deleting your account** removes your server data and revokes the Apple sign-in token. The raw
readings were never here; they remain wherever Apple Health keeps them, under your control.

**Check us.** The on-device claim is falsifiable: watch the network traffic. A technical write-up of
the pipeline is here: [build story link]. Questions to [privacy@apoyu.app]; we answer.

---

Apoyu is a general wellness app, not a medical device. It does not diagnose, treat, or prevent any
condition. For ages 13 and up.

[Privacy](/privacy) · [Terms](/terms) · [Health Data Privacy](/health-privacy) · [Support](/support)
