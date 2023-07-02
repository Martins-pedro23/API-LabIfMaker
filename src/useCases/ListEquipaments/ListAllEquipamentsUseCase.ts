import { IEquipamentRepository } from "../../repositories/IEquipamentRepository";

export class ListAllEquipamentsUseCase {
  constructor(private readonly EquipamentRepository: IEquipamentRepository) {}

  async execute() {
    try {
      const result = await this.EquipamentRepository.listAllEquipaments();

      if (!result) throw new Error("Cannot list equipaments");

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
