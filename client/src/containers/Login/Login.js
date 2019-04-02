import React, { useState, useContext } from 'react';
import { loginUser } from '../../services/api';
import './Login.css'
import { UserContext } from '../../services/context';

const Login = ({ setUser, history} ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const currentUser = useContext(UserContext)

  if (currentUser) {
    history.push('/')
  }

  const handleSubmit = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    loginUser({ username, password })
    .then((data) => {
      // TODO: Display better message to user
      if (data.ok) {
        alert('User logged in!')
        data.json().then(user => {
          setUser(user)
          history.push('/');
        });
      } else {
        alert('Wrong username or password!');
      }
    }).catch(() => {
      alert('Something went wrong');
    })
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input 
          type="text"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required
          autoFocus
          value={username}
          onChange={evt => setUsername(evt.target.value)}
          />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={evt => setPassword(evt.target.value)}
          />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Login;
