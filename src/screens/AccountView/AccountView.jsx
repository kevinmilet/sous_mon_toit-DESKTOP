import React, {useState} from 'react';
import Account from "../../components/Account/Account";
import AvatarUpdateModal from "../../components/Staff/AvatarUpdateModal";

const AccountView = () => {
    const [showAvatarUpdateModal, setShowAvatarUpdateModal] = useState(false);
    const [userData, setUserData] = useState({});

    return (
        <div className='col-11 mx-auto'>
            <Account
                setShowAvatarUpdateModal={setShowAvatarUpdateModal}
                showAvatarUpdateModal={showAvatarUpdateModal}
                setUserData={setUserData}
            />
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
