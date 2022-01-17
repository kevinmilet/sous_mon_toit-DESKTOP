import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import colors from "../../utils/styles/colors";
const ListContainer = styled.div`
    width: 60vw;
    height: 60vh;
    margin: center;
    margin-top: 10%;
    overflow-y: scroll;
    overflow-x : hidden;
    z-index:60;
    border: solid;
    border-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: ${colors.primaryBtn};
    -webkit-box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65); 
    box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65);
`

const CustomersList = () => {

    const [CustomersData, setCustomersData] = useState({})
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     axios.get("http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/customers")
    //         .then(res => {
    //             setCustomersData(res.data);
    //         }).catch(error => {
    //         console.log(error.message)
    //     }).finally(() => {
    //         setLoading(false);
    //     })
    // }, [])

    return (
     

            <ListContainer className="col-md-9">
                <div className="row">

                <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>


                 
                </div>
            </ListContainer>
    );
};

export default CustomersList;