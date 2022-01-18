import React from 'react';
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import Search from "../Search/Search";
import Avatar from "../Avatar/Avatar";

const MainContainer = styled.div`
    width: 100%;
    height: 200px;
    margin: 0;
    z-index: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: ${colors.secondaryBtn};
    -webkit-box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65); 
    box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65);
    position: fixed;
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Topbar = () => {
    return (
            <MainContainer>
                <RowContainer className="row">
                    <Search/>
                    <Avatar/>
                </RowContainer>
            </MainContainer>
    );
};

export default Topbar;
