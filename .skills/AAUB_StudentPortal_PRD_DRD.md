# AAUB Student Portal — Product & Design Requirement Document
### Aviation and Aerospace University Bangladesh
**Scope: Landing Page + Authentication System**
**Version:** 1.0.0 | **Date:** February 2026 | **Status:** Draft

---

# PART I — PRODUCT REQUIREMENT DOCUMENT (PRD)

---

## 1. Executive Summary

The AAUB Student Portal is a unified digital platform serving three distinct user roles—**Students**, **Teachers**, and **Office Staff**—of Aviation and Aerospace University Bangladesh (AAUB). This document defines the product and design requirements for **Phase 1**, which encompasses the **public-facing Landing Page** and the **Authentication System** (sign-in, sign-up, role-based routing, and session management).

The platform must communicate AAUB's identity as Bangladesh's premier space and aerospace institution while delivering a world-class user experience that rivals internationally recognized academic portals.

---

## 2. Product Vision & Goals

### 2.1 Vision Statement
> *"A gateway that feels as advanced as the aerospace disciplines taught within its walls — where every interaction reflects the precision of engineering and the ambition of space exploration."*

### 2.2 Primary Goals

| # | Goal | Success Metric |
|---|------|---------------|
| G1 | Clearly communicate AAUB's value proposition to prospective and current students | Bounce rate < 40% on landing page |
| G2 | Provide frictionless, role-aware authentication for 3 user types | Auth flow completion > 92% |
| G3 | Establish a design language that scales across the full portal | Design token consistency 100% |
| G4 | Achieve WCAG 2.1 AA accessibility compliance | Lighthouse Accessibility ≥ 90 |
| G5 | Deliver sub-2s LCP on mid-range mobile devices | Core Web Vitals: LCP < 2s |

### 2.3 Non-Goals (Phase 1)
- Dashboard functionality (deferred to Phase 2)
- Mobile native apps (deferred to Phase 3)
- LMS integration, grade management, payment systems
- Administrative CMS backend

---

## 3. Stakeholders & User Personas

### 3.1 Primary Users

#### Persona A — The Aerospace Student (Tariq, 19)
- **Context:** Prospective or enrolled undergraduate student
- **Goals:** Find admission info, explore programs, access portal quickly
- **Pain Points:** Confusing navigation, slow load times on campus Wi-Fi, unclear login flow
- **Devices:** Mobile-first (Android), occasional desktop in labs
- **Needs from Landing Page:** Program listings, admission deadlines, research showcase
- **Needs from Auth:** Simple email + password login; password reset; "Remember me"

#### Persona B — The Faculty Member (Dr. Nasrin, 38)
- **Context:** Assistant Professor, Faculty of Aerospace Engineering
- **Goals:** Upload course materials, view student lists, manage attendance
- **Pain Points:** Shared login credentials department-wide, no session timeout
- **Devices:** Laptop (Chrome), occasional tablet
- **Needs from Auth:** Separate teacher credential flow, institutional email validation

#### Persona C — The Office Administrator (Karim, 45)
- **Context:** Registrar's Office staff
- **Goals:** Manage student records, generate reports, process admissions
- **Pain Points:** Multiple systems, no single sign-on
- **Devices:** Desktop (Windows/Chrome)
- **Needs from Auth:** Office/staff role with elevated permissions, audit trail

### 3.2 Secondary Users
- **Prospective Students:** Viewing landing page for admission info (no auth required)
- **Parents/Guardians:** Landing page visitors exploring the university

---

## 4. Functional Requirements

### 4.1 Landing Page

#### FR-LP-01: Hero Section
- Display AAUB's primary value proposition headline
- Show a prominent **"Apply Now"** and **"Login to Portal"** CTA pair
- Integrate an animated abstract illustration (aerospace/space theme)
- Display a navigation bar with: Home, About, Academics, Admission, Research, Announcement
- Responsive across breakpoints: 375px, 768px, 1280px, 1440px+

#### FR-LP-02: Faculties Section
- Display 4 faculties as interactive cards:
  1. Faculty of Space Science, Engineering and Applications
  2. Faculty of Engineering and Technology
  3. Faculty of Avionics Engineering
  4. Faculty of Aerospace Engineering
- Each card links to a faculty detail page (placeholder for Phase 2)
- Include departments sub-listing on hover/expand

#### FR-LP-03: News & Announcements Section
- Display latest 3 news items with title, date, thumbnail, and excerpt
- "More News" CTA button
- Support both Bengali and English content (Unicode)
- Marquee/ticker strip for breaking announcements with NEW badge

#### FR-LP-04: Research & Innovation Section
- Showcase 1 featured research paper with title, abstract excerpt, and author
- Example: "Deployment of UAV-assisted 6G Wireless Networks using Whale Optimisation Algorithm"
- "View All Research" CTA

#### FR-LP-05: Collaborations Section
- Display partner logos: EDGE Group, Novair, SkyAir, Sapienza University, and others
- Infinite auto-scroll carousel
- "All Partners" CTA

#### FR-LP-06: Academics Section
- Two program categories: Undergraduate Programmes, Postgraduate Programmes
- Visual cards with illustration, program count, and CTA
- "More About Academics" CTA

#### FR-LP-07: Admission CTA Section
- Full-width banner: "Explore the possibilities of an AAUB education"
- Sub-tagline and "Apply Now" button
- Background: abstract space/aerospace illustration

#### FR-LP-08: About / Mission / Vision Section
- University background paragraph
- Vision: "To become a leading international university in the field of aviation, space and technology through capacity building"
- Mission: "To transform people into Aviation, Space and Technological professional and enthusiast for providing world class education"
- "View Details" CTA

