/**
 * Design System - Color Tokens
 * HIGH CONTRAST SCHEMA - Maximum readability
 * Centralized color definitions for the NeoNime application
 * Supports both dark and light themes
 */

export const colors = {
  // Brand Colors (Theme-independent) - VIBRANT & CLEAR
  brand: {
    primary: '#E91E63',      // Vibrant Pink
    primaryHover: '#C2185B',
    primaryActive: '#AD1457',
    secondary: '#00BCD4',    // Cyan
    secondaryHover: '#0097A7',
    secondaryActive: '#00838F',
    accent: '#FFC107',       // Amber
    accentHover: '#FFB300',
    accentActive: '#FFA000',
    tertiary: '#9C27B0',     // Purple
    tertiaryHover: '#7B1FA2',
  },

  // Semantic Colors (Theme-independent)
  semantic: {
    success: '#4CAF50',
    successLight: '#66BB6A',
    successDark: '#388E3C',
    warning: '#FF9800',
    warningLight: '#FFB74D',
    warningDark: '#F57C00',
    error: '#F44336',
    errorLight: '#EF5350',
    errorDark: '#D32F2F',
    info: '#2196F3',
    infoLight: '#42A5F5',
    infoDark: '#1976D2',
  },

  // Dark Theme Colors - HIGH CONTRAST
  dark: {
    background: {
      primary: '#121212',      // Pure dark
      secondary: '#1A1A1A',
      tertiary: '#242424',
      elevated: '#2E2E2E',
    },
    text: {
      primary: '#FAFAFA',      // Almost white
      secondary: '#E0E0E0',    // Light gray
      tertiary: '#B0B0B0',     // Medium gray
      disabled: '#808080',     // Dark gray
    },
    border: {
      default: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.24)',
      focus: 'rgba(233, 30, 99, 0.5)',
    },
    overlay: {
      light: 'rgba(18, 18, 18, 0.5)',
      medium: 'rgba(18, 18, 18, 0.7)',
      heavy: 'rgba(18, 18, 18, 0.9)',
    },
  },

  // Light Theme Colors - HIGH CONTRAST
  light: {
    background: {
      primary: '#FFFFFF',      // Pure white
      secondary: '#F5F5F5',    // Very light gray
      tertiary: '#EEEEEE',     // Light gray
      elevated: '#FFFFFF',     // Pure white
    },
    text: {
      primary: '#171717',      // Almost black
      secondary: '#404040',    // Dark gray
      tertiary: '#737373',     // Medium gray
      disabled: '#A3A3A3',     // Light gray
    },
    border: {
      default: 'rgba(0, 0, 0, 0.12)',
      hover: 'rgba(0, 0, 0, 0.24)',
      focus: 'rgba(233, 30, 99, 0.5)',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.5)',
      medium: 'rgba(255, 255, 255, 0.7)',
      heavy: 'rgba(255, 255, 255, 0.9)',
    },
  },

  // Gradient Definitions - HIGH CONTRAST
  gradients: {
    primary: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
    secondary: 'linear-gradient(135deg, #00BCD4 0%, #2196F3 100%)',
    accent: 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)',
    darkBackground: 'linear-gradient(135deg, #121212 0%, #1A1A1A 100%)',
    lightBackground: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
    darkCard: 'linear-gradient(135deg, rgba(36, 36, 36, 0.8) 0%, rgba(46, 46, 46, 0.8) 100%)',
    lightCard: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.9) 100%)',
    glow: 'linear-gradient(135deg, #E91E63 0%, #00BCD4 50%, #9C27B0 100%)',
  },
};

export default colors;
