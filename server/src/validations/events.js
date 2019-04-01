const Joi = require('joi');

module.exports = {

  // GET /v1/events
  listEvents: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
    },
  },
};
