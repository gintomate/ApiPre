const User = require("../models/user");

exports.follow = async (req, res, next) => {
    try {
        req.user.following.push(req.params.id);
        await req.user.save();
        res.send({ message: "sucess" });
    } catch (err) {
        next(err);
    }
};