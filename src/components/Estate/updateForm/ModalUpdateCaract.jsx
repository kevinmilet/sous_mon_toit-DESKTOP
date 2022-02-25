import React, { useContext, useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import Loader from "../../Tools/Loader/Loader";
import axios from "axios";
import { Context } from "../../../utils/context/Context";
import apiRoutes from "../../../utils/const/ApiRoutes";
import { Field, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../../utils/styles/colors';
import { StyledBtnPrimary, StyledInput, StyledBtnSecondary } from "../../../utils/styles/Atoms";

const ScrollDiv = styled.div`
    height:70vh;
    padding:20px;
    overflow:auto
`

const H2 = styled.h2`
    color: ${colors.secondary};
    font-weight: bold;
`
const AddEstateH1 = styled.h1`
    color: ${colors.secondary};
`
const AddEstateH4 = styled.h4`
    color: ${colors.secondaryBtn};
`
const AddEstateLabel = styled.label`
    color: ${colors.secondary};
`
const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <div className="mb-3">
                <AddEstateLabel className="form-label">{label}</AddEstateLabel>
                <StyledInput className="text-input form-control" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error" style={{ color: "#E85A70", fontStyle: 'italic' }}>{meta.error}</div>
                ) : null}
            </div>
        </>
    );
};
const ModalUpdateCaract = ({ estateId, setShowUpdateCaractEstateModal, showUpdateCaractEstateModal }) => {

    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const handleClose = () => setShowUpdateCaractEstateModal(false);

    useEffect(() => {
        axios.get(API_URL + apiRoutes.estates + '/' + estateId).then(res => {
            setData(res.data)
        }).catch(error => {
            console.log(error.message);
        }).finally(() => {
            setLoading(false);
        });

    }, [API_URL, estateId]);

    // Insertion en bdd
    const UpdateEstate = (values) => {

        console.log(values);
        axios.put(API_URL + apiRoutes.update_estate + "/" + estateId + "/caract", values)
            // axios.put("http://localhost:8000/estates/update/" + id ,values)
            .then(res => {
                console.log(res.data)
                window.location.href = '/detail-biens/' + estateId;
            }).catch(error => {
                console.log(error.response);
            })
    }

    return (
        <>
            <Modal show={showUpdateCaractEstateModal} onHide={handleClose} size="l" backdrop="static" keyboard={false} centered>
                {(loading) ?
                    <Loader /> : (
                        <>

                            <Formik
                                initialValues={{
                                    nb_rooms: data.nb_rooms,
                                    nb_bedrooms: data.nb_bedrooms,
                                    nb_bathrooms: data.nb_bathrooms,
                                    nb_sanitary: data.nb_sanitary,
                                    nb_toilet: data.nb_toilet,
                                    nb_kitchen: data.nb_kitchen,
                                    nb_garage: data.nb_garage,
                                    nb_parking: data.nb_parking,
                                    nb_balcony: data.nb_balcony,
                                    type_kitchen: data.type_kitchen,
                                    heaters: data.heaters,
                                }}
                                validationSchema={Yup.object({

                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    await new Promise(r => setTimeout(r, 500));
                                    setSubmitting(false);
                                    UpdateEstate(values);
                                }}
                            >
                                {({ handleChange, values }) => (
                                    <Form>
                                        <Modal.Header>
                                            <Modal.Title style={{ color: colors.secondary, fontWeight: "bold" }}>
                                                Modifier les caractéristiques
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="row">
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Nombre de pièce"
                                                        name="nb_rooms"
                                                        type="number"
                                                    />
                                                    <MyTextInput
                                                        label="Nombre de salle de bain"
                                                        name="nb_bathrooms"
                                                        type="number"
                                                    />
                                                    <MyTextInput
                                                        label="Nombre de WC"
                                                        name="nb_toilet"
                                                        type="number"
                                                    />
                                                    <MyTextInput
                                                        label="Nombre de cuisine"
                                                        name="nb_kitchen"
                                                        type="number"
                                                    />
                                                    <MyTextInput
                                                        label="Nombre de garage"
                                                        name="nb_garage"
                                                        type="number"
                                                    />
                                                    <MyTextInput
                                                        label="Nombre de balcon"
                                                        name="nb_balcony"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Nombre de chambre"
                                                        name="nb_bedrooms"
                                                        type="number"
                                                    />
                                                    <MyTextInput
                                                        label="Nombre de sanitaire"
                                                        name="nb_sanitary"
                                                        type="number"
                                                    />
                                                    <MyTextInput
                                                        label="Type de chauffage"
                                                        name="heaters"
                                                        type="text"
                                                    />
                                                    <MyTextInput
                                                        label="Type de cuisine"
                                                        name="type_kitchen"
                                                        type="text"
                                                    />
                                                    <MyTextInput
                                                        label="Nombre de parking"
                                                        name="nb_parking"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div className='text-end'>
                                                <StyledBtnPrimary type="submit" className="btn">Enregistrer</StyledBtnPrimary>
                                                <StyledBtnSecondary type="button" className="btn ms-3" onClick={handleClose}>
                                                    Annuler
                                                </StyledBtnSecondary>
                                            </div>
                                        </Modal.Footer>
                                    </Form>
                                )}
                            </Formik>
                        </>
                    )}
            </Modal>
        </>
    )
};

export default ModalUpdateCaract;