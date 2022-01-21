import React, {useState} from 'react';
import CustomersDetailComponent from '../../components/Customers/CustomerDetail';
import ModalEditCustomer from '../../components/Customers/ModalEditCustomer';


const CustomersListView = () => {
    const [openModalEditCustomer, setOpenModalEditCustomer] = useState(false);
    return (
        <div className="row justify-content-center align-items-center">
           
            <CustomersDetailComponent
            openModalEditCustomer={openModalEditCustomer}
            setOpenModalEditCustomer={setOpenModalEditCustomer}
            />

            {openModalEditCustomer  ? <ModalEditCustomer
                openModalEditCustomer={openModalEditCustomer}
                setOpenModalEditCustomer={setOpenModalEditCustomer}
                
            /> : null}
        </div>
    );
};

export default CustomersListView;