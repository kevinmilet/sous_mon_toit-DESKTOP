import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

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

    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <Context.Provider value={{apiUrl, setApiUrl}}>
            <div className="App">
                <div className="container-fluid m-0 p-0">
                    <div className="row gx-0">
                        <div className="col-md-3 m-0 p-0">
                            <Sidebar/>
                        </div>
                        <div className="col-md-9 m-0 p-0">
                            <Topbar/>
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
                                            <p>Mon token est valide ! Je suis connecté !!</p>
                                            {/* /!* redirection vers page principal  *! */}
                                            {/* /!* <Redirect to="/homepage"/> *! */}
                                        </Route>
                                    </React.Fragment>
                                )}
                                <Route exact path="/liste-des-biens">
                                    <EstatesListView/>
                                </Route>
                                <Route exact path="/detail-biens/:id">
                                    <DetailEstateView/>
                                </Route>
                            </Router>
                        </div>
function App() {
  return (
    <div className="App">
        <div className="container-fluid m-0">
            <div className="row gx-0">
                <div className="col-md-2 m-0">
                    <Sidebar/>
                </div>
                <div className="col-md-10 m-0 d-flex flex-column">
                    <div className="row">
                        <Topbar/>
                    </div>
                    <div className="row">
                        Content here.....
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
