import { BookingRepository } from "../../repositories/implementations/BookingRepository";
import { AddBookingController } from "./AddBookingController";
import { AddBookingUseCase } from "./AddBookingUseCase";

const bookingRepository = new BookingRepository();
const addBookingUseCase = new AddBookingUseCase(bookingRepository);
const addBookingController = new AddBookingController(addBookingUseCase);

export { addBookingUseCase, addBookingController };
