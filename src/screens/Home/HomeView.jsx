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
    const [apptmtTypes, setApptmtTypes] = useState();


    return (
        <div>
            <Calendar setShowDetailledEventModal={setShowDetailledEventModal}
                      setAppointmentDatas={setAppointmentDatas}
                      setShowAddEventModal={setShowAddEventModal}
                      setInfos={setInfos}
                      setStaffList={setStaffList}
                      setApptmtTypes={setApptmtTypes}
            />
            {showDetailledEventModal && appointmentDatas ? <CalendarDetailsModal
                showDetailledEventModal={showDetailledEventModal}
                setShowDetailledEventModal={setShowDetailledEventModal}
                appointmentDatas={appointmentDatas}
            /> : null}
            {showAddEventModal ? <CalendarAddEventModal
                showAddEventModal={showAddEventModal}
                setShowAddEventModal={setShowAddEventModal}
                infos={infos}
                staffList={staffList}
                apptmtType={apptmtTypes}
            /> : null}
        </div>
    );
};

export default HomeView;
