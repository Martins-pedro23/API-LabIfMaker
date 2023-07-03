import { IEquipamentRepository } from "../../repositories/IEquipamentRepository";
import { Equipament } from "../../entities/Equipament";

export class UpdatedEquipamentUseCase {
  constructor(private readonly EquipamentRepository: IEquipamentRepository) {}

  async execute(id: string, equipament: Equipament) {
    try {
      if (!id) throw new Error("Id is required");
      
      const result = await this.EquipamentRepository.updateEquipament(
        id,
        equipament
      );

      if (!result) throw new Error("Cannot update equipament");

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
