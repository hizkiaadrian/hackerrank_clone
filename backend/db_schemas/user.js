const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    assessmentStarted: {
        type: Date,
        default: null
    },
    submission: {
        type: String,
        default: null
    },
    submissionTime: {
        type: Date,
        default: null
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;