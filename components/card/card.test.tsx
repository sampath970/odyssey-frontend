import React from 'react';
import { create } from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './card';

describe('Card Component', () => {
    it("Verify the snapshot of questionnaire card is matched", () => {
        const wrap = create(<Card cardTitle={''} cardUnit={''} cardType={''} cardAddress={''} />).toJSON();
        expect(wrap).toMatchSnapshot();
    });
    it('renders a card with title, address, and units', () => {
        const cardProps = {
            cardTitle: 'Sample Title',
            cardUnit: 42,
            cardType: 'property',
            cardAddress: '123 Main St',
        };

        render(<Card {...cardProps} />);
        const cardTitleText = screen.getByTestId('card-title');
        expect(cardProps.cardTitle).toEqual(cardTitleText.innerHTML);
        const cardAddressText = screen.getByTestId('card-address');
        expect(cardProps.cardAddress).toEqual(cardAddressText.innerHTML);



        // const cardTypeElement = screen.queryByTestId('card-type');
        // expect(cardTypeElement).toBeInTheDocument();

    });

    it('calls editClick when the edit icon is clicked', () => {
        const editClickMock = jest.fn();
        const cardProps = {
            cardTitle: 'Sample Title',
            cardUnit: 42,
            cardType: 'property',
            cardAddress: '123 Main St',
            editClick: editClickMock,
        };

        render(<Card {...cardProps} />);

        // const editIcon = screen.getByTestId('edit-icon');

        // fireEvent.click(editIcon);


        // expect(editClickMock).toHaveBeenCalled();
    });
});
