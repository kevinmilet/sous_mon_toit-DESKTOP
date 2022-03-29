import React, {useState} from 'react';
import CustomersListComponent from '../../components/Customers/CustomersList';
import ModalCreateCustomer from '../../components/Customers/ModalCreateCustomer';

const CustomersListView = () => {

    const [openModalAddCustomer, setOpenModalAddCustomer] = useState(false);
    // const [showAddEventModal, setShowAddEventModal] = useState(false);
    // const [appointmentDatas, setAppointmentDatas] = useState();
    // const [infos, setInfos] = useState();

    return (
        <div className="row justify-content-center align-items-center">
           
            <CustomersListComponent 
            openModalAddCustomer={openModalAddCustomer}
            setOpenModalAddCustomer={setOpenModalAddCustomer}
            />
            {openModalAddCustomer  ? <ModalCreateCustomer
                openModalAddCustomer={openModalAddCustomer}
                setOpenModalAddCustomer={setOpenModalAddCustomer}
                
            /> : null}
            
           
        </div>
    );
};

export default CustomersListView;
