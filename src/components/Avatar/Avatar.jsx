import React from 'react';
import avatar from '../../assets/img/user_default.png'
import styled from "styled-components";

const AvatarContainer = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px
`

const Avatar = () => {
    return (
        <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
                <AvatarContainer src={avatar} alt="User Avatar"/>
            </a>
        </div>
    );
};

export default Avatar;
