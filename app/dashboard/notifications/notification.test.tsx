import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import Notifications from './page';
describe("Notifications Component", () => {
  it("renders the Notifications Component ", () => {
    render(<Notifications />);
  });

  it("Verify the snapshot of the Notifications Component", () => {
    const wrap = create(<Notifications />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});