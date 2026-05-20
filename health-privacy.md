---
layout: page
title: Health Data Privacy (Washington)
permalink: /health-privacy
---

> **DRAFT, pending legal review.** Supplementary notice for Washington consumers under the My Health My Data Act (Chapter 19.373 RCW). Generated from a codebase audit and is not legal advice. Pending counsel review before publication.

**Effective date:** [YYYY-MM-DD, TBD before publication]
**Last updated:** [YYYY-MM-DD, TBD before publication]

---

## Read this first: the load-bearing fact

Apoyu is built around one rule:

**Your raw biometric data never leaves your iPhone.**

Apoyu reads heart rate variability, sleep, resting heart rate, respiratory rate, workouts, steps, and active energy from Apple Health on your device. Those raw readings are processed locally by an algorithm that lives on your iPhone. Only a small set of derived values (your recovery score, a few summary statistics, and workout metadata) ever reaches our servers. Raw samples, individual readings, and timestamped sensor data stay on your device and are erased when you delete your account.

This document explains what consumer health data Apoyu collects, how we use it, who receives it, and how you can exercise your rights under Washington's My Health My Data Act ("MHMDA"). It supplements our [general Privacy Policy](https://apoyu.app/privacy). Where the two documents overlap, this one controls for consumer health data covered by MHMDA.

This notice is written in plain language, as required by RCW 19.373.020(2). If anything below is unclear, contact us at [CONTACT EMAIL TO BE ADDED] and we will explain it.

---

## 1. Who this policy is for

