import './App.css';
import React, {Fragment} from "react";
import axios from "axios";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Alert from "./component/layout/Alert";
import About from "./component/pages/About";
import Navbar from "./component/layout/Navbar";
import Search from "./component/users/Search";
import User from "./component/users/User";
import Users from "./component/users/Users";

class App extends React.Component {

    state = {
        users: [],
        user: {},
        loading: false,
        showClear: false,
        alert: null,
        repos: []
    }

    sendGithubRequest = async (endpoint, parameters, resetLoading = true) => {
        this.setState({
            loading: true
        })

        // const clientId = process.env.REACT_APP_CLIENT_ID
        // const clientSecret = process.env.REACT_APP_CLIENT_SECRET
        //`?client_id=${clientId}&client_secret=${clientSecret}&` +
        const url = endpoint + "?" + parameters;

        const response = await axios.get(url)

        if (resetLoading) {
            this.setState({
                loading: false
            })
        }

        return response.data;
    }

    async componentDidMount() {
        const responseData = await this.sendGithubRequest(
            "https://api.github.com/users",
            ""
        );

        this.setState({
            users: responseData,
            showClear: false,
            user: {}
        })
    }

    searchUsers = async text => {
        const responseData = await this.sendGithubRequest(
            "https://api.github.com/search/users",
            `q=${text}`
        );

        this.setState({
            users: responseData.items,
            showClear: true
        })
    }

    searchUser = async username => {
        const responseData = await this.sendGithubRequest(
            `https://api.github.com/users/${username}`,
            "",
            false
        )

        this.setState({
            user: responseData
        })
    }

    getUserRepos = async username => {
        const responseData = await this.sendGithubRequest(
            `https://api.github.com/users/${username}/repos`,
            "per_page=5&sort=created:asc",
            false
        )

        this.setState({
            repos: responseData
        })
    }

    getUserInfo = async username => {
        await this.searchUser(username)
        await this.getUserRepos(username)

        this.setState({
            loading: false
        })
    }

    clearUsers = async () => {
        const responseData = await this.sendGithubRequest(
            "https://api.github.com/users",
            ""
        );

        this.setState({
            users: responseData,
            showClear: false
        })
    }

    sendAlert = (message, type) => {
        this.setState({
            alert: {
                message,
                type
            }
        });

        setTimeout(() => this.setState({alert: null}), 5000)
    }

    render() {
        const {users, loading, user, repos} = this.state

        return (
            <Router>
                <div className='App'>
                    <Navbar/>
                    <div className="container">
                        <Alert alert={this.state.alert}/>
                        <Routes>
                            <Route exact path='/' element={
                                <Fragment>
                                    <Search
                                        searchUsers={this.searchUsers}
                                        showClear={this.state.showClear}
                                        clearUsers={this.clearUsers}
                                        sendAlert={this.sendAlert}
                                    />
                                    <Users loading={loading} users={users}/>
                                </Fragment>
                            }/>
                            <Route exact path='/about' element={<About/>}/>
                            <Route exact path='/user/:login' element={
                                <User
                                    getUserInfo={this.getUserInfo}
                                    user={user}
                                    repos={repos}
                                    loading={loading}
                                />
                            }/>
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
