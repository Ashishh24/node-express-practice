const mongoose = require("mongoose");

const schema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: Number
    }
});

const User = mongoose.model("User", schema);

module.exports = User;