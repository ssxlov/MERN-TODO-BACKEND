const User = require('../models/user.model');
const Todo = require('../models/todo.model');
exports.getUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ status: 'InvalidData', error: 'UserIdNotFound'});
    } try {
        const user = await User.findById(userId).populate({path: todos, select: '_id title completed'});
        const todo = await Todo.find({ title: req.body.title, user: userId });

        await user.todos.unshift(todo._id);
        await user.save();
        await todo.save()
        res.js(user, todo);

    } catch (e) {
        res.status(400).json({status: 'Fail', error: e.message})
    }
}

