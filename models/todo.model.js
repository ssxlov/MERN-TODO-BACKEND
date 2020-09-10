const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {type: Schema.Types.Object, ref: 'User'}
});

todoSchema.methods.toggleComplete = async function () {
    this.completed = !this.completed;
    await this.save();
};

module.exports = model('Todo', todoSchema);
