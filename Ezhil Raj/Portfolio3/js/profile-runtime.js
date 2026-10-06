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
  const isInjected = typeof window !== 'undefined' && Boolean(window.__BEXO_PROFILE__);
  const raw = isInjected
    ? window.__BEXO_PROFILE__
    : (typeof window !== 'undefined' && window.defaultProfile ? window.defaultProfile : defaultProfile);

  return normalizeProfile(raw || {}, isInjected);
}

export function normalizeProfile(raw, isInjected = false) {
  const isDemo = !isInjected && (raw === defaultProfile || !raw.user);
  const user = raw.user || {};
  const profile = raw.profile || {};

  // Compute initials and names safely
  const name = user.name !== undefined ? user.name : (isDemo ? 'Alex Mercer' : '');
  const nameParts = (name || '').trim().split(/\s+/).filter(Boolean);
  const firstName = user.firstName || nameParts[0] || (isDemo ? 'Alex' : '');
  const lastName = user.lastName || nameParts.slice(1).join(' ') || (isDemo ? 'Mercer' : '');
  const initials = user.initials || (nameParts.length > 0 ? nameParts.map((p) => p[0]).join('').substring(0, 2).toUpperCase() : (isDemo ? 'AM' : '✦'));

  return {
    user: {
      name,
      firstName,
      lastName,
      initials,
      email: user.email !== undefined ? user.email : (isDemo ? 'hello@alexmercer.design' : ''),
      phone: user.phone !== undefined ? user.phone : (isDemo ? '+1 (555) 234-8901' : ''),
      photoUrl: user.photoUrl !== undefined ? user.photoUrl : (isDemo ? 'assets/portrait.png' : ''),
      resumeUrl: user.resumeUrl !== undefined ? user.resumeUrl : (isDemo ? 'assets/Alex_Mercer_Creative_Resume.pdf' : ''),
      openToHire: Boolean(user.openToHire !== undefined ? user.openToHire : (isDemo ? true : false)),
      location: user.location !== undefined ? user.location : (isDemo ? 'New York, NY' : ''),
      socials: Array.isArray(user.socials) ? user.socials : (isDemo ? [
        { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
        { label: 'Dribbble', href: 'https://dribbble.com', icon: 'dribbble' },
        { label: 'Behance', href: 'https://behance.net', icon: 'behance' },
        { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      ] : []),
    },
    profile: {
      handle: profile.handle !== undefined ? profile.handle : (isDemo ? 'alexmercer' : (name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'profile')),
      headline: profile.headline !== undefined ? profile.headline : (isDemo ? 'Creative Director & Designer' : ''),
      careerGoal: profile.careerGoal !== undefined ? profile.careerGoal : (isDemo ? 'Crafting immersive visual identities and digital experiences that inspire and scale.' : ''),
      bio: profile.bio !== undefined ? profile.bio : (profile.headline || (isDemo ? 'I shape visual identities and digital product experiences at the intersection of motion, typography, and interactive technology.' : '')),
      tagline: profile.tagline !== undefined ? profile.tagline : (profile.headline || (isDemo ? 'Art Director & Interactive Designer' : '')),
      overviewQuote: profile.overviewQuote !== undefined ? profile.overviewQuote : (isDemo ? 'Good design is invisible. Great design is unforgettable.' : ''),
      heroStats: Array.isArray(profile.heroStats) ? profile.heroStats : (isDemo ? [
        { value: '10+', label: 'Years Experience', desc: 'Brand & digital systems' },
        { value: '45+', label: 'Delivered Projects', desc: 'From branding to WebGL' },
        { value: '14', label: 'Design Awards', desc: 'D&AD, Awwwards, AIGA' },
      ] : []),
    },
    projectEntries: Array.isArray(raw.projectEntries) ? raw.projectEntries : (isDemo ? (defaultProfile.projectEntries || []) : []),
    experienceEntries: Array.isArray(raw.experienceEntries) ? raw.experienceEntries : (isDemo ? (defaultProfile.experienceEntries || []) : []),
    educationEntries: Array.isArray(raw.educationEntries) ? raw.educationEntries : (isDemo ? (defaultProfile.educationEntries || []) : []),
    certificateEntries: Array.isArray(raw.certificateEntries) ? raw.certificateEntries : (isDemo ? (defaultProfile.certificateEntries || []) : []),
    achievementEntries: Array.isArray(raw.achievementEntries) ? raw.achievementEntries : (isDemo ? (defaultProfile.achievementEntries || []) : []),
    researchEntries: Array.isArray(raw.researchEntries) ? raw.researchEntries : (isDemo ? (defaultProfile.researchEntries || []) : []),
    skillEntries: Array.isArray(raw.skillEntries) ? raw.skillEntries : (isDemo ? (defaultProfile.skillEntries || []) : []),
    services: Array.isArray(raw.services) ? raw.services : (isDemo ? (defaultProfile.services || []) : []),
    awards: Array.isArray(raw.awards) ? raw.awards : (isDemo ? (defaultProfile.awards || []) : []),
    clients: Array.isArray(raw.clients) ? raw.clients : (isDemo ? (defaultProfile.clients || []) : []),
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
