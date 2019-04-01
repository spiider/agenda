import React, { useState } from 'react';
import { createUser } from '../../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    createUser({ username, password, name })
    .then((data) => {
      // TODO: Display better message to user
      if (data.ok) {
        alert('User created with success!')
      } else {
        alert('Something went wrong');
      }
    }).catch(() => {
      alert('Something went wrong');
    })
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input 
          type="username"
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
        <label htmlFor="inputName" className="sr-only">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Name"
          required
          value={name}
          onChange={evt => setName(evt.target.value)}
          />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
