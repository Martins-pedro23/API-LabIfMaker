import { Booking } from "../../entities/Booking";
import { IBookingRepository } from "../../repositories/IBookingRepository";

export class AddBookingUseCase {
  constructor(private readonly BookingRepository: IBookingRepository) {}

  async execute(booking: Booking) {
    try {
      if (!booking.bookedDay) throw new Error("Booked day is required");
      if (!booking.bookedDayLimit) throw new Error("Booked hour is required");
      if (!booking.equipament) throw new Error("Equipament is required");
      if (!booking.username) throw new Error("Username is required");
      if (!booking.email) throw new Error("Email is required");
      if (!booking.phone) throw new Error("Phone is required");
      if (!booking.topic) throw new Error("Topic is required");
      if (!booking.description) throw new Error("Description is required");
      if (!booking.dayAndMonth) throw new Error("Day and month is required");

      const alreadyBooked = await this.BookingRepository.findBookingByDay(
        booking.dayAndMonth
      );

      if (alreadyBooked) {
        alreadyBooked.forEach((alreadyBooked: Booking) => {
          if (alreadyBooked.equipament == booking.equipament) {
            if (!alreadyBooked.bookedDay || !alreadyBooked.bookedDayLimit)
              throw new Error("Booked hour is required");
            const bookedDay = booking.bookedDay;
            const alreadyBookedDay = alreadyBooked.bookedDay;

            const bookedDayLimit = booking.bookedDayLimit;
            const alreadyBookedDayLimit = alreadyBooked.bookedDayLimit;

            if (
              bookedDay! > alreadyBookedDay! &&
              bookedDay! < alreadyBookedDayLimit!
            )
              throw new Error("This hour is already booked");

            if (
              bookedDayLimit! > alreadyBookedDay &&
              bookedDayLimit! < alreadyBookedDayLimit
            )
              throw new Error("This hour is already booked");
          }
        });
      }

      await this.BookingRepository.addBooking(booking);

      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
