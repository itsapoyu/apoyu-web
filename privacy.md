---
layout: page
title: Privacy Policy
permalink: /privacy
---

> **DRAFT, pending legal review.** This text is generated from a codebase audit and is not legal advice. Pending counsel review before publication.

**Effective date:** [DATE TO BE SET BEFORE PUBLICATION]
**Last updated:** [DATE TO BE SET BEFORE PUBLICATION]

---

## 1. Introduction

Apoyu ("we," "our," or "us") is a personal recovery coaching app that uses your health data to generate a daily recovery score, coaching cards, and training guidance. This Privacy Policy explains what data we collect, why we collect it, who we share it with, and how you can control or delete it.

We built Apoyu around a simple principle: **your raw health data never leaves your device.** The Apple Health metrics that power your recovery score (heart rate variability, sleep, resting heart rate, steps, active energy, and training load) are processed on your iPhone and only the resulting numeric score and analytics are ever stored on our servers.

---

## 2. What data we collect and why

### 2.1 Data that stays on your device (never transmitted to Apoyu servers)

<!-- Source: CLAUDE.md — "Raw biometric data stays on device. Only derived scores sync to Supabase" -->
<!-- Source: codebase-state-snapshot-2026-04-28.md §4 — MMKV stores for baselines and computed scores -->

The following data is read from Apple Health, processed locally by the Apoyu app, and **never sent to our servers:**

- Heart rate variability (HRV) readings
- Sleep duration and sleep stage data
- Resting heart rate measurements
- Step count and active energy data
- Training load and workout session data
- Raw workout metrics from any connected device

This data is processed entirely on your device by our recovery algorithm and is stored only in encrypted local storage (MMKV) keyed to your account. It is cleared when you delete your account.

### 2.2 Data we collect and store on our servers

<!-- Source: codebase-state-snapshot-2026-04-28.md §8 — database schema, 26 tables -->

**Account and identity data**

- Apple account identifier and email address (provided via Apple Sign-In)
- Your display name, if you choose to provide one during onboarding
- Account creation date and onboarding completion status

**Recovery and coaching data**

- Your daily recovery score (a numeric value derived from your health metrics on-device)
- Your daily training intentions (short text entries you select each morning)
- Generated coaching content: daily briefings, trading card commentary, and daily dares associated with your account
- Dare completion records and badge streak data
- Weekly coaching cards (Pro subscribers only)

**App usage and preferences**

