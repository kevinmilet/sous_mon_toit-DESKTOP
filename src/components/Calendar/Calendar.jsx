import React, {useContext, useEffect, useState} from "react";

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
import ApiRoutes from "../../utils/const/ApiRoutes";
import Loader from "../Tools/Loader/Loader";
import CalendarModal from "./CalendarModal";
import apiRoutes from "../../utils/const/ApiRoutes";

const Container = styled.div`
    font-family: 'Spartan', sans-serif;
    text-align: center;
    margin: 10px;
`

const Calendar = () => {
    const API_URL = useContext(Context).apiUrl;
    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage["token"]}`,
    };

    useEffect(() => {
        getAppointments()
    }, [])

    const getAppointments = () => {
        if (appointments.length === 0) {
            //axios.get('http://localhost:8000/schedule/calendar').then(res => {
            axios.get(API_URL + ApiRoutes.calendar).then(res => {
                setAppointments(res.data)
            }).catch(error => {
                console.log(error.message)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const updateEventOnDrop = (datas) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm('Etes-vous sur de vouloir déplacer l\'évenement?')) {
            let id = datas.event.id;
            let values= moment(datas.event.start).format('YYYY-MM-DD HH:mm:ss');
            if (values < today) {
                alert('Impossible de déplacer un rendez-vous à une date inférieure!');
                datas.revert();
            } else {
                // axios.put(`http://localhost:8000/schedule/update/${id}/?scheduled_at=${values}`).then(res => {
                axios.put(API_URL + apiRoutes.update_event + `/${id}?scheduled_at=${values}`).then(res => {
                   console.log('Evénement déplacé avec succès')
                }).catch(error => {
                    console.log(error.message)
                })
            }
        } else {
            datas.revert();
        }
    }

    const events = appointments.map(item => {
        let color = '';
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
        event['title'] = item.customerFirstname + ' ' + item.customerLastname + ' (' + item.appointment_type + ')';
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
                    initialView="timeGridWeek"
                    slotMinTime='08:00:00'
                    slotMaxTime='20:00:00'
                    hiddenDays={[0]}
                    allDaySlot={false}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,list"
                    }}
                    locales={[frLocale]}
                    locale="fr"
                    nowIndicator={true}
                    editable={true}
                    events={events}
                    eventDrop={(datas) => {
                        updateEventOnDrop(datas);
                    }}
                    eventClick={(datas) => {
                        console.log(datas);
                        setShowModal(true);
                    }}
                />
            </Container>
        </>)
    );
};

export default Calendar;
