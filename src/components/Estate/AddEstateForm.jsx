import React, { useContext, useState, useEffect } from "react";
import { Formik, Field, Form, useField, isEmptyArray } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import axios from 'axios';
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import { StyledBtnPrimary, StyledInput } from "../../utils/styles/Atoms";

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
const SearchResultDiv = styled.div`
    padding:0.5%;
    border: 0px solid black;
    border-radius:50px;
    text-align:center;
    &:hover {
        background-color: ${colors.secondary};
        color: white;
        cursor: pointer;
    }
`

const Option = styled.option`
    color: ${colors.secondaryBtn};
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

const AddEstateForm = () => {

    const API_URL = useContext(Context).apiUrl;
    const [estatesTypes, setEstatesTypes] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState(null)

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [estate_longitude, setEstate_longitude] = useState("");
    const [estate_latitude, setEstate_latitude] = useState("");


    useEffect(() => {
        // Récupération des types de biens
        axios.get(API_URL + ApiRoutes.estates_types).then(response => {
            setEstatesTypes(response.data);
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false);
        })
    }, [API_URL])

    // Selection de l'adresse
    const changeInput = (e) => {

        setAddress(e.properties.name);
        setCity(e.properties.city);
        setZipcode(e.properties.citycode);
        setEstate_longitude(e.geometry.coordinates[0])
        setEstate_latitude(e.geometry.coordinates[1])
    }

    // Recherche de l'addresse
    const searchAddressGouv = (value) => {
        // On remplace les espaces par des + pour notre requete
        var conformeValue = value.replace(/ /g, "+");
        //On enleve les header axios pour envoyer la requete a l'API du gouv ( sino ça passse pas ) 
        axios.defaults.headers.common = {};
        axios.get(`https://api-adresse.data.gouv.fr/search?q=${conformeValue}`, {})
            .then(res => {
                console.log(res.data.features, "= response")
                console.log(isEmptyArray(res.data.features), "is empty")
                if (isEmptyArray(res.data.features)) {
                    setSearchResult([{ properties: { label: "Aucun résultats" } }])
                } else {
                    setSearchResult(res.data.features);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const searchCustomer = (value) => {

        console.log(value);
    }

    const InsertEstate = (values) => {

        const estateType = values.id_estate_type;
        const buy_or_rent = values.buy_or_rent;
        const title = values.title;
        const addressSend = address;
        const citySend = city;
        const zipcodeSend = zipcode;
        const longitudeSend = estate_longitude;
        const latitudeSend = estate_latitude;

        console.log(estateType)
        console.log(buy_or_rent);
        console.log(title);
        console.log(addressSend);
        console.log(citySend);
        console.log(zipcodeSend);
        console.log(longitudeSend);
        console.log(latitudeSend);



        axios.post(API_URL + ApiRoutes.create_customer, { title, buy_or_rent, address, city, zipcode })
            // axios.post("http://localhost:8000/customer/create", { title ,buy_or_rent , address , city , zipcode})
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
                        id_estate_type: 1,
                        id_customer: 1,
                        title: "",
                        buy_or_rent: "Achat",
                    }}
                    validationSchema={Yup.object({
                        buy_or_rent: Yup.string()
                            .required("Champs requis"),
                        title: Yup.string()
                            .max(50, "50 caractères maximum")
                            .required("Champs requis"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        await new Promise(r => setTimeout(r, 500));
                        setSubmitting(false);
                        InsertEstate(values);
                    }}
                >
                    {({ handleChange, values }) => (
                        <ScrollDiv>
                            <Form>
                                {/* INFORMATION GENERAL  */}
                                <div className="border p-3">
                                    <AddEstateH4>Informations Général</AddEstateH4>
                                    <div className="row align-items-baseline">
                                        <div className="col-6">
                                            <AddEstateLabel className="form-label">Type de bien</AddEstateLabel><br />
                                            <div className="">
                                                <select name="id_estate_type"
                                                    style={{ borderRadius: "50px", border: "2px solid" + colors.secondaryBtn }}
                                                    id="id_estate_type"
                                                    className="form-select"
                                                    value={values.id_estate_type}
                                                    onChange={handleChange}
                                                >
                                                    {!loading && estatesTypes.map(item => (
                                                        <Option value={item.id} key={item.id}>{item.estate_type_name}</Option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <AddEstateLabel className="form-label">Type de contrat</AddEstateLabel><br />
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label">
                                                    <Field type="radio" className="form-check-input" name="buy_or_rent" value="Achat" />
                                                    Achat
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline mb-4">
                                                <label class="form-check-label">
                                                    <Field type="radio" className="form-check-input" name="buy_or_rent" value="Location" />
                                                    Location
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <MyTextInput
                                        label="Titre"
                                        name="title"
                                        type="text"
                                        placeholder=""
                                    />
                                </div>
                                {/* ADRESSE  */}
                                <div className="border p-3">
                                    <AddEstateH4>Localisation</AddEstateH4>
                                    <MyTextInput
                                        label="Adresse"
                                        name="addressSearch"
                                        type="text"
                                        placeholder="Rechercher une adresse"
                                        onChange={(e) => {
                                            console.log(e.target.value, "= input");
                                            handleChange(e);
                                            searchAddressGouv(e.target.value);
                                        }}
                                    />
                                    <div className="row">
                                        <div className="col-6 d-flex justify-content-center align-items-center">
                                            {searchResult
                                                ?
                                                <div className="p-4">
                                                    {searchResult.map((search, index) => (
                                                        <SearchResultDiv
                                                            onClick={() => changeInput(search)}
                                                            key={index}
                                                        >
                                                            <p>{search.properties.label}</p>
                                                        </SearchResultDiv>
                                                    ))}
                                                </div>
                                                : <div><p>Résultats de recherche</p></div>
                                            }
                                        </div>
                                        <div className="col-6" id='div_valid_address'>
                                            <div className="row">
                                                <div className="col-12">
                                                    <MyTextInput
                                                        label="Adresse"
                                                        name="address"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={address}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Ville"
                                                        name="city"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={city}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Code Postal"
                                                        name="zipcode"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={zipcode}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Longitude"
                                                        name="estate_longitude"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={estate_longitude}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Latitude"
                                                        name="estate_latitude"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={estate_latitude}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* INFORMATION DU PROPRIETAIRE  */}
                                <div className="border p-3">
                                    <AddEstateH4>Informations sur le vendeur/loueur <span style={{fontSize : "small"}}>( Le propriétaire du bien doit au préalable être enregistré en base )</span></AddEstateH4>
                                    <MyTextInput
                                        label="Vendeur/Loueur"
                                        name="customerSearch"
                                        type="text"
                                        placeholder="Rechercher un client"
                                        onChange={(e) => {
                                            console.log(e.target.value, "= input");
                                            handleChange(e);
                                            searchCustomer(e.target.value);
                                        }}
                                    />
                                </div>
                                <StyledBtnPrimary type="submit" className="btn">Continuer</StyledBtnPrimary>
                            </Form>
                        </ScrollDiv>
                    )}
                </Formik>
            </AddEstateContainer>
        </>
    );
};

export default AddEstateForm;