import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { create } from "react-test-renderer";
import Footer from './footer';


describe('Footer Section', () => {
  it('renders the Footer Screen', () => {
    render(<Footer />)

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument()
  })
  it('it check if the Logo is rendered', () => {
    render(<Footer />)

    const logo = screen.getByTestId('footer-logo');
    expect(logo).toBeInTheDocument()
  })
  it('check if the Youtube Link is rendered', () => {
    render(<Footer />)

    const youtube_link = screen.getByTestId('youtube-link');
    expect(youtube_link).toBeInTheDocument()
    userEvent.click(youtube_link)
  })
  it('check if the Instagram Link is rendered', () => {
    render(<Footer />)

    const instagram_link = screen.getByTestId('instagram-link');
    expect(instagram_link).toBeInTheDocument()
    userEvent.click(instagram_link);
  })
  it('check if the Facebook Link is rendered', () => {
    render(<Footer />)

    const facebook_link = screen.getByTestId('facebook-link');
    expect(facebook_link).toBeInTheDocument()
    userEvent.click(facebook_link);
  })
  it('check if the Linkedin Link is rendered', () => {
    render(<Footer />)
    const linkedin_link = screen.getByTestId('linkedin-link');
    expect(linkedin_link).toBeInTheDocument()
    userEvent.click(linkedin_link);
  })
  it('check if the Conditions Terms is rendered', () => {
    render(<Footer />)

    const terms_conditions = screen.getByTestId('terms-conditions');
    expect(terms_conditions).toBeInTheDocument()
    userEvent.click(terms_conditions)
  })
  it("Verify the snapshot of Footer section is matched", () => {
    const wrap = create(<Footer />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
})