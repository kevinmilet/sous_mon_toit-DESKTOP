import React, {useContext, useEffect, useState} from 'react';
import  '../../utils/styles/modal.css'
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

const Label = styled.label`
    font-weight: 700;
    color: ${colors.primary};
    margin-bottom: 5px;
    margin-left: 10px;
`

const CalendarAddEventModal = ({showAddEventModal, setShowAddEventModal, infos}) => {
    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [staffList, setStaffList] = useState();
    const [apptmtTypes, setApptmtTypes] = useState();
    const [text, setText] = useState('');
    const [searchResult, setSearchResult] = useState();

    if (!infos) {
        infos = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let dateValue = moment(infos.dateStr).format('YYYY-MM-DD');
    let dateMin = moment().format('YYYY-MM-DD');
    let timeValue = moment(infos.dateStr).format('HH:mm');

    const getCustomersResults = (text) => {
        axios.get(API_URL + ApiRoutes.search_customer + text).then(res => {
            console.log(res.data)
            setSearchResult(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getStaffList = () => {
        axios.get(API_URL + ApiRoutes.staff).then(res => {
            setStaffList(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getApptmtType= () => {
        axios.get(API_URL + ApiRoutes.apptmtType).then(res => {
            setApptmtTypes(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!staffList && !apptmtTypes) {
            getStaffList();
            getApptmtType()
        }
    }, []);

    console.log(staffList)
    console.log(apptmtTypes)

    return (
        <Modal show={showAddEventModal} size="xl" backdrop="static" keyboard={false} centered >
            {(loading) ?
                <Loader/> :
                <Modal.Body>
                    <div className='text-center mb-3'>
                        <h2>Ajouter un rendez-vous</h2>
                    </div>
                    <div className="row">
                        <div className="col m-3">
                            <Label>Client</Label>
                            <StyledInput
                                className="form-select"
                                key="random1"
                                value={text}
                                placeholder="Chercher un client"
                                onChange={(e) => setText(e.target.value)}
                                onKeyUp={() => {
                                    setTimeout(() => {
                                        if (text.length >= 3) {
                                            getCustomersResults(text);
                                        }
                                    }, 200);
                                }}
                            />
                        </div>
                        <div className="col m-3">
                            <Label>Agent</Label>
                            <StyledSelect className="form-select">
                                <option selected value=""/>
                                {staffList.map(item => (
                                    <option value={item.id} key={item.id}>{item.firstname} {item.lastname}</option>))}
                            </StyledSelect>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-3">
                            <Label>Bien</Label>
                            <StyledSelect className="form-select">
                                <option selected value=""/>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </StyledSelect>
                        </div>
                        <div className="col m-3">
                            <Label>Type de rendez-vous</Label>
                            <StyledSelect className="form-select">
                                <option selected value=""/>
                                {apptmtTypes.map(item => (
                                    <option value={item.id} key={item.id}>{item.appointment_type} </option>))}
                            </StyledSelect>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-3">
                            <Label>Date</Label>
                            <StyledInput type="date"
                                         className="form-control"
                                         min={dateMin}
                                         value={dateValue}
                                         onChange={() => console.log(dateValue)}
                            />
                        </div>
                        <div className="col m-3">
                            <Label>Heure</Label>
                            <StyledInput type="time"
                                         className="form-control"
                                         min="08:00"
                                         max="19:00"
                                         value={timeValue}
                                         onChange={() => console.log(timeValue)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-3">
                            <Label>Notes</Label>
                            <StyledTextarea className="form-control"/>
                        </div>
                    </div>
                </Modal.Body>
            }
            <div className='text-end m-3'>
                <StyledBtnSecondary className="m-3" variant="secondary" onClick={() =>setShowAddEventModal(false)}>
                    Annuler
                </StyledBtnSecondary>
                <StyledBtnPrimary variant="primary" onClick={() =>setShowAddEventModal(false)}>
                    Valider
                </StyledBtnPrimary>
            </div>
        </Modal>
    );
};

export default CalendarAddEventModal;
