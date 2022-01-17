import React from 'react';
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import logo from '../../assets/img/Logo_SousMonToit_square.png';
import agendaIcon from '../../assets/icons/calendar.png';
import estateIcon from '../../assets/icons/home_pink.png';
import customerIcon from '../../assets/icons/value.png';
import staffIcon from '../../assets/icons/seller.png';
import contractIcon from '../../assets/icons/contract.png';
import rightArrow from '../../assets/icons/right-arrow.png';

const MainContainer = styled.div`
    // width: 350px;
    height: 100vh;
    background-color: ${colors.backgroundPrimary};
    -webkit-box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65); 
    box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65);
`

const Logo = styled.img`
    width: 250px;
    height: 250px;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
`

const Button = styled.button`
    border: 2px solid ${colors.primaryBtn};
    background-color: ${colors.backgroundPrimary};
    border-radius: 50px;
    color: ${colors.primary};
    font-size: 22px;
    width: 250px;
    height: 60px;
    margin: 10px;
    &:hover {
        border: 2px solid ${colors.secondaryBtn};
        background-color: ${colors.backgroundPrimary};
        color: ${colors.primary};
        -webkit-box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65); 
        box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65);
    }
`

const Sidebar = () => {
    return (
        <div>
            <MainContainer>
                <Logo src={logo} className="logo" alt="Logo Sous mon toit"/>
                <ButtonsContainer>
                    <Button className="btn btn-secondary"><img src={agendaIcon} width="50" height="50" alt=""/>&nbsp;Agenda&nbsp;<img src={rightArrow} width="22" height="22" alt=""/></Button>
                    <Button className="btn btn-secondary"><img src={estateIcon} width="50" height="50" alt=""/>&nbsp;Biens&nbsp;<img src={rightArrow} width="22" height="22" alt=""/></Button>
                    <Button className="btn btn-secondary"><img src={customerIcon} width="50" height="50" alt=""/>&nbsp;Client&nbsp;<img src={rightArrow} width="22" height="22" alt=""/></Button>
                    <Button className="btn btn-secondary"><img src={staffIcon} width="50" height="50" alt=""/>&nbsp;Agents&nbsp;<img src={rightArrow} width="22" height="22" alt=""/></Button>
                    <Button className="btn btn-secondary"><img src={contractIcon} width="50" height="50" alt=""/>&nbsp;Contrat&nbsp;<img src={rightArrow} width="22" height="22" alt=""/></Button>
                </ButtonsContainer>
            </MainContainer>
        </div>
    );
};

export default Sidebar;
