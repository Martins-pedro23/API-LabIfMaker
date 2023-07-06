import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Booking } from "../entities/Booking";
import { addBookingController } from "../useCases/AddBooking";

export const BookingRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/booking",
    handler: (
      request: FastifyRequest<{ Body: Booking }>,
      reply: FastifyReply
    ) => {
      return addBookingController.handle(request, reply);
    },
  });
};
