# Database Schema Reference

## Overview

SQLite database managed via Prisma ORM with better-sqlite3 adapter. Database file stored at `prisma/dev.db`.

## Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
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

  @@index([targetType, targetSlug])
  @@index([status])
}

model ForumThread {
  id         String       @id @default(cuid())
  topic      String       // "ai-healthcare" | "3d-printing" | "life-balance"
  title      String
  content    String
  authorName String
  authorEmail String?
  status     String       @default("pending") // "pending" | "approved" | "rejected"
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
  replies    ForumReply[]

  @@index([topic])
  @@index([status])
}

model ForumReply {
  id          String      @id @default(cuid())
  content     String
  authorName  String
  authorEmail String?
  status      String      @default("pending")
  threadId    String
  thread      ForumThread @relation(fields: [threadId], references: [id], onDelete: Cascade)
  parentId    String?     // For nested replies (max 2 levels)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([threadId])
  @@index([status])
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  status    String   @default("unread") // "unread" | "read" | "archived"
  createdAt DateTime @default(now())

  @@index([status])
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

  @@index([status])
}

model AdminSession {
  id        String   @id @default(cuid())
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model GuestMessage {
  id        String   @id @default(cuid())
  name      String
  message   String
  stateId   String?  // State abbreviation (e.g., "CA", "NY") for travel map messages
  color     String   @default("#FFE066") // Sticker color
  status    String   @default("approved") // Auto-approve for simplicity
  createdAt DateTime @default(now())

  @@index([stateId])
}
```

## Relationships

```
ForumThread 1 ──────< ForumReply (many replies per thread)
ForumReply 1 ──────< ForumReply (nested replies, max 2 levels)
```

## Models Summary

| Model | Purpose | Default Status |
|-------|---------|----------------|
| Comment | Comments on work/print pages | pending |
| ForumThread | Discussion forum threads | pending |
| ForumReply | Replies to forum threads | pending |
| ContactSubmission | Contact form entries | unread |
| CoffeeChatRequest | Coffee chat bookings | pending |
| AdminSession | Admin authentication tokens | - |
| GuestMessage | Travel map visitor messages | approved |

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

### GuestMessage.status
- `approved` - Visible on travel map (default, auto-approved)

## Prisma Commands

```bash
# Push schema changes to database (dev)
npm run db:push

# Open Prisma Studio GUI
npm run db:studio

# Generate Prisma Client after schema changes
npx prisma generate

# Create migration (production)
npx prisma migrate dev --name <migration-name>

# Seed database
npm run db:seed
```

## Prisma Client Usage

```typescript
// lib/prisma.ts - Singleton pattern with better-sqlite3 adapter
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  const adapter = new PrismaBetterSqlite3({ url: dbPath });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
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

### Get guest messages for a state
```typescript
const messages = await prisma.guestMessage.findMany({
  where: {
    status: 'approved',
    stateId: 'CA'
  },
  orderBy: { createdAt: 'desc' },
  take: 50
})
```

### Get pending items for admin dashboard
```typescript
const [
  pendingComments,
  pendingThreads,
  pendingReplies,
  unreadContacts,
  pendingCoffeeChats,
  guestMessages
] = await Promise.all([
  prisma.comment.count({ where: { status: 'pending' } }),
  prisma.forumThread.count({ where: { status: 'pending' } }),
  prisma.forumReply.count({ where: { status: 'pending' } }),
  prisma.contactSubmission.count({ where: { status: 'unread' } }),
  prisma.coffeeChatRequest.count({ where: { status: 'pending' } }),
  prisma.guestMessage.count()
])
```

### Create guest message with word filter
```typescript
// Check content first (in API route)
const nameCheck = checkName(name.trim());
const messageCheck = checkMessage(message.trim());

if (nameCheck.isClean && messageCheck.isClean) {
  const newMessage = await prisma.guestMessage.create({
    data: {
      name: name.trim(),
      message: message.trim(),
      stateId: stateId || null,
      status: "approved",
    },
  });
}
```

## Indexes

The schema includes indexes for frequently queried fields:
- `Comment`: `[targetType, targetSlug]`, `[status]`
- `ForumThread`: `[topic]`, `[status]`
- `ForumReply`: `[threadId]`, `[status]`
- `ContactSubmission`: `[status]`
- `CoffeeChatRequest`: `[status]`
- `GuestMessage`: `[stateId]`

## Backup

SQLite database is a single file. To backup:
```bash
cp prisma/dev.db prisma/backup-$(date +%Y%m%d).db
```

## Migration Notes

When adding new tables manually (e.g., if Prisma doesn't detect changes):

```sql
-- Create GuestMessage table
CREATE TABLE IF NOT EXISTS GuestMessage (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  stateId TEXT,
  color TEXT DEFAULT '#FFE066',
  status TEXT DEFAULT 'approved',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
