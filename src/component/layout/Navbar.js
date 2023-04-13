import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

const Navbar = ({icon, title, removeUserFromState}) => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                <Link to="/" style={{cursor: 'pointer'}} onClick={removeUserFromState}>
                    <i className={icon}/> {title}
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/" onClick={removeUserFromState}>Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    removeUserFromState: PropTypes.func.isRequired,
}

export default Navbar