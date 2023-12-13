import mongoose from "mongoose";
import User from "./models/user.js";

const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

const createUser = async (firstName, lastName, userName, membershipStatus) => {
  const userDetail = {
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    membershipStatus: membershipStatus,
  };

  const newUser = new User(userDetail);
  await newUser.save();
};

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUser("Steve", "Johnson", "stevejohnson", false);
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}
