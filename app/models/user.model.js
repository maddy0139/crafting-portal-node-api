const mongoose = require('mongoose');
const UserScehma = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserScehma);
