import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_USER,
    GET_REPOS, REMOVE_USER_FROM_STATE
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_END !== 'production') {
    githubClientId = process.env.REACT_APP_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_CLIENT_SECRET
} else {
    githubClientId = process.env.CLIENT_ID
    githubClientSecret = process.env.CLIENT_SECRET
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        showClear: false
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    /**
     * Search and set to the state users array filtered byt {@code text} via Github API
     *
     * @param text text which will be sent as filter parameter for searching
     */
    const searchUsers = async text => {
        const responseData = await sendGithubRequest(
            "https://api.github.com/search/users",
            `q=${text}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: responseData.items
        })
    }

    /**
     * Search and set to the state users array received via Github API
     */
    const getUsers = async () => {
        setLoading()
        const responseData = await sendGithubRequest(
            "https://api.github.com/users",
            ""
        );

        dispatch({
            type: GET_USERS,
            payload: responseData
        })
    }

    /**
     * Clears the result of search user by username and set to the state default users list
     */
    const clearUsers = async () => {
        setLoading()
        const responseData = await sendGithubRequest(
            "https://api.github.com/users",
            ""
        );

        dispatch({
            type: CLEAR_USERS,
            payload: responseData
        })
    }

    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    /**
     * Search and set to the state user by specified {@code username}
     *
     * @param username username of user to search
     *
     * @returns user that was found by username
     */
    const getUser = async username => {
        setLoading()
        const responseData = await sendGithubRequest(
            `https://api.github.com/users/${username}`,
            ""
        );

        dispatch({
            type: GET_USER,
            payload: responseData
        })
    }

    /**
     * Search and set to the state list of specified user's repos
     * @param username username of user for whom it should search repos
     *
     * @returns {Promise<*>} array of repos
     */
    const getUserRepos = async username => {
        setLoading()
        const responseData = await sendGithubRequest(
            `https://api.github.com/users/${username}/repos`,
            "per_page=5&sort=created:asc",
        );

        dispatch({
            type: GET_REPOS,
            payload: responseData
        })
    }

    /**
     * Resets current value for state's {@code user} attribute
     */
    const removeUserFromState = () => dispatch({type: REMOVE_USER_FROM_STATE})

    /**
     * Sends request to the specified Github API endpoint.
     *
     * @param endpoint Github API endpoint URL
     * @param parameters parameters which should be sent with request
     * @param stopLoading if true, the loading will be set to false after response is received
     *
     * @returns {Promise<any>} {@code data} attribute of received response
     */
    const sendGithubRequest = async (endpoint, parameters) => {
        const url = endpoint
            + `?client_id=${githubClientId}&client_secret=${githubClientSecret}&`
            + parameters;

        const response = await axios.get(url)

        return response.data;
    }

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            showClear: state.showClear,
            getUsers,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
            removeUserFromState
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;
