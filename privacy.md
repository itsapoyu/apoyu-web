---
layout: page
title: Privacy Policy
permalink: /privacy
---

**Effective date:** 2026-08-19
**Last updated:** 2026-08-19

---

## 1. Introduction

Apoyu is operated by Daryll Cheng, a sole proprietor doing business as Apoyu ("Apoyu," "we," "our," or "us").

Apoyu is an iPhone and Apple Watch wellness app for people who train hard. With your permission, it reads health data from Apple Health, computes a daily recovery score on your device, and delivers a short daily briefing, a collectible card, one training-intensity suggestion for the day, and one small evening recovery action.

Apoyu is a general wellness product, not a medical device. Recovery scores, briefings, and training suggestions are not medical advice. See our [Health Data Disclosure and Medical Disclaimer](https://apoyu.app/health-privacy).

**The three sentences that govern everything below:**

1. **Your individual readings never leave your phone.** Sample-level data (individual heart rate variability readings, heartbeat and sleep-stage samples, intra-night series, raw workout sensor data) is read from Apple Health, processed on your device, and never uploaded. There is no server copy of your raw readings.
2. **Per-day results are stored in your private account.** Your daily recovery score, plus the daily summary values behind it (average overnight HRV, resting heart rate, sleep duration and quality, respiratory rate, training load), sync to our servers so your history and collection survive reinstalls.
3. **To write the daily coaching, the day's derived values, a short history of your recent activity (recent workouts, evening dares, day tags, recent scores, and your recent briefings), and your display name go to our AI providers** (Anthropic and OpenAI). They never receive your individual sample-level readings, they do not train on your data, and we ask them not to keep it.

The rest of this policy is the detail behind those three sentences.

---

## 2. What data we collect and why

### 2.1 Data that stays on your device (not transmitted to Apoyu servers)

With your explicit permission through the iOS Health permission sheet, Apoyu reads the following from Apple Health. It is processed locally by our recovery algorithm, stored only in encrypted local storage on your device, and is not transmitted to our servers:

- Heart rate variability (HRV) readings, in milliseconds (SDNN)
- Resting heart rate readings, in beats per minute
- Heart rate samples
- Sleep stage and sleep duration samples
- Respiratory rate readings
- Blood oxygen (SpO2) readings, if available from your device
- Step count and active energy readings
- Walking, running, and cycling distance samples
- Raw workout sensor data from any connected device
- Mindfulness session records
- Date of birth and biological sex, if you have granted access to them in Apple Health (your date of birth never leaves your device; see Section 2.2 for the coarse age band that does)
- Rolling per-metric baselines (the personal averages and variability statistics the algorithm builds for you)
- Your goal's free-text label and any training plan details you enter (only the goal type, phase, and event date sync; see Section 2.2)

**The one thing Apoyu writes to Apple Health:** when you finish an in-app breathing exercise, Apoyu saves a single mindfulness session to Apple Health so it counts toward your mindful minutes. It writes nothing else.

You can revoke any of these permissions at any time in iOS Settings under Health, Data Access and Devices, Apoyu.

### 2.2 Data we collect and store on our servers

**Account and identity data**

- Email address, which is typically an Apple relay address provided through Sign in with Apple
- Apple account identifier (an opaque user ID provided through Sign in with Apple), and an Apple Sign-In token used to support account deletion and sign-in revocation (readable only by our server-side functions, never by other users or the app itself)
- Your display name, if you choose to provide one during onboarding
- Account creation date, onboarding status, and your personal Ember share code

**Daily recovery record (derived values, computed on your device)**

- Your daily recovery score (a number from 0 to 100) and its comfort word (for example "Cloud" or "Concrete")
- Confidence level (how much data the score stands on)
- Component z-scores and the weighting used (derived statistics, not raw measurements)
- Daily summary health values: average overnight HRV (milliseconds), resting heart rate (beats per minute), sleep duration, sleep efficiency, deep sleep percentage, sleep quality score, respiratory rate, and training load
- The per-day baseline statistics used in that day's computation (your personal averages and variability measures for each metric; these are derived statistics, never raw readings)
- A coarse age band (a decade range such as "30 to 39," never your date of birth) and biological sex, where you have granted Apple Health access to them, stored as part of an internal algorithm-calibration record
- Data availability flags and algorithm version, so we can explain and improve the score

**Training and check-in data (the athlete layer)**

- Workout metadata reported by Apple Health: workout type, start and end time, duration, distance, pace, and the source app name (never raw sensor streams), plus an opaque HealthKit workout identifier used only to avoid syncing the same workout twice
- Your optional one-tap soreness check-in (one of four words: fresh, usual, sore, wrecked)
- Your optional post-workout effort rating (RPE, a small number)
- Your goal context: goal type, training phase, and event date (the goal's free-text label and any plan details stay on your device)
- The daily training call (one of push, hold, ease, rest) and its one-line reason
- Receipt records (which kept evening action was acknowledged against which next-morning metric)

**Cards, coaching, and collection data**

- Your daily collectible card records, including the card's name, rarity, commentary text, and the stat block shown on the card (recovery score, HRV, sleep duration, deep sleep, resting heart rate, training load, steps, active energy, sleep quality)
- A mint receipt frozen with each card. It is the card's own record of why it turned out the way it did, and it is written once, at mint, and never recomputed. As applicable to that card, it contains:
  - which completeness gate minted it (its commit reason) and when it was minted
  - the version of the card-selection system that chose the archetype, and how deeply the day fit that card's story (its match depth on a fixed zero-to-one scale)
  - the version of the rarity model and, separately, the version of the tier calibration it was scored under
  - the rarity score itself, the tier that score earned on its own, and the final tier after any floor was applied, so the two can always be compared
  - the four rarity component scores (how deeply the story fit, how unusual the day was for you, what multi-day pattern led there, and whether independent signals agreed), each with a confidence value and a note of how present its evidence was
  - the exact thresholds and weights that mint ran under, so a later recalibration can never make an old card's receipt read as though it were scored under today's numbers
  - the typed derived facts the card actually consulted, and only those, split into the facts that made the story true and the facts that made it deep. Examples: recovery and training-load bands, prior-day training strain, an acute-to-chronic training ratio, a workout's duration or start hour, run and pattern lengths, distance from your personal median, how far past a personal ceiling or below a personal floor the day landed, day-of-week and named calendar events, and which signals corroborated. All are per-day derived values.
  - when a rarity floor actually raised the card's tier, a stable short code naming which floor did it, and the magnitude that satisfied it (for example how many points past your personal ceiling the day landed)
  - any edition marks (such as a first-ever mint) and a deterministic seed used only to position the card's visual finish

  The receipt never contains raw HealthKit sample series, intra-night time series, raw sensor arrays, HealthKit or workout identifiers, location, free-text health narrative, or a dump of the day's full context. Every field is a typed value drawn from a closed, versioned list, and anything outside that list is rejected before it can be stored.
- Generated coaching content associated with your account: daily briefings, card commentary, evening dares and their completion records, and mascot interaction content
- Dare badges and streak data, journal tags you attach to a day, collection statistics, and your egg/mascot progression state
- Personality quiz choices made during onboarding and your selected intensity level
- Share records when you share a card (what was shared, when, and to which destination; used to attribute your Ember code)

**App usage and preferences**

- Notification preferences, learned wake time, and timezone (used to schedule notifications at a sensible hour), plus a device push token if you enable notifications
- App open events and a re-engagement state flag
- First-party product events (for example "call shown," "call followed," "soreness logged," "goal set," "receipt shown"). These events carry named event types and coarse categorical properties only. They never contain raw metric values, and we use no third-party analytics service.

**Purchase data**

- Your purchase and subscription status (for example Founding Keeper purchased, Ember Pro active or expired), product identifier, expiration date where applicable, and purchase event history, synced from RevenueCat for entitlement and billing records

**Diagnostics and quality data**

- Error reports and crash diagnostics sent to Sentry, scrubbed as described in Section 4.5
- A service quality log of AI generations: one record per generated briefing, dare, or card commentary, keyed to a one-way hashed identifier rather than your account ID. By default this record contains only categorical quality features (bucketed bands such as "recovery: high" or "sleep debt: moderate," not raw values), the generated output, the model used, timing, and cost. The full prompt text (which includes that day's derived values and the recent-activity context described in Section 4.2) and the raw derived values behind it are stored only if you turn on the optional diagnostic sharing in Settings. If you turn that sharing off, the data you shared is deleted within 30 days. Prompt text is scrubbed after 90 days and quality-log records are deleted after 365 days. All of these records, including the hashed-identifier logs, are deleted when you delete your account.
- Consent records: which consent text you agreed to, its version, when, and on which app version and platform

### 2.3 Data we do not collect

We do not collect:

- Raw biometric samples or timestamped readings on our servers
- Precise or coarse geolocation
- Advertising identifiers (we do not implement App Tracking Transparency or request the IDFA, and the app contains no advertising)
- Contacts, photos, or data from other apps on your device
- Browsing or search history
- Keystroke or input data beyond what you explicitly enter in the app

We use no third-party analytics, attribution, or advertising SDKs of any kind.

---

## 3. How we use your data and lawful basis

We use the data we collect to:

- Compute and display your daily recovery score and training call, which is the core function of the app
- Generate personalized daily briefings, card commentary, and evening dare suggestions in the character voice and intensity you chose
- Acknowledge kept actions against your next-morning data (receipts) and maintain your collection, badges, and streaks
- Deliver notifications at times learned from your app usage patterns, if you enable them
- Manage your purchases and entitlements
- Measure whether core features work (first-party events such as whether a shown call was followed), so the product can be improved honestly
- Diagnose and fix bugs and crashes
- Comply with our legal obligations, including maintaining records required by applicable privacy law

We do not use your data for advertising, do not sell it, and do not share it with data brokers. We do not use your data to train AI models, and we contractually and technically request that our AI providers do not either (Section 4.2).

**Lawful basis (GDPR Article 6), where the EU or UK GDPR applies:**

- **Explicit consent** (Article 6(1)(a), and Article 9(2)(a) for special-category health data) for processing health-derived data, collected through the consent screen on first launch. You may withdraw consent at any time by disabling HealthKit categories in iOS Settings or deleting your account.
- **Performance of a contract** (Article 6(1)(b)) to deliver the app features and purchases you request.
- **Legitimate interest** (Article 6(1)(f)) in diagnosing errors via crash reporting scrubbed of personal identifiers, and in maintaining service quality logs under the retention limits in Section 2.2.

---

## 4. Third-party services

We use a small, fixed set of service providers. None of them may use your data for their own advertising, and none of them sells it.

### 4.1 Supabase (database and server infrastructure)

We use Supabase (United States) to store the account and derived data described in Section 2.2, to authenticate you, and to run the server functions that produce coaching content. Access is protected by row-level security so no user can read another user's data.

### 4.2 AI providers: Anthropic and OpenAI (content generation)

Apoyu uses large language models from Anthropic and OpenAI to phrase the daily briefing, evening dare, and some card commentary in the character's voice. Which provider phrases which surface can change as models improve; the data they may receive is the same fixed list:

- Your recovery score for the day and derived statistics behind it (for example z-scores or sleep-debt figures)
- Daily summary values, formatted for context (for example HRV in milliseconds, sleep duration in hours, resting heart rate in beats per minute)
- Your soreness check-in word, the day's training call and its reason, and coarse goal context (goal type and phase)
- Your display name, if you provided one
- Your selected intensity level and the day's card archetype context
- A short history of your recent activity, so the coaching stays continuous and does not repeat itself: your recent workouts (date, type, duration, and training load, not the raw sensor data), your recent evening dares and whether you accepted them (including the dare text), the tags you attached to recent days, your recent daily scores and comfort tiers, your current and longest streaks, and the text of your recent briefings
- For model-generated card commentary only, the card's COMMITTED mint receipt: the typed derived facts behind that day's archetype and rarity, together with the model versions, thresholds and component scores described in section 2.2. The commentary may describe only what that receipt actually carries, so it cannot narrate a fact the card did not consult. These are always per-day derived values, never raw readings.

They never receive: individual readings or sample-level data, your email, your Apple account identifier, your date of birth, or your location.

Two honesty notes. First, most standard daily cards are served from pre-written lines with no AI call at all; the values above reach a provider only when content is actually model-generated. Second, the training suggestion itself (push, hold, ease, rest) is computed by fixed rules in the app, never by an AI; the AI only phrases it.

Neither provider uses our API data to train models by default. We configure requests not to store response objects where the provider supports it. Provider terms may permit limited retention for abuse prevention; see the Anthropic and OpenAI privacy policies for details.

### 4.3 RevenueCat (purchases)

We use RevenueCat (United States) to process purchase events from Apple and verify entitlements. RevenueCat receives your Apoyu account identifier (an internal UUID, not your Apple ID or email) and purchase event payloads (product, transaction ID, expiration where applicable, and event metadata such as currency, country code, and environment). RevenueCat receives no health data and no generated content. RevenueCat retains transaction history on its own systems for its standard business and legal compliance period, even after Apoyu deletes its own records.

### 4.4 Apple

- **Sign in with Apple** for authentication. Apple provides us a unique account identifier and, typically, a relay email address.
- **App Store** for all billing. Apple manages payment information; we never see your payment card details.
- **HealthKit** for on-device reads (Section 2.1). We do not upload HealthKit sample data to anyone.
- **Apple Push Notification service** to deliver notifications you enable.

### 4.5 Sentry (error monitoring)

We use Sentry (United States) to capture crash reports and application errors. Before transmission we remove: email address, IP address, username, Apple account identifier, Apple Sign-In tokens, OAuth tokens, provider strings, and user metadata beyond a small allowlist of non-identifying flags. Sentry may still receive non-identifying device characteristics (device model, iOS version, app version) and stack traces. Sentry does not receive recovery scores, health data, or generated content.

---

## 5. Data retention and deletion

**During active use:** we retain your data for as long as your account exists, with two automatic exceptions: AI service quality logs have their prompt text scrubbed after 90 days and are deleted entirely after 365 days.

**Account deletion:** delete your account at any time in the app under Settings, Account, Delete Account. When you do, we:

1. Revoke your Sign in with Apple authorization with Apple before deleting any data. In rare cases where the sign-in must be re-verified, the app will direct you through iOS Settings and then retry.
2. Delete all your user-keyed records from our database: recovery records, cards, dares, briefings, check-ins, goals, receipts, events, notifications, purchase records, and all other personal records, including the pseudonymous AI quality logs linked to your account.
3. Clear all locally stored data on your device (recovery history, baselines, card state, settings) and remove authentication tokens from the iOS Keychain.
4. Sign you out.

**What survives deletion** (neither item contains health data):

- **A deletion audit record:** the fact that a deletion occurred and when, with your identifier removed or anonymized. Retained for legal compliance.
- **Your released Ember code:** held for 90 days so it cannot immediately be re-assigned to another person. The code is not linked to any of your data after deletion.

Deletion removes your data from live systems immediately. Routine automated backups maintained by our database provider may contain copies for up to 7 days before being overwritten. We do not access backups except to recover from a service-wide incident, and deleted user data will not be restored. Your collection and recovery history cannot be recovered after deletion.

**Deleting your Apoyu account does not cancel an App Store subscription.** If you have an active auto-renewing subscription, cancel it first in iOS Settings under your Apple ID, Subscriptions, Apoyu. One-time purchases (such as the Founding Keeper) belong to your Apple ID and can be restored if you later create a new account.

---

## 6. Data security

- **Encrypted local storage.** Health baselines and computed scores are stored in encrypted local storage on your device.
- **Keychain storage.** Authentication tokens are stored in the iOS Keychain, never in unencrypted storage.
- **Row-level security.** Database policies prevent any user from accessing another user's data.
- **Service-role isolation.** Sensitive operations run only in server-side functions with elevated permissions; the app client has no direct write access to those tables.
- **Pseudonymization.** Service quality logs are keyed to a one-way hashed identifier, not your account ID.
- **PII scrubbing** on error reports before transmission (Section 4.5).
- **HTTPS** for all network communication.

No system is perfectly secure. If a breach affects your personal data, we will notify you and any required authorities within the timelines required by applicable law.

---

## 7. Children's privacy

Apoyu is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, contact us at support@apoyu.app and we will delete it promptly.

---

## 8. International users

If you are in the European Economic Area or the United Kingdom, the lawful bases in Section 3 apply, you have the rights in Section 9, and you may lodge a complaint with your local data protection authority.

If you are a California resident, see the California section in Section 9.

If you are a Washington State resident, see our separate [Consumer Health Data Privacy Policy](https://apoyu.app/health-privacy), which describes additional rights under the Washington My Health My Data Act. Where the two documents overlap for consumer health data, that one controls.

---

## 9. Your rights and choices

Depending on your location, you may have the right to:

- **Access:** request a copy of the data we hold about you.
- **Deletion:** delete your account and all associated data in the app (Settings, Account, Delete Account) or by emailing us.
- **Correction:** request correction of inaccurate data.
- **Portability:** request a copy of your data in a structured, commonly used format.
- **Withdraw consent:** disable HealthKit categories in iOS Settings, or delete your account to stop all server-side processing.
- **No sale, no ads:** we do not sell personal data and do not use it for advertising, so there is nothing to opt out of; the right exists regardless.

To exercise any right, email **support@apoyu.app**. We will verify the request against the email or sign-in linked to your account and respond within the time required by applicable law (and in practice, usually within a few days; Apoyu is run by one person and every request is read).

**In-app controls:** notification toggles (Settings, Notifications), intensity level, hide-score mode, and the soreness check-in and goal features are all optional and skippable.

### California residents

Under the California Consumer Privacy Act (CCPA/CPRA), the categories below describe our collection in the structure California law requires:

| Category of personal information | Sources | Purpose | Third parties shared with |
|---|---|---|---|
| Identifiers (Apple account ID, internal user UUID, email, typically an Apple relay) | You, via Sign in with Apple | Authentication, account operation | Service providers (Supabase, RevenueCat) |
| Customer records (display name, if provided) | You, in onboarding | Personalize content | Service providers (Supabase, Anthropic, OpenAI) |
| Commercial information (purchase status, transaction events) | Apple, via RevenueCat | Purchases and entitlements | Service providers (Supabase, RevenueCat) |
| Internet or network activity (app open events, named product events) | You, via app use | Notification timing, honest feature measurement | Service providers (Supabase) |
| Health-related information (recovery score, z-scores, daily summary values, soreness check-in, effort ratings, goal context, workout metadata, coarse age band, biological sex) | You, via Apple Health and in-app inputs, computed on-device | Compute the score and call; generate coaching content | Service providers (Supabase, Anthropic, OpenAI) |
| Inferences (archetype, comfort word, confidence level) | Derived from the above | Personalize content | Service providers (Supabase, Anthropic, OpenAI) |

We have not sold or shared personal information for cross-context behavioral advertising in the preceding 12 months. California residents have the rights to know, delete, correct, opt out of sale or sharing (we do neither), limit use of sensitive personal information, and be free from retaliation for exercising these rights. To exercise them, email support@apoyu.app with the subject line "CCPA request." Authorized agents may act for you with written authorization and identity verification.

---

## 10. Changes to this policy

If we make material changes, we will update the effective date and post the revised policy at apoyu.app/privacy. If changes materially affect your rights, we will ask you to acknowledge the update on next app launch. Prior versions remain available on request.

---

## 11. Contact

**Email:** support@apoyu.app
**Web:** https://apoyu.app
**Related documents:** [Terms of Service](https://apoyu.app/terms), [Health Data Disclosure and Consumer Health Data Privacy Policy](https://apoyu.app/health-privacy), [Support](https://apoyu.app/support)

---

*Draft prepared 2026-07-15 from a verified codebase audit. Not yet reviewed by legal counsel; do not publish until the review items listed in docs/legal/drafts/README-legal-status.md are cleared.*
