/**
 * Safe URL validation and sanitization for external links
 */
export function sanitizeUrl(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Allow mailto: and tel:
  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return trimmed;
  }

  // Reject javascript:, data:, vbscript: protocols
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return null;
  }

  // If missing scheme, prepend https:// if it looks like a domain
  if (!/^https?:\/\//i.test(trimmed)) {
    if (trimmed.startsWith('//')) {
      return `https:${trimmed}`;
    }
    return `https://${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return trimmed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Normalizes platform name for icon matching
 */
export function normalizePlatform(platform?: string, url?: string, label?: string): string {
  if (platform) {
    return platform.toLowerCase().trim();
  }

  const combined = `${url || ''} ${label || ''}`.toLowerCase();
  if (combined.includes('github')) return 'github';
  if (combined.includes('linkedin')) return 'linkedin';
  if (combined.includes('twitter') || combined.includes('x.com')) return 'twitter';
  if (combined.includes('youtube')) return 'youtube';
  if (combined.includes('dribbble')) return 'dribbble';
  if (combined.includes('medium')) return 'medium';
  if (combined.includes('dev.to')) return 'devto';
  if (combined.includes('substack')) return 'substack';
  if (combined.includes('discord')) return 'discord';
  if (combined.includes('gitlab')) return 'gitlab';
  if (combined.includes('figma')) return 'figma';

  return 'generic';
}
