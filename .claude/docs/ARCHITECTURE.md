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
| Homepage | Static (viewport fit) | Build time |
| About | Static | Build time |
| Work index | Static | Build time |
| Work [slug] | Static + Dynamic | ISR potential |
| Prints | Static | Build time |
| Travel Map | Client-side + Dynamic messages | Polls every 10s |
| Basketball | Static | Build time |
| Coffee/Contact | Static | Build time |
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

### Three-Column Layout System

All public-facing pages use a consistent 3-column layout (25%-50%-25%):

```
┌─────────────────────────────────────────────────────────────┐
│                      PageHeader                             │
│  [Sharon Zhang]  [Home Info Work Beyond Contact]  [Time] [Let's talk] │
├──────────────┬─────────────────────┬────────────────────────┤
│  Left (25%)  │   Middle (50%)      │    Right (25%)         │
│  STICKY      │   SCROLLABLE        │    SCROLLABLE          │
│  - Title     │  - Main content     │  - Supporting info     │
│  - Back link │  - Cards/lists      │  - Related items       │
│  - Tags      │  - Forms            │  - CTAs                │
│              │  - Media            │  - Metadata            │
└──────────────┴─────────────────────┴────────────────────────┘
```

**Column Behavior:**
- **Column 1 (Left)**: Sticky, fixed to viewport height (`h-screen`), never scrolls
- **Column 2 (Middle)**: `overflow-y-auto`, scrolls independently if content overflows
- **Column 3 (Right)**: `overflow-y-auto`, scrolls independently if content overflows
- **Homepage**: Fits entirely in viewport without scrolling (no marquee on home section)

### Layout Components

```
ThreeColumnLayout.tsx    # Main layout wrapper with PageHeader
├── PageLeftColumn.tsx   # Generic left column with title, back link, tags
├── {Middle Content}     # Page-specific main content
└── PageRightColumn.tsx  # Generic right column wrapper
    └── InfoCard.tsx     # Reusable metadata display cards
```

### Page Hierarchy

```
app/layout.tsx (Root Layout - minimal wrapper)
├── ThreeColumnLayout.tsx (Page Layout)
│   ├── PageHeader.tsx (Navigation)
│   ├── PageLeftColumn.tsx
│   ├── {Page-specific Middle Content}
│   └── PageRightColumn.tsx
│       └── InfoCard.tsx (multiple)

Page Types:
├── Hub Pages (Work, Prints, Discuss) → Grid/list in middle
├── Detail Pages ([slug]) → Content + comments in middle
├── Special Pages (Travel, Basketball) → Custom middle content
└── Admin Pages → Keep separate layout (data-dense UI)
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
├── page.tsx            # Homepage (custom 3-column, viewport fit)
├── about/page.tsx      # About (ThreeColumnLayout)
├── work/               # Work pages
│   ├── page.tsx        # Work hub (ThreeColumnLayout)
│   └── [slug]/page.tsx # Work detail (ThreeColumnLayout)
├── prints/             # Print pages (categories: Functional, Art)
│   ├── page.tsx        # Prints hub (ThreeColumnLayout)
│   └── [slug]/page.tsx # Print detail (ThreeColumnLayout)
├── travel/page.tsx     # Travel map with visitor messages (ThreeColumnLayout, client)
├── basketball/page.tsx # Sharon's basketball journey (ThreeColumnLayout)
├── coffee/page.tsx     # Coffee chat booking (custom 3-column, sticky left)
├── contact/page.tsx    # Contact form (custom 3-column, sticky left)
├── api/                # API route handlers
│   ├── comments/       # Comment CRUD
│   ├── messages/       # Guest messages (travel map stickers)
│   ├── contact/        # Contact submissions
│   ├── coffee/         # Coffee chat requests
│   └── travel-states/  # Travel state data
└── admin/              # Protected admin pages (separate layout)

components/
├── ThreeColumnLayout.tsx   # Main 3-column layout wrapper (sticky left column)
├── PageHeader.tsx          # Navigation header
├── PageLeftColumn.tsx      # Generic left column (sticky)
├── PageRightColumn.tsx     # Generic right column wrapper
├── InfoCard.tsx            # Reusable metadata card
├── ProfileColumn.tsx       # Homepage profile column
├── MiddleColumn.tsx        # Homepage middle column (sections: home, info, work, beyond, contact)
├── ContentColumn.tsx       # Homepage content column (portrait + bio)
├── MessageBoard.tsx        # Guest message board
├── PortfolioCard.tsx       # Work portfolio cards
├── PrintGallery.tsx        # Print gallery with filters
├── PrintCard.tsx           # Individual print card (category colors)
├── TravelMap.tsx           # Interactive US map with message stickers
├── CommentSection.tsx      # Comments for work/prints
├── ContactForm.tsx         # Contact form
└── admin/                  # Admin-specific components

lib/
├── prisma.ts       # Prisma client singleton
├── auth.ts         # Admin authentication
├── utils.ts        # Utility functions (cn, formatDate, etc.)
├── content.ts      # Content loading helpers
└── wordFilter.ts   # Bad word filtering for guest messages
```
