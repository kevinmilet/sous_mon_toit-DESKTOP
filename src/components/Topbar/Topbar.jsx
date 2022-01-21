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
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${colors.secondaryBtn};
    -webkit-box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16); 
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Topbar = () => {
    return (
            <MainContainer>
                <RowContainer className="row">
                    <div className="col text-start">
                        <Search/>
                    </div>
                    <div className="col text-end">
                        <Avatar/>
                    </div>
                </RowContainer>
            </MainContainer>
    );
};

export default Topbar;
