import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  membershipStatus: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
  messages: { type: Schema.Types.ObjectId, ref: "Message", required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
