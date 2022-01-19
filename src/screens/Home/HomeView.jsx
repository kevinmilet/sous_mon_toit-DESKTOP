import React, {useState} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import CalendarModal from "../../components/Calendar/CalendarModal";

const HomeView = () => {
    const [showModal, setShowModal] = useState(false);
    const [eventDatas, setEventDatas] = useState();
    const [appointmentDatas, setAppointmentDatas] = useState();

    return (
        <div>
            <Calendar setShowModal={setShowModal} setEventDatas={setEventDatas} setAppointmentDatas={setAppointmentDatas}/>
            {showModal ? <CalendarModal
                showModal={showModal}
                setShowModal={setShowModal}
                eventDatas={eventDatas}
                appointmentDatas={appointmentDatas}
            /> : null}
        </div>
    );
};

export default HomeView;
