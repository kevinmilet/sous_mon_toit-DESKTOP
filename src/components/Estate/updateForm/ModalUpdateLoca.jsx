import React, { useContext, useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import Loader from "../../Tools/Loader/Loader";
import axios from "axios";
import { Context } from "../../../utils/context/Context";
import apiRoutes from "../../../utils/const/ApiRoutes";
import { Form, Formik, useField, isEmptyArray } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../../utils/styles/colors';
import { StyledBtnPrimary, StyledInput, StyledBtnSecondary } from "../../../utils/styles/Atoms";

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
const AddEstateH4 = styled.h4`
    color: ${colors.secondaryBtn};
`
const AddEstateLabel = styled.label`
    color: ${colors.secondary};
`
const ModifSuccess = styled.p`
    font-size: 1rem;
    display: none;
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
const ModalUpdateLoca = ({ estateId, setShowUpdateLocaEstateModal, showUpdateLocaEstateModal }) => {

    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const handleClose = () => setShowUpdateLocaEstateModal(false);

    const [searchAddressResult, setSearchAddressResult] = useState(null);
    const [requiredAddress, setRequiredAddress] = useState("");

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState(null);
    const [estate_longitude, setEstate_longitude] = useState("");
    const [estate_latitude, setEstate_latitude] = useState("");

    useEffect(() => {
        axios.get(API_URL + apiRoutes.estates + '/' + estateId).then(res => {
            console.log(res.data)
            setAddress(res.data.estateAddress);
            setCity(res.data.city);
            setZipcode(res.data.zipcode);
            setEstate_longitude(res.data.estate_longitude);
            setEstate_latitude(res.data.estate_latitude);


        }).catch(error => {
            console.log(error.message);
        }).finally(() => {
            setLoading(false);
        });

    }, [API_URL, estateId]);

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
        document.getElementById('div_valid_address').style.border = "2px solid green";

    }

    // Insertion en bdd
    const UpdateEstate = (values) => {

        console.log(values);

        if (!address) {

            setRequiredAddress('Champs requis')
            return;

        } else {
            setRequiredAddress('');
        }

        axios.defaults.headers.common = {
            Authorization: `Bearer ${localStorage["token"]}`,
        };

        axios.put(API_URL + apiRoutes.update_estate + "/" + estateId + "/loca", { address, city, zipcode, estate_longitude, estate_latitude })
            // axios.put("http://localhost:8000/estates/update/" + id ,values)
            .then(res => {
                console.log(res.data)
                // Message de succès
                window.scrollTo(0, 0);
                document.getElementById('modifLocaSuccess').style.cssText = "display: flex;";
                document.getElementById('modifLocaSuccess').innerHTML = "Localisation modifié avec succès !";
                setTimeout(() => {
                    window.location.href = '/detail-biens/' + estateId;
                }, 2000);
            }).catch(error => {
                console.log(error.response);
            })
    }

    return (
        <>
            <Modal show={showUpdateLocaEstateModal} onHide={handleClose} size="xl" backdrop="static" keyboard={false} centered>
                {(loading) ?
                    <Loader /> : (
                        <Formik
                            initialValues={{

                            }}
                            validationSchema={Yup.object({

                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                await new Promise(r => setTimeout(r, 500));
                                setSubmitting(false);
                                UpdateEstate(values);
                            }}
                        >
                            {({ handleChange, values }) => (
                                <Form>
                                    <Modal.Header>
                                        <Modal.Title style={{ color: colors.secondary, fontWeight: "bold" }}>
                                            Modifier la localisation
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ModifSuccess className="text-center p-4 alert-success" id="modifLocaSuccess" />
                                        {/* ADRESSE  */}
                                        <div className="px-3">
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
                                                    <div className="error" style={{ color: "#E85A70", fontStyle: 'italic' }}>{requiredAddress}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className='text-end'>
                                            <StyledBtnPrimary type="submit" className="btn">Enregistrer</StyledBtnPrimary>
                                            <StyledBtnSecondary type="button" className="btn ms-3" onClick={handleClose}>
                                                Annuler
                                            </StyledBtnSecondary>
                                        </div>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    )}
            </Modal>
        </>
    )
};

export default ModalUpdateLoca;