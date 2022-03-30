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
  color: ${colors.primaryBtn}
`
const columns = [
    {
        name: "Type",
        width: "20%",
        selector: (row) => row.buy_or_rent + "/" + row.estate_type_name,
    },
    {
        name: "Surface (m²)",
        width: "15%",
        selector: (row) => row.surface_min,
    },
    {
        name: "Budget",
        width: "20%",
        selector: (row) => row.budget_max + " EUR",
    },
    {
        name: "Pièce",
        width: "10%",
        selector: (row) => row.number_rooms,
    },
    {
        name: "Localité",
        width: "15%",
        selector: (row) => row.city,
    },
    {
        name: "Rayon (Km²)",
        width: "15%",
        selector: (row) => row.search_radius,



    },
];

const columnsSchedule = [
    {
        name: "Date",
        width: "25%",
        selector: (row) => moment(row.scheduled_at).format('DD-MM-YYYY'),
    },
    {
        name: "Heure",
        width: "25%",
        selector: (row) => moment(row.scheduled_at).format('HH:mm'),
    },
    {
        name: "Lieu",
        width: "25%",
        selector: (row) => row.appointment_type,
    },
    {
        name: "Agent",
        width: "25%",
        selector: (row) => row.staffFirstname + " " + row.staffLastname,
    },
];
// const [openModalEditCustomer, setOpenModalEditCustomer] = useState(false);
const CustomerDetail = ({ setOpenModalEditCustomer, setOpenModalAddCustomerSearch }) => {
    const API_URL = useContext(Context).apiUrl;
    const [customerData, setCustomerData] = useState({});
    const [customerScheduleData, setCustomerScheduleData] = useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [customerSearchData, setCustomerSearchData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [city, setCity] = useState("");
    const [filterText, setFilterText] = React.useState("");
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [searchAddressResult, setSearchAddressResult] = useState(null);
    const handleClick = (value) => { window.location.href = '/customer_detail/' + value };
    const filteredItems = Object.values(customerSearchData).filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );
    // [customerSearchData];
    const schedule = [customerScheduleData]

    const customStyles = {
        rows: {
            style: {
                '&:hover': {
                    backgroundColor: colors.secondary,
                    cursor: 'pointer'
                },
            },

        },
        header: {
            style: {
                fontSize: '30px',
                padding: '20px',
                minHeight: '56px',
                paddingLeft: '16px',
                paddingRight: '8px',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
            },
        },
        head: {
            style: {
                fontSize: '12px',
                fontWeight: 600,
            },
        },
        noData: {
            style: {
                padding: '30px'
            },
        },
    };
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                // setResetPaginationToggle(!resetPaginationToggle);
                // setFilterText('');
            }
        };
    });


    // Recherche de l'addresse
    // const searchAddressGouv = (latitude, longitude) => {
    //     // On remplace les espaces par des + pour notre requete
    //     // var conformeValue = value.replace(/ /g, "+");
    //     //On enleve les header axios pour envoyer la requete a l'API du gouv ( sinon ça passse pas )
    //     axios.defaults.headers.common = {};
    //     axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}"`, {})
    //         .then(res => {
    //             if (isEmptyArray(res.data.features)) {
    //                 setSearchAddressResult([{ properties: { label: "Aucun résultats" } }])
    //             } else {
    //                 setSearchAddressResult(res.data.features);
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    // Selection de l'adresse
    // const selectAddressResult = (e) => {
    //     // setAddress(e.properties.name);
    //     setCity(e.properties.city);
    //     // setZipcode(e.properties.postcode);
    //     // setEstate_longitude(e.geometry.coordinates[0])
    //     // setEstate_latitude(e.geometry.coordinates[1])
    //     setSearchAddressResult(null);
    //     // document.getElementById('div_valid_address').style.border="2px solid green";

    // }

    useEffect(() => {



        axios.get(
           API_URL + "customer/s/" + id
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

        axios
            .get(
                API_URL + "customer_search/s/customer/" + id
            )
            .then((res) => {
                setCustomerSearchData(res.data);
                // const
                // console.log(customerSearchData.search_latitude , "lat");
                // const sLatitude = res.data.search_latitude;
                // const sLongitude = res.data.search_longitude
                //  searchAddressGouv(sLatitude , sLongitude);
                console.log(res.data, "search");
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                axios
                    .get(
                         API_URL + "schedule/customer/" + id
                    )
                    .then((res) => {
                        setCustomerScheduleData(res.data);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
                    .finally(() => {
                        axios
                            .get(
                                API_URL + "schedule/" + id
                            )
                            .then((res) => {
                                setCustomerScheduleData(res.data);
                                console.log(res.data);
                            })
                            .catch((error) => {
                                console.log(error.message);
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    });

            });
        console.log(customerSearchData, "lat2");

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
        // const timeout = setTimeout(() => {
        //     setRows(customerSearchData);
        //     setPending(false);
        // }, 2000);
        // return () => clearTimeout(timeout);


    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <Container className="col-11 ">
            <div className="card  m-auto col-11">
                <ReactDimmer isOpen={isMenuOpen} exitDimmer={setMenuOpen} />
                <div className="card-body">
                    <TitleH3 className="card-title text-center text-decoration-underline">
                        Informations Client : # {customerData.n_customer}
                    </TitleH3>
                    <FiEdit size={40} style={{ position: 'absolute', right: 0, marginTop: '-50px' }} onClick={() => { setOpenModalEditCustomer(true) }} />
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
                <div className="card col-12" >
                    <TitleH3 className="card-title text-center text-decoration-underline">Rendez-vous</TitleH3>

                    <DataTable
                        fixedHeader
                        fixedHeaderScrollHeight="50vh"
                        onRowClicked={(row) => console.log(row)}
                        noDataComponent="Pas de résultats"
                        customStyles={customStyles}
                        persistTableHead
                        columns={columnsSchedule}
                        data={schedule}
                    />
                </div>
                <div className="card col-12 mt-3" >
                    <div>
                        <TitleH3 className="card-title text-center text-decoration-underline">Recherche</TitleH3>
                        <IoIosAdd size={40} style={{ position: 'absolute', right: 0, marginTop: '-50px' }} onClick={() => { setOpenModalAddCustomerSearch(true) }} />
                    </div>
                    <DataTable
                        fixedHeader
                        fixedHeaderScrollHeight="50vh"
                        onRowClicked={(row) => console.log(row)}
                        noDataComponent="Pas de résultats"
                        customStyles={customStyles}
                        persistTableHead
                        columns={columns}
                        data={filteredItems}
                    />


                </div>
            </div>
        </Container>




    );
};

export default CustomerDetail;
