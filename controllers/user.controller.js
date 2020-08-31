const User = require('../models/user.model');

exports.getUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ status: 'InvalidData', error: 'UserIdNotFound'});
    } try {
        const user = await User.findById(userId).populate({path: todos, select: '_id title completed'});
        res.js(user);
    } catch (e) {
        res.status(400).json({status: 'Fail', error: e.message})
    }
}

