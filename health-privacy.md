---
layout: page
title: Health Data Privacy (Washington)
permalink: /health-privacy
---

> **DRAFT, pending legal review.** Supplementary notice for Washington consumers under the My Health My Data Act (Chapter 19.373 RCW). Generated from a codebase audit and is not legal advice. Pending counsel review before publication.

**Effective date:** [YYYY-MM-DD, TBD before publication]
**Last updated:** [YYYY-MM-DD, TBD before publication]

This one page does three jobs: (A) the wellness and medical disclaimer, (B) a plain description of your health data, and (C) the Consumer Health Data Privacy Policy for Washington's My Health My Data Act.

---

# Part A. Wellness notice and medical disclaimer

**Apoyü is a general wellness app, not a medical device.** It does not diagnose, treat, cure, or prevent any disease or condition, and nothing it shows you is medical advice. It has not been evaluated, cleared, or approved by the FDA or any other regulator, because products in its category (general wellness and fitness) are not required to be.

**What the score is.** Your recovery score is a wellness signal computed on your device from your own recent baselines. It estimates readiness for training. It says nothing about your health status, and it can be wrong: sensors miss data, devices differ, and algorithms have limits. The app tells you when its confidence is low instead of pretending.

**What the Daily Call is.** The Daily Call (push, hold, ease, or rest) is general fitness guidance produced by fixed rules from your own data. It adjusts the intensity of training you already chose for yourself. It never prescribes exercises, medical actions, or treatment, and it cannot know about injuries, illnesses, medications, or conditions you have not told a professional about. You decide what your body does.

**What the soreness check-in is.** The soreness check-in (fresh, usual, sore, wrecked) is an observation you make about yourself. The app never treats it as a symptom, never uses injury or diagnostic language, and never screens you for any condition.

**When the app mentions a doctor.** On mornings when your readings are unusually low, the app may suggest checking in with your doctor. That line is a generic, automatic prompt, not a medical assessment, a diagnosis, or a detection of anything.

**Membership never changes safety.** Whether you are in your preview morning, a trial, a membership, or Archive Mode, the recovery algorithm and every health or safety line it can produce work exactly the same way.

**Talk to a professional.** Consult a physician before beginning or intensifying an exercise program, especially if you have or suspect a medical condition, are pregnant, or are returning from injury. Never disregard professional medical advice, or delay seeking it, because of anything in Apoyü.

**Emergencies.** If you think you have a medical emergency, call your local emergency number immediately. Do not rely on this app.

---

# Part B. Your health data, plainly

Three sentences describe the whole data design. Everything else on this page is detail.

1. **Your individual readings never leave your phone.** Apoyü reads Apple Health data (heart rate variability, resting heart rate, heart rate, sleep, respiratory rate, blood oxygen, steps, active energy, distance, workouts, mindfulness sessions, and, if granted, date of birth and biological sex) and processes it on the device. Sample-level data, intra-night series, and raw workout streams are never uploaded. There is no server copy of your raw readings to leak, sell, or subpoena, because it does not exist.
2. **Per-day results are stored in your private account.** That means the daily recovery score, its component statistics, and the daily summary values behind it (average overnight HRV in milliseconds, resting heart rate in beats per minute, sleep duration and quality, respiratory rate, training load), plus your workouts, your cards and their mint receipts, and your nudges and whether you kept them. This is what makes your history and collection survive a reinstall, and it all stays yours in Archive Mode. Your soreness check-in, your goal, and the Daily Call stay on your phone.
3. **To write your daily coaching, the day's derived values, a short recent history, and your first name go to our AI providers** (Anthropic and OpenAI). They receive the score, summary values, the day's call and its reason, your intensity level, your first name, and a short recent history (recent workouts, nudges, day tags, scores, and past briefs) so the coaching stays continuous. When they write the words on a card, they also receive that card's saved mint receipt and can only describe what it says. They never receive individual readings. They do not train on your data, and we ask them not to keep it.

