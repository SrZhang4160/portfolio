# Architecture Overview

## System Design

This is a personal portfolio website built as a Next.js 14 application using the App Router. It combines static content (portfolio, about, prints) with dynamic features (comments, forums, contact).

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                            │
│  Next.js 14 (App Router) + React 18 + TypeScript        │
│  Tailwind CSS + clsx/tailwind-merge                     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Content Layer                         │
│  MDX (case studies) + JSON (prints, travel, books)      │
│  next-mdx-remote + gray-matter                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    API Layer                             │
│  Next.js Route Handlers (app/api/)                      │
│  Zod validation + react-hook-form                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  Prisma ORM + SQLite                                    │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Static Content (Case Studies, Prints)

```
content/work/*.mdx  →  gray-matter parse  →  Server Component  →  HTML
content/prints/*.json  →  JSON.parse  →  Server Component  →  HTML
```

### Dynamic Content (Comments, Forums)

```
User Action  →  Client Component  →  API Route  →  Prisma  →  SQLite
                     ↑                               │
                     └───────────── JSON Response ───┘
```

### Form Submissions

```
Form Input  →  react-hook-form  →  Zod validation  →  API Route  →  Prisma
                    ↑                                      │
                    └────────── Success/Error Response ────┘
```

## Rendering Strategy

| Content Type | Rendering | Caching |
|--------------|-----------|---------|
| Homepage | Static | Build time |
| About | Static | Build time |
| Work index | Static | Build time |
| Work [slug] | Static + Dynamic | ISR potential |
| Prints | Static | Build time |
| Travel Map | Client-side | None |
| Forums | Dynamic | On-demand |
| Admin | Dynamic | None |

## Key Architectural Decisions

### 1. Server Components by Default
All pages are Server Components unless they require interactivity. This minimizes JavaScript bundle size.

### 2. SQLite for Simplicity
SQLite is used for the database because:
- Single-file, no server needed
- Perfect for low-traffic portfolio site
- Easy to backup and migrate

### 3. Content as Files
Case studies and static content live in the filesystem:
- Version controlled with Git
- Easy to edit without database
- MDX for rich formatting

### 4. Simple Admin Auth
Password-based protection instead of full auth system:
- Single admin user (Sharon)
- No user registration needed
- Session stored in cookie

## Component Architecture

```
app/layout.tsx (Root Layout)
├── Header.tsx (Navigation)
├── {Page Content}
└── Footer.tsx (Links, social)

Page Types:
├── Static Pages → Server Component → Render content
├── Interactive Pages → Server + Client Components
└── Form Pages → Client Component → API submission
```

## Security Considerations

1. **Input Validation**: All API inputs validated with Zod
2. **SQL Injection**: Prisma ORM parameterizes queries
3. **XSS**: React escapes output by default
4. **CSRF**: Forms use built-in Next.js protections
5. **Admin Access**: Password-protected routes with session
6. **Honeypot**: Contact form includes honeypot field for spam

## File Organization

```
app/
├── (routes)        # Page routes
├── api/            # API route handlers
│   ├── comments/   # Comment CRUD
│   ├── forum/      # Forum CRUD
│   ├── contact/    # Contact submissions
│   └── coffee/     # Coffee chat requests
└── admin/          # Protected admin pages

components/
├── layout/         # Header, Footer, Navigation
├── ui/             # Reusable UI components
├── forms/          # Form components
└── features/       # Feature-specific components

lib/
├── prisma.ts       # Prisma client singleton
├── auth.ts         # Admin authentication
├── utils.ts        # Utility functions (cn, etc.)
└── content.ts      # Content loading helpers
```
