import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import MyProperties from "./page";
import Button from "../../../components/button/button";
import AddProperty from "./add-property/add-property";
import Modal from "../../../components/modal/modal";

describe("Add property", () => {
    it("checks whether the elements inside the my property section are rendered", () => {
        render(<MyProperties />);
        const property_section = screen.getByTestId("my-properties-section");
        const property_drop_down_wrapper = screen.getByTestId("property-drop-down-wrapper");
        const property_filter_section = screen.getByTestId("properties-filter-section");
        expect(property_section).toBeInTheDocument();
        expect(property_drop_down_wrapper).toBeInTheDocument();
        expect(property_filter_section).toBeInTheDocument();
    });
    it("checks whether the add button is rendered", () => {
        const handleAddProperty = jest.fn();

        render(
            <Button
                btnText="Add Property"
                testID="my-properties-add-button"
                buttonClick={handleAddProperty}
            />
        );
    });
    it('should not render the modal when it is closed', () => {
        render(
            <Modal isOpen={false} title="Closed Modal">
                <AddProperty />
            </Modal>
        );

        const modal = screen.queryByText('Closed Modal');

        expect(modal).not.toBeInTheDocument();
    });

    it('should call the close function when the close button is clicked', () => {
        const onClose = jest.fn();

        render(
            <Modal isOpen={true} title="Modal with Close Button" setOn={onClose}>
                <AddProperty />
            </Modal>
        );

        const closeButton = screen.queryByTestId('property-modal-close');

        userEvent.click(closeButton);


    });
});



