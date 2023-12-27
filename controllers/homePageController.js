import Message from "../models/message.js";
import User from "../models/user.js";

const displayMessages = async (req, res, next) => {
  const messages = await Message.find({});
  console.log(req.user);

  res.render("homePage", { title: "Homepage", user: req.user, messages });
};

export default displayMessages;
