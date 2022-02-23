import React, {useContext} from 'react';
import avatar from '../../assets/img/user_default.png'
import styled from "styled-components";
import './avatar.scss';
import colors from "../../utils/styles/colors";
import axios from "axios";
import {Context} from "../../utils/context/Context";
import ApiRoutes from "../../utils/const/ApiRoutes";

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

    const logout = () => {
        axios.post(API_URL + ApiRoutes.logout)
            .then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                window.location.href = '/';
            }).catch(e => {
            console.log(e.message);
        })
    };

    return (
        <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <div className="dropdown">
                <AvatarContainer src={avatar} alt="User Avatar"/>
                <div className="dropdown-content">
                    <Link href="#">Mon compte</Link>
                    <Link onClick={logout}>Déconnexion</Link>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