- Your content intensity preference (Encouraging, Savage, or Unhinged — affects tone of all content)
- Notification preferences (morning briefing enabled, dare reminder enabled, learned wake time)
- App open events used to learn your typical wake time for better notification scheduling
- Collection statistics (counts and metadata for your trading cards)
- Card reveal state (whether you have seen today's card)

**Subscription data**

- Your subscription status (free trial, active Pro, expired) synced from RevenueCat
- Subscription expiration date
- Subscription event history (purchases, renewals, cancellations) for billing records

**Diagnostic data**

- Error reports and crash diagnostics sent to Sentry (see Section 4 — third-party services)
- Application health events used for debugging (never include raw health data)

### 2.3 Data we do not collect

We do not collect:
- Any raw Apple Health or HealthKit data
- Precise geolocation
- Advertising identifiers (we do not implement App Tracking Transparency or request IDFA)
- Data from other apps on your device
- Keystroke or input data beyond what you explicitly enter in the app

---

## 3. How we use your data

<!-- Source: codebase-state-snapshot-2026-04-28.md §5 — Edge Functions and LLM routing -->

We use the data we collect to:

- Compute and display your daily recovery score, which is the core function of the app
- Generate personalized daily briefings, trading card commentary, and dare suggestions tailored to your recovery data and stated intentions
- Deliver notifications at times learned from your app usage patterns
- Track your dare streaks, badges, and card collection
- Manage your subscription and enforce entitlement (free vs. Pro features)
- Diagnose and fix bugs and crashes via anonymized error reports
- Comply with our legal obligations, including maintaining records required by applicable privacy law

We do not use your data for advertising targeting, sale to third parties, or any purpose not described in this policy.

---

## 4. Third-party services

<!-- Source: codebase-state-snapshot-2026-04-28.md §5 — required-secrets.ts listing all integrations -->
<!-- OQ-4 FLAG FOR DARYLL/COUNSEL: LLM providers (OpenAI and Anthropic) receive recovery scores and intentions in prompt context. See Section 4.2 and 4.3 below. This is the most significant data-sharing disclosure and requires careful review. -->

### 4.1 Supabase (database and server infrastructure)

We use Supabase to store account data, recovery scores, coaching content, and subscription records. Supabase is a U.S.-based company. Data is stored on cloud infrastructure. <TODO: counsel to advise on data processing agreement and storage region disclosure for GDPR/international users>

### 4.2 OpenAI (AI content generation)

> **FLAG FOR COUNSEL (OQ-4):** OpenAI receives your recovery score and daily training intention as part of the prompt context used to generate your daily briefing, dare suggestions, and standard trading card commentary. This constitutes a transfer of derived health-related data to a third-party AI provider. Review OpenAI's data processing terms, opt-out of training data use, and assess disclosure requirements in your jurisdiction.

We use OpenAI's API to generate your daily morning briefing, daily dare suggestion, and trading card commentary. To personalize this content, we include:

- Your recovery score for the day (a numeric value, not raw health data)
- Your HRV summary value (milliseconds), sleep duration (hours), and resting heart rate (bpm) as numeric context for briefing and card commentary generation
- Your display name (the pseudonym you set during onboarding), if you provided one
- Your stated daily training intention (text you select from options in the app)
- Your selected content intensity level
- Basic archetype context (the personality framework used to style the content)

OpenAI does not receive your Apple account information or any raw HealthKit data.

<!-- Source: supabase/functions/_shared/model-router.ts — briefing, card_commentary, dare → openai/gpt-4.1-mini -->

**Model used:** GPT-4.1 Mini

### 4.3 Anthropic (AI content generation — rare and legendary cards)

> **FLAG FOR COUNSEL (OQ-4):** Same disclosure applies as OpenAI. Anthropic receives recovery score and archetype context when generating rare or legendary trading card content.

We use Anthropic's API to generate rare and legendary trading card commentary. The same recovery, biometric summary, and identity context described in Section 4.2 applies: recovery score, HRV summary value (ms), sleep duration (hours), resting heart rate (bpm), display name (if provided), intensity level, and archetype context. Daily training intention is not included in card commentary generation and is not sent to Anthropic.

<!-- Source: supabase/functions/_shared/model-router.ts — rare_card, legendary_card → anthropic/claude-haiku-4-5-20251001 -->

**Model used:** Claude Haiku

### 4.4 RevenueCat (subscription management)

We use RevenueCat to manage subscriptions, process purchase events from Apple, and verify entitlements. RevenueCat receives:

- Your Supabase account identifier (a UUID, not your Apple ID or email)
- The full RevenueCat webhook event payload, which includes subscription product, transaction ID, and expiration date, and may also include fields such as currency, pricing, country code, period type, environment (sandbox vs. production), and original purchase identifiers
- App open events for subscription analytics

RevenueCat does not receive health data or content generated by the app. For more information, see RevenueCat's privacy policy.

### 4.5 Sentry (error monitoring)

We use Sentry to capture crash reports and application errors. Before any data is sent to Sentry, we apply PII scrubbing that removes:

- Apple Sign-In tokens and OAuth tokens
- Your Apple account identifier
- User metadata fields

<!-- Source: codebase-state-snapshot-2026-04-28.md §6 — Sentry integration, beforeSend hook -->

Sentry receives anonymized error traces, device type, iOS version, app version, and the stack trace of the error. It does not receive recovery scores, health data, or personally identifying information.

### 4.6 Apple

We use Apple's services for:

- **Apple Sign-In:** User authentication. Apple provides us with your email address and a unique account identifier.
- **App Store:** Subscription billing and payment processing. Apple manages all payment information; we never see your payment card details.
- **HealthKit:** We request read access to your Apple Health data for on-device processing only. We do not upload HealthKit data to Apple or any third party.
- **Push notifications:** We use Apple Push Notification service (APNs) to deliver morning briefing and dare reminder notifications.

---

## 5. Data retention and deletion

<!-- Source: account-deletion-flow-audit-2026-04-29.md — §6 DB coverage of delete_user_account RPC -->

**During active use:** We retain your data for as long as your account exists.

**Account deletion:** When you delete your account through the app (Settings → Account → Delete Account), we:

1. Revoke your Apple Sign-In authorization with Apple before deleting any data
2. Delete all your user-keyed records from our database, including recovery scores, trading cards, daily dares, intentions, briefings, notifications, subscription events, and all other personal records
3. Clear all locally stored data on your device (recovery history, card state, settings)
4. Sign you out of the app

The following records are retained after account deletion for legal and operational reasons:
- **Consent records:** A record that an account deletion was requested (your account identifier is removed; only the fact of deletion and timestamp are kept). This is retained for legal compliance.
- **Ember Code records:** If you used or generated an Ember Code referral, that record is retained for 90 days.

Account deletion is permanent and cannot be undone. Your card collection and recovery history cannot be recovered after deletion.

**Right to erasure:** <TODO: counsel to advise on GDPR Article 17 compliance, particularly the timing of deletion acknowledgment and whether a deletion request receipt is required in your target jurisdictions>

---

## 6. Data security

We protect your data using:

- **Encrypted local storage:** Health baselines and computed scores are stored in encrypted local storage on your device (MMKV)
- **Keychain storage:** Your authentication tokens are stored in the iOS Keychain, not in unencrypted storage
- **Row-level security:** Our database uses row-level security policies that prevent any user from accessing another user's data
- **Service-role isolation:** Sensitive operations (reading Apple Sign-In tokens, inserting trading cards and dares) are performed only by server-side Edge Functions using elevated permissions; the app client has no write access to these tables
- **PII scrubbing:** Error reports are scrubbed of personal identifiers before transmission to our diagnostics service

---

## 7. Children's privacy

Apoyu is not designed for or directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us and we will delete it promptly.

<TODO: counsel to advise on COPPA applicability and whether age gate or explicit COPPA notice is required for your distribution region>

---

## 8. International users

<TODO: counsel to advise on GDPR (EU/EEA), UK GDPR, CCPA (California), PIPL (China), and other applicable data protection laws based on your intended launch markets. Key topics to address: legal basis for processing under GDPR (legitimate interest vs. consent), data transfer mechanisms for Supabase and LLM providers, right of access/portability obligations, and whether a Data Protection Officer is required.>

---

## 9. Your rights and choices

Depending on your location, you may have rights regarding your personal data, including the right to:

- **Access:** Request a copy of the data we hold about you
- **Deletion:** Delete your account and all associated data (available in-app via Settings → Account → Delete Account)
- **Correction:** Request correction of inaccurate data
- **Portability:** <TODO: counsel to advise on GDPR data portability requirements and implementation>
- **Opt out:** We do not sell your personal data and do not use it for advertising targeting

**Notification preferences:** You can enable or disable morning briefing and dare reminder notifications at any time in Settings → Notifications.

**Intensity level:** You can change the content intensity level for Apoyu's coaching voice at any time in Settings.

---

## 10. Changes to this policy

If we make material changes to this Privacy Policy, we will notify you in the app before the changes take effect. Continued use of the app after the effective date constitutes acceptance of the updated policy.

---

## 11. Contact

If you have questions about this Privacy Policy or want to exercise your data rights, contact us at:

**Email:** support@apoyu.app
**App:** apoyu.app

<TODO: counsel to advise on whether a physical mailing address is required in your target jurisdictions (required for GDPR, CCPA, and several other regimes)>

---

*This document is a draft generated from a codebase audit on 2026-04-29. It has not been reviewed by legal counsel and must not be published until reviewed and approved.*
