// ═══════════════════════════════════════════════
//  RPG COMPANION — Theme & Design Tokens
// ═══════════════════════════════════════════════

export const COLORS = {
  // Backgrounds
  bg:          '#0D0A1A',
  bgCard:      '#160F2E',
  bgElevated:  '#1E1540',
  bgInput:     '#12091F',

  // Borders
  border:      '#2A1F4E',
  borderGlow:  '#7B2FBE',

  // Brand
  primary:     '#9D4EDD',
  primaryDark: '#7B2FBE',
  primaryGlow: '#C77DFF',
  accent:      '#FF6B6B',
  gold:        '#FFD700',
  goldDim:     '#B8860B',

  // Text
  textPrimary:   '#F0E6FF',
  textSecondary: '#A89BC2',
  textMuted:     '#6B5C8A',
  textGold:      '#FFD700',

  // Dice Colors
  d4:   '#FF6B35',
  d6:   '#F7C59F',
  d8:   '#A8DADC',
  d10:  '#457B9D',
  d12:  '#9B5DE5',
  d20:  '#F15BB5',
  d100: '#FEE440',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  danger:  '#EF4444',
  info:    '#3B82F6',

  // Gradients
  gradientPurple: ['#0D0A1A', '#1a0a35', '#2d0a4e'],
  gradientGold:   ['#1a1000', '#3a2400', '#5a3800'],
  gradientDark:   ['#160F2E', '#0D0A1A'],
};

export const FONTS = {
  sizes: {
    xs:   11,
    sm:   13,
    md:   15,
    lg:   18,
    xl:   22,
    xxl:  28,
    hero: 36,
  },
  weights: {
    regular: '400',
    medium:  '500',
    bold:    '700',
    black:   '900',
  },
};

export const SPACING = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
  xxxl: 48,
};

export const RADIUS = {
  sm:  6,
  md:  10,
  lg:  16,
  xl:  24,
  full: 999,
};

export const SHADOWS = {
  glow: {
    shadowColor: '#9D4EDD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  goldGlow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
};
