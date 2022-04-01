import React, { useState , useContext} from 'react';
import CustomersDetailComponent from '../../components/Customers/CustomerDetail';
import ModalEditCustomer from '../../components/Customers/ModalEditCustomer';
import ModalAddCustomerSearch from '../../components/Customers/ModalAddCustomerSearch';
import MessageModal from "../../components/MessageModal/MessageModal";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import ConfirmModal from "../../components/MessageModal/ConfirmModal";
import {Context} from "../../utils/context/Context";


const CustomersListView = () => {
    const API_URL = useContext(Context).apiUrl;
    const [openModalEditCustomer, setOpenModalEditCustomer] = useState(false);
    const [openModalAddCustomerSearch, setOpenModalAddCustomerSearch] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [searchID, setSearchID] = useState();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmContent, setConfirmContent] = useState('');

    
    const deleteSearchCustomer = () => {
        console.log(searchID);
        if (searchID) {
            axios.delete(API_URL + ApiRoutes.delete_customer_search + searchID).then(
                res => {
                    setShowMessageModal(true);
                    setMessageContent('Recherche client supprimée');
                }).catch(e => {
                console.error(e.message)
                setShowMessageModal(true);
                setMessageContent('La recherche client n\'a pas pu être supprimée');
            })
        }
    }

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
                showConfirmModal={showConfirmModal}
                setShowConfirmModal={setShowConfirmModal}
                setConfirmContent={setConfirmContent}
                confirmContent={confirmContent}
                setSearchID={setSearchID}
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
             {showConfirmModal ?
                <ConfirmModal
                    setShowConfirmModal={setShowConfirmModal}
                    showConfirmModal={showConfirmModal}
                    confirmContent={confirmContent}
                    action={(datas) => deleteSearchCustomer(datas)}
                /> : null
            }
        </div>
    );
};

export default CustomersListView;
