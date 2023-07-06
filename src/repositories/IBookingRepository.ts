import { Booking } from "../entities/Booking";

export interface IBookingRepository {
  addBooking(booking: Booking): Promise<void>;
  findBookingByDay(bookedDay: string): Promise<Booking[] | undefined>;
}
