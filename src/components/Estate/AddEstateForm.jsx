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
    const [searchAddressResult, setSearchAddressResult] = useState(null);
    const [requiredAddress, setRequiredAddress] = useState("");
    const [searchCustomerResult, setSearchCustomerResult] = useState(null);
    const [requiredCustomer, setRequiredCustomer] = useState("")

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState(null);
    const [estate_longitude, setEstate_longitude] = useState("");
    const [estate_latitude, setEstate_latitude] = useState("");
    const [id_customer , setIdCustomer] = useState(null)

    const [custFirstname , setCustFirstname] = useState('');
    const [custLastname , setCustLastname] = useState('');
    const [custNClient ,  setCustNClient] = useState('');
    const [custAddressMail, setCustAddressMail] = useState('');


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

    // Recherche de l'addresse
    const searchAddressGouv = (value) => {
        // On remplace les espaces par des + pour notre requete
        const conformeValue = value.replace(/ /g, "+");
        //On enleve les header axios pour envoyer la requete a l'API du gouv ( sinon ça passse pas )
        axios.defaults.headers.common = {};
        axios.get(`https://api-adresse.data.gouv.fr/search?q=${conformeValue}`, {})
            .then(res => {
                if (isEmptyArray(res.data.features)) {
                    setSearchAddressResult([{ properties: { label: "Aucun résultats" } }])
                } else {
                    setSearchAddressResult(res.data.features);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    // Selection de l'adresse
    const selectAddressResult = (e) => {
        setAddress(e.properties.name);
        setCity(e.properties.city);
        setZipcode(e.properties.postcode);
        setEstate_longitude(e.geometry.coordinates[0])
        setEstate_latitude(e.geometry.coordinates[1])
        setSearchAddressResult(null);
        document.getElementById('div_valid_address').style.border="2px solid green";

    }

    // Recherche du client
    const searchCustomer = (value) => {

        axios.defaults.headers.common = {
            Authorization: `Bearer ${localStorage["token"]}`,
        };
        if(value.length >= 2){
            axios.get(API_URL + ApiRoutes.search_customer + value).then(res => {
                setSearchCustomerResult(res.data)
            }).catch(error => {
                console.log(error.message)
            })
        }
    }
    // Selection du client
    const selectCustomerResult = (e) => {
        setIdCustomer(e.id)
        setCustFirstname(e.firstname)
        setCustLastname(e.lastname)
        setCustNClient(e.n_customer)
        setCustAddressMail(e.mail);
        setSearchCustomerResult(null);
        document.getElementById('div_valid_customer').style.border="2px solid green";

    }

    // Insertion en bdd
    const InsertEstate = (values) => {

        const id_estate_type = values.id_estate_type;
        const buy_or_rent = values.buy_or_rent;
        const title = values.title;

        if( !address || !id_customer ){

            if(!address){
                setRequiredAddress('Champs requis')
            }
            if(!id_customer){
                setRequiredCustomer('Champs requis')
            }
            return;
        }else{
            setRequiredAddress('');
            setRequiredCustomer('');
        }

        axios.defaults.headers.common = {
            Authorization: `Bearer ${localStorage["token"]}`,
        };
        axios.post(API_URL + ApiRoutes.create_estate, { id_estate_type , id_customer, title, buy_or_rent, address, city, zipcode , estate_longitude ,estate_latitude})
            // axios.post("http://localhost:8000/estates/create", { id_estate_type , id_customer, title, buy_or_rent, address, city, zipcode , estate_longitude ,estate_latitude})
            .then(res => {
                if(res.data[0].id){
                    window.location.href = '/ajout-bien/step-2/' + res.data[0].id;
                }else{
                    console.log('Une erreur est survenu ...')
                }
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
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <Field type="radio" className="form-check-input" name="buy_or_rent" value="Achat" />
                                                    Achat
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline mb-4">
                                                <label className="form-check-label">
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
                                            handleChange(e);
                                            searchAddressGouv(e.target.value);
                                        }}
                                    />
                                    <div className="row">
                                        <div className="col-6 d-flex justify-content-center align-items-center">
                                            {searchAddressResult
                                                ?
                                                <div className="p-2">
                                                    {searchAddressResult.map((search, index) => (
                                                        <SearchResultDiv
                                                            onClick={() => selectAddressResult(search)}
                                                            key={index}
                                                        >
                                                            <p>{search.properties.label}</p>
                                                        </SearchResultDiv>
                                                    ))}
                                                </div>
                                                : <div><p>Résultats de recherche</p></div>
                                            }
                                        </div>
                                        <div className="col-6 p-2" id="div_valid_address">
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
                                            <div className="error" style={{color: "#E85A70", fontStyle: 'italic'}}>{requiredAddress}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* INFORMATION DU PROPRIETAIRE  */}
                                <div className="border p-3">
                                    <AddEstateH4>Informations sur le vendeur/loueur <span style={{ fontSize: "small" }}>( Le propriétaire du bien doit au préalable être enregistré en base )</span></AddEstateH4>
                                    <MyTextInput
                                        label="Vendeur/Loueur"
                                        name="customerSearch"
                                        type="text"
                                        placeholder="Rechercher un client"
                                        onChange={(e) => {
                                            handleChange(e);
                                            searchCustomer(e.target.value);
                                        }}
                                    />
                                    <div className="row">
                                        <div className="col-6 d-flex justify-content-center align-items-center">
                                            {searchCustomerResult
                                                ?
                                                <div className="p-2">
                                                    {searchCustomerResult.map((search, index) => (
                                                        <SearchResultDiv
                                                            onClick={() => selectCustomerResult(search)}
                                                            key={index}
                                                        >
                                                            <p>{search.firstname} {search.lastname} N° Client : {search.n_customer} Adresse mail : {search.mail}</p>
                                                        </SearchResultDiv>
                                                    ))}
                                                </div>
                                                : null
                                                // <div><p>Résultats de recherche</p></div>
                                            }
                                        </div>
                                        <div className="col-6 p-2" id="div_valid_customer">
                                            <div className="row">
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Prénom"
                                                        name='custPrenom'
                                                        type="text"
                                                        disabled="disabled"
                                                        value={custFirstname}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Nom"
                                                        name="custNom"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={custLastname}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Numéro Client"
                                                        name="custnclient"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={custNClient}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <MyTextInput
                                                        label="Adresse mail"
                                                        name="custAddressMail"
                                                        type="text"
                                                        disabled="disabled"
                                                        value={custAddressMail}
                                                    />
                                                </div>
                                            </div>
                                            <div className="error" style={{color: "#E85A70", fontStyle: 'italic'}}>{requiredCustomer}</div>
                                        </div>
                                    </div>
                                </div>
                                <StyledBtnPrimary type="submit" className="btn">Enregistrer et continuer</StyledBtnPrimary>
                            </Form>
                        </ScrollDiv>
                    )}
                </Formik>
            </AddEstateContainer>
        </>
    );
};

export default AddEstateForm;
