import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import Modal from "./modal";
describe("Modal component", () => {
  it("renders the Modal ", () => {
    render(<Modal />);
  });

  it("Verify the snapshot of the Modal is matched", () => {
    const wrap = create(<Modal />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});