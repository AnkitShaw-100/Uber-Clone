const userModel = require("../models/user.model");

module.exports.createUser = async ({
    firstname,
    lastname,
    email,
    password,
}) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    // Prevent duplicate emails by checking first
    const existing = await userModel.findOne({ email });
    if (existing) {
        const err = new Error("Email already exists");
        err.status = 409; // Conflict
        throw err;
    }

    try {
        // Create and return the user
        const user = await userModel.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
        });

        return user;
    } catch (err) {
        // Handle potential race condition duplicate-key error from MongoDB
        // race condition -> Imagine two users registering at the same time with the same email.
        if (err && err.code === 11000) {
            const e = new Error("Email already exists");
            e.status = 409;
            throw e;
        }
        throw err;
    }
};
