import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from "axios";
import Loader from "../Tools/Loader/Loader";
import ApiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";
import colors from "../../utils/styles/colors";
import DataTable from 'react-data-table-component';
import StaffAppointments from "../Calendar/StaffAppointments";
import AddStaffMember from "./AddStaffMember";
import avatarDefault from '../../assets/img/user_default.png';

const StafTableContainer = styled.div`
    margin-top: -100px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16); 
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
`

const AddStaff = styled.a`
    color: white;
    background-color:${colors.secondary};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    position: absolute;
    z-index:1;
    top:18%;
    right:6%;
`

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
`

const Icon = styled.i`
    color: ${colors.primaryBtn};
    font-size: 22px
`

const AvatarImg = styled.img`
    width: 50px;
    heigth: 50px;
    border-radius: 50%;
    margin: .7rem
`

const Button = styled.button`
    background: inherit;
    border: none
`

const StaffList = ({setShowStaffApptmtModal, setStaffId, setShowAddStaffModal, setShowMessageModal, setMessageContent}) => {
    const API_URL = useContext(Context).apiUrl;
    const [staffData, setStaffData] = useState({});
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('userRole');

    const FilterComponent = ({filterText, onFilter, onClear}) => (
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
                <i className="fas fa-ban"/>
            </ClearButton>
        </>
    );

    const columns = [
        {
            selector: row => <AvatarImg src={ApiRoutes.AVATAR_BASE_URL + row.avatar ?? avatarDefault} alt={row.avatar ?? avatarDefault}/>,
            sortable: true
        },
        {
            selector: row => row.firstname + ' ' + row.lastname,
            sortable: true
        },
        {
            selector: row => row.mail,
            sortable: true
        },
        {
            selector: row => row.phone,
            sortable: true
        },
        {
            selector: row => {
                switch (row.id_function) {
                    case 1:
                        return 'Directeur';
                    case 2:
                        return 'Secrétaire';
                    case 3:
                        return 'Agent';
                    case 4:
                        return 'Stagiaire';
                    default:
                        return 'Non défini';
                }
            },
            sortable: true
        },
        {
            selector: row => <Button onClick={() => currentStaffAppointments(setStaffId(row.id), setShowStaffApptmtModal(true))}><Icon className="fas fa-calendar-week"/></Button>,
            sortable: true
        },
    ];

    useEffect(() => {
        axios.get(API_URL + ApiRoutes.staff).then(res => {
            setStaffData(res.data)
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            setLoading(false)
        })

    }, [API_URL])

    // style perso pour datatable
    const customStyles = {
        rows: {
            style: {
                '&:hover': {
                    backgroundColor: colors.backgroundSecondary,
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
                fontWeight: 800,
            },
        },
        noData: {
            style: {
                padding: '30px'
            },
        },
    };

    //Personalisation du menu de pagination
    const paginationComponentOptions = {
        rowsPerPageText: 'Resultat par page',
        rangeSeparatorText: 'sur',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tous',
    };

    // Barre de recherche de la datatable
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = Object.values(staffData).filter(
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
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                             filterText={filterText}/>
        );
    }, [filterText, resetPaginationToggle]);

    // Fonction au click sur une ligne du tableau
    const handleClick = (id) => {
        if (role === '1' || role === '2' ) {
            window.location.href = '/details-staff/' + id;
        } else {
            setShowMessageModal(true);
            setMessageContent('Vous n\'êtes pas autorisé à accéder à cette fonctionnalité');
        }
    }

    const currentStaffAppointments = (staffId) => {
        return (
            <StaffAppointments staffId={staffId}/>
        );
    }

    const addStaffMember = () => {
        setShowAddStaffModal(true)
        return (
            <AddStaffMember />
        )
    }

    return (
        loading
            ? (<Loader/>)
            : (
                <StafTableContainer>
                    {(role === '1' || role === '2') ?
                        <AddStaff type="button" onClick={() => addStaffMember()} className='float-right col-2 btn'>Ajouter un
                            collaborateur</AddStaff> : null
                    }
                    <DataTable
                        title="Liste du personel"
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
                </StafTableContainer>
            )
    );
};

export default StaffList;
