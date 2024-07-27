import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { create } from "react-test-renderer";
import Banner from './banner';


describe('Banner', () => {
  it('renders the Banner Screen', () => {
    render(<Banner />)

    const banner = screen.getByTestId('banner');
    expect(banner).toBeInTheDocument()
  })
  it('check if the Banner Section One is rendered', () => {
    render(<Banner />)

    const banner_section_one = screen.getByTestId('banner-one');
    expect(banner_section_one).toBeInTheDocument()
  })
  it('check if the Banner Section Herotext is rendered', () => {
    render(<Banner />)

    const banner_section_herotext = screen.getByTestId('banner-herotext-one');
    expect(banner_section_herotext).toBeInTheDocument()
  })
  it('check if the Banner Section SubHerotext is rendered', () => {
    render(<Banner />)

    const banner_section_subherotext = screen.getByTestId('banner-subherotext-one');
    expect(banner_section_subherotext).toBeInTheDocument()
  })
  it('check if the Banner Section Description is rendered', () => {
    render(<Banner />)

    const banner_section_description = screen.getByTestId('banner-description');
    expect(banner_section_description).toBeInTheDocument()
  })
  // it('check if the Banner Section Two is rendered', () => {
  //   render(<Banner />)

  //   const banner_section_two = screen.getByTestId('banner-two');
  //   expect(banner_section_two).toBeInTheDocument()
  // })
  it("Verify the snapshot of Banner section is matched", () => {
    const wrap = create(<Banner />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
})