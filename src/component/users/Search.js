import React, {useContext, useState} from 'react';
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {

    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)

    const {sendAlert} = alertContext

    const [text, setText] = useState('')

    const onChange = (event) => setText(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();

        if (text === '') {
            sendAlert('Please enter something', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input type="text"
                       name="text"
                       id="text"
                       placeholder="Search Users..."
                       value={text}
                       onChange={onChange}/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
            {githubContext.showClear && (
                <button
                    className="btn btn-light btn-block"
                    onClick={githubContext.clearUsers}
                >Clear</button>
            )}
        </div>
    );
}

export default Search;