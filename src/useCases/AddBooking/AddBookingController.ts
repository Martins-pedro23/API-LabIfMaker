import { FastifyReply, FastifyRequest } from "fastify";
import { AddBookingUseCase } from "./AddBookingUseCase";
import { Booking } from "../../entities/Booking";
export class AddBookingController {
  constructor(private readonly AddBookingUseCase: AddBookingUseCase) {}

  async handle(req: FastifyRequest<{ Body: Booking }>, res: FastifyReply) {
    try {
      await this.AddBookingUseCase.execute({ ...req.body });
      res.code(201).send();
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }
}
