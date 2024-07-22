import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TenantSection from './page';
import Modal from '../../../components/modal/modal';
import AddTenant from './add-tenant/add-tenant';

describe('Tenant data', () => {
    it('renders the tenant data section', () => {
        render(<TenantSection />)

        const tenant_section = screen.getByTestId('tenant-section');
        expect(tenant_section).toBeInTheDocument()
        const tenant_table = screen.getByTestId('tenant-table');
        expect(tenant_table).toBeInTheDocument()
    })

    it('should not render the modal when it is closed', () => {
        render(
            <Modal isOpen={false} title="Closed Modal">
                <AddTenant />
            </Modal>
        );

        const modal = screen.queryByText('Closed Modal');

        expect(modal).not.toBeInTheDocument();
    });

    it('should call the close function when the close button is clicked', () => {
        const onClose = jest.fn();

        render(
            <Modal isOpen={true} title="Modal with Close Button" setOn={onClose}>
                <AddTenant />
            </Modal>
        );

        const closeButton = screen.queryByTestId('tenant-close');

        userEvent.click(closeButton);


    });
});



















