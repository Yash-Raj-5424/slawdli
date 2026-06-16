export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const REPORTS_STORAGE_KEY = 'slawdli_reports';
export const AUTH_TOKEN_KEY = 'slawdli_token';

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/reports', label: 'Reports' },
  { to: '/about', label: 'About' },
  { to: '/profile', label: 'Profile' },
];
