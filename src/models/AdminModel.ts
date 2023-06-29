import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true, lowCase: true },
  password: String,
});

export default mongoose.model<typeof AdminSchema>("Admin", AdminSchema);
