# Sharon Zhang Portfolio

Personal portfolio website for Sharon Zhang - MechE → Robotics → Carina AI

## Quick Reference

| Item | Value |
|------|-------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | SQLite via Prisma (better-sqlite3) |
| Content | MDX for case studies |
| Email | Resend |
| Maps | react-simple-maps |
| Package Manager | npm/pnpm |
| Node Version | 18+ |

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push Prisma schema to database
npm run db:studio    # Open Prisma Studio GUI
npm run db:seed      # Seed database with sample data
```

## Project Structure

```
letstalk/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (minimal)
│   ├── page.tsx            # Homepage (custom 3-column)
│   ├── about/              # About page (ThreeColumnLayout)
│   ├── work/               # Portfolio/case studies
│   │   └── [slug]/         # Individual case study
│   ├── prints/             # 3D prints gallery
│   │   └── [slug]/         # Individual print
│   ├── travel/             # Interactive travel map
│   ├── basketball/         # Basketball/She Got Buckets
│   ├── discuss/            # Discussion forums
│   │   └── [topic]/        # Forum topic threads
│   ├── coffee/             # Coffee chat booking (Cal.com embed)
│   ├── contact/            # Contact form
│   ├── admin/              # Admin dashboard (protected)
│   │   ├── comments/       # Comment moderation
│   │   ├── forum/          # Forum moderation
│   │   ├── contacts/       # Contact submissions
│   │   ├── coffee/         # Coffee chat requests
│   │   └── messages/       # Guest message management
│   └── api/                # API route handlers
├── components/             # React components
│   ├── ThreeColumnLayout   # Main 3-column page layout
│   ├── PageHeader          # Navigation header
│   ├── PageLeftColumn      # Generic left sidebar
│   ├── PageRightColumn     # Generic right sidebar
│   ├── InfoCard            # Reusable metadata cards
│   ├── TravelMap           # Interactive US map
│   └── ...                 # Feature components
├── content/                # Static content (MDX, JSON)
│   ├── work/               # Case study MDX files
│   ├── prints/             # 3D prints data
│   ├── travel/             # Travel map data
│   └── books/              # Currently reading
├── lib/                    # Utilities and helpers
│   ├── prisma.ts           # Database client
│   ├── auth.ts             # Admin authentication
│   ├── email.ts            # Resend email service
│   ├── validations.ts      # Zod schemas
│   ├── wordFilter.ts       # Content moderation
│   └── utils.ts            # Helper functions
├── prisma/                 # Database schema and seeds
├── public/                 # Static assets
└── styles/                 # Global CSS
```

## Layout System

All public pages use a consistent 3-column layout (25%-50%-25%):

```
┌──────────────────────────────────────────────────────────┐
│                      PageHeader                          │
├──────────────┬─────────────────────┬─────────────────────┤
│  Left (25%)  │   Middle (50%)      │   Right (25%)       │
│  STICKY      │   SCROLLABLE        │   SCROLLABLE        │
│  - Title     │   - Main content    │   - Info cards      │
│  - Back link │   - Cards/grids     │   - CTAs            │
│  - Tags      │   - Forms           │   - Related         │
└──────────────┴─────────────────────┴─────────────────────┘
```

**Column Behavior:**
- Column 1 (Left): Sticky, fixed to viewport height, never scrolls
- Column 2 (Middle): Scrollable if content overflows
- Column 3 (Right): Scrollable if content overflows

Use `ThreeColumnLayout` with `PageLeftColumn`, `PageRightColumn`, and `InfoCard` components.

## Code Conventions

### Components
- Use functional components with TypeScript
- Props interface named `{ComponentName}Props`
- One component per file in `/components`
- Use `clsx` + `tailwind-merge` via `cn()` helper for class names

### Data Fetching
- Use Server Components by default
- Client Components only when needed (interactivity, hooks)
- Mark with `'use client'` directive at top of file

### API Routes
- Use Next.js Route Handlers in `app/api/`
- Validate input with Zod schemas
- Return consistent JSON response format: `{ success, data?, error? }`
- Email notifications are non-blocking

### Styling
- Tailwind CSS utility classes
- Design tokens in `tailwind.config.ts`
- Global styles in `styles/globals.css`

## Page Architecture

| Route | Purpose | Layout | Type |
|-------|---------|--------|------|
| `/` | Homepage | Custom 3-col (viewport fit) | Static |
| `/about` | Bio and journey | ThreeColumnLayout | Static |
| `/work` | Portfolio grid | ThreeColumnLayout | Static |
| `/work/[slug]` | Case study detail | ThreeColumnLayout | Static + Comments |
| `/prints` | 3D prints gallery (Functional/Art) | ThreeColumnLayout | Static |
| `/prints/[slug]` | Print detail | ThreeColumnLayout | Static + Comments |
| `/travel` | Interactive US map with visitor messages | ThreeColumnLayout | Client + Dynamic |
| `/basketball` | Sharon's basketball journey | ThreeColumnLayout | Static |
| `/coffee` | Coffee chat booking | Custom 3-col (sticky left) | Static + Cal.com |
| `/contact` | Contact form | Custom 3-col (sticky left) | Form + Email |
| `/admin` | Dashboard | Admin Layout | Protected |
| `/admin/messages` | Guest message management | Admin Layout | Protected |

## Database Models

- **Comment** - Comments on work/prints pages (requires moderation)
- **ForumThread** - Discussion forum threads (requires moderation)
- **ForumReply** - Replies to forum threads (requires moderation)
- **ContactSubmission** - Contact form entries (triggers email)
- **CoffeeChatRequest** - Coffee chat bookings
- **GuestMessage** - Travel map visitor messages (auto-approved with word filter)
- **AdminSession** - Admin authentication tokens

## Gotchas & Warnings

1. **Admin Auth**: Simple password protection via `ADMIN_PASSWORD` env var
2. **SQLite**: Single file DB at `prisma/dev.db` - don't commit to git
3. **MDX**: Case studies in `content/work/` must have valid frontmatter
4. **Travel Map**: Uses react-simple-maps - heavy bundle, dynamically imported; supports visitor messages as stickers
5. **Comments**: Require moderation (pending → approved) before displaying
6. **Guest Messages**: Auto-approved with word filter; travel map polls every 10s for real-time updates
7. **Sticky Columns**: Left column is sticky on all pages - content must fit viewport height
8. **Email**: Resend notifications are non-blocking; gracefully handles missing API key
9. **Calendar**: Falls back to email link when `NEXT_PUBLIC_CALENDAR_URL` not set

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

## Detailed Documentation

- [Architecture](.claude/docs/ARCHITECTURE.md) - System overview and data flow
- [Database](.claude/docs/DATABASE.md) - Prisma schema reference
- [API Routes](.claude/docs/API_ROUTES.md) - Endpoint documentation
- [Components](.claude/docs/COMPONENTS.md) - Component catalog
- [Design Tokens](.claude/docs/DESIGN_TOKENS.md) - Colors, typography, spacing
- [Content Schemas](.claude/docs/CONTENT_SCHEMAS.md) - MDX and JSON structures
- [Roadmap](.claude/docs/ROADMAP.md) - Task tracking
