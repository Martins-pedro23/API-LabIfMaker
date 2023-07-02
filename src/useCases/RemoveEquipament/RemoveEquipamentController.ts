import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveEquipamentUseCase } from "./RemoveEquipamentUseCase";

export class RemoveEquipamentController {
  constructor(
    private readonly RemoveEquipamentUseCase: RemoveEquipamentUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      await this.RemoveEquipamentUseCase.execute(request.body.id);

      return reply.code(200).send({ message: "Equipament removed" });
    } catch (error: any) {
      return reply.code(400).send({ message: error.message });
    }
  }
}
