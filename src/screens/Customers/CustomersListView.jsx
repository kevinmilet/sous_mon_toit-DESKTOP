import React from 'react';
import CustomersListComponent from '../../components/Customers/CustomersList';
import styled from "styled-components";
import colors from "../../utils/styles/colors";

const CustomersListView = () => {
    return (
        <div className="row justify-content-center align-items-center">
           
            <CustomersListComponent/>
           
        </div>
    );
};

export default CustomersListView;