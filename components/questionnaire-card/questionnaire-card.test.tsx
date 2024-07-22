import React from 'react';
import { create } from "react-test-renderer";
import { render, fireEvent, screen } from '@testing-library/react';
import QuestionnaireCard from './questionnaire-card';

describe('QuestionnaireCard component', () => {

    const testProps = {
        id: '1',
        title: 'Sample Questionnaire',
        name: 'Mike',
        formName:"Sample.pdf",
        onEdit: jest.fn(),
        onDelete: jest.fn(),
        onClone: jest.fn(),
        onShare: jest.fn(),
        onCardClick: jest.fn(),
    };

    it("Verify the snapshot of questionnaire card is matched", () => {
        const wrap = create(<QuestionnaireCard />).toJSON();
        expect(wrap).toMatchSnapshot();
    });

    it('Checks if default props are populated', () => {
        render(<QuestionnaireCard {...testProps} />);

            const titleText = screen.getByTestId('questionnaire_title');
            expect(testProps.formName).toEqual(titleText.textContent);
            
            // const nameText = screen.getByTestId('questionnaire_name');
            // expect(testProps.name).toEqual(nameText.textContent);
        });

 

    it('calls onEdit when the Edit icon is clicked', () => {
        render(<QuestionnaireCard {...testProps} />);
        const onEdit = screen.getByTestId('onEdit');
        fireEvent.click(onEdit);
        expect(testProps.onEdit).toHaveBeenCalledTimes(1);
    });
    it('calls onDelete when the Delete icon is clicked', () => {
        render(<QuestionnaireCard {...testProps} />);
        const onDelete = screen.getByTestId('onDelete');
        fireEvent.click(onDelete);
        expect(testProps.onDelete).toHaveBeenCalledTimes(1);
    });
    it('calls onClone when the clone icon is clicked', () => {
        render(<QuestionnaireCard {...testProps} />);
        const onClone = screen.getByTestId('onClone');
        fireEvent.click(onClone);
        expect(testProps.onClone).toHaveBeenCalled();
        const clone = screen.queryByTestId('delete');
        expect(clone).toBeDefined()
    });

    it('calls onCardClick when the card is clicked', () => {
        const { container } = render(<QuestionnaireCard {...testProps} />);
        const card = container.querySelector('.questionnaire-card');
        fireEvent.click(card);
        expect(testProps.onCardClick).toHaveBeenCalled();
    });
});
