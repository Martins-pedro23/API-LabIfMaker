import { FastifyReply, FastifyRequest } from "fastify";
import { ListAllEquipamentsUseCase } from "./ListAllEquipamentsUseCase";

export class ListAllEquipamentsController {
  constructor(
    private readonly ListAllEquipamentsUseCase: ListAllEquipamentsUseCase
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await this.ListAllEquipamentsUseCase.execute();

      return reply.code(200).send(result);
    } catch (error: any) {
      return reply.code(400).send({ message: error.message });
    }
  }
}
