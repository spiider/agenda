const mongoose = require('mongoose');
const { mongo } = require('../config/database.json');

const initDatabase = () => mongoose.connect(
        `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:\
            ${mongo.port}/${mongo.name}?authSource=admin`, {
            reconnectTries: 30,
            socketTimeoutMS: 0,
            useNewUrlParser: true,
        },
    );

module.exports = initDatabase;
