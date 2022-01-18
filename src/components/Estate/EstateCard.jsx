import styled from 'styled-components';
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {FavoriteButton} from "../../utils/styles/Atoms";
import colors from "../../utils/styles/colors";
import {Context} from "../../utils/context/Context";
import axios from "axios";
import ApiRoutes from "../../utils/const/ApiRoutes";
import Loader from "../Tools/Loader/Loader";
import defaultCover from '../../assets/img/estate_default.jpg';
import {Link} from "react-router-dom"

const EstateRef = styled.span`
    color: ${colors.secondary};
    font-weight: 700;
    text-transform: uppercase
`

const EstateCard = ({estateData}) => {
    const API_URL = useContext(Context).apiUrl;
    const [estateCover, setEstateCover] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // estateData.map((item) => {
            axios.get(API_URL + ApiRoutes.estates_cover + "/" + estateData.id)
                .then(res => {
                    console.log(res.data[0])
                if (res.data[0].length !== 0) {
                    setEstateCover(res.data[0].folder + res.data[0].name)
                } else {
                    setEstateCover(defaultCover);
                }
            }).catch(error => {
                setEstateCover(defaultCover);
                console.log(error.message)
            }).finally(() => {
                setLoading(false)
            })
        }, [API_URL, estateData.id])
        // })
    console.log(estateData)


    return (
        loading ? <Loader/> :

            estateData.map((item) => {
                return (
                <div className='col-12 border-bottom border-5 p-4' key={item.id}>
                    <Link className='text-decoration-none' to={`/detail-biens/${item.id}`}>
                        <div className="row">
                            <div className='col-3'>
                                <img src={estateCover} alt={item.title} className="img-fluid"/>
                            </div>
                            <div className="col-3">
                                <EstateRef>{item.reference}</EstateRef>
                                <p className="text-lg-start">
                                    {item.title} {item.living_surface} m<sup>2</sup>
                                </p>
                                <p className="text-lg-start">
                                    {item.zipcode} {item.city}
                                </p>
                                <p className="text-lg-end fw-bold">
                                    {item.price} €
                                </p>
                            </div>
                            <div className="col-6">
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </Link>
                </div>)
            })
    )
};

EstateCard.propTypes = {
    price: PropTypes.number.isRequired,
    zipcode: PropTypes.string.isRequired,
    living_surface: PropTypes.number.isRequired,
    estateCover: PropTypes.string.isRequired
}

EstateCard.defaultProps = {
    price: 0,
    zipcode: '',
    living_surface: 0,
    estateCover: defaultCover
}

export default EstateCard;