This policy applies to anyone who uses Apoyu. We publish it to comply with the Washington My Health My Data Act, which protects Washington residents. If you live outside Washington, your rights may differ. Our [general Privacy Policy](https://apoyu.app/privacy) describes additional rights for residents of California, the European Union, and other regions.

Apoyu is operated by [LEGAL ENTITY NAME] ("Apoyu," "we," "our," or "us").

Apoyu is a general wellness product, not a medical device. Nothing in this policy or in the app is medical advice, diagnosis, or treatment.

---

## 2. Categories of consumer health data we collect

"Consumer health data" under MHMDA means personal information linked or reasonably linkable to a consumer that identifies the consumer's past, present, or future physical or mental health status. We break our collection into two buckets: data that stays on your device, and data that we receive on our servers.

### 2.1 Data that stays on your device and is not sent to our servers

The following categories are read from Apple HealthKit, processed locally by the Apoyu algorithm, and stored only in encrypted local storage on your iPhone. We do not receive them.

- Heart rate variability readings (SDNN in milliseconds)
- Resting heart rate readings (beats per minute)
- Sleep stage and sleep duration samples
- Respiratory rate readings
- Heart rate samples
- Wrist temperature and SpO2 readings (if available from your device)
- Step count and active energy readings
- Raw workout sensor data from any connected device
- Rolling per-metric baselines (the personal averages and standard deviations the algorithm builds for you)

This data is encrypted at rest on your device, never transmitted to us, and is cleared when you delete your account.

### 2.2 Consumer health data that we receive and store on our servers

The following derived categories are computed on your device and synced to our servers so the app can give you a daily card, briefing, dare, and collection history.

- Your daily recovery score (an integer between 0 and 100, derived from on-device computation)
- Component z-scores that feed the recovery score (derived statistics, not raw measurements)
- Comfort type label (a categorical word such as "Cloud," "Feather," or "Concrete")
- Confidence level (a categorical word that indicates how confident the algorithm is in your score)
- Archetype identifier and inferred personality framework
- Workout metadata: workout type, start time, end time, duration, and the source app name reported by HealthKit
- Daily training intention (a categorical selection you make in the app)
- Daily dare records, badges, and streak counts
- Journal tags you attach to a recovery score
- Personality quiz choices you made during onboarding
- App open timestamps (used to learn your typical wake time so notifications arrive at a sensible hour)
- A re-engagement state flag that tracks whether you have opened the app recently

The recovery score and component z-scores are derived values. They are wellness indicators, not clinical measurements. We declare them as health data here out of caution because Washington's definition of consumer health data is broad.

### 2.3 Account and operational data linked to your consumer health data

The following identifiers and operational data are linked to your consumer health data on our servers:

- Apple account identifier (an opaque user ID Apple gives us through Sign in with Apple)
- Email address (an Apple relay address by default, or your real address if you used a different sign-in path)
- Display name (a pseudonym you choose in onboarding, if you provide one)
- Supabase user identifier (an internal UUID we use to key your records)
- Apple Push Notification service device token (used to deliver morning briefings and dare reminders)
- Subscription status, product identifier, and transaction history (synced from RevenueCat)

### 2.4 Categories we do not collect

We do not collect:

- Raw biometric samples or timestamped readings on our servers
- Precise or coarse location
- Advertising identifiers, including the Apple advertising identifier (IDFA)
- Contacts, address book, or social graph
- Browsing or search history
- Genetic data, biometric identifiers as defined by RCW 19.375 (such as facial geometry or fingerprints), or biometric templates
- Reproductive or sexual health information
- Information about gender-affirming care
- Information about mental health diagnosis or treatment
- Precise location data that could identify a visit to a healthcare facility

If we ever start collecting any of these categories, we will update this policy and obtain fresh consent before doing so.

---

## 3. Sources of consumer health data

Apoyu collects consumer health data from two sources, both initiated by you.

1. **Apple HealthKit.** With your explicit permission granted through the iOS HealthKit consent sheet, Apoyu reads the categories listed in Section 2.1 from Apple Health. We do not collect health data from any other source. We do not import data from third-party fitness platforms, wearables that are not connected through Apple Health, scales, glucose monitors, or any other device.

2. **You, directly.** Daily intentions, journal tags, personality quiz choices, dare completions, and display name come from selections and entries you make inside the app.

We do not buy consumer health data from data brokers. We do not infer consumer health data from public records, social media, or third-party analytics. We do not receive consumer health data from advertising networks or marketing partners.

---

## 4. Purposes of collection, use, and sharing

We collect and use consumer health data only for the following purposes.

- **Compute your daily recovery score.** The on-device algorithm uses the raw biometric data in Section 2.1 to produce the derived score described in Section 2.2.
- **Generate personalized coaching content.** Your recovery score, summary biometric values (HRV in milliseconds, resting heart rate in beats per minute, sleep duration in hours), display name (if provided), intensity level, archetype, and stated daily intention are used to generate your daily briefing, dare, and trading card commentary through third-party AI providers (see Section 6). Raw biometric samples are never sent to these providers.
- **Track your card collection, badges, and dare streaks.** So your collection persists across days and your progress is meaningful.
- **Deliver notifications at appropriate times.** App open timestamps are used to learn your typical wake time so morning briefings and dare reminders arrive when you are actually awake.
- **Manage your subscription and entitlements.** Subscription status is used to gate Pro features and process renewals.
- **Diagnose and fix problems.** Anonymized crash data is used to find and fix bugs.
- **Comply with our legal obligations.** A small audit record of account deletions is retained for compliance purposes (see Section 9).

We do not use consumer health data for any of the following:

- Advertising or marketing targeted to you or to others
- Sale to data brokers, marketers, or any third party
- Profiling for decisions that produce legal or similarly significant effects
- Training third-party AI models on your data
- Insurance underwriting, employment decisions, or credit decisions
- Inferring or targeting based on protected characteristics

---

## 5. Categories of consumer health data shared with third parties

This section is the part Washington's MHMDA specifically requires us to make clear. We share the categories below with the third parties listed in Section 6.

| Category we share | Recipients | Purpose |
|---|---|---|
| Derived recovery score (integer 0 to 100) | OpenAI, Anthropic, Supabase | Generate coaching content; store account data |
| Summary biometric values (HRV in milliseconds, resting heart rate in beats per minute, sleep duration in hours) | OpenAI, Anthropic, Supabase | Generate coaching content; store derived metrics |
| Component z-scores, archetype, comfort type, confidence level | OpenAI, Anthropic, Supabase | Personalize coaching content; store derived metrics |
| Workout metadata (type, duration, start/end time, HealthKit source name) | Supabase | Display recent training context; not sent to LLM providers |
| Daily training intention (categorical) | OpenAI (briefings and dares only), Supabase | Personalize briefings and dares; store history |
| Journal tags, dare completions, badges, streaks | Supabase | Persist your collection and progress |
| Display name (pseudonym) | OpenAI, Anthropic, Supabase | Address you by name in generated content |
| Subscription status and event payload | RevenueCat, Supabase | Manage entitlements and billing events |
| Crash and error events (PII scrubbed, no health data) | Sentry | Diagnose and fix problems |

What we do **not** share with any third party:

- Raw HealthKit samples or timestamped readings
- RR intervals, individual HRV readings, or sleep stage samples
- Apple authentication tokens
- IP address or device location
- Any category listed in Section 2.4

---

## 6. Third parties that receive consumer health data

Each recipient below is a service provider we use to operate the app. None of them is permitted to use your data for their own advertising or to sell it.

| Third party | Role | Jurisdiction | What they receive |
|---|---|---|---|
| Supabase, Inc. | Database, authentication, and Edge Function compute | United States | All server-synced data: derived recovery scores, component z-scores, workout metadata, daily intentions, dare records, badges, journal tags, subscription state, display name, app open timestamps, notification logs, push token |
| OpenAI, L.L.C. | Large language model inference for daily briefings, dares, and common/uncommon trading card commentary | United States | Recovery score, HRV summary in milliseconds, sleep duration in hours, resting heart rate in beats per minute, display name if provided, archetype, intensity level, and daily intention (briefings and dares only). API calls are made with `store: false` to disable provider-side log retention |
| Anthropic, PBC | Large language model inference for rare and legendary trading card commentary | United States | Recovery score, HRV summary in milliseconds, sleep duration in hours, resting heart rate in beats per minute, display name if provided, archetype, and intensity level. Anthropic does not train on API inputs by default |
| RevenueCat, Inc. | Subscription processing, entitlement management | United States | Subscription product identifier, transaction events, the Apoyu user identifier (used only as `appUserID`), and event metadata fields such as currency, country code, environment, and original purchase identifiers. No biometric or recovery data |
| Functional Software, Inc. (Sentry) | Crash reporting and diagnostics | United States | Crash and error event payloads. PII fields (email, IP address, identities, user metadata, refresh and access tokens, Apple identifiers, Apple identity tokens, authorization codes, provider strings) are scrubbed by a `beforeSend` hook before transmission. No biometric, recovery score, or coaching content data |

Apple Sign in with Apple and Apple Push Notification service are operated by Apple and are not separately listed because they are part of the iOS platform. Apple receives only what its own platform documentation describes.

We do not use any advertising SDK. We do not use Google Analytics, Mixpanel, Amplitude, Firebase Analytics, Segment, AppsFlyer, Adjust, Branch, or any similar third-party analytics or attribution provider.

---

## 7. Your rights under the My Health My Data Act

Washington's MHMDA gives you the following rights regarding consumer health data we hold about you. Apoyu honors these rights for anyone who asks, not only Washington residents.

### 7.1 Right to confirm and access

You may ask us to confirm whether we are collecting, sharing, or selling your consumer health data (we do not sell), and to provide you with a list of all third parties with which we have shared your data.

**How to exercise:** Email us at [CONTACT EMAIL TO BE ADDED] with the subject line "MHMDA access request." Include the email address linked to your account so we can verify you. We will respond within 45 days.

### 7.2 Right to withdraw consent

You may withdraw consent at any time for our collection and sharing of your consumer health data.

**How to exercise:**

- To stop new HealthKit reads: open iOS Settings, tap **Health**, tap **Data Access & Devices**, tap **Apoyu**, and turn off the categories you no longer want shared. Apoyu will stop reading those categories immediately.
- To stop server-side processing entirely: delete your account through the app (Settings → Account → Delete Account). When you do this, we erase your data as described in Section 9.

Withdrawing consent does not undo processing that already happened.

### 7.3 Right to deletion

You may ask us to delete the consumer health data we hold about you. Account deletion is the primary way to do this.

**How to exercise:** Open the app, go to **Settings → Account → Delete Account**, and confirm. The app will:

1. Revoke your Sign in with Apple authorization before any data is deleted
2. Delete every row of your data from our database across all user-keyed tables
3. Clear locally stored recovery history, baselines, and card state from your device
4. Sign you out

You may also email us at [CONTACT EMAIL TO BE ADDED] with the subject line "MHMDA deletion request." We will complete deletion within 30 days of a verified request.

A small audit trail of the deletion (the timestamp and the fact that a deletion occurred, with the user identifier removed or anonymized) is retained for compliance purposes. The audit record does not contain consumer health data. See Section 9.

### 7.4 No discrimination for exercising rights

We will not deny you the app, charge you a different price, or provide a different level of service because you exercised any right under this policy.

### 7.5 What we will ask you to verify

To protect your data, we may ask you to verify a deletion or access request by signing in to the app or by confirming control of the email address linked to your account. We will not ask for additional sensitive information.

---

## 8. How to appeal a denied request

If we deny a rights request, we will tell you why in writing. You may appeal that decision by emailing [CONTACT EMAIL TO BE ADDED] with the subject line "MHMDA appeal" within 60 days of our denial.

We will respond to your appeal within 60 days. If we maintain our denial, our response will tell you how to contact the Washington State Attorney General's Office. The Attorney General's consumer protection page is at [https://www.atg.wa.gov/file-complaint](https://www.atg.wa.gov/file-complaint).

You also have the right to bring a private cause of action under RCW 19.373.060 through the Washington Consumer Protection Act.

---

## 9. How we retain and delete data

While your account is active, we retain your consumer health data for as long as you continue to use Apoyu. Daily records (recovery scores, cards, dares, intentions) build your history and collection over time.

When you delete your account:

- All consumer health data tied to your user identifier is deleted from our database in a single cascading transaction across every user-keyed table
- On-device storage is cleared by the app: rolling baselines, recovery history, card state, settings, and any cached values
- Locally stored authentication tokens are cleared from iOS Keychain
- Your Sign in with Apple authorization is revoked with Apple before deletion proceeds

Two narrow exceptions, neither of which contains consumer health data:

- **Account deletion audit record.** A record in our `consent_records` table that an account deletion occurred, with the user identifier removed or anonymized. Retained for legal compliance under GDPR Article 17(3) and equivalent record-keeping obligations.
- **Released Ember Code.** If you generated a referral code, the code itself is held for 90 days so it cannot be re-assigned immediately to another user. The code is not linked to consumer health data.

We do not retain copies of your data in backups beyond the retention period set in our database provider's standard backup window.

---

## 10. Security

We protect consumer health data using:

- On-device encrypted storage (MMKV) for raw biometric values and rolling baselines, which never leave the device
- iOS Keychain (`expo-secure-store`) for authentication tokens and Apple identifiers
- Row-level security policies in our database that scope every record to its owning user, verified by an automated test before every release
- Server-side proxy through Supabase Edge Functions for every call to an AI provider, so our third-party API keys never appear in the app and rate limits can be enforced
- PII scrubbing on crash and diagnostic events before transmission to Sentry
- HTTPS for all network communication

Despite these measures, no system is perfectly secure. If a breach affects your consumer health data, we will notify you and any required authorities within the timelines required by applicable law, including the FTC Health Breach Notification Rule where it applies.

---

## 11. Children

Apoyu is not directed to children under the age of 13. We require users to confirm they are at least 13 during onboarding before any account is created. If you believe a child under 13 has created an account with us, contact [CONTACT EMAIL TO BE ADDED] and we will delete the account promptly.

We do not knowingly collect consumer health data from anyone under 13. We do not knowingly sell consumer health data of any minor.

---

## 12. Medical care and HIPAA

Apoyu is a general wellness product. It is not intended to diagnose, treat, cure, or prevent any disease. Recovery scores, briefings, dares, and trading card content are personalized wellness information, not medical advice. If you have a medical concern, contact a qualified healthcare provider.

We are not a HIPAA covered entity. Apoyu is not a HIPAA business associate. If your data is protected by HIPAA elsewhere (for example, by a hospital system), the protections HIPAA provides apply at that source, not here.

---

## 13. Changes to this policy

We may update this policy if our practices change or the law changes. When we make material changes, we will notify you inside the app before the new version takes effect, and we will update the "Last updated" date at the top of this document. Continued use of the app after the effective date constitutes acceptance of the updated policy.

If a change expands the categories of consumer health data we collect or the third parties with whom we share it, we will ask for fresh consent before applying the change to data we already hold about you.

---

## 14. Contact

For any question about this policy or to exercise any right described above:

**Email:** [CONTACT EMAIL TO BE ADDED]
**Subject lines we monitor:** "MHMDA access request," "MHMDA deletion request," "MHMDA appeal," or simply "Privacy question"
**App:** apoyu.app
**General Privacy Policy:** [https://apoyu.app/privacy](https://apoyu.app/privacy)
**Terms of Service:** [https://apoyu.app/terms](https://apoyu.app/terms)

You may also contact the Washington State Attorney General's Office if you believe your rights have been violated: [https://www.atg.wa.gov/file-complaint](https://www.atg.wa.gov/file-complaint).

---

*This document is a draft generated from a codebase audit and an alignment check against Apoyu's privacy nutrition labels disclosure. It has not been reviewed by legal counsel and must not be published until reviewed and approved.*
