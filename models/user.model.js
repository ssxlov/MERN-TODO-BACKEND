const { Schema, model } = require('mongoose');
const validator = require('validator');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: [true, 'EmailShouldExist'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'EmailShouldBeValid']
    },
    password: {
        type: String,
        required: [true, 'PasswordShouldExist'],
        minlength: 6
    },
    todos: [{type: Schema.Types.ObjectID, ref: 'Todo'}]
})

module.exports = model('User', userSchema);
