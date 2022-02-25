import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../utils/context/Context";
import ApiRoutes from "../../utils/const/ApiRoutes";
import axios from "axios";
import styled from "styled-components";
import Loader from "../Tools/Loader/Loader";
import colors from "../../utils/styles/colors";
import avatarDefault from "../../assets/img/user_default.png";
import {StyledBtnSecondary, StyledInput, StyledSelect} from "../../utils/styles/Atoms";
import * as Yup from "yup";
import {Formik} from "formik";

const MainContainer = styled.div`
    min-height: 550px;
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

const AvatarImg = styled.img`
    margin: 2rem;
    width: 200px;
    height: 200px;
    border-radius: 50%;
`

const Title = styled.h2`
    font-weight: 700;
    color: ${colors.primary};
    margin: 4rem 1rem .5rem .5rem;
`

const Label = styled.label`
    font-weight: 700;
    color: ${colors.primary};
    margin-bottom: 5px;
    margin-left: 10px;
`

const Icon = styled.i`
    color: ${colors.primaryBtn};
    font-size: 22px
`

const Button = styled.button`
    border: none;
    background-color: ${colors.backgroundPrimary}
`

const StaffDetails = () => {
    const {id} = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    const [functionList, setFunctionList] = useState({});
    const [roleList, setRoleList] = useState({});
    const API_URL = useContext(Context).apiUrl;

    useEffect(() => {
        // Get staff member datas
        axios.get(API_URL + ApiRoutes.staff + '/' + id).then(res => {
            setData(res.data);
        }).catch(e => {
            console.log(e.message);
        }).finally(() => {
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
        })
    }, [API_URL, id]);

    const toLocation = () => {
        window.location.href = '/staff/';
    }

    const onEdit = () => {
        let inputs = document.getElementsByClassName('edit');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
        document.querySelector('.edit-link').style.display = 'inline-block';
    }

    const onCancel = () => {
        let inputs = document.getElementsByClassName('edit');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
        document.querySelector('.edit-link').style.display = 'none';
    }

    const updateStaffMember = (values) => {
        axios.post(
            API_URL +
            ApiRoutes.staff_update +
            `/${id}?lastname=${values.lastname}&firstname=${values.firstname}&mail=${values.mail}&phone=${values.phone}&id_role=${values.id_role}&id_function=${values.id_function}`).then(res => {
                if (res.status === 200) {
                    alert('Collaborateur modifié')
                    toLocation();
                } else {
                    alert('L\'utilisateur n\'a pas été modifé');
                }
        }).catch(e => {
            console.log(e.message);
        })

    }

    const deleteStaff = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Voulez-vous vraiment supprimer ce membre du personel?')) {
            axios.delete(API_URL + ApiRoutes.staff_delete + '/' + id).then(res => {
                console.log(res.status);
                alert('Membre du personel supprimé');
                toLocation();
            }).catch(e => {
                console.error(e.message)
                alert('Le membre du personel n\'a pas pu être supprimé');
            })
        }
    }

    return (
        loading ?
            <Loader/>
            : (
                <MainContainer>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            lastname: data.lastname ?? '',
                            firstname: data.firstname ?? '',
                            mail: data.mail ?? '',
                            phone: data.phone ?? '',
                            id_role: data.id_role ?? '',
                            id_function: data.id_function ?? '',
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
                                console.log(data);
                                updateStaffMember(data);
                            })
                        }}
                    >
                        {({
                              handleChange,
                              handleSubmit,
                              values,
                              errors
                          }) => (
                            <form>
                                <div className="row">
                                    <div className="col-3">
                                        <AvatarImg src={ApiRoutes.AVATAR_BASE_URL + data.avatar ?? avatarDefault}
                                                   alt={data.avatar ?? avatarDefault}/>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <Title>{data.firstname} {data.lastname}</Title>
                                        </div>
                                        <div className="row">
                                            <div className="col m-3">
                                                <Label>Prénom</Label>
                                                <StyledInput type="text"
                                                             id="firstname"
                                                             name="firstname"
                                                             className="form-control edit"
                                                             value={values.firstname}
                                                             onChange={handleChange}
                                                             disabled
                                                />
                                                <div className="error mt-2" style={{
                                                    color: "#E85A70",
                                                    fontStyle: 'italic'
                                                }}>{errors.firstname ?? null}</div>
                                            </div>
                                            <div className="col m-3">
                                                <Label>Nom</Label>
                                                <StyledInput type="text"
                                                             id="lastname"
                                                             name="lastname"
                                                             className="form-control edit"
                                                             value={values.lastname}
                                                             onChange={handleChange}
                                                             disabled
                                                />
                                                <div className="error mt-2" style={{
                                                    color: "#E85A70",
                                                    fontStyle: 'italic'
                                                }}>{errors.lastname ?? null}</div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col m-3">
                                                <Label>Email</Label>
                                                <StyledInput type="email"
                                                             id="mail"
                                                             name="mail"
                                                             className="form-control edit"
                                                             value={values.mail}
                                                             onChange={handleChange}
                                                             disabled
                                                />
                                                <div className="error mt-2" style={{
                                                    color: "#E85A70",
                                                    fontStyle: 'italic'
                                                }}>{errors.mail ?? null}</div>
                                            </div>
                                            <div className="col m-3">
                                                <Label>Téléphone</Label>
                                                <StyledInput type="text"
                                                             id="phonne"
                                                             name="phone"
                                                             className="form-control edit"
                                                             min="10"
                                                             max="14"
                                                             value={values.phone}
                                                             onChange={handleChange}
                                                             disabled
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
                                                <StyledSelect className="form-select edit" id="id_function"
                                                              name="id_function"
                                                              onChange={handleChange}
                                                              disabled
                                                >
                                                    {functionList?.map(item => (
                                                        <option value={item.id} key={item.id}
                                                                selected={item.id === values.id_function}>
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
                                                <StyledSelect className="form-select edit" id="id_role"
                                                              name="id_role"
                                                              onChange={handleChange}
                                                              disabled
                                                >
                                                    {roleList?.map(item => (
                                                        <option value={item.id} key={item.id}
                                                                selected={item.id === values.id_role}>
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
                                </div>

                                <div className="row m-3">
                                    <div className="col text-start mx-3">
                                        <span>
                                            <Button type="button" onClick={() => deleteStaff(data.id)}>
                                                <Icon className="far fa-trash-alt m-2"/>
                                            </Button>
                                            <Button type="button" onClick={() => onEdit()}>
                                                <Icon className="far fa-edit m-2"/>
                                            </Button>
                                        </span>
                                        <span className="edit-link" style={{display: 'none'}}>
                                            <Button variant="link"
                                                    style={{color: "#4EA1D5", fontWeight: 700}}
                                                    type="button" onClick={() => onCancel()}>
                                            Annuler
                                            </Button>
                                            <Button variant="link"
                                                    style={{color: "#4EA1D5", fontWeight: 700}}
                                                    type="submit" onClick={handleSubmit}>
                                            Sauvegarder
                                            </Button>
                                        </span>
                                    </div>
                                    <div className='col text-end mx-3'>
                                        <StyledBtnSecondary type="button" className="mx-3"
                                                            onClick={() => toLocation()}>
                                            Annuler
                                        </StyledBtnSecondary>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </MainContainer>
            )
    );
};

export default StaffDetails;
