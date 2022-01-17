import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Context } from "./utils/context/Context";
import ApiRoutes from "./utils/const/ApiRoutes";

import SignInView from './screens/SignIn/SignInView';
import EstatesListView from './screens/Estates/EstatesListView';
import DetailEstateView from './screens/Estates/DetailEstateView';
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import CustomersListView from './screens/Customers/CustomersListView';

const App = () => {
  const [apiUrl, setApiUrl] = useState(ApiRoutes.API_URL);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (localStorage["token"]) {
      setToken(storedToken);
      console.log("il y a un token")
    } else {
      console.log("pas de token")
    }
    setLoading(false);

  }, [token]);

  if (loading) {
    return <></>;
  }

  return (
    <div className="App">
        <div className="container-fluid m-0 p-0">
            <div className="row gx-0">
                <div className="col-md-3 m-0 p-0">
                    <Sidebar/>
                </div>
                <div className="col-md-9 m-0 p-0" >
                    <Topbar/>
                  <Context.Provider value={{ apiUrl, setApiUrl }}>
                    <div style={{ backgroundColor: "salmon" }}>
                      <Router>
                        {token === null ? (
                            <React.Fragment>
                              <Route exact path="/">
                                <SignInView />
                              </Route>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                              <Route exact path="/">
                                <p>Mon token est valide ! Je suis connecté !!</p>
                                {/* redirection vers page principal  */}
                                {/* <Redirect to="/homepage"/> */}
                              </Route>
                            </React.Fragment>
                        )}
                        <Route exact path="/liste-des-biens">
                          <EstatesListView/>
                        </Route>
                        <Route exact path="/detail-biens/:id">
                          <DetailEstateView />
                        </Route>
                      </Router>
                    </div>
                  </Context.Provider >
                </div>
            </div>
        </div>
    </div>
  );
};

export default App;
