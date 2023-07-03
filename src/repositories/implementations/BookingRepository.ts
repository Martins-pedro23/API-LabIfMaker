import { Booking } from "../../entities/Booking";
import BookingModel from "../../models/BookingModel";
import { IBookingRepository } from "../IBookingRepository";

export class BookingRepository implements IBookingRepository {
  async addBooking(booking: Booking): Promise<void> {
    try {
      const result = await BookingModel.create(booking);

      if (!result) throw new Error("Error to create booking");

      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findBookingByDay(bookedDay: Date): Promise<Booking[] | undefined> {
    try {
      const result = await BookingModel.find({
        bookedDay,
      });

      if (!result) return undefined;

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
