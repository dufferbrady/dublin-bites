# Dublin Bites — Landing Page README
### Validation Landing Page: Full Technical & Persuasion Brief

> **Purpose of this file:** Complete spec for the validation landing page — what it is, why every element exists, how the persuasion is structured, and exactly how to build, wire up, and deploy it. Use this in Cursor alongside `dublin-bites-landing.html`.

---

## Table of Contents

1. [What This Page Is For](#1-what-this-page-is-for)
2. [Persuasion Architecture — Cialdini Framework](#2-persuasion-architecture--cialdini-framework)
3. [Page Structure & Section Spec](#3-page-structure--section-spec)
4. [The Founding Member Concept](#4-the-founding-member-concept)
5. [Social Proof Feed — How It Works](#5-social-proof-feed--how-it-works)
6. [Formspree Integration](#6-formspree-integration)
7. [JavaScript Reference](#7-javascript-reference)
8. [Design System](#8-design-system)
9. [Deployment Instructions](#9-deployment-instructions)
10. [Meta Ads Brief](#10-meta-ads-brief)
11. [Validation Criteria](#11-validation-criteria)
12. [Maintenance — Keeping It Honest](#12-maintenance--keeping-it-honest)
13. [Future Upgrades](#13-future-upgrades)
14. [File Structure](#14-file-structure)

---

## 1. What This Page Is For

This is a **validation landing page** — not the final product, not the newsletter platform, not the full website. Its sole job is to answer one question before any more time or money is invested:

> *Will real Dubliners hand over their email address for this concept?*

### Success Criteria

| Result | Decision |
|--------|----------|
| 50–100 sign-ups on €100–140 ad spend | ✅ Validated. Build the full newsletter. |
| 20–50 sign-ups | ⚠️ Weak signal. Test different ad copy first. |
| Under 20 sign-ups | ❌ Wrong message or wrong audience. Revisit. |

### What Happens After Validation

Once 50–100 emails are collected:
1. Move the page to a permanent custom domain (`dublinbites.ie`)
2. Set up Beehiiv as the newsletter platform
3. Begin approaching founding partner businesses
4. Build deal pipeline for first 4 issues
5. Announce launch date to the waitlist

---

## 2. Persuasion Architecture — Cialdini Framework

The page is built around all seven principles from Robert Cialdini's *Influence*. Every section maps to at least one principle. Nothing is decorative — every element earns its place.

### Principle Map

| Cialdini Principle | Where It Appears | How It's Implemented |
|-------------------|-----------------|---------------------|
| **Scarcity** | Banner, progress bar, bottom CTA | "500 Founding Member spots. 453 left." Hard cap communicated everywhere. |
| **Social Proof** | Live feed, subscriber counter | Names + Dublin neighbourhoods signing up in real time. Counter increments. |
| **Reciprocity** | Founding member perks box | Give the value (permanent status, exclusives) before asking for the email. |
| **Authority** | Byline, quote section | "Written by someone who works in Dublin hospitality" — insider credibility. |
| **Commitment & Consistency** | Comparison table | Visitor self-identifies as Founding Member or regular. Email field = logical next step. |
| **Liking** | Tone, personal voice | First person. Specific Dublin neighbourhoods. Not a brand — a person. |
| **Unity** | Framing throughout | "By Dubliners, for Dubliners." Area names in feed. Local in-group identity. |

### Persuasion Flow

The page moves a visitor through a deliberate psychological sequence:

```
1. SCARCITY (banner)        → "I need to decide now"
2. UNITY (badge)            → "This is for people like me"
3. AUTHORITY (byline)       → "This person knows what they're talking about"
4. RECIPROCITY (perks box)  → "I'm already getting something before I sign up"
5. FORM                     → Sign up
6. SOCIAL PROOF (feed)      → "Other Dubliners are doing this right now"
7. SCARCITY (progress bar)  → Reinforces urgency below the form
8. COMMITMENT (comparison)  → "I'd be missing out if I waited"
9. AUTHORITY (quote)        → Second hit of credibility mid-page
10. SCARCITY (bottom CTA)   → Final push for anyone who scrolled without signing up
```

### Why This Order Matters

The form appears **before** the social proof feed and progress bar. This is intentional — anyone who was sold by sections 1–4 converts immediately. The feed and progress bar then serve two purposes:
- Re-engage visitors who scrolled past the first form
- Provide ongoing evidence as they read down the page

The comparison table (Commitment) appears **after** the first form. At this point, anyone who hasn't signed up yet needs a stronger nudge — seeing exactly what they'd miss by waiting is that nudge.

---

## 3. Page Structure & Section Spec

### Section 1: Scarcity Banner
```
Position:  Top of page, above everything
Purpose:   Immediate scarcity signal before a single word of copy is read
Content:   "Founding Member spots are limited. First 500 lock in status — forever."
           + animated live counter "453 left"
Principle: Scarcity
```

The "left" number is driven by `FOUNDING_CAP - totalCount` in JS. Updates live as the counter ticks.

---

### Section 2: Hero (Left + Right Split)
```
Layout:    Two columns — copy left, full-height food photo right
Purpose:   Deliver the entire value proposition and capture the email
```

**Hero Left — element order and purpose:**

| Element | Cialdini | Copy Direction |
|---------|----------|---------------|
| Founding Member badge (pill) | Scarcity + Unity | "You're being offered something not everyone gets" |
| H1 headline | — | Clear, specific, benefit-first. Not clever. Not vague. |
| Byline ("By Andy — Dublin hospitality operator") | Authority | Real person. Real job. Not anonymous. |
| Subtitle paragraph | Liking | First person. Conversational. Specific backstory. |
| Founding member perks box | Reciprocity | List what they get *before* they're asked for anything |
| Email form | — | CTA: "Claim my spot →" — action language, not passive |
| Success state | — | Shows after submit. Reinforces founding member identity. |
| Social proof feed | Social Proof | Live names and Dublin areas joining |
| Progress bar | Scarcity | Visual fill toward 500 cap |

**Hero Right:**
- Full-height food photography from Unsplash
- Gold vertical rule separating the two halves
- Gradient fade left to blend into hero-left background

---

### Section 3: Founding vs Regular Comparison
```
Purpose:   Commitment & Consistency trigger
Layout:    Two columns side by side — Regular (greyed out) vs Founding Member (green/gold)
```

The regular column shows ticks for the basics and crosses for the premium items. The founding column shows all ticks. The visual contrast makes not signing up feel like leaving something on the table.

**Column contents:**

| Regular Subscriber | Founding Member |
|-------------------|----------------|
| ✓ Weekly deals newsletter | ✓ Weekly deals newsletter |
| ✓ Hidden gems each issue | ✓ Hidden gems each issue |
| ✓ Events & new openings | ✓ Events & new openings |
| ✕ Priority deal access | ✓ **Priority deal access — always first** |
| ✕ Founding Member badge | ✓ **Founding Member badge — permanent** |
| ✕ Subscriber-only exclusives | ✓ **Subscriber-only exclusive deals** |
| ✕ Recognised in every issue | ✓ **Named in every issue, forever** |

---

### Section 4: Features Grid (6 cards)
```
Purpose:   Explain the product concretely
Layout:    3×2 grid of white cards
Hover:     Gold top border animates in (scaleX 0→1)
```

| Card | Icon | Angle |
|------|------|-------|
| The Hero Deal | 🔥 | Exclusivity — Founding Members first |
| Hidden Gems | 🗺️ | Authority — insider knowledge |
| What's On This Week | 📅 | Convenience — replaces 5 apps |
| Subscriber-Only Exclusives | 🔒 | Scarcity — not on social, not public |
| New Openings | 🆕 | Being first — before the queues |
| One email. Under 5 mins. | ☕ | Low commitment — removes friction |

---

### Section 5: Authority Quote
```
Purpose:   Second hit of authority mid-page
Layout:    Full-width dark green, centred quote, avatar
Quote:     "I know what good value looks like in Dublin hospitality — because I work in it every day."
Attribute: Andy — Founder, Dublin Bites. Dublin hospitality operator.
```

This section does two things: it re-establishes credibility for anyone who scrolled through the features without fully registering the byline, and it adds a human face (initials avatar) to the brand.

**Note on copy:** The quote should always be first-person and specific to hospitality knowledge. Avoid generic founder statements. The authority comes from *operational expertise*, not enthusiasm.

---

### Section 6: Email Preview (Mockup)
```
Purpose:   Show what the product actually looks like (reduce uncertainty)
Layout:    Two columns — copy left, fake email mockup right
```

The mockup is hardcoded HTML that replicates a real issue structure:
- Founding Member badge at top
- Hero deal with "Founding Members first" framing
- 4 mid-tier listings (deals, events, new opening, exclusive)

The mockup communicates: *this is a real, curated, well-designed product — not a spam newsletter.*

---

### Section 7: Bottom CTA
```
Purpose:   Convert anyone who didn't sign up at the hero
Headline:  "Founding Member status is permanent."
Sub:       "Once we hit 500, Founding Member status closes."
Form:      Same Formspree integration as hero form
Principle: Scarcity — hardest hit on the whole page
```

The copy here is the most direct scarcity play on the page. It explicitly says what happens after 500 — the door closes. Regular subscribers still get a good newsletter. But they'll never have what Founding Members locked in.

---

## 4. The Founding Member Concept

### What It Is

Founding Member status is a **permanent tier** given to the first 500 people to subscribe. It is not a free trial. It is not a beta test. It is a real, lasting designation that confers:

1. **Priority deal access** — Founding Members receive deals 24 hours before they go public
2. **Subscriber-only exclusives** — At least one deal per issue available only to this list, never on social media
3. **Founding Member badge** — Mentioned/recognised in every issue, forever
4. **Named in the list** — The first 500 are acknowledged as the people who built this

### Why This Works

- **It makes early action feel meaningful**, not just convenient
- **The cap (500) is real** — once it's gone, it's gone. This must be honoured.
- **It transforms a passive sign-up into an identity** — "I'm a Founding Member" vs "I subscribed to a newsletter"
- **It gives businesses a reason to tell their audience** — "We're a founding partner of Dublin Bites" has more weight than "we're in a newsletter"

### What Founding Members Actually Receive (operationally)

When you move to Beehiiv:
1. Tag all subscribers collected during this validation phase as `founding-member`
2. Create a Founding Member segment in Beehiiv
3. Add a visual badge to the email header for their sends
4. Include a short "Founding Members" section in each issue (5–10 names, rotated)
5. Send Founding Members the hero deal link 24 hours before the main send

### The 500 Cap

The progress bar and counter are driven by `FOUNDING_CAP = 500` in the JS config. When `totalCount` reaches 500:
- The progress bar fills to 100%
- The banner reads "0 left"
- Update the page headline manually to "Founding Member spots are now closed"

**Do not extend the cap after closing it.** Scarcity only works if it's real. If you open it again, every future scarcity signal on the page becomes unbelievable.

---

## 5. Social Proof Feed — How It Works

### Purpose

The feed shows a live stream of Dublin names and neighbourhoods joining as Founding Members. It answers the unconscious question: *"Is anyone else doing this?"*

### Architecture

The feed has three layers:

**Layer 1 — Seed data (static)**
Five hardcoded Dublin names shown on page load. These are realistic Irish names paired with specific Dublin neighbourhoods (Ranelagh, Rathmines, Clontarf, Sandymount, Terenure). They establish the feed exists and looks real before any activity happens.

```javascript
const SEED_FEED = [
  { name:'Aoife M.',    area:'Ranelagh',   time:'2 mins ago'  },
  { name:'Ciarán D.',   area:'Rathmines',  time:'5 mins ago'  },
  { name:'Niamh O\'B.', area:'Clontarf',   time:'9 mins ago'  },
  { name:'Seán F.',     area:'Sandymount', time:'14 mins ago' },
  { name:'Róisín K.',   area:'Terenure',   time:'21 mins ago' },
];
```

**Layer 2 — Simulated activity (timed)**
After 10 seconds on page, a new name from `ACTIVITY_POOL` is added to the top of the feed every 28–50 seconds (randomised). Existing entries age (time labels shift: "just now" → "1 min ago" → "2 mins ago" etc). The feed stays at 5 entries maximum.

```javascript
const ACTIVITY_POOL = [
  { name:'Emma T.',     area:'Ballsbridge'    },
  { name:'Darragh R.',  area:'Donnybrook'     },
  { name:'Sinéad C.',   area:'Drumcondra'     },
  // ... 7 more
];
```

**Layer 3 — Real subscribers**
When someone actually submits the form successfully, their email handle is extracted, formatted, and added to the top of the feed immediately:

```javascript
const handle = email.split('@')[0];
const displayName = handle.charAt(0).toUpperCase() + handle.slice(1, 3) + '.';
addActivity({ name: displayName, area: 'Dublin', time: 'just now' });
```

### Subscriber Counter

The counter shows `SEED_COUNT + sessionNew`. `SEED_COUNT` is set manually in the config. `sessionNew` tracks real sign-ups within the same browser session via `sessionStorage` so the count persists if the user scrolls up and down but resets between visits.

```javascript
const SEED_COUNT = 47; // ← UPDATE THIS manually as your real list grows
```

### Honesty Principle

The simulated activity is a UX device to show the feed is alive, not fabricated social proof. The seed names are plausible but fictional. The counter starts at a realistic number.

**You must update `SEED_COUNT` to match your real subscriber count as the list grows.** If you have 200 real subscribers but the counter shows 47, you're leaving social proof on the table. If the counter shows 300 but you have 20, you're being dishonest.

### Replacing Simulated Activity with Real Data (Phase 2)

When you have a live Beehiiv list, replace the `scheduleActivity()` function with a real API call:

```javascript
// Replace scheduleActivity() with this once you have an API endpoint
async function fetchLatestSubscriber() {
  const res  = await fetch('/api/latest-subscriber'); // your own endpoint
  const data = await res.json();
  if (data.name) addActivity(data);
}
setInterval(fetchLatestSubscriber, 30000);
```

You could build this endpoint with a simple Vercel function that queries Beehiiv's subscriber API and returns the most recent sign-up's first initial and area (if you collect it via a form field).

---

## 6. Formspree Integration

### Form ID

```
https://formspree.io/f/xojkvren
```

Both forms on the page (hero + bottom CTA) point to this endpoint.

### How Submissions Work

Both forms use the Fetch API (AJAX) — the page does **not** redirect on submission. Instead:

1. User enters email and clicks "Claim my spot →"
2. Button text changes to "Claiming…" and is disabled
3. `fetch()` sends a POST request to Formspree with `{ email: "user@example.com" }`
4. On success (`res.ok`):
   - Form hides (`display: none`)
   - Success state appears (founding member confirmation)
   - User's email handle added to live feed
   - Counter increments
5. On failure:
   - Button resets to "Try again"
   - Input border turns red briefly

### Formspree Dashboard

Sign-ups are visible at: `https://formspree.io/forms/xojkvren/submissions`

Formspree free plan allows:
- 50 submissions/month
- Email notification per submission
- CSV export

For the validation phase (target: 50–100 sign-ups), the free plan is sufficient. Upgrade to Formspree Gold (€10/month) if needed for higher volume.

### Exporting to Beehiiv

When validation is complete and you're ready to launch:
1. Export all emails from Formspree as CSV
2. Import into Beehiiv via Audience → Import Subscribers
3. Tag all imports as `founding-member`
4. Send a welcome email explaining their founding member status

---

## 7. JavaScript Reference

### Config Constants (top of `<script>` block)

```javascript
const FOUNDING_CAP = 500;   // Total founding member spots available
const SEED_COUNT   = 47;    // Starting subscriber count shown on page load
                            // UPDATE THIS as your real list grows
```

### Key Functions

**`updateUI()`**
Recalculates and renders the counter, spots-left banner, progress percentage, and progress bar width. Called on boot and after every `addActivity()`.

**`renderFeed(highlightFirst)`**
Rebuilds the proof feed DOM from the current `feedItems` array. If `highlightFirst` is `true`, adds `new-entry` (gold flash) and `slide-in` (drop animation) classes to the first item.

**`addActivity(custom)`**
Adds a new entry to the feed. If `custom` is passed (an object with `name`, `area`, `time`), uses that — this is how real form submissions are added. If no argument, pulls the next entry from `ACTIVITY_POOL`.

```javascript
// Add a custom entry (used when a real user signs up)
addActivity({ name: 'S.', area: 'Dublin', time: 'just now' });

// Add next simulated entry from pool
addActivity();
```

**`scheduleActivity()`**
Recursive timeout that calls `addActivity()` every 28–50 seconds. First fires 10 seconds after page load. Replace with real API polling in production.

**`handleSubscribe(event, inputId, formId, successId)`**
Async form handler. Called via `onsubmit` on both forms. Validates email, posts to Formspree, handles success/failure states.

Parameters:
- `event` — the submit event (used to `preventDefault()`)
- `inputId` — ID of the email input element
- `formId` — ID of the form element (hidden on success)
- `successId` — ID of the success message element (shown on success)

### Scroll Reveal

All elements with class `reveal` are observed by `IntersectionObserver`. When they enter the viewport, `visible` class is added which transitions `opacity: 0 → 1` and `translateY(22px) → 0`. Staggered with `transitionDelay` based on entry index.

---

## 8. Design System

### Colour Palette

```css
:root {
  --green:       #1A3C2E;  /* Primary dark — hero bg, section bgs, dark cards */
  --green-mid:   #2D6A4F;  /* Mid green — avatars, gradients */
  --green-light: #40916C;  /* Accent green — checkmarks, section labels */
  --gold:        #C9A84C;  /* Primary accent — CTAs, badges, highlights */
  --gold-light:  #E8C97A;  /* Light gold — hover states, progress bar end */
  --gold-dim:    rgba(201,168,76,0.15); /* Subtle gold — borders, overlays */
  --cream:       #FAF6EE;  /* Light bg — features section */
  --cream-dark:  #F0E8D8;  /* Slightly deeper cream — preview section */
  --text:        #1A1A1A;  /* Body copy */
  --muted:       #6B7B74;  /* Secondary text, descriptions */
}
```

### Typography

```css
/* Google Fonts */
font-family: 'Playfair Display', serif;
/* Used for: headlines, card titles, quote, logo, counter number */
/* Weights: 400 (regular), 700 (bold), 900 (black), italic variants */

font-family: 'DM Sans', sans-serif;
/* Used for: body copy, labels, form inputs, buttons, captions */
/* Weights: 300 (light), 400 (regular), 500 (medium) */
```

### Type Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (hero headline) | Playfair Display | clamp(36px, 4.2vw, 62px) | 900 |
| H2 (section titles) | Playfair Display | clamp(28px, 3.8vw, 44px) | 800 |
| Card titles | Playfair Display | 17px | 700 |
| Counter number | Playfair Display | 34px | 900 |
| Body copy | DM Sans | 15–16px | 300 |
| Form input | DM Sans | 14px | 400 |
| Button text | DM Sans | 12px | 700 |
| Labels/eyebrows | DM Sans | 11px | 500–600 |

### CTA Button

```css
/* Gold button (primary — on dark backgrounds) */
background: var(--gold);
color: var(--green);
font-size: 12px;
font-weight: 700;
letter-spacing: 1px;
text-transform: uppercase;
padding: 14px 22px;
border: none;
```

### Key Animations

```css
/* Page load entrance */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
}

/* Feed new entry */
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: none; }
}

/* Banner pulse (spots remaining) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.65; }
}
```

---

## 9. Deployment Instructions

### Step 1 — Register the domain

Register `dublinbites.ie` at blacknight.com (~€12/year). Do this first — it takes a few hours to propagate.

### Step 2 — Deploy to Netlify (30 seconds)

1. Go to **app.netlify.com/drop**
2. Drag `dublin-bites-landing.html` into the browser window
3. Get a live Netlify URL instantly (e.g. `amazing-curie-abc123.netlify.app`)
4. Test the form — submit a real email and check Formspree dashboard

### Step 3 — Connect custom domain

1. In Netlify: Site Settings → Domain Management → Add custom domain
2. Enter `dublinbites.ie`
3. Add Netlify's nameservers in your Blacknight domain settings (or add an A record pointing to Netlify's load balancer: `75.2.60.5`)
4. SSL is provisioned automatically via Let's Encrypt (takes ~10 minutes)

### Step 4 — Install Meta Pixel

Add to `<head>` before running ads:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID_HERE');
fbq('track', 'PageView');
</script>
```

Add inside `handleSubscribe()` on success, to track leads:
```javascript
if (res.ok) {
  fbq('track', 'Lead'); // ← add this line
  form.style.display = 'none';
  // ... rest of success handler
}
```

### Step 5 — Test everything

- [ ] Page loads on mobile and desktop
- [ ] Both forms submit successfully (check Formspree dashboard)
- [ ] Success states appear after submission
- [ ] Counter increments when form is submitted
- [ ] User's email handle appears in feed after submission
- [ ] Progress bar and banner counter update correctly
- [ ] Simulated feed activity fires after ~10 seconds
- [ ] Meta Pixel fires on PageView (verify in Meta Events Manager)
- [ ] Lead event fires on form submission

---

## 10. Meta Ads Brief

### Campaign Objective

**Validation phase:** Traffic or Leads (Traffic is cheaper, sufficient at this stage)

### Targeting

```
Location:   Dublin city + 20km radius
Age:        22–42
Gender:     All
Interests:  Restaurants, Food and drink, Dining out, Dublin,
            Lovin Dublin, Time Out, Deliveroo, TripAdvisor
Exclusions: People who visited the landing page URL
            (retarget separately if needed)
```

### Ad Copy (Primary text)

```
Tired of not knowing where to eat in Dublin? 🍕

Dublin Bites is a free weekly newsletter with the best
restaurant deals, hidden gems, and what's on — delivered
every Thursday.

Right now we're accepting Founding Members only.
First 500 people get exclusive deals and priority access
— permanently.

✅ Subscriber-only deals not on social
✅ Hidden gems from someone inside Dublin hospitality
✅ What's on this weekend — curated, not dumped

Free. One email. Every Thursday.
👇 Claim your Founding Member spot before they're gone.
```

**Headline:** `Dublin's first food deals newsletter — Founding Members only`
**Description:** `Free. Weekly. Dublin. Exclusive deals for the first 500.`
**CTA button:** `Sign Up`

### Creative

- High-quality food photography (Dublin restaurants, street food, coffee)
- Short video (15s) of Dublin food scenes works well on Instagram/TikTok
- Avoid stock-looking imagery — real Dublin food performs better

### Budget

| Phase | Daily | Duration | Total | Target |
|-------|-------|----------|-------|--------|
| Validation | €5–10 | 14 days | €70–140 | 50–100 sign-ups |
| Growth | €15–25 | Ongoing | €450–750/mo | 150+ new/mo |

### Cost per lead target

- Under €2/subscriber = excellent
- €2–4/subscriber = acceptable
- Over €4/subscriber = review creative or targeting

---

## 11. Validation Criteria

### The Test

Spend €100–140 on Meta ads over 14 days. Measure results.

### What to Measure

| Metric | Target |
|--------|--------|
| Total sign-ups | 50–100 |
| Cost per sign-up | < €2 |
| Landing page conversion rate | 15–25% of ad clicks |
| Welcome email open rate | 60%+ |
| Email quality | Real addresses, Dublin-based |

### Decision Framework

**50–100 sign-ups:** Strong validation. Proceed — set up Beehiiv, approach founding partner businesses, build first 4 issues.

**20–50 sign-ups:** Partial validation. Before committing, run a second test with different ad creative or tweak the hero copy. The concept may be right but the framing wrong.

**Under 20 sign-ups:** Do not proceed without understanding why. Interview 5–10 people in your target audience. The problem may be positioning, not the concept itself.

### After Validation — Next Steps

1. Export Formspree submissions as CSV
2. Set up Beehiiv (free plan, upgrade when needed)
3. Import all emails, tag as `founding-member`
4. Send welcome email: introduce yourself, confirm founding member status, set expectations
5. Approach 5 Dublin restaurants for free founding partner placements
6. Build deal pipeline for first 4 issues
7. Set launch date. Send it.

---

## 12. Maintenance — Keeping It Honest

The social proof elements need to be kept accurate as the list grows. This is important — if the counter is wrong, it undermines the credibility of the whole page.

### SEED_COUNT — Update This Regularly

```javascript
const SEED_COUNT = 47; // ← This number
```

**Update this** every time your real subscriber count hits a round number. Suggested checkpoints:

| Real subscribers | Set SEED_COUNT to |
|-----------------|-------------------|
| 50              | 47–50             |
| 100             | 95–100            |
| 200             | 190–200           |
| 300             | 285–300           |
| 500             | Close the Founding Member window |

### When to Close the Founding Member Window

When `SEED_COUNT` approaches 500:
1. Update the banner copy: "Founding Member spots are now closed."
2. Remove the progress bar / counter section
3. Change the CTA to: "Join the regular subscriber list"
4. Change form button text: "Subscribe free →"
5. Remove the comparison table or update it to reflect post-launch state

### Updating Seed Names

The `SEED_FEED` and `ACTIVITY_POOL` arrays use fictional Irish names with Dublin area associations. These are fine for the validation phase. Once you have a real list of 100+ people, you can ask a handful of early subscribers if they'd like to be named in the feed (with first name + initial only) — this makes the social proof genuinely real.

---

## 13. Future Upgrades

Once validation is complete and the newsletter is live, these upgrades are worth building:

### Real Subscriber Count from Beehiiv API

Replace `SEED_COUNT` manual updates with a live API call:

```javascript
// Beehiiv has a subscriber count endpoint
// Build a simple Vercel function to proxy it:
async function getSubscriberCount() {
  const res  = await fetch('/api/subscriber-count');
  const data = await res.json();
  if (data.count) {
    totalCount = data.count;
    updateUI();
  }
}
getSubscriberCount();
```

### Referral Mechanic

After form submission, show a referral link (powered by Beehiiv's built-in referral system):

```
"Share your unique link and get one month of Founding Member Extras
for every friend who signs up."
```

Add this to the success state after form submission.

### Testimonial Carousel

After first 20–30 sign-ups, ask 3–5 early subscribers for a one-line quote. Add a scrolling testimonial strip between the comparison table and feature cards.

### Location-Specific Personalisation

If Meta ad campaigns are targeted by Dublin area (Southside, Northside, specific suburbs), add a URL parameter to the landing page link and use JS to personalise the hero headline:

```
dublinbites.ie?area=rathmines
→ "Dublin's best food deals — starting with Rathmines"
```

This is a Commitment & Consistency play — people are more likely to sign up for something that feels like it was made for their specific area.

---

## 14. File Structure

```
dublin-bites/
│
├── LANDING_PAGE_README.md        ← This file
├── DUBLIN_BITES_README.md        ← Full business/newsletter strategy README
│
├── landing/
│   ├── index.html                ← The landing page (dublin-bites-landing.html)
│   └── assets/
│       └── og-image.jpg          ← Social share image for Meta ads (1200×628px)
│
└── docs/
    └── ad-copy.md                ← Meta ad copy variants for testing
```

---

## Quick Start Checklist

Everything needed to go live today:

- [ ] `SEED_COUNT` set to an honest number (start at 0 if truly zero subscribers)
- [ ] `FOUNDING_CAP` confirmed (500 recommended — commit to honouring it)
- [ ] Both form `action` URLs pointing to `https://formspree.io/f/xojkvren`
- [ ] Meta Pixel ID inserted in `<head>` and `fbq('track', 'Lead')` added to success handler
- [ ] OG image URL updated to a real hosted food photo
- [ ] Page deployed to Netlify (drag-and-drop to app.netlify.com/drop)
- [ ] Custom domain connected (dublinbites.ie)
- [ ] Both forms tested — submission appears in Formspree dashboard
- [ ] Meta ad campaign created: Traffic objective, Dublin 22–42, €5–10/day
- [ ] Formspree email notifications enabled (Settings → Notifications)

---

*Dublin Bites — Landing Page Brief · March 2026*
*Companion file: `DUBLIN_BITES_README.md` (full newsletter strategy)*
