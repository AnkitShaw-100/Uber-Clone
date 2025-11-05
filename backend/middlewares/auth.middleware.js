const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    // Token can come from cookie or Authorization header.
    // Don't modify the incoming cookie/header; just read it.
    let token = null;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers && req.headers.authorization) {
        // Authorization header format is usually: "Bearer <token>"
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else {
            // If client sent the raw token in Authorization without 'Bearer '
            token = authHeader;
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await userModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select('-password');

        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user;
        return next();
    } catch (err) {
        // Token invalid/expired or other error
        return res.status(401).json({ message: 'Unauthorized' });
    }
};