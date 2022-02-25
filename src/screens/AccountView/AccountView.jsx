import React, {useState} from 'react';
import Account from "../../components/Account/Account";
import AvatarUpdateModal from "../../components/Staff/AvatarUpdateModal";
import MessageModal from "../../components/MessageModal/MessageModal";

const AccountView = () => {
    const [showAvatarUpdateModal, setShowAvatarUpdateModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    const goToHome = () => {
        window.location.href = '/';
    }

    return (
        <div className='col-11 mx-auto'>
            <Account
                setShowAvatarUpdateModal={setShowAvatarUpdateModal}
                showAvatarUpdateModal={showAvatarUpdateModal}
                setUserData={setUserData}
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => goToHome()}
            />
            {showMessageModal ?
                <MessageModal
                    setShowMessageModal={setShowMessageModal}
                    showMessageModal={showMessageModal}
                    messageContent={messageContent}
                    action={() => goToHome()}
                /> : null
            }
            {showAvatarUpdateModal ?
                <AvatarUpdateModal
                    setShowAvatarUpdateModal={setShowAvatarUpdateModal}
                    showAvatarUpdateModal={showAvatarUpdateModal}
                    userData={userData}
                /> : null
            }
        </div>

    );
};

export default AccountView;
