import React, {useState} from 'react';
import StaffList from "../../components/Staff/StaffList";
import StaffAppointments from "../../components/Calendar/StaffAppointments";
import AddStaffMember from "../../components/Staff/AddStaffMember";
import MessageModal from "../../components/MessageModal/MessageModal";

const StaffListView = () => {
    const [showStaffApptmtModal, setShowStaffApptmtModal] = useState(false);
    const [showAddStaffModal, setShowAddStaffModal] = useState(false);
    const [staffId, setStaffId] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    const close = () => {
        if (messageContent === 'Vous n\'êtes pas autorisé à accéder à cette fonctionnalité') {
            setShowMessageModal(false);
        } else {
            window.location.reload();
        }
    }

    return (
        <div className='col-11 mx-auto'>
            <StaffList
                setShowStaffApptmtModal={setShowStaffApptmtModal}
                showStaffApptmtModal={showStaffApptmtModal}
                setShowAddStaffModal={setShowAddStaffModal}
                showAddStaffModal={showAddStaffModal}
                setStaffId={setStaffId}
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => close()}
            />
            {showStaffApptmtModal ?
            <StaffAppointments setShowStaffApptmtModal={setShowStaffApptmtModal}
                               showStaffApptmtModal={showStaffApptmtModal}
                               staffId={staffId}
                               /> : null}
            {showAddStaffModal ?
            <AddStaffMember setShowAddStaffModal={setShowAddStaffModal}
                            showAddStaffModal={showAddStaffModal}
                            setShowMessageModal={setShowMessageModal}
                            showMessageModal={showMessageModal}
                            setMessageContent={setMessageContent}
                            setAction={() => close()}
                            /> : null}
            {showMessageModal ?
                <MessageModal
                    setShowMessageModal={setShowMessageModal}
                    showMessageModal={showMessageModal}
                    messageContent={messageContent}
                    action={() => close()}
                /> : null
            }
        </div>
    );
};

export default StaffListView;
