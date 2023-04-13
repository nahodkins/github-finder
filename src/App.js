import './App.css';
import React, {Fragment} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

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
        const clientId = process.env.REACT_APP_CLIENT_ID
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET
        const url = endpoint + `?client_id=${clientId}&client_secret=${clientSecret}&` + parameters;

        this.setState({
            loading: true
        })

        const response = await axios.get(url)

        if (resetLoading) {
            this.setState({
                loading: false
            })
        }

        return response.data;
    }

    async componentDidMount() {
        await this.getUsers();
    }

    getUsers = async () => {
        const responseData = await this.sendGithubRequest(
            "https://api.github.com/users",
            ""
        );

        this.setState({
            users: responseData,
            showClear: false,
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
        return await this.sendGithubRequest(
            `https://api.github.com/users/${username}`,
            "",
            false
        );
    }

    getUserRepos = async username => {
        return  await this.sendGithubRequest(
            `https://api.github.com/users/${username}/repos`,
            "per_page=5&sort=created:asc",
            false
        )
    }

    getUserInfo = async username => {
        const userData = await this.searchUser(username);
        const reposData = await this.getUserRepos(username);

        this.setState({
            user: userData,
            repos: reposData,
            loading: false
        })
    }

    clearUsers = async () => {
        await this.getUsers()
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

    removeUserFromState = () => {
        this.setState({
            user: {}
        });
    }

    render() {
        const {users, loading, user, repos} = this.state

        return (
            <Router>
                <div className='App'>
                    <Navbar removeUserFromState={this.removeUserFromState}/>
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
                                    removeUserFromState={this.removeUserFromState}
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
