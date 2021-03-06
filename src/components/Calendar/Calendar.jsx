import React, {useContext, useEffect, useState} from "react";

import '../../utils/styles/calendar_theme.css';

import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from '@fullcalendar/moment'
import frLocale from '@fullcalendar/core/locales/fr';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import styled from "styled-components";
import {Context} from "../../utils/context/Context";
import Loader from "../Tools/Loader/Loader";
import colors from "../../utils/styles/colors";
import apiRoutes from "../../utils/const/ApiRoutes";

const Container = styled.div`
    margin-top: -100px;
    padding: 20px;
    border-radius: 20px;
    -webkit-box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16); 
    box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16);
    background-color: ${colors.backgroundPrimary}
`

const Calendar = ({
                      setShowDetailledEventModal,
                      setAppointmentDatas,
                      setShowAddEventModal,
                      setInfos,
                      setStaffList,
                      setShowMessageModal,
                      setMessageContent,
                      setConfirmContent,
                      setShowConfirmModal,
                      setDatasDropped,
}) => {
    const API_URL = useContext(Context).apiUrl;
    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage["token"]}`,
    };

    useEffect(() => {
        getAppointments()
        getStaffList();
    }, [])

    const getStaffList = () => {
        axios.get(API_URL + apiRoutes.staff).then(res => {
            setStaffList(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getAppointments = () => {
        if (appointments.length === 0) {
            axios.get(API_URL + apiRoutes.calendar).then(res => {
                setAppointments(res.data)
            }).catch(error => {
                console.log(error.message)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const getSelectedAppointment = (id) => {
        if (id) {
            axios.get(API_URL + apiRoutes.get_one_event + id).then(res => {
                setAppointmentDatas(res.data)
            }).catch(error => {
                console.log(error.message)
            })
        }
    }

    const showConfirmUpdate = (datas) => {
        setDatasDropped(datas);
        setConfirmContent('Etes-vous sur de vouloir d??placer l\'??venement?');
        setShowConfirmModal(true);
    }

    const events = appointments.map(item => {
        let color;
        switch (item.id_staff) {
            case 1:
                color = '#e57373';
                break;
            case 2:
                color = '#26a69a';
                break;
            case 3:
                color = '#42a5f5';
                break;
            case 4:
                color = '#e78122';
                break;
            case 5:
                color = '#a5a564';
                break;
            case 6:
                color = '#8a7572';
                break;
            case 7:
                color = '#a8cfb6';
                break;
            default:
                color = '#78909c';
        }
        const event = {};
        event['id'] = item.id;
        event['start'] = item.start;
        event['title'] = (item.customerFirstname ?? 'Client non cr????') + ' ' + (item.customerLastname ?? '') + ' (' + item.appointment_type + ')';
        event['backgroundColor'] = item.start > today ?  color : '#cfd8dc';
        event['borderColor'] = item.start > today ?  color : '#cfd8dc';
        event['editable'] = item.start > today;
        return event;
    })

    return (
        loading ?
            (<Loader/>) : (
        <>
            <Container>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, momentPlugin, listPlugin, interactionPlugin]}
                    height={650}
                    initialView="timeGridWeek"
                    slotMinTime='08:00:00'
                    slotMaxTime='20:00:00'
                    hiddenDays={[0]}
                    allDaySlot={false}
                    headerToolbar={{
                        left: "prev,next today addEventButton",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,list"
                    }}
                    locales={[frLocale]}
                    locale="fr"
                    nowIndicator={true}
                    editable={true}
                    events={events}
                    eventDrop={(datas) => {
                        showConfirmUpdate(datas);
                    }}
                    eventClick={async (datas) => {
                        await getSelectedAppointment(datas.event.id)
                        if (datas) {
                            setShowDetailledEventModal(true);
                        }
                    }}
                    customButtons={{
                        addEventButton: {
                            text: <i className="fas fa-plus"/>,
                            click: () => {
                                setShowAddEventModal(true);
                            },
                        },
                    }}
                    dateClick={(infos) => {
                        if (moment(infos.dateStr).format('YYYY-MM-DD HH:mm:ss') < today) {
                            setShowMessageModal(true);
                            setMessageContent('Impossible d\'ajouter un rendez-vous ?? une date ult??rieure !');
                        } else {
                            setInfos(infos);
                            setShowAddEventModal(true);
                        }
                    }}
                />
            </Container>
        </>)
    );
};

Calendar.propTypes = {
    customerFirstname: PropTypes.string,
    customerLastname: PropTypes.string,
    staffFirstname: PropTypes.string,
    staffLastname: PropTypes.string,
    appointment_type: PropTypes.string,
    id_staff: PropTypes.number,
    scheduled_at: PropTypes.string,
    apptmt_type_id: PropTypes.number,
    title: PropTypes.string,
    reference: PropTypes.string
}

Calendar.defaultProps = {
    customerFirstname: '',
    customerLastname: '',
    staffFirstname: '',
    staffLastname: '',
    appointment_type: '',
    id_staff: undefined,
    scheduled_at: '',
    apptmt_type_id: undefined,
    title: '',
    reference: ''
}

export default Calendar;
