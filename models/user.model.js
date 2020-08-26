const { Schema, model } = require('mongoose');
const validator = require('validator');
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
    passwordConfirm: {
        type: String,
        validate: {
            validator: function(confirm) {
                if (!this.isModified('password')) return true;
                return confirm === this.password;
            },
            message: 'PasswordsShouldBeTheSame'
        }
    },
    refreshToken: String,
    todos: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = null;
    next();
});

userSchema.methods.isPasswordCorrect = async function (candidate) {
    return await bcrypt.compare(candidate, this.password);
};

module.exports = model('User', userSchema);
