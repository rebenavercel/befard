import type { Config } from 'tailwindcss';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export const screens: Record<Breakpoint, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
};

export const breakpoints: Config['theme'] = {
  screens,
};