#### FR-LP-09: Footer
- Important Links (About AAUB, Vice Chancellor, Faculties, etc.)
- Academic Programmes listing
- National Integrity Strategy of Bangladesh
- Annual Performance section
- Contact: Address, Phone, Email
- Copyright notice

#### FR-LP-10: Announcement Ticker
- Scrolling ticker at the top/bottom of hero for critical announcements
- NEW badge indicator
- Link to Admission Page for relevant notices

---

### 4.2 Authentication System

#### FR-AUTH-01: Role Selection Screen
- Before login/signup, user selects role: **Student | Teacher | Office**
- Visual role cards with icon, title, and brief description
- Selection persists to login/signup forms

#### FR-AUTH-02: Sign In Flow
- **Fields:** Institutional Email / Student ID, Password
- **Options:** "Remember me" toggle, "Forgot Password?" link
- **Social Auth:** Google sign-in (institutional Google account)
- **Validation:** Real-time field validation with error states
- **Error handling:** Incorrect credentials, account locked, role mismatch
- **Rate limiting:** Display CAPTCHA after 3 failed attempts

#### FR-AUTH-03: Sign Up Flow (Students only — Teachers/Office provisioned by admin)
- **Step 1:** Role confirmation (Student)
- **Step 2:** Personal info: Full Name, Student ID, Email (@aaub.edu.bd or personal)
- **Step 3:** Program info: Faculty, Department, Batch Year, Programme Level
- **Step 4:** Set password (strength indicator) + confirm
- **Step 5:** Email verification (6-digit OTP)
- **Progress indicator** across all steps

#### FR-AUTH-04: Forgot Password Flow
- Step 1: Enter registered email
- Step 2: OTP sent to email (6-digit, 10-minute expiry)
- Step 3: Enter OTP + new password + confirm
- Step 4: Success confirmation + redirect to login

#### FR-AUTH-05: Role-Based Post-Auth Routing
- Student → `/portal/student/dashboard`
- Teacher → `/portal/teacher/dashboard`
- Office → `/portal/office/dashboard`

#### FR-AUTH-06: Session Management
- JWT-based sessions with refresh tokens
- Session expiry: 8 hours (student), 12 hours (teacher), 8 hours (office)
- Auto-logout warning at 5 minutes before expiry
- "Keep me logged in" extends session

#### FR-AUTH-07: Security Requirements
- HTTPS enforced across all auth routes
- Passwords: minimum 8 characters, 1 uppercase, 1 number, 1 special character
- All tokens stored in httpOnly cookies (no localStorage for sensitive data)
- CSRF protection on all form submissions
- Audit log of all auth events

---

## 5. Non-Functional Requirements

### 5.1 Performance
| Metric | Target |
|--------|--------|
| Landing Page LCP | < 2.0s (mobile 4G) |
| Landing Page FID | < 100ms |
| Landing Page CLS | < 0.1 |
| Auth flow TTI | < 1.5s |
| Bundle size (initial JS) | < 150KB gzipped |
| Image optimization | WebP with lazy loading |

### 5.2 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation fully functional
- Screen reader compatible (ARIA labels on all interactive elements)
- Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- Focus indicators visible and styled

### 5.3 Browser Support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: Chrome Android 90+, Safari iOS 14+

### 5.4 Internationalisation
- Primary: English
- Secondary: Bengali (Unicode, right-to-left consideration not applicable)
- Date/time: BD timezone (UTC+6)

---

## 6. Technical Architecture

### 6.1 Recommended Stack

```
Frontend:         Next.js 14+ (App Router)
Styling:          Tailwind CSS v3 + CSS Custom Properties
Animation:        Framer Motion v11
Icons:            Lucide React
Auth:             Clerk (inspired by Image 2) or NextAuth.js
State:            Zustand (client) + React Query (server)
Type Safety:      TypeScript 5+
Fonts:            Google Fonts — Playfair Display (serif/hero) + Inter (body)
Illustrations:    Custom SVG or Lottie animations (space/aerospace theme)
Deployment:       Vercel / AWS Amplify
```

### 6.2 Project Structure

```
aaub-portal/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing page
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── verify-email/page.tsx
│   └── portal/
│       ├── student/
│       ├── teacher/
│       └── office/
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── FacultiesSection.tsx
│   │   ├── NewsSection.tsx
│   │   ├── ResearchSection.tsx
│   │   ├── CollaborationsSection.tsx
│   │   ├── AcademicsSection.tsx
│   │   ├── AdmissionCTA.tsx
│   │   └── AboutSection.tsx
│   ├── auth/
│   │   ├── RoleSelector.tsx
│   │   ├── SignInForm.tsx
│   │   ├── SignUpStepper.tsx
│   │   └── ForgotPasswordFlow.tsx
│   └── ui/                       # Design system primitives
├── lib/
│   ├── auth/
│   ├── validations/
│   └── constants/
├── styles/
│   └── globals.css               # CSS custom properties / tokens
└── public/
    ├── illustrations/
    └── assets/
```

### 6.3 API Endpoints (Phase 1)

```
POST  /api/auth/signin             # Login
POST  /api/auth/signup             # Register (students)
POST  /api/auth/signout            # Logout
POST  /api/auth/forgot-password    # Request OTP
POST  /api/auth/verify-otp         # Verify OTP
POST  /api/auth/reset-password     # Reset password
POST  /api/auth/refresh            # Token refresh
GET   /api/landing/news            # Latest 3 news items
GET   /api/landing/announcements   # Ticker announcements
```

---

## 7. Acceptance Criteria

