import React from 'react';
import { createGlobalStyle } from 'styled-components'
import colors from "./colors";

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Spartan', Helvetica, sans-serif;
    }
    html, body {
        margin: 0;
        padding: 0;
        background-color: ${colors.backgroundSecondary};
    }
    .btn {
        
    }
`

const GlobalStyle = () => {
    return (
        <StyledGlobalStyle/>
    );
};

export default GlobalStyle;
