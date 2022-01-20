import React, { useContext, useEffect, useState } from "react";
import "../../utils/styles/modal.css";
import { Modal, Stack } from "react-bootstrap";
import { StyledBtnPrimary, StyledBtnSecondary, StyledInput, StyledSelect, StyledTextarea } from "../../utils/styles/Atoms";
import moment from "moment";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import Loader from "../Tools/Loader/Loader";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const Label = styled.label`
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 5px;
  margin-left: 10px;
`;

const ModalCreateCustomer = ({ openModalAddCustomer, setOpenModalAddCustomer, infos }) => {
  const API_URL = useContext(Context).apiUrl;
  const [loading, setLoading] = useState(true);
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [text, setText] = useState("");
  const [searchResult, setSearchResult] = useState();

  const InsertCustomer = values => {
    console.log(values);
    const firstname = values.firstname;
    const lastname = values.lastname;
    const mail = values.mail;
    const gender = "H";
    const first_met = false;
    //Valeurs par défaut
    const phone = values.phone;


    axios.post(API_URL + ApiRoutes.create_customer, { lastname, firstname, mail, phone, gender, first_met })
      // axios.post("http://localhost:8000/customer/create", { lastname , firstname , mail , phone ,gender,first_met ,password})
      .then(res => {
        setOpenModalAddCustomer(false);
        alert("vous etes inscrit !");
        // a changer
        // window.location.href = '/connexion';
      }).catch(error => {
        if (error.response.data.mail && error.response.data.mail[0] === "The mail has already been taken.") {
          setErrorMail("Cette adresse mail est déja prise.");
        }
        if (error.response.data.password && error.response.data.password[0] === "The password format is invalid.") {
          setErrorPassword("Le mot de passe doit comporter au minimum 8 caractères (dont masjuscule, minuscule , chiffre et caractères spéciaux).");
        }
      });
  };

  useEffect(() => { }, []);

  return (
    <Modal show={openModalAddCustomer}  backdrop="static" keyboard={false} centered="centered">
      <div className="text-center mb-3">
        <h2>Ajouter un client</h2>
      </div>
      <Modal.Body >
        <Formik  initialValues={{
                        gender: '',
                        firstname: "",
                        lastname: "",
                        mail: "",
                        phone:"",
                    }}
                    validationSchema={Yup.object({
                        gender: Yup.string()
                            .required("Champs requis"),
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
                            .max(10, "10 caractères maximum")
                    })}
                     onSubmit={async (values, { setSubmitting }) => {
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
          InsertCustomer(values);
        }}>
          {
            props => (
            <form onSubmit={props.handleSubmit} >
              
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <Field type="radio" className="form-check-input" name="gender" value="F" />
                  Madame
                </label>
              </div>
              
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                  <Field type="radio" className="form-check-input" name="gender" value="H" />
                  Monsieur
                </label>
              </div>
              {props.errors.gender && (<div id="feedback" className="text-danger">{props.errors.gender}</div>)}
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
                <Label className="col-12">Tel
                </Label>{" "}
                <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.phone} name="phone" />
                {props.errors.phone && (<div id="feedback" className="text-danger">{props.errors.phone}</div>)}
              </div>
              <Stack direction="horizontal" gap={2}>
                <StyledBtnPrimary type="submit">Submit</StyledBtnPrimary>
                <StyledBtnSecondary onClick={()=>setOpenModalAddCustomer(false)} className="ms-auto">Annuler</StyledBtnSecondary>
              </Stack>
            </form>)
          }
        </Formik>
        {/* <div className='text-center mb-3'>
                        <h2>Ajouter un client</h2>
                    </div>

                    <div className="row">
                        <div className="col m-3">
                            <Label>Nom</Label>
                            <StyledInput type="date"
                                         className="form-control"
                                         min={dateMin}
                                         value={dateValue}
                                         onChange={() => console.log(dateValue)}
                            />
                        </div>
                        <div className="col m-3">
                            <Label>Heure</Label>
                            <StyledInput type="time"
                                         className="form-control"
                                         min="08:00"
                                         max="19:00"
                                         value={timeValue}
                                         onChange={() => console.log(timeValue)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-3">
                            <Label>Notes</Label>
                            <StyledTextarea className="form-control"/>
                        </div>
                    </div> */
        }
      </Modal.Body>

      {/* <div className='text-end m-3'>
                <StyledBtnSecondary className="m-3" variant="secondary" onClick={() =>setShowAddEventModal(false)}>
                    Annuler
                </StyledBtnSecondary>
                <StyledBtnPrimary variant="primary" onClick={() =>setShowAddEventModal(false)}>
                    Valider
                </StyledBtnPrimary>
            </div> */
      }
    </Modal>);
};

export default ModalCreateCustomer;

// import React, { useContext } from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import colors from "../../utils/styles/colors";
// import ApiRoutes from "../../utils/const/ApiRoutes";
// import { Context } from "../../utils/context/Context";
// import Loader from "../Tools/Loader/Loader";
// import DataTable from "react-data-table-component";
// import {Modal} from "react-bootstrap";
// import NiceModal, { useModal } from '@ebay/nice-modal-react';

// export default NiceModal.create(({ name ,setOpenModalAddCustomer, openModalAddCustomer}) => {
//     const modal = useModal();
//     return (
//       <Modal
//       show={openModalAddCustomer}
//         title="Hello Antd"
//         onOk={() => modal.hide()}
//         onCancel={() => modal.hide()}
//         afterClose={() => modal.remove()}
//       >
//         Hello ${name}!
//       </Modal>
//     );
//   });

// const ModalCreateCustomer = (values) => {

//   return (
//       <div>fdllvkkeffkdlfldl</div>
//   );
// };

// export default ModalCreateCustomer;
