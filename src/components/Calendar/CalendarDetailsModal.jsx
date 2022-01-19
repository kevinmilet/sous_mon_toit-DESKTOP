import React from 'react';
import {Button, Modal} from "react-bootstrap";
import moment from 'moment';
import 'moment/locale/fr';

const CalendarDetailsModal = ({showDetailledEventModal, setShowDetailledEventModal, appointmentDatas}) => {

    return (
        <Modal show={showDetailledEventModal} size="xl" backdrop="static" keyboard={false} centered>
            <Modal.Header>
                <Modal.Title>
                    Détails du rendez-vous de {appointmentDatas.customerFirstname} {appointmentDatas.customerLastname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {moment(appointmentDatas.scheduled_at).format('DD-MM-YYYY à HH:mm')}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() =>setShowDetailledEventModal(false)}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={() =>setShowDetailledEventModal(false)}>
                    Modifier
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CalendarDetailsModal;
