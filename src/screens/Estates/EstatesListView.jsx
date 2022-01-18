import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import EstateMap from "../../components/Estate/EstateMap";
import EstateCard from "../../components/Estate/EstateCard";
import axios from "axios";
import Loader from "../../components/Tools/Loader/Loader";
import ApiRoutes from "../../utils/const/ApiRoutes";
import {Context} from "../../utils/context/Context";
import colors from "../../utils/styles/colors";

const BlockListing = styled.div`
  .listing {
    position: relative;

        &:before {
            content: "";
            display: table;
        }

        &:after {
            content: "";
            display: table;
        }

        &:after {
            clear: both;
        }

        .leaflet-container {
            height: 100vh;
        }
  }
`

const Title = styled.div`
    text-align: center;
    color: ${colors.primaryBtn};
    margin: 2em auto 0 auto
`

const EstatesListView = (props) => {
    const {search, estateSearch} = props;
    const API_URL = useContext(Context).apiUrl;
    const [estateData, setEstateData] = useState({});
    const [loading, setLoading] = useState(true);

    // const [page, setPage] = useState(null);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [totalPage, setTotalPage] = useState(null);

    useEffect(() => {
        if (!estateSearch) {
            axios.get(API_URL + ApiRoutes.estates).then(res => {
                setEstateData(res.data)
            }).catch(error => {
                console.log(error.message)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setEstateData(estateSearch);
            setLoading(false)
        }
    }, [API_URL, estateSearch])

    if (estateData.length !== 0) {
        return (
            loading ? (<Loader/>) : (
                <>
                    <Title>
                        <h4>Nous avons trouvé {estateData.length} bien(s) correspondant(s) à votre recherche.</h4>
                    </Title>
                    <BlockListing className="row m-3">
                        <div className="col-sm-12 col-md-4 col-lg-4 listing">
                            <EstateMap estateData={estateData}/>
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <div className="row">
                                <EstateCard estateData={estateData}/>
                            </div>
                        </div>
                    </BlockListing>
                    {/*{estateData.length > 6 ?*/}
                    {/*    <nav className="mt-3">*/}
                    {/*        <ul className="pagination pagination-sm justify-content-center">*/}
                    {/*            <li className="page-item ">*/}
                    {/*                <a className="page-link" href="?page=<?=$currentPage - 1 ?>"*/}
                    {/*                   tabIndex="-1">Précedent</a>*/}
                    {/*            </li>*/}
                    {/*            /!*<?php for ($page = 1; $page <= $total_pages; $page++): ?>*!/*/}
                    {/*            <li className="page-item">*/}
                    {/*                <a href="?page=<?= $page ?>" className="page-link">page</a>*/}
                    {/*            </li>*/}
                    {/*            /!*<?php endfor ?>*!/*/}
                    {/*            <li className="page-item">*/}
                    {/*                <a className="page-link"*/}
                    {/*                   href="?page=<?=$currentPage + 1 ?>">Suivant</a>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </nav> : null*/}
                    {/*}*/}
                </>
            )
        );
    } else {
        return (
            <>
                <Title>
                    <h4>La recherche n'a donnée aucun résultat.</h4>
                </Title>
            </>
        )
    }

};

export default EstatesListView;
