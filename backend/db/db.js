const mongoose = require("mongoose");
const connectDB = async () => {
  return mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
      console.log("connection established");
    })
    .catch(() => {
      console.log("error connecting to database");
    });
};

module.exports = connectDB;
