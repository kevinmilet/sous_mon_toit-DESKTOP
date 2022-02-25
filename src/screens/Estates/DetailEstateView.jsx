import React, { useState } from 'react';
import DetailEstate from "../../components/Estate/DetailEstate";
import ModalUpdateEquipment from '../../components/Estate/updateForm/ModalUpdateEquipment';
import ModalUpdateCaract from '../../components/Estate/updateForm/ModalUpdateCaract';
import ModalUpdateInfo from '../../components/Estate/updateForm/ModalUpdateInfo';



const DetailEstateView = () => {

    const [showUpdateInfoEstateModal, setShowUpdateInfoEstateModal] = useState(false);
    const [showUpdateCaractEstateModal, setShowUpdateCaractEstateModal] = useState(false);
    const [showUpdateEquipEstateModal, setShowUpdateEquipEstateModal] = useState(false);
    const [estateId, setEstateId] = useState(null);

    return (
        <div className='col-11 mx-auto'>
            <DetailEstate
                setShowUpdateEquipEstateModal={setShowUpdateEquipEstateModal}
                setShowUpdateCaractEstateModal={setShowUpdateCaractEstateModal}
                setShowUpdateInfoEstateModal={setShowUpdateInfoEstateModal}
                // showUpdateEquipEstateModal={showUpdateEquipEstateModal}
                setEstateId={setEstateId}
            />
            {showUpdateInfoEstateModal ?
                <ModalUpdateInfo
                    setShowUpdateInfoEstateModal={setShowUpdateInfoEstateModal}
                    showUpdateInfoEstateModal={showUpdateInfoEstateModal}
                    estateId={estateId}
                />
                : null
            }
            {showUpdateCaractEstateModal ?
                <ModalUpdateCaract
                    setShowUpdateCaractEstateModal={setShowUpdateCaractEstateModal}
                    showUpdateCaractEstateModal={showUpdateCaractEstateModal}
                    estateId={estateId}
                />
                : null
            }
            {showUpdateEquipEstateModal ?
                <ModalUpdateEquipment
                    setShowUpdateEquipEstateModal={setShowUpdateEquipEstateModal}
                    showUpdateEquipEstateModal={showUpdateEquipEstateModal}
                    estateId={estateId}
                />
                : null
            }
        </div>
    );
};

export default DetailEstateView;