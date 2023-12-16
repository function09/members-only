import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const displaySignUpPage = (req, res, next) => {
  res.render("signUpForm", { title: "Sign-Up" });
};

const submitSignupForm = [
  body("firstName")
    .trim()
    .isAlpha("en-US")
    .withMessage("First name must contain letters")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .escape(),

  body("lastName")
    .trim()
    .isAlpha("en-US")
    .withMessage("Last name must contain letters")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use");
      }
    })
    .escape(),

  body("password")
    .trim()
    .isAlphanumeric("en-US")
    .withMessage("Password must contain letters and numbers only")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .escape(),
  body("confirmPassword").custom((value, { req }) => value === req.body.password),

  async (req, res, next) => {
    const errors = validationResult(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      membershipStatus: false,
      isAdmin: false,
    });

    if (!errors.isEmpty()) {
      res.render("signUpForm", { title: "sign-up", user, errors: errors.array() });
    } else {
      await user.save();
      res.redirect("/");
    }
  },
];

export { displaySignUpPage, submitSignupForm };
