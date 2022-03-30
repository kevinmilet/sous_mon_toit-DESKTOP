import React, {useContext, useState} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import CalendarDetailsModal from "../../components/Calendar/CalendarDetailsModal";
import CalendarAddEventModal from "../../components/Calendar/CalendarAddEventModal";
import MessageModal from "../../components/MessageModal/MessageModal";
import ConfirmModal from "../../components/MessageModal/ConfirmModal";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';
import apiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";


const HomeView = () => {
    const API_URL = useContext(Context).apiUrl;
    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const [showDetailledEventModal, setShowDetailledEventModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [appointmentDatas, setAppointmentDatas] = useState();
    const [infos, setInfos] = useState();
    const [staffList, setStaffList] = useState();
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmContent, setConfirmContent] = useState('');
    const [datasDropped, setDatasDropped] = useState();
    const [eventId, setEventId] = useState();

    const close = () => {
        if (messageContent === 'Rendez-vous supprimé' || messageContent === 'Rendez-vous modifié' || messageContent === 'Rendez-vous enregistré') {
            window.location.reload();
        } else {
            setShowMessageModal(false)
        }
    }

    const updateEventOnDrop = () => {
        setShowConfirmModal(false);
        if(datasDropped) {
            let id = datasDropped.event.id;
            let values= moment(datasDropped.event.start).format('YYYY-MM-DD HH:mm:ss');
            if (values < today) {
                datasDropped.revert();
                setShowMessageModal(true);
                setMessageContent('Impossible de déplacer un rendez-vous à une date inférieure!');
            } else {
                axios.put(API_URL + apiRoutes.update_event + `/${id}?scheduled_at=${values}`).then(res => {
                    setShowMessageModal(true);
                    setMessageContent('Rendez-vous modifié');
                }).catch(error => {
                    console.log(error.message)
                    setShowMessageModal(true);
                    setMessageContent(error.message);
                })
            }
        }
    }

    const deleteAppointment = () => {
        console.log(eventId)
        if (eventId) {
            axios.delete(API_URL + apiRoutes.delete_apptmt + eventId).then(
                res => {
                    setShowMessageModal(true);
                    setMessageContent('Rendez-vous supprimé');
                }).catch(e => {
                console.error(e.message)
                setShowMessageModal(true);
                setMessageContent('Le rendez-vous n\'a pas pu être supprimé');
            })
            showDetailledEventModal(false);
        }
    }

    const selectMethod = () => {
        if (eventId) {
            deleteAppointment();
        } else {
            updateEventOnDrop();
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
                      setShowConfirmModal={setShowConfirmModal}
                      showConfirmModal={showConfirmModal}
                      setConfirmContent={setConfirmContent}
                      confirmContent={confirmContent}
                      setDatasDropped={setDatasDropped}
            />
            {showDetailledEventModal && appointmentDatas ?
                <CalendarDetailsModal
                    showDetailledEventModal={showDetailledEventModal}
                    setShowDetailledEventModal={setShowDetailledEventModal}
                    appointmentDatas={appointmentDatas}
                    staffList={staffList}
                    setShowMessageModal={setShowMessageModal}
                    showMessageModal={showMessageModal}
                    setMessageContent={setMessageContent}
                    setAction={() => close()}
                    setShowConfirmModal={setShowConfirmModal}
                    showConfirmModal={showConfirmModal}
                    setConfirmContent={setConfirmContent}
                    confirmContent={confirmContent}
                    setEventId={setEventId}
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
            {showConfirmModal ?
                <ConfirmModal
                    setShowConfirmModal={setShowConfirmModal}
                    showConfirmModal={showConfirmModal}
                    confirmContent={confirmContent}
                    action={(datas) => selectMethod(datas)}
                /> : null
            }
        </div>
    );
};

export default HomeView;
