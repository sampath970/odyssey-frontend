import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideBar from "./side-bar";
import { create } from "react-test-renderer";


describe("Side Bar", () => {
  it("Verify the snapshot of the SideBar section is matched", () => {
    const wrap = create(<SideBar />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
  it("highlights the active item correctly", () => {
    const { getByTestId } = render(<SideBar activeIndex={0} />);
    const activeItem = getByTestId("side-bar-items").querySelector(".side-bar-item-active");
    expect(activeItem).not.toBeNull();
  });
  it('Checks the active state of the element', () => {
    const { getByTestId } = render(<SideBar activeIndex={0} />);
    const sideBarItems = getByTestId('side-bar-items');
    expect(sideBarItems.children[0]).toHaveClass('side-bar-item-active');
    expect(sideBarItems.children[1]).not.toHaveClass('side-bar-item-active');
    expect(sideBarItems.children[2]).not.toHaveClass('side-bar-item-active');
    // expect(sideBarItems.children[3]).not.toHaveClass('side-bar-item-active');
    // expect(sideBarItems.children[4]).not.toHaveClass('side-bar-item-active');
  });
});

