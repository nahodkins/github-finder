import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const User = ({ searchUser, loading, user: { name } }) => {
    const login = useParams()

    useEffect(() => {
        searchUser(login)
    }, [login, searchUser])

    return (
        <div>
            {name}
        </div>
    );
}

export default User;
