import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import CustomersListView from './screens/Customers/CustomersListView';

function App() {
  return (
    <div className="App">
        <div className="container-fluid m-0 p-0">
            <div className="row gx-0">
                <div className="col-md-3 m-0 p-0">
                    <Sidebar/>
                </div>
                <div className="col-md-9 m-0 p-0" >
                    <Topbar/>
                    <CustomersListView/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
