import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './page';


describe('About Page', () => {
  it('renders the About Screen', () => {
    render(<About />)

    const heading = screen.getByTestId('heading');
    expect(heading).toBeInTheDocument()
  })
})