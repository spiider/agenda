import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

const Header = ({ user }) => {
  
  if (user) {
    return (<Fragment>Logged user</Fragment>)
  }

  return(<nav>
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
    </ul>
  </nav>)
}

export default Header;
