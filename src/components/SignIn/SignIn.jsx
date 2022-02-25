import React, { useContext } from 'react';
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import axios from 'axios';
import { Context } from "../../utils/context/Context";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { StyledBtnPrimary, StyledInput } from "../../utils/styles/Atoms";
import { useFormik } from "formik";
import * as Yup from "yup";

const ConnexionForm = styled.form`
    background-color: ${colors.backgroundPrimary};
    -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    -moz-box-shadow:    0px 3px 6px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`
const ConnexiontH1 = styled.h1`
    color: ${colors.secondary};
`
const ConnexionLabel = styled.label`
    color: ${colors.secondaryBtn};
`

const SignIn = () => {
    const API_URL = useContext(Context).apiUrl;
    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validationSchema: Yup.object({
            login: Yup.string()
                .required('Champ requis'),
            password: Yup.string()
                .required('Champ requis'),
        }),
        onSubmit: async (values) => {
            await new Promise(r => {
                login(values)
            })
        }
    })

    const login = (values) => {
        console.log(values);
        axios.post(API_URL + ApiRoutes.login, values)
            .then(res => {
                console.log(res.data)
                localStorage['token'] = res.data.token; // enregistrement du token dans le local storage
                localStorage['userId'] = res.data.user.id; // enregistrement de l'id user
                localStorage['userRole'] = res.data.user.id_role // enregisrtrement du role
                window.location.href = '/';
                // Redirection ??!
            }).catch(error => {
                console.log(error.message);
            })
    };

    return (
        <div className="container col-12 col-sm-10 col-md-8 col-lg-4 mx-auto mt-5">
            <ConnexionForm onSubmit={formik.handleSubmit} className="p-4 rounded">
                <ConnexiontH1 className="text-center">Connexion</ConnexiontH1>
                <div className="mb-3">
                    <ConnexionLabel htmlFor="login" className="form-label">Utilisateur</ConnexionLabel>
                    <StyledInput
                        id="login"
                        name="login"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.login}
                    />
                </div>
                {formik.errors.login ? <div style={{ color: "#E85A70", fontStyle: 'italic' }} className="mb-2">{formik.errors.login}</div> : null}

                <div className="mb-3">
                    <ConnexionLabel htmlFor="password" className="form-label">Mot de passe</ConnexionLabel>
                    <StyledInput
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </div>
                {formik.errors.password ? <div style={{ color: "#E85A70", fontStyle: 'italic' }} className="mb-2">{formik.errors.password}</div> : null}

                <StyledBtnPrimary type="submit" className="btn">Connexion</StyledBtnPrimary>
            </ConnexionForm>
        </div>
    );
};

export default SignIn;
