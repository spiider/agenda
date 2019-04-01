const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const { jwtSecret, jwtExpirationInterval } = require('../config/login.json');
const saltRounds = 10;

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
      },
      name: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
      },
    createdAt: { 
        type: Date,
        default: new Date(),
    },
    updatedAt: { 
        type: Date,
        default: new Date(),
    },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
User.pre('save', async function save(next) {
    try {
      if (!this.isModified('password')) return next();
  
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
  
      return next();
    } catch (error) {
      return next(error);
    }
});

User.statics = {
  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateUsername(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'username',
          location: 'body',
          messages: ['"username" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  /**
   * Find user by username and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async logInUser(options) {
    const { username, password, refreshObject } = options;
    if (!username) {
        throw new APIError({ message: 'An username is required to generate a token' });
    }

    const user = await this.findOne({ username }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (user && await user.passwordMatches(password)) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect username or password';
    } else if (refreshObject && refreshObject.username === username) {
      if (moment(refreshObject.expires).isBefore()) {
        err.message = 'Invalid refresh token.';
      } else {
        return { user, accessToken: user.token() };
      }
    } else {
      err.message = 'Incorrect username or refreshToken';
    }
    throw new APIError(err);
  },
}

/**
 * Methods
 */
User.method({
    token() {
      const playload = {
        exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
        iat: moment().unix(),
        sub: this._id,
      };
      return jwt.encode(playload, jwtSecret);
    },
  
    async passwordMatches(password) {
      return bcrypt.compare(password, this.password);
    },
  });

module.exports = mongoose.model('Users', User);