| Feature | Acceptance Criteria |
|---------|---------------------|
| Landing Page | All 9 sections render correctly on mobile and desktop; animations play without jank (60fps); all CTAs link to correct destinations |
| Role Selection | Three role cards visible; selection highlights active state; persists to next step |
| Sign In | Valid credentials redirect to correct dashboard by role; invalid credentials show error without revealing which field failed |
| Sign Up Stepper | All 5 steps navigable; back/forward works; data persists between steps; email OTP verified before account creation |
| Forgot Password | OTP delivered within 30 seconds; expired OTP shows clear error; new password saved and user redirected |
| Session | Logout clears all tokens; session expiry warning appears at T-5 min; refresh token rotates on use |

---
---

# PART II — DESIGN REQUIREMENT DOCUMENT (DRD)

---

## 1. Design Philosophy

The AAUB Student Portal visual language synthesises three seemingly opposing forces into one cohesive identity:

1. **Neo-Brutalist structure** — raw, honest, architectural. Heavy borders signal precision. Bold shadows signal depth without fakery.
2. **Dark cosmic atmosphere** — deep purple-black backgrounds evoking the night sky and deep space, AAUB's thematic domain.
3. **Futuristic minimalism** — clean type hierarchies, generous whitespace, and abstract illustrations that communicate innovation without clutter.

> *"The universe is both brutal in its physics and beautiful in its geometry. Our interface reflects both."*

---

## 2. Design Tokens

### 2.1 Color System

```css
:root {
  /* ─── Backgrounds ─────────────────────────────── */
  --bg-root:         #070614;   /* Page root — deep space black */
  --bg-sidebar:      #10101A;   /* Sidebar / nav backgrounds */
  --bg-content:      #0C091E;   /* Content areas */
  --bg-card:         #1F1F2B;   /* Card surfaces */

  /* ─── Brand Purple ────────────────────────────── */
  --purple-50:       #F3EDFF;   /* Lightest — text on dark purple bg */
  --purple-400:      #9560F9;   /* Interactive hover states */
  --purple-500:      #7B3AFA;   /* Primary accent — CTAs, highlights */
  --purple-600:      #6430CA;   /* Pressed / active states */
  --purple-700:      #5A2BAF;   /* Border on accent components */
  --purple-800:      #331F66;   /* Subtle accent fills */
  --purple-900:      #1B133A;   /* Deep accent backgrounds */

  /* ─── Text ────────────────────────────────────── */
  --text-primary:    #F8F8FF;   /* Headings, body text */
  --text-secondary:  #BABAC2;   /* Sub-headings, descriptions */
  --text-muted:      #6F6F7B;   /* Placeholder, disabled labels */
  --text-dim:        #808088;   /* Meta info, timestamps */

  /* ─── Status ──────────────────────────────────── */
  --green-accent:    #1DC226;   /* Success, online indicator */
  --green-bg:        #0C6717;   /* Success background chips */
  --red-accent:      #F04444;   /* Error states */
  --amber-accent:    #F59E0B;   /* Warning states */

  /* ─── Borders (Neo-Brutalist) ─────────────────── */
  --border-subtle:   #11101E;   /* Barely-there dividers */
  --border-default:  #4C4C54;   /* Standard card borders */
  --border-brutal:   #F8F8FF;   /* Neo-brutalist heavy borders */
  --border-accent:   #7B3AFA;   /* Accent component borders */

  /* ─── Neo-Brutalist Shadows ───────────────────── */
  --shadow-brutal-sm:  4px 4px 0px #F8F8FF;
  --shadow-brutal-md:  6px 6px 0px #F8F8FF;
  --shadow-brutal-lg:  8px 8px 0px #F8F8FF;
  --shadow-brutal-accent: 6px 6px 0px #7B3AFA;
  --shadow-brutal-dim: 6px 6px 0px #4C4C54;

  /* ─── Overlay / Glass ─────────────────────────── */
  --glass-bg:        rgba(31, 31, 43, 0.6);
  --glass-border:    rgba(76, 76, 84, 0.4);
}
```

### 2.2 Typography Scale

```css
/* Font Families */
--font-display:  'Playfair Display', Georgia, serif;    /* Hero titles, section headlines */
--font-body:     'Inter', system-ui, sans-serif;         /* All body, UI, forms */
--font-mono:     'JetBrains Mono', monospace;            /* Code, IDs, student numbers */

/* Type Scale (Major Third — 1.250 ratio) */
--text-xs:    0.64rem;    /* 10.24px — Labels, badges */
--text-sm:    0.8rem;     /* 12.8px  — Captions, muted */
--text-base:  1rem;       /* 16px    — Body */
--text-lg:    1.25rem;    /* 20px    — Card titles */
--text-xl:    1.563rem;   /* 25px    — Section sub-heads */
--text-2xl:   1.953rem;   /* 31.25px — Section heads */
--text-3xl:   2.441rem;   /* 39px    — Page titles */
--text-4xl:   3.052rem;   /* 48.8px  — Hero sub */
--text-5xl:   3.815rem;   /* 61px    — Hero main */
--text-6xl:   4.768rem;   /* 76px    — Oversized display */

/* Line Heights */
--leading-tight:  1.1;    /* Display headings */
--leading-snug:   1.3;    /* Sub-headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.7;   /* Long-form paragraphs */

/* Font Weights */
--weight-regular:    400;
--weight-medium:     500;
--weight-semibold:   600;
--weight-bold:       700;
--weight-extrabold:  800;
--weight-black:      900;

/* Letter Spacing */
--tracking-tight:  -0.02em;   /* Display headings */
--tracking-normal:  0em;
--tracking-wide:    0.05em;   /* Uppercase labels */
--tracking-wider:   0.1em;    /* ALL CAPS nav items */
--tracking-widest:  0.2em;    /* Section labels / eyebrows */
```

