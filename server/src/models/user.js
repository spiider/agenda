const mongoose = require('mongoose');

const User = new mongoose.Schema({
    createdAt: { type: Date, default: new Date() },
    password: String,
    updatedAt: { type: Date, default: new Date() },
    username: { type: String, unique: true },
});

module.exports = mongoose.model('Users', User);
