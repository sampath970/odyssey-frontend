import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideBar from "./client-side-bar";

describe("Side Bar", () => {
  it("renders the side bar ", () => {
    render(<SideBar />);

    const side_bar = screen.getByTestId("side-bar");
    expect(side_bar).toBeInTheDocument();
  });
  it("checks the side bar items is rendered", () => {
    render(<SideBar />);

    const side_bar_items = screen.getByTestId("side-bar-items");
    expect(side_bar_items).toBeInTheDocument();
  });
  it("checks the side bar properties is rendered", () => {
    render(<SideBar />);

    const side_bar_properties = screen.getByTestId("side-bar-properties");
    expect(side_bar_properties).toBeInTheDocument();
  });
  it("checks the side bar tenants is rendered", () => {
    render(<SideBar />);

    const side_bar_tenants = screen.getByTestId("side-bar-tenants");
    expect(side_bar_tenants).toBeInTheDocument();
  });
});
