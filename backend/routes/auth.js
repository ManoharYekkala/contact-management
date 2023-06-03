const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Joi = require("joi");
const auth = require("../middleware/auth");

//validation rules for registration
const registerSchema = Joi.object({
  name: Joi.string().max(25).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string()
    .pattern(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)
    .required(),
  password: Joi.string().min(5).required(),
});

router.post("/register", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, mobile, password } = req.body;

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return res.status(404).json({
        error: `User Already Exists with email ${email}! Please Try Logging in or a different Email Address`,
      });
    }

    const hashPass = await bcrypt.hash(password, 9);

    const newUser = new User({ name, email, mobile, password: hashPass });

    const result = await newUser.save();
    result._doc.password = undefined;
    return res.status(201).json({ ...result._doc });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//validation for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    //user exists to even login?
    const doesUserExists = await User.findOne({ email });
    if (!doesUserExists) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExists.password
    );
    if (!doesPasswordMatch) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const payload = { _id: doesUserExists._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const user = { ...doesUserExists._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.get("/user", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

module.exports = router;
