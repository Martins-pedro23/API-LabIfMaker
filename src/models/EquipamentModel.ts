import mongoose from "mongoose";
import { Equipament } from "../entities/Equipament";

const EquipamentSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  brand: String,
  software: String,
  extensions: String,
  materials: String,
  moreInformation: String,
  handbook: Array<String>,
  images: Array<String>,
});

export default mongoose.model<Equipament>("Equipament", EquipamentSchema);
