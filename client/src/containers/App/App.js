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

const App = () => {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    saveUser(user);
  }, [user]);
  
  return (
    <Router>
      <div className="container-full">
        <Header user={user} />
        <Switch>
          <AuthedRoute path="/" exact component={Home} user={{}} />
          <Route path="/login" component={(props) => <Login {...props} setUser={setUser} />} />
          <Route path="/register" component={Register}  />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
