import { describe, it, expect } from 'vitest';
import { tagColor, initials } from './tagColor';

describe('tagColor', () => {
  it('returns the same color for the same name (deterministic)', () => {
    expect(tagColor('Ressources Humaines')).toEqual(tagColor('Ressources Humaines'));
  });

  it('returns an object with bg and fg keys', () => {
    const c = tagColor('IT');
    expect(c).toHaveProperty('bg');
    expect(c).toHaveProperty('fg');
  });

  it('falls back to a default palette entry when name is empty', () => {
    const c = tagColor();
    expect(c).toHaveProperty('bg');
    expect(c).toHaveProperty('fg');
  });

  it('can return different colors for different names', () => {
    const colors = new Set(
      ['Finance', 'Marketing', 'Ventes', 'Support'].map((n) => tagColor(n).bg)
    );
    // not guaranteed all different, but the palette should be used, i.e. more than 1 bucket
    expect(colors.size).toBeGreaterThan(1);
  });
});

describe('initials', () => {
  it('returns first two letters uppercase for a single-word name', () => {
    expect(initials('Marketing')).toBe('MA');
  });

  it('returns first letter of first and last word for multi-word names', () => {
    expect(initials('Jean Dupont')).toBe('JD');
  });

  it('handles extra whitespace between words', () => {
    expect(initials('  Jean   Dupont  ')).toBe('JD');
  });

  it('returns an empty string when name is empty', () => {
    expect(initials()).toBe('');
  });
});
