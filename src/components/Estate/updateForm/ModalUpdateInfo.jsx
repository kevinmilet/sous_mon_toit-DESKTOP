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
const Option = styled.option`
    color: ${colors.secondaryBtn};
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
const ModalUpdateInfo = ({ estateId, setShowUpdateInfoEstateModal, showUpdateInfoEstateModal }) => {

    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const handleClose = () => setShowUpdateInfoEstateModal(false);
    const [estatesTypes, setEstatesTypes] = useState({});


    useEffect(() => {
        axios.get(API_URL + apiRoutes.estates + '/' + estateId)
            .then(res => {
                setData(res.data)
            }).catch(error => {
                console.log(error.message);
            }).finally(() => {
                // Récupération des types de biens
                axios.get(API_URL + apiRoutes.estates_types)
                    .then(response => {
                        setEstatesTypes(response.data);
                    }).catch(error => {
                        console.log(error.message)
                    }).finally(() => {
                        setLoading(false);
                    })
            });


    }, [API_URL, estateId]);

    // Insertion en bdd
    const UpdateEstate = (values) => {

        console.log(values);
        axios.put(API_URL + apiRoutes.update_estate + "/" + estateId + "/info", values)
            // axios.put("http://localhost:8000/estates/update/" + id ,values)
            .then(res => {
                console.log(res.data);
                window.location.href = '/detail-biens/' + estateId;

            }).catch(error => {
                console.log(error.response);
            })
    }

    return (
        <>
            <Modal show={showUpdateInfoEstateModal} onHide={handleClose} size="xl" backdrop="static" keyboard={false} centered>
                {(loading) ?
                    <Loader /> : (
                        <>
                            <Modal.Body>
                                <Formik
                                    initialValues={{
                                        buy_or_rent: data.buy_or_rent,
                                        title: data.title,
                                        id_estate_type: data.id_estate_type,
                                        price: data.price,
                                        description: data.description,
                                        disponibility: data.disponibility,
                                        year_of_construction: data.year_of_construction.substring(0, 4),
                                        living_surface: data.living_surface,
                                        carrez_law: data.carrez_law,
                                        land_surface: data.land_surface,
                                        property_charge: data.property_charge,
                                        rental_charge: data.rental_charge,
                                        coownership_charge: data.coownership_charge,
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
                                            <div className='text-center mb-3'>
                                                <H2>Modifier les informations</H2>
                                            </div>
                                            <div className="row">
                                                <MyTextInput
                                                    label="Titre"
                                                    name="title"
                                                    type="text"
                                                    placeholder=""
                                                />
                                                <div className="col-6">
                                                    <AddEstateLabel className="form-label">Type de bien </AddEstateLabel><br />
                                                    <div className="">
                                                        <select name="id_estate_type"
                                                            style={{ borderRadius: "50px", border: "2px solid" + colors.secondaryBtn }}
                                                            id="id_estate_type"
                                                            value={values.id_estate_type}
                                                            className="form-select"
                                                            onChange={handleChange}
                                                        >
                                                            {!loading && estatesTypes.map(item => (
                                                                <Option value={item.id} key={item.id} >{item.estate_type_name}</Option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <AddEstateLabel className="form-label">Type de contrat</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="buy_or_rent" value="Achat" />
                                                            Achat
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="buy_or_rent" value="Location" />
                                                            Location
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className=" col-12">
                                                    {/* <AddEstateH4>Informations Général</AddEstateH4> */}
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Prix"
                                                                name="price"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Date de construction"
                                                                name="year_of_construction"
                                                                type="number"
                                                                min="1800"
                                                                max="2099"
                                                                step="1"
                                                            />
                                                        </div>
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Disponibilité"
                                                                name="disponibility"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <MyTextInput
                                                        label="Description"
                                                        name="description"
                                                        type="text"
                                                    />
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Taxe foncière"
                                                                name="property_charge"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Charges locatives"
                                                                name="rental_charge"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Charges de co-propriété"
                                                                name="coownership_charge"
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Surface"
                                                                name="living_surface"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Surface ( loi Carrez )"
                                                                name="carrez_law"
                                                                type="number"
                                                            />
                                                        </div>
                                                        <div className="col-4">
                                                            <MyTextInput
                                                                label="Surface du terrain"
                                                                name="land_surface"
                                                                type="number"
                                                            />
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

export default ModalUpdateInfo;