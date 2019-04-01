const Event = require('../models/event');


/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const events = await Event.list({});
    res.json(events);
  } catch (error) {
    next(error);
  }
};
