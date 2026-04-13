const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    loginTimes: [Date],
    logoutTimes: [Date],
    lastActive: Date
});

userSchema.pre('save', function (next) {
    this.lastActive = new Date();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
