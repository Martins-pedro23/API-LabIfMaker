/* import { ObjectId, Schema } from "mongoose";
import { AddBookingUseCase } from "./AddBookingUseCase";
import { test, describe, expect } from "vitest";
import { BookingRepository } from "../../repositories/implementations/BookingRepository";
import { connetion } from "../../database/connection";

const repository = new BookingRepository();
const useCase = new AddBookingUseCase(repository);

describe("AddAdmin", () => {
  test("a", async () => {
    try {
      await connetion(
        ""
      );
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const date5hours = new Date();
      date5hours.setDate(date.getDate() + 1);
      date5hours.setHours(date.getHours() + 5);
      console.log(date5hours.getHours(), date.getHours());
      console.log(date);
      console.log(date5hours);

      await useCase.execute({
        bookedDay: date,
        bookedDayLimit: date5hours,
        description: "description",
        email: "email",
        equipament:
          "649f4e568b6db852ff8e562e" as unknown as Schema.Types.ObjectId,
        phone: 15,
        topic: "topic",
        username: "username",
        dayAndMonth: `${date.getDate()}/${date.getMonth() + 1}`,
      });
    } catch (error: any) {
      expect("Booked day is required").toBe(error.message);
    }
  });
});
 */