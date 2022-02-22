import React, {useContext} from 'react';
import {StyledBtnPrimary, StyledInput} from "../../utils/styles/Atoms";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import {Formik} from "formik";
import * as Yup from "yup";
import API_URL from "../../utils/const/ApiRoutes";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";

const FormContainer = styled.div`
    margin: 1rem 4rem 3rem 4rem
`

const Label = styled.label`
    font-weight: 700;
    color: ${colors.primary};
    margin-bottom: 5px;
    margin-left: 10px;
`

const UpdateStaff = ({data}) => {
    const API_URL = useContext(Context).apiUrl;
    const staffItem = data.data;

    const updateStaffMember = (values) => {
        // TODO corriger la méthode dans l'api
        axios.put(
            // API_URL +
            'http://localhost:8000/' +
            ApiRoutes.staff_update +
            `/${values.id}?lastname=${values.lastname}&firstname=${values.firstname}&mail=${values.mail}&phone=${values.phone}`).then(res => {
                alert('Collaborateur modifié')
        }).catch(e => {
            console.log(e.message);
        })

    }

    return (
        <FormContainer>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: staffItem.id,
                    lastname: staffItem.lastname,
                    firstname: staffItem.firstname,
                    mail: staffItem.mail,
                    phone: staffItem.phone
                }}
                validationSchema={Yup.object({
                    lastname: Yup.string()
                        .trim('Le nom ne doit pas comporter d\'espace avant ou après')
                        .matches(/^[A-Za-zéèêàâ\s\-']+$/, 'Le format du nom est incorrect')
                        .required('Le nom est obligatoire'),
                    firstname: Yup.string()
                        .trim('Le prénom ne doit pas comporter d\'espace avant ou après')
                        .matches(/^[A-Za-zéèêàâ\s\-']+$/, 'Le format du prénom est incorrect')
                        .required('Le prénom est obligatoire'),
                    mail: Yup.string()
                        .trim('L\'email ne doit pas comporter d\'espace avant ou après')
                        .email('Le format de l\'email est incorrecte')
                        .required('L\'email est obligatoire'),
                    phone: Yup.string()
                        .trim('Le téléphone ne doit pas comporter d\'espace avant ou après')
                        .min(10, 'Le téléphone doit comporter au moins 10 chiffres')
                        .max(14, 'Le téléphone doit comporter au maximum 14 charactères')
                        .matches(/^[0-9\s\-.]{10,14}$/, 'Le format du téléphone est incorrect')
                        .required('Le numéro de téléphone est obligatoire'),

                })}
                onSubmit={async (values) => {
                    await new Promise(r => {
                        updateStaffMember(values);
                    })
                }}
            >
                {({
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                      values,
                      errors
                  }) => (
                <form>
                    <div className="row">
                        <div className="col m-3">
                            <Label>Prénom</Label>
                            <StyledInput type="text"
                                         id="firstname"
                                         name="firstname"
                                         className="form-control"
                                         value={values.firstname}
                                         onChange={handleChange}
                            />
                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.firstname ?? null}</div>
                        </div>

                        <div className="col m-3">
                            <Label>Nom</Label>
                            <StyledInput type="text"
                                         id="lastname"
                                         name="lastname"
                                         className="form-control"
                                         value={values.lastname}
                                         onChange={handleChange}
                            />
                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.lastname ?? null}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-3">
                            <Label>Email</Label>
                            <StyledInput type="email"
                                         id="mail"
                                         name="mail"
                                         className="form-control"
                                         value={values.mail}
                                         onChange={handleChange}
                            />
                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.mail ?? null}</div>
                        </div>

                        <div className="col m-3">
                            <Label>Téléphone</Label>
                            <StyledInput type="text"
                                         id="phone"
                                         name="phone"
                                         minlength="10"
                                         maxlength="14"
                                         className="form-control"
                                         value={values.phone}
                                         onChange={handleChange}
                            />
                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.phone ?? null}</div>
                        </div>
                    </div>

                    <StyledBtnPrimary type="submit" onClick={handleSubmit}>
                        Sauvegarder
                    </StyledBtnPrimary>
                </form>)}
            </Formik>
        </FormContainer>
    );
};

export default UpdateStaff;
