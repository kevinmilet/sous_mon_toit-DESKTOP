import React from 'react';
import {Button, Modal} from "react-bootstrap";
import moment from 'moment';
import 'moment/locale/fr';

const CalendarModal = ({showModal, setShowModal, appointmentDatas}) => {
    console.log(appointmentDatas)

    return (
        <Modal show={showModal} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Détails du rendez-vous
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {appointmentDatas.customerFirstname} {appointmentDatas.customerLastname}
                <br/>
                {moment(appointmentDatas.scheduled_at).format('DD-MM-YYYY à HH:mm')}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() =>setShowModal(false)}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={() =>setShowModal(false)}>
                    Modifier
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CalendarModal;
