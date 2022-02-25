import React, {useState} from 'react';
import StaffDetails from "../../components/Staff/StaffDetails";
import MessageModal from "../../components/MessageModal/MessageModal";

const StaffDetailsView = () => {
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    const toLocation = () => {
        window.location.href = '/staff/';
    }

    return (
        <div className='col-11 mx-auto'>
            <StaffDetails
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => toLocation()}
            />
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

export default StaffDetailsView;
