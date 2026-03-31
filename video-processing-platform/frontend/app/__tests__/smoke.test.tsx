import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/next\.js/i)).toBeInTheDocument();
  });
});
