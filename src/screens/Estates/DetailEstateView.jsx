import React, { useState } from 'react';
import DetailEstate from "../../components/Estate/DetailEstate";
import ModalUpdateEquipment from '../../components/Estate/updateForm/ModalUpdateEquipment';
import ModalUpdateCaract from '../../components/Estate/updateForm/ModalUpdateCaract';
import ModalUpdateInfo from '../../components/Estate/updateForm/ModalUpdateInfo';
import ModalUpdateLoca from '../../components/Estate/updateForm/ModalUpdateLoca';
import ModalUpdatePhoto from '../../components/Estate/updateForm/ModalUpdatePhoto';

const DetailEstateView = () => {

    const [showUpdateInfoEstateModal, setShowUpdateInfoEstateModal] = useState(false);
    const [showUpdatePhotoEstateModal, setShowUpdatePhotoEstateModal] = useState(false);
    const [showUpdateLocaEstateModal, setShowUpdateLocaEstateModal] = useState(false);
    const [showUpdateCaractEstateModal, setShowUpdateCaractEstateModal] = useState(false);
    const [showUpdateEquipEstateModal, setShowUpdateEquipEstateModal] = useState(false);
    const [estateId, setEstateId] = useState(null);
    const [reload, setReload] = useState(false);

    return (
        <div className='col-11 mx-auto'>
            <DetailEstate
                setShowUpdateInfoEstateModal={setShowUpdateInfoEstateModal}
                setShowUpdatePhotoEstateModal={setShowUpdatePhotoEstateModal}
                setShowUpdateLocaEstateModal={setShowUpdateLocaEstateModal}
                setShowUpdateEquipEstateModal={setShowUpdateEquipEstateModal}
                setShowUpdateCaractEstateModal={setShowUpdateCaractEstateModal}
                setEstateId={setEstateId}
                reload={reload}
                setReload={setReload}
            />
            {showUpdateInfoEstateModal ?
                <ModalUpdateInfo
                    setShowUpdateInfoEstateModal={setShowUpdateInfoEstateModal}
                    showUpdateInfoEstateModal={showUpdateInfoEstateModal}
                    estateId={estateId}
                    setReload={setReload}
                />
                : null
            }
            {showUpdatePhotoEstateModal ?
                <ModalUpdatePhoto
                    setShowUpdatePhotoEstateModal={setShowUpdatePhotoEstateModal}
                    showUpdatePhotoEstateModal={showUpdatePhotoEstateModal}
                    estateId={estateId}
                    setReload={setReload}
                />
                : null
            }
            {showUpdateLocaEstateModal ?
                <ModalUpdateLoca
                    setShowUpdateLocaEstateModal={setShowUpdateLocaEstateModal}
                    showUpdateLocaEstateModal={showUpdateLocaEstateModal}
                    estateId={estateId}
                    setReload={setReload}
                />
                : null
            }
            {showUpdateCaractEstateModal ?
                <ModalUpdateCaract
                    setShowUpdateCaractEstateModal={setShowUpdateCaractEstateModal}
                    showUpdateCaractEstateModal={showUpdateCaractEstateModal}
                    estateId={estateId}
                    setReload={setReload}
                />
                : null
            }
            {showUpdateEquipEstateModal ?
                <ModalUpdateEquipment
                    setShowUpdateEquipEstateModal={setShowUpdateEquipEstateModal}
                    showUpdateEquipEstateModal={showUpdateEquipEstateModal}
                    estateId={estateId}
                    setReload={setReload}
                />
                : null
            }
        </div>
    );
};

export default DetailEstateView;