/**
 * Safe URL validation and sanitization for external and relative links
 */
export function sanitizeUrl(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Reject dangerous protocols
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:')
  ) {
    return null;
  }

  // Allow mailto: and tel:
  if (lower.startsWith('mailto:') || lower.startsWith('tel:')) {
    return trimmed;
  }

  // Allow relative URLs, root paths, and anchor jumps (do NOT prepend https://)
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../')
  ) {
    return trimmed;
  }

  // Protocol-relative URL
  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  // Absolute HTTP/HTTPS URLs
  if (/^https?:\/\//i.test(trimmed)) {
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

  // If missing scheme but domain-like (e.g. github.com/user)
  return `https://${trimmed}`;
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
