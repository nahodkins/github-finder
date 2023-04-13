import React, {Fragment, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const User = ({searchUser, loading, user}) => {
    const {login} = useParams()

    useEffect(() => {
        searchUser(login)
    }, [login, searchUser])

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <Fragment>
                <Link to="/" className="btn btn-light">
                    Back to Search
                </Link>
                Hireable:{' '}
                <i className={getHireableIcon(user.hireable)}/>
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={user.avatar_url} alt="User avatar" className="round-img" style={{width: '150px'}}/>
                        <h1>{getNameValue(user)}</h1>
                        <p>Location: {getLocation(user)}</p>
                    </div>
                    <div>
                        {user.bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{user.bio}</p>
                            </Fragment>
                        )}
                        <a href={user.html_url} className="btn btn-dark my-1">
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>
                                <strong>Username: {user.login}</strong>
                            </li>
                            <li>
                                <strong>{user.company && (
                                    <Fragment>
                                        Company: {user.company}
                                    </Fragment>
                                )}</strong>
                            </li>
                            <li>
                                <strong>{user.blog && (
                                    <Fragment>
                                        Blog: <a href={user.blog}>{user.blog}</a>
                                    </Fragment>
                                )}</strong>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {user.followers}</div>
                    <div className="badge badge-success">Following: {user.following}</div>
                    <div className="badge badge-danger">Public Repos: {user.public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {user.public_gists}</div>
                </div>
            </Fragment>
        );
    }
}

const getHireableIcon = (hireable) => {
    return hireable
        ? "fas fa-check text-success"
        : "fas fa-times-circle text-danger"
}

const getLocation = (user) => {
    return user.location !== null
        ? user.location
        : 'Unknown'
}

const getNameValue = (user) => {
    return user.name !== null
        ? user.name
        : user.login
}

User.propTypes = {
    searchUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
}

export default User;
