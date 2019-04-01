const httpStatus = require('http-status');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../config/login.json');

/**
* Returns a formated object with tokens
* @private
*/
function generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
      tokenType, accessToken, refreshToken, expiresIn,
    };
  }

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
        await user.save();
        res.status(httpStatus.CREATED);
        res.json({
            message: 'ok',
        });
    } catch (error) {
        next(User.checkDuplicateUsername(error));
    }
};

/**
 * Authentica user
 * @public
 */
exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await User.logInUser(req.body);
        const token = generateTokenResponse(user, accessToken);
        return res.json({ token, user: { username: user.username, name: user.name } });
      } catch (error) {
        return next(error);
      }
}
