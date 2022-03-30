import React, { useState } from 'react';
import CustomersDetailComponent from '../../components/Customers/CustomerDetail';
import ModalEditCustomer from '../../components/Customers/ModalEditCustomer';
import ModalAddCustomerSearch from '../../components/Customers/ModalAddCustomerSearch';
import MessageModal from "../../components/MessageModal/MessageModal";

const CustomersListView = () => {
    const [openModalEditCustomer, setOpenModalEditCustomer] = useState(false);
    const [openModalAddCustomerSearch, setOpenModalAddCustomerSearch] = useState(false);

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
            /> : null}
            {openModalAddCustomerSearch ? <ModalAddCustomerSearch
                openModalAddCustomerSearch={openModalAddCustomerSearch}
                setOpenModalAddCustomerSearch={setOpenModalAddCustomerSearch}

            /> : null}
        </div>
    );
};

export default CustomersListView;
