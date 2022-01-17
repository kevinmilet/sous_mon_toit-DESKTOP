import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import ApiRoutes from "../../utils/const/ApiRoutes";
import Loader from "../Tools/Loader/Loader";
import EstateCard from "./EstateCard";
import {Context} from "../../utils/context/Context";

const CardContainer = styled.div`
    margin: 50px
`

const EstatesRnd = () => {
    const API_URL = useContext(Context).apiUrl;
    const [estateData, setEstateData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API_URL + ApiRoutes.estates_rnd).then(res => {
            setEstateData(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [API_URL])

    return (

        loading ? <Loader/> :

            <CardContainer className="d-flex flex-row justify-content-evenly">
                <div className="row col-8">
                    <EstateCard  estateData={estateData}/>
                </div>
            </CardContainer>
    );
}

export default EstatesRnd;
