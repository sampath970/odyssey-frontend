import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import FloatingMenu from './floating-menu';

describe('Floating Menu', () => {
    it('renders the floating menu ', () => {
        render(<FloatingMenu />)

        const floating_menu = screen.getByTestId('floating-menu');
        expect(floating_menu).toBeInTheDocument()
    });
    it('checks the floating menu trigger', () => {
        render(<FloatingMenu />)

        const floating_menu_trigger = screen.getByTestId('floating-menu-trigger');
        expect(floating_menu_trigger).toBeInTheDocument()
        userEvent.hover(floating_menu_trigger)
    });
    it('checks the floating menu anchor', () => {
        render(<FloatingMenu />)

        const floating_menu_anchor = screen.getByTestId('floating-menu-anchor');
        expect(floating_menu_anchor).toBeInTheDocument()
        userEvent.hover(floating_menu_anchor)
    });
    it('checks the floating menu content', () => {
        render(<FloatingMenu />)

        const floating_menu_content = screen.getByTestId('floating-menu-content');
        expect(floating_menu_content).toBeInTheDocument()
        userEvent.hover(floating_menu_content)
    });
})