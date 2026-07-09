import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, StatCard } from './Card';

function DummyIcon(props) {
  return <svg data-testid="dummy-icon" {...props} />;
}

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Hello world</Card>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies extra className passed as prop', () => {
    const { container } = render(<Card className="extra-class">content</Card>);
    expect(container.firstChild).toHaveClass('extra-class');
  });
});

describe('StatCard', () => {
  it('renders label, value and icon', () => {
    render(<StatCard label="Employés" value={128} icon={DummyIcon} />);
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('Employés')).toBeInTheDocument();
    expect(screen.getByTestId('dummy-icon')).toBeInTheDocument();
  });
});
