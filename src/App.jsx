import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Context } from "./utils/context/Context";
import CustomersListView from "./screens/Customers/CustomersListView";
import CustomersDetailView from "./screens/Customers/CustomerDetailView";
import axios from "axios";
import ApiRoutes from "./utils/const/ApiRoutes";
import SnackbarProvider from "react-simple-snackbar";
import SignInView from "./screens/SignIn/SignInView";
import EstatesListView from "./screens/Estates/EstatesListView";
import DetailEstateView from "./screens/Estates/DetailEstateView";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import HomeView from "./screens/Home/HomeView";
import AddEstateView from "./screens/Estates/AddEstateView";
import StaffListView from "./screens/Staff/StaffListView";
import AddEstateStep2View from "./screens/Estates/AddEstateStep2View";
import AddEstateStep3View from "./screens/Estates/AddEstateStep3View";
import StaffDetailsView from "./screens/Staff/StaffDetailsView";
import AccountView from "./screens/AccountView/AccountView";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [apiUrl, setApiUrl] = useState(ApiRoutes.API_URL);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  axios.defaults.headers.common = {
    Authorization: `Bearer ${localStorage["token"]}`,
  };
  useEffect(() => {
    // Test de la validité du token
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            if (error.response.data.message === "Wrong login or password") {
              return error.response;
            }
            localStorage.clear();
            return (window.location = "/"); // redirect to login page
          }
        }
      }
    );
    const storedToken = localStorage.getItem("token");
    if (localStorage["token"]) {
      setToken(storedToken);
      console.log("il y a un token");
    } else {
      console.log("pas de token");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  // function Notify() {
  //     toast.info("Photo de profil modifiée",{
  //         position: "top-right",
  //         autoClose: 5000,
  //         toastId: '1'
  //     });
  // }

  return (
    <Context.Provider value={{ apiUrl, setApiUrl, showToast, setShowToast }}>
      <SnackbarProvider>
        <div className="App">
          {/*<ToastContainer />*/}
          <div className="container-fluid m-0">
            <div className="row gx-0">
              <div className="col-md-2 m-0">
                <Sidebar />
              </div>
              <div className="col-md-10 m-0 d-flex flex-column">
                <div className="row-fluid">
                  <Topbar />
                </div>
                <div className="row-fluid">
                  {/*Content here.....*/}
                  <HashRouter basename={"/"}>
                    <Routes>
                      {token === null ? (
                        <React.Fragment>
                          <Route exact path="/" element={<SignInView />} />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Route exact path="/" element={<HomeView />} />
                        </React.Fragment>
                      )}
                      <Route
                        exact
                        path="/liste-des-biens"
                        element={<EstatesListView />}
                      />
                      <Route
                        exact
                        path="/detail-biens/:id"
                        element={<DetailEstateView />}
                      />
                      <Route
                        exact
                        path="/ajout-bien"
                        element={<AddEstateView />}
                      />
                      <Route
                        exact
                        path="/ajout-bien/step-2/:id"
                        element={<AddEstateStep2View />}
                      />
                      <Route
                        exact
                        path="/ajout-bien/step-3/:id"
                        element={<AddEstateStep3View />}
                      />
                      <Route
                        exact
                        path="/customers_list"
                        element={<CustomersListView />}
                      />
                      <Route
                        exact
                        path="/customer_detail/:id"
                        element={<CustomersDetailView />}
                      />
                      <Route exact path="/staff" element={<StaffListView />} />
                      <Route
                        exact
                        path="/details-staff/:id"
                        element={<StaffDetailsView />}
                      />
                      <Route
                        exact
                        path="/compte/:id"
                        element={<AccountView />}
                      />
                    </Routes>
                  </HashRouter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SnackbarProvider>
    </Context.Provider>
  );
};

export default App;
