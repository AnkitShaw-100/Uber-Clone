const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectToDb = require('./db/db');
connectToDb();

const userRoutes = require('./routes/user.routes');

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Heyyyy");
});
app.use('/users', userRoutes)

module.exports = app;
