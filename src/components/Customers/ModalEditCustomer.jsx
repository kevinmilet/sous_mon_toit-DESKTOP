import React, {useContext, useEffect, useState} from "react";
import "../../utils/styles/modal.css";
import {Modal, Stack} from "react-bootstrap";
import {StyledBtnPrimary, StyledBtnSecondary, StyledInput, StyledTextarea} from "../../utils/styles/Atoms";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import axios from "axios";
import {Context} from "../../utils/context/Context";
import Loader from "../Tools/Loader/Loader";
import {Formik} from "formik";
import * as Yup from "yup";
import {useParams} from 'react-router-dom';

const Label = styled.label`
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 5px;
  margin-left: 10px;
`;

const ModalCreateCustomer = ({ openModalEditCustomer, setOpenModalEditCustomer, infos }) => {
    const [customerData, setCustomerData] = useState({});
    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [errorMail, setErrorMail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [text, setText] = useState("");
    const [searchResult, setSearchResult] = useState();
    const { id } = useParams();
    const [value, onChange] = useState(new Date());



    const editCustomer = values => {
        console.log(customerData.gender);
       
        const gender = customerData.gender;
        const firstname = values.firstname;
        const lastname = values.lastname;
        const mail = values.mail;
        const phone = values.phone;
        const address = values.address;
        const first_met = false;
        const birthdate = values.birthdate;

        let datas = {};


        if (values.mail == customerData.mail) {
            datas = { gender, firstname, lastname, phone, first_met , birthdate};
        } else {
            datas = { gender, firstname, lastname, phone, first_met, mail, birthdate };
        }

        axios.put(API_URL + "customer/s/update/" + id, datas)

            .then(res => {
                setOpenModalEditCustomer(false);
                alert("Profil modifié!");
                window.location.reload(false);

            }).catch(error => {
                if (error.response.data.mail && error.response.data.mail[0] === "The mail has already been taken.") {
                    setErrorMail("Cette adresse mail est déja prise.");
                }
                if (error.response.data.password && error.response.data.password[0] === "The password format is invalid.") {
                    setErrorPassword("Le mot de passe doit comporter au minimum 8 caractères (dont masjuscule, minuscule , chiffre et caractères spéciaux).");
                }
            });
    };

    useEffect(() => {
        axios.get(
            API_URL + "customer/s/" + id
        )
            .then((res) => {
                setCustomerData(res.data);
                console.log(res.data);

            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        loading ? <Loader /> :
            <Modal show={openModalEditCustomer} backdrop="static" keyboard={false} centered="centered">
                <div className="text-center mb-3">
                    <h2>Modification fiche client</h2>
                </div>
                <Modal.Body >

                    <Formik initialValues={{
                        lastname: customerData.lastname,
                        firstname: customerData.firstname,
                        mail: customerData.mail,
                        phone: customerData.phone,
                        address: customerData.address,
                        birthdate: customerData.birthdate
                    }}
                        validationSchema={Yup.object({

                            firstname: Yup.string()
                                .max(15, "15 caractères maximum")
                                .required("Champs requis"),
                            lastname: Yup.string()
                                .max(20, "20 caractères maximum")
                                .required("Champs requis"),
                            mail: Yup.string()
                                .email("Adresse mail invalide")
                                .required("Champs requis"),
                            phone: Yup.string()
                                .max(14, "14 caractères maximum"),
                            address: Yup.string()
                                .max(500, "14 caractères maximum"),
                            birthdate: Yup.date()    
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                editCustomer(values);
                                setSubmitting(false);
                            }, 1000);
                        }}>
                        {
                            props => (
                                <form onSubmit={props.handleSubmit}>
                                    <div className="my-2">
                                        <Label className="col-12">Nom
                                        </Label>{" "}
                                        <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.lastname} name="lastname" />
                                        {props.errors.lastname && (<div id="feedback" className="text-danger">{props.errors.lastname}</div>)}
                                    </div>
                                    
                                    <div className="my-2">
                                        <Label className="col-12">Prénom
                                        </Label>{" "}
                                        <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.firstname} name="firstname" />
                                        {props.errors.firstname && (<div id="feedback" className="text-danger">{props.errors.firstname}</div>)}
                                    </div>
                                    <div className="my-2">
                                        <Label className="col-12">Mail
                                        </Label>{" "}

                                        <StyledInput type="mail" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.mail} name="mail" />
                                        {props.errors.mail && (<div id="feedback" className="text-danger">{props.errors.mail}</div>)}
                                    </div>
                                    
                                    <div className="my-2">
                                        <Label className="col-12">Date de naissance
                                        </Label>{" "}
                                        <StyledInput type="date" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.birthdate} name="birthdate" />
                                        {props.errors.birthdate && (<div id="feedback" className="text-danger">{props.errors.birthdate}</div>)}
                                    </div>
         
                                    <div className="my-2">
                                        <Label className="col-12">Tel
                                        </Label>{" "}
                                        <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.phone} name="phone" />
                                        {props.errors.phone && (<div id="feedback" className="text-danger">{props.errors.phone}</div>)}
                                    </div>
                                    <div className="my-2">
                                        <Label className="col-12">Addresse compléte 
                                        </Label>{" "}
                                        <StyledTextarea type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.address} name="address" />
                                        {props.errors.address && (<div id="feedback" className="text-danger">{props.errors.address}</div>)}
                                    </div>
                                    <Stack direction="horizontal" gap={2}>
                                        <StyledBtnPrimary type="submit" >Submit</StyledBtnPrimary>
                                        <StyledBtnSecondary onClick={() => setOpenModalEditCustomer(false)} className="ms-auto">Annuler</StyledBtnSecondary>
                                    </Stack>
                                </form>)
                        }
                    </Formik>

                </Modal.Body>
            </Modal>);
};

export default ModalCreateCustomer;
