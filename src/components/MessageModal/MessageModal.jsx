import React from 'react';
import {Modal} from "react-bootstrap";
import {StyledBtnPrimary} from "../../utils/styles/Atoms";
import styled from "styled-components";

const Container = styled.div`
    margin: 1rem;
`

const MessageModal = ({action, messageContent, showMessageModal}) => {
    return (
        <>
            <Modal show={showMessageModal} onHide={() => action()} backdrop="static" keyboard={false}
                   centered>
                <Container>
                    <Modal.Body>
                        <h5>{messageContent}</h5>
                    </Modal.Body>
                </Container>

                <div className='text-end m-3'>
                    <StyledBtnPrimary type="button" className="mx-3" onClick={() => action()}>
                        OK
                    </StyledBtnPrimary>
                </div>
            </Modal>
        </>
    );
};

export default MessageModal;
