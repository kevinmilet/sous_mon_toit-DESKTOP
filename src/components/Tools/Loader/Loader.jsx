import React from 'react';
import loader from '../../../assets/icons/loader.svg';
import styled from 'styled-components';

const LoaderContainer = styled.div`

    margin-top: 150px;
`


const Loader = () => {
    return (
        <LoaderContainer className="d-flex justify-content-center">
            <div role="status">
                <img src={loader}  width="75%" height="75%" alt="loader"/>
                <span className="visually-hidden">Chargement...</span>
            </div>
        </LoaderContainer>
    );
};

export default Loader;