One write, nothing else: when you spend a minute or more in an in-app breathing exercise, Apoyü saves a single mindfulness session covering that time to Apple Health so your mindful minutes count. That is the only thing Apoyü ever writes to Apple Health.

In Archive Mode, Apoyü does not run a new daily reading, so nothing new from that day goes to the AI providers.

You can check sentence 1 yourself by watching the app's network traffic. We consider that a feature.

---

# Part C. Consumer Health Data Privacy Policy

This part explains what consumer health data Apoyü collects, how we use it, who receives it, and how you exercise your rights under Washington's My Health My Data Act ("MHMDA," Chapter 19.373 RCW). We honor these rights for anyone who asks, not only Washington residents. It supplements our [general Privacy Policy](https://apoyu.app/privacy). Where the two overlap for consumer health data covered by MHMDA, this part controls.

Apoyü is operated by Daryll Cheng, a sole proprietor doing business as Apoyu ("Apoyü," "we," "our," or "us"). This notice is written in plain language, as RCW 19.373.020(2) requires. If anything is unclear, email support@apoyu.app and we will explain it.

## 1. Who this policy is for

Anyone who uses Apoyü. We publish it to comply with the Washington My Health My Data Act, which protects Washington residents, and we apply it to everyone. Apoyü is for people aged 13 and older.

## 2. Categories of consumer health data we collect

"Consumer health data" under MHMDA means personal information linked or reasonably linkable to you that identifies your past, present, or future physical or mental health status. We describe our collection in two groups: data that stays on your device, and data our servers store.

### 2.1 Data that stays on your device and is not stored on our servers

Read from Apple HealthKit with your explicit permission, processed locally, stored only in encrypted local storage on your iPhone, and cleared when you delete your account:

- Heart rate variability readings (SDNN, milliseconds)
- Resting heart rate readings (beats per minute)
- Heart rate samples
- Sleep stage and sleep duration samples
- Respiratory rate readings
- Blood oxygen (SpO2) readings, if available
- Step count, active energy, and walking, running, and cycling distance samples
- Raw workout sensor data from any connected device
- Mindfulness session records
- Date of birth and biological sex, if granted (date of birth never leaves the device; see 2.2 for the coarse age band that does)
- Rolling per-metric baselines (the personal averages and variability statistics the algorithm builds)

Also kept only on your device:

- Your soreness check-in (fresh, usual, sore, or wrecked), if you answer it
- Your goal, if you set one: its type, free-text label, event date, and any training plan details
- The Daily Call (push, hold, ease, or rest) and its reason

When the app asks for your daily brief, it sends the day's call and its reason, the soreness word, the goal type, and a coarse training phase (for example "taper" or "race day") with the request. Our server checks them, uses them to phrase that day's brief, and does not save them. Section 5 shows which of them reach the AI providers.

### 2.2 Consumer health data we receive and store on our servers

Computed on your device and synced so the app can keep your daily record, collection, and history:

- Daily recovery score (0 to 100) and comfort word (for example "Cloud," "Cardboard," "Concrete")
- Confidence level and data availability flags
- Component z-scores, weightings, and the per-day baseline statistics used in that day's computation (derived statistics, never raw measurements)
- Daily summary health values: average overnight HRV (milliseconds), resting heart rate (beats per minute), sleep duration, sleep efficiency, deep sleep percentage, sleep quality score, respiratory rate, and training load
- A coarse age band (a decade range, never your date of birth) and biological sex, where granted, held in an internal algorithm calibration record
- Card records, including the stat block shown on each card (score, HRV, sleep duration, deep sleep, resting heart rate, training load, steps, active energy, sleep quality), plus a mint receipt frozen with each new card: which completeness gate minted it (its commit reason), the model versions and thresholds it minted under, the archetype and rarity component scores and confidence, the typed derived facts behind them (load and recovery bands, streak and pattern lengths, signals that agreed; always per-day derived values, never raw readings or sample series), any edition marks, and a seed for the card's visual finish
- Workout metadata: type, start and end time, duration, distance, pace, and the reporting app's name (never raw sensor streams), plus an opaque HealthKit workout identifier used only to avoid syncing the same workout twice
- An internal calibration and research record of your derived daily values (the same per-day summary values above, their z-scores, and, for users who connect a Garmin account, that day's Garmin wellness summary), used to check and improve the recovery algorithm. It holds derived values only, never raw samples, and is not sent to the AI providers.
- Today's Nudge records (stored as evening dares), whether you kept each one, and how that was checked (a matching workout, a breathing session, the next morning's sleep, or your own tap); badges and streak counts; tags you attach to a day
- Personality quiz choices from onboarding
- App open timestamps (to learn your typical wake time for scheduling notifications on your device) and a re-engagement flag
- A pseudonymous service quality log of AI generations (see Section 6), keyed to a one-way hashed identifier

