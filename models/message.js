import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: String, required: true },
  user: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
