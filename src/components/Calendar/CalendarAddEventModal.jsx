import React, {useContext, useEffect, useState} from 'react';
import '../../utils/styles/modal.css'
import {Modal} from "react-bootstrap";
import {
    StyledBtnPrimary,
    StyledBtnSecondary,
    StyledInput,
    StyledSelect,
    StyledTextarea
} from "../../utils/styles/Atoms";
import moment from "moment";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";
import Loader from "../Tools/Loader/Loader";
import {Formik} from "formik";
import * as Yup from "yup";

const Label = styled.label`
    font-weight: 700;
    color: ${colors.primary};
    margin-bottom: 5px;
    margin-left: 10px;
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

const Button = styled.button`
    border: none;
    background-color: ${colors.backgroundPrimary}
`

const CalendarAddEventModal = ({showAddEventModal, setShowAddEventModal, staffList, infos}) => {
    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [apptmtTypes, setApptmtTypes] = useState();
    const [textCustomer, setTextCustomer] = useState('');
    const [textEstate, setTextEstate] = useState('');
    const [customerSearchResult, setCustomerSearchResult] = useState();
    const [estateSearchResult, setEstateSearchResult] = useState();

    if (!infos) {
        infos = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let dateMin = moment().format('YYYY-MM-DD');
    let dateValue = moment(infos.dateStr).format('YYYY-MM-DD');
    let timeValue = moment(infos.dateStr).format('HH:mm');

    const getCustomersResults = (textCustomer) => {
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

    const getApptmtType = () => {
        axios.get(API_URL + ApiRoutes.apptmtType).then(res => {
            setApptmtTypes(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!apptmtTypes) {
            getApptmtType()
        }
    }, []);

    const onSelectedEstate = (item) => {
        setEstateSearchResult(null);
        setTextEstate(item.title + '- ' + item.city + ' ' + item.zipcode + ' ' + item.reference);
    }

    const onSelectedCustomer = (item) => {
        setCustomerSearchResult(null);
        setTextCustomer(item.firstname + ' ' + item.lastname);

    }

    const insertAppointment = (datas) => {
        axios.post(API_URL + ApiRoutes.create_apptmt, datas).then(res => {
            alert('Rendez-vous enregistré')
            // à changer
            window.location.reload();
        }).catch(e => {
            console.log(e.message)
        })
        setShowAddEventModal(false)
    }

    return (
        <Modal show={showAddEventModal} size="xl" backdrop="static" keyboard={false} centered>
            {(loading) ?
                <Loader/> : (
                    <Formik
                        initialValues={{
                            notes: '',
                            id_estate: '',
                            id_customer: '',
                            id_appointment_type: '',
                            id_staff: '',
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
                            const scheduled_at = (values.date ? values.date : dateValue) + ' ' + (values.time ? values.time : timeValue) + ':00';
                            let data = {
                                ...values, scheduled_at: scheduled_at
                            }
                            await new Promise(r => {
                                insertAppointment(data);
                            })
                        }}
                    >
                        {({ handleChange,
                            handleSubmit,
                            setFieldValue,
                            values,
                            errors
                          }) => (
                            <Modal.Body>
                                <div className='text-center mb-3'>
                                    <h2>Ajouter un rendez-vous</h2>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Client</Label>
                                            <StyledInput
                                                id="id_customer"
                                                name="id_customer"
                                                className="form-control"
                                                value={textCustomer}
                                                placeholder="Chercher un client"
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
                                                                    <LinkItem onClick={() => {onSelectedCustomer(item)
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
                                        <div className="col m-3">
                                            <Label>Agent</Label>
                                            <StyledSelect className="form-select" id="id_staff"
                                                          name="id_staff"
                                                          onChange={handleChange}
                                            >
                                                <option selected value=""/>
                                                {staffList?.map(item => (
                                                    <option value={item.id} key={item.id}>
                                                        {item.firstname} {item.lastname}
                                                    </option>))}
                                            </StyledSelect>
                                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.id_staff ?? null}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Bien</Label>
                                            <StyledInput
                                                id="id_estate"
                                                name="id_estate"
                                                className="form-control"
                                                value={textEstate}
                                                placeholder="Chercher un bien"
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
                                            {(estateSearchResult && estateSearchResult?.length !== 0) ? (
                                                <SearchPanel>
                                                    <ul>
                                                        {
                                                            estateSearchResult?.map(item => (
                                                                <ListItem key={item.id}>
                                                                    <LinkItem onClick={() => {onSelectedEstate(item)
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
                                            <StyledSelect className="form-select" id="id_appointment_type"
                                                          name="id_appointment_type"
                                                          onChange={handleChange}
                                            >
                                                <option selected value=""/>
                                                {apptmtTypes?.map(item => (
                                                    <option value={item.id}
                                                            key={item.id}>{item.appointment_type} </option>))
                                                }
                                            </StyledSelect>
                                            <div className="error mt-2" style={{color: "#E85A70", fontStyle: 'italic'}}>{errors.id_appointment_type ?? null}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Date</Label>
                                            <StyledInput type="date"
                                                         id="date"
                                                         name="date"
                                                         className="form-control"
                                                         min={dateMin}
                                                         value={values.date}
                                                         onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col m-3">
                                            <Label>Heure</Label>
                                            <StyledInput type="time"
                                                         id="time"
                                                         name="time"
                                                         className="form-control"
                                                         min="08:00"
                                                         max="19:00"
                                                         value={values.time}
                                                         onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col m-3">
                                            <Label>Notes</Label>
                                            <StyledTextarea className="form-control" id="notes"
                                                            name="notes"
                                                            onChange={handleChange}/>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col">
                                        <div className='text-start m-3'>
                                            <Button variant="link"
                                                    style={{color: "#4EA1D5", fontWeight: 700}}
                                                    >
                                                Créer un client
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='text-end m-3'>
                                            <StyledBtnSecondary className="m-3"
                                                                onClick={() => setShowAddEventModal(false)}>
                                                Annuler
                                            </StyledBtnSecondary>
                                            <StyledBtnPrimary type="submit" onClick={handleSubmit}>
                                                Valider
                                            </StyledBtnPrimary>
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                        )}
                    </Formik>
                )}
        </Modal>
    );
};

export default CalendarAddEventModal;