The recovery score, z-scores, and summary values are derived wellness indicators, not clinical measurements. We declare them as consumer health data out of caution because Washington's definition is broad.

Legacy note: an earlier version of the app collected a "daily training intention." That feature was removed. No new intention data is collected, and any legacy records are deleted with your account.

### 2.3 Account and operational data linked to your consumer health data

- Apple account identifier (opaque ID from Sign in with Apple)
- Email address (typically an Apple relay address)
- The name you choose to be called, if you provide one
- Internal user identifier (UUID)
- Membership status, plan, trial and renewal events (through RevenueCat), the local date of your one preview morning, and whether your account earned the Founding Keeper mark. None of these is health data, and none of them changes how your health data is processed.

### 2.4 Categories we do not collect

- Raw biometric samples or timestamped readings on our servers
- Precise or coarse location
- Advertising identifiers (including IDFA)
- Product analytics events (we do not track taps or screens)
- Contacts, address book, or social graph
- Browsing or search history
- Genetic data, or biometric identifiers as defined by RCW 19.375 (facial geometry, fingerprints, templates)
- Reproductive or sexual health information
- Information about gender-affirming care
- Information about mental health diagnosis or treatment
- Location data that could identify a visit to a healthcare facility

If we ever begin collecting any of these, we will update this policy and ask for fresh consent first.

## 3. Sources of consumer health data

1. **Apple HealthKit,** with your explicit permission through the iOS Health consent sheet (the categories in Section 2.1). We collect health data from no other source: no data brokers, no imports from platforms not connected through Apple Health, no inference from public records or social media, and no advertising or marketing partners.
2. **You, directly:** day tags, personality quiz choices, nudge completions, and your name. Your soreness check-in and goal also come from you, and stay on your device (Section 2.1).

## 4. Purposes of collection, use, and sharing

We collect and use consumer health data only to:

- Compute your daily recovery score and the Daily Call (rules on your device; no AI decides the call)
- Write personalized wellness content (brief, nudge, card commentary) through the AI providers in Section 6
- Acknowledge kept nudges against next-morning data (receipts) and maintain your collection, badges, and streaks
- Schedule notifications on your device at sensible times, if you turn them on
- Diagnose and fix problems
- Comply with legal obligations (a small anonymized deletion audit record)

Membership is run from membership records, not from health data. Your health data is never used to decide prices, trial eligibility, or the Founding Keeper mark.

We never use consumer health data for advertising or marketing targeting, sale to anyone, profiling with legal or similarly significant effects, training third-party AI models, insurance, employment, or credit decisions, or inferring protected characteristics.

## 5. Categories of consumer health data shared with third parties

We share only with the service providers below, only to operate the app's features, and never for their own use.

