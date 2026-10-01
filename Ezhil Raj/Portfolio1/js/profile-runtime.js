/**
 * BEXO Standard Profile Runtime
 * Handles:
 * - window.__BEXO_PROFILE__ retrieval and normalization
 * - Fallback to preview profile-data
 * - XSS-safe HTML escaping
 * - Asset path resolution across root and subpages
 * - Safe array collection access
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
      name: user.name || 'Ezhil Arasan',
      firstName: user.firstName || 'Ezhil',
      lastName: user.lastName || 'Arasan',
      email: user.email || '',
      phone: user.phone || '',
      photoUrl: user.photoUrl || '',
      resumeUrl: user.resumeUrl || '',
      openToHire: Boolean(user.openToHire),
      location: user.location || '',
      socials: Array.isArray(user.socials) ? user.socials : []
    },
    profile: {
      handle: profile.handle || 'ezhilarasan',
      headline: profile.headline || 'Writer, Content Strategist & Consultant',
      careerGoal: profile.careerGoal || '',
      bio: profile.bio || profile.headline || '',
      tagline: profile.tagline || profile.headline || '',
      overviewQuote: profile.overviewQuote || '',
      heroStats: Array.isArray(profile.heroStats) ? profile.heroStats : []
    },
    projectEntries: Array.isArray(raw.projectEntries) ? raw.projectEntries : [],
    experienceEntries: Array.isArray(raw.experienceEntries) ? raw.experienceEntries : [],
    educationEntries: Array.isArray(raw.educationEntries) ? raw.educationEntries : [],
    certificateEntries: Array.isArray(raw.certificateEntries) ? raw.certificateEntries : [],
    achievementEntries: Array.isArray(raw.achievementEntries) ? raw.achievementEntries : [],
    researchEntries: Array.isArray(raw.researchEntries) ? raw.researchEntries : [],
    skillEntries: Array.isArray(raw.skillEntries) ? raw.skillEntries : [],
    testimonials: Array.isArray(raw.testimonials) ? raw.testimonials : [],
    services: Array.isArray(raw.services) ? raw.services : [],
    manifesto: raw.manifesto || null
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
  // Strip leading slash if present for relative resolution
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
