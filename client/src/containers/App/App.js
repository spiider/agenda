import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from '../../components/Header/Header';
import AuthedRoute from '../../components/AuthedRoute/AuthedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <AuthedRoute path="/" exact component={() => (<div>Home</div>)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
