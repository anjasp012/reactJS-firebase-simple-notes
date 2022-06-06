import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../../../components/molecules/Navbar";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        {/* <Route patch="/" element={<Home />}></Route> */}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
