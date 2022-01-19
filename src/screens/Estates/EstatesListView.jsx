import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import EstateMap from "../../components/Estate/EstateMap";
import EstateCard from "../../components/Estate/EstateCard";
import axios from "axios";
import Loader from "../../components/Tools/Loader/Loader";
import ApiRoutes from "../../utils/const/ApiRoutes";
import { Context } from "../../utils/context/Context";
import colors from "../../utils/styles/colors";
import DataTable from 'react-data-table-component';


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

const columns = [
    {
        name: 'Type de biens',
        selector: row => {

            switch (row.id_estate_type) {
                case 1:
                    return 'Appartement';
                case 2:
                    return 'Maison';
                case 3:
                    return 'Garage';
                case 4:
                    return 'Parking';
                case 5:
                    return 'Terrain';
                case 6:
                    return 'Commerce';
                case 7:
                    return 'Autre';
                default:
                    return 'Type indéfini';
            }
        },
        sortable: true,
    },
    {
        name: 'Type de contrat',
        selector: row => row.buy_or_rent,
        sortable: true,
    },
    {
        name: 'Reference',
        selector: row => row.reference,
        sortable: true,
    },
    {
        name: 'Prix',
        selector: row => row.price,
        sortable: true,
    },
    {
        name: 'Ville',
        selector: row => row.city,
        sortable: true,
    },
    {
        name: 'Code Postal',
        selector: row => row.zipcode,
        sortable: true,
    },
];

const EstatesListView = (props) => {

    const API_URL = useContext(Context).apiUrl;
    const [estateData, setEstateData] = useState({});
    const [loading, setLoading] = useState(true);
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
    const paginationComponentOptions = {
        rowsPerPageText: 'Resultat par page',
        rangeSeparatorText: 'sur',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tous',
    };

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    // const filteredItems = Object.values(estateData).filter(
    //     item => item.city && item.city.toLowerCase().includes(filterText.toLowerCase()),
    // );
    const filteredItems = Object.values(estateData).filter(
        item =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      );



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
        axios.get(API_URL + ApiRoutes.estates).then(res => {
            setEstateData(res.data)
            console.log(Object.values(estateData))
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })

    }, [API_URL])

    const handleClick = (value) => { console.log(value) }
    if (estateData.length !== 0) {
        return (
            loading ? (<Loader />) : (
                // eslint-disable-next-line react/style-prop-object
                <div style={{margin: 1 + 'em'}}>
                    <DataTable
                        title="Liste des biens"
                        columns={columns}
                        data={filteredItems}
                        onRowClicked={(row) => handleClick(row.id)}
                        customStyles={customStyles}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 50]}
                        paginationComponentOptions={paginationComponentOptions}
                        paginationResetDefaultPage={resetPaginationToggle}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        noDataComponent="Pas de résultats" 
                    >
                    </DataTable>
                </div>
            )
        );
    } else {
        return (
            <>
                <div>
                    <p>Pas de données</p>
                </div>
            </>
        )
    }

};

export default EstatesListView;
