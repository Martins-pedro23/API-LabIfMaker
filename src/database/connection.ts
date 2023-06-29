import { magenta, red } from "colorette";
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

export const connetion = async () => {
  try {
    if (!MONGODB_URL) throw new Error("MongoDB URL not found");
    await mongoose.connect(MONGODB_URL);
    console.log(magenta(`-> MongoDB connected`));
  } catch (error) {
    console.log(red("MongoDB connection failed"), error);
  }
};
