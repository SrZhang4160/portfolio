# API Routes Documentation

## Base URL

Development: `http://localhost:3000/api`

## Response Format

All API routes return JSON with consistent structure:

```typescript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

---

## Comments API

### GET /api/comments
Get comments for a specific target (work item or print).

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| targetType | string | Yes | "work" or "print" |
| targetSlug | string | Yes | Slug of the item |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "content": "Great project!",
      "authorName": "John Doe",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### POST /api/comments
Create a new comment (status: pending).

**Body:**
```json
{
  "content": "Comment text",
  "authorName": "John Doe",
  "authorEmail": "john@example.com",
  "targetType": "work",
  "targetSlug": "autobrachy"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "content": "Comment text",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### PATCH /api/comments/[id]
Update comment status (admin only).

**Body:**
```json
{
  "status": "approved"  // or "rejected"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "status": "approved"
  }
}
```

---

## Forum API

### GET /api/forum
Get forum threads for a topic.

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| topic | string | Yes | "ai-healthcare", "3d-printing", or "life-balance" |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "title": "Thread title",
      "content": "Thread content",
      "authorName": "Jane Doe",
      "createdAt": "2024-01-15T10:30:00Z",
      "_count": {
        "replies": 5
      }
    }
  ]
}
```

### POST /api/forum
Create a new thread (status: pending).

**Body:**
```json
{
  "topic": "ai-healthcare",
  "title": "Thread title",
  "content": "Thread content",
  "authorName": "Jane Doe",
  "authorEmail": "jane@example.com"
}
```

### GET /api/forum/[id]
Get a thread with its replies.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "title": "Thread title",
    "content": "Thread content",
    "authorName": "Jane Doe",
    "createdAt": "2024-01-15T10:30:00Z",
    "replies": [
      {
        "id": "cly...",
        "content": "Reply content",
        "authorName": "John Doe",
        "parentId": null,
        "createdAt": "2024-01-15T11:00:00Z"
      }
    ]
  }
}
```

### POST /api/forum/[id]
Create a reply to a thread.

**Body:**
```json
{
  "content": "Reply content",
  "authorName": "John Doe",
  "authorEmail": "john@example.com",
  "parentId": null  // or reply ID for nested reply
}
```

---

## Contact API

### POST /api/contact
Submit contact form.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration inquiry",
  "message": "I'd love to discuss..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Coffee Chat API

### POST /api/coffee
Submit coffee chat request.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "role": "Product Manager",
  "topic": "Career advice in robotics",
  "preferredTime": "Afternoons PST",
  "additionalNotes": "Looking forward to connecting!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Admin API

### POST /api/admin/login
Authenticate as admin.

**Body:**
```json
{
  "password": "admin-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "session-token"
  }
}
```

### POST /api/admin/logout
End admin session.

**Response:**
```json
{
  "success": true
}
```

### GET /api/admin/stats
Get dashboard statistics (admin only).

**Response:**
```json
{
  "success": true,
  "data": {
    "pendingComments": 3,
    "pendingThreads": 1,
    "pendingReplies": 2,
    "unreadContacts": 5,
    "pendingCoffeeChats": 2
  }
}
```

---

## Validation Schemas (Zod)

```typescript
// Comment
const commentSchema = z.object({
  content: z.string().min(1).max(2000),
  authorName: z.string().min(1).max(100),
  authorEmail: z.string().email().optional(),
  targetType: z.enum(['work', 'print']),
  targetSlug: z.string().min(1).max(100),
})

// Forum Thread
const threadSchema = z.object({
  topic: z.enum(['ai-healthcare', '3d-printing', 'life-balance']),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
  authorName: z.string().min(1).max(100),
  authorEmail: z.string().email().optional(),
})

// Forum Reply
const replySchema = z.object({
  content: z.string().min(1).max(5000),
  authorName: z.string().min(1).max(100),
  authorEmail: z.string().email().optional(),
  parentId: z.string().optional(),
})

// Contact
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
})

// Coffee Chat
const coffeeChatSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  topic: z.string().min(1).max(500),
  preferredTime: z.string().max(200).optional(),
  additionalNotes: z.string().max(2000).optional(),
})
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Admin auth required |
| 404 | Not Found - Resource doesn't exist |
| 405 | Method Not Allowed |
| 500 | Internal Server Error |

---

## Rate Limiting (Future)

Planned limits:
- Comments: 5/minute per IP
- Forum posts: 3/minute per IP
- Contact: 2/minute per IP
- Coffee chat: 1/minute per IP
