import React, {useContext, useState} from 'react';
import StaffDetails from "../../components/Staff/StaffDetails";
import MessageModal from "../../components/MessageModal/MessageModal";
import {Context} from "../../utils/context/Context";
import ConfirmModal from "../../components/MessageModal/ConfirmModal";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";


const StaffDetailsView = () => {
    const API_URL = useContext(Context).apiUrl;
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmContent, setConfirmContent] = useState('');
    const [staffId, setStaffId] = useState();

    const toLocation = () => {
        window.location.href = '/staff/';
    }

    const deleteStaff = () => {
        console.log(staffId)
        if (staffId) {
            axios.delete(API_URL + ApiRoutes.staff_delete + '/' + staffId).then(res => {
                setShowMessageModal(true);
                setMessageContent('Membre du personel supprimé');
            }).catch(e => {
                console.error(e.message)
                setShowMessageModal(true);
                setMessageContent('Le membre du personel n\'a pas pu être supprimé');
            })
        }
    }

    return (
        <div className='col-11 mx-auto'>
            <StaffDetails
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => toLocation()}
                setShowConfirmModal={setShowConfirmModal}
                showConfirmModal={showConfirmModal}
                setConfirmContent={setConfirmContent}
                confirmContent={confirmContent}
                setStaffId={setStaffId}
            />
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
                    action={(datas) => deleteStaff(datas)}
                /> : null
            }
        </div>
    );
};

export default StaffDetailsView;
