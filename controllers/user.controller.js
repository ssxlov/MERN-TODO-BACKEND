const User = require('../models/user.model');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({path: 'todos', select: '_id title completed'});
        res.json(user);
    } catch (err) {
        res.status(400).json({status: 'UserDoesNotExist'})
    }
}