import React, {Fragment, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const User = ({loading, user, repos, getUserInfo}) => {
    const {login} = useParams()

    useEffect(() => {
        getUserInfo(login)
    }, [login, getUserInfo])

    const {
        avatar_url,
        bio,
        html_url,
        hireable,
        company,
        blog,
        followers,
        following,
        public_repos,
        public_gists
    } = user

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <Fragment>
                <Link to="/" className="btn btn-light">
                    Back to Search
                </Link>
                Hireable:{' '}
                <i className={getHireableIcon(hireable)}/>
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="User avatar" className="round-img" style={{width: '150px'}}/>
                        <h1>{getNameValue(user)}</h1>
                        <p>Location: {getLocation(user)}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className="btn btn-dark my-1">
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>
                                <strong>Username: {login}</strong>
                            </li>
                            <li>
                                <strong>{company && (
                                    <Fragment>
                                        Company: {company}
                                    </Fragment>
                                )}</strong>
                            </li>
                            <li>
                                <strong>{blog && (
                                    <Fragment>
                                        Blog: <a href={blog}>{blog}</a>
                                    </Fragment>
                                )}</strong>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-danger">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
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
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired
}

export default User;
