# Component Catalog

## Layout Components

### Header
Navigation header with logo and menu.

```tsx
// components/Header.tsx
interface HeaderProps {
  transparent?: boolean;  // For hero sections
}
```

**Features:**
- Logo linking to home
- Navigation links
- Mobile hamburger menu
- Optional transparent mode for hero overlays

**Navigation Items:**
- About
- Work
- Prints
- Travel
- Basketball
- Discuss
- Contact

---

### Footer
Site footer with links and social.

```tsx
// components/Footer.tsx
// No props - static content
```

**Sections:**
- Quick links
- Social links (GitHub, LinkedIn, Twitter)
- Copyright

---

## Content Components

### PortfolioCard
Card for displaying work items on portfolio grid.

```tsx
// components/PortfolioCard.tsx
interface PortfolioCardProps {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}
```

**Features:**
- Thumbnail image with hover effect
- Title and description
- Tag pills
- Link to case study page

---

### PrintCard
Card for displaying 3D prints in gallery.

```tsx
// components/PrintCard.tsx
interface PrintCardProps {
  title: string;
  slug: string;
  thumbnail: string;
  category: "functional" | "art" | "material";
  material: string;
}
```

**Features:**
- Thumbnail image
- Title
- Category badge
- Material tag
- Link to print detail page

---

### BookWidget
Currently reading display for about page.

```tsx
// components/BookWidget.tsx
interface BookWidgetProps {
  title: string;
  author: string;
  cover: string;
  progress: number;
}
```

**Features:**
- Book cover image
- Title and author
- Progress bar
- Link to Goodreads (optional)

---

### CaseStudyContent
MDX renderer for case study pages.

```tsx
// components/CaseStudyContent.tsx
interface CaseStudyContentProps {
  source: MDXRemoteSerializeResult;
  frontmatter: CaseStudyFrontmatter;
}
```

**Features:**
- Hero image
- Metadata sidebar (role, timeline, team, tools)
- Impact metrics
- MDX content rendering
- Custom MDX components

---

## Interactive Components

### TravelMap
Interactive US map showing visited/wishlist states.

```tsx
// components/TravelMap.tsx
interface TravelMapProps {
  states: StateData[];
  onStateClick: (state: StateData) => void;
}
```

**Features:**
- SVG map via react-simple-maps
- Color coding: visited (blue), wishlist (orange)
- Hover tooltips with state info
- Click to show modal
- Legend

---

### StateModal
Modal showing state details after map click.

```tsx
// components/StateModal.tsx
interface StateModalProps {
  state: StateData;
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**
- State name and status
- Visit date / highlights
- Notes
- Recommendation request form (for wishlist)

---

### PrintGallery
Filterable grid of 3D prints.

```tsx
// components/PrintGallery.tsx
interface PrintGalleryProps {
  prints: Print[];
}
```

**Features:**
- Filter buttons (All, Functional, Art, Material)
- Grid layout
- Animation on filter change

---

## Form Components

### ContactForm
Contact form with validation.

```tsx
// components/ContactForm.tsx
// No props - self-contained
```

**Fields:**
- Name (required)
- Email (required)
- Subject (optional)
- Message (required)
- Honeypot (hidden)

**Features:**
- React Hook Form + Zod validation
- Loading state
- Success/error messages
- Honeypot spam protection

---

### CommentSection
Comments display and submission for work/prints.

```tsx
// components/CommentSection.tsx
interface CommentSectionProps {
  targetType: "work" | "print";
  targetSlug: string;
}
```

**Features:**
- List of approved comments
- New comment form
- Timestamp formatting
- Pending state after submission

---

### CoffeeChatForm
Pre-meeting form for coffee chats.

```tsx
// components/CoffeeChatForm.tsx
// No props - self-contained
```

**Fields:**
- Name (required)
- Email (required)
- Company (optional)
- Role (optional)
- Topic (required)
- Preferred time (optional)
- Additional notes (optional)

---

### ForumThread
Forum thread display with replies.

```tsx
// components/ForumThread.tsx
interface ForumThreadProps {
  thread: ForumThreadWithReplies;
}
```

**Features:**
- Thread content with author
- Nested replies (max 2 levels)
- Reply form
- Markdown rendering

---

### ForumNewThread
Form for creating new forum thread.

```tsx
// components/ForumNewThread.tsx
interface ForumNewThreadProps {
  topic: string;
  onSuccess: () => void;
}
```

**Fields:**
- Title (required)
- Content (required, markdown supported)
- Name (required)
- Email (optional)

---

## Admin Components

### AdminTable
Generic table for admin lists.

```tsx
// components/admin/AdminTable.tsx
interface AdminTableProps<T> {
  data: T[];
  columns: Column[];
  actions: Action[];
}
```

**Features:**
- Sortable columns
- Action buttons (approve, reject, delete)
- Status badges
- Pagination (if needed)

---

### AdminStats
Dashboard stat cards.

```tsx
// components/admin/AdminStats.tsx
interface AdminStatsProps {
  stats: {
    pendingComments: number;
    pendingThreads: number;
    unreadContacts: number;
    pendingCoffeeChats: number;
  }
}
```

**Features:**
- Card grid
- Count displays
- Links to respective pages

---

## UI Components

### Button
Reusable button component.

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant: "primary" | "secondary" | "accent" | "ghost";
  size: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  href?: string;  // Renders as Link
}
```

---

### Input
Form input field.

```tsx
// components/ui/Input.tsx
interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}
```

---

### Textarea
Form textarea field.

```tsx
// components/ui/Textarea.tsx
interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
}
```

---

### Badge
Tag/badge display.

```tsx
// components/ui/Badge.tsx
interface BadgeProps {
  variant: "default" | "primary" | "accent" | "success" | "warning" | "error";
  children: React.ReactNode;
}
```

---

### Modal
Reusable modal dialog.

```tsx
// components/ui/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
```

---

### Tooltip
Hover tooltip.

```tsx
// components/ui/Tooltip.tsx
interface TooltipProps {
  content: string;
  children: React.ReactNode;
}
```

---

## Component Organization

```
components/
├── Header.tsx
├── Footer.tsx
├── PortfolioCard.tsx
├── PrintCard.tsx
├── BookWidget.tsx
├── CaseStudyContent.tsx
├── TravelMap.tsx
├── StateModal.tsx
├── PrintGallery.tsx
├── ContactForm.tsx
├── CommentSection.tsx
├── CoffeeChatForm.tsx
├── ForumThread.tsx
├── ForumNewThread.tsx
├── admin/
│   ├── AdminTable.tsx
│   └── AdminStats.tsx
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    ├── Textarea.tsx
    ├── Badge.tsx
    ├── Modal.tsx
    └── Tooltip.tsx
```

## Utility Function

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
