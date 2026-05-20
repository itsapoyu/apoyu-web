---
layout: page
title: Terms of Use
permalink: /terms
---

> **DRAFT, pending legal review.** This text is generated from a codebase audit and is not legal advice. Pending counsel review before publication.

**Effective date:** [DATE TO BE SET BEFORE PUBLICATION]
**Last updated:** [DATE TO BE SET BEFORE PUBLICATION]

---

## 1. Acceptance of terms

By downloading, installing, or using the Apoyu app ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.

These Terms form a binding agreement between you and Daryll Cheng, a sole proprietor doing business as Apoyu ("Apoyu," "we," "our," or "us").

---

## 2. Eligibility

You must be at least 13 years old to use the App. By using the App, you represent and warrant that you meet this requirement.

Apoyu is not a medical application. The recovery scores, coaching content, and training suggestions provided by the App are for informational and wellness purposes only. They are not medical advice and are not a substitute for consultation with a licensed healthcare provider. Do not use Apoyu's output to make medical decisions.

---

## 3. Account and Apple Sign-In

### 3.1 Account creation

You create an Apoyu account using Apple Sign-In. You are responsible for maintaining the security of your Apple ID and for all activities that occur under your account.

### 3.2 Account deletion

You may delete your account at any time through Settings → Account → Delete Account. Account deletion permanently removes your data and cannot be undone. See our Privacy Policy for details of what is deleted and what is retained.

### 3.3 One account per person

Apoyu accounts are personal and non-transferable. You may not share, sell, or transfer your account to another person.

---

## 4. Subscription and billing

<!-- Source: spec-revenucat.md — subscription products, pricing, trial, billing terms -->
<!-- Source: codebase-state-snapshot-2026-04-28.md §5 — process-webhook Edge Function -->

### 4.1 Free trial

New Apoyu accounts receive a 14-day free trial with full access to all Pro features. No payment information is required to start your trial. The trial begins on the date your account is created and is tracked server-side — reinstalling the App does not reset your trial.

### 4.2 Subscription plans

After your free trial, you may subscribe to Apoyu Pro:

| Plan | Price | Billing |
|---|---|---|
| Monthly | $5.99 per month | Billed monthly |
| Annual | $34.99 per year | Billed annually |

Prices are in USD. Applicable taxes may be added by Apple based on your location. <TODO: counsel to advise on price display requirements in non-US jurisdictions>

### 4.3 Billing and payment

All payments are processed by Apple through the App Store. Apoyu does not collect or store your payment information. Your subscription will automatically renew at the end of each billing period unless you cancel at least 24 hours before the renewal date.

You can manage and cancel your subscription at any time in: **Settings → [Your Apple ID] → Subscriptions → Apoyu.**

### 4.4 Free features

The following features are available to all users at no charge, both during and after the free trial:

- Daily recovery score
- Daily morning briefing
- Daily trading card (all rarities)
- Trading card collection
- Daily dare and completion tracking
- Dare badges and streaks
- Card sharing
- Apple Watch companion app
- iOS Home Screen widget

### 4.5 Pro features

The following features require an active Apoyu Pro subscription:

- Weekly coaching card
- Monthly Apoyu Report
- Behavioral journal and correlations
- Optimal bedtime prediction and bedtime notification
- Advanced collection statistics
- Ad-free experience

### 4.6 Billing issues and grace period

If a subscription payment fails, Apple provides a 16-day billing grace period during which you retain Pro access. If the payment issue is not resolved within the grace period, your subscription will expire and Pro features will become unavailable. Apple will retry failed payments for up to 60 days.

### 4.7 Cancellation

Cancelling your subscription stops future billing. You retain Pro access until the end of your current billing period. Apoyu does not provide refunds for partial subscription periods. To request a refund, contact Apple directly via the App Store or at reportaproblem.apple.com.

### 4.8 Account deletion with active subscription

Deleting your Apoyu account does not cancel your App Store subscription. Your subscription will continue to be billed by Apple until you cancel it separately. Before deleting your account, we recommend cancelling your subscription in **Settings → [Your Apple ID] → Subscriptions → Apoyu** to avoid additional charges.

<!-- Source: account-deletion-flow-audit-2026-04-29.md — Finding F2: subscription not cancelled on deletion -->
<!-- Source: spec-revenucat.md §10.3: "Account deletion with active subscription" -->

---

## 5. Permitted use and restrictions

### 5.1 Permitted use

You may use the App for your own personal, non-commercial recovery coaching and wellness purposes.

### 5.2 Restrictions

You agree not to:

