import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  membershipStatus: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
