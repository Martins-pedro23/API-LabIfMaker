import { FastifyReply, FastifyRequest } from "fastify";
import { UpdatedEquipamentUseCase } from "./UpdateEquipamentUseCase";
import { Equipament } from "../../entities/Equipament";

export class UpdateEquipamentController {
  constructor(
    private readonly UpdateEquipamentUseCase: UpdatedEquipamentUseCase
  ) {}

  async handle(
    request: FastifyRequest<{ Body: Equipament }>,
    response: FastifyReply
  ) {
    try {
      const { id } = request.body;

      if (!id) throw new Error("Id is required");

      const result = await this.UpdateEquipamentUseCase.execute(id, {
        ...request.body,
      });

      return response.code(201).send(result);
    } catch (error: any) {
      return response.code(400).send({ message: error.message });
    }
  }
}
