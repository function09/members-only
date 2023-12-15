import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.js";

const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

const createUser = async (firstName, lastName, userName, password, membershipStatus, isAdmin) => {
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
};

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUser("Steve", "Johnson", "stevejohnson", "123abc", false);
  await createUser("John", "Smith", "johnsmith", "45671", false);
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}
