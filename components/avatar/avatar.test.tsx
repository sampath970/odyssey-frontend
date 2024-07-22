import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from './avatar';

describe('Avatar', () => {
    it('renders the Avatar screen ',() =>{
        render(<Avatar />)

        const avatar_screen = screen.getByTestId('avatar');
        expect(avatar_screen).toBeInTheDocument()
    });
})