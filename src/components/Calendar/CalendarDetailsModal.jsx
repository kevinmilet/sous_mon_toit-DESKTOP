import React, {useContext, useEffect, useState} from 'react';
import '../../utils/styles/modal.css'
import {Modal} from "react-bootstrap";
import moment from 'moment';
import 'moment/locale/fr';
import {StyledBtnSecondary, StyledInput, StyledSelect, StyledTextarea} from "../../utils/styles/Atoms";

import styled from "styled-components";
import colors from "../../utils/styles/colors";
import axios from "axios";
import apiRoutes from "../../utils/const/ApiRoutes";
import ApiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";
import * as PropTypes from "prop-types";
import Loader from "../Tools/Loader/Loader";
import {Formik} from "formik";
import * as Yup from "yup";

const Icon = styled.i`
    color: ${colors.primaryBtn};
    font-size: 22px
`

const Label = styled.label`
    font-weight: 700;
    color: ${colors.primary};
    margin-bottom: 5px;
    margin-left: 10px;
`

const Button = styled.button`
    border: none;
    background-color: ${colors.backgroundPrimary}
`

const SearchPanel = styled.div`
    min-width: 200px;
    max-width: fit-content;
    position: absolute;
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16); 
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16);
    background-color: ${colors.backgroundPrimary};
    z-index: 10
`

const ListItem = styled.li`
    padding: 3px 0;
    &:focus {
        border: 1px solid ${colors.secondaryBtn};
        background-color: ${colors.secondaryBtn};
    }
`

const LinkItem = styled.a`
    text-decoration: none;
    &:hover {
        border: 1px solid ${colors.secondaryBtn};
        background-color: ${colors.secondaryBtn};
        color: ${colors.backgroundPrimary}
    }
`

SearchPanel.propTypes = {children: PropTypes.node};
const CalendarDetailsModal = ({showDetailledEventModal, setShowDetailledEventModal, appointmentDatas, staffList}) => {

    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [apptmtTypes, setApptmtTypes] = useState();
    const [textCustomer, setTextCustomer] = useState('');
    const [textEstate, setTextEstate] = useState('');
    const [customerSearchResult, setCustomerSearchResult] = useState();
    const [estateSearchResult, setEstateSearchResult] = useState();

    let dateMin = moment().format('YYYY-MM-DD');
    let dateValue = moment(appointmentDatas.scheduled_at).format('YYYY-MM-DD');
    let timeValue = moment(appointmentDatas.scheduled_at).format('HH:mm:ss');

    const getApptmtType = () => {
        axios.get(API_URL + ApiRoutes.apptmtType).then(res => {
            setApptmtTypes(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getCustomersResults = (textCustomer) => {
        console.log(textCustomer)
        axios.get(API_URL + ApiRoutes.search_customer + textCustomer).then(res => {
            setCustomerSearchResult(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getEstatesResults = (textEstate) => {
        axios.get(API_URL + ApiRoutes.search_estates + '/' + textEstate).then(res => {
            setEstateSearchResult(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!apptmtTypes) {
            setTextCustomer((appointmentDatas.customerFirstname ?? '')
                + ' ' + (appointmentDatas.customerLastname ?? ''));
            setTextEstate((appointmentDatas.reference ?? 'Non renseigné')
                + ' ' + (appointmentDatas.address ?? '')
                + ' ' + (appointmentDatas.city ?? '')
                + ' ' + (appointmentDatas.zipcode ?? ''));
            getApptmtType()
        }
    }, []);

    const deleteAppointment = (apptmtId) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Voulez-vous vraiment supprimer ce rendez-vous?')) {
            axios.delete(API_URL + apiRoutes.delete_apptmt + apptmtId).then(
                res => {
                    console.log(res.status);
                    alert('Rendez-vous supprimé');
                    window.location.reload();
                }).catch(e => {
                console.error(e.message)
                alert('Le rendez-vous n\'a pas pu être supprimé');
            })
            showDetailledEventModal(false)
        }
    }

    const onEditClick = () => {
        let inputs = document.getElementsByClassName('edit');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }

        document.querySelector('.edit-link').style.display = 'inline-block';
    }

    const onCancelClick = () => {
        let inputs = document.getElementsByClassName('edit');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }

        document.querySelector('.edit-link').style.display = 'none';
    }

    const onSelectedEstate = (item) => {
        setEstateSearchResult(null);
        setTextEstate(item.title + '- ' + item.city + ' ' + item.zipcode + ' ' + item.reference);
    }

    const onSelectedCustomer = (item) => {
        setCustomerSearchResult(null);
        setTextCustomer(item.firstname + ' ' + item.lastname);

    }


    const updateAppointment = (datas) => {
        axios.put(API_URL + ApiRoutes.update_event
            + `/${appointmentDatas.id}?id_appointment_type=${datas.id_appointment_type}&id_customer=${datas.id_customer}&id_estate=${datas.id_estate}&id_staff=${datas.id_staff}&notes=${datas.notes}&scheduled_at=${datas.scheduled_at}`).then(res => {
            alert('Rendez-vous modifié')
            // à changer
            window.location.reload();
        }).catch(e => {
            console.log(e.message)
        })
        setShowDetailledEventModal(false)
    }

    return (
        <Modal show={showDetailledEventModal} size="xl" backdrop="static" keyboard={false} centered>
            {(loading) ?
                <Loader/> : (
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            notes: appointmentDatas.notes ?? '',
                            id_estate: appointmentDatas.id_estate ?? '',
                            id_customer: appointmentDatas.id_customer ?? '',
                            id_appointment_type: appointmentDatas.apptmt_type_id ?? '',
                            id_staff: appointmentDatas.id_staff ?? '',
                            date: dateValue,
                            time: timeValue
                        }}
                        validationSchema={Yup.object({
                            notes: Yup.string(),
                            id_estate: Yup.number(),
                            id_customer: Yup.string().required('Veuillez sélectionner un client/contact ou en créer un'),
                            id_appointment_type: Yup.string().required('Veuillez sélectionner un type de rendez-vous'),
                            id_staff: Yup.string().required('Veuillez sélectionner un agent'),
                        })}
                        onSubmit={async (values) => {
                            values.time.length === 5 ? timeValue = values.time + ':00' : timeValue = values.time;
                            const scheduled_at = (values.date ?? dateValue) + ' ' + timeValue;
                            let data = {
                                ...values, scheduled_at: scheduled_at
                            }
                            await new Promise(r => {
                                console.log(data);
                                updateAppointment(data);
                            })
                        }}
                    >
                        {({
                              handleChange,
                              handleSubmit,
                              setFieldValue,
                              values,
                              errors
                          }) => (
                            <Modal.Body>
                                <div className='text-center mb-3'>
                                    <h2>Détails du rendez-vous</h2>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Date</Label>
                                            <StyledInput type="date"
                                                         id="date"
                                                         name="date"
                                                         className="form-control edit"
                                                         min={dateMin}
                                                         value={values.date}
                                                         onChange={handleChange}
                                                         disabled
                                            />
                                        </div>
                                        <div className="col m-3">
                                            <Label>Heure</Label>
                                            <StyledInput type="time"
                                                         id="time"
                                                         name="time"
                                                         className="form-control edit"
                                                         min="08:00"
                                                         max="19:00"
                                                         value={values.time}
                                                         onChange={handleChange}
                                                         disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Agent</Label>
                                            <StyledSelect
                                                className="form-select edit"
                                                id="id_staff"
                                                name="id_staff"
                                                onChange={handleChange}
                                                disabled
                                            >
                                                <option selected value={appointmentDatas.id_staff}
                                                        key={appointmentDatas.id_staff}>
                                                    {appointmentDatas.staffFirstname + ' ' + appointmentDatas.staffLastname}
                                                </option>
                                                {staffList?.map(item => (
                                                    <option value={item.id} key={item.id}>
                                                        {item.firstname} {item.lastname}
                                                    </option>))}
                                            </StyledSelect>
                                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.id_staff ?? null}</div>
                                        </div>
                                        <div className="col m-3">
                                            <Label>Client / Contact</Label>
                                            <StyledInput type="text"
                                                         id="id_customer"
                                                         name="id_customer"
                                                         className="form-control edit"
                                                         value={textCustomer}
                                                         disabled
                                                         onChange={(e) => {
                                                             handleChange(e)
                                                             setTextCustomer(e.target.value)
                                                         }}
                                                         onKeyUp={() => {
                                                             setTimeout(() => {
                                                                 if (textCustomer.length >= 2) {
                                                                     getCustomersResults(textCustomer);
                                                                 } else {
                                                                     getCustomersResults(null)
                                                                 }
                                                             }, 200);
                                                         }}
                                            />
                                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.id_customer ?? null}</div>
                                            {(customerSearchResult && customerSearchResult?.length !== 0) ? (
                                                <SearchPanel>
                                                    <ul>
                                                        {
                                                            customerSearchResult?.map(item => (
                                                                <ListItem key={item.id}>
                                                                    <LinkItem onClick={() => {
                                                                        onSelectedCustomer(item)
                                                                        setFieldValue('id_customer', item.id)
                                                                    }}>
                                                                        {item.firstname} {item.lastname}
                                                                    </LinkItem>
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </ul>
                                                </SearchPanel>) : null
                                            }
                                            {(customerSearchResult && customerSearchResult?.length === 0) ? (
                                                <SearchPanel>
                                                    <p>Pas de résultats...</p>
                                                </SearchPanel>) : null
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Bien</Label>
                                            <StyledInput type="text"
                                                         id="id_estate"
                                                         name="id_estate"
                                                         className="form-control edit"
                                                         value={textEstate}
                                                         disabled
                                                         onChange={(e) => {
                                                             handleChange(e)
                                                             setTextEstate(e.target.value)
                                                         }}
                                                         onKeyUp={() => {
                                                             setTimeout(() => {
                                                                 if (textEstate.length >= 2) {
                                                                     getEstatesResults(textEstate);
                                                                 } else {
                                                                     getEstatesResults(null)
                                                                 }
                                                             }, 200);
                                                         }}
                                            />
                                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.id_staff ?? null}</div>
                                            {(estateSearchResult && estateSearchResult?.length !== 0) ? (
                                                <SearchPanel>
                                                    <ul>
                                                        {
                                                            estateSearchResult?.map(item => (
                                                                <ListItem key={item.id}>
                                                                    <LinkItem onClick={() => {
                                                                        onSelectedEstate(item)
                                                                        setFieldValue('id_estate', item.id)
                                                                    }}>
                                                                        {item.reference} - {item.address} - {item.city} {item.zipcode}
                                                                    </LinkItem>
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </ul>
                                                </SearchPanel>) : null
                                            }{(estateSearchResult && estateSearchResult?.length === 0) ? (
                                            <SearchPanel>
                                                <p>Pas de résultats...</p>
                                            </SearchPanel>) : null
                                        }
                                        </div>
                                        <div className="col m-3">
                                            <Label>Type de rendez-vous</Label>
                                            <StyledSelect
                                                className="form-select edit"
                                                id="id_appointment_type"
                                                name="id_appointment_type"
                                                value={appointmentDatas.appointment_type}
                                                onChange={handleChange}
                                                disabled>
                                                <option selected value={appointmentDatas.apptmt_type_id}
                                                        key={appointmentDatas.apptmt_type_id}>
                                                    {appointmentDatas.appointment_type}
                                                </option>
                                                {apptmtTypes?.map(item => (
                                                    <option value={item.id}
                                                            key={item.id}>{item.appointment_type} </option>))
                                                }
                                            </StyledSelect>
                                            {/*<div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.id_appointment_type ?? null}</div>*/}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Notes</Label>
                                            <StyledTextarea className="form-control edit"
                                                            id="notes"
                                                            name="notes"
                                                            value={values.notes}
                                                            disabled
                                                            onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className="row mt-3">
                                    <div className="col text-start">
                        <span>
                            <Button onClick={() => deleteAppointment(appointmentDatas.id)}><Icon
                                className="far fa-trash-alt m-2"/></Button>
                            <Button onClick={() => onEditClick()}><Icon className="far fa-edit m-2"/></Button>
                        </span>
                                        <span className="edit-link" style={{display: 'none'}}>
                            <Button variant="link"
                                    style={{color: "#4EA1D5", fontWeight: 700}}
                                    onClick={() => onCancelClick()}>
                                Annuler
                            </Button>
                            <Button variant="link"
                                    style={{color: "#4EA1D5", fontWeight: 700}}
                                    type="submit" onClick={handleSubmit}>
                                Sauvegarder
                            </Button>
                        </span>
                                    </div>
                                </div>
                                <div className='text-end m-3'>
                                    <StyledBtnSecondary type="button" className="mx-3"
                                                        onClick={() => setShowDetailledEventModal(false)}>
                                        Fermer
                                    </StyledBtnSecondary>
                                </div>
                            </Modal.Body>
                        )}
                    </Formik>
                )}
        </Modal>
    );
};

export default CalendarDetailsModal;
