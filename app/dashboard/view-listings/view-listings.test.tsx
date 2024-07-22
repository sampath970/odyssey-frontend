import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import ViewListing from "./page";
describe("View Listing Component", () => {
  it("renders the View Listing Component ", () => {
    render(<ViewListing />);
  });

  it("Verify the snapshot of the View Listing Component is matched", () => {
    const wrap = create(<ViewListing />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});