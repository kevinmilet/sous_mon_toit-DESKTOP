import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import Loader from "../Tools/Loader/Loader";
import { useParams } from "react-router-dom";
import { ReactDimmer } from "react-dimmer";
import DataTable from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";
import "moment/locale/fr";
import { Context } from "../../utils/context/Context";

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
`;

const Container = styled.div`
  margin: -100px 5em 0 5em;
  padding: 20px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  background-color: ${colors.backgroundPrimary};
`;

const TitleH3 = styled.h3`
  color: ${colors.primaryBtn};
`;
const columns = [
    {
        name: "Type",
        width: "20%",
        selector: row => row.buy_or_rent + "/" + row.estate_type_name
    }, {
        name: "Surface (m²)",
        width: "15%",
        selector: row => row.surface_min
    }, {
        name: "Budget",
        width: "20%",
        selector: row => row.budget_max + " EUR"
    }, {
        name: "Pièce",
        width: "10%",
        selector: row => row.number_rooms
    }, {
        name: "Localité",
        width: "15%",
        selector: row => row.city
    }, {
        name: "Rayon (Km²)",
        width: "15%",
        selector: row => row.search_radius
    }
];

const columnsSchedule = [
    {
        name: "Date",
        width: "25%",
        selector: row => moment(row.scheduled_at).format("DD-MM-YYYY")
    }, {
        name: "Heure",
        width: "25%",
        selector: row => row.scheduled_at
    }, {
        name: "Lieu",
        width: "25%",
        selector: row => row.appointment_type
    }, {
        name: "Agent",
        width: "25%",
        selector: row => row.staffFirstname + " " + row.staffLastname
    }
];
// const [openModalEditCustomer, setOpenModalEditCustomer] = useState(false);
const CustomerDetail = ({ setOpenModalEditCustomer, setOpenModalAddCustomerSearch }) => {
    const API_URL = useContext(Context).apiUrl;
    const [customerData, setCustomerData] = useState({});
    const [customerScheduleData, setCustomerScheduleData] = useState({});

    const [customerSearchData, setCustomerSearchData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const [filterText, setFilterText] = React.useState("");

    const handleClick = value => {
        window.location.href = "/customer_detail/" + value;
    };
    const filteredItems = Object.values(customerSearchData).filter(item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

    // const schedule = [customerScheduleData];

    const customStyles = {
        rows: {
            style: {
                "&:hover": {
                    backgroundColor: colors.secondary,
                    cursor: "pointer"
                }
            }
        },
        header: {
            style: {
                fontSize: "30px",
                padding: "20px",
                minHeight: "56px",
                paddingLeft: "16px",
                paddingRight: "8px",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px"
            }
        },
        head: {
            style: {
                fontSize: "12px",
                fontWeight: 600
            }
        },
        noData: {
            style: {
                padding: "30px"
            }
        }
    };

    useEffect(() => {
        axios.get(API_URL + "customer/s/" + id).then(res => {
            setCustomerData(res.data);

            console.log(res.data);
        }).catch(error => {
            console.log(error.message);
        }).finally(() => {
            setLoading(false);
        });

        axios.get(API_URL + "customer_search/s/customer/" + id).then(res => {
            setCustomerSearchData(res.data);

            console.log(res.data, "search");
        }).catch(error => {
            console.log(error.message);
        }).finally(() => {
            axios.get(API_URL + "schedule/customer/" + id).then(res => {
                console.log(res, "res");

                setCustomerScheduleData(res.data);
            }).catch(error => {
                // console.log(error.message , "rdv err");
            }).finally(() => { });
        });
    }, [API_URL, id]);

    if (loading) {
        return <Loader />;
    }
    return (<Container className="col-11 ">
        <div className="card  m-auto col-11">
            {/* <ReactDimmer isOpen={isMenuOpen} exitDimmer={setMenuOpen} />
         */
            }
            <div className="card-body">
                <TitleH3 className="card-title text-center text-decoration-underline">
                    Informations Client : # {customerData.n_customer}
                </TitleH3>
                <FiEdit size={40} style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "-50px"
                }} onClick={() => {
                    setOpenModalEditCustomer(true);
                }} />
                <Ul className="col-12 ">
                    <li className="mt-2">
                        <b>Prénom:
                        </b>
                        {customerData.firstname}
                    </li>
                    <li className="mt-2">
                        <b>Nom:</b>
                        {customerData.lastname}
                    </li>
                    <li className="mt-2">
                        <b>Mail:</b>
                        {customerData.mail}
                    </li>

                    <li className="mt-2">
                        <b>Date de naissance:</b>
                        {customerData.birthdate}
                    </li>
                    <li className="mt-2">
                        <b>Télèphone:</b>
                        {customerData.phone}
                    </li>
                    <li className="mt-2">
                        <b>Adresse:</b>
                        {customerData.address}
                    </li>
                </Ul>
            </div>
        </div>
        <div className="row justify-content-center mt-3 ">
            <div className="card col-12">
                <TitleH3 className="card-title text-center text-decoration-underline">
                    Rendez-vous
                </TitleH3>
                {console.log(customerScheduleData, "taille")}
                {
                    customerScheduleData.length !== 0
                        ? (<DataTable fixedHeader="fixedHeader" fixedHeaderScrollHeight="50vh" onRowClicked={row => console.log(row, "rdv")} noDataComponent="Pas de résultats" customStyles={customStyles} persistTableHead="persistTableHead" columns={columnsSchedule} data={customerScheduleData} />)
                        : (<div className="m-auto">Pas de résultats</div>)
                }
            </div>

            <div className="card col-12 mt-3">
                <div>
                    <TitleH3 className="card-title text-center text-decoration-underline">
                        Recherche
                    </TitleH3>
                    <IoIosAdd size={40} style={{
                        position: "absolute",
                        right: 0,
                        marginTop: "-50px"
                    }} onClick={() => {
                        setOpenModalAddCustomerSearch(true);
                    }} />
                </div>
                <DataTable fixedHeader="fixedHeader" fixedHeaderScrollHeight="50vh" onRowClicked={row => console.log(row)} noDataComponent="Pas de résultats" customStyles={customStyles} persistTableHead="persistTableHead" columns={columns} data={filteredItems} />
            </div>
        </div>
    </Container>);
};

export default CustomerDetail;
