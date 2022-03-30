import React, {useContext, useState} from 'react';
import CustomersListComponent from '../../components/Customers/CustomersList';
import ModalCreateCustomer from '../../components/Customers/ModalCreateCustomer';
import MessageModal from "../../components/MessageModal/MessageModal";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import ConfirmModal from "../../components/MessageModal/ConfirmModal";
import {Context} from "../../utils/context/Context";

const CustomersListView = () => {
    const API_URL = useContext(Context).apiUrl;
    const [openModalAddCustomer, setOpenModalAddCustomer] = useState(false);
    // const [showAddEventModal, setShowAddEventModal] = useState(false);
    // const [appointmentDatas, setAppointmentDatas] = useState();
    // const [infos, setInfos] = useState();

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmContent, setConfirmContent] = useState('');
    const [customerId, setCustomerId] = useState();

    const goToHome = () => {
        window.location.href = '/customers_list';
    }

    const deleteCustomer = () => {
        console.log(customerId);
        if (customerId) {
            axios.delete(API_URL + ApiRoutes.delete_customer + customerId).then(
                res => {
                    setShowMessageModal(true);
                    setMessageContent('Client supprimé');
                }).catch(e => {
                console.error(e.message)
                setShowMessageModal(true);
                setMessageContent('Le client n\'a pas pu être supprimé');
            })
        }
    }

    return (
        <div className="row justify-content-center align-items-center">
            <CustomersListComponent 
            openModalAddCustomer={openModalAddCustomer}
            setOpenModalAddCustomer={setOpenModalAddCustomer}
            setShowMessageModal={setShowMessageModal}
            showMessageModal={showMessageModal}
            setMessageContent={setMessageContent}
            setAction={() => goToHome()}
            setShowConfirmModal={setShowConfirmModal}
            showConfirmModal={showConfirmModal}
            setConfirmContent={setConfirmContent}
            confirmContent={confirmContent}
            setCustomerId={setCustomerId}
            />
            {showMessageModal ?
                <MessageModal
                    setShowMessageModal={setShowMessageModal}
                    showMessageModal={showMessageModal}
                    messageContent={messageContent}
                    action={() => goToHome()}
                /> : null
            }
            {openModalAddCustomer  ? <ModalCreateCustomer
                openModalAddCustomer={openModalAddCustomer}
                setOpenModalAddCustomer={setOpenModalAddCustomer}
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => goToHome()}
            /> : null}
            {showConfirmModal ?
                <ConfirmModal
                    setShowConfirmModal={setShowConfirmModal}
                    showConfirmModal={showConfirmModal}
                    confirmContent={confirmContent}
                    action={(datas) => deleteCustomer(datas)}
                /> : null
            }
        </div>
    );
};

export default CustomersListView;
