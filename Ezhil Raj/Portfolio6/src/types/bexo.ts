/**
 * BEXO Canonical Portfolio Type Definitions
 * Strict implementation of BEXO Data Contract v1
 */

export type AssetKind = 'image' | 'pdf' | 'video';

export interface PortfolioAsset {
  id: string;
  kind: AssetKind;
  url: string;
  name: string;
  sizeBytes?: number;
  alt?: string;
}

export interface PortfolioLink {
  id: string;
  label: string;
  url: string;
  platform?: string;
}

export interface PortfolioDate {
  value: string;
  precision: 'year' | 'month' | 'day';
}

export interface DateRange {
  start?: PortfolioDate;
  end?: PortfolioDate;
  ongoing: boolean;
}

export interface PortfolioProfile {
  name: string;
  handle?: string;
  headline?: string;
  avatar?: string | PortfolioAsset;
  careerGoal?: string;
  openToHire?: boolean;
}

export interface PortfolioSummary {
  text?: string;
}

export interface PortfolioAbout {
  currentStatus?: string;
}

export interface PortfolioEducationItem {
  id: string;
  institution: string;
  degree?: string;
  dates?: DateRange | string;
  grade?: string;
}

export interface PortfolioExperienceItem {
  id: string;
  company: string;
  role: string;
  dates?: DateRange | string;
  description?: string;
  responsibilities?: string[];
  location?: string;
}

export interface PortfolioProjectItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  technologies?: string[];
  role?: string;
  date?: PortfolioDate | string;
  dateLabel?: string;
  assets?: PortfolioAsset[];
  links?: PortfolioLink[];
  credits?: string;
}

export interface PortfolioCertificateItem {
  id: string;
  title: string;
  issuer?: string;
  date?: PortfolioDate | string;
  dateLabel?: string;
  credentialUrl?: string;
  assets?: PortfolioAsset[];
}

export interface PortfolioAchievementItem {
  id: string;
  title: string;
  organization?: string;
  project?: string;
  date?: PortfolioDate | string;
  dateLabel?: string;
  assets?: PortfolioAsset[];
}

export interface PortfolioResearchItem {
  id: string;
  title: string;
  authors?: string[];
  publication?: string;
  date?: PortfolioDate | string;
  dateLabel?: string;
  assets?: PortfolioAsset[];
  links?: PortfolioLink[];
}

export interface PortfolioSkillItem {
  id: string;
  name: string;
  category: string;
}

export interface PortfolioContact {
  email?: string;
  links?: PortfolioLink[];
}

export interface Portfolio {
  profile: PortfolioProfile;
  summary?: PortfolioSummary;
  about?: PortfolioAbout;
  education?: PortfolioEducationItem[];
  experience?: PortfolioExperienceItem[];
  projects?: PortfolioProjectItem[];
  certificates?: PortfolioCertificateItem[];
  achievements?: PortfolioAchievementItem[];
  research?: PortfolioResearchItem[];
  skills?: PortfolioSkillItem[];
  contact?: PortfolioContact;
  resume?: string | PortfolioAsset;
}
