import { previewProfileData } from '../data/profile-data';

/**
 * Normalizes injected window.__BEXO_PROFILE__ data or falls back to preview profile data.
 * Guarantees safe defaults for all fields and arrays.
 */
export function getNormalizedProfile() {
  const injected = (typeof window !== 'undefined' && (window.__BEXO_PROFILE__ || window.BEXO_PROFILE)) || null;

  const source = injected || previewProfileData;

  const user = {
    name: source.user?.name || previewProfileData.user.name,
    email: source.user?.email || previewProfileData.user.email,
    photoUrl: source.user?.photoUrl || previewProfileData.user.photoUrl,
    resumeUrl: source.user?.resumeUrl !== undefined ? source.user.resumeUrl : previewProfileData.user.resumeUrl,
    openToHire: source.user?.openToHire !== undefined ? Boolean(source.user.openToHire) : previewProfileData.user.openToHire,
    phone: source.user?.phone || previewProfileData.user.phone || '',
    location: source.user?.location || previewProfileData.user.location || '',
    socials: source.user?.socials || previewProfileData.user.socials || {},
  };

  const profile = {
    handle: source.profile?.handle || previewProfileData.profile.handle || 'solairaj',
    headline: source.profile?.headline || source.profile?.designation || previewProfileData.profile.headline,
    careerGoal: source.profile?.careerGoal || previewProfileData.profile.careerGoal || '',
    bio: source.profile?.bio || previewProfileData.profile.bio || '',
  };

  const projectEntries = Array.isArray(source.projectEntries)
    ? source.projectEntries
    : previewProfileData.projectEntries;

  const experienceEntries = Array.isArray(source.experienceEntries)
    ? source.experienceEntries
    : previewProfileData.experienceEntries;

  const educationEntries = Array.isArray(source.educationEntries)
    ? source.educationEntries
    : previewProfileData.educationEntries;

  const certificateEntries = Array.isArray(source.certificateEntries)
    ? source.certificateEntries
    : previewProfileData.certificateEntries;

  const achievementEntries = Array.isArray(source.achievementEntries)
    ? source.achievementEntries
    : previewProfileData.achievementEntries;

  const researchEntries = Array.isArray(source.researchEntries)
    ? source.researchEntries
    : previewProfileData.researchEntries;

  const skillEntries = Array.isArray(source.skillEntries)
    ? source.skillEntries
    : previewProfileData.skillEntries;

  return {
    user,
    profile,
    projectEntries,
    experienceEntries,
    educationEntries,
    certificateEntries,
    achievementEntries,
    researchEntries,
    skillEntries,
  };
}
