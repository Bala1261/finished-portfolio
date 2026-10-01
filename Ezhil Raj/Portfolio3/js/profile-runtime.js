/**
 * BEXO Standard Profile Runtime — Design & Creative
 * Handles:
 * - window.__BEXO_PROFILE__ retrieval and normalization
 * - Fallback to preview profile-data (defaultProfile)
 * - Safe HTML escaping via escapeHtml()
 * - Relative asset path resolution across root (index.html) and subpages (/pages/)
 * - Safe route resolution (Home, Portfolio, Contact, Hire Me)
 */

import { defaultProfile } from './profile-data.js';

export function getProfile() {
  const raw = (typeof window !== 'undefined' && window.__BEXO_PROFILE__)
    ? window.__BEXO_PROFILE__
    : (typeof window !== 'undefined' && window.defaultProfile ? window.defaultProfile : defaultProfile);

  return normalizeProfile(raw || {});
}

export function normalizeProfile(raw) {
  const user = raw.user || {};
  const profile = raw.profile || {};

  return {
    user: {
      name: user.name || 'Alex Mercer',
      firstName: user.firstName || 'Alex',
      lastName: user.lastName || 'Mercer',
      initials: user.initials || 'AM',
      email: user.email || 'hello@alexmercer.design',
      phone: user.phone || '+1 (555) 234-8901',
      photoUrl: user.photoUrl || 'assets/portrait.png',
      resumeUrl: user.resumeUrl || 'assets/Alex_Mercer_Creative_Resume.pdf',
      openToHire: Boolean(user.openToHire !== undefined ? user.openToHire : true),
      location: user.location || 'New York, NY',
      socials: Array.isArray(user.socials) ? user.socials : [
        { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
        { label: 'Dribbble', href: 'https://dribbble.com', icon: 'dribbble' },
        { label: 'Behance', href: 'https://behance.net', icon: 'behance' },
        { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      ],
    },
    profile: {
      handle: profile.handle || 'alexmercer',
      headline: profile.headline || 'Creative Director & Designer',
      careerGoal: profile.careerGoal || 'Crafting immersive visual identities and digital experiences that inspire and scale.',
      bio: profile.bio || profile.headline || 'I shape visual identities and digital product experiences at the intersection of motion, typography, and interactive technology.',
      tagline: profile.tagline || profile.headline || 'Art Director & Interactive Designer',
      overviewQuote: profile.overviewQuote || 'Good design is invisible. Great design is unforgettable.',
      heroStats: Array.isArray(profile.heroStats) ? profile.heroStats : [
        { value: '10+', label: 'Years Experience', desc: 'Brand & digital systems' },
        { value: '45+', label: 'Delivered Projects', desc: 'From branding to WebGL' },
        { value: '14', label: 'Design Awards', desc: 'D&AD, Awwwards, AIGA' },
      ],
    },
    projectEntries: Array.isArray(raw.projectEntries) ? raw.projectEntries : [],
    experienceEntries: Array.isArray(raw.experienceEntries) ? raw.experienceEntries : [],
    educationEntries: Array.isArray(raw.educationEntries) ? raw.educationEntries : [],
    certificateEntries: Array.isArray(raw.certificateEntries) ? raw.certificateEntries : [],
    achievementEntries: Array.isArray(raw.achievementEntries) ? raw.achievementEntries : [],
    researchEntries: Array.isArray(raw.researchEntries) ? raw.researchEntries : [],
    skillEntries: Array.isArray(raw.skillEntries) ? raw.skillEntries : [],
    services: Array.isArray(raw.services) ? raw.services : [],
    awards: Array.isArray(raw.awards) ? raw.awards : [],
    clients: Array.isArray(raw.clients) ? raw.clients : [],
  };
}

/**
 * Escapes unsafe characters for HTML injection
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Determines relative base path depending on whether the current page is in /pages/ or root
 */
export function getBasePath() {
  if (typeof window === 'undefined') return './';
  const path = window.location.pathname.toLowerCase();
  return path.includes('/pages/') ? '../' : './';
}

/**
 * Resolves asset paths safely relative to the current page
 */
export function resolveAsset(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = getBasePath();
  const clean = path.replace(/^\/+/, '');
  return `${base}${clean}`;
}

/**
 * Resolves route paths (home, portfolio, contact, hire-me)
 */
export function resolveRoute(route) {
  const base = getBasePath();
  const isInsidePages = base === '../';

  switch (route) {
    case 'home':
      return isInsidePages ? '../index.html' : 'index.html';
    case 'portfolio':
      return isInsidePages ? 'portfolio.html' : 'pages/portfolio.html';
    case 'contact':
      return isInsidePages ? 'contact.html' : 'pages/contact.html';
    case 'hire-me':
      return isInsidePages ? 'hire-me.html' : 'pages/hire-me.html';
    default:
      return base;
  }
}
