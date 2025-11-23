# CategoryCard - Pink Color Theme

## 🎨 Brand Color Integration

Semua warna telah diselaraskan dengan warna brand primary website: **#E91E63 (Vibrant Pink)**

## 🌈 Color Palette

### Primary Colors
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Primary Pink | #E91E63 | rgb(233, 30, 99) | Main accent, borders, play button |
| Light Pink | #F06292 | rgb(240, 98, 146) | Secondary gradients, hover states |
| Medium Pink | #ec4899 | rgb(236, 72, 153) | Tertiary accents, corners |
| Hot Pink | #FF4081 | rgb(255, 64, 129) | Highlights, type badges |
| Soft Pink | #F48FB1 | rgb(244, 143, 177) | Subtle accents, duration badges |

### Supporting Colors
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Emerald | #10b981 | rgb(16, 185, 129) | Sub badges (CC) |
| Orange | #f59e0b | rgb(245, 158, 11) | Dub badges (Mic) |
| Red | #dc2626 | rgb(220, 38, 38) | 18+ badge |

## 🎯 Component Color Mapping

### Card Container
- **Border Gradient**: #E91E63 → #F06292 → #ec4899 → #FF4081 → #E91E63
- **Hover Glow**: rgba(233, 30, 99, 0.3)
- **Shadow**: rgba(233, 30, 99, 0.1) to rgba(233, 30, 99, 0.6)

### Play Button
- **Background**: linear-gradient(#E91E63, #F06292)
- **Outer Ring**: linear-gradient(#E91E63, #F06292, #ec4899)
- **Shadow**: rgba(233, 30, 99, 0.5)
- **Glow**: rgba(233, 30, 99, 0.8)

### Title
- **Hover Gradient**: #E91E63 → #F06292
- **Underline**: #E91E63 → #F06292
- **Text Shadow**: rgba(233, 30, 99, 0.6)

### Badges

#### Type Badge
- **Background**: rgba(233, 30, 99, 0.2) → rgba(240, 98, 146, 0.2)
- **Border**: rgba(233, 30, 99, 0.4)

#### Date Badge
- **Background**: rgba(240, 98, 146, 0.2) → rgba(236, 72, 153, 0.2)
- **Border**: rgba(240, 98, 146, 0.4)

#### Duration Badge
- **Background**: rgba(244, 143, 177, 0.2) → rgba(240, 98, 146, 0.2)
- **Border**: rgba(244, 143, 177, 0.4)

#### Sub Badge (Unchanged)
- **Background**: emerald-500 → green-500
- **Border**: emerald-300/50
- **Shadow**: emerald-500/30

#### Dub Badge (Unchanged)
- **Background**: orange-500 → amber-500
- **Border**: orange-300/50
- **Shadow**: orange-500/30

### Corner Accents
- **Top-Left**: rgba(233, 30, 99, 0.6)
- **Top-Right**: rgba(240, 98, 146, 0.6)
- **Bottom-Left**: rgba(236, 72, 153, 0.6)
- **Bottom-Right**: rgba(255, 64, 129, 0.6)

### Info Container
- **Border Top**: rgba(233, 30, 99, 0.3)
- **Shadow**: rgba(233, 30, 99, 0.1)

### Overlay
- **Hover Gradient**: rgba(233, 30, 99, 0.15) at top

## 🎬 Animation Colors

### Gradient Rotate
```css
#E91E63 → #F06292 → #ec4899 → #FF4081 → #E91E63
```

### Pulse Play
```css
rgba(233, 30, 99, 0.8) → rgba(233, 30, 99, 1.0)
```

### Badge Pulse
```css
rgba(233, 30, 99, 0.6) → rgba(233, 30, 99, 0.8)
```

### Glow Pulse
```css
rgba(233, 30, 99, 0.3) → rgba(233, 30, 99, 0.6)
```

### Neon Text
```css
rgba(233, 30, 99, 0.8)
rgba(233, 30, 99, 0.6)
rgba(233, 30, 99, 0.4)
rgba(240, 98, 146, 0.3)
```

## 📊 Color Usage Statistics

- **Primary Pink (#E91E63)**: 45% - Main theme color
- **Light Pink (#F06292)**: 25% - Secondary accents
- **Medium Pink (#ec4899)**: 15% - Tertiary accents
- **Hot Pink (#FF4081)**: 10% - Highlights
- **Soft Pink (#F48FB1)**: 5% - Subtle touches

## 🎨 Gradient Combinations

### 1. Primary Gradient
```css
linear-gradient(90deg, #E91E63, #F06292)
```

### 2. Rainbow Gradient
```css
linear-gradient(45deg, #E91E63, #F06292, #ec4899, #FF4081, #E91E63)
```

### 3. Holographic Gradient
```css
linear-gradient(90deg, #E91E63, #F06292, #ec4899, #FF4081, #F48FB1, #E91E63)
```

### 4. Overlay Gradient
```css
linear-gradient(180deg, rgba(233, 30, 99, 0.15), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.92))
```

## 🔄 Migration from Blue to Pink

| Old Color (Blue) | New Color (Pink) | Component |
|------------------|------------------|-----------|
| #3b82f6 | #E91E63 | Primary accent |
| #8b5cf6 | #F06292 | Secondary accent |
| rgb(59, 130, 246) | rgb(233, 30, 99) | All rgba values |
| rgb(139, 92, 246) | rgb(240, 98, 146) | Secondary rgba |
| blue-500 | [#E91E63] | Tailwind classes |
| purple-500 | [#F06292] | Tailwind classes |

## ✅ Consistency Checklist

- [x] Card border gradient
- [x] Play button colors
- [x] Title hover gradient
- [x] Badge backgrounds
- [x] Corner accents
- [x] Info container border
- [x] Overlay gradient
- [x] All animations
- [x] Glow effects
- [x] Shadow colors
- [x] Text shadows
- [x] Neon effects

## 🎯 Brand Alignment

Semua warna sekarang 100% selaras dengan brand color website (#E91E63) dengan variasi pink yang harmonis untuk menciptakan visual hierarchy yang jelas dan menarik.
