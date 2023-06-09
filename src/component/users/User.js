import React, {Fragment, useContext, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = () => {
    const {login} = useParams()

    const githubContext = useContext(GithubContext)

    const {user, repos, getUser, getUserRepos, loading, removeUserFromState} = githubContext

    useEffect(() => {
        getUser(login)
        getUserRepos(login)
        //eslint-disable-next-line
    }, [])

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

    if (loading || Object.keys(user).length === 0) {
        return <Spinner/>
    } else {
        return (
            <Fragment>
                <Link to="/" className="btn btn-light" onClick={removeUserFromState}>
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
                <Repos repos={repos}/>
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

export default User;
