// Cuts `value` to at most `maxLength` characters without splitting a word or
// sentence mid-way, and marks the cut with an ellipsis. Plain string manipulation
// only (no DOM APIs), so it can run in both the browser and the Node build script.
export const truncateAtWordBoundary = (value = '', maxLength = 160) => {
  const text = String(value || '').trim();
  if (text.length <= maxLength) return text;

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(' ');
  const safe = lastSpace > maxLength * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  return `${safe.trimEnd().replace(/[.,;:!?-]+$/, '')}…`;
};

// Google truncates <title> around ~60 characters. Appending " | Site Name" to an
// already-long article title guarantees a mid-word cut in search results, so this
// only adds the suffix when the combined title still fits.
export const buildPageTitle = (title, siteName, maxLength = 60) => {
  const base = String(title || '').trim();
  if (!base) return siteName;
  const withSuffix = `${base} | ${siteName}`;
  return withSuffix.length <= maxLength ? withSuffix : base;
};
