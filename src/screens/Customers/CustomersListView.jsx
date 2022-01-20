import React, {useState} from 'react';
import CustomersListComponent from '../../components/Customers/CustomersList';
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import CalendarDetailsModal from "../../components/Calendar/CalendarDetailsModal";
import CalendarAddEventModal from "../../components/Calendar/CalendarAddEventModal";
import ModalCreateCustomer from '../../components/Customers/ModalCreateCustomer'; 

const CustomersListView = () => {

    const [openModalAddCustomer, setOpenModalAddCustomer] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [appointmentDatas, setAppointmentDatas] = useState();
    const [infos, setInfos] = useState();

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