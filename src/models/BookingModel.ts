import mongoose from "mongoose";
import { Booking } from "../entities/Booking";

const BookingSchema = new mongoose.Schema({
  bookedDay: { type: Date, required: true },
  bookedHourInit: { type: String, required: true },
  bookedHourLimit: { type: String, required: true },
  equipament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipament",
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
});


export default mongoose.model<Booking>("Booking", BookingSchema);
