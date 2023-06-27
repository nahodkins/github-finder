import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Alert from "./component/layout/Alert";
import About from "./component/pages/About";
import Navbar from "./component/layout/Navbar";
import User from "./component/users/User";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import Home from "./component/pages/Home";
import NotFound from "./component/pages/NotFound";

const App = () => {

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <div className="container">
                            <Alert/>
                            <Routes>
                                <Route exact path="/" element={<Home/>}/>
                                <Route exact path="/about" element={<About/>}/>
                                <Route exact path="/user/:login" element={<User/>}/>
                                <Route exact path="/*" element={<NotFound/>}/>
                            </Routes>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
