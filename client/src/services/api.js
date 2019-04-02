import { host } from '../constants/config';

export const createUser = (payload) => 
  fetch(`${host}/v1/user`, {
    headers: {
      'Content-Type':'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const loginUser = (payload) => 
  fetch(`${host}/v1/user/login`, {
    headers: {
      'Content-Type':'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const createEvent = (payload, token) => 
  fetch(`${host}/v1/events`, {
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const fetchEvents = (token) => 
  fetch(`${host}/v1/events`, {
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'GET',
  });
