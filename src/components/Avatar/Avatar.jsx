import React, {useContext, useEffect, useState} from 'react';
import avatarDefault from '../../assets/img/user_default.png'
import styled from "styled-components";
import './avatar.scss';
import colors from "../../utils/styles/colors";
import axios from "axios";
import {Context} from "../../utils/context/Context";
import ApiRoutes from "../../utils/const/ApiRoutes";
import Loader from "../Tools/Loader/Loader";

const AvatarContainer = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px;
    cursor: pointer
`

const Link = styled.a`
    cursor: pointer;
    margin: 5px auto;
    text-decoration: none;
    color: ${colors.primary};
    &:hover {
        color: ${colors.primaryBtn}
    };
    &:visited {
        color: ${colors.primary};
    }
`

const Avatar = () => {
    const API_URL = useContext(Context).apiUrl;
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Get current user
        if (!currentUser) {
            let id = localStorage.getItem('userId');
            axios.get(API_URL + ApiRoutes.staff + '/' + id).then(res => {
                setCurrentUser(res.data);
            }).catch(e => {
                console.log(e.message);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [API_URL, currentUser]);


    const logout = () => {
        axios.post(API_URL + ApiRoutes.logout)
            .then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
                window.location.href = '/';
            }).catch(e => {
            console.log(e.message);
        })
    };

    const handleClick = (id) => {
        window.location.href = '/compte/' + id;
    }

    return (
        loading ? <Loader/> :
        <div>
            <div className="dropdown">
                <AvatarContainer src={ApiRoutes.AVATAR_BASE_URL + currentUser.avatar ?? avatarDefault} alt="User Avatar"/>
                <div className="dropdown-content">
                    <Link onClick={() => handleClick(currentUser.id)}>Mon compte</Link>
                    <Link onClick={logout}>Déconnexion</Link>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
