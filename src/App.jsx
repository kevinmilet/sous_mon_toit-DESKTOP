import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Context} from "./utils/context/Context";
import CustomersListView from "./screens/Customers/CustomersListView";
import CustomersDetailView from "./screens/Customers/CustomerDetailView";
import axios from 'axios';
import ApiRoutes from "./utils/const/ApiRoutes";

import SignInView from './screens/SignIn/SignInView';
import EstatesListView from './screens/Estates/EstatesListView';
import DetailEstateView from './screens/Estates/DetailEstateView';
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import HomeView from "./screens/Home/HomeView";
import AddEstateView from './screens/Estates/AddEstateView';
import StaffListView from "./screens/Staff/StaffListView";
import AddEstateStep2View from './screens/Estates/AddEstateStep2View'

const App = () => {
    const [apiUrl, setApiUrl] = useState(ApiRoutes.API_URL);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    axios.defaults.headers.common = {

        Authorization: `Bearer ${localStorage["token"]}`,
    };
    useEffect(() => {
        // Test de la validité du token
        axios.interceptors.response.use(function (response) {
            return response
        }, function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.clear()
                    return window.location = '/' // redirect to login page
                }
            }
        })
        const storedToken = localStorage.getItem('token');
        if (localStorage["token"]) {
            setToken(storedToken);
            console.log("il y a un token")
        } else {
            console.log("pas de token")
        }
        setLoading(false);

    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <Context.Provider value={{apiUrl, setApiUrl}}>
            <div className="App">
                <div className="container-fluid m-0">
                    <div className="row gx-0">
                        <div className="col-md-2 m-0">
                            <Sidebar/>
                        </div>
                        <div className="col-md-10 m-0 d-flex flex-column">
                            <div className="row-fluid">
                                <Topbar/>
                            </div>
                            <div className="row-fluid">
                                {/*Content here.....*/}
                                <Router>
                                    {token === null ? (
                                        <React.Fragment>
                                            <Route exact path="/">
                                                <SignInView/>
                                            </Route>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Route exact path="/">
                                                <HomeView/>
                                            </Route>
                                        </React.Fragment>
                                    )}
                                    <Route exact path="/liste-des-biens">
                                        <EstatesListView/>
                                    </Route>
                                    <Route exact path="/detail-biens/:id">
                                        <DetailEstateView/>
                                    </Route>
                                    <Route exact path="/ajout-bien">
                                        <AddEstateView/>
                                    </Route>
                                    <Route exact path="/ajout-bien/step-2/:id">
                                        <AddEstateStep2View/>
                                    </Route>
                                    <Route exact path="/customers_list">
                                        <CustomersListView/>
                                    </Route>
                                    <Route exact path="/customer_detail/:id">
                                        <CustomersDetailView/>
                                    </Route>
                                    <Route exact path="/staff">
                                        <StaffListView/>
                                    </Route>
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;
