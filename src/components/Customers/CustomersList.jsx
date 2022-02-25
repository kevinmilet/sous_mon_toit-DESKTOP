import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import {Context} from "../../utils/context/Context";
import Loader from "../Tools/Loader/Loader";
import DataTable from "react-data-table-component";

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
  z-index: 60;
  border: solid;
  border-radius: 10px;
  background-color:white;
  border-bottom-right-radius: 10px;
  -webkit-box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.65);
  box-shadow: 2px 2px 4px -1px rgba(0, 0, 0, 0.65);
`;

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

const columns = [
  {
    name: "Nom/Prénom",
    width: "25%",
    selector: (row) =>row.lastname + " " + row.firstname,
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
    width: "25%",
    selector: (row) => row.n_customer,
  }
  // {
  //   name: "",
  //   width: "30%",
  //   cell: (row) => (
  //     <ListIcons>
  //       {" "}
  //       <Ul>
  //         <a href={`/customer_detail/${row.id}`}>
  //           <i className="far fa-eye"/>
  //         </a>
  //       </Ul>{" "}
  //       <Ul>
  //         <i className="fas fa-globe ml-2"/>
  //       </Ul>
  //       <Ul>
  //         <i className="far fa-calendar"/>
  //       </Ul>
  //       <Ul>
  //         <i className="far fa-hand-pointer"/>
  //       </Ul>{" "}
  //       <Ul>
  //         <i className="fas fa-check"/>
  //       </Ul>
  //     </ListIcons>
      
  //   ),
  // },
];

const CustomersList = ({setOpenModalAddCustomer}) => {
  const API_URL = useContext(Context).apiUrl;
  const [CustomersData, setCustomersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = React.useState("");
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const handleClick = (value) => { window.location.href = '/customer_detail/'+ value }
  const filteredItems = Object.values(CustomersData).filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const customStyles = {
    rows: {
        style: {
            '&:hover': {
                backgroundColor: colors.secondary,
                cursor: 'pointer'
            },
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
        <button className="btn btn-primary" onClick={() => {  setOpenModalAddCustomer(true)}}>+ Ajouter un client </button>
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
