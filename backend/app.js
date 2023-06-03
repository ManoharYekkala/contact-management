require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const connectDB = require("./db/db");
const auth = require("./middleware/auth");

const app = express();

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

//routes
app.get("/protected", auth, (req, res) => {
  return res.status(200).json({ ...req.user });
});
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));

//server config

const PORT = process.env.PORT || 7000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
