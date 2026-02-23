<div align="center">

# ✈️ AAUB Student Portal

**Aviation and Aerospace University Bangladesh**

A modern, full-stack student portal built with React, Clerk, and Supabase.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk&logoColor=white)](https://clerk.com)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ⚡ Overview

A role-based student portal designed for AAUB that provides tailored dashboards for **Students**, **Faculty**, and **Office Staff**. Features secure authentication via Clerk with LinkedIn OAuth, persistent user profiles in Supabase, and a polished dark-mode UI.

## 🎯 Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Email/password + LinkedIn OAuth via Clerk |
| 📋 **Onboarding** | Role-based setup (Student / Faculty / Office) with department, semester, and designation selection |
| 📊 **Role-Based Dashboards** | Separate dashboards with relevant data for each user type |
| 🗄️ **Database** | Supabase with Row-Level Security — users can only access their own data |
| 🧹 **Auto Cleanup** | Supabase Edge Function webhook deletes profile data when a user is removed from Clerk |
| 🎨 **Modern UI** | Dark-mode dashboards, Framer Motion animations, responsive design |

## 🏗️ Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS 4 + Framer Motion
- **Auth:** Clerk (email, password, LinkedIn OAuth)
- **Database:** Supabase (PostgreSQL + RLS)
- **Edge Functions:** Deno (Supabase Edge Functions)
- **Icons:** Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── FacultiesSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ...
│   └── pages/            # Route pages
│       ├── LandingPage.tsx
│       ├── LoginPage.tsx
│       ├── SignUpPage.tsx
│       ├── OnboardingPage.tsx
│       ├── DashboardPage.tsx      # Role router
│       ├── StudentDashboard.tsx
│       ├── FacultyDashboard.tsx
│       └── OfficeDashboard.tsx
├── lib/
│   └── supabase.ts       # Supabase client with Clerk auth
├── styles/               # Global styles and fonts
└── main.tsx              # App entry point with ClerkProvider

supabase/
└── functions/
    └── delete-user/      # Edge function for Clerk webhook cleanup
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repository
git clone https://github.com/nabil24024004/AAUB-STUDENT-PORTAL.git
cd AAUB-STUDENT-PORTAL

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## 🔧 Configuration

### Clerk + Supabase Integration

1. **Clerk Dashboard** → [Connect with Supabase](https://dashboard.clerk.com/setup/supabase) to add the `role: "authenticated"` claim
2. **Supabase Dashboard** → Auth → Third-Party → Add Clerk as provider

### Clerk Webhook (Auto Cleanup)

1. Go to **Clerk Dashboard → Webhooks → Add Endpoint**
2. Set URL to: `https://<your-project>.supabase.co/functions/v1/delete-user`
3. Subscribe to the `user.deleted` event

## 📄 Database Schema

### `user_profiles`

| Column | Type | Description |
|---|---|---|
| `id` | text (PK) | Clerk user ID |
| `role` | text | `student` / `faculty` / `office` |
| `department` | text | Academic department |
| `batch` | text | Semester (students only) |
| `student_id` | text | Student ID number |
| `whatsapp` | text | WhatsApp contact |
| `designation` | text | Faculty designation |
| `created_at` | timestamptz | Profile creation time |
| `updated_at` | timestamptz | Last update time |

> All rows are protected by RLS — users can only read/write their own profile.

## 🧑‍💻 Author

**Nabil** — [@nabil24024004](https://github.com/nabil24024004)

---

<div align="center">
  <sub>Built with ❤️ for Aviation and Aerospace University Bangladesh</sub>
</div>