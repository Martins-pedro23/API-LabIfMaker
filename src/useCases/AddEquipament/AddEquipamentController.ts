import { FastifyReply, FastifyRequest } from "fastify";
import { AddEquipamentUseCase } from "./AddEquipamentUseCase";
import { Equipament } from "../../entities/Equipament";

export class AddEquipamentController {
  constructor(private readonly AddEquipamentUseCase: AddEquipamentUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: Equipament }>,
    reply: FastifyReply
  ) {
    try {
        console.log("requestbody", {...request.body})
      const result = await this.AddEquipamentUseCase.execute({
        ...request.body,
      });

      return reply.code(201).send(result);
    } catch (error: any) {
      return reply.code(400).send({ message: error.message });
    }
  }
}
