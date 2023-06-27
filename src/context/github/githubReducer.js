import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_USER,
    GET_REPOS, REMOVE_USER_FROM_STATE
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading:false
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                showClear: true
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                showClear: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                // getUser invokes first in the User component, so that it should leave loading=false
                // until getRepos is not done
                loading: true
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                // getRepos invokes after getUser, so that after repos are downloaded loading should be set to false
                loading: false
            }
        case REMOVE_USER_FROM_STATE:
            return {
                ...state,
                user: []
            }
        default:
            return state;
    }
}
