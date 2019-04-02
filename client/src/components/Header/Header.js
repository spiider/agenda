import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../services/context';

const Header = () => {
  const user = useContext(UserContext);
  if (user) {
    return (
      <nav>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
    )
  }

  return(
    <nav>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header;
