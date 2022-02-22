import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import axios from 'axios';
import Loader from "../Tools/Loader/Loader";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from '../../utils/context/Context';
import check from '../../assets/icons/check-circle-regular.svg';
import cross from '../../assets/icons/times-circle-regular.svg';

import { useParams } from 'react-router-dom';

const DivDetail = styled.div`
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

const H2 = styled.h2`
    color: ${colors.secondary};
    font-weight: bold;
`
const A = styled.a`
    color: white;
    background-color:${colors.secondary};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

const H3 = styled.h3`
    color: ${colors.secondaryBtn}
`
const Icons = styled.img`
    width: 40px;
    height: 40px
`

const DetailEstate = () => {

    const { id } = useParams();
    const [oneEstateData, setOneEstateData] = useState({})
    const [pictureCover, setPictureCover] = useState({})
    const [picturesList, setPicturesList] = useState({})
    const [loading, setLoading] = useState(true);
    const API_URL = useContext(Context).apiUrl;

    useEffect(() => {

        // Récupération des données de l'estate
        // axios.get("http://localhost:8000/estates/" + id)
        axios.get(API_URL + ApiRoutes.estates + "/" + id)
            .then(res => {
                if (res.data === "aucun resultat") {
                    return window.location.href = '/liste-des-biens'
                }
                setOneEstateData(res.data)
            }).catch(error => {
                console.log(error.message)
            }).finally(() => {

                //Image de couverture du bien
                // axios.get("http://localhost:8000/estates_pictures/cover/" + id)
                axios.get(API_URL + ApiRoutes.estates_cover + "/" + id)
                    .then(res => {
                        setPictureCover(res.data[0])
                    }).catch(error => {
                        console.log(error.message)
                    }).finally(() => {

                        // liste des images du bien
                        // axios.get("http://localhost:8000/estates_pictures/" + id)
                        axios.get(API_URL + ApiRoutes.estates_pictures + "/" + id)
                            .then(res => {
                                setPicturesList(res.data)
                            }).catch(error => {
                                console.log(error.message)
                            }).finally(() => {
                                setLoading(false)
                            })

                    })
            })

    }, [API_URL, id])

    return (

        loading ? <Loader /> :

            <DivDetail className="container col-12 mx-auto p-4">
                <div className="row justify-content-between align-items-baseline px-3">
                    <p className="col-8 d-flex justify-content-between align-items-center"><b className="text-danger">Référence: {oneEstateData.reference}</b> <b>{oneEstateData.title}</b><b className="text-danger">Prix: {oneEstateData.price}€</b></p>
                    <A className='col-2 btn'>Modifier</A>
                </div>
                <ScrollDiv>
                    <div className="row align-items-center mt-3">
                        <div className='col-4'>
                            <img src={ApiRoutes.COVER_ESTATE_BASE_URL + (pictureCover ? pictureCover.name : "estate_default.jpg")} className="img-fluid img-thumbnail" alt={oneEstateData.title} />
                        </div>
                        <div className='col-8'>
                            {picturesList.map((picture, index) =>
                                <img key={index} src={ApiRoutes.COVER_ESTATE_BASE_URL + (picture.name ?? "estate_default.jpg")} className="col-4 col-lg-2 img-fluid img-thumbnail" alt={oneEstateData.title} />
                            )}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <H2>Localisation</H2>
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <b>{oneEstateData.address} {oneEstateData.zipcode} {oneEstateData.city}, FRANCE</b>
                        </div>
                        <div className="col-6">
                            {/*Carte*/}
                            <iframe
                                width="400"
                                height="250"
                                loading="lazy"
                                allowfullScreen
                                src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyBqKdClbH20Svws6E7CB6sOcTr237Ryf1M&zoom=14&center=" + oneEstateData.estate_latitude + "%2C" + oneEstateData.estate_longitude + "&q=" + oneEstateData.address.replace(' ', '+') + "," + oneEstateData.city.replace(' ', '+') + ",France"}
                            ></iframe>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <H2>Description</H2>
                        <p>{oneEstateData.description}</p>
                    </div>
                    <div className="row p-3 border border-dark mt-3 rounded">
                        <H2 className="">Caractèristiques</H2>
                        <div className="col-12 col-md-6">
                            <H3>Général</H3>
                            <p>Année de construction : <b>{oneEstateData.year_of_construction.substring(0, 4)}</b></p>
                            <p>Surface habitable au sol : <b>{oneEstateData.living_surface}m²</b></p>
                            <p>Surface habitable ( selon Loi Carrez ) : <b>{oneEstateData.carrez_law}m²</b></p>
                            <p>Superficie du terrain : <b>{oneEstateData.land_surface}m²</b></p>

                            <H3>Aspects financiers</H3>
                            <p>Prix : <b>{oneEstateData.price}€</b></p>
                            <p>Taxe foncière : <b>{oneEstateData.property_charge}€</b></p>
                            <p>Charges locatives : <b>{oneEstateData.rental_charge ? oneEstateData.rental_charge + "€" : "non renseigné"}</b></p>
                            <p>Charges de co-propriété : <b>{oneEstateData.coownership_charge ? oneEstateData.coownership_charge + "€" : "non renseigné"}</b></p>
                        </div>
                        <div className="col-12 col-md-6">
                            <H3>Interieur</H3>
                            <p>Nombre de pièces : <b>{oneEstateData.nb_rooms} pièces</b></p>
                            <p>Nombre de salle de bain : <b>{oneEstateData.nb_bathrooms} pièces</b></p>
                            <p>Nombre de sanitaire : <b>{oneEstateData.nb_sanitary} pièces</b></p>
                            <p>Nombre de cuisine : <b>{oneEstateData.nb_kitchen} pièces</b></p>
                            <p>Type de cuisine : <b>{oneEstateData.type_kitchen}</b></p>
                            <p>Type de chauffage : <b>{oneEstateData.heaters}</b></p>

                            <H3>Extérieur</H3>
                            <p>Balcon : <b>{oneEstateData.nb_balcony}</b></p>
                            <p>Garage : <b>{oneEstateData.nb_garage}</b></p>
                            <p>Parking : <b>{oneEstateData.nb_parking}</b></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 border border-dark p-3 mt-3 rounded">
                            <div className='row'>
                                <H2 className="">Equipement</H2>
                                <div className='col-6'>
                                    {oneEstateData.communal_heating
                                        ? <p><Icons src={check} alt="Check" /> Chauffage collectif</p>
                                        : <p><Icons src={cross} alt="Cross" /> Chauffage collectif</p>}
                                    {oneEstateData.furnished
                                        ? <p><Icons src={check} alt="Check" /> Meublé</p>
                                        : <p><Icons src={cross} alt="Cross" /> Meublé</p>}
                                    {oneEstateData.private_parking
                                        ? <p><Icons src={check} alt="Check" /> Parking privé</p>
                                        : <p><Icons src={cross} alt="Cross" /> Parking privé</p>}
                                    {oneEstateData.handicap_access
                                        ? <p><Icons src={check} alt="Check" /> Accès handicapé</p>
                                        : <p><Icons src={cross} alt="Cross" /> Accès handicapé</p>}
                                    {oneEstateData.cellar
                                        ? <p><Icons src={check} alt="Check" /> Cave</p>
                                        : <p><Icons src={cross} alt="Cross" /> Cave</p>}
                                    {oneEstateData.terrace
                                        ? <p><Icons src={check} alt="Check" /> Terrace</p>
                                        : <p><Icons src={cross} alt="Cross" /> Terrace</p>}

                                </div>
                                <div className='col-6'>
                                    {oneEstateData.swimming_pool
                                        ? <p><Icons src={check} alt="Check" /> Piscine</p>
                                        : <p><Icons src={cross} alt="Cross" /> Piscine</p>}
                                    {oneEstateData.fireplace
                                        ? <p><Icons src={check} alt="Check" /> Cheminée</p>
                                        : <p><Icons src={cross} alt="Cross" /> Cheminée</p>}
                                    {oneEstateData.all_in_sewer
                                        ? <p><Icons src={check} alt="Check" /> Tout à l'égout</p>
                                        : <p><Icons src={cross} alt="Cross" /> Tout à l'égout</p>}
                                    {oneEstateData.septik_tank
                                        ? <p><Icons src={check} alt="Check" /> Fosse septique</p>
                                        : <p><Icons src={cross} alt="Cross" /> Fosse septique</p>}
                                    {oneEstateData.attic
                                        ? <p><Icons src={check} alt="Check" /> Grenier</p>
                                        : <p><Icons src={cross} alt="Cross" /> Grenier</p>}
                                    {oneEstateData.elevator
                                        ? <p><Icons src={check} alt="Check" /> Ascensseur</p>
                                        : <p><Icons src={cross} alt="Cross" /> Ascensseur</p>}
                                </div>



                            </div>
                        </div>
                    </div>
                </ScrollDiv>
            </DivDetail>
    );
};

export default DetailEstate;