### 2.3 Spacing System (8pt Grid)

```css
--space-1:   0.25rem;   /* 4px  */
--space-2:   0.5rem;    /* 8px  */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-5:   1.25rem;   /* 20px */
--space-6:   1.5rem;    /* 24px */
--space-8:   2rem;      /* 32px */
--space-10:  2.5rem;    /* 40px */
--space-12:  3rem;      /* 48px */
--space-16:  4rem;      /* 64px */
--space-20:  5rem;      /* 80px */
--space-24:  6rem;      /* 96px */
--space-32:  8rem;      /* 128px */
```

### 2.4 Border Radius

```css
--radius-none:  0px;       /* Neo-brutalist sharp elements */
--radius-sm:    4px;       /* Input fields, small badges */
--radius-md:    8px;       /* Cards (with border override) */
--radius-lg:    12px;      /* Large cards */
--radius-xl:    16px;      /* Modal panels */
--radius-2xl:   24px;      /* Feature cards */
--radius-full:  9999px;    /* Pills, avatars, toggles */
```

**Neo-Brutalism Rule:** Most interactive cards and containers use `--radius-none` (0px) or `--radius-sm` (4px) with `--border-brutal` (2–3px solid white/accent) and `--shadow-brutal-md`.

---

## 3. Neo-Brutalism Design Language

### 3.1 Core Visual Rules

```
Rule 1 — BORDERS
  All cards: border: 2px solid var(--border-brutal)
  Interactive cards on hover: border-color → var(--purple-500)
  Form inputs: border: 2px solid var(--border-default)
  Form inputs focused: border-color → var(--purple-400)

Rule 2 — SHADOWS (Offset, not blurred)
  Resting state:  box-shadow: var(--shadow-brutal-dim)
  Hover state:    box-shadow: var(--shadow-brutal-md), transform: translate(-2px, -2px)
  Active/pressed: box-shadow: 0px 0px 0px, transform: translate(6px, 6px)
  CTA buttons:    box-shadow: var(--shadow-brutal-accent)

Rule 3 — BACKGROUND TEXTURE
  Hero section:   CSS grid/graph-paper overlay (subtle dot grid)
  Section dividers: thick horizontal rule (3px solid var(--border-brutal))
  Background pattern: radial-gradient dots or crosshatch at 5% opacity

Rule 4 — TYPOGRAPHY CONTRAST
  Section eyebrows: ALL CAPS, var(--purple-400), letter-spacing: 0.2em
  Card labels: UPPERCASE, 10px, var(--text-muted)
  Hero display: Playfair Display, --text-6xl, var(--text-primary)

Rule 5 — NO GRADIENTS ON SURFACES
  Backgrounds: solid colors only
  Gradients only on: illustrations, decorative orbs, CTA backgrounds
```

### 3.2 Component Anatomy — Neo-Brutalist Card

```
┌──────────────────────────────────┐  ← 2px solid white border
│  [EYEBROW LABEL]                 │  ← UPPERCASE, purple-400, 10px
│                                  │
│  Card Title Here                 │  ← text-lg, text-primary, semibold
│  Description goes here...        │  ← text-sm, text-secondary
│                                  │
│  [Icon] Meta info                │  ← text-xs, text-muted
└──────────────────────────────────┘
      ↓ 6px right + 6px down         ← offset shadow (white or accent)
  ████████████████████████████████
  ████████████████████████████████   ← shadow rectangle (no blur)
```

---

## 4. Landing Page — Section-by-Section Design Spec

### 4.1 Navigation Bar

```
Layout:    Full-width, sticky, height: 64px
Background: var(--bg-sidebar) with backdrop-filter: blur(12px)
Border:    border-bottom: 1px solid var(--border-default)

Left:      AAUB Logo (SVG) + "AAUB" wordmark in Playfair Display
Center:    Nav links — HOME  ABOUT  ACADEMICS  ADMISSION  RESEARCH  ANNOUNCEMENT
           Font: Inter, 13px, tracking-wider, ALL CAPS, text-secondary
           Active: text-primary with 2px bottom border (purple-500)
Right:     Search icon (Lucide) | "Apply Now" button (CTA variant)

Mobile:    Hamburger menu (Lucide Menu icon)
           Drawer: full-height, bg-sidebar, slide-in from right
```

### 4.2 Hero Section

```
Height:    100vh (min 700px)
Layout:    Split — 55% text / 45% illustration

LEFT COLUMN:
  Eyebrow:   "AVIATION AND AEROSPACE UNIVERSITY BANGLADESH"
             CAPS, purple-400, Inter, 11px, tracking-widest
  Headline:  "Creating the next generations of space and aviation professionals"
             Playfair Display, text-6xl, text-primary, leading-tight
             "space and aviation" underlined with purple-500 wavy/brush underline
  Subtext:   Brief AAUB mission sentence
             Inter, text-lg, text-secondary, max-w: 480px
  CTAs:      [Apply Now →]   [Login to Portal ↗]
             Apply Now: bg-purple-500, brutal shadow accent, border-brutal, no-radius
             Login:     transparent, border-brutal, brutal shadow dim

  TICKER:    Scrolling announcement strip below CTAs
             bg-purple-900, border-y: 1px solid purple-800
             NEW badge (green-accent bg) + Bengali/English text

RIGHT COLUMN:
  Abstract Illustration (space/aerospace themed):
    - Floating figures (student + teacher motif, yellow + cyan palette like img 3)
    - Character with graduating hat, holding books/devices
    - Browser/screen element showing a UAV or satellite
    - Blob shapes: yellow circle (#F5C842), cyan blob (#00D4FF at 30% opacity)
    - All illustrated against transparent bg, mounted on bg-card with brutalist border
    
  Decorative elements:
    - 4–5 small orbit dots floating (CSS keyframe: float + rotate)
    - Grid-dot background texture on the hero bg

BACKGROUND:
  bg-root with radial gradient:
    radial-gradient(ellipse at 70% 50%, rgba(123, 58, 250, 0.12), transparent 60%),
    radial-gradient(ellipse at 10% 80%, rgba(0, 212, 255, 0.05), transparent 50%)
  Graph-paper texture:
    background-image: 
      linear-gradient(rgba(76,76,84,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(76,76,84,0.08) 1px, transparent 1px);
    background-size: 40px 40px;
```

