/**
 * Design System - Typography Tokens
 * Font families, sizes, weights, and line heights
 */

export const typography = {
  // Font Families
  fontFamily: {
    display: '"Poppins", "Inter", system-ui, sans-serif',
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Courier New", monospace',
  },

  // Font Sizes (Mobile-first, responsive)
  fontSize: {
    // Display sizes
    display: {
      xl: 'clamp(3rem, 5vw, 4.5rem)',      // 48px - 72px
      lg: 'clamp(2.5rem, 4vw, 3.5rem)',    // 40px - 56px
      md: 'clamp(2rem, 3vw, 2.75rem)',     // 32px - 44px
    },
    // Heading sizes
    heading: {
      h1: 'clamp(2rem, 3vw, 2.5rem)',      // 32px - 40px
      h2: 'clamp(1.75rem, 2.5vw, 2rem)',   // 28px - 32px
      h3: 'clamp(1.5rem, 2vw, 1.75rem)',   // 24px - 28px
      h4: 'clamp(1.25rem, 1.5vw, 1.5rem)', // 20px - 24px
      h5: 'clamp(1.125rem, 1.25vw, 1.25rem)', // 18px - 20px
      h6: 'clamp(1rem, 1vw, 1.125rem)',    // 16px - 18px
    },
    // Body sizes
    body: {
      xl: '1.25rem',   // 20px
      lg: '1.125rem',  // 18px
      md: '1rem',      // 16px
      sm: '0.875rem',  // 14px
      xs: '0.75rem',   // 12px
    },
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.6,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export default typography;
