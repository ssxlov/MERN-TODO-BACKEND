const User = require('./../models/user.model');
const Todo = require('./../models/todo.model');

const createTodo = async (req, res) => {
    let userId, user;

    if (!(userId = req.params.userId) || !(user = await User.findById(userId))) return res.status(400).json({status: 'InvalidData', error: 'UserNotFound'});

    try {
        const todo = await Todo.create({title: req.body.title, user: userId});
        await user.todos.push(todo._id);
        await user.save();
        res.status(201).json({todo});
    }
    catch (e) {res.status(400).json({status: 'InvalidData', error: e.message})}
};

const deleteTodo = async (req, res) => {
    let userId, todoId, user;


    if (!(todoId = req.params.todoId)) return res.status(400).json({status: 'InvalidData', error: 'TodoIdNotFound'});

    try {
        if (!(userId = req.params.userId) || !(user = await User.findById(userId))) return res.status(400).json({status: 'InvalidData', error: 'UserNotFound'});

        await Todo.deleteOne({_id: todoId});
        await user.todos.pull(todoId);
        await user.save();
        res.status(204).json({status: 'Deleted'});
    } catch (e) {res.status(400).json({status: 'DeletingFailed', error: e.message})}
};

const toggleTodo = async (req, res) => {
    let todoId, todo;

    try {
        if (!(todoId = req.params.todoId) || (!(todo = await Todo.findById(todoId)))) return res.status(400).json({status: 'InvalidData', error: 'TodoNotFound'});

        await todo.toggleComplete();
        res.json({status: 'Toggled'});
    } catch (e) {{res.status(400).json({status: 'TogglingFailed', error: e.message})}}
};

const completeAllTodos = async (req, res) => {

};

const deleteCompletedTodos = (req, res) => {

};

module.exports = {
    createTodo,
    deleteTodo,
    toggleTodo,
    completeAllTodos,
    deleteCompletedTodos
};
