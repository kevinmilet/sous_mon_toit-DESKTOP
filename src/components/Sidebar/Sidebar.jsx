import React from 'react';
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import logo from '../../assets/img/Logo_SousMonToit_square.png';
import agendaIcon from '../../assets/icons/calendar.png';
import estateIcon from '../../assets/icons/home_pink.png';
import customerIcon from '../../assets/icons/value.png';
import staffIcon from '../../assets/icons/seller.png';
import rightArrow from '../../assets/icons/right-arrow.png';

const MainContainer = styled.div`
    width: 250px;
    height: 100vh;
    background-color: ${colors.backgroundPrimary};
    -webkit-box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16); 
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
`

const Logo = styled.img`
    width: 200px;
    height: 200px;
    margin: 20px;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: auto 20px;
`

const Button = styled.div`
    border: 1px solid ${colors.primaryBtn};
    // border: none;
    background-color: ${colors.backgroundPrimary};
    border-radius: 50px;
    color: ${colors.primary};
    font-size: 18px;
    width: 200px;
    height: 50px;
    margin: 10px auto;
    &:hover {
        border: 2px solid ${colors.secondaryBtn};
        background-color: ${colors.backgroundPrimary};
        color: ${colors.primary};
    }
`

const Sidebar = () => {
    return (
        <div>
            <MainContainer>
                <Logo src={logo} className="logo" alt="Logo Sous mon toit"/>
                <ButtonsContainer>
                    <a href="/">
                        <Button className="btn btn-secondary" ><img src={agendaIcon} width="35" height="35" alt=""/>&nbsp;Agenda&nbsp;<img src={rightArrow} width="18" height="18" alt=""/></Button>
                    </a>
                    <a href="/liste-des-biens">
                        <Button className="btn btn-secondary"><img src={estateIcon} width="35" height="35" alt=""/>&nbsp;Biens&nbsp;<img src={rightArrow} width="18" height="18" alt=""/></Button>
                    </a>
                    <a href="/customers_list">
                        <Button className="btn btn-secondary"><img src={customerIcon} width="35" height="35" alt=""/>&nbsp;Client&nbsp;<img src={rightArrow} width="18" height="18" alt=""/></Button>
                    </a>
                    <a href="#">
                        <Button className="btn btn-secondary"><img src={staffIcon} width="35" height="35" alt=""/>&nbsp;Agents&nbsp;<img src={rightArrow} width="18" height="18" alt=""/></Button>
                    </a>
                    {/*<a href="#">*/}
                    {/*    <Button className="btn btn-secondary"><img src={contractIcon} width="35" height="35" alt=""/>&nbsp;Contrat&nbsp;<img src={rightArrow} width="18" height="18" alt=""/></Button>*/}
                    {/*</a>*/}
                </ButtonsContainer>
            </MainContainer>
        </div>
    );
};

export default Sidebar;
