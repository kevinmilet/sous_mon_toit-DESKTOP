import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import axios from "axios";
import Loader from "../Tools/Loader/Loader";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import check from "../../assets/icons/check-circle-regular.svg";
import cross from "../../assets/icons/times-circle-regular.svg";
import ModalUpdateEquipment from "./updateForm/ModalUpdateEquipment";
import ModalUpdateCaract from "./updateForm/ModalUpdateCaract";
import ModalUpdateInfo from "./updateForm/ModalUpdateInfo";
import ModalUpdateLoca from "./updateForm/ModalUpdateLoca";
import ModalUpdatePhoto from "./updateForm/ModalUpdatePhoto";
import { Link, useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { useSnackbar } from "react-simple-snackbar";
import "./DetailEstates.scss";

const DivDetail = styled.div`
  margin-top: -100px;
  background-color: ${colors.backgroundPrimary};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;
const ScrollDiv = styled.div`
  height: 65vh;
  padding: 15px;
  overflow: auto;
`;
const H2 = styled.h2`
  color: ${colors.secondary};
  font-weight: bold;
`;
// const A = styled.a`
//   color: white;
//   background-color: ${colors.secondary};
//   border-top-left-radius: 20px;
//   border-top-right-radius: 20px;
//   border-bottom-left-radius: 20px;
//   border-bottom-right-radius: 20px;
// `;
const H3 = styled.h3`
  color: ${colors.secondaryBtn};
`;
const Icons = styled.img`
  width: 40px;
  height: 40px;
`;
const Icon = styled.i`
  color: ${colors.primaryBtn};
  font-size: 22px;
`;

const DetailEstate = ({
  reload,
  setReload,
  setShowUpdatePhotoEstateModal,
  setShowUpdateLocaEstateModal,
  setShowUpdateEquipEstateModal,
  setShowUpdateCaractEstateModal,
  setShowUpdateInfoEstateModal,
  setEstateId,
}) => {
  const { id } = useParams();
  const [oneEstateData, setOneEstateData] = useState({});
  const [picturesList, setPicturesList] = useState({});
  const [loading, setLoading] = useState(true);
  const API_URL = useContext(Context).apiUrl;
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [picturesArray, setPicturesArray] = useState([]);
  const [openSnackbar] = useSnackbar({
    position: "top-center",
    style: {
      backgroundColor: colors.backgroundPrimary,
      border: "2px solid black",
      borderColor: colors.secondary,
      borderRadius: "50px",
      color: colors.secondaryBtn,
      fontSize: "20px",
      textAlign: "center",
    },
  });

  useEffect(() => {
    // Récupération des données de l'estate
    // axios.get("http://localhost:8000/estates/" + id)
    if (reload === true) {
      setReload(false);
    }
    axios
      .get(API_URL + ApiRoutes.estates + "/" + id)
      .then((res) => {
        if (res.data === "aucun resultat") {
          return (window.location.href = "/liste-des-biens");
        }
        setOneEstateData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        // liste des images du bien
        // axios.get("http://localhost:8000/estates_pictures/" + id)
        axios
          .get(API_URL + ApiRoutes.estates_pictures + "/" + id)
          .then((res) => {
            setPicturesList(res.data);
            // Tableau d'image pour le viewer
            let array = [];
            res.data.forEach((picture) => {
              array.push(ApiRoutes.COVER_ESTATE_BASE_URL + picture.name);
            });
            setPicturesArray(array);
          })
          .catch((error) => {
            console.log(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, [API_URL, id, reload, setReload]);

  // Fonctions du viewer d'image
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  // Suppression d'une image
  const DeleteImg = (pictureId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette photo?")) {
      axios
        .delete(API_URL + ApiRoutes.delete_pictures + "/" + pictureId)
        // axios.post("http://localhost:8000/estates_pictures/delete/" + id, formData)
        .then((res) => {
          // Message de succès
          openSnackbar("Photo effacé avec succès !", 3000);
          setReload(true);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  // Suppression du bien !
  const DeleteEstate = (pictureId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce bien?")) {
      axios
        .delete(API_URL + ApiRoutes.delete_all_pictures_estate + "/" + id)
        // axios.delete("http://localhost:8000/estates/delete/" + id)
        .then((res) => {
          axios
            .delete(API_URL + ApiRoutes.delete_estate + "/" + id)
            // axios.delete("http://localhost:8000/estates/delete/" + id)
            .then((res) => {
              // Message de succès
              openSnackbar(
                "Supression du bien ... vous allez être redirigé ...",
                3000
              );
              setTimeout(() => {
                // return window.location.href = '/liste-des-biens'
              }, 3000);
            })
            .catch((error) => {
              console.log(error.response);
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  // Changer la photo de couverture
  const ChoiceCover = (pictureId) => {
    axios
      .post(
        API_URL + ApiRoutes.choiceCover_pictures + "/" + id + "/" + pictureId
      )
      // axios.post("http://localhost:8000/estates_pictures/choiceCover" + "/" + id + "/" + pictureId)
      .then((res) => {
        // Message de succès
        openSnackbar("Photo effacé avec succès !", 3000);
        setReload(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // Fonction de changement d'onglet
  const ChangeOnglet = (id, button) => {
    // Masquage des divs
    var divIds = [
      "informations",
      "proprietaire",
      "photos",
      "localisation",
      "caracteristiques",
      "equipement",
    ];
    divIds.forEach((idDiv) => {
      document.getElementById(idDiv).style.display = "none";
    });
    //Réinitialisation de la couleur des boutons
    document.querySelectorAll("div#divButton > A").forEach((a) => {
      a.style.backgroundColor = colors.secondary;
    });
    //Changement du style du bouton
    button.style.backgroundColor = colors.secondaryBtn;
    //Affichage de la div
    document.getElementById(id).style.cssText = "display: flex;";
  };

  //Fonction d'affichage des modals
  const modalUpdateEquipment = (estateId) => {
    return <ModalUpdateEquipment estateId={estateId} />;
  };
  const modalUpdateCaract = (estateId) => {
    return <ModalUpdateCaract estateId={estateId} />;
  };
  const modalUpdateInfo = (estateId) => {
    return <ModalUpdateInfo estateId={estateId} />;
  };
  const modalUpdateLoca = (estateId) => {
    return <ModalUpdateLoca estateId={estateId} />;
  };
  const modalUpdatePhoto = (estateId) => {
    return <ModalUpdatePhoto estateId={estateId} />;
  };
  return loading ? (
    <Loader />
  ) : (
    <DivDetail className="container col-12 mx-auto p-4">
      <div className="row d-flex flex-row justify-content-between align-items-baseline px-3">
        <p className="col-8 d-flex justify-content-between align-items-center">
          {" "}
          <b>{oneEstateData.estate_type_name}</b>
          <b className="text-danger">
            Référence: {oneEstateData.reference}
          </b>{" "}
          <b>{oneEstateData.title}</b>
          <b className="text-danger">Prix: {oneEstateData.price}€</b>
        </p>
        <Link
          className="link btn col-2"
          onClick={(e) => {
            DeleteEstate();
          }}
        >
          Supprimer
          <Icon
            style={{ color: colors.backgroundPrimary }}
            className="far fa-trash-alt m-2 cursor-pointer"
          />
        </Link>
      </div>
      <div id="divButton">
        <Link
          className="link btn"
          style={{ backgroundColor: colors.secondaryBtn }}
          onClick={(e) => {
            ChangeOnglet("informations", e.target);
          }}
        >
          Informations
        </Link>
        <Link
          className="link btn"
          onClick={(e) => {
            ChangeOnglet("proprietaire", e.target);
          }}
        >
          Propriétaire
        </Link>
        <Link
          className="link btn"
          onClick={(e) => {
            ChangeOnglet("photos", e.target);
          }}
        >
          Photos
        </Link>
        <Link
          className="link btn"
          onClick={(e) => {
            ChangeOnglet("localisation", e.target);
          }}
        >
          Localisation
        </Link>
        <Link
          className="link btn"
          onClick={(e) => {
            ChangeOnglet("caracteristiques", e.target);
          }}
        >
          Caractéristiques
        </Link>
        <Link
          className="link btn"
          onClick={(e) => {
            ChangeOnglet("equipement", e.target);
          }}
        >
          Equipement
        </Link>
      </div>
      <ScrollDiv>
        {/* Information */}
        <div className="row mt-3" style={{ display: "flex" }} id="informations">
          <div className="col-12">
            <div className="row justify-content-between">
              <div className="col-8">
                <H2 className="">Informations</H2>
              </div>
              <button
                className="col-2 btn"
                onClick={() =>
                  modalUpdateInfo(
                    setEstateId(oneEstateData.id),
                    setShowUpdateInfoEstateModal(true)
                  )
                }
              >
                Modifier <Icon className="far fa-edit" />
              </button>
            </div>
          </div>
          <div className="col-4">
            <H3>Général</H3>
            <p>
              Type de contrat : <b>{oneEstateData.buy_or_rent}</b>
            </p>
            <p>
              Type de biens : <b>{oneEstateData.estate_type_name}</b>
            </p>
            <p>
              Année de construction :{" "}
              <b>
                {oneEstateData.year_of_construction
                  ? oneEstateData.year_of_construction.substring(0, 4)
                  : ""}
              </b>
            </p>
            <p>
              Disponibilité : <b>{oneEstateData.disponibility}</b>
            </p>
          </div>
          <div className="col-4">
            <H3>Surface</H3>
            <p>
              Surface habitable au sol : <b>{oneEstateData.living_surface}m²</b>
            </p>
            <p>
              Surface habitable (Loi Carrez) :{" "}
              <b>{oneEstateData.carrez_law}m²</b>
            </p>
            <p>
              Superficie du terrain : <b>{oneEstateData.land_surface}m²</b>
            </p>
          </div>
          <div className="col-4">
            <H3>Aspects financiers</H3>
            <p>
              Prix : <b>{oneEstateData.price}€</b>
            </p>
            <p>
              Taxe foncière : <b>{oneEstateData.property_charge}€</b>
            </p>
            <p>
              Charges locatives :{" "}
              <b>
                {oneEstateData.rental_charge
                  ? oneEstateData.rental_charge + "€"
                  : "non renseigné"}
              </b>
            </p>
            <p>
              Charges de co-propriété :{" "}
              <b>
                {oneEstateData.coownership_charge
                  ? oneEstateData.coownership_charge + "€"
                  : "non renseigné"}
              </b>
            </p>
          </div>
          <div className="col-12">
            <H3>Description</H3>
            <p>
              Titre : <b>{oneEstateData.title}</b>
            </p>
            <p>Description : {oneEstateData.description}</p>
          </div>
        </div>
        {/* Propriétaire */}
        <div className="row mt-3" style={{ display: "none" }} id="proprietaire">
          <H2>Propriétaire</H2>
          <div className="col-12">
            <h4>
              {oneEstateData.lastname} {oneEstateData.firstname}
            </h4>
            <p>Numéro Client: {oneEstateData.n_customer} </p>
            <p>Mail : {oneEstateData.mail}</p>
            <p>Téléphone : {oneEstateData.phone}</p>
            <Link
              className="link btn"
              onClick={(e) => {
                window.location.href =
                  "/customer_detail/" + oneEstateData.id_customer;
              }}
            >
              Voir fiche
            </Link>
          </div>
        </div>
        {/* Photos */}
        <div
          className="row mt-3 align-items-center"
          style={{ display: "none" }}
          id="photos"
        >
          <div className="col-12">
            <div className="row justify-content-between">
              <div className="col-8">
                <H2 className="">Photo</H2>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row d-flex">
              {picturesList.map((picture, index) => (
                <div
                  className="col-4 p-2"
                  style={{ boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)" }}
                  key={index}
                >
                  <img
                    src={
                      ApiRoutes.COVER_ESTATE_BASE_URL +
                      (picture.name ?? "estate_default.jpg")
                    }
                    className="img-fluid"
                    alt="test"
                    onClick={() => openImageViewer(index)}
                  />
                  <div>
                    {picture.cover === 1 ? (
                      <div className="d-flex justify-content-center">
                        Photo de couverture
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn border"
                          style={{ color: colors.secondary }}
                          onClick={(e) => {
                            DeleteImg(picture.id);
                          }}
                        >
                          Supprimer
                          <Icon className="far fa-trash-alt m-2 cursor-pointer" />
                        </button>
                        <button
                          className="btn border"
                          style={{ color: colors.secondaryBtn }}
                          onClick={(e) => {
                            ChoiceCover(picture.id);
                          }}
                        >
                          Définir comme photo de couverture
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isViewerOpen && (
                <ImageViewer
                  src={picturesArray}
                  currentIndex={currentImage}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                  }}
                />
              )}
              <div className="col-4 d-flex justify-content-center align-items-center">
                <button
                  className="btn border rounded"
                  style={{ color: colors.secondary }}
                  onClick={() =>
                    modalUpdatePhoto(
                      setEstateId(oneEstateData.id),
                      setShowUpdatePhotoEstateModal(true)
                    )
                  }
                >
                  Ajouter une photo <Icon className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Localisation */}
        <div className="row mt-3" style={{ display: "none" }} id="localisation">
          <div className="col-12">
            <div className="row justify-content-between">
              <div className="col-8">
                <H2 className="">Localisation</H2>
              </div>
              <button
                className="col-2 btn"
                onClick={() =>
                  modalUpdateLoca(
                    setEstateId(oneEstateData.id),
                    setShowUpdateLocaEstateModal(true)
                  )
                }
              >
                Modifier <Icon className="far fa-edit" />
              </button>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <b style={{ display: "inline-block" }}>
              {oneEstateData.estateAddress} {oneEstateData.zipcode}{" "}
              {oneEstateData.city}, FRANCE
            </b>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            {/*Carte*/}
            <iframe
              width="400"
              height="250"
              title="carte de localisation"
              loading="lazy"
              allowFullScreen
              src={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyBqKdClbH20Svws6E7CB6sOcTr237Ryf1M&zoom=14&center=" +
                oneEstateData.estate_latitude +
                "%2C" +
                oneEstateData.estate_longitude +
                "&q=" +
                oneEstateData.estateAddress.replace(" ", "+") +
                "," +
                oneEstateData.city.replace(" ", "+") +
                ",France"
              }
            ></iframe>
          </div>
        </div>
        {/* Caractéristiques */}
        <div
          className="row mt-3"
          style={{ display: "none" }}
          id="caracteristiques"
        >
          <div className="col-12">
            <div className="row justify-content-between">
              <div className="col-8">
                <H2 className="">Caractéristiques</H2>
              </div>
              <button
                className="col-2 btn"
                onClick={() =>
                  modalUpdateCaract(
                    setEstateId(oneEstateData.id),
                    setShowUpdateCaractEstateModal(true)
                  )
                }
              >
                Modifier <Icon className="far fa-edit" />
              </button>
            </div>
          </div>
          <div className="col-6">
            <H3>Interieur</H3>
            <p>
              Nombre de pièces : <b>{oneEstateData.nb_rooms}</b>
            </p>
            <p>
              Nombre de chambre : <b>{oneEstateData.nb_bedrooms}</b>
            </p>
            <p>
              Nombre de salle de bain : <b>{oneEstateData.nb_bathrooms}</b>
            </p>
            <p>
              Nombre de sanitaire : <b>{oneEstateData.nb_sanitary}</b>
            </p>
            <p>
              Nombre de toilette : <b>{oneEstateData.nb_toilet}</b>
            </p>
            <p>
              Nombre de cuisine : <b>{oneEstateData.nb_kitchen}</b>
            </p>
            <p>
              Type de cuisine : <b>{oneEstateData.type_kitchen}</b>
            </p>
            <p>
              Type de chauffage : <b>{oneEstateData.heaters}</b>
            </p>
          </div>
          <div className="col-6">
            <H3>Extérieur</H3>
            <p>
              Balcon : <b>{oneEstateData.nb_balcony}</b>
            </p>
            <p>
              Garage : <b>{oneEstateData.nb_garage}</b>
            </p>
            <p>
              Parking : <b>{oneEstateData.nb_parking}</b>
            </p>
          </div>
        </div>
        {/* Equipement */}
        <div className="row mt-3" style={{ display: "none" }} id="equipement">
          <div className="col-12">
            <div className="row justify-content-between">
              <div className="col-8">
                <H2 className="">Equipement</H2>
              </div>
              <button
                className="col-2 btn"
                onClick={() =>
                  modalUpdateEquipment(
                    setEstateId(oneEstateData.id),
                    setShowUpdateEquipEstateModal(true)
                  )
                }
              >
                Modifier <Icon className="far fa-edit" />
              </button>
            </div>
          </div>
          <div className="col-6">
            {oneEstateData.communal_heating ? (
              <p>
                <Icons src={check} alt="Check" /> Chauffage collectif
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Chauffage collectif
              </p>
            )}
            {oneEstateData.furnished ? (
              <p>
                <Icons src={check} alt="Check" /> Meublé
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Meublé
              </p>
            )}
            {oneEstateData.private_parking ? (
              <p>
                <Icons src={check} alt="Check" /> Parking privé
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Parking privé
              </p>
            )}
            {oneEstateData.handicap_access ? (
              <p>
                <Icons src={check} alt="Check" /> Accès handicapé
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Accès handicapé
              </p>
            )}
            {oneEstateData.cellar ? (
              <p>
                <Icons src={check} alt="Check" /> Cave
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Cave
              </p>
            )}
            {oneEstateData.terrace ? (
              <p>
                <Icons src={check} alt="Check" /> Terrace
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Terrace
              </p>
            )}
          </div>
          <div className="col-6">
            {oneEstateData.swimming_pool ? (
              <p>
                <Icons src={check} alt="Check" /> Piscine
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Piscine
              </p>
            )}
            {oneEstateData.fireplace ? (
              <p>
                <Icons src={check} alt="Check" /> Cheminée
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Cheminée
              </p>
            )}
            {oneEstateData.all_in_sewer ? (
              <p>
                <Icons src={check} alt="Check" /> Tout à l'égout
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Tout à l'égout
              </p>
            )}
            {oneEstateData.septik_tank ? (
              <p>
                <Icons src={check} alt="Check" /> Fosse septique
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Fosse septique
              </p>
            )}
            {oneEstateData.attic ? (
              <p>
                <Icons src={check} alt="Check" /> Grenier
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Grenier
              </p>
            )}
            {oneEstateData.elevator ? (
              <p>
                <Icons src={check} alt="Check" /> Ascensseur
              </p>
            ) : (
              <p>
                <Icons src={cross} alt="Cross" /> Ascensseur
              </p>
            )}
          </div>
        </div>
      </ScrollDiv>
    </DivDetail>
  );
};

export default DetailEstate;
