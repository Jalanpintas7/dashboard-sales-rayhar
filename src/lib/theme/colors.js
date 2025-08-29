// Theme Color Palette
export const themeColors = {
  // Primary Colors
  primary: '#942392',      // Vibrant medium purple
  secondary: '#93C5FD',    // Light pastel blue
  tertiary: '#FCA5A5',     // Soft muted coral/light salmon pink
  quaternary: '#FEF3C7',   // Pale creamy yellow
  
  // Semantic Colors
  success: '#0F766E',      // Deep teal/dark cyan
  danger: '#DC2626',       // Bright vivid red
  warning: '#EA580C',      // Warm golden orange
  info: '#0EA5E9',         // Bright clear sky blue
  
  // Neutral Colors
  body: '#374151',         // Dark desaturated purplish-grey/charcoal
  dark: '#111827',         // Very dark grey, almost black
  sec: '#6B7280',          // Medium grey
  grey3: '#9CA3AF',        // Slightly lighter medium grey
  grey2: '#D1D5DB',        // Light grey
  section: '#f9fafb'       // Very light grey, almost white
};

// Tailwind CSS Custom Colors
export const tailwindColors = {
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',  // Primary color
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95'
  },
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',  // Secondary color
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A'
  },
  tertiary: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',  // Tertiary color
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D'
  },
  quaternary: {
    50: '#FFFBEB',
    100: '#FEF3C7',  // Quaternary color
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F'
  }
};

// CSS Custom Properties untuk penggunaan global
export const cssCustomProperties = `
  :root {
    --color-primary: ${themeColors.primary};
    --color-secondary: ${themeColors.secondary};
    --color-tertiary: ${themeColors.tertiary};
    --color-quaternary: ${themeColors.quaternary};
    --color-success: ${themeColors.success};
    --color-danger: ${themeColors.danger};
    --color-warning: ${themeColors.warning};
    --color-info: ${themeColors.info};
    --color-body: ${themeColors.body};
    --color-dark: ${themeColors.dark};
    --color-sec: ${themeColors.sec};
    --color-grey3: ${themeColors.grey3};
    --color-grey2: ${themeColors.grey2};
    --color-section: ${themeColors.section};
  }
`;

export default themeColors;
