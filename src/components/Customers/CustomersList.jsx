import React , { useContext }from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import Loader from "../Tools/Loader/Loader";

const ListContainer = styled.div`
    width: 70vw;
    height: 60vh;
    margin: center;
    margin-top: 5%;
    overflow-y: scroll;
    overflow-x : hidden;
    z-index:60;
    border: solid;
    border-radius: 10px;
    border-bottom-right-radius: 10px;
  
    -webkit-box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65); 
    box-shadow: 2px 2px 4px -1px rgba(0,0,0,0.65);
`

const ListIcons= styled.ul`
   display: inline
    `
    const Ul= styled.ul`
   display: inline
    `
    const Thead= styled.thead`
    position: sticky;
    top: 0;
    background-color: ${colors.secondary};
    `

const CustomersList = (values) => {
    const API_URL = useContext(Context).apiUrl;
    const [CustomersData, setCustomersData] = useState({})
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        axios.get("http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/customer/s" )
            .then(res => {
                setCustomersData(res.data);
                console.log(res.data)
            }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false);
        })
    }, [])
    if (loading) {
      return <Loader/>;
  }

    return (
    
                  
                 
     
            <ListContainer className="col-md-9">
                <div className="row">
                  <div className="my-5 fixed">
                    <button className='btn btn-primary' >+ Ajouter un client </button>
                  </div>

                <table className="table">
                  <Thead >
                    <tr>
                      <th scope="col">Noms</th>
                      <th scope="col">Mail</th>
                      <th scope="col">Téléphone</th>
                      <th scope="col">N° client</th>
                      <th scope="col" ></th>
                    </tr>
                  </Thead>
                
                  <tbody>
                    {CustomersData.map(item =>(
                    <tr>
                      <th scope="row">{item.firstname} {item.lastname}</th>
                      <td>{item.mail}</td>
                      <td>{item.phone}</td>
                      <td>#{item.n_customer}</td>
                      <td><ListIcons> <Ul><a href={`/customer_detail/${item.id}`} key={item.id}><i class="far fa-eye"></i></a></Ul>  <Ul><i className="fas fa-globe ml-2" ></i></Ul><Ul><i class="far fa-calendar"></i></Ul><Ul><i class="far fa-hand-pointer"></i></Ul>  <Ul><i class="fas fa-check"></i></Ul></ListIcons></td>
                    </tr>
                    ))}
                
                  </tbody>
                </table>


                 
                </div>
            </ListContainer>
    );
};

export default CustomersList;