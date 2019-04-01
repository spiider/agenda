const mongoose = require('mongoose');
const { Schema } = mongoose;

const Event = new mongoose.Schema({
    createdAt: { type: Date, default: new Date() },
    description: String,
    end: Date,
    start: Date,
    title: String,
    updatedAt: { type: Date, default: new Date() },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
});


/**
 * Statics
 */
Event.statics = {
  
    /**
     * List events in descending order of 'start' timestamp.
     *
     * @param {number} skip - Number of events to be skipped.
     * @param {number} limit - Limit number of events to be returned.
     * @returns {Promise<Events[]>}
     */
    list({
      page = 1, perPage = 30,
    }) {
  
      return this.find({})
        .sort({ start: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .exec();
    },
};  

module.exports = mongoose.model('Events', Event);
