import React, {useContext} from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import Loader from "../Tools/Loader/Loader";
import {Context} from "../../utils/context/Context";
import { useParams } from 'react-router-dom';
const NavAccount = styled.div`
  .navbar {
    margin: auto;

    .tab {
      background-color: ${colors.secondaryBtn};
    }
  }
`;
const Ul = styled.ul`
  list-style: none;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
`

const TitleH3 = styled.h3`
  color: ${colors.primaryBtn}
`

const CustomerDetail = () => {
    const [customerData, setCustomerData] = useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    
    useEffect(() => {

    

        axios.get(
            "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/customer/s/" + id
        )
            .then((res) => {
                setCustomerData(res.data);
                console.log(res.data);

            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        // axios
        //     .get(
        //         "http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/describe_customer_type/joinCustomer/" + localStorage["userId"]
        //     )
        //     .then((res) => {
        //         setCustomerTypeData(res.data);
        //     })
        //     .catch((error) => {
        //         console.log(error.message);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });

    }, []);

    if (loading) {
        return <Loader/>;
    }
    return (
        <div className="card col-11 m-auto">
            <div className="card  m-auto col-11">
                <div className="card-body">
                    <TitleH3 className="card-title text-center text-decoration-underline">
                        Informations Client : #{customerData.n_customer}
                    </TitleH3>
                
                    <Ul className="col-12 ">
                        <li className="mt-2">
                            <b>Prénom: </b> {customerData.firstname}
                        </li>
                        <li className="mt-2">
                            <b>Nom:</b> {customerData.lastname}
                        </li>
                        <li className="mt-2">
                            <b>Mail:</b> {customerData.mail}
                        </li>
                        
                        <li className="mt-2">
                            <b>Date de naissance:</b> {customerData.birthdate}
                        </li>
                        <li className="mt-2">
                            <b>Télèphone:</b> {customerData.phone}
                        </li>
                        <li className="mt-2">
                            <b>Adresse:</b> {customerData.address}
                        </li>
                    </Ul>
                </div>
            </div>
            <div className="row justify-content-center mt-3 ">
                <div className="card col-5" >
                    <TitleH3 className="card-title text-center text-decoration-underline">Rendez-vous</TitleH3>
                
                    <table className="table "> 
                        <tbody>
                            <tr>
                                <th scope="row">15/02/22 </th>
                                <td>15h30</td>
                                <td>Agence</td>
                                <td>Henandez</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card col-5 mr-3" >
                    <TitleH3 className="card-title text-center text-decoration-underline">Recherche</TitleH3>
                    <div>Appartement / Maison / 80m2 / 2 chambres</div>
                </div>
            </div>
        </div>
            
            
            
            
    );
};

export default CustomerDetail;
