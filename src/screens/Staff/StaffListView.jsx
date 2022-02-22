import React, {useState} from 'react';
import StaffList from "../../components/Staff/StaffList";
import StaffAppointments from "../../components/Calendar/StaffAppointments";

const StaffListView = () => {
    const [showStaffApptmtModal, setShowStaffApptmtModal] = useState(false);
    const [staffId, setStaffId] = useState(null);

    return (
        <div className='col-11 mx-auto'>
            <StaffList
                setShowStaffApptmtModal={setShowStaffApptmtModal}
                showStaffApptmtModal={showStaffApptmtModal}
                setStaffId={setStaffId}
            />
            {showStaffApptmtModal ?
            <StaffAppointments setShowStaffApptmtModal={setShowStaffApptmtModal}
                               showStaffApptmtModal={showStaffApptmtModal}
                               staffId={staffId}
                               /> : null}
        </div>
    );
};

export default StaffListView;