### 4.3 Faculties Section

```
Layout:    Section label + heading + 4-column card grid
Padding:   space-20 vertical

Eyebrow:   "OUR FACULTIES"
Heading:   "Shaping Tomorrow's Aerospace Leaders"
           Playfair Display, text-4xl
Sub:       "Academic institutions play a critical role in preparing skilled human resources."
           Inter, text-lg, text-secondary, text-center, max-w: 600px

Cards (4x):
  Faculty of Space Science, Engineering and Applications
  Faculty of Engineering and Technology
  Faculty of Avionics Engineering
  Faculty of Aerospace Engineering

Card spec:
  Size:      280px × 320px
  Border:    2px solid var(--border-brutal)
  Shadow:    var(--shadow-brutal-dim) → hover: var(--shadow-brutal-md)
  Hover:     translate(-3px, -3px) + shadow-brutal-accent
  Inside:
    Top:     Illustration (abstract, 100% width, 140px height)
             Each faculty has unique illustration (satellite, circuit, plane, rocket theme)
    Bottom:  Faculty name, department count chip, "View Faculty →" link
  
  Departments:
    Expandable on click, showing department list as pills
    Pills: bg-purple-900, border: 1px solid purple-800, text-secondary
```

### 4.4 News Section

```
Layout:    Section label + 1 featured + 2 smaller cards in a masonry-ish grid
Background: bg-content with subtle graph texture

Featured card (1/2 width):
  - Large thumbnail (16:9) with brutal border
  - Category tag chip (RESEARCH / ANNOUNCEMENT / EVENT)
  - Title: text-xl, Playfair Display
  - Excerpt: 3 lines, text-secondary, Inter
  - Date + "Read More →"

Side cards (2 stacked, 1/2 width):
  - Smaller thumbnail (4:3)
  - Title, excerpt (2 lines), date

"More News →" button:
  Transparent, border-brutal, brutal-shadow-dim, centered
```

### 4.5 Research & Innovation Section

```
Layout:    Dark card spanning ~70% width, centered
Background: bg-card, border-brutal (2px), shadow-brutal-accent

Tag:       "RESEARCH & INNOVATION" chip (purple-900 bg, purple-400 text, ALL CAPS)
Title:     "Deployment of UAV-assisted 6G Wireless Networks using Whale Optimisation Algorithm"
           Playfair Display, text-2xl, text-primary
Abstract:  First 2 sentences, Inter, text-base, text-secondary
Authors:   Small list with avatar circles, names in Inter text-sm
Links:     [Read Paper →]  [View All Research →]

Left decoration: Cyan-tinted abstract brain/network illustration (like img 3 style)
Right side: Research metrics chip row (citations, downloads, etc. — placeholder)
```

### 4.6 Collaborations Section

```
Background: bg-root with inverted section (lighter border separating from adjacent)
Title:     "Global Collaborations"
Sub:       "AAUB maintains active partnerships with leading universities worldwide."

Auto-scroll infinite carousel:
  - Logo containers: bg-card, border: 1px solid border-default, 120px × 60px
  - Partners: EDGE Group, Novair, SkyAir, Sapienza, and others
  - Scroll speed: 30 seconds per full loop
  - Pauses on hover (Framer Motion)
  - Fade masks left/right using CSS linear-gradient

"All Partners →" CTA: text-only with lucide ExternalLink icon
```

### 4.7 Academics Section

```
Layout:    2-column side-by-side cards + centered CTA below

Cards:
  Left:  UNDERGRADUATE PROGRAMMES
         Illustration: Student with laptop on floating blob (yellow/teal, img 3 style)
         Count: "X+ Programs Available"
         CTA: "View Programs →"
         
  Right: POSTGRADUATE PROGRAMMES
         Illustration: Graduate with books, screen motif (purple/teal, img 4 style)
         Count: "Y+ Programs Available"
         CTA: "View Programs →"

Card style: 100% brutal — 3px white border, 8px 8px 0 white shadow, sharp corners

CTA: "More About Academics →" centred below, large outlined button
```

### 4.8 Admission CTA Section

```
Layout:    Full-width banner, min-height: 400px
Background: bg-purple-900 + large abstract illustration spanning right side (img 4 style)
           Teacher/guide figure announcing something, holding a megaphone
           Purple/orange/teal botanical blobs (mirror img 4 palette)

Eyebrow:   "ADMISSION 2026"  — green-accent text
Headline:  "Explore the Possibilities of an AAUB Education"
           Playfair Display, text-5xl, text-primary, max-w: 600px
Sub:       "An extraordinary freedom of opportunity — to explore, to collaborate and to challenge yourself."
           Inter, text-lg, text-secondary
CTA:       [Apply Now →]  — bg-purple-500, brutal shadow, no-radius

Left border accent: 4px solid purple-500 on left edge of text column
```

### 4.9 About / Vision / Mission Section

