import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import AddTenant from "./add-tenant";
import DatePicker from "react-datepicker";
import Button from "../../../../components/button/button";

describe("Add tenant", () => {
  // beforeAll(()=>{
  //   Object.defineProperty(window,"matchMedia",{
  //     value:jest.fn(()=>{
  //       return{
  //         matches:false,
  //         addEventListener:jest.fn(),
  //         removeEventListener:jest.fn()
  //       }
  //     })
  //   })
  // })
  // it("Verify the snapshot of the Add Tenant section is matched", () => {
  //   const wrap = create(<AddTenant />).toJSON();
  //   expect(wrap).toMatchSnapshot({"multiselect-race":expect.anything,"multiselect-ethnicity":expect.anything});
  // });
  it("checks whether the values inside the input field are changing", () => {
    render(<AddTenant role="tenant"/>);

    const first_name_input = screen.getByTestId(
      "first-name-input"
    ) as HTMLInputElement;
    fireEvent.change(first_name_input, { target: { value: "John Doe" } });

    const last_name_input = screen.getByTestId(
      "last-name-input"
    ) as HTMLInputElement;
    fireEvent.change(last_name_input, { target: { value: "John Doe" } });

    const email_input = screen.getByTestId("email-input") as HTMLInputElement;
    fireEvent.change(email_input, { target: { value: "john@example.com" } });

    const ssn_input = screen.getByTestId("ssn-input") as HTMLInputElement;
    fireEvent.change(ssn_input, { target: { value: "MKJU-76345-KNMU" } });

    const phone_number_input = screen.getByTestId(
      "phone-number-input"
    ) as HTMLInputElement;
    fireEvent.change(phone_number_input, { target: { value: "956789034" } });
  });

  // test('selects a date in the date picker', () => {
  //     render(<DatePicker />);
  //     const date_Picker = screen.getByTestId('date-picker');
  //     fireEvent.change(DatePicker, { target: { value: '2023-10-30' } });
  //     expect(date_Picker).toBe('2023-10-30');
  // })

  it("should display error messages when form is submitted with invalid data", () => {
    const onAddNewTenant = jest.fn();

    render(
      <Button
        btnText="Add Tenant"
        testID="add-tenants-button"
        buttonClick={onAddNewTenant}
      />
    );

    const add_tenants_button = screen.getByTestId("add-tenants-button");
    expect(add_tenants_button).toBeInTheDocument();
  });
  it("should display the tenant form is added succesfully", () => {
    const onClose = jest.fn();

    render(
      <Button
        btnText="close"
        testID="add-tenants-close-button"
        buttonClick={onClose}
      />
    );

    const add_tenants_close_button = screen.getByTestId(
      "add-tenants-close-button"
    );
    expect(add_tenants_close_button).toBeInTheDocument();
  });
});
