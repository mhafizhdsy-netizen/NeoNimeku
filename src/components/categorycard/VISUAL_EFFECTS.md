# CategoryCard Visual Effects Reference

## 🎬 Hover State Transformations

### Card Container
```
Normal State:
- Position: translateY(0)
- Scale: 1
- Shadow: Subtle black shadow
- Border: 1px white/5%

Hover State:
- Position: translateY(-12px)
- Scale: 1.03
- Rotation: rotateX(2deg)
- Shadow: Multi-layer with blue glow
- Border: 2px white/15% + animated rainbow gradient
- Z-index: 10 (brings to front)
```

### Image
```
Normal State:
- Scale: 1
- Brightness: 0.88
- Contrast: 1.08
- Saturation: 0.95
- Rotation: 0deg

Hover State:
- Scale: 1.15
- Brightness: 1.15
- Contrast: 1.15
- Saturation: 1.2
- Rotation: 1deg
- Transition: 0.8s cubic-bezier
```

### Play Button
```
Normal State:
- Opacity: 0
- Scale: 0.5
- Rotation: -180deg
- Position: Center (hidden)

Hover State:
- Opacity: 1
- Scale: 1.2
- Rotation: 0deg
- Glow: Multi-layer blue/purple
- Animation: Continuous pulse (1.2 to 1.3)
- Outer Ring: Animated pulse glow
```

### Badges
```
Sub Badge (Emerald):
- Background: Gradient emerald-500 to green-500
- Border: emerald-300/50
- Shadow: emerald-500/30 glow
- Height: 28px (7 * 4)
- Hover: Scale 1.05

Dub Badge (Orange):
- Background: Gradient orange-500 to amber-500
- Border: orange-300/50
- Shadow: orange-500/30 glow
- Height: 28px
- Hover: Scale 1.05

Type Badge (Pink):
- Background: Gradient #E91E63/20 to #F06292/20
- Border: #E91E63/40
- Backdrop Blur: 16px
- Hover: Scale 1.05

Date Badge (Pink Gradient):
- Background: Gradient #F06292/20 to #ec4899/20
- Border: #F06292/40
- Backdrop Blur: 16px
- Hover: Scale 1.05

Duration Badge (Soft Pink):
- Background: Gradient #F48FB1/20 to #F06292/20
- Border: #F48FB1/40
- Backdrop Blur: 16px
- Hover: Scale 1.05
```

### Title
```
Normal State:
- Color: white/88%
- Text Shadow: Black/50%
- Underline: 0% width

Hover State:
- Color: Gradient blue-400 to purple-500
- Text Shadow: Blue glow
- Underline: 100% width (gradient)
- Transform: translateX(4px)
```

## 🌟 Animation Timings

| Element | Duration | Easing | Delay |
|---------|----------|--------|-------|
| Card Transform | 0.6s | cubic-bezier(0.34, 1.56, 0.64, 1) | 0s |
| Image Scale | 0.8s | cubic-bezier(0.34, 1.56, 0.64, 1) | 0s |
| Play Button | 0.6s | cubic-bezier(0.34, 1.56, 0.64, 1) | 0s |
| Badges Appear | 0.6s | ease | 0.15s |
| Title Effect | 0.5s | cubic-bezier(0.34, 1.56, 0.64, 1) | 0s |
| Border Gradient | 3s | linear | infinite |
| Play Pulse | 2s | ease-in-out | infinite |
| Float Animation | 3s | ease-in-out | infinite |

## 🎨 Color System

### Primary Colors (Pink Theme)
- **Primary Pink**: #E91E63 - Main accent, play button, borders
- **Light Pink**: #F06292 - Secondary accent, gradients
- **Medium Pink**: #ec4899 - Tertiary accent, corners
- **Hot Pink**: #FF4081 - Highlight accent, type badges
- **Soft Pink**: #F48FB1 - Subtle accent, duration badges
- **Emerald**: #10b981 - Success color, sub badges
- **Orange**: #f59e0b - Warm accent, dub badges

### Opacity Levels
- **Subtle**: 0.05-0.15 (backgrounds, borders)
- **Medium**: 0.2-0.4 (overlays, shadows)
- **Strong**: 0.5-0.8 (glows, effects)
- **Full**: 0.9-1.0 (text, icons)

## 💫 Special Effects

### Rainbow Border (Pink Gradient)
- 5 pink shades rotating (#E91E63, #F06292, #ec4899, #FF4081, #F48FB1)
- 300% background size
- 3s animation loop
- 8px blur for soft glow
- Opacity 0 to 0.8 on hover

### Shine Sweep
- Diagonal gradient (45deg)
- White/10% at center
- Transparent at edges
- Moves from -100% to 100%
- 0.8s duration

### Corner Accents
- Top-left: Primary Pink (#E91E63)
- Top-right: Light Pink (#F06292)
- Bottom-left: Medium Pink (#ec4899)
- Bottom-right: Hot Pink (#FF4081)
- 8x8 size, 2px border
- Fade in on hover

### Glow Layers
1. **Inner Glow**: Inset shadow, white/20%
2. **Card Shadow**: 0 20px 60px black/60%
3. **Border Glow**: 0 0 40px pink/30% (#E91E63)
4. **Outer Glow**: 0 0 100px light pink/30% (#F06292)

## 📱 Responsive Breakpoints

### Desktop (>1400px)
- Full effects enabled
- Border radius: 16px
- All animations active
- Float animation enabled

### Tablet (758-1400px)
- Reduced effects
- Border radius: 14px
- Simplified animations
- No float animation

### Mobile (478-758px)
- Minimal effects
- Border radius: 12px
- Essential animations only
- Reduced hover lift (3px)

### Small Mobile (<478px)
- Touch-optimized
- Border radius: 10px
- No complex animations
- Minimal hover (2px)
- Gradient borders disabled

## 🚀 Performance Tips

1. **GPU Acceleration**: transform, opacity properties
2. **Will-change**: Applied on hover only
3. **Backdrop-filter**: Limited to 16px max
4. **Animation**: Paused when not in viewport
5. **Reduced Motion**: All animations disabled if preferred
6. **Image Loading**: Lazy loading enabled
7. **Z-index**: Minimal usage, only on hover

## 🎯 Visual Hierarchy

1. **Primary Focus**: Play button (largest, brightest)
2. **Secondary**: Title (gradient, animated)
3. **Tertiary**: Badges (colorful, informative)
4. **Background**: Image (enhanced but not overwhelming)
5. **Accents**: Borders, corners (subtle enhancement)
