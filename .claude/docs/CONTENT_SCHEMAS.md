# Content Schemas

## MDX Case Studies

### Location
`content/work/*.mdx`

### Frontmatter Schema

```yaml
---
title: "Project Title"
slug: "project-slug"
description: "Brief 1-2 sentence description"
date: "2024-01-15"
featured: true  # Show on homepage
tags:
  - Robotics
  - Healthcare
  - Python
thumbnail: "/images/work/project-thumb.jpg"
hero: "/images/work/project-hero.jpg"
role: "Lead Engineer"
timeline: "6 months"
team: "2 engineers"
tools:
  - Python
  - ROS
  - TensorFlow
# Note: impact section is optional - only include if you have verifiable metrics
# impact:
#   - metric: "40%"
#     label: "Reduction in procedure time"
---
```

### Body Structure

```markdown
## Situation / Problem

Description of the problem being solved or context.

## My Role

What I specifically contributed.

## Technical Architecture / Approach

How we solved it - focus on real technical details.

### Subsections as needed
- Rendering Pipeline
- System Design
- Implementation Details

## Key Technical Achievement (optional)

Highlight a specific technical accomplishment.

## Learnings

What I learned from this project.

---

*Closing reflection on the project.*
```

**Note:** Avoid unverifiable impact metrics. Focus on technical details and real achievements instead.

### Example File

```mdx
---
title: "AutoBrachy: Brachytherapy Planning Interface"
slug: "autobrachy"
description: "Frontend development for an automated brachytherapy treatment planning system."
date: "2023-08-15"
featured: true
tags:
  - Healthcare
  - Treatment Planning
  - Frontend
  - Angular
thumbnail: "/images/work/autobrachy-thumb.jpg"
hero: "/images/work/autobrachy-hero.jpg"
role: "Frontend Engineer"
timeline: "8 months"
team: "1 algorithm engineer, 1 researcher"
tools:
  - Angular
  - Django
---

## Context

Brachytherapy treatment planning requires specialized expertise...

## My Role

As the Frontend Engineer, I was responsible for...

## Technical Implementation

### Angular Frontend
Built a responsive single-page application using Angular...

### Django Integration
Worked with the Django backend built by the algorithm team...

## Learnings

### What Worked Well
- **Angular's structure**: Strong typing and dependency injection...

---

*This project taught me the value of building software that augments expert decision-making...*
```

---

## 3D Prints Data

### Location
`content/prints/prints.json`

### Schema

```typescript
interface Print {
  slug: string;
  title: string;
  description: string;
  category: "functional" | "art" | "material";
  material: string;
  printer: string;
  date: string;  // ISO date
  images: string[];  // First is thumbnail
  settings: {
    layerHeight: string;
    infill: string;
    supports: boolean;
    printTime: string;
  };
  notes?: string;
  stlLink?: string;  // Thingiverse, Printables, etc.
  featured?: boolean;
}
```

### Example

```json
{
  "prints": [
    {
      "slug": "articulated-dragon",
      "title": "Articulated Dragon",
      "description": "Print-in-place articulated dragon with flexible joints",
      "category": "art",
      "material": "PLA (Silk Gold)",
      "printer": "Bambu Lab X1C",
      "date": "2024-01-10",
      "images": [
        "/images/prints/dragon-1.jpg",
        "/images/prints/dragon-2.jpg",
        "/images/prints/dragon-3.jpg"
      ],
      "settings": {
        "layerHeight": "0.2mm",
        "infill": "15%",
        "supports": false,
        "printTime": "4h 30m"
      },
      "notes": "Printed at 0.2mm for faster time. Works great!",
      "stlLink": "https://www.printables.com/model/12345",
      "featured": true
    }
  ]
}
```

---

## Travel States Data

### Location
`content/travel/states.json`

### Schema

```typescript
interface StateData {
  id: string;  // Two-letter state code
  name: string;
  status: "visited" | "wishlist" | "none";
  visitDate?: string;  // "Month Year" or "YYYY"
  highlights?: string[];  // Notable places/experiences
  notes?: string;
  recommendationRequest?: string;  // What they want recommendations for
}
```

### Example

```json
{
  "states": [
    {
      "id": "CA",
      "name": "California",
      "status": "visited",
      "visitDate": "2020",
      "highlights": [
        "San Francisco",
        "Yosemite",
        "Big Sur"
      ],
      "notes": "Lived here for 2 years. Miss the weather!"
    },
    {
      "id": "MT",
      "name": "Montana",
      "status": "wishlist",
      "notes": "Want to see Glacier National Park",
      "recommendationRequest": "Best time to visit Glacier? Hiking trails?"
    },
    {
      "id": "AL",
      "name": "Alabama",
      "status": "none"
    }
  ]
}
```

---

## Books Data

### Location
`content/books/reading.json`

### Schema

```typescript
interface Book {
  title: string;
  author: string;
  cover: string;  // Image path
  status: "reading" | "finished" | "want-to-read";
  progress?: number;  // Percentage for "reading"
  rating?: number;  // 1-5 for "finished"
  notes?: string;
  link?: string;  // Goodreads, Amazon, etc.
}
```

### Example

```json
{
  "currentlyReading": {
    "title": "Designing Data-Intensive Applications",
    "author": "Martin Kleppmann",
    "cover": "/images/books/ddia.jpg",
    "progress": 65,
    "notes": "Essential reading for system design"
  },
  "recentlyFinished": [
    {
      "title": "The Design of Everyday Things",
      "author": "Don Norman",
      "cover": "/images/books/doet.jpg",
      "rating": 5,
      "notes": "Changed how I think about UX"
    }
  ],
  "upNext": [
    {
      "title": "Staff Engineer",
      "author": "Will Larson",
      "cover": "/images/books/staff-eng.jpg"
    }
  ]
}
```

---

## Forum Topics

### Predefined Topics

```typescript
const FORUM_TOPICS = {
  "ai-healthcare": {
    title: "AI in Healthcare",
    description: "Discuss the intersection of artificial intelligence and medical technology",
    icon: "🏥"
  },
  "3d-printing": {
    title: "3D Printing",
    description: "Share tips, projects, and questions about 3D printing",
    icon: "🖨️"
  },
  "life-balance": {
    title: "Life Balance",
    description: "Conversations about balancing career, hobbies, and personal growth",
    icon: "⚖️"
  }
} as const;
```

---

## Image Conventions

### Paths
All images stored in `/public/images/`

```
public/images/
├── work/           # Case study images
│   ├── {slug}-thumb.jpg  # 400x300
│   └── {slug}-hero.jpg   # 1200x600
├── prints/         # 3D print photos
│   └── {slug}-{n}.jpg    # 800x800
├── travel/         # Travel photos (optional)
├── books/          # Book covers
│   └── {slug}.jpg        # 200x300
├── basketball/     # Basketball photos
└── og/             # Open Graph images
    └── {page}.png        # 1200x630
```

### Formats
- Photos: `.jpg` (compressed)
- Logos/icons: `.png` or `.svg`
- OG images: `.png`

### Sizes
- Thumbnails: 400x300
- Heroes: 1200x600
- Print images: 800x800 (square)
- Book covers: 200x300
- OG images: 1200x630
