import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from '../../components/Header/Header';
import AuthedRoute from '../../components/AuthedRoute/AuthedRoute';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound';
import './App.css';
import { loadUser, saveUser } from '../../services/localStorage';
import { UserProvider } from '../../services/context';

const App = () => {
  const [user, setUser] = useState(loadUser());

  useEffect(() => {
    saveUser(user);
  }, [user]);

  return (
    <UserProvider value={user}>
      <Router>
        <div className="container-full">
          <Header user={user} />
          <Switch>
            <AuthedRoute path="/" exact component={Home} />
            <Route path="/login" component={(props) => <Login {...props} setUser={setUser} />} />
            <Route path="/register" component={Register}  />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