| Category we share | Recipients | Purpose |
|---|---|---|
| Derived recovery score, comfort word, z-scores, confidence | AI providers (Anthropic, OpenAI), Supabase | Write wellness content; store your daily record |
| Daily summary values (HRV ms, resting heart rate bpm, sleep duration and quality, respiratory rate, training load) | AI providers (Anthropic, OpenAI), Supabase | Give the day's content honest context; store your daily record |
| The Daily Call and its reason, training phase | AI providers (Anthropic, OpenAI) | Phrase the day's content around your actual state. Our server passes them through for that request and does not store them |
| Soreness check-in word, goal type | Supabase (passed through for that day's brief request, not stored) | Checked by our server when it writes the brief. Not sent to AI providers |
| Archetype, intensity level, your name | AI providers (Anthropic, OpenAI), Supabase | Personalize and address the content |
| Card mint receipts (typed per-day derived facts, model versions, thresholds, component scores) | Supabase; AI providers (only when writing that card's commentary) | Keep each card's record of why it turned out that way; let commentary describe only what the card consulted |
| Nudges and whether you kept them, badges, streaks, day tags | Supabase; AI providers (recent nudges with their text, streaks, and day tags ride into the brief as recent history) | Keep your record and progress; give the day's brief continuity |
| Workout metadata (type, duration, start and end, distance, pace, source name) | Supabase; AI providers (your recent workouts as date, type, duration, and training load) | Training context; give the day's brief continuity |
| Coarse age band and biological sex (where granted) | Supabase | Internal algorithm calibration; never sent to AI providers |
| Garmin daily wellness summary (training readiness, body battery, sleep score, HRV status, resting heart rate), for users who connect a Garmin account | Supabase | Cross-check the on-device recovery algorithm against a second device's derived daily summary; held in an internal calibration record, never sent to AI providers |
| Membership status and subscription event payloads | RevenueCat, Supabase | Run membership and Archive Mode; contains no health data |
| Crash and error events (identifiers scrubbed, no health data) | Sentry | Diagnostics |

What we do **not** share with any third party: raw HealthKit samples or timestamped readings; individual HRV readings, heartbeat intervals, or sleep stage samples; your date of birth; Apple authentication tokens; IP address or device location; anything in Section 2.4.

## 6. Third parties that receive consumer health data

Each is a service provider bound to use the data only to provide its service to us. None may use your data for advertising or sell it.

| Third party | Role | Jurisdiction | What it receives | Contact |
|---|---|---|---|---|
| Supabase, Inc. | Database, authentication, server functions | United States | All server-synced data listed in Sections 2.2 and 2.3, and the brief request described in Section 2.1 | privacy@supabase.com (https://supabase.com/privacy) |
| Anthropic, PBC | AI text generation for daily briefs and some card commentary | United States | Recovery score and derived statistics, daily summary values, the day's call and reason, training phase, archetype, intensity level, your name if provided, a short recent history (recent workouts, nudges, day tags, scores, streaks, and recent brief texts), and, for card commentary, the card's saved mint receipt (typed per-day derived facts) | privacy@anthropic.com (https://www.anthropic.com/privacy) |
| OpenAI, L.L.C. | AI text generation for nudges and some card commentary, and as fallback for other surfaces | United States | The same fixed list as Anthropic, above | privacy@openai.com (https://openai.com/policies/privacy-policy) |
| RevenueCat, Inc. | Membership and subscription records | United States | Product identifier, subscription and trial events, our internal user identifier, event metadata (currency, country code, environment). No biometric or recovery data | privacy@revenuecat.com (https://www.revenuecat.com/privacy) |
| Functional Software, Inc. (Sentry) | Crash reporting | United States | Crash and error payloads with identifiers scrubbed before sending (email, IP, usernames, Apple identifiers and tokens, OAuth tokens). No biometric, score, or content data | privacy@sentry.io (https://sentry.io/privacy) |

Which AI provider phrases which surface can change as models improve. The data list stays fixed, and this table is updated if it ever widens.

**Provider training and retention:** neither Anthropic nor OpenAI uses our API data to train models by default. We configure requests not to store response objects where the provider supports it. Provider terms may permit limited retention for abuse prevention. See their policies at the links above.

**About the quality log:** we keep one internal record per AI generation to catch failures and keep the content safe. It holds categorical quality bands (for example "recovery: high"), the generated output, the model, timing, and cost. It does not store the prompt text or your raw daily values. It is keyed to a one-way hashed identifier, not your account ID. Records are deleted after 365 days, and the log is purged when you delete your account. The App Store build of Apoyü has no option to share a deeper diagnostic tier.

Apple (Sign in with Apple, HealthKit, and the iOS local notification system) operates as part of the iOS platform and receives only what its own platform documentation describes. We use no advertising SDK and no third-party analytics or attribution provider of any kind (no Google Analytics, Mixpanel, Amplitude, Firebase Analytics, Segment, AppsFlyer, Adjust, Branch, or similar).

## 7. Your rights

Every right below works the same whether or not you are a member. The privacy and data controls in Settings stay available in Archive Mode.

### 7.1 Right to confirm and access

You may ask us to confirm whether we are collecting, sharing, or selling your consumer health data (we do not sell it), and to receive a list of the third parties with whom we have shared it, with contact information (the table in Section 6).

**How:** email support@apoyu.app with the subject "MHMDA access request," from the email linked to your account. We respond within 45 days of receipt.

### 7.2 Right to withdraw consent

- **Stop new Health reads:** iOS Settings, Health, Data Access and Devices, Apoyu. Turn off any category, and Apoyü stops reading it immediately.
- **Stop server processing entirely:** delete your account in the app (Settings, Account, Delete Account).

Withdrawing consent does not undo processing that already happened.

### 7.3 Right to deletion

Account deletion is the main way to do this. In the app: Settings, Account, Delete Account, then confirm. The app will revoke your Sign in with Apple authorization, delete your consumer health data from our active database across all user-keyed tables (including the hashed-identifier quality log and your membership records), clear locally stored history, baselines, check-ins, and goals from your device, and sign you out. You may also email support@apoyu.app with the subject "MHMDA deletion request." Deleting your account does not cancel an App Store subscription, so cancel that in iOS Settings first.

We delete from active systems without undue delay and handle archived or backup deletion as applicable law permits (up to six months for backup systems; our provider's routine backups overwrite within 7 days). We direct relevant processors to honor verified deletion requests where the law requires.

A small audit record of the deletion (the timestamp and the fact of deletion, with the identifier removed or anonymized) is kept for compliance. It contains no consumer health data.

### 7.4 No discrimination

We will not discriminate against you for exercising your rights. If you withdraw data a feature needs, that feature may stop working, and nothing else changes. Exercising a right never affects your membership price or eligibility.

### 7.5 Verification

We may ask you to verify a request by signing in or confirming control of the email linked to your account. We will not ask for additional sensitive information.

## 8. Appeals

If we deny a request, we will explain why in writing. Appeal by emailing support@apoyu.app with the subject "MHMDA appeal" within 60 days of the denial. We respond within 45 days of receiving the appeal. If we uphold the denial, our response will include how to contact the Washington State Attorney General ([https://www.atg.wa.gov/file-complaint](https://www.atg.wa.gov/file-complaint)). You may also contact the Attorney General directly at any time, and you have a private right of action under RCW 19.373.060 through the Washington Consumer Protection Act.

## 9. Retention

While your account exists, your daily records build your history and collection, so we keep them until you delete them, including while your account is in Archive Mode. The one automatic limit: quality log records are deleted after 365 days.

On account deletion, everything in Sections 2.2 and 2.3 tied to your identifiers, including the quality log, is deleted from our active database. On-device storage, baselines, and Keychain tokens are cleared, and Apple sign-in authorization is revoked. Two records survive, and neither contains consumer health data: the anonymized deletion audit record, and a released Ember share code held for 90 days so it cannot be immediately given to someone else.

## 10. Contact

**Email:** support@apoyu.app (subject lines we watch for: "MHMDA access request," "MHMDA deletion request," "MHMDA appeal," or simply "Privacy question")
**General Privacy Policy:** [https://apoyu.app/privacy](https://apoyu.app/privacy)
**Terms of Service:** [https://apoyu.app/terms](https://apoyu.app/terms)
**Washington State Attorney General:** [https://www.atg.wa.gov/file-complaint](https://www.atg.wa.gov/file-complaint)

---

*This document is a draft. It has not been reviewed by legal counsel and must not be published until reviewed and approved.*
