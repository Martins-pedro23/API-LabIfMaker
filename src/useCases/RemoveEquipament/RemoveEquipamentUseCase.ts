import { IEquipamentRepository } from "../../repositories/IEquipamentRepository";

export class RemoveEquipamentUseCase {
  constructor(private readonly EquipamentRepository: IEquipamentRepository) {}

  async execute(id: string) {
    try {
      if (!id) throw new Error("Id is required");

      const result = await this.EquipamentRepository.removeEquipament(id);

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
