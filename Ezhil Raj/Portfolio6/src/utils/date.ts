import { PortfolioDate, DateRange } from '../types/bexo';

export function formatPortfolioDate(date?: PortfolioDate | string): string {
  if (!date) return '';
  if (typeof date === 'string') return date;

  if (!date.value) return '';

  try {
    const parsed = new Date(date.value);
    if (isNaN(parsed.getTime())) {
      return date.value;
    }

    if (date.precision === 'year') {
      return parsed.getFullYear().toString();
    }

    if (date.precision === 'month') {
      return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return date.value;
  }
}

export function formatDateRange(dates?: DateRange | string): { label: string; isOngoing: boolean } {
  if (!dates) return { label: '', isOngoing: false };
  if (typeof dates === 'string') {
    const isOngoing = dates.toLowerCase().includes('present') || dates.toLowerCase().includes('ongoing');
    return { label: dates, isOngoing };
  }

  const startFormatted = formatPortfolioDate(dates.start);
  const isOngoing = Boolean(dates.ongoing);

  if (isOngoing) {
    return {
      label: startFormatted ? `${startFormatted} — Present` : 'Present',
      isOngoing: true,
    };
  }

  const endFormatted = formatPortfolioDate(dates.end);

  if (startFormatted && endFormatted) {
    return { label: `${startFormatted} — ${endFormatted}`, isOngoing: false };
  }

  if (startFormatted) {
    return { label: startFormatted, isOngoing: false };
  }

  if (endFormatted) {
    return { label: endFormatted, isOngoing: false };
  }

  return { label: '', isOngoing: false };
}
