import React, {useContext, useEffect, useState} from "react";
import "../../utils/styles/modal.css";

import {Modal, Stack} from "react-bootstrap";
import {StyledBtnPrimary, StyledBtnSecondary, StyledInput} from "../../utils/styles/Atoms";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";
import {Formik} from "formik";
import * as Yup from "yup";
import {useParams} from 'react-router-dom';


const Label = styled.label`
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 5px;
  margin-left: 10px;
`;
const Option = styled.option`
    color: ${colors.secondaryBtn};
`;
const AddEstateH1 = styled.h1`
    color: ${colors.secondary};
`;
const AddEstateH4 = styled.h4`
    color: ${colors.secondaryBtn};
`;
const AddEstateLabel = styled.label`
    color: ${colors.secondary};
`;

const ModalAddSearch = ({ openModalAddCustomerSearch, setOpenModalAddCustomerSearch, infos }) => {
    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [errorMail, setErrorMail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [text, setText] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [estatesTypes, setEstatesTypes] = useState({});
    const { id } = useParams();

    const AddCustomerSearch = values => {
        console.log(values);
        const budget_min = "0";
        const id_estate_type = values.id_estate_type;
        const surface_min = values.surface_min;
        const search_longitude = "0";
        const budget_max = values.budget_max;
        const search_latitude = "0";
        const search_radius = "0";
        const id_customer = id;
        const buy_or_rent = values.buy_or_rent;
        const alert = 0;
        const number_rooms = "1";
        const city = values.city;


        axios.post(API_URL + ApiRoutes.customer_create_search + "/" + id, { city, id_estate_type, surface_min, budget_max, search_longitude, search_latitude, search_radius, id_customer, alert, buy_or_rent, number_rooms, budget_min })

            .then(res => {
                setOpenModalAddCustomerSearch(false);
                alert("vous etes inscrit !");

            }).catch(error => {

            });
    };

    useEffect(() => {
        axios.get(API_URL + ApiRoutes.estates_types).then(response => {
            setEstatesTypes(response.data);
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false);
        })
    }, [API_URL])
        ;

    return (
        <Modal show={openModalAddCustomerSearch} backdrop="static" keyboard={false} centered="centered">
            <div className="text-center mb-3">
                <h2>Ajouter un client</h2>
            </div>
            <Modal.Body >
                <Formik initialValues={{
                    id_estate_type: 1,
                    surface_min: "",
                    budget_max: "",
                    search_longitude: "",
                    search_latitude: "",
                    search_radius: "",
                    buy_or_rent: "",
                    alert: '0',
                    city: ''
                }}
                    validationSchema={Yup.object({
                        surface_min: Yup.string()
                        ,
                        budget_max: Yup.string()
                            .max(15, "15 caractères maximum").required('Veuillez remplir le champ')
                        ,
                        surface_min: Yup.string()
                            .max(10, "10 caractères maximum").required('Veuillez remplir le champ'),
                        number_rooms: Yup.string()
                            .max(10, "10 caractères maximum").required('Veuillez remplir le champ'),
                        city: Yup.string()
                            .max(50, "50 caractères maximum").required('Veuillez remplir le champ'),
                        
                        search_radius: Yup.string()
                            .max(10, "10 caractères maximum").required('Veuillez remplir le champ'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        await new Promise(r => setTimeout(r, 500));
                        setSubmitting(false);
                        AddCustomerSearch(values);
                    }}>
                    {
                        props => (
                            <form onSubmit={props.handleSubmit} >

                                {/* <div className="form-check form-check-inline">
                  <label className="form-check-label">
                    <Field type="radio" className="form-check-input" name="gender" value="F" />
                    Madame
                  </label>
                </div> */}

                                <div className="col-6">
                                    <AddEstateLabel className="form-label">Type de bien</AddEstateLabel><br />
                                    <div className="">
                                        <select name="id_estate_type"
                                            style={{ borderRadius: "50px", border: "2px solid" + colors.secondaryBtn }}
                                            id="id_estate_type"
                                            className="form-select"
                                            value={props.values.id_estate_type}
                                            onChange={props.handleChange}
                                        >
                                            {!loading && estatesTypes.map(item => (
                                                <Option value={item.id} key={item.id}>{item.estate_type_name}</Option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <AddEstateLabel className="form-label">Achat/Vente</AddEstateLabel><br />
                                    <div className="">
                                        <select name="buy_or_rent"
                                            style={{ borderRadius: "50px", border: "2px solid" + colors.secondaryBtn }}
                                            id="id_buy_or_rent"
                                            className="form-select"
                                            value={props.values.buy_or_rent}
                                            onChange={props.handleChange}
                                        >
                                            <Option value="Achat" key="Achat">Location</Option>
                                            <Option value="Achat" key="Achat">Achat</Option>
                                            <Option value="Vente" key="Vente">Vente</Option>

                                        </select>
                                    </div>
                                </div>
                                <div className="my-2">
                                    <Label className="col-12">Surface en m²
                                    </Label>{" "}
                                    <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.surface_min} name="surface_min" />
                                    {props.errors.surface_min && (<div id="feedback" className="text-danger">{props.errors.surface_min}</div>)}
                                </div>
                                <div className="my-2">
                                    <Label className="col-12">Budget
                                    </Label>{" "}
                                    <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.budget_max} name="budget_max" />
                                    {props.errors.budget_max && (<div id="feedback" className="text-danger">{props.errors.budget_max}</div>)}
                                </div>
                                <div className="my-2">
                                    <Label className="col-12">Nombre de pièce
                                    </Label>{" "}

                                    <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.number_rooms} name="number_rooms" />
                                    {props.errors.number_rooms && (<div id="feedback" className="text-danger">{props.errors.number_rooms}</div>)}
                                </div>
                                <div className="my-2">
                                    <Label className="col-12">Localité
                                    </Label>{" "}
                                    <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.city} name="city" />
                                    {props.errors.city && (<div id="feedback" className="text-danger">{props.errors.city}</div>)}
                                </div>
                                <div className="my-2">
                                    <Label className="col-12">Rayon
                                    </Label>{" "}
                                    <StyledInput type="text" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.search_radius} name="search_radius" />
                                    {props.errors.search_radius && (<div id="feedback" className="text-danger">{props.errors.search_radius}</div>)}
                                </div>
                                <Stack direction="horizontal" gap={2}>
                                    <StyledBtnPrimary type="submit">Submit</StyledBtnPrimary>
                                    <StyledBtnSecondary onClick={() => setOpenModalAddCustomerSearch(false)} className="ms-auto">Annuler</StyledBtnSecondary>
                                </Stack>
                            </form>)
                    }
                </Formik>

            </Modal.Body>
        </Modal>);
};

export default ModalAddSearch;


