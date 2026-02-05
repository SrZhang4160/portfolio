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
│   ├── layout.tsx          # Root layout (Header/Footer)
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
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

| Route | Purpose | Type |
|-------|---------|------|
| `/` | Homepage | Static |
| `/about` | Bio and journey | Static |
| `/work` | Portfolio grid | Static |
| `/work/[slug]` | Case study detail | Static + Comments |
| `/prints` | 3D prints gallery | Static |
| `/prints/[slug]` | Print detail | Static + Comments |
| `/travel` | Interactive US map | Client Component |
| `/basketball` | Basketball content | Static |
| `/discuss` | Forum hub | Static |
| `/discuss/[topic]` | Forum threads | Dynamic |
| `/coffee` | Coffee chat booking | Static + Calendly |
| `/contact` | Contact form | Form |
| `/admin` | Dashboard | Protected |

## Database Models

- **Comment** - Comments on work/prints pages
- **ForumThread** - Discussion forum threads
- **ForumReply** - Replies to forum threads
- **ContactSubmission** - Contact form entries
- **CoffeeChatRequest** - Coffee chat bookings

## Gotchas & Warnings

1. **Admin Auth**: Simple password protection via `ADMIN_PASSWORD` env var
2. **SQLite**: Single file DB at `prisma/dev.db` - don't commit to git
3. **MDX**: Case studies in `content/work/` must have valid frontmatter
4. **Travel Map**: Uses react-simple-maps - heavy bundle, dynamically imported
5. **Comments**: Require moderation (pending → approved) before displaying

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
