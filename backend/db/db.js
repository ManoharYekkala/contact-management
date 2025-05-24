const mongoose = require("mongoose");
const connectDB = async () => {
  return mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@contact-manage.36vmmow.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("connection established");
    })
    .catch(() => {
      console.log("error connecting to database");
    });
};

module.exports = connectDB;
