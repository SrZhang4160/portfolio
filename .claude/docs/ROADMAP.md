# Project Roadmap

## Phase Overview

| Phase | Name | Status | Description |
|-------|------|--------|-------------|
| 0 | Foundation | Complete | Project setup, tooling, base layout |
| 1 | Static Pages | Complete | Homepage, about, portfolio, case studies |
| 2 | Interactive | Complete | Travel map, 3D prints gallery, basketball |
| 3 | Database/API | Complete | API routes, database, forms |
| 4 | Community | Complete | Comments, forums, contact, coffee chat |
| 5 | Admin | Complete | Dashboard, moderation interface |
| 6 | Polish | Complete | Performance, SEO, accessibility, deploy |

---

## Phase 0: Foundation

### Tasks
- [x] Create documentation files (.claude/docs/)
- [x] Initialize Next.js 14 with TypeScript
- [x] Install all dependencies
- [x] Configure Tailwind with design tokens
- [x] Initialize Prisma with SQLite
- [x] Create Prisma schema with all models
- [x] Create base layout (Header, Footer)
- [x] Set up utility functions (cn, etc.)

### Acceptance Criteria
- [x] `npm run dev` runs without errors
- [x] Base layout renders with header/footer
- [x] Prisma Studio shows tables

---

## Phase 1: Static Pages

### Tasks
- [x] Homepage with hero, featured projects, CTAs
- [x] About page with journey narrative
- [x] Portfolio page with project grid
- [x] Case study pages with MDX rendering
- [x] Create 3 MDX case studies (autobrachy, radiology, muscle-analytics)
- [x] BookWidget component
- [x] PortfolioCard component

### Acceptance Criteria
- [x] All static pages render correctly
- [x] MDX case studies display properly
- [x] Responsive on mobile

---

## Phase 2: Interactive Features

### Tasks
- [x] TravelMap component with react-simple-maps
- [x] Travel page with map and state data
- [x] PrintCard component
- [x] Prints gallery page with filters
- [x] Individual print pages
- [x] Create prints JSON data (11 prints)
- [x] Basketball page with She Got Buckets section
- [x] Create travel states JSON data

### Acceptance Criteria
- [x] Travel map is interactive (hover, click)
- [x] Prints filter correctly
- [x] All images load

---

## Phase 3: Database & API

### Tasks
- [x] API: GET/POST comments
- [x] API: PATCH comments (approve/reject)
- [x] API: GET/POST forum threads
- [x] API: GET/POST forum replies
- [x] API: POST contact submission
- [x] API: POST coffee chat request
- [x] Database seed script
- [x] ContactForm component
- [x] CommentSection component
- [x] CoffeeChatForm component

### Acceptance Criteria
- [x] All API routes return correct responses
- [x] Database seeded with sample data
- [x] Forms submit successfully

---

## Phase 4: Community Features

### Tasks
- [x] Comments on work/[slug] pages
- [x] Comments on prints/[slug] pages
- [x] Forum hub page (/discuss)
- [x] Forum topic pages (/discuss/[topic])
- [x] ForumThread component
- [x] ForumNewThread component
- [x] Reply system (max 2 levels)
- [x] Contact page with form
- [x] Coffee chat page

### Acceptance Criteria
- [x] Comments appear after approval
- [x] Forum threads and replies work
- [x] Contact form sends to database

---

## Phase 5: Admin Dashboard

### Tasks
- [x] Admin authentication (password-based)
- [x] Session middleware
- [x] Admin dashboard overview (/admin)
- [x] Comments moderation table (/admin/comments)
- [x] Forum moderation table (/admin/forum)
- [x] Contact submissions list (/admin/contacts)
- [x] Coffee chat requests list (/admin/coffee)
- [x] Approve/reject actions

### Acceptance Criteria
- [x] Admin routes protected
- [x] Can approve/reject comments
- [x] Can view all submissions

---

## Phase 6: Polish & Deploy

### Tasks
- [x] Image optimization (next/image used throughout)
- [x] Metadata on all pages
- [x] metadataBase configured
- [x] robots.ts created
- [x] sitemap.ts created (dynamic sitemap)
- [x] .env.example created
- [x] Build passes successfully
- [x] Lint passes successfully

### Acceptance Criteria
- [x] Build completes without errors
- [x] Lint passes without warnings
- [x] All pages have proper metadata
- [x] Sitemap includes all pages
- [x] Ready for Vercel deployment

---

## Content Summary

### Case Studies (MDX) - 3 completed
1. **AutoBrachy** - Brachytherapy automation project
2. **Radiology** - Medical imaging workflow
3. **Muscle Analytics** - Motion analysis tool

### 3D Prints (JSON) - 11 prints
- Doraemon Lamp, Labubu, Harry Potter Platform, Nanotech Suit Arc Reactor
- Boba Cat, Mechanical Keyboard Case, Plant Pot, Articulated Dragon
- Lithophane, Phone Stand, and more

### Travel Data (JSON) - All US states
- States with visited/wishlist status and notes

### Books (JSON)
- Currently reading list configured

---

## Technical Notes

### Stack
- Next.js 16.1.6 (Turbopack)
- TypeScript
- Tailwind CSS v4
- Prisma 7 with SQLite (better-sqlite3 adapter)
- react-simple-maps for travel map
- react-hook-form + Zod for forms

### Key Files
- `/lib/prisma.ts` - Prisma client with adapter pattern
- `/lib/auth.ts` - Admin authentication
- `/lib/content.ts` - Content loading utilities
- `/lib/validations.ts` - Zod schemas

---

## Deployment Checklist

- [ ] Set ADMIN_PASSWORD environment variable (production)
- [ ] Set NEXT_PUBLIC_SITE_URL to production URL
- [ ] Deploy to Vercel
- [ ] Configure custom domain (optional)
- [ ] Run Lighthouse audit
- [ ] Test all forms on production

---

## Future Enhancements

Ideas for after MVP:
- Newsletter signup
- RSS feed for blog posts
- Search functionality
- Dark mode toggle
- Internationalization
- Integration with Notion for content
- Email notifications for form submissions
- Rate limiting to API routes
