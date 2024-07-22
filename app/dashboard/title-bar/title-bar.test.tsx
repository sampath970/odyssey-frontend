import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { create } from "react-test-renderer";
import TitleBar from "./title-bar";
describe("Title bar", () => {
  it("renders the Title Bar ", () => {
    render(<TitleBar />);

    const title_bar = screen.getByTestId("title-bar");
    expect(title_bar).toBeInTheDocument();
  });
  it("checks the Title Bar login menu is rendered", () => {
    render(<TitleBar />);

    const title_bar_login_menu = screen.getByTestId("title-bar-login-menu");
    userEvent.click(title_bar_login_menu);
  });
  it("checks the Title Bar login notification header is rendered", () => {
    render(<TitleBar />);

    const title_bar_login_notification_header = screen.getByTestId(
      "title-bar-login-menu"
    );
    expect(title_bar_login_notification_header).toBeInTheDocument();
  });

  it("Verify the snapshot of the Title section is matched", () => {
    const wrap = create(<TitleBar />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});
