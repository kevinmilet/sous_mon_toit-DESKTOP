import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import { Context } from "../../utils/context/Context";
import Loader from "../Tools/Loader/Loader";
import { FaTrashAlt } from 'react-icons/fa';
import DataTable from "react-data-table-component";
import ApiRoutes from "../../utils/const/ApiRoutes";

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;
	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled.button`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Rechercher"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);
const ListContainer = styled.div`
  width: 70vw;
  height: 70vh;
  margin: center;
  margin-top: -100px;
  overflow: hidden;
  z-index: 2;
  border-radius: 20px;
  background-color:white;
  border-bottom-right-radius: 20px;
  -webkit-box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16); 
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);

`;
const Icon = styled.i`
    color: ${colors.primaryBtn};
    font-size: 22px
`

const ListIcons = styled.ul`
  display: inline;
`;
const Ul = styled.ul`
  display: inline;
`;
const Thead = styled.thead`
  position: sticky;
  top: 0;
  background-color: ${colors.secondary};
`;



const CustomersList = ({ setOpenModalAddCustomer }) => {
  const API_URL = useContext(Context).apiUrl;
  const [CustomersData, setCustomersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = React.useState("");
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const handleClick = (value) => { window.location.href = '/customer_detail/' + value };
  const deleteCustomer = (custID) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Voulez-vous vraiment supprimer ce client?')) {
      axios.delete(API_URL + ApiRoutes.delete_customer + custID).then(
        res => {
          console.log(res.status);
          alert('Client supprimé');
          window.location.reload();
        }).catch(e => {
          console.error(e.message)
          alert('Le client n\'a pas pu être supprimé');
        })

    }
  }
  const columns = [
    {
      name: "Nom/Prénom",
      width: "25%",
      selector: (row) => row.lastname + " " + row.firstname,
    },
    {
      name: "Mail",
      width: "25%",
      selector: (row) => row.mail,
    },
    {
      name: "Téléphone",
      width: "25%",
      selector: (row) => row.phone,
    },
    {
      name: "N° client",
      width: "15%",
      selector: (row) => row.n_customer,
    },
    {
      name: "",
      width: "5%",
      cell: (row) => (
        <Icon className="far fa-trash-alt m-2 cursor-pointer" onClick={() => { deleteCustomer(row.id) }} />

      ),
    },
  ];
  const filteredItems = Object.values(CustomersData).filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const customStyles = {
    rows: {
      style: {
        '&:hover': {
          backgroundColor: colors.secondaryBtn,
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
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };


    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);


  useEffect(() => {
    axios
      .get(
        API_URL + "customer/s"
      )
      .then((res) => {
        setCustomersData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    const timeout = setTimeout(() => {
      setRows(CustomersData);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ListContainer className="col-md-9">
      <div className="my-2 fixed">
        <button className="btn btn-primary" onClick={() => { setOpenModalAddCustomer(true) }}>+ Ajouter un client </button>
      </div>
      <DataTable
        fixedHeader
        fixedHeaderScrollHeight="50vh"
        progressPending={pending}
        onRowClicked={(row) => handleClick(row.id)}
        customStyles={customStyles}
        persistTableHead
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        progressComponent={<Loader />}
        columns={columns}
        data={filteredItems}
      />
    </ListContainer>

  );
};

export default CustomersList;
