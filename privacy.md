---
layout: page
title: Privacy Policy
permalink: /privacy
---

**Effective date:** [YYYY-MM-DD, TBD before publication]
**Last updated:** [YYYY-MM-DD, TBD before publication]

---

## 1. Introduction

Apoyü is operated by Daryll Cheng, a sole proprietor doing business as Apoyu ("Apoyü," "we," "our," or "us").

Apoyü is a morning recovery companion for iPhone and Apple Watch. With your permission, it reads health data from Apple Health, computes a daily recovery score on your device, and turns each night into a collectible card, one training call for the day, a short daily brief, and one small suggestion for the evening (Today's Nudge).

Apoyü is a general wellness product, not a medical device. Recovery scores, briefs, and training calls are not medical advice. See our [Health Data Disclosure and Medical Disclaimer](https://apoyu.app/health-privacy).

**The three sentences that govern everything below:**

1. **Your individual readings never leave your phone.** Sample-level data (individual heart rate variability readings, heartbeat and sleep stage samples, intra-night series, raw workout sensor data) is read from Apple Health, processed on your device, and never uploaded. There is no server copy of your raw readings.
2. **Per-day results are stored in your private account.** Your daily recovery score, plus the daily summary values behind it (average overnight HRV, resting heart rate, sleep duration and quality, respiratory rate, training load), sync to our servers so your history and collection survive reinstalls.
3. **To write your daily coaching, the day's derived values, a short history of your recent activity, and your first name go to our AI providers** (Anthropic and OpenAI). They never receive your individual readings, they do not train on your data, and we ask them not to keep it.

The rest of this policy is the detail behind those three sentences.

---

## 2. What data we collect and why

### 2.1 Data that stays on your device (not stored on our servers)

With your explicit permission through the iOS Health permission sheet, Apoyü reads the following from Apple Health. It is processed locally by our recovery algorithm, stored only in encrypted local storage on your device, and is not sent to our servers:

- Heart rate variability (HRV) readings, in milliseconds (SDNN)
- Resting heart rate readings, in beats per minute
- Heart rate samples
- Sleep stage and sleep duration samples
- Respiratory rate readings
- Blood oxygen (SpO2) readings, if your device records them
- Step count and active energy readings
- Walking, running, and cycling distance samples
- Raw workout sensor data from any connected device
- Mindfulness session records
- Date of birth and biological sex, if you have granted access to them in Apple Health (your date of birth never leaves your device; see Section 2.2 for the coarse age band that does)
- Rolling per-metric baselines (the personal averages and variability statistics the algorithm builds for you)

These things are also kept only on your device:

- Your optional soreness check-in (one of four words: fresh, usual, sore, wrecked)
- Your goal, if you set one: its type, its free-text label, its event date, and any training plan details
- The day's training call (push, hold, ease, or rest) and its reason, which the app works out on your phone

When the app asks for your daily brief, it sends the day's call and its reason, the soreness word, the goal type, and a coarse training phase (for example "taper" or "race day") with the request, so our server can check them and phrase the day correctly. Our server uses them for that one request and does not save them. Section 4.2 lists what reaches the AI providers.

**The one thing Apoyü writes to Apple Health:** when you spend a minute or more in an in-app breathing exercise, Apoyü saves a single mindfulness session covering that time to Apple Health so it counts toward your mindful minutes. It writes nothing else.

You can revoke any of these permissions at any time in iOS Settings under Health, Data Access and Devices, Apoyu.

### 2.2 Data we collect and store on our servers

**Account and identity data**

- Email address, which is typically an Apple relay address provided through Sign in with Apple
- Apple account identifier (an opaque user ID provided through Sign in with Apple), and an Apple Sign-In token used to support account deletion and sign-in revocation (readable only by our server functions, never by other users or the app itself)
- The name you choose to be called, if you give one during onboarding
- Account creation date, onboarding status, and your personal Ember share code
- Your confirmation that you are at least 13 years old

**Daily recovery record (derived values, computed on your device)**

- Your daily recovery score (a number from 0 to 100) and its comfort word (for example "Cloud" or "Concrete")
- Confidence level (how much data the score stands on)
- Component z-scores and the weighting used (derived statistics, not raw measurements)
- Daily summary health values: average overnight HRV (milliseconds), resting heart rate (beats per minute), sleep duration, sleep efficiency, deep sleep percentage, sleep quality score, respiratory rate, and training load
- The per-day baseline statistics used in that day's computation (your personal averages and variability measures for each metric; derived statistics, never raw readings)
- A coarse age band (a decade range such as "30 to 39," never your date of birth) and biological sex, where you have granted Apple Health access to them, stored as part of an internal algorithm calibration record
- Data availability flags and algorithm version, so we can explain and improve the score

**Training data**

- Workout metadata reported by Apple Health: workout type, start and end time, duration, distance, pace, and the source app name (never raw sensor streams), plus an opaque HealthKit workout identifier used only to avoid syncing the same workout twice

**Cards, coaching, and collection data**

- Your daily collectible card records, including the card's name, rarity, commentary text, and the stat block shown on the card (recovery score, HRV, sleep duration, deep sleep, resting heart rate, training load, steps, active energy, sleep quality)
- A mint receipt frozen with each new card. It is the card's own record of why it turned out the way it did. It is written once, when the card is made, and never recomputed. As it applies to that card, it contains:
  - which completeness gate minted it (its commit reason) and when it was minted
  - the version of the card selection system that chose the archetype, and how deeply the day fit that card's story (its match depth on a fixed scale from zero to one)
  - the version of the rarity model and, separately, the version of the tier calibration it was scored under
  - the rarity score itself, the tier that score earned on its own, and the final tier after any floor was applied, so the two can always be compared
  - the four rarity component scores (how deeply the story fit, how unusual the day was for you, what pattern over several days led there, and whether independent signals agreed), each with a confidence value and a note of how present its evidence was
  - the exact thresholds and weights that mint ran under, so a later recalibration can never make an old card's receipt read as though it were scored under today's numbers
  - the typed derived facts the card actually consulted, and only those, split into the facts that made the story true and the facts that made it deep. Examples: recovery and training load bands, the previous day's training strain, an acute to chronic training ratio, a workout's duration or start hour, run and pattern lengths, distance from your personal median, how far past a personal ceiling or below a personal floor the day landed, day of week and named calendar events, and which signals agreed. All are per-day derived values.
  - when a rarity floor actually raised the card's tier, a stable short code naming which floor did it, and the amount that satisfied it
  - any edition marks (such as a first ever mint) and a fixed seed used only to position the card's visual finish

  The receipt never contains raw HealthKit sample series, intra-night time series, raw sensor arrays, HealthKit or workout identifiers, location, free-text health narrative, or a dump of the day's full context. Every field is a typed value drawn from a closed, versioned list, and anything outside that list is rejected before it can be stored.
- Generated coaching content tied to your account: daily briefs, card commentary, and mascot interaction content
- Today's Nudge suggestions (stored as evening dare records), whether you kept each one, and how that was checked (a matching workout, a breathing session, the next morning's sleep, or your own tap)
- Badges and streak data, tags you attach to a day, collection statistics, and your egg and mascot progression state
- Personality quiz choices made during onboarding and your selected intensity level
- Share records when you share a card (what was shared, when, and to which destination; used to attribute your Ember code)

**Membership data**

- Your membership status (for example trial, active, expired, or never started), product identifier (yearly or monthly), renewal or expiration date, and subscription event history, synced from Apple through RevenueCat so the app knows whether to run a new daily cycle
- The local date of your one free preview morning, so it can be given exactly once per account
- Whether your account has earned the Founding Keeper mark, and when (see Section 2.4)

**App usage and preferences**

- Notification preferences, learned wake time, and timezone, used to schedule notifications on your device at a sensible hour
- App open events and a re-engagement state flag

**Diagnostics and quality data**

- Error reports and crash diagnostics sent to Sentry, scrubbed as described in Section 4.5
- A service quality log of AI generations: one record per generated brief, nudge, or card commentary, keyed to a one-way hashed identifier rather than your account ID. It contains only categorical quality features (bucketed bands such as "recovery: high" or "sleep debt: moderate," not raw values), the generated output, the model used, timing, and cost. It does not store the prompt text. Records are deleted after 365 days, and all of them are deleted when you delete your account. The App Store build of Apoyü has no option to share extra diagnostic data.
- Consent records: which consent text you agreed to, its version, when, and on which app version and platform

### 2.3 Data we do not collect

We do not collect:

- Raw biometric samples or timestamped readings on our servers
- Precise or coarse geolocation
- Advertising identifiers (we do not request the IDFA, and the app contains no advertising)
- Contacts, photos, or data from other apps on your device
- Browsing or search history
- Keystroke or input data beyond what you explicitly enter in the app
- Payment card details (Apple handles all billing)
- Product analytics events (we do not track taps or screens, and we use no analytics service)

We use no third-party analytics, attribution, or advertising SDKs of any kind.

### 2.4 Founding Keeper

Founding Keeper is not something you buy. It is a small cosmetic mark (an alternate collectible back, a small mark, and optional share decoration) that your account earns once, at its first paid membership payment after the free trial, if that payment falls inside a founding window we will announce. Starting a trial does not earn it, and cancelling or letting membership lapse does not take it away. We store only whether your account earned it and when. It is deleted with your account, and a new account does not inherit it. It changes nothing about how Apoyü scores you or what cards you can get.

---

## 3. How we use your data and lawful basis

We use the data we collect to:

- Compute and display your daily recovery score and training call, which is the core function of the app
- Write your daily brief, card commentary, and Today's Nudge in the character voice and intensity you chose
- Acknowledge kept nudges against your next-morning data (receipts) and maintain your collection, badges, and streaks
- Run your membership: give you your one preview morning, know whether you are in a trial or a member, and switch your account to Archive Mode (Section 3.1) when membership is not active
- Schedule notifications on your device at times learned from your app use, if you turn them on
- Diagnose and fix bugs and crashes
- Comply with our legal obligations, including keeping records required by applicable privacy law

We do not use your data for advertising, do not sell it, and do not share it with data brokers. We do not use your data to train AI models, and we contractually and technically ask our AI providers not to either (Section 4.2).

### 3.1 Membership status and your data

Your membership status decides only whether Apoyü makes something new each morning. It never decides what we keep. When membership is not active (after your preview morning without a trial, or after a trial or membership ends), your account is in **Archive Mode**: everything you already earned stays in your account and stays viewable, shareable, and deletable, and Apoyü stops making new daily content. In Archive Mode we do not run a new daily recovery reading, so no new derived values from that day are sent to our AI providers. Your membership status never changes how your data is processed for scoring, how rarity is decided, or which archetypes you can get.

**Lawful basis (GDPR Article 6), where the EU or UK GDPR applies:**

- **Explicit consent** (Article 6(1)(a), and Article 9(2)(a) for special category health data) for processing health-derived data, collected through the consent screen on first launch. You may withdraw consent at any time by turning off HealthKit categories in iOS Settings or deleting your account.
- **Performance of a contract** (Article 6(1)(b)) to deliver the app features and the membership you ask for.
- **Legitimate interest** (Article 6(1)(f)) in diagnosing errors through crash reporting scrubbed of personal identifiers, and in keeping service quality logs under the retention limits in Section 2.2.

---

## 4. Third-party services

We use a small, fixed set of service providers. None of them may use your data for their own advertising, and none of them sells it.

### 4.1 Supabase (database and server infrastructure)

We use Supabase (United States) to store the account and derived data described in Section 2.2, to authenticate you, and to run the server functions that produce coaching content. Access is protected by row level security so no user can read another user's data.

### 4.2 AI providers: Anthropic and OpenAI (content generation)

Apoyü uses large language models from Anthropic and OpenAI to phrase the daily brief, Today's Nudge, and some card commentary in the character's voice. Which provider phrases which surface can change as models improve. The data they may receive is the same fixed list:

- Your recovery score for the day and derived statistics behind it (for example z-scores or sleep debt figures)
- Daily summary values, formatted for context (for example HRV in milliseconds, sleep duration in hours, resting heart rate in beats per minute)
- The day's training call and its reason (for example that soreness was the reason, though never your soreness word itself), and coarse goal context (training phase)
- Your first name, if you gave one
- Your selected intensity level and the day's card archetype context
- A short history of your recent activity, so the coaching stays continuous and does not repeat itself: your recent workouts (date, type, duration, and training load, not the raw sensor data), your recent nudges and whether you kept them (including their text), the tags you attached to recent days, your recent daily scores and comfort words, your current and longest streaks, and the text of your recent briefs
- For card commentary written by a model only, the card's saved mint receipt: the typed derived facts behind that day's archetype and rarity, together with the model versions, thresholds, and component scores described in Section 2.2. The commentary may describe only what that receipt actually carries. These are always per-day derived values, never raw readings.

They never receive: individual readings or sample-level data, your email, your Apple account identifier, your date of birth, your membership status, or your location.

Two honesty notes. First, many cards and lines are served from prewritten text with no AI call at all, so the values above reach a provider only when content is actually written by a model. Second, the training call itself (push, hold, ease, rest) is computed by fixed rules in the app, never by an AI. The AI only phrases it.

Neither provider uses our API data to train models by default. We configure requests not to store response objects where the provider supports it. Provider terms may permit limited retention for abuse prevention. See the Anthropic and OpenAI privacy policies for details.

### 4.3 RevenueCat (membership records)

We use RevenueCat (United States) to receive membership events from Apple and confirm whether your membership or trial is active. RevenueCat receives your Apoyü account identifier (an internal UUID, not your Apple ID or email) and subscription event payloads (product, transaction ID, trial or renewal state, expiration date, and event metadata such as currency, country code, and environment). RevenueCat receives no health data and no generated content. RevenueCat keeps transaction history on its own systems for its standard business and legal compliance period, even after we delete our own records.

### 4.4 Apple

- **Sign in with Apple** for authentication. Apple gives us a unique account identifier and, typically, a relay email address.
- **App Store** for all billing, including the free trial and renewals. Apple manages payment information. We never see your payment card details.
- **HealthKit** for on-device reads and the single mindfulness write (Section 2.1). We do not upload HealthKit sample data to anyone.
- **Local notifications** are scheduled by iOS on your device.

### 4.5 Sentry (error monitoring)

We use Sentry (United States) to capture crash reports and application errors. Before sending we remove: email address, IP address, username, Apple account identifier, Apple Sign-In tokens, OAuth tokens, provider strings, and user metadata beyond a small allowlist of flags that identify no one. Sentry may still receive device characteristics that identify no one (device model, iOS version, app version) and stack traces. Sentry does not receive recovery scores, health data, or generated content.

---

## 5. Data retention and deletion

**During active use, and in Archive Mode:** we keep your data for as long as your account exists, whether or not your membership is active. Letting membership lapse never deletes anything. The one automatic exception: AI service quality log records are deleted after 365 days.

**Account deletion:** delete your account at any time in the app under Settings, Account, Delete Account. This works the same whether you are a member, in a trial, or in Archive Mode. When you do, we:

1. Revoke your Sign in with Apple authorization with Apple before deleting any data. In rare cases where the sign-in must be verified again, the app will direct you through iOS Settings and then retry.
2. Delete all your user-keyed records from our database: recovery records, cards and their mint receipts, workouts, nudges and their kept records, briefs, notification state, membership records (including your preview date and any Founding Keeper mark), and all other personal records, including the pseudonymous AI quality logs tied to your account.
3. Clear all locally stored data on your device (recovery history, baselines, card state, check-ins, goals, settings) and remove authentication tokens from the iOS Keychain.
4. Sign you out.

**What survives deletion** (neither item contains health data):

- **A deletion audit record:** the fact that a deletion occurred and when, with your identifier removed or anonymized. Kept for legal compliance.
- **Your released Ember code:** held for 90 days so it cannot immediately be given to another person. The code is not linked to any of your data after deletion.

Deletion removes your data from live systems immediately. Routine automated backups kept by our database provider may contain copies for up to 7 days before being overwritten. We do not access backups except to recover from a service-wide incident, and deleted user data will not be restored. Your collection and recovery history cannot be recovered after deletion.

**Deleting your Apoyü account does not cancel your App Store subscription or trial.** Cancel it first in iOS Settings under your name, Subscriptions, Apoyu, or you may still be charged by Apple.

---

## 6. Data security

- **Encrypted local storage.** Health baselines and computed scores are stored in encrypted local storage on your device.
- **Keychain storage.** Authentication tokens are stored in the iOS Keychain, never in unencrypted storage.
- **Row level security.** Database policies prevent any user from accessing another user's data.
- **Server-only fields.** Membership facts such as your preview date and Founding Keeper mark are written only by our server functions. The app cannot change them.
- **Pseudonymization.** Service quality logs are keyed to a one-way hashed identifier, not your account ID.
- **Scrubbing of personal details** on error reports before they are sent (Section 4.5).
- **HTTPS** for all network communication.

No system is perfectly secure. If a breach affects your personal data, we will notify you and any required authorities within the timelines required by applicable law.

---

## 7. Children's privacy

Apoyü is for people aged 13 and older, and the consent screen asks you to confirm that you are. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, contact us at support@apoyu.app and we will delete it promptly.

---

## 8. International users

If you are in the European Economic Area or the United Kingdom, the lawful bases in Section 3 apply, you have the rights in Section 9, and you may lodge a complaint with your local data protection authority.

If you are a California resident, see the California section in Section 9.

If you are a Washington State resident, see our separate [Consumer Health Data Privacy Policy](https://apoyu.app/health-privacy), which describes additional rights under the Washington My Health My Data Act. Where the two documents overlap for consumer health data, that one controls.

---

## 9. Your rights and choices

Depending on where you live, you may have the right to:

- **Access:** request a copy of the data we hold about you.
- **Deletion:** delete your account and all associated data in the app (Settings, Account, Delete Account) or by emailing us.
- **Correction:** request correction of inaccurate data.
- **Portability:** request a copy of your data in a structured, commonly used format.
- **Withdraw consent:** turn off HealthKit categories in iOS Settings, or delete your account to stop all server processing.
- **No sale, no ads:** we do not sell personal data and do not use it for advertising, so there is nothing to opt out of. The right exists regardless.

These rights do not depend on your membership. You can use every one of them in Archive Mode, and the data controls in Settings stay available whether or not you are a member.

To exercise any right, email **support@apoyu.app**. We will verify the request against the email or sign-in linked to your account and respond within the time required by applicable law (in practice usually within a few days; Apoyü is run by one person and every request is read).

**In-app controls:** notification toggles (Settings, Notifications), intensity level, hide-score mode, and the soreness check-in and goal features are all optional and can be skipped.

### California residents

Under the California Consumer Privacy Act (CCPA/CPRA), the categories below describe our collection in the structure California law requires:

| Category of personal information | Sources | Purpose | Third parties shared with |
|---|---|---|---|
| Identifiers (Apple account ID, internal user UUID, email, typically an Apple relay) | You, through Sign in with Apple | Authentication, account operation | Service providers (Supabase, RevenueCat) |
| Customer records (the name you choose, if provided) | You, in onboarding | Personalize content | Service providers (Supabase, Anthropic, OpenAI) |
| Commercial information (membership status, trial and renewal events, preview date, Founding Keeper mark) | Apple, through RevenueCat; our server | Run membership and Archive Mode | Service providers (Supabase, RevenueCat) |
| Internet or network activity (app open events) | You, through app use | Notification timing | Service providers (Supabase) |
| Health-related information (recovery score, z-scores, daily summary values, workout metadata, coarse age band, biological sex; the day's training call and its reason, and coarse training phase, when they are sent to write the brief) | You, through Apple Health and in-app inputs, computed on your device | Compute the score and call; write coaching content | Service providers (Supabase, Anthropic, OpenAI) |
| Inferences (archetype, comfort word, confidence level) | Derived from the above | Personalize content | Service providers (Supabase, Anthropic, OpenAI) |

We have not sold or shared personal information for cross-context behavioral advertising in the preceding 12 months. California residents have the rights to know, delete, correct, opt out of sale or sharing (we do neither), limit use of sensitive personal information, and be free from retaliation for exercising these rights. To exercise them, email support@apoyu.app with the subject line "CCPA request." Authorized agents may act for you with written authorization and identity verification.

---

## 10. Changes to this policy

If we make material changes, we will update the effective date and post the revised policy at apoyu.app/privacy. If changes materially affect your rights, we will ask you to accept the update the next time you open the app. Earlier versions are available on request.

---

## 11. Contact

**Email:** support@apoyu.app
**Web:** https://apoyu.app
**Related documents:** [Terms of Service](https://apoyu.app/terms), [Health Data Disclosure and Consumer Health Data Privacy Policy](https://apoyu.app/health-privacy), [Support](https://apoyu.app/support)
