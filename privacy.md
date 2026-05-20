---
layout: page
title: Privacy Policy
permalink: /privacy
---

> **DRAFT, pending legal review.** This text is generated from a codebase audit and is not legal advice. Pending counsel review before publication.

**Effective date:** [YYYY-MM-DD, TBD before publication]
**Last updated:** [YYYY-MM-DD, TBD before publication]

---

## 1. Introduction

Apoyu is operated by Daryll Cheng, a sole proprietor doing business as Apoyu ("Apoyu," "we," "our," or "us"). Apoyu is a personal recovery and wellness app that uses your health data to generate a daily recovery score, coaching cards, and wellness insights. This Privacy Policy explains what data we collect, why we collect it, who we share it with, and how you can control or delete it.

Apoyu is a general wellness product, not a medical device. Recovery scores and coaching content are not medical advice.

In ordinary operation, Apoyu processes raw Apple Health readings on your device and does not transmit those raw readings to our servers. Derived values and certain account-linked metadata are synced as described below. Raw HealthKit readings stay on device; server-synced data includes your derived recovery metrics, certain workout metadata, account identifiers, preferences, and related app-functionality records described in Section 2.2.

---

## 2. What data we collect and why

### 2.1 Data that stays on your device (not transmitted to Apoyu servers)

<!-- Source: CLAUDE.md - Raw biometric data stays on device. Only derived scores sync to Supabase -->
<!-- Source: codebase-state-snapshot-2026-04-28.md section 4, MMKV stores for baselines and computed scores -->

The following data is read from Apple Health, processed locally by the Apoyu app, and in ordinary operation is not transmitted to our servers:

- Heart rate variability (HRV) readings, in milliseconds (SDNN)
- Resting heart rate readings, in beats per minute
- Sleep stage and sleep duration samples
- Respiratory rate readings
- Heart rate samples
- SpO2 readings (if available from your device)
- Step count and active energy readings
- Raw workout sensor data from any connected device
- Rolling per-metric baselines (the personal averages and standard deviations the algorithm builds for you)

This data is processed entirely on your device by our recovery algorithm and is stored only in encrypted local storage (MMKV) keyed to your account. It is cleared when you delete your account.

### 2.2 Data we collect and store on our servers

<!-- Source: codebase-state-snapshot-2026-04-28.md section 8, database schema -->

**Account and identity data**

- Email address, which is typically an Apple relay address provided through Sign in with Apple
- Apple account identifier (an opaque user ID provided through Sign in with Apple)
- Your display name, if you choose to provide one during onboarding
- Account creation date and onboarding completion status

**Recovery and coaching data**

- Your daily recovery score (a numeric value derived from your health metrics on-device)
- Component z-scores that feed the recovery score (derived statistics, not raw measurements)
- Comfort type label and confidence level (categorical wellness indicators)
- Archetype identifier and inferred personality framework
- Your daily training intentions (short text entries you select each morning)
- Generated coaching content: daily briefings, trading card commentary, and daily dares associated with your account
- Dare completion records and badge streak data
- Weekly coaching cards (Pro subscribers only)
- Workout metadata: type, start time, end time, duration, and the source app name reported by HealthKit (not raw sensor data)

**App usage and preferences**