```
Layout:    Text-heavy left + decorative timeline/icon column right

Left:
  Eyebrow: "ABOUT AAUB"
  Body:    University description paragraph (Inter, text-base, text-secondary, leading-relaxed)
  
  Vision block:
    Left border: 3px solid purple-500
    Label: "VISION" (CAPS, text-xs, purple-400, tracking-widest)
    Text: Vision statement (Inter, text-base, text-primary)
    
  Mission block:
    Left border: 3px solid green-accent
    Label: "MISSION" (CAPS, text-xs, green-accent, tracking-widest)
    Text: Mission statement

  CTA: "View Details →"

Right:
  Stacked abstract illustrations (img 4 style — teacher guiding student)
  Stats cards (brutalist): Established 2021, Faculty Count, Student Count, Research Papers
```

### 4.10 Footer

```
Background: bg-sidebar, border-top: 2px solid border-default
Layout:    5-column grid

Col 1: AAUB logo + tagline + social links (Lucide: Twitter, Facebook, LinkedIn, Youtube)
Col 2: Important Links
Col 3: Academic Programmes  
Col 4: National Integrity Strategy of Bangladesh
Col 5: Contact Us (address, phone, email with lucide icons)

Bottom bar: Copyright + "Maintained by AAUB-ICT" + back-to-top button
```

---

## 5. Authentication System — Design Spec

### 5.1 Auth Layout

```
Split-screen layout (inspired by Clerk — Image 2):

LEFT PANEL (40% desktop, hidden on mobile):
  Background: bg-sidebar with purple radial glow at 20% opacity
  Content:
    - AAUB Logo + name
    - Large abstract illustration (aerospace/space themed)
      Student + astronaut + books motif (img 3/4 style, dark palette)
    - Testimonial quote from current student
    - 3 bullet points: "Real-time Grades", "Course Management", "Research Access"
  Border-right: 2px solid border-default

RIGHT PANEL (60% desktop, 100% mobile):
  Background: bg-content
  Content:
    - AAUB Logo (mobile only, hidden on desktop)
    - Role selector OR Form
    - Form content
    - Footer: Privacy | Terms | Help
  Graph-paper texture overlay at 4% opacity
```

### 5.2 Role Selector Screen

```
Above form, shown as first step:
"I am a..." label (Inter, text-sm, text-muted, CAPS, tracking-wide)

Three cards in a row:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│             │  │             │  │             │
│  [GradCap]  │  │  [BookOpen] │  │  [Building] │
│             │  │             │  │             │
│   Student   │  │   Teacher   │  │   Office    │
│  Undergrad/ │  │  Faculty &  │  │   Staff &   │
│ Postgrad    │  │   Staff     │  │ Registrar   │
└─────────────┘  └─────────────┘  └─────────────┘
      ↑ Selected: border-purple-500 + shadow-brutal-accent

Card size: 140px × 160px
Border: 2px solid border-default → selected: purple-500
Shadow: shadow-brutal-dim → selected: shadow-brutal-accent
Icon: Lucide, 32px, text-muted → selected: purple-400
Title: Inter, text-base, semibold, text-primary
Sub: Inter, text-xs, text-secondary

Continue Button: appears after selection, full-width, purple-500
```

### 5.3 Sign In Form

```
Title:     "Welcome Back" (Playfair Display, text-3xl, text-primary)
Sub:       "Sign in to your [Role] portal" (Inter, text-sm, text-secondary)

Fields:
  1. Student ID / Email
     Label: "Student ID or Email" (Inter, text-sm, text-secondary)
     Input: bg-bg-card, border-2-border-default, 48px height
            focus: border-purple-400 + shadow 0 0 0 3px purple-900
            icon: Lucide Mail (left prefix)
  
  2. Password
     Label: "Password"
     Input: same style + Lucide Eye/EyeOff toggle (right suffix)
  
  Row:     [☐ Remember me]  ...  [Forgot password?]
           text-sm, text-muted  ...  text-purple-400, hover: text-purple-300

  Submit:  [Sign In →]
           Full-width, 48px height, bg-purple-500
           border: 2px solid purple-700, shadow-brutal-accent
           Hover: bg-purple-400 + translate(-2px, -2px)
           Active: bg-purple-600 + translate(6px, 6px) (shadow collapses)
           Loading: Lucide Loader2 spin animation

  Divider: ─────── OR ───────  (text-muted, line color: border-default)

  Google:  [G  Continue with Google]
           bg-card, border-2-border-default, full-width, 48px
           Hover: shadow-brutal-dim

  Footer:  "Don't have an account? [Sign Up]" (students only)
```

### 5.4 Sign Up Stepper

```
Progress bar: 5 steps, thin linear bar at top of form
  Filled segment: bg-purple-500
  Unfilled: bg-border-default
  Step dots: 16px circles, filled → purple-500, current → pulse animation

Step indicators row:
  [●]─────[○]─────[○]─────[○]─────[○]
   1       2       3       4       5
  Role   Info   Program  Password  Verify

Step 1 — Role Confirmation:
  "Joining as a Student — correct?" + edit link

Step 2 — Personal Information:
  Full Name | Student ID (if known)
  Email Address | Phone (optional)

Step 3 — Academic Information:
  Faculty (select dropdown) | Department (dependent on faculty)
  Programme Level (Undergraduate / Postgraduate)
  Batch Year (select: 2020–2026)

Step 4 — Set Password:
  Password field + strength meter
  Strength meter: 4 bars, colors: red/amber/yellow/green
  Rules checklist: ✓ 8+ chars  ✓ uppercase  ✓ number  ✓ special
  Confirm Password

Step 5 — Email Verification:
  "We sent a 6-digit code to [email@aaub.edu.bd]"
  6 individual single-char inputs (OTP boxes)
  Each box: 48px × 56px, border-2-border-default, text-center, text-xl
  Focused box: border-purple-400
  Completed: border-green-accent
  "Resend Code" timer (59 second countdown)

Navigation:
  [← Back]  [Continue →] / [Create Account ✓]
  Back: text button, text-muted
  Continue: same as Sign In submit button
```

