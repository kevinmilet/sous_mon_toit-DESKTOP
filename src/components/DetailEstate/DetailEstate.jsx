import React, {useContext,useEffect, useState} from 'react';
import styled from "styled-components";
import colors from '../../utils/styles/colors';
import axios from 'axios';
import Loader from "../Tools/Loader/Loader";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from '../../utils/context/Context';
import check from '../../assets/icons/check-square-regular.svg';
import { useParams } from 'react-router-dom';

const DivDetail = styled.div`
    background-color: ${colors.backgroundPrimary};
    -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    -moz-box-shadow:    0px 3px 6px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`
const H2 = styled.h2`
    color: ${colors.secondary};
    text-decoration: underline
`
const A = styled.a`
    color: ${colors.secondary};
    text-decoration: underline
`

const H3 = styled.h3`
    color: ${colors.secondaryBtn}
`
const Icons = styled.img`
    width: 40px;
    height: 40px
`

const DetailEstate = () => {

    const {id} = useParams();
    const [oneEstateData, setOneEstateData] = useState({})
    const [pictureCover, setPictureCover] = useState({})
    const [picturesList, setPicturesList] = useState({})
    const [loading, setLoading] = useState(true);
    const API_URL = useContext(Context).apiUrl;

    useEffect(()=>{

        // Récupération des données de l'estate
        // axios.get("http://localhost:8000/estates/" + id)
        axios.get(API_URL + ApiRoutes.estates + "/" + id)
        .then(res => {
            if(res.data === "aucun resultat"){
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
        
    },[API_URL,id])

    return (

        loading ? <Loader/> :

            <DivDetail className="container col-12 col-sm-10 col-md-8 col-lg-7 mx-auto mt-5 p-5">
                <div className="">
                    <p className="d-flex justify-content-between">Reference du biens : {oneEstateData.reference} <b className="text-danger fs-3">{oneEstateData.price}€</b></p>
                </div>
                <div className="row px-lg-5 pb-lg-5">
                    <img src={(pictureCover ? pictureCover.folder : "") + (pictureCover ? pictureCover.name : "") } className="img-fluid img-thumbnail" alt={oneEstateData.title}/>
                    {picturesList.map((picture, index) =>
                        <img key={index} src={(picture.folder ?? "") + (picture.name ?? "")} className="col-4 col-lg-2 img-fluid img-thumbnail" alt={oneEstateData.title}/>
                    )}
                </div>
                <div className="row">
                    <h2>{oneEstateData.title}</h2>
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
                    <div className="col-12 col-md-6 border border-dark p-3 mt-3 rounded">
                        <H2 className="">Les plus</H2>
                        
                        {oneEstateData.communal_heating ? <p><Icons src={check} alt="Check"/> Chauffage collectif</p> : null }
                        {oneEstateData.furnished ? <p><Icons src={check} alt="Check"/> Meublé</p> : null }
                        {oneEstateData.private_parking ? <p><Icons src={check} alt="Check"/> Parking privé</p> : null }
                        {oneEstateData.handicap_access ? <p><Icons src={check} alt="Check"/> Accès handicapé</p> : null }
                        {oneEstateData.cellar ? <p><Icons src={check} alt="Check"/> Cave</p> : null }
                        {oneEstateData.terrace ? <p><Icons src={check} alt="Check"/> Terrace</p> : null }
                        {oneEstateData.swimming_pool ? <p><Icons src={check} alt="Check"/> Piscine</p> : null }
                        {oneEstateData.fireplace ? <p><Icons src={check} alt="Check"/> Cheminée</p> : null }
                        {oneEstateData.all_in_sewer ? <p><Icons src={check} alt="Check"/> Tout à l'égout</p> : null }
                        {oneEstateData.septik_tank ? <p><Icons src={check} alt="Check"/> Fosse septique</p> : null }
                        {oneEstateData.attic ? <p><Icons src={check} alt="Check"/> Grenier</p> : null }
                        {oneEstateData.elevator ? <p><Icons src={check} alt="Check"/> Ascensseur</p> : null }
                    </div>
                    <div className="col-12 col-md-6 border border-dark p-3 mt-3 rounded">
                        <H2><A href="/contact" >Contactez l'agence</A></H2>
                        <p>Ce bien vous a tapé dans l'oeil ? Vous n'en dormez plus la nuit ? 
                            N'hesitez plus et contactez votre agence dès maintenant !</p>
                        <p>Appeler directement au <b>03 21 15 87 99</b></p>
                        <p>Ou ecrivez nous a : <a href="mailto:laforet.gerard.smt@gmail.com">laforet.gerard.smt@gmail.com</a></p>
                    </div>
                </div>
            </DivDetail>
    );
};

export default DetailEstate;