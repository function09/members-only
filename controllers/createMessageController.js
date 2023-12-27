import { body, validationResult } from "express-validator";
import Message from "../models/message.js";

const displayMessageForm = (req, res, next) => {
  console.log(req.user);
  res.render("createMessageForm", { title: "Create A New Message" });
};

const createMessage = [
  body("title").trim().notEmpty().withMessage("Title cannot be empty").escape(),
  body("message").trim().notEmpty().withMessage("Message cannot be empty").escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      timeStamp: Date(),
      user: req.user.firstName,
    });
    if (!errors.isEmpty()) {
      res.render("createMessageForm", { title: "Create A New Message", message, errors: errors.array() });
    } else {
      await message.save();
      res.redirect("/");
    }
  },
];
export { displayMessageForm, createMessage };
