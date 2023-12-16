import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.js";
import Message from "./models/message.js";

const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

const users = [];

const createUser = async (firstName, lastName, userName, password, membershipStatus, isAdmin, index) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetail = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: hashedPassword,
      membershipStatus: membershipStatus,
      isAdmin: isAdmin,
    };
    const newUser = new User(userDetail);
    await newUser.save();
    users[index] = newUser;
  } catch (err) {
    console.log(err);
  }
};

const createMessage = async (title, message, timeStamp, user) => {
  const messageDetail = {
    title: title,
    message: message,
    timeStamp: timeStamp,
    user: user,
  };
  const newMessage = new Message(messageDetail);
  await newMessage.save();
};

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUser("John", "Smith", "johnsmith", "123abc", false, false, 0);
  await createMessage("Hello!", "Hello this message is a test", Date(), users[0]);
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}
