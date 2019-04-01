import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { UserContext } from '../../services/context';


const AuthedRoute = ({ component: Component, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default AuthedRoute;
