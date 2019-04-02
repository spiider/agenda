/// <reference path="../react-app-env.d.ts" />
import { host } from '../constants/config';

export const createUser = (payload: ICreateUser) => 
  fetch(`${host}/v1/user`, {
    headers: {
      'Content-Type':'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const loginUser = (payload: IUser) => 
  fetch(`${host}/v1/user/login`, {
    headers: {
      'Content-Type':'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const createEvent = (payload: IEvent, token: string) => 
  fetch(`${host}/v1/events`, {
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const fetchEvents = (token: string) => 
  fetch(`${host}/v1/events`, {
    headers: {
      'Content-Type':'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'GET',
  });
