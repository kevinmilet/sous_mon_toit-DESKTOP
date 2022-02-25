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
import { StyledBtnPrimary, StyledInput } from "../../../utils/styles/Atoms";

const ScrollDiv = styled.div`
    height:70vh;
    padding:20px;
    overflow:auto
`
const AddEstateH1 = styled.h1`
    color: ${colors.secondary};
`
const H2 = styled.h2`
    color: ${colors.secondary};
    font-weight: bold;
`
const AddEstateH4 = styled.h4`
    color: ${colors.secondaryBtn};
`
const AddEstateLabel = styled.label`
    color: ${colors.secondary};
`
const ModalUpdateEquipment = ({ estateId, setShowUpdateEquipEstateModal, showUpdateEquipEstateModal }) => {

    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const handleClose = () => setShowUpdateEquipEstateModal(false);

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
        axios.put(API_URL + apiRoutes.update_estate + "/" + estateId + "/equipment", values)
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
            <Modal show={showUpdateEquipEstateModal} onHide={handleClose} size="l" backdrop="static" keyboard={false} centered>
                {(loading) ?
                    <Loader /> : (
                        <>
                            <Modal.Body>
                                <Formik
                                    initialValues={{

                                        communal_heating: data.communal_heating,
                                        furnished: data.furnished,
                                        private_parking: data.private_parking,
                                        handicap_access: data.handicap_access,
                                        cellar: data.cellar,
                                        terrace: data.terrace,
                                        swimming_pool: data.swimming_pool,
                                        fireplace: data.fireplace,
                                        all_in_sewer: data.all_in_sewer,
                                        septik_tank: data.septik_tank,
                                        attic: data.attic,
                                        elevator: data.elevator,

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
                                            <div className="row">
                                                <div className='text-center mb-3'>
                                                    <H2>Modifier les équipements</H2>
                                                </div>
                                                <div className="p-4 col-12">
                                                    {/* <AddEstateH4>Equipement</AddEstateH4> */}
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Chauffage collectif</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="communal_heating" value="1" checked={values.communal_heating == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="communal_heating" value="0" checked={values.communal_heating == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Meublé</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="furnished" value="1" checked={values.furnished == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="furnished" value="0" checked={values.furnished == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Parking privé</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="private_parking" value="1" checked={values.private_parking == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="private_parking" value="0" checked={values.private_parking == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Accès handicapé</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="handicap_access" value="1" checked={values.handicap_access == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="handicap_access" value="0" checked={values.handicap_access == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Cave</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="cellar" value="1" checked={values.cellar == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="cellar" value="0" checked={values.cellar == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Terrace</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="terrace" value="1" checked={values.terrace == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="terrace" value="0" checked={values.terrace == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Piscine</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="swimming_pool" value="1" checked={values.swimming_pool == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="swimming_pool" value="0" checked={values.swimming_pool == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Cheminée</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="fireplace" value="1" checked={values.fireplace == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="fireplace" value="0" checked={values.fireplace == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Tout à l'égout</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="all_in_sewer" value="1" checked={values.all_in_sewer == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="all_in_sewer" value="0" checked={values.all_in_sewer == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Fosse Septique</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="septik_tank" value="1" checked={values.septik_tank == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="septik_tank" value="0" checked={values.septik_tank == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Grenier</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="attic" value="1" checked={values.attic == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="attic" value="0" checked={values.attic == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <AddEstateLabel className="form-label">Ascensseur</AddEstateLabel><br />
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="elevator" value="1" checked={values.elevator == 1}/>
                                                                        Oui
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline mb-4">
                                                                    <label className="form-check-label">
                                                                        <Field type="radio" className="form-check-input" name="elevator" value="0" checked={values.elevator == 0}/>
                                                                        Non
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-end m-3'>
                                                <StyledBtnPrimary type="submit" className="btn">Enregistrer les informations</StyledBtnPrimary>
                                                <button type="button" className="btn mx-3" onClick={handleClose}>
                                                    Annuler
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Modal.Body>
                        </>
                    )}
            </Modal>
        </>
    )
};

export default ModalUpdateEquipment;