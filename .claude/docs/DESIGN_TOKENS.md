# Design Tokens

## Colors

### Primary Palette
```
Navy Blue (Primary): #1a365d
  - Used for: Headers, primary buttons, links
  - Tailwind: primary-900

Soft Blue: #3182ce
  - Used for: Hover states, accents
  - Tailwind: primary-600

Light Blue: #ebf8ff
  - Used for: Backgrounds, highlights
  - Tailwind: primary-50
```

### Accent Colors
```
Coral/Orange: #ed8936
  - Used for: CTAs, wishlist states, highlights
  - Tailwind: accent-500

Coral Light: #feebc8
  - Used for: Accent backgrounds
  - Tailwind: accent-100
```

### Neutral Colors
```
Charcoal: #2d3748
  - Used for: Body text
  - Tailwind: gray-800

Medium Gray: #718096
  - Used for: Secondary text, captions
  - Tailwind: gray-500

Light Gray: #e2e8f0
  - Used for: Borders, dividers
  - Tailwind: gray-300

Off-White: #f7fafc
  - Used for: Page backgrounds
  - Tailwind: gray-50

White: #ffffff
  - Used for: Cards, modals
  - Tailwind: white
```

### Semantic Colors
```
Success: #48bb78 (green-500)
Warning: #ecc94b (yellow-400)
Error: #f56565 (red-500)
Info: #4299e1 (blue-400)
```

## Typography

### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes
```
xs:   0.75rem  (12px) - Captions, labels
sm:   0.875rem (14px) - Small text
base: 1rem    (16px) - Body text
lg:   1.125rem (18px) - Large body
xl:   1.25rem  (20px) - Subheadings
2xl:  1.5rem   (24px) - Section titles
3xl:  1.875rem (30px) - Page titles
4xl:  2.25rem  (36px) - Hero text
5xl:  3rem     (48px) - Large hero
```

### Font Weights
```
normal: 400 - Body text
medium: 500 - Emphasis
semibold: 600 - Subheadings
bold: 700 - Headings
```

### Line Heights
```
tight: 1.25 - Headings
snug: 1.375 - Subheadings
normal: 1.5 - Body text
relaxed: 1.625 - Long-form content
```

## Spacing Scale

```
0:  0px
1:  0.25rem (4px)
2:  0.5rem  (8px)
3:  0.75rem (12px)
4:  1rem    (16px)
5:  1.25rem (20px)
6:  1.5rem  (24px)
8:  2rem    (32px)
10: 2.5rem  (40px)
12: 3rem    (48px)
16: 4rem    (64px)
20: 5rem    (80px)
24: 6rem    (96px)
```

## Border Radius

```
none: 0
sm:   0.125rem (2px)
base: 0.25rem  (4px)
md:   0.375rem (6px)
lg:   0.5rem   (8px)
xl:   0.75rem  (12px)
2xl:  1rem     (16px)
full: 9999px   (pill/circle)
```

## Shadows

```css
sm:   0 1px 2px rgba(0, 0, 0, 0.05)
base: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
md:   0 4px 6px rgba(0, 0, 0, 0.1)
lg:   0 10px 15px rgba(0, 0, 0, 0.1)
xl:   0 20px 25px rgba(0, 0, 0, 0.1)
```

## Breakpoints

```
sm:  640px  - Mobile landscape
md:  768px  - Tablet
lg:  1024px - Desktop
xl:  1280px - Large desktop
2xl: 1536px - Extra large
```

## Z-Index Scale

```
0:   Base content
10:  Elevated content (cards)
20:  Dropdowns
30:  Sticky elements
40:  Fixed elements (header)
50:  Modals/dialogs
60:  Toasts/notifications
70:  Tooltips
```

## Animation

### Durations
```
fast:   150ms
base:   200ms
slow:   300ms
slower: 500ms
```

### Easings
```
default: cubic-bezier(0.4, 0, 0.2, 1)
in:      cubic-bezier(0.4, 0, 1, 1)
out:     cubic-bezier(0, 0, 0.2, 1)
in-out:  cubic-bezier(0.4, 0, 0.2, 1)
```

## Component-Specific

### Buttons
```
Primary:    bg-primary-900, text-white, hover:bg-primary-700
Secondary:  bg-white, border-primary-900, text-primary-900, hover:bg-primary-50
Accent:     bg-accent-500, text-white, hover:bg-accent-600
Ghost:      bg-transparent, text-primary-900, hover:bg-primary-50
```

### Cards
```
Default:    bg-white, rounded-lg, shadow-md, p-6
Hover:      shadow-lg, translate-y-[-2px]
```

### Inputs
```
Default:    border-gray-300, rounded-md, px-4 py-2
Focus:      border-primary-500, ring-2 ring-primary-200
Error:      border-red-500, ring-2 ring-red-200
```

## Tailwind Config Integration

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ebf8ff',
          100: '#bee3f8',
          200: '#90cdf4',
          300: '#63b3ed',
          400: '#4299e1',
          500: '#3182ce',
          600: '#2b6cb0',
          700: '#2c5282',
          800: '#2a4365',
          900: '#1a365d',
        },
        accent: {
          100: '#feebc8',
          200: '#fbd38d',
          300: '#f6ad55',
          400: '#ed8936',
          500: '#dd6b20',
          600: '#c05621',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```
