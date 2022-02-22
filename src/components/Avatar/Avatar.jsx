import React from 'react';
import avatar from '../../assets/img/user_default.png'
import styled from "styled-components";
import './avatar.scss';
import colors from "../../utils/styles/colors";

const AvatarContainer = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px;
    cursor: pointer
`

const Link = styled.a`
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
    return (
        <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <div className="dropdown">
                <AvatarContainer src={avatar} alt="User Avatar"/>
                <div className="dropdown-content">
                    <Link href="#">Mon compte</Link>
                    <Link href="#">Déconnexion</Link>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
