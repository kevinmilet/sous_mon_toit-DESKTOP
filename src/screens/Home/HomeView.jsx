import React, {useState} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import CalendarDetailsModal from "../../components/Calendar/CalendarDetailsModal";
import CalendarAddEventModal from "../../components/Calendar/CalendarAddEventModal";

const HomeView = () => {
    const [showDetailledEventModal, setShowDetailledEventModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [appointmentDatas, setAppointmentDatas] = useState();
    const [infos, setInfos] = useState();
    const [staffList, setStaffList] = useState();

    return (
        <div className='col-11 mx-auto'>
            <Calendar setShowDetailledEventModal={setShowDetailledEventModal}
                      setAppointmentDatas={setAppointmentDatas}
                      setShowAddEventModal={setShowAddEventModal}
                      setInfos={setInfos}
                      setStaffList={setStaffList}
            />
            {showDetailledEventModal && appointmentDatas ? <CalendarDetailsModal
                showDetailledEventModal={showDetailledEventModal}
                setShowDetailledEventModal={setShowDetailledEventModal}
                appointmentDatas={appointmentDatas}
                staffList={staffList}
            /> : null}
            {showAddEventModal ? <CalendarAddEventModal
                showAddEventModal={showAddEventModal}
                setShowAddEventModal={setShowAddEventModal}
                infos={infos}
                staffList={staffList}
            /> : null}
        </div>
    );
};

export default HomeView;