### 5.5 Forgot Password Flow

```
Screen 1 — Enter Email:
  Title:   "Reset Your Password"
  Sub:     "Enter your registered email to receive a reset code."
  Field:   Email (same input style)
  CTA:     [Send Reset Code →]

Screen 2 — Enter OTP:
  Title:   "Check Your Email"
  Illustration: Small envelope icon with glow (Lucide Mail + CSS glow)
  Sub:     "Enter the 6-digit code sent to [email]"
  OTP boxes: Same as Sign Up Step 5
  Timer:   10 minutes, countdown display
  CTA:     [Verify Code →]

Screen 3 — New Password:
  Title:   "Create New Password"
  Fields:  New Password + strength meter + Confirm Password
  CTA:     [Reset Password →]

Screen 4 — Success:
  Illustration: Checkmark in circle (animated — Framer Motion draw path)
  Title:   "Password Reset Successful"
  Sub:     "You can now sign in with your new password."
  CTA:     [Back to Sign In →]
```

---

## 6. Animation & Motion Spec

### 6.1 Framer Motion — Animation Library

```typescript
// Shared animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

// Hover interaction for Neo-Brutalist cards
export const brutalCardHover = {
  rest: { x: 0, y: 0, boxShadow: "6px 6px 0px #4C4C54" },
  hover: { x: -3, y: -3, boxShadow: "8px 8px 0px #7B3AFA" }
}

// Button press
export const buttonPress = {
  rest: { x: 0, y: 0, boxShadow: "6px 6px 0px #7B3AFA" },
  hover: { x: -2, y: -2, boxShadow: "8px 8px 0px #7B3AFA" },
  tap:   { x: 6, y: 6, boxShadow: "0px 0px 0px #7B3AFA" }
}
```

### 6.2 Scroll-Triggered Animations

```
Trigger: "viewport" intersection (threshold: 0.15)
Once: true (plays once on enter, does not replay on scroll out)

Sections use staggerContainer wrapping children with fadeUp:
  - Hero text: fadeUp + stagger 0.15s between elements
  - Faculty cards: stagger 0.1s left-to-right
  - News cards: stagger 0.08s
  - Research card: slideLeft
  - Partner logos: fadeIn stagger 0.05s

Navigation: Fixed, uses AnimatePresence for mobile drawer
  Drawer: x: "100%" → x: 0, ease: spring(stiffness: 300, damping: 30)
```

### 6.3 Hero Illustration Animation

```
Floating figures:
  keyframes: translateY(-12px) → translateY(0px) → translateY(-12px)
  duration: 3s, ease: easeInOut, repeat: Infinity

Orbit decorations:
  keyframes: rotate(0deg) → rotate(360deg)
  duration: 20s, linear, repeat: Infinity

Glow orbs:
  keyframes: scale(1) opacity(0.4) → scale(1.15) opacity(0.7)
  duration: 4s, easeInOut, repeat: Infinity, yoyo
```

### 6.4 Page Transitions

```
Route transitions (Next.js App Router):
  Page exit:  opacity: 1 → 0, y: 0 → -20, duration: 0.3s
  Page enter: opacity: 0 → 1, y: 20 → 0, duration: 0.4s
  Easing: [0.22, 1, 0.36, 1] (custom ease-out-expo)
```

### 6.5 Scroll Behavior

```
Smooth scroll: html { scroll-behavior: smooth }
  (override with JavaScript for accessibility — prefers-reduced-motion)

Parallax:
  Hero illustration: scrollY * 0.3 (30% scroll rate)
  Section backgrounds: scrollY * 0.1

Announcement ticker:
  CSS animation: translateX(0) → translateX(-100%)
  duration: 30s, linear, infinite
  Pauses on hover

Scroll-to-top button:
  Appears when scrollY > 400px (AnimatePresence, fadeIn from bottom-right)
```

---

## 7. Illustration Design Direction

### 7.1 Illustration Style Guide

**Reference:** Images 3 and 4 — flat, abstract, character-driven illustrations with organic blob shapes.

```
Style:      Flat 2D illustration, minimal outline weight (2–3px strokes)
Characters: Simplified human figures, diverse representation
            Hijab representation for female figures (culturally appropriate)
Blobs:      Organic, asymmetric shapes behind characters
            Color palette: yellow (#F5C842), cyan (#00D4FF), purple (#7B3AFA), teal (#0DD4A4)
Theme:      Space, aviation, education, technology

Required illustrations (SVG format, animatable):
  1. Hero: Student at computer with satellite/UAV on screen, aerospace blob bg
  2. Faculty cards (4x): Unique per faculty — rocket, circuit board, avionics panel, satellite
  3. Academics section: Student with books (undergrad), researcher with data (postgrad)
  4. Admission CTA: Teacher/guide figure with megaphone, announcement theme
  5. About section: Teacher + student interaction, learning theme
  6. Auth left panel: Astronaut student hybrid, space exploration theme

Color mapping per illustration section:
  Hero:        Yellow + Deep Purple
  Faculties:   Cyan + Deep Purple
  Research:    Cyan + Green accent
  Admission:   Yellow + Orange + Deep Purple
  About:       Purple + Teal
  Auth:        Purple gradient + star/space motif
```

---

## 8. Responsive Breakpoints

### 8.1 Breakpoint System