- Reverse engineer, decompile, or disassemble the App or any part of it
- Attempt to gain unauthorized access to the App's backend systems, databases, or Edge Functions
- Use the App in any manner that could overload or harm our infrastructure
- Use automated tools (bots, scrapers, scripts) to access the App
- Attempt to manipulate or forge your recovery scores, subscription status, or entitlements
- Use the App to generate or distribute harmful, illegal, or abusive content
- Violate any applicable law or regulation in connection with your use of the App

---

## 6. Intellectual property

### 6.1 Our content

The App, including its code, design, animations, character (Apoyü), lore, coaching templates, trading card artwork, and generated content, is owned by Apoyu and protected by intellectual property law. You may not reproduce, distribute, or create derivative works from any Apoyu content without our express written permission.

### 6.2 Your content

You own the data you enter into the App, including your training intentions and any text-based inputs. By using the App, you grant Apoyu a limited license to process and store that content for the purpose of providing the App's services to you.

### 6.3 Generated content

The daily briefings, trading card commentary, dare suggestions, and coaching cards generated by the App are created using AI and are personalized to your data. You may share this content for personal, non-commercial purposes. We retain ownership of the templates, prompts, and underlying system that generates this content.

### 6.4 Apple Health data

You retain full ownership and control of your Apple Health data. Apoyu processes your health data on-device with your permission via HealthKit. We do not claim any ownership over your health metrics or the algorithms you use to interpret them.

---

## 7. Health and safety disclaimer

Apoyu provides wellness and recovery coaching based on Apple Health data. It is intended as a training support tool only.

**Apoyu is not a medical device.** The recovery scores, briefings, and coaching content are not a substitute for professional medical advice, diagnosis, or treatment. If you experience health symptoms, pain, or discomfort, consult a qualified healthcare provider. Do not disregard professional medical advice or delay seeking it because of anything you read or see in the App.

Apoyu is not responsible for any health-related decisions you make based on content generated by the App.

---

## 8. Limitation of liability

<TODO: counsel to advise on liability cap amount and language appropriate to your jurisdiction and entity type. The following is a placeholder framework.>

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:

- APOYU PROVIDES THE APP "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT
- APOYU IS NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP
- APOYU'S TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM THESE TERMS OR YOUR USE OF THE APP SHALL NOT EXCEED THE AMOUNT YOU PAID FOR YOUR CURRENT SUBSCRIPTION PERIOD OR $10 USD, WHICHEVER IS GREATER <TODO: counsel to advise on cap>

Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability. The above may not apply to you in full.

---

## 9. Indemnification

You agree to indemnify and hold harmless Apoyu and its officers, employees, and agents from any claims, damages, losses, or expenses (including reasonable legal fees) arising from: (a) your use of the App in violation of these Terms; (b) your violation of any applicable law or third-party right; or (c) content you submit through the App.

---

## 10. Termination

We may suspend or terminate your account if you violate these Terms, engage in fraudulent behavior, or if required by law. You may terminate your account at any time by deleting it through the App. Termination does not entitle you to a refund of any subscription fees already paid.

---

## 11. Dispute resolution

<TODO: counsel to advise on dispute resolution mechanism — arbitration clause, class action waiver, small claims carve-out, and governing jurisdiction. These are highly jurisdiction-specific and require legal expertise. The following is a placeholder.>

**Governing law:** These Terms are governed by the laws of [JURISDICTION TO BE DETERMINED]. <TODO: counsel to advise>

**Informal resolution:** Before filing any formal dispute, please contact us at support@apoyu.app to try to resolve the issue informally. Most concerns can be resolved within 30 days.

**Formal dispute:** <TODO: counsel to advise on arbitration vs. litigation, venue, and class action waiver language>

---

## 12. Changes to these Terms

We may update these Terms from time to time. If we make material changes, we will notify you in the App before the changes take effect. Your continued use of the App after the effective date constitutes acceptance of the updated Terms.

---

## 13. Miscellaneous

**Entire agreement:** These Terms, together with our Privacy Policy, constitute the entire agreement between you and Apoyu regarding the App.

**Severability:** If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.

**No waiver:** Failure to enforce any provision of these Terms does not constitute a waiver of our right to enforce it in the future.

**Assignment:** You may not assign your rights under these Terms. We may assign our rights in connection with a merger, acquisition, or sale of assets.

---

## 14. Contact

If you have questions about these Terms, contact us at:

**Email:** support@apoyu.app
**App:** apoyu.app

<TODO: counsel to advise on whether a physical mailing address is required in your target jurisdictions>

---

*This document is a draft generated from a codebase audit on 2026-04-29. It has not been reviewed by legal counsel and must not be published until reviewed and approved.*
