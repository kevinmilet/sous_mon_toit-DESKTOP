import React from 'react';
import styled from "styled-components";
import colors from "../../utils/styles/colors";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    position: relative;
    padding: 15px 40px 15px 20px;
    width: 50px;
    height: 50px;
    color: ${colors.primary};
    font-size: 22px;
    border: none;
    border-radius: 50px;
    background-color: ${colors.bgdPrimaryOpac};
    transition: width 0.4s ease;
    outline: none;
    &:focus{ width: 350px; }
`

const Icon = styled.i`
    position: relative;
    left: -37px;
    color: ${colors.primary};
`

const Search = () => {
    return (
        <Container>
            <Input placeholder='Rechercher...' type="text"/>
                <Icon className="fa fa-search"/>
        </Container>

    );
};

export default Search;
