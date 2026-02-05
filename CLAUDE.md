# Sharon Zhang Portfolio

Personal portfolio website for Sharon Zhang - MechE → Robotics → Carina AI

## Quick Reference

| Item | Value |
|------|-------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite via Prisma |
| Content | MDX for case studies |
| Package Manager | pnpm |
| Node Version | 18+ |

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:push      # Push Prisma schema to database
pnpm db:studio    # Open Prisma Studio GUI
pnpm db:seed      # Seed database with sample data
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
│   ├── coffee/             # Coffee chat booking
│   ├── contact/            # Contact form
│   ├── admin/              # Admin dashboard (protected)
│   └── api/                # API route handlers
├── components/             # React components
│   ├── ThreeColumnLayout   # Main 3-column page layout
│   ├── PageHeader          # Navigation header
│   ├── PageLeftColumn      # Generic left sidebar
│   ├── PageRightColumn     # Generic right sidebar
│   ├── InfoCard            # Reusable metadata cards
│   └── ...                 # Feature components
├── content/                # Static content (MDX, JSON)
│   ├── work/               # Case study MDX files
│   ├── prints/             # 3D prints data
│   ├── travel/             # Travel map data
│   └── books/              # Currently reading
├── lib/                    # Utilities and helpers
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
| `/coffee` | Coffee chat booking | Custom 3-col (sticky left) | Static + Calendly |
| `/contact` | Contact form | Custom 3-col (sticky left) | Form |
| `/admin` | Dashboard | Admin Layout | Protected |

## Database Models

- **Comment** - Comments on work/prints pages
- **ForumThread** - Discussion forum threads
- **ForumReply** - Replies to forum threads
- **ContactSubmission** - Contact form entries
- **CoffeeChatRequest** - Coffee chat bookings
- **GuestMessage** - Visitor messages (travel map stickers, with optional stateId)

## Gotchas & Warnings

1. **Admin Auth**: Simple password protection via `ADMIN_PASSWORD` env var
2. **SQLite**: Single file DB at `prisma/dev.db` - don't commit to git
3. **MDX**: Case studies in `content/work/` must have valid frontmatter
4. **Travel Map**: Uses react-simple-maps - heavy bundle, dynamically imported; supports visitor messages as stickers
5. **Comments**: Require moderation (pending → approved) before displaying
6. **Guest Messages**: Auto-approved with word filter; travel map polls every 10s for real-time updates
7. **Sticky Columns**: Left column is sticky on all pages - content must fit viewport height

## Environment Variables

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="your-secure-password"
```

## Detailed Documentation

- [Architecture](.claude/docs/ARCHITECTURE.md) - System overview and data flow
- [Database](.claude/docs/DATABASE.md) - Prisma schema reference
- [Roadmap](.claude/docs/ROADMAP.md) - Task tracking
- [Design Tokens](.claude/docs/DESIGN_TOKENS.md) - Colors, typography, spacing
- [API Routes](.claude/docs/API_ROUTES.md) - Endpoint documentation
- [Content Schemas](.claude/docs/CONTENT_SCHEMAS.md) - MDX and JSON structures
- [Components](.claude/docs/COMPONENTS.md) - Component catalog
