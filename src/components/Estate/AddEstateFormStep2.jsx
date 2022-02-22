import React, {useContext} from "react";
import {Field, Form, Formik, useField} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import {Context} from "../../utils/context/Context";
import {StyledBtnPrimary, StyledInput} from "../../utils/styles/Atoms";
import {useParams} from 'react-router-dom';
import axios from "axios";
// import ApiRoutes from "../../utils/const/ApiRoutes";

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

const AddEstateFormStep2 = () => {

    const { id } = useParams();
    const API_URL = useContext(Context).apiUrl;

    // Insertion en bdd
    const UpdateEstate = (values) => {

        console.log(values);
        // axios.post(API_URL + ApiRoutes.update_estate, {value})
        axios.put("http://localhost:8000/estates/update/" + id ,values)
        .then(res => {
            if(res.data[0].id){
                window.location.href = '/ajout-bien/step-3/' + res.data[0].id;
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
                        price: null,
                        description: "",
                        disponibility: "",
                        year_of_construction: "",
                        living_surface: 0,
                        carrez_law: 0,
                        land_surface: 0,
                        nb_rooms: 0,
                        nb_bedrooms: 0,
                        nb_bathrooms: 0,
                        nb_sanitary: 0,
                        nb_toilet: 0,
                        nb_kitchen: 0,
                        nb_garage: 0,
                        nb_parking: 0,
                        nb_balcony: 0,
                        type_kitchen: "",
                        heaters: "",
                        communal_heating: 0,
                        furnished: 0,
                        private_parking: 0,
                        handicap_access: 0,
                        cellar: 0,
                        terrace: 0,
                        swimming_pool: 0,
                        fireplace: 0,
                        all_in_sewer: 0,
                        septik_tank: 0,
                        property_charge: null,
                        attic: 0,
                        elevator: 0,
                        rental_charge: null,
                        coownership_charge: null,
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
                        <ScrollDiv>
                            <Form>
                                {/* INFORMATION GENERAL  */}
                                <p>Le bien a été enregistré, vous pouvez compléter ces informations ultérieurement.</p>
                                <div className="row">
                                    <div className="border p-4 col-12">
                                        <AddEstateH4>Informations Général</AddEstateH4>
                                        <div className="row">
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Prix"
                                                    name="price"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Date de construction"
                                                    name="year_of_construction"
                                                    type="number"
                                                    min="1800" 
                                                    max="2099" 
                                                    step="1"
                                                />
                                            </div>
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Disponibilité"
                                                    name="disponibility"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <MyTextInput
                                            label="Description"
                                            name="description"
                                            type="text"
                                        />
                                        <div className="row">
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Taxe foncière"
                                                    name="property_charge"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Charges locatives"
                                                    name="rental_charge"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Charges de co-propriété"
                                                    name="coownership_charge"
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Surface"
                                                    name="living_surface"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Surface ( loi Carrez )"
                                                    name="carrez_law"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-4">
                                                <MyTextInput
                                                    label="Surface du terrain"
                                                    name="land_surface"
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* CARACTERISTIQUE */}
                                    <div className="border p-4 col-6">
                                        <AddEstateH4>Caractéristique</AddEstateH4>
                                        <div className="row">
                                            <div className="col-6">
                                                <MyTextInput
                                                    label="Nombre de pièce"
                                                    name="nb_rooms"
                                                    type="number"
                                                />
                                                <MyTextInput
                                                    label="Nombre de salle de bain"
                                                    name="nb_bathrooms"
                                                    type="number"
                                                />
                                                <MyTextInput
                                                    label="Nombre de WC"
                                                    name="nb_toilet"
                                                    type="number"
                                                />
                                                <MyTextInput
                                                    label="Nombre de cuisine"
                                                    name="nb_kitchen"
                                                    type="number"
                                                />
                                                <MyTextInput
                                                    label="Nombre de garage"
                                                    name="nb_garage"
                                                    type="number"
                                                />
                                                <MyTextInput
                                                    label="Nombre de balcon"
                                                    name="nb_balcony"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-6">
                                                <MyTextInput
                                                    label="Nombre de chambre"
                                                    name="nb_bedrooms"
                                                    type="number"
                                                />
                                                <MyTextInput
                                                    label="Nombre de sanitaire"
                                                    name="nb_sanitary"
                                                    type="number"
                                                />
                                                <MyTextInput
                                                    label="Type de chauffage"
                                                    name="heaters"
                                                    type="text"
                                                />
                                                <MyTextInput
                                                    label="Type de cuisine"
                                                    name="type_kitchen"
                                                    type="text"
                                                />
                                                <MyTextInput
                                                    label="Nombre de parking"
                                                    name="nb_parking"
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* EQUIPEMENT */}
                                    <div className="border p-4 col-6">
                                        <AddEstateH4>Equipement</AddEstateH4>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Chauffage collectif</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="communal_heating" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="communal_heating" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Meublé</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="furnished" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="furnished" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Parking privé</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="private_parking" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="private_parking" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Accès handicapé</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="handicap_access" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="handicap_access" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Cave</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="cellar" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="cellar" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Terrace</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="terrace" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="terrace" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Piscine</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="swimming_pool" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="swimming_pool" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Cheminée</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="fireplace" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="fireplace" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Tout à l'égout</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="all_in_sewer" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="all_in_sewer" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Fosse Septique</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="septik_tank" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="septik_tank" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Grenier</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="attic" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="attic" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <AddEstateLabel className="form-label">Ascensseur</AddEstateLabel><br />
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="elevator" value="1" />
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-4">
                                                        <label className="form-check-label">
                                                            <Field type="radio" className="form-check-input" name="elevator" value="0" />
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <StyledBtnPrimary type="submit" className="btn">Enregistrer les informations</StyledBtnPrimary>
                            </Form>
                        </ScrollDiv>
                    )}
                </Formik>
            </AddEstateContainer>
        </>
    );
};

export default AddEstateFormStep2;
