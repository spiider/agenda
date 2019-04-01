const Joi = require('joi');

module.exports = {

  // POST /v1/user
  createUser: {
    body: {
      username: Joi.string().min(1).max(128).required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128),
    },
  },

  // POST /v1/user/login
  loginUser: {
    body: {
      username: Joi.string().min(1).max(128).required(),
      password: Joi.string().min(6).max(128).required(),
    },
  },
};