- Your content intensity preference (Encouraging, Savage, or Unhinged), which affects the tone of generated content
- Notification preferences (morning briefing enabled, dare reminder enabled, learned wake time)
- App open events used to learn your typical wake time for better notification scheduling
- Collection statistics (counts and metadata for your trading cards)
- Card reveal state (whether you have seen today's card)
- Re-engagement state flag that tracks whether you have opened the app recently

**Subscription data**

- Your subscription status (free trial, active Pro, expired) synced from RevenueCat
- Subscription expiration date
- Subscription event history (purchases, renewals, cancellations) for billing records

**Diagnostic data**

- Error reports and crash diagnostics sent to Sentry (see Section 4.5)
- Application health events used for debugging (these do not include raw health data)

### 2.3 Data we do not collect

We do not collect:
- Precise geolocation
- Advertising identifiers (we do not implement App Tracking Transparency or request IDFA)
- Data from other apps on your device
- Keystroke or input data beyond what you explicitly enter in the app

---

## 3. How we use your data and lawful basis

<!-- Source: codebase-state-snapshot-2026-04-28.md section 5, Edge Functions and LLM routing -->

We use the data we collect to:

- Compute and display your daily recovery score, which is the core function of the app
- Generate personalized daily briefings, trading card commentary, and dare suggestions tailored to your recovery data and stated intentions
- Deliver notifications at times learned from your app usage patterns
- Track your dare streaks, badges, and card collection
- Manage your subscription and enforce entitlement (free vs. Pro features)
- Diagnose and fix bugs and crashes via anonymized error reports
- Comply with our legal obligations, including maintaining records required by applicable privacy law

We do not currently use your data for advertising targeting, sell it to third parties, or use it for any purpose not described in this policy.

**Lawful basis (GDPR Article 6).** Where the EU or UK General Data Protection Regulation applies to our processing of your personal data, we rely on the following lawful bases:

- **(a) Explicit consent** for processing health-derived data via Apple HealthKit, collected through the consent screen on first launch. Where the data qualifies as a special category of personal data under GDPR Article 9, we rely on Article 9(2)(a) explicit consent.
- **(b) Performance of a contract** to deliver the subscription services and features you have requested.
- **(c) Legitimate interest** in diagnosing and fixing errors via crash reporting, where the data sent is scrubbed of personal identifiers as described in Section 4.5.

You may withdraw consent at any time by disabling the relevant HealthKit categories in iOS Settings or by deleting your account.

---

## 4. Third-party services

<!-- Source: codebase-state-snapshot-2026-04-28.md section 5, required-secrets.ts listing all integrations -->

### 4.1 Supabase (database and server infrastructure)

We use Supabase to store account data, recovery scores, coaching content, and subscription records. Supabase is a U.S.-based company. Data is stored on Supabase's cloud infrastructure.

### 4.2 OpenAI (AI content generation)

We use OpenAI's API to generate your daily morning briefing, daily dare suggestion, and trading card commentary. To personalize this content, we include:

- Your recovery score for the day (a numeric value, not raw health data)
- Your HRV summary value (milliseconds), sleep duration (hours), and resting heart rate (bpm) as numeric context for briefing and card commentary generation
- Your display name (the pseudonym you set during onboarding), if you provided one
- Your stated daily training intention (text you select from options in the app)
- Your selected content intensity level
- Basic archetype context (the personality framework used to style the content)

OpenAI does not receive your Apple account information or any raw HealthKit data. OpenAI business and API data is not used to train models by default, and we configure API requests not to store response objects where supported (`store: false`). Provider terms may permit limited retention for abuse prevention; see OpenAI's privacy policy for details.

<!-- Source: supabase/functions/_shared/model-router.ts -->

**Model used:** GPT-4.1 Mini

### 4.3 Anthropic (AI content generation, rare and legendary cards)

We use Anthropic's API to generate rare and legendary trading card commentary. The same recovery, biometric summary, and identity context described in Section 4.2 applies: recovery score, HRV summary value (ms), sleep duration (hours), resting heart rate (bpm), display name (if provided), intensity level, and archetype context. Daily training intention is not included in card commentary generation and is not sent to Anthropic.

Anthropic does not use commercial API inputs or outputs for model training by default. Provider terms may permit limited retention for abuse prevention; see Anthropic's privacy policy for details.

<!-- Source: supabase/functions/_shared/model-router.ts -->

**Model used:** Claude Haiku

### 4.4 RevenueCat (subscription management)

We use RevenueCat to manage subscriptions, process purchase events from Apple, and verify entitlements. RevenueCat receives:

- Your Supabase account identifier (a UUID, not your Apple ID or email), passed as `appUserID`
- The full RevenueCat webhook event payload, which includes subscription product, transaction ID, and expiration date, and may also include fields such as currency, pricing, country code, period type, environment (sandbox vs. production), and original purchase identifiers

RevenueCat does not receive health data or content generated by the app. RevenueCat retains your subscription transaction history on its own systems for its standard business and legal compliance period, even after Apoyu deletes its own records. See https://www.revenuecat.com/privacy for details.

### 4.5 Sentry (error monitoring)

We use Sentry to capture crash reports and application errors. We do not transmit personally identifiable information; specifically, we remove the following fields before transmission to Sentry:

- Email address
- IP address
- Username
- Apple account identifier
- Apple Sign-In tokens (identity token, authorization code)
- OAuth refresh and access tokens
- User metadata fields (except a small allowlist of non-identifying flags)
- Provider strings

<!-- Source: codebase-state-snapshot-2026-04-28.md section 6, Sentry integration, beforeSend hook -->

We may still transmit non-identifying device characteristics (device model, iOS version, app version) and crash diagnostic data such as stack traces for debugging. Sentry does not receive recovery scores, health data, or content generated by the app.

### 4.6 Apple

We use Apple's services for:

- **Sign in with Apple.** User authentication. Apple provides us with a unique account identifier and, typically, an Apple relay email address.
- **App Store.** Subscription billing and payment processing. Apple manages all payment information; we never see your payment card details.
- **HealthKit.** We request read access to your Apple Health data for on-device processing only. We do not upload HealthKit data to Apple or any third party.
- **Push notifications.** We use Apple Push Notification service (APNs) to deliver morning briefing and dare reminder notifications.

---

## 5. Data retention and deletion

<!-- Source: account-deletion-flow-audit-2026-04-29.md section 6, DB coverage of delete_user_account RPC -->

**During active use:** We retain your data for as long as your account exists.

**Account deletion:** When you delete your account through the app (Settings > Account > Delete Account), we:

1. Revoke your Sign in with Apple authorization with Apple before deleting any data. In rare cases where the Apple sign-in must be re-verified, the app will direct you to revoke authorization through iOS Settings and re-authorize, then retry deletion.
2. Delete all your user-keyed records from our database, including recovery scores, trading cards, daily dares, intentions, briefings, notifications, subscription events, and all other personal records
3. Clear all locally stored data on your device (recovery history, card state, settings)
4. Sign you out of the app

The following records are retained after account deletion for legal and operational reasons:

- **Consent records.** A record that an account deletion was requested (your account identifier is removed; only the fact of deletion and timestamp are kept). This is retained for legal compliance.
- **Ember Code records.** If you used or generated an Ember Code referral, the code itself is retained for 90 days so it cannot be re-assigned immediately to another user.

Account deletion removes your data from our live systems immediately. Routine automated backups maintained by our database provider may contain copies of your data for up to 7 days (the standard Supabase backup window for our plan tier) before they are overwritten. We do not access these backups except to recover from a service-wide incident, and deleted user data will not be restored. Your card collection and recovery history cannot be recovered after deletion.

**Deleting your Apoyu account does not cancel any App Store subscription;** billing continues until you cancel through Apple. Before deleting your account, we recommend cancelling your subscription in Settings > [Your Apple ID] > Subscriptions > Apoyu.

---

## 6. Data security

We protect your data using:

- **Encrypted local storage.** Health baselines and computed scores are stored in encrypted local storage on your device (MMKV).
- **Keychain storage.** Your authentication tokens are stored in the iOS Keychain (`expo-secure-store`), not in unencrypted storage.
- **Row-level security.** Our database uses row-level security policies that prevent any user from accessing another user's data.
- **Service-role isolation.** Sensitive operations (reading Apple Sign-In tokens, inserting trading cards and dares) are performed only by server-side Edge Functions using elevated permissions; the app client has no write access to these tables.
- **PII scrubbing.** We apply best-effort PII scrubbing on the structured fields of error reports before transmission to our diagnostics service.
- **HTTPS.** All network communication uses HTTPS.

No system is perfectly secure. If a breach affects your personal data, we will notify you and any required authorities within the timelines required by applicable law.

---

## 7. Children's privacy

Apoyu is not designed for or directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us and we will delete it promptly.

---

## 8. International users

This Privacy Policy describes our current practices. Additional region-specific notices may apply where required by law.

If you are located in the European Economic Area or the United Kingdom, the lawful bases described in Section 3 apply to our processing. You have the rights described in Section 9. You also have the right to lodge a complaint with the data protection authority in your country of residence.

If you are located in California, please see the "California Residents" subsection in Section 9.

If you are located in Washington State, please also see our separate [Consumer Health Data Privacy Policy](https://apoyu.app/health-privacy), which describes additional rights under the Washington My Health My Data Act.

---

## 9. Your rights and choices

Depending on your location, you may have rights regarding your personal data, including the right to:

- **Access.** Request a copy of the data we hold about you.
- **Deletion.** Delete your account and all associated data (available in-app via Settings > Account > Delete Account).
- **Correction.** Request correction of inaccurate data.
- **Portability.** Request a copy of your data in a structured, commonly used format.
- **Withdrawal of consent.** Withdraw the HealthKit consent in iOS Settings, or delete your account to stop all server-side processing.
- **Opt out.** We do not sell your personal data and do not use it for advertising targeting.

To exercise these rights, email us at support@apoyu.app.

**Notification preferences.** You can enable or disable morning briefing and dare reminder notifications at any time in Settings > Notifications.

**Intensity level.** You can change the content intensity level for Apoyu's coaching voice at any time in Settings.

### California Residents

Under the California Consumer Privacy Act (CCPA, as amended by the CPRA), California residents have the rights described in this Section 9. The following categories provide the structural disclosure required by California Civil Code Section 1798.110.

| Category of personal information we collect | Sources | Business or commercial purpose | Categories of third parties with whom shared |
|---|---|---|---|
| Identifiers (Apple account ID, Supabase user UUID, email address typically an Apple relay) | You via Sign in with Apple | Authenticate your account; deliver notifications | Service providers (Supabase, RevenueCat) |
| Customer records (display name, if provided) | You directly in onboarding | Personalize coaching content | Service providers (Supabase, OpenAI, Anthropic) |
| Commercial information (subscription status, transaction events) | Apple (via RevenueCat) | Manage subscription and entitlements | Service providers (Supabase, RevenueCat) |
| Internet or other network activity (app open timestamps, re-engagement state) | You via app use | Schedule notifications; measure engagement | Service providers (Supabase) |
| Health-related information (recovery score, component z-scores, summary biometric values, workout metadata) | You via Apple HealthKit, computed on-device | Compute recovery score; generate coaching content | Service providers (Supabase, OpenAI, Anthropic) |
| Inferences (archetype, comfort type, confidence level) | Derived from health-related and quiz data | Personalize coaching content | Service providers (Supabase, OpenAI, Anthropic) |

We have not sold or shared your personal information for cross-context behavioral advertising in the preceding 12 months. California residents have the right to know what personal information we collect, the right to delete personal information, the right to correct inaccurate personal information, the right to opt out of the sale or sharing of personal information (we do not sell or share for advertising), the right to limit the use of sensitive personal information, and the right not to be subject to retaliation for exercising these rights.

To exercise California rights, email support@apoyu.app with the subject line "CCPA request." Authorized agents may submit a request on your behalf with written authorization and verification of your identity.

---

## 10. Changes to this policy

If we make material changes to this Privacy Policy, we will update the effective date and post the revised policy at apoyu.app/privacy. If the changes materially affect your rights, we will require you to acknowledge the update on next app launch.

---

## 11. Contact

If you have questions about this Privacy Policy or want to exercise your data rights, contact us at:

**Email:** support@apoyu.app
**App:** apoyu.app

---

*This document is a draft generated from a codebase audit on 2026-04-29 and revised against second-pass AI review on 2026-05-20. It has not been reviewed by legal counsel and must not be published until reviewed and approved.*
