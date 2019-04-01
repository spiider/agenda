const httpStatus = require('http-status');
const User = require('../models/user');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
    try {
        const user = await User.get(id);
        req.locals = {
            user
        };
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user);

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(httpStatus.CREATED);
        res.json(savedUser);
    } catch (error) {
        next(User.checkDuplicateUsername(error));
    }
};
