import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Context} from "../../utils/context/Context";
import {StyledBtnPrimary, StyledBtnSecondary, StyledInput, StyledSelect} from "../../utils/styles/Atoms";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import Loader from "../Tools/Loader/Loader";

const FormContainer = styled.div`
    margin: 1rem 4rem 3rem 4rem
`

const Label = styled.label`
    font-weight: 700;
    color: ${colors.primary};
    margin-bottom: 5px;
    margin-left: 10px;
`

const AddStaffMember = ({showAddStaffModal, setShowAddStaffModal}) => {
    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [functionList, setFunctionList] = useState({});
    const [roleList, setRoleList] = useState({});
    const [tmpPwd, setTmpPwd] = useState('');
    const handleClose = () => setShowAddStaffModal(false);

    useEffect(() => {
        // Get functions list
        axios.get(API_URL + ApiRoutes.functions).then(res => {
            setFunctionList(res.data);
        }).catch(e => {
            console.log(e.message);
        }).finally(() => {
            // Get Roles list
            axios.get(API_URL + ApiRoutes.roles).then(res => {
                setRoleList(res.data);
            }).catch(e => {
                console.log(e.message);
            }).finally(() => {
                setLoading(false);
            })
        })
    }, [API_URL]);

    const createStaffMember = (data) => {
        // axios.post('http://localhost:8000/' + ApiRoutes.staff_create, data).then(res => {
        axios.post(API_URL + ApiRoutes.staff_create, data).then(res => {
            console.log(res)
            // console.log(res.data);
            alert('Collaborateur enregistré. Voici le mot de passe provisoire. Pensez à le changer : ' + res.data.tmp_pwd);
            setTmpPwd(res.data.tmp_pwd);
            // à changer
            window.location.reload();
        }).catch(e => {
            console.log(e.message)
        })
        setShowAddStaffModal(false)
    }
console.log('PWD', tmpPwd);
    return (
        <div>
            <>
                <Modal show={showAddStaffModal} onHide={handleClose} size="xl" backdrop="static" keyboard={false}
                       centered>
                    {loading ?
                        <Loader/> : (
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    lastname: '',
                                    firstname: '',
                                    mail: '',
                                    phone: '',
                                    id_role: '',
                                    id_function: '',
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
                                    id_role: Yup.string()
                                        .required('Le role est obligatoire'),
                                    id_function: Yup.string()
                                        .required('La fonction est obligatoire')
                                })}
                                onSubmit={async (values) => {
                                    const idRole = ~~values.role;
                                    const idFunction = ~~values.function;
                                    let data = {
                                        ...values, role: idRole, function: idFunction
                                    }
                                    await new Promise(r => {
                                        createStaffMember(data);
                                    })
                                }}
                            >
                                {({
                                      handleChange,
                                      handleSubmit,
                                      values,
                                      errors
                                  }) => (
                                    <Modal.Body>
                                        <div className='text-center mb-3'>
                                            <h2>Ajouter un collaborateur</h2>
                                        </div>
                                        <FormContainer>
                                            <form>
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col m-3">
                                                            <Label>Nom</Label>
                                                            <StyledInput type="text"
                                                                         id="lastname"
                                                                         name="lastname"
                                                                         className="form-control"
                                                                         value={values.lastname}
                                                                         onChange={handleChange}
                                                            />
                                                            <div className="error mt-2" style={{
                                                                color: "#E85A70",
                                                                fontStyle: 'italic'
                                                            }}>{errors.lastname ?? null}</div>
                                                        </div>
                                                        <div className="col m-3">
                                                            <Label>Prénom</Label>
                                                            <StyledInput type="text"
                                                                         id="firstname"
                                                                         name="firstname"
                                                                         className="form-control"
                                                                         value={values.firstname}
                                                                         onChange={handleChange}
                                                            />
                                                            <div className="error mt-2" style={{
                                                                color: "#E85A70",
                                                                fontStyle: 'italic'
                                                            }}>{errors.firstname ?? null}</div>
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
                                                            <div className="error mt-2" style={{
                                                                color: "#E85A70",
                                                                fontStyle: 'italic'
                                                            }}>{errors.mail ?? null}</div>
                                                        </div>

                                                        <div className="col m-3">
                                                            <Label>Téléphone</Label>
                                                            <StyledInput type="text"
                                                                         id="phone"
                                                                         name="phone"
                                                                         className="form-control"
                                                                         min="10"
                                                                         max="14"
                                                                         value={values.phone}
                                                                         onChange={handleChange}
                                                            />
                                                            <div className="error mt-2" style={{
                                                                color: "#E85A70",
                                                                fontStyle: 'italic'
                                                            }}>{errors.phone ?? null}</div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m-3">
                                                            <Label>Fonction</Label>
                                                            <StyledSelect className="form-select" id="id_function"
                                                                          name="id_function"
                                                                          onChange={handleChange}
                                                            >
                                                                <option selected value=""/>
                                                                {functionList?.map(item => (
                                                                    <option value={item.id} key={item.id}>
                                                                        {item.function_name}
                                                                    </option>))}
                                                            </StyledSelect>
                                                            <div className="error mt-2" style={{
                                                                color: "#E85A70",
                                                                fontStyle: 'italic'
                                                            }}>{errors.id_function ?? null}</div>
                                                        </div>

                                                        <div className="col m-3">
                                                            <Label>Rôle</Label>
                                                            <StyledSelect className="form-select" id="id_role"
                                                                          name="id_role"
                                                                          onChange={handleChange}
                                                            >
                                                                <option selected value=""/>
                                                                {roleList?.map(item => (
                                                                    <option value={item.id} key={item.id}>
                                                                        {item.role}
                                                                    </option>))}
                                                            </StyledSelect>
                                                            <div className="error mt-2" style={{
                                                                color: "#E85A70",
                                                                fontStyle: 'italic'
                                                            }}>{errors.id_role ?? null}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className='text-end m-3'>
                                                <StyledBtnSecondary type="button" className="mx-3"
                                                                    onClick={handleClose}>
                                                    Fermer
                                                </StyledBtnSecondary>
                                                <StyledBtnPrimary type="submit" onClick={handleSubmit}>
                                                    Valider
                                                </StyledBtnPrimary>
                                            </div>
                                        </FormContainer>
                                    </Modal.Body>
                                )}
                            </Formik>
                        )}
                </Modal>
            </>
        </div>
    );
};

export default AddStaffMember;
