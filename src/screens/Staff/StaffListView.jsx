import React, {useState} from 'react';
import StaffList from "../../components/Staff/StaffList";
import StaffAppointments from "../../components/Calendar/StaffAppointments";
import AddStaffMember from "../../components/Staff/AddStaffMember";

const StaffListView = () => {
    const [showStaffApptmtModal, setShowStaffApptmtModal] = useState(false);
    const [showAddStaffModal, setShowAddStaffModal] = useState(false);
    const [staffId, setStaffId] = useState(null);

    return (
        <div className='col-11 mx-auto'>
            <StaffList
                setShowStaffApptmtModal={setShowStaffApptmtModal}
                showStaffApptmtModal={showStaffApptmtModal}
                setShowAddStaffModal={setShowAddStaffModal}
                showAddStaffModal={showAddStaffModal}
                setStaffId={setStaffId}
            />
            {showStaffApptmtModal ?
            <StaffAppointments setShowStaffApptmtModal={setShowStaffApptmtModal}
                               showStaffApptmtModal={showStaffApptmtModal}
                               staffId={staffId}
                               /> : null}
            {showAddStaffModal ?
            <AddStaffMember setShowAddStaffModal={setShowAddStaffModal}
                            showAddStaffModal={showAddStaffModal}
                            /> : null}
        </div>
    );
};

export default StaffListView;
