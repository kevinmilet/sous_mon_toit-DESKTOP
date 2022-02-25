import React, {useState} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import CalendarDetailsModal from "../../components/Calendar/CalendarDetailsModal";
import CalendarAddEventModal from "../../components/Calendar/CalendarAddEventModal";
import MessageModal from "../../components/MessageModal/MessageModal";

const HomeView = () => {
    const [showDetailledEventModal, setShowDetailledEventModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [appointmentDatas, setAppointmentDatas] = useState();
    const [infos, setInfos] = useState();
    const [staffList, setStaffList] = useState();
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    const close = () => {
        if (messageContent === 'Rendez-vous supprimé' || messageContent === 'Rendez-vous modifié' || messageContent === 'Rendez-vous enregistré') {
            window.location.reload();
        } else {
            setShowMessageModal(false)
        }
    }

    return (
        <div className='col-11 mx-auto'>
            <Calendar setShowDetailledEventModal={setShowDetailledEventModal}
                      setAppointmentDatas={setAppointmentDatas}
                      setShowAddEventModal={setShowAddEventModal}
                      setInfos={setInfos}
                      setStaffList={setStaffList}
                      setShowMessageModal={setShowMessageModal}
                      showMessageModal={showMessageModal}
                      setMessageContent={setMessageContent}
                      setAction={() => close()}
            />
            {showDetailledEventModal && appointmentDatas ? <CalendarDetailsModal
                showDetailledEventModal={showDetailledEventModal}
                setShowDetailledEventModal={setShowDetailledEventModal}
                appointmentDatas={appointmentDatas}
                staffList={staffList}
                setShowMessageModal={setShowMessageModal}
                showMessageModal={showMessageModal}
                setMessageContent={setMessageContent}
                setAction={() => close()}
            /> : null}
            {showAddEventModal ? <CalendarAddEventModal
                showAddEventModal={showAddEventModal}
                setShowAddEventModal={setShowAddEventModal}
                infos={infos}
                staffList={staffList}
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

export default HomeView;
