import React, { useState } from 'react';
import CustomersDetailComponent from '../../components/Customers/CustomerDetail';
import ModalEditCustomer from '../../components/Customers/ModalEditCustomer';
import ModalAddCustomerSearch from '../../components/Customers/ModalAddCustomerSearch';
import MessageModal from "../../components/MessageModal/MessageModal";

const CustomersListView = () => {
    const [openModalEditCustomer, setOpenModalEditCustomer] = useState(false);
    const [openModalAddCustomerSearch, setOpenModalAddCustomerSearch] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    const toLocation = () => {
        window.location.href = '/customers_list';
    }

    return (
        <div className="row justify-content-center align-items-center">

            <CustomersDetailComponent
                openModalEditCustomer={openModalEditCustomer}
                setOpenModalEditCustomer={setOpenModalEditCustomer}
                openModalAddCustomerSearch={openModalAddCustomerSearch}
                setOpenModalAddCustomerSearch={setOpenModalAddCustomerSearch}
            />
            {openModalEditCustomer ? <ModalEditCustomer
                openModalEditCustomer={openModalEditCustomer}
                setOpenModalEditCustomer={setOpenModalEditCustomer}
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => toLocation()}
            /> : null}
            {openModalAddCustomerSearch ? <ModalAddCustomerSearch
                openModalAddCustomerSearch={openModalAddCustomerSearch}
                setOpenModalAddCustomerSearch={setOpenModalAddCustomerSearch}
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => toLocation()}
            /> : null}
            {showMessageModal ?
                <MessageModal
                    setShowMessageModal={setShowMessageModal}
                    showMessageModal={showMessageModal}
                    messageContent={messageContent}
                    action={() => toLocation()}
                /> : null
            }
        </div>
    );
};

export default CustomersListView;
