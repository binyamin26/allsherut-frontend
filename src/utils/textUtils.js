// Plain-JS (no JSX) text helpers — dependency-free so the build-time prerender
// script can import this too (see scripts/prerender-static-pages.mjs), same reason
// seoJsonLd.js is kept separate from any component.

// Extracts a short, clean lead-in from a longer sentence: cuts at the first
// natural break (". ", "? ", " - ") instead of a blind character/line clamp, so the
// result always ends on real punctuation rather than mid-phrase with an ellipsis.
// Falls back to the full text when no early break is found.
export function getFirstSentence(text) {
  if (!text) return '';
  const breakRe = /[.?] |\s-\s/;
  const match = breakRe.exec(text);
  if (!match) return text;
  const cut = match[0].trim();
  const endsWithPunctuation = cut === '.' || cut === '?';
  const result = text.slice(0, match.index + (endsWithPunctuation ? 1 : 0));
  return result.trim();
}