```css
/* Mobile First */
--bp-sm:   480px;    /* Large phone */
--bp-md:   768px;    /* Tablet portrait */
--bp-lg:   1024px;   /* Tablet landscape / small desktop */
--bp-xl:   1280px;   /* Desktop */
--bp-2xl:  1536px;   /* Large desktop */
```

### 8.2 Responsive Behavior Per Section

| Section | Mobile (< 768px) | Tablet (768–1024px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Hero | Single column, illustration below | Two column, 50/50 | 55/45 split |
| Faculties | 1 column scroll | 2×2 grid | 4-column grid |
| News | Single column | 2-column | Featured + 2-side |
| Collaborations | 3 logos visible | 5 logos | 7 logos |
| Academics | Stacked full-width | Side-by-side | Side-by-side, larger |
| Auth Role Select | Vertical stack | Horizontal row | Horizontal row |
| Auth Form | Full screen | Centered card | Split panel |

---

## 9. Icon Usage (Lucide)

```
Navigation:     Search, Menu, X, ChevronDown, ExternalLink
Faculties:      Rocket, Cpu, Plane, Satellite
Auth:           GraduationCap, BookOpen, Building2, Mail, Lock, Eye, EyeOff, Loader2
Forms:          Check, AlertCircle, Info, ChevronRight, ArrowLeft
Social:         Twitter, Facebook, Linkedin, Youtube
Footer:         MapPin, Phone, Mail, Globe
General:        ArrowRight, Plus, Star, Award, Users, FileText
Announcements:  Bell, Megaphone, AlertTriangle

Size scale:
  Navigation icons:  20px
  Card icons:        24px
  Feature icons:     32px
  Auth role icons:   36px
  Decorative:        16px

Stroke width:  1.5 (default Lucide) — adjust to 2 for emphasis contexts
```

---

## 10. Accessibility Checklist

```
✓ Color contrast: all text meets WCAG AA (4.5:1 normal, 3:1 large)
  - text-primary on bg-root:   #F8F8FF on #070614 = 18.8:1 ✓
  - text-secondary on bg-card: #BABAC2 on #1F1F2B = 7.1:1 ✓
  - purple-400 on bg-root:     #9560F9 on #070614 = 5.2:1 ✓

✓ Focus indicators: visible 2px outline with 2px offset, color: purple-400
✓ Skip navigation link: first focusable element on landing page
✓ ARIA labels: all icon-only buttons, carousels, dialogs
✓ Keyboard trapping: modal dialogs trap focus correctly
✓ Reduced motion: @media (prefers-reduced-motion: reduce) disables animations
✓ Screen reader: semantic HTML (nav, main, section, article, aside)
✓ Form labels: all inputs have associated <label> elements
✓ Error announcements: role="alert" on form error messages
✓ OTP inputs: aria-label="Digit 1 of 6" pattern
```

---

## 11. Component Inventory (Phase 1)

### 11.1 UI Primitives (Design System Base)

| Component | Variants | Lucide Icon |
|-----------|----------|-------------|
| Button | Primary, Secondary, Ghost, Destructive | — |
| Input | Default, With Icon, Password, OTP | Mail, Lock, Eye |
| Badge/Chip | Default, Accent, Success, Warning | — |
| Card | Default, Interactive, Feature | — |
| Avatar | Size: sm/md/lg, with fallback initials | User |
| Divider | Horizontal, With label | — |
| Spinner/Loader | sm/md/lg | Loader2 |
| Tooltip | — | — |
| Modal/Dialog | — | X |
| Progress Bar | Linear (signup stepper) | — |
| Select/Dropdown | Single select | ChevronDown |

### 11.2 Landing Page Specific

| Component | Description |
|-----------|-------------|
| NavBar | Sticky, with drawer on mobile |
| AnnouncementTicker | Auto-scrolling, NEW badge |
| HeroSection | Split layout, illustration, CTAs |
| FacultyCard | Brutalist card with illustration |
| NewsCard | Featured + compact variants |
| ResearchCard | Large centered feature card |
| PartnerCarousel | Infinite scroll logos |
| AcademicsCard | Illustration + program info |
| AdmissionBanner | Full-width CTA with illustration |
| AboutBlock | Vision/Mission with left border accent |
| FooterColumn | Label + link list |

### 11.3 Auth Specific

| Component | Description |
|-----------|-------------|
| AuthLayout | Split panel wrapper |
| RoleCard | Role selector card (3 variants) |
| StepIndicator | 5-step progress bar |
| OTPInput | 6-digit code input group |
| PasswordStrengthMeter | 4-bar strength indicator |
| SocialAuthButton | Google sign-in |
| ErrorMessage | Inline form error with AlertCircle icon |
| SuccessScreen | Animated checkmark + redirect |

---

## 12. Delivery Checklist

### Design Deliverables
- [ ] Figma component library with all tokens
- [ ] High-fidelity desktop mockups (all landing sections + auth screens)
- [ ] Mobile mockups (hero, auth flow, faculty section)
- [ ] Prototype with Framer Motion-equivalent transitions in Figma
- [ ] SVG illustrations (6 required, see Section 7)
- [ ] Design token export (JSON format for dev handoff)

### Development Deliverables
- [ ] Next.js project scaffold with design system implemented
- [ ] All landing page sections (responsive)
- [ ] Auth flow: Sign In, Sign Up (5 steps), Forgot Password
- [ ] Role-based routing
- [ ] Framer Motion animations per Section 6
- [ ] Accessibility audit passed (Lighthouse ≥ 90)
- [ ] Performance audit passed (Core Web Vitals green)
- [ ] Unit tests for auth validation logic
- [ ] E2E tests for sign-in and sign-up flows (Playwright)

---

*Document maintained by AAUB Portal Development Team.*
*Next review: Phase 2 scoping — Dashboard & LMS integration.*
