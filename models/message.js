import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
});

const message = mongoose.model("Message", messageSchema);

export default message;
