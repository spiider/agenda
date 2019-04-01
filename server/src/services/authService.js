const User = require('../models/user');

exports.local = async (username, password) => {
    const user = await User.FinByUsername(username);
    if (!user) {
        return done(null, false, {
            message: 'Invalid username or password',
        });
    }

    const isMatch = await User.comparePassword(password, user.password)
    if (isMatch) {
        return done(null, user);
    } else {
        return done(null, false, {
            message: 'Invalid username or password',
        });
    }
};
