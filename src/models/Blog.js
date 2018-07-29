import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  id: { type: String }
});

export default mongoose.model("Blog", schema);