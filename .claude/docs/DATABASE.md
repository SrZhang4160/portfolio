# Database Schema Reference

## Overview

SQLite database managed via Prisma ORM. Database file stored at `prisma/dev.db`.

## Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Comment {
  id          String   @id @default(cuid())
  content     String
  authorName  String
  authorEmail String?
  targetType  String   // "work" | "print"
  targetSlug  String   // slug of the work/print
  status      String   @default("pending") // "pending" | "approved" | "rejected"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ForumThread {
  id        String       @id @default(cuid())
  topic     String       // "ai-healthcare" | "3d-printing" | "life-balance"
  title     String
  content   String
  authorName String
  authorEmail String?
  status    String       @default("pending") // "pending" | "approved" | "rejected"
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
  replies   ForumReply[]
}

model ForumReply {
  id        String      @id @default(cuid())
  content   String
  authorName String
  authorEmail String?
  status    String      @default("pending")
  threadId  String
  thread    ForumThread @relation(fields: [threadId], references: [id], onDelete: Cascade)
  parentId  String?     // For nested replies (max 2 levels)
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  status    String   @default("unread") // "unread" | "read" | "archived"
  createdAt DateTime @default(now())
}

model CoffeeChatRequest {
  id              String   @id @default(cuid())
  name            String
  email           String
  company         String?
  role            String?
  topic           String   // What they want to discuss
  preferredTime   String?  // If not using Calendly
  additionalNotes String?
  status          String   @default("pending") // "pending" | "confirmed" | "declined" | "completed"
  createdAt       DateTime @default(now())
}

model AdminSession {
  id        String   @id @default(cuid())
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

## Relationships

```
ForumThread 1 ──────< ForumReply (many replies per thread)
ForumReply 1 ──────< ForumReply (nested replies, max 2 levels)
```

## Status Enums

### Comment.status
- `pending` - Awaiting moderation
- `approved` - Visible on site
- `rejected` - Hidden from site

### ForumThread.status / ForumReply.status
- `pending` - Awaiting moderation
- `approved` - Visible on site
- `rejected` - Hidden from site

### ContactSubmission.status
- `unread` - New submission
- `read` - Viewed by admin
- `archived` - Handled/closed

### CoffeeChatRequest.status
- `pending` - Awaiting response
- `confirmed` - Meeting scheduled
- `declined` - Request declined
- `completed` - Meeting happened

## Prisma Commands

```bash
# Push schema changes to database (dev)
pnpm db:push

# Open Prisma Studio GUI
pnpm db:studio

# Generate Prisma Client after schema changes
npx prisma generate

# Create migration (production)
npx prisma migrate dev --name <migration-name>

# Seed database
pnpm db:seed
```

## Prisma Client Usage

```typescript
// lib/prisma.ts - Singleton pattern
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Common Queries

### Get approved comments for a work item
```typescript
const comments = await prisma.comment.findMany({
  where: {
    targetType: 'work',
    targetSlug: slug,
    status: 'approved'
  },
  orderBy: { createdAt: 'desc' }
})
```

### Get forum threads with reply count
```typescript
const threads = await prisma.forumThread.findMany({
  where: { topic, status: 'approved' },
  include: {
    _count: { select: { replies: true } }
  },
  orderBy: { createdAt: 'desc' }
})
```

### Get pending items for admin dashboard
```typescript
const [pendingComments, pendingThreads, unreadContacts] = await Promise.all([
  prisma.comment.count({ where: { status: 'pending' } }),
  prisma.forumThread.count({ where: { status: 'pending' } }),
  prisma.contactSubmission.count({ where: { status: 'unread' } })
])
```

## Indexes

Consider adding indexes for frequently queried fields:
- `Comment.targetType` + `Comment.targetSlug` (composite)
- `Comment.status`
- `ForumThread.topic`
- `ForumThread.status`
- `ContactSubmission.status`

## Backup

SQLite database is a single file. To backup:
```bash
cp prisma/dev.db prisma/backup-$(date +%Y%m%d).db
```
