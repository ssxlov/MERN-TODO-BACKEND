const User = require('../models/user.model');
const Todo = require('../models/todo.model');

const createTodo = async (req, res) => {
    console.log('WORK!')
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ status: 'InvalidData', error: 'UserIdNotFound' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ status: 'InvalidData', error: 'UserNotFound' });
        }
        const todo = await Todo.create({ title: req.body.title, user: userId });

        await user.todos.unshift(todo._id);
        await user.save();
        res.status(201).json(todo);
    }
    catch (e) {
        res.status(400).json({ status: 'InvalidData', error: e.message })
    }
};
const deleteTodo = async (req, res) => {

    const todoId = req.params.todoId;
    if (!todoId) {
        return res.status(400).json({ status: 'InvalidData', error: 'TodoIdNotFound' });
    }
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ status: 'InvalidData', error: 'UserIdNotFound' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ status: 'InvalidData', error: 'UserNotFound' });
        }

        await Todo.deleteOne({_id: todoId});
        await user.todos.pull(todoId);
        await user.save();
        res.status(204).json({ status: 'Deleted' });
    } catch (e) {
        res.status(400).json({ status: 'DeletingFailed', error: e.message })
    }
};
const toggleTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        if (!todoId) {
            return res.status(400).json({ status: 'InvalidData', error: 'TodoIdNotFound' });
        }

        if (!todoId) {
            return res.status(400).json({ status: 'InvalidData', error: 'TodoIdNotFound' });
        }

        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(400).json({ status: 'InvalidData', error: 'TodoNotFound' });
        }

        await todo.toggleComplete();
        res.json({ status: 'Toggled' });
    } catch (e) {
        res.status(400).json({ status: 'TogglingFailed', error: e.message })
    }
};
const completeAllTodos = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ status: 'InvalidData', error: 'UserIdNotFound' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ status: 'InvalidData', error: 'UserNotFound' });
        }
        await Todo.updateMany({user: userId}, {$set: {completed: true}});
        res.json({ status: 'Success' });
    } catch (e) {
        res.json({ status: 'Fail', error: e.message })
    }
};


const deleteCompletedTodos = async (req, res) => {

    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ status: 'InvalidData', error: 'UserIdNotFound' });
    }
    try {
        const todos = await Todo.find({ completed: true, user: userId });
        await Todo.deleteMany({ completed: true, user: userId });
        const query = {$pull: {todos: {$in: []}}};
        todos.forEach(el => query['$pull']['todos']['$in'].push(el._id));
        await User.updateOne({_id: userId}, query);
        res.status(200).json({ status: 'Success' });
    } catch (err) {
        res.status(400).json({ status: err })
    }
};
module.exports = {
    createTodo,
    deleteTodo,
    toggleTodo,
    completeAllTodos,
    deleteCompletedTodos
};
