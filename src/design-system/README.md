# NeoNime Design System

## Overview
This design system provides a consistent, accessible, and modern UI foundation for the NeoNime anime streaming platform.

## Design Tokens

### Colors
Located in `tokens/colors.js`

#### Brand Colors
- **Primary:** `#FF6B6B` - Used for CTAs, highlights, and primary actions
- **Secondary:** `#4ECDC4` - Used for accents and interactive elements
- **Accent:** `#FFD93D` - Used for warnings and special highlights

#### Semantic Colors
- **Success:** `#51CF66` - Positive actions and confirmations
- **Warning:** `#FFD93D` - Cautions and alerts
- **Error:** `#FF6B6B` - Errors and destructive actions
- **Info:** `#4ECDC4` - Informational messages

#### Background Colors
- **Primary:** `#0F0F1E` - Main background
- **Secondary:** `#1A1A2E` - Secondary surfaces
- **Tertiary:** `#16213E` - Cards and elevated surfaces

#### Text Colors
- **Primary:** `#FFFFFF` - Main text
- **Secondary:** `#B8B8D1` - Secondary text
- **Tertiary:** `#6C6C8E` - Tertiary/muted text

### Typography
Located in `tokens/typography.js`

#### Font Families
- **Display:** Poppins (for hero sections and major headings)
- **Heading:** Inter (for section titles)
- **Body:** Inter (for content)
- **Mono:** JetBrains Mono (for code)

#### Font Sizes
Responsive font sizes using `clamp()` for fluid typography:
- Display: 48px - 72px
- Headings: 16px - 40px
- Body: 12px - 20px

### Spacing
Located in `tokens/spacing.js`

Based on an 8px grid system:
- Base unit: 8px
- Scale: 0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px, 160px, 192px, 224px, 256px

## Components

### Button
Versatile button component with multiple variants and sizes.

**Variants:**
- `primary` - Solid primary color
- `secondary` - Solid secondary color
- `ghost` - Transparent with hover effect
- `outline` - Outlined with transparent background
- `destructive` - For destructive actions
- `success` - For positive actions

**Sizes:**
- `sm` - Small (32px height)
- `md` - Medium (40px height)
- `lg` - Large (48px height)
- `icon` - Square icon button (40x40px)

**Usage:**
```jsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline" loading>Loading...</Button>
```

### Card
Container component for grouping related content.

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**
```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Badge
Small label component for tags, statuses, and categories.

**Variants:**
- `default` - Primary color
- `secondary` - Secondary color
- `success` - Success color
- `warning` - Warning color
- `error` - Error color
- `outline` - Outlined style

**Sizes:**
- `sm` - Small
- `md` - Medium
- `lg` - Large

**Usage:**
```jsx
import { Badge } from '@/components/ui';

<Badge variant="success">New</Badge>
<Badge variant="outline" size="sm">Tag</Badge>
```

### Toast
Notification component for user feedback.

**Variants:**
- `default` - Neutral notification
- `success` - Success message
- `error` - Error message
- `warning` - Warning message
- `info` - Informational message

**Usage:**
```jsx
import { Toast } from '@/components/ui';

<Toast 
  variant="success" 
  title="Success!" 
  description="Your action was completed."
  onClose={() => {}}
  duration={5000}
/>
```

## Accessibility

### WCAG Compliance
All components meet WCAG 2.1 AA standards:
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Keyboard navigation support
- Screen reader compatibility

### Keyboard Navigation
- **Tab:** Navigate between interactive elements
- **Enter/Space:** Activate buttons and links
- **Escape:** Close modals and dropdowns
- **Arrow keys:** Navigate within menus and lists

### ARIA Labels
All interactive elements include appropriate ARIA labels and roles:
- `aria-label` for icon-only buttons
- `aria-expanded` for expandable elements
- `aria-pressed` for toggle buttons
- `role` attributes for semantic meaning

### Focus Indicators
Visible focus indicators on all interactive elements:
- 2px ring with brand primary color
- 2px offset for better visibility
- Consistent across all components

## Best Practices

### Color Usage
1. Use brand colors sparingly for emphasis
2. Maintain sufficient contrast for readability
3. Use semantic colors for their intended purpose
4. Test colors in both light and dark modes

### Typography
1. Use display fonts for hero sections only
2. Maintain consistent line heights (1.6 for body text)
3. Use responsive font sizes with clamp()
4. Limit font weights to 3-4 per project

### Spacing
1. Use the 8px grid system consistently
2. Maintain consistent spacing between related elements
3. Use larger spacing to separate unrelated sections
4. Consider touch targets (minimum 44x44px)

### Components
1. Use semantic HTML elements
2. Include proper ARIA attributes
3. Test keyboard navigation
4. Ensure mobile responsiveness
5. Optimize for performance

## Contributing

When adding new components or tokens:
1. Follow existing naming conventions
2. Document all props and variants
3. Include usage examples
4. Test for accessibility
5. Update this README

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

