import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import colors from "../../utils/styles/colors";
import Loader from "../Tools/Loader/Loader";

// Style du container de la table
const EstateTableContainer = styled.div`
  margin-top: -100px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  -webkit-box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
`;

// Style du bouton d'ajout de bien
const AddEstate = styled.a`
  color: white;
  background-color: ${colors.secondary};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  z-index: 1;
  top: 18%;
  right: 6%;
`;

// Style de l'input de recherche
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  // border: 1px solid #e5e5e5;
  border: 1px solid black;
  padding: 0 32px 0 16px;
  &:hover {
    cursor: pointer;
  }
`;

// Style du bouton clear de recherche
const ClearButton = styled.div`
  border: 1px solid black;
  border-left: 0px solid black;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Composant du bouton de recherche
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

// Fonction de formatage visuel du prix
function nombresAvecEspaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Composition des colonnes de la datatable
const columns = [
  {
    name: "Type de biens",
    selector: (row) => {
      switch (row.id_estate_type) {
        case 1:
          return "Appartement";
        case 2:
          return "Maison";
        case 3:
          return "Garage";
        case 4:
          return "Parking";
        case 5:
          return "Terrain";
        case 6:
          return "Commerce";
        case 7:
          return "Autre";
        default:
          return "Type indéfini";
      }
    },
    sortable: true,
  },
  {
    name: "Type de contrat",
    selector: (row) => row.buy_or_rent,
    sortable: true,
  },
  {
    name: "Reference",
    selector: (row) => row.reference,
    sortable: true,
  },
  {
    name: "Prix",
    selector: (row) => nombresAvecEspaces(Math.round(row.price)) + "€",
    sortable: true,
  },
  {
    name: "Code postal",
    selector: (row) => row.zipcode + " " + row.city,
    sortable: true,
  },
  // {
  //     name: 'Code Postal',
  //     selector: row => row.zipcode,
  //     sortable: true,
  // },
];

const EstateTable = () => {
  const API_URL = useContext(Context).apiUrl;
  const [estateData, setEstateData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Récupération des biens
  useEffect(() => {
    axios
      .get(API_URL + ApiRoutes.estates)
      .then((res) => {
        setEstateData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL]);

  // style perso pour datatable
  const customStyles = {
    rows: {
      style: {
        "&:hover": {
          backgroundColor: colors.backgroundSecondary,
          cursor: "pointer",
        },
      },
    },
    header: {
      style: {
        fontSize: "30px",
        padding: "20px",
        minHeight: "56px",
        paddingLeft: "16px",
        paddingRight: "8px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      },
    },
    head: {
      style: {
        fontSize: "12px",
        fontWeight: 800,
      },
    },
    noData: {
      style: {
        padding: "30px",
      },
    },
  };

  //Personalisation du menu de pagination
  const paginationComponentOptions = {
    rowsPerPageText: "Resultat par page",
    rangeSeparatorText: "sur",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tous",
  };

  // Barre de recherche de la datatable
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = Object.values(estateData).filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // Fonction au click sur une ligne du tableau
  const handleClick = (value) => {
    navigate({ pathname: "/detail-biens/", id: value });
    // window.location.href = '/detail-biens/' + value;
  };

  return loading ? (
    <Loader />
  ) : (
    <EstateTableContainer>
      <AddEstate href="/ajout-bien" className="float-right col-2 btn">
        Ajouter un bien
      </AddEstate>
      <DataTable
        title="Liste des biens"
        columns={columns}
        data={filteredItems}
        onRowClicked={(row) => handleClick(row.id_estate)}
        customStyles={customStyles}
        pagination
        paginationPerPage={8}
        paginationRowsPerPageOptions={[8, 10, 15, 50]}
        paginationComponentOptions={paginationComponentOptions}
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        noDataComponent="Pas de résultats"
      ></DataTable>
    </EstateTableContainer>
  );
};

export default EstateTable;
