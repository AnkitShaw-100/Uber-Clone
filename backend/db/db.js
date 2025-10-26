const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.error(`Error : ${error.message}`);
  }
};

module.exports = connectToDb;
