import React, {useContext, useState} from "react";
import {Formik, Field, Form, useField} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import axios from 'axios';
import ApiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";
import {StyledBtnPrimary, StyledInput} from "../../utils/styles/Atoms";

// Style du container
const AddEstateContainer = styled.div`

    margin-top: -80px;
    background-color: ${colors.backgroundPrimary};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    -moz-box-shadow:    0px 3px 6px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`
const AddEstateH1 = styled.h1`
    color: ${colors.secondary};
`
const AddEstateLabel = styled.label`
    color: ${colors.secondaryBtn};
`
const MyTextInput = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <div className="mb-3">
                <AddEstateLabel className="form-label">{label}</AddEstateLabel>
                <StyledInput className="text-input form-control" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error" style={{color: "#E85A70", fontStyle: 'italic'}}>{meta.error}</div>
                ) : null}
            </div>
        </>
    );
};

const AddEstateForm = () => {

    const API_URL = useContext(Context).apiUrl;
    const InsertEstate = (values) => {

        const title = values.title;
        const buy_or_rent = values.buy_or_rent;

        axios.post(API_URL + ApiRoutes.create_customer, {title, buy_or_rent})
            // axios.post("http://localhost:8000/customer/create", { title ,buy_or_rent})
            .then(res => {

                alert("vous etes inscrit !")// a changer
                // window.location.href = '/connexion';

            }).catch(error => {
                console.log(error.response);
        })
    }
    return (
        <>
            <AddEstateContainer className="container col-12 mx-auto p-3">
                <Formik
                    initialValues={{
                        id_estate_type: "7",
                        id_customer:1,
                            title:"",
                            buy_or_rent:"Achat",
                        address:"",
                        city:"",
                        zipcode:"",
                        estate_longitude:"",
                        estate_latitude:"",
                    }}
                    validationSchema={Yup.object({
                        buy_or_rent: Yup.string()
                            .required("Champs requis"),
                        title: Yup.string()
                            .max(50, "50 caractères maximum")
                            .required("Champs requis"),
                    })}
                    onSubmit={async (values, {setSubmitting}) => {
                        await new Promise(r => setTimeout(r, 500));
                        setSubmitting(false);
                        InsertEstate(values);
                    }}
                >
                    <div className="p-4 rounded">
                        <Form>
                            <AddEstateH1 className="text-center"> Ajouter un bien </AddEstateH1>
                            <AddEstateLabel className="form-label">Type de contrat</AddEstateLabel><br/>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label">
                                    <Field type="radio" className="form-check-input" name="buy_or_rent" value="Achat"/>
                                    Achat
                                </label>
                            </div>
                            <div class="form-check form-check-inline mb-4">
                                <label class="form-check-label">
                                    <Field type="radio" className="form-check-input" name="buy_or_rent" value="Location"/>
                                    Location
                                </label>
                            </div>
                            <MyTextInput
                                label="Titre"
                                name="title"
                                type="text"
                                placeholder=""
                            />
                            <StyledBtnPrimary type="submit" className="btn">Continuer</StyledBtnPrimary>
                        </Form>
                    </div>
                </Formik>
            </AddEstateContainer>
        </>
    );
};

export default AddEstateForm;