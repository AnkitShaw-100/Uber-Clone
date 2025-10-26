const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
      trim: true,
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
      trim: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ _id: this._id }, secret);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // bcrypt.compare returns a Promise
};

// A static helper so the model itself can hash passwords without a document instance
userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10); // bcrypt.hash returns a Promise

};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
