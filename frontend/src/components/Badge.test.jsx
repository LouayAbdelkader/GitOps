import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, Tag } from './Badge';

describe('Avatar', () => {
  it('renders the initials of the given name', () => {
    render(<Avatar name="Jean Dupont" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies the requested size to width and height', () => {
    render(<Avatar name="Test" size={50} />);
    const el = screen.getByText('TE');
    expect(el).toHaveStyle({ width: '50px', height: '50px' });
  });
});

describe('Tag', () => {
  it('renders the provided label', () => {
    render(<Tag label="Finance" />);
    expect(screen.getByText('Finance')).toBeInTheDocument();
  });
});
