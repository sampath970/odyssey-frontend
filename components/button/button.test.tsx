import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./button";
import { userEvent } from "@testing-library/user-event";

describe("Button component", () => {
  it("checks whether the button is rendered", () => {
    const clickFunction = jest.fn();

    render(
      <Button
        btnText="Lets start"
        testID="home-login-button"
        buttonClick={clickFunction}
      />
    );

    const home_login_button = screen.getByTestId("home-login-button");
    expect(home_login_button).toBeInTheDocument();
  });

  it("checks if primary button is rendered", () => {
    const clickFunction = jest.fn();

    render(
      <Button
        btnTheme="primary"
        btnText="Lets start"
        testID="default-button"
        buttonClick={clickFunction}
      />
    );

    const home_login_button = screen.getByTestId("default-button");
    expect(home_login_button).toHaveClass("btn-primary");
  });
  // it('checks if button click is working', () => {

  //     const buttonClickFunction = jest.fn(()=>{
  //         console.log("called");
  //     });

  //     render(<Button btnTheme="primary" btnText="Login" testID="rounded-button" buttonClick={buttonClickFunction} />)

  //     const home_login_button = screen.getByTestId("rounded-button");
  //     userEvent.click(home_login_button);
  //     expect(buttonClickFunction).toHaveBeenCalled();
  // })
});
