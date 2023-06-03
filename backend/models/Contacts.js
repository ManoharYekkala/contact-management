const mongoose = require("mongoose");
const joi = require("joi");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = joi.object({
    name: joi.string().min(4).max(30).required(),
    address: joi.string().min(4).max(100).required(),
    email: joi.string().email().required(),
    phone: joi.number().min(7).max(100000000000).required(),
  });

  return schema.validate(data);
};

module.exports = { validateContact, Contact };
