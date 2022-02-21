import React, { useContext, useState, useEffect } from "react";
import { Formik, Field, Form, useField, isEmptyArray } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import axios from 'axios';
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import { StyledBtnPrimary, StyledInput } from "../../utils/styles/Atoms";
import { useParams } from 'react-router-dom';

// Style du container
const AddEstateContainer = styled.div`

    margin-top: -100px;
    background-color: ${colors.backgroundPrimary};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    -moz-box-shadow:    0px 3px 6px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`
const ScrollDiv = styled.div`
    height:70vh;
    padding:20px;
    overflow:auto
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

const AddEstateFormStep3 = () => {

    const { id } = useParams();
    const API_URL = useContext(Context).apiUrl;

    // Insertion en bdd
    const UpdateEstate = (values) => {

        console.log(values);
        // axios.post(API_URL + ApiRoutes.update_estate, values)
        axios.put("http://localhost:8000/estates/update/" + id ,values)
        .then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error.response);
        })
    }

    return (
        <>
            <AddEstateContainer className="container col-12 mx-auto p-3">
                <AddEstateH1 className="mx-auto p-2"> Ajouter un bien </AddEstateH1>
                <Formik
                    initialValues={{
                        
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
                        <ScrollDiv>
                            <Form>
                                <p>Les informations ont étaient enregistrés, vous pouvez ajouter les photos ultérieurement.</p>
                                <input type="file" />
                                <StyledBtnPrimary type="submit" className="btn">Enregistrer les informations</StyledBtnPrimary>
                            </Form>
                        </ScrollDiv>
                    )}
                </Formik>
            </AddEstateContainer>
        </>
    );
};

export default AddEstateFormStep3;