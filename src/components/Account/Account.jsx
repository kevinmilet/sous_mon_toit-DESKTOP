import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../utils/context/Context";
import {useParams} from "react-router-dom";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import Loader from "../Tools/Loader/Loader";
import {Formik} from "formik";
import * as Yup from "yup";
import avatarDefault from "../../assets/img/user_default.png";
import {StyledInput} from "../../utils/styles/Atoms";
import styled from "styled-components";
import colors from "../../utils/styles/colors";

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
const ImgContainer = styled.div`
    position: relative;
    width: 50%;
    margin: 2rem;
    &:hover .img {
        opacity: 0.3;
    }
    &:hover .overlay {
        opacity: 1;
    }
`

const AvatarImg = styled.img`
    opacity: 1;
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transition: .5s ease;
    backface-visibility: hidden;
`

const Overlay = styled.div`
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    // text-align: center;
`

const OverlayImg = styled.img`
    // padding: 16px 32px;
    width: 200px;
    height: 200px;
`

const Title = styled.h2`
    font-weight: 700;
    color: ${colors.primary};
    margin: 4rem 1rem .5rem .5rem;
`

const Login = styled.h5`
    margin: 1rem 1rem 1.5rem .5rem;
    font-weight: 700;
    color: ${colors.primary};
`

const Span = styled.span`
    font-weight: 400;
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

const Account = () => {
    const {id} = useParams();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    const API_URL = useContext(Context).apiUrl;

    useEffect(() => {
        axios.get(API_URL + ApiRoutes.staff + '/' + id).then(res => {
            setData(res.data);
        }).catch(e => {
            console.log(e.message);
        }).finally(() => {
            setLoading(false);
        })

    }, [API_URL, id]);
    
    return (

        loading ?
            <Loader/>
            : (
                <MainContainer>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            mail: data.mail ?? '',
                            phone: data.phone ?? '',
                        }}
                        validationSchema={Yup.object({
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
                                console.log(values);
                                //updateAccount(values);
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
                                        <ImgContainer>
                                            <AvatarImg className="img" src={ApiRoutes.AVATAR_BASE_URL + data.avatar ?? avatarDefault}
                                                       alt={data.avatar ?? avatarDefault}/>
                                            <Overlay className="overlay">
                                                <OverlayImg src={avatarDefault}/>
                                            </Overlay>
                                        </ImgContainer>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <Title>{data.firstname} {data.lastname}</Title>
                                        </div>
                                        <div className="row">
                                            <Login>Login: <Span>{data.login}</Span></Login>
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
                                                />
                                                <div className="error mt-2" style={{
                                                    color: "#E85A70",
                                                    fontStyle: 'italic'
                                                }}>{errors.phone ?? null}</div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col m-3">
                                                <Label>Mot de passe</Label>
                                                <StyledInput type="password"
                                                             id="password"
                                                             name="password"
                                                             className="form-control edit"
                                                             value={values.firstname}
                                                             onChange={handleChange}
                                                />
                                                <div className="error mt-2" style={{
                                                    color: "#E85A70",
                                                    fontStyle: 'italic'
                                                }}>{errors.password ?? null}</div>
                                            </div>
                                            <div className="col m-3">
                                                <Label>Confirmation</Label>
                                                <StyledInput type="password"
                                                             id="password_confirm"
                                                             name="password_confirm"
                                                             className="form-control edit"
                                                             value={values.lastname}
                                                             onChange={handleChange}
                                                />
                                                <div className="error mt-2" style={{
                                                    color: "#E85A70",
                                                    fontStyle: 'italic'
                                                }}>{errors.password_confirm ?? null}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="row m-3">*/}
                                {/*    <div className="col text-start mx-3">*/}
                                {/*        <span>*/}
                                {/*            <Button onClick={() => deleteStaff(data.id)}>*/}
                                {/*                <Icon className="far fa-trash-alt m-2"/>*/}
                                {/*            </Button>*/}
                                {/*            <Button type="button" onClick={() => onEdit()}>*/}
                                {/*                <Icon className="far fa-edit m-2"/>*/}
                                {/*            </Button>*/}
                                {/*        </span>*/}
                                {/*        <span className="edit-link" style={{display: 'none'}}>*/}
                                {/*            <Button variant="link"*/}
                                {/*                    style={{color: "#4EA1D5", fontWeight: 700}}*/}
                                {/*                    onClick={() => onCancel()}>*/}
                                {/*            Annuler*/}
                                {/*            </Button>*/}
                                {/*            <Button variant="link"*/}
                                {/*                    style={{color: "#4EA1D5", fontWeight: 700}}*/}
                                {/*                    type="submit" onClick={handleSubmit}>*/}
                                {/*            Sauvegarder*/}
                                {/*            </Button>*/}
                                {/*        </span>*/}
                                {/*    </div>*/}
                                {/*    <div className='col text-end mx-3'>*/}
                                {/*        <StyledBtnSecondary type="button" className="mx-3"*/}
                                {/*                            onClick={() => toLocation()}>*/}
                                {/*            Annuler*/}
                                {/*        </StyledBtnSecondary>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </form>
                        )}
                    </Formik>
                </MainContainer>
            )
    );
};

export default Account;
