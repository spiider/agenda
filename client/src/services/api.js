import { host } from '../constants/config';

export const createUser = (payload) => 
  fetch(`${host}/v1/user`, {
    headers: {
      'Content-Type':'application/json'
    },
    method: "POST",
    body: JSON.stringify(payload)
  });
