# Architecture Overview

## System Design

This is a personal portfolio website built as a Next.js 14 application using the App Router. It combines static content (portfolio, about, prints) with dynamic features (comments, forums, travel map messages, contact).

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Database | SQLite via Prisma | 7.x |
| Content | MDX (next-mdx-remote) | - |
| Forms | react-hook-form + Zod | - |
| Maps | react-simple-maps | - |
| Email | Resend | - |
| Package Manager | npm/pnpm | - |

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                            │
│  Next.js 16 (App Router) + React 19 + TypeScript        │
│  Tailwind CSS v4 + clsx/tailwind-merge                  │
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
│  Zod validation + Resend email notifications            │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  Prisma ORM + SQLite (better-sqlite3 adapter)           │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Static Content (Case Studies, Prints)

```
content/work/*.mdx  →  gray-matter parse  →  Server Component  →  HTML
content/prints/*.json  →  JSON.parse  →  Server Component  →  HTML
```

### Dynamic Content (Comments, Forums, Messages)

```
User Action  →  Client Component  →  API Route  →  Prisma  →  SQLite
                     ↑                               │
                     └───────────── JSON Response ───┘
                                         │
                                         ↓
                              Email Notification (Resend)
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
| Work [slug] | Static + Dynamic comments | ISR potential |
| Prints | Static | Build time |
| Prints [slug] | Static + Dynamic comments | ISR potential |
| Travel Map | Client-side + Dynamic messages | Polls every 10s |
| Basketball | Static | Build time |
| Coffee | Static + Calendar embed | Build time |
| Contact | Static | Build time |
| Admin | Dynamic | None |

## Key Architectural Decisions

### 1. Server Components by Default
All pages are Server Components unless they require interactivity. This minimizes JavaScript bundle size.

### 2. SQLite for Simplicity
SQLite is used for the database because:
- Single-file, no server needed
- Perfect for low-traffic portfolio site
- Easy to backup and migrate
- Uses better-sqlite3 adapter for performance

### 3. Content as Files
Case studies and static content live in the filesystem:
- Version controlled with Git
- Easy to edit without database
- MDX for rich formatting

### 4. Simple Admin Auth
Password-based protection instead of full auth system:
- Single admin user (Sharon)
- No user registration needed
- Session stored in HTTP-only cookie (7-day expiry)

### 5. Email Notifications
- Resend for transactional email
- Non-blocking notifications on form submissions
- Notifications for contact form and guest messages

### 6. Calendar Integration
- Supports Calendly or Cal.com embed
- Configured via environment variable
- Fallback UI when not configured

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
- **Homepage**: Fits entirely in viewport without scrolling

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
├── Hub Pages (Work, Prints) → Grid/list in middle
├── Detail Pages ([slug]) → Content + comments in middle
├── Special Pages (Travel, Basketball) → Custom middle content
└── Admin Pages → Separate layout (data-dense UI)
```

## Security Considerations

1. **Input Validation**: All API inputs validated with Zod
2. **SQL Injection**: Prisma ORM parameterizes queries
3. **XSS**: React escapes output by default
4. **CSRF**: Forms use built-in Next.js protections
5. **Admin Access**: Password-protected routes with session
6. **Honeypot**: Contact form includes honeypot field for spam
7. **Word Filter**: Guest messages filtered for inappropriate content

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
├── coffee/page.tsx     # Coffee chat booking with calendar embed
├── contact/page.tsx    # Contact form
├── api/                # API route handlers
│   ├── comments/       # Comment CRUD
│   ├── messages/       # Guest messages (travel map stickers)
│   ├── contact/        # Contact submissions + email
│   ├── coffee/         # Coffee chat requests
│   ├── travel-states/  # Travel state data
│   └── admin/          # Admin endpoints
│       ├── stats/      # Dashboard statistics
│       ├── comments/   # Comment moderation
│       ├── contacts/   # Contact management
│       ├── coffee/     # Coffee chat management
│       ├── messages/   # Guest message management
│       ├── login/      # Authentication
│       └── logout/     # Session termination
└── admin/              # Protected admin pages (separate layout)
    ├── page.tsx        # Dashboard
    ├── comments/       # Comment moderation
    ├── forum/          # Forum moderation
    ├── contacts/       # Contact submissions
    ├── coffee/         # Coffee chat requests
    └── messages/       # Guest messages

components/
├── ThreeColumnLayout.tsx   # Main 3-column layout wrapper
├── PageHeader.tsx          # Navigation header
├── PageLeftColumn.tsx      # Generic left column (sticky)
├── PageRightColumn.tsx     # Generic right column wrapper
├── InfoCard.tsx            # Reusable metadata card
├── ProfileColumn.tsx       # Homepage profile column
├── MiddleColumn.tsx        # Homepage middle column
├── ContentColumn.tsx       # Homepage content column
├── PortfolioCard.tsx       # Work portfolio cards
├── PrintGallery.tsx        # Print gallery with filters
├── PrintCard.tsx           # Individual print card
├── TravelMap.tsx           # Interactive US map with message stickers
├── CommentSection.tsx      # Comments for work/prints
├── ContactForm.tsx         # Contact form
└── BookWidget.tsx          # Currently reading display

lib/
├── prisma.ts       # Prisma client singleton (better-sqlite3 adapter)
├── auth.ts         # Admin authentication
├── email.ts        # Resend email notifications
├── utils.ts        # Utility functions (cn, formatDate, etc.)
├── content.ts      # Content loading helpers
├── validations.ts  # Zod validation schemas
└── wordFilter.ts   # Bad word filtering for guest messages
```

## Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Admin Authentication
ADMIN_PASSWORD="your-secure-password"

# Site URL (for metadata, email links)
NEXT_PUBLIC_SITE_URL="https://sharonzhang.dev"

# Email Notifications (Resend)
RESEND_API_KEY="re_xxxxx"
NOTIFICATION_EMAIL="your-email@example.com"

# Calendar/Scheduling (Calendly or Cal.com)
NEXT_PUBLIC_CALENDAR_URL="https://cal.com/username/30min"
```

## Development Commands

```bash
npm run dev       # Start dev server on localhost:3000
npm run build     # Build for production (includes prisma generate)
npm run start     # Start production server
npm run lint      # Run ESLint

npm run db:push   # Sync Prisma schema to database
npm run db:studio # Open Prisma Studio GUI
npm run db:seed   # Seed database with sample data
```
