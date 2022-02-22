import React, {useContext, useEffect, useState} from 'react';
import {Modal, Table} from "react-bootstrap";
import Loader from "../Tools/Loader/Loader";
import axios from "axios";
import {Context} from "../../utils/context/Context";
import apiRoutes from "../../utils/const/ApiRoutes";
import moment from 'moment';
import 'moment/locale/fr';
import styled from "styled-components";
import {StyledBtnSecondary} from "../../utils/styles/Atoms";

const Container = styled.div`
    overflow-y: auto;
    height:400px;
`

const StaffAppointment = ({staffId, setShowStaffApptmtModal, showStaffApptmtModal}) => {
    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const handleClose = () => setShowStaffApptmtModal(false);

    useEffect(() => {
        axios.get(API_URL + apiRoutes.staff_schedule + '/' + staffId).then(res => {
            setData(res.data.sort((a,b) => {
                if (a.scheduled_at < b.scheduled_at)
                    return -1;
                if (a.scheduled_at > b.scheduled_at)
                    return 1;
                return 0;
            }).filter(
                date => date.scheduled_at > moment().format('YYYY-MM-DD HH:mm:ss')
            ));
        }).catch(error => {
            console.log(error.message);
        }).finally(() => {
            setLoading(false);
        });

    }, [API_URL, staffId]);

    return (
        <>
            <Modal show={showStaffApptmtModal} onHide={handleClose} size="xl" backdrop="static" keyboard={false}
                   centered>
                {(loading) ?
                    <Loader/> : (
                        <>
                            <Modal.Body>
                                <div className='text-center mb-3'>
                                    <h2>Rendez-vous</h2>
                                </div>
                                <Container>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Heure</th>
                                                <th>Client</th>
                                                <th>Bien</th>
                                                <th>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {!loading && data.map(item => (
                                            <tr key={item.id}>
                                                <td>{moment(item.scheduled_at).format('DD/MM/YYYY')}</td>
                                                <td>{moment(item.scheduled_at).format('HH:mm')}</td>
                                                <td>{item.customerFirstname + ' ' + item.customerLastname}</td>
                                                <td>{(item.address ?? '') + ' ' + (item.zipcode ?? '') + ' ' + (item.city ?? '')}</td>
                                                <td>{item.appointment_type}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Container>

                                <div className='text-end m-3'>
                                    <StyledBtnSecondary type="button" className="mx-3" onClick={handleClose}>
                                        Fermer
                                    </StyledBtnSecondary>
                                </div>
                            </Modal.Body>
                        </>
                    )}
            </Modal>
        </>
    )
};

export default StaffAppointment;
