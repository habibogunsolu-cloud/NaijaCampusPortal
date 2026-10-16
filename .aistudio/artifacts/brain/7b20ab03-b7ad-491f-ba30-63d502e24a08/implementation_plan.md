# Implementation Plan: Admin Cleanup & Monetag Safe Ad Pacing

## 1. Context & User Requirements
- The user's Monetag screenshots confirm real ad activity and initial earnings ($0.013 profit, ~$0.57 CPM).
- **Admin Dashboard Cleanup**: Remove all balance checking, balance inputs, and currency ($/₦) boxes from the admin dashboard (`UserProfileTab.tsx` and `AdSettingsModal.tsx`).
- **Retain Clean Counters**: Keep only the simple, verified **Ad Impressions** counter and **Study Dwell Time** (minutes) so the user can monitor genuine candidate activity without distracting currency widgets.
- **Monetag Account Safety (Addressing "Like how?")**: In the user's Monetag screenshot, Monetag warned against "Auto / Self traffic". To prevent account suspension from self-testing or repeated quick triggers, introduce a **safe cooldown / frequency cap** (e.g., maximum 1 ad trigger per 4–5 minutes per visitor), ensuring all traffic registered on Monetag is natural and compliant.

---

## 2. Proposed Changes

### A. Admin Dashboard Cleanup (`UserProfileTab.tsx`)
1. **Remove Balance & Currency Boxes**:
   - Remove the `$walletBalance` input and save form.
   - Remove the estimated USD (`$`) and Naira (`₦`) calculation boxes.
   - Remove the bank payout manual estimate widget.
2. **Retain Clean Activity Counters**:
   - Keep a clean, sleek 2-card stats display:
     - **Total Ad Impressions** (actions + study dwell views).
     - **Study Dwell Time** (total minutes candidates spent studying in the app).
3. **Preserve Core Publisher Controls**:
   - Primary Monetag Direct Link configuration.
   - Optional Secondary Ad Network link (Adsterra / PropellerAds) with dual waterfall toggle.
   - JAMB Prescribed Novel real-time synchronizer.
   - Custom Portal Share link.

### B. Ad Settings Modal Cleanup (`AdSettingsModal.tsx`)
1. Remove estimated revenue ($ and ₦) card.
2. Keep the clean impression count, dwell minutes, network link inputs, and waterfall strategy options.

### C. Safe Ad Frequency Capping & Account Protection (`src/utils/safeOpen.ts` / Ad Triggers)
1. Implement a 4-minute session cooldown helper (`hasAdCooldownExpired()`).
2. When an ad is triggered (e.g. submitting an exam or generating a slip), check if 4 minutes have elapsed since the last ad trigger on that device.
3. If on cooldown, skip opening the ad link, protecting the user from triggering Monetag's anti-fraud algorithm during testing or rapid user navigation.

---

## 3. Verification & Testing
1. Verify that the admin dashboard (PIN `017014`) renders cleanly with only impression and dwell counters, without any balance or currency boxes.
2. Verify that ad links only open after the safe interval, keeping the account 100% compliant with Monetag's policy against self-traffic.
3. Run `lint_applet` and `compile_applet` to confirm zero TypeScript and build errors.
