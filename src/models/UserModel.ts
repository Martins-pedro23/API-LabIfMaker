import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: String,
  email: { type: String, required: true, unique: true, lowCase: true },
  password: String,
});

export default mongoose.model<typeof AdminSchema>("User", AdminSchema);
