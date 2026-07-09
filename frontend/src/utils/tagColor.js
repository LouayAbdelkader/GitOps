// Deterministically assigns one of the palette's accent tones to a name,
// so the same department or role always renders with the same tag color.
const PALETTE = [
  { bg: 'var(--color-teal-soft)', fg: 'var(--color-teal)' },
  { bg: 'var(--color-amber-soft)', fg: '#8A6104' },
  { bg: 'var(--color-indigo-soft)', fg: 'var(--color-indigo)' },
  { bg: 'var(--color-rose-soft)', fg: 'var(--color-rose)' },
];

export function tagColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

export function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
