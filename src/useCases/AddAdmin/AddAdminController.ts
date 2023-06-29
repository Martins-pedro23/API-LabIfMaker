import { FastifyReply, FastifyRequest } from "fastify";
import { AddAdminUseCase } from "./AddAdminUseCase";
import { AddAdminDTO } from "./AddAdminDTO";

export class AddAdminController {
  constructor(private readonly addAdminUseCase: AddAdminUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: AddAdminDTO }>,
    response: FastifyReply
  ): Promise<FastifyReply> {
    try {
      const { name, email, password } = request.body;

      const result = await this.addAdminUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).send(result);
    } catch (error: any) {
      return response.status(400).send({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
