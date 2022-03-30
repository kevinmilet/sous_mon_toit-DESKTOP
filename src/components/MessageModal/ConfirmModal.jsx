import React from 'react';
import {Modal} from "react-bootstrap";
import {StyledBtnPrimary, StyledBtnSecondary} from "../../utils/styles/Atoms";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
`

const ConfirmModal = ({confirmContent, showConfirmModal, setShowConfirmModal, action}) => {
    const handleClose = () => setShowConfirmModal(false);

    return (
        <>
            <Modal show={showConfirmModal} onHide={handleClose} backdrop="static" keyboard={false}
                   centered>
                <Container>
                    <Modal.Body>
                        <h6>{confirmContent}</h6>
                    </Modal.Body>
                </Container>

                <div className='text-end m-3'>
                    <StyledBtnSecondary type="button" className="mx-3" onClick={handleClose}>
                        Non
                    </StyledBtnSecondary>
                    <StyledBtnPrimary type="button" className="mx-3" onClick={action}>
                        Oui
                    </StyledBtnPrimary>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmModal;
