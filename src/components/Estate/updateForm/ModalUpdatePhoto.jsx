import React, { useContext} from 'react';
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Context } from "../../../utils/context/Context";
import ApiRoutes from "../../../utils/const/ApiRoutes";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../../utils/styles/colors';
import { StyledBtnPrimary, StyledBtnSecondary } from "../../../utils/styles/Atoms";

const ScrollDiv = styled.div`
    padding:20px;
    overflow:auto
`
const ModifSuccess = styled.p`
    font-size: 1rem;
    display: none;
`

const ModalUpdatePhoto = ({ estateId, setShowUpdatePhotoEstateModal, showUpdatePhotoEstateModal }) => {

    const API_URL = useContext(Context).apiUrl;
    const handleClose = () => setShowUpdatePhotoEstateModal(false);

    // Insertion en bdd
    const InsertImg = (values) => {

        let formData = new FormData();
        formData.append('file1', values.file1);

        axios.post(API_URL + ApiRoutes.upload_pictures + "/" + estateId, formData)
            // axios.post("http://localhost:8000/estates_pictures/upload/" + id, formData)
            .then(res => {
                console.log(res);
                // Message de succès
                window.scrollTo(0, 0);
                document.getElementById('addPhotoSuccess').style.cssText = "display: flex;";
                document.getElementById('addPhotoSuccess').innerHTML = "Photo ajouté avec succès !";
                setTimeout(() => {
                    window.location.href = '/detail-biens/' + estateId;
                }, 2000);
            }).catch(error => {
                console.log(error.response);
            })
    }

    //Changement de l'aperçu de l'image
    const ChangeImg = (target) => {
        var imagePreview = document.getElementById(target.name);
        const [file] = target.files
        if (file) {
            imagePreview.src = URL.createObjectURL(file)
        }
    }

    return (
        <>
            <Modal show={showUpdatePhotoEstateModal} onHide={handleClose} size="l" backdrop="static" keyboard={false} centered>
                <>
                    <Formik
                        initialValues={{
                            file1: null,
                        }}
                        validationSchema={Yup.object({
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log('submit')
                            await new Promise(r => setTimeout(r, 500));
                            setSubmitting(false);
                            InsertImg(values);
                        }}
                    >
                        {({ handleChange, setFieldValue, errors }) => (
                            <Form id="pictureForm" encType="multipart/form-data">
                                <Modal.Header>
                                    <Modal.Title style={{ color: colors.secondary, fontWeight: "bold" }}>
                                        Ajouter une photo
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ModifSuccess className="text-center p-4 alert-success" id="addPhotoSuccess" />
                                    <ScrollDiv>
                                        <div className="row d-flex flex-column">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img height="150" width="150" id="file1" src={ApiRoutes.COVER_ESTATE_BASE_URL + "estate_default.jpg"} alt="house default" />
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <input
                                                    accept="image/*"
                                                    type='file'
                                                    name="file1"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setFieldValue("file1", e.currentTarget.files[0]);
                                                        ChangeImg(e.target);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </ScrollDiv>
                                </Modal.Body>
                                <Modal.Footer>
                                    <StyledBtnPrimary type="submit" className="btn m-3">Enregistrer</StyledBtnPrimary>
                                    <StyledBtnSecondary type="button" className="btn ms-3" onClick={handleClose}>
                                        Annuler
                                    </StyledBtnSecondary>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </>
            </Modal>
        </>
    )
};

export default ModalUpdatePhoto;