import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import {Context} from "../../utils/context/Context";
import {StyledBtnPrimary, StyledBtnSecondary} from "../../utils/styles/Atoms";
import {FileUploader} from "react-drag-drop-files";
import styled from "styled-components";
import ApiRoutes from "../../utils/const/ApiRoutes";
import avatarDefault from "../../assets/img/user_default.png";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import axios from "axios";

const Container = styled.div`
    height: fit-content;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Img = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

const AvatarUpdateModal = ({setShowAvatarUpdateModal, showAvatarUpdateModal, userData}) => {
    const API_URL = useContext(Context).apiUrl;

    const handleClose = () => setShowAvatarUpdateModal(false);

    //Changement de l'aperçu de l'image
    const changeImg = (target) => {
        let imagePreview = document.getElementById('filePrev');
        if (target) {
            imagePreview.src = URL.createObjectURL(target)
        }
    }

    // Insertion en bdd
    const insertImg = (values) => {
        let formData = new FormData();
        formData.append('file', values.file);

        if (formData.get('file')) {
            axios.post(API_URL + ApiRoutes.staff_update + "/" + userData.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(res => {
                    window.location.href = '/compte/' + userData.id;
                }).catch(error => {
                    console.log(error.response);
            })
        }
    }

    return (
        <>
            <Modal show={showAvatarUpdateModal} onHide={handleClose} size="lg" backdrop="static" keyboard={false}
                   centered>
                <Modal.Body>
                    <div className='text-center mb-4'>
                        <h2>Modifier la photo de profil</h2>
                    </div>
                    <Formik
                        initialValues={{
                            file: null,
                        }}
                        validationSchema={Yup.object({
                            file: Yup.mixed().required('La photo de profil est obligatoire'),
                        })}
                        onSubmit={async (values) => {
                            await new Promise(() => {
                                insertImg(values);
                            })
                        }}
                    >
                        {({handleSubmit, setFieldValue, errors, values}) => (
                            <Container>
                                <Form id="pictureForm" encType="multipart/form-data">
                                    <div className="m-4">
                                        <FileUploader
                                            multiple={false}
                                            handleChange={(value) => {setFieldValue('file', value); changeImg(value)}}
                                            name="file"
                                            types={fileTypes}
                                            maxSize={2}
                                        />
                                    </div>
                                    <p className="error"
                                       style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.file ?? null}</p>
                                    <div className="row">
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <Img id="filePrev"
                                                 src={ApiRoutes.AVATAR_BASE_URL + userData.avatar ?? avatarDefault}
                                                 alt="Image Preview"/>
                                        </div>
                                    </div>

                    <div className='text-end m-3'>
                        <StyledBtnSecondary type="button" className="mx-3" onClick={handleClose}>
                            Annuler
                        </StyledBtnSecondary>
                        <StyledBtnPrimary type="submit" className="mx-3" onClick={() => {handleSubmit(); handleClose()}}>
                            Sauvegarder
                        </StyledBtnPrimary>
                    </div>
                                </Form>
                            </Container>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AvatarUpdateModal;
