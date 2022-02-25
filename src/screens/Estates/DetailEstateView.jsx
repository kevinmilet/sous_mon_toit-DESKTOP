import React, { useState } from 'react';
import DetailEstate from "../../components/Estate/DetailEstate";
import ModalUpdateEquipment from '../../components/Estate/updateForm/ModalUpdateEquipment';
import ModalUpdateCaract from '../../components/Estate/updateForm/ModalUpdateCaract';
import ModalUpdateInfo from '../../components/Estate/updateForm/ModalUpdateInfo';
import ModalUpdateLoca from '../../components/Estate/updateForm/ModalUpdateLoca';

const DetailEstateView = () => {

    const [showUpdateInfoEstateModal, setShowUpdateInfoEstateModal] = useState(false);
    const [showUpdateLocaEstateModal, setShowUpdateLocaEstateModal] = useState(false);
    const [showUpdateCaractEstateModal, setShowUpdateCaractEstateModal] = useState(false);
    const [showUpdateEquipEstateModal, setShowUpdateEquipEstateModal] = useState(false);
    const [estateId, setEstateId] = useState(null);

    return (
        <div className='col-11 mx-auto'>
            <DetailEstate
                setShowUpdateInfoEstateModal={setShowUpdateInfoEstateModal}
                setShowUpdateLocaEstateModal={setShowUpdateLocaEstateModal}
                setShowUpdateEquipEstateModal={setShowUpdateEquipEstateModal}
                setShowUpdateCaractEstateModal={setShowUpdateCaractEstateModal}
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
            {showUpdateLocaEstateModal ?
                <ModalUpdateLoca
                    setShowUpdateLocaEstateModal={setShowUpdateLocaEstateModal}
                    showUpdateLocaEstateModal={showUpdateLocaEstateModal}
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