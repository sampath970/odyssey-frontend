import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import AddProperty from "./add-property";
import Button from "../../../../components/button/button";

describe("Add property", () => {
  it("renders the initial input fields when addStatus is false", () => {
    render(<AddProperty addStatus={false}/>);
    const add_property = screen.getByTestId("add-property");
    const header_wrapper = screen.getByTestId("header-wrapper");
    const property_content = screen.getByTestId("property-content");
    expect(add_property).toBeInTheDocument();
    expect(header_wrapper).toBeInTheDocument();
    expect(property_content).toBeInTheDocument();
  });
  it("renders success message when addStatus is true", () => {

    render(<AddProperty addStatus={true}/>);

    const property_modal = screen.getByTestId( "property-modal");
    expect( property_modal).toBeInTheDocument();
  });
  it("checks whether the add button is rendered", () => {
    const clickFunction = jest.fn();

    render(
      <Button
        btnText="Add Property"
        testID="porperties-button"
        buttonClick={clickFunction}
      />
    );
  });
  it("checks whether the close button is rendered", () => {
    const clickFunction = jest.fn();

    render(
      <Button
        btnText="Close"
        testID="porperties-close-button"
        buttonClick={clickFunction}
      />
    );
  });
  it("it checks whether the values inside the input field are changing", () => {
    render(<AddProperty />);
    const name_input = screen.getByTestId("name-input") as HTMLInputElement;
    fireEvent.change(name_input, { target: { value: "New Property" } });
    expect(name_input.value).toBe("New Property");

    const email_input = screen.getByTestId("email-input") as HTMLInputElement;
    fireEvent.change(email_input, { target: { value: "123@gmail.com" } });
    expect(email_input.value).toBe("123@gmail.com");

    const city_input = screen.getByTestId("city-input") as HTMLInputElement;
    fireEvent.change(city_input, { target: { value: "New York" } });
    expect(city_input.value).toBe("New York");

    const state_input = screen.getByTestId("state-input") as HTMLInputElement;
    fireEvent.change(state_input, { target: { value: "Texas" } });
    expect(state_input.value).toBe("Texas");

    const postalcode_input = screen.getByTestId(
      "postalcode-input"
    ) as HTMLInputElement;
    fireEvent.change(postalcode_input, { target: { value: 941112 } });
    expect(postalcode_input.value).toBe("941112");
  });
});
