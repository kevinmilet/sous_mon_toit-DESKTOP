import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

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
