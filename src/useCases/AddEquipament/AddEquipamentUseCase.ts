import { Equipament } from "../../entities/Equipament";
import { IEquipamentRepository } from "../../repositories/IEquipamentRepository";

export class AddEquipamentUseCase {
  constructor(private readonly EquipamentRepository: IEquipamentRepository) {}

  async execute(input: Equipament) {
    try {


      if (!input.name) throw new Error("Name is required");
      if (!input.description) throw new Error("Description is required");
      if (!input.type) throw new Error("Type is required");
      if (!input.brand) throw new Error("Brand is required");
      if (!input.software) throw new Error("Software is required");
      if (!input.extensions) throw new Error("Extensions is required");
      if (!input.materials) throw new Error("Materials is required");
      if (!input.moreInformation)
        throw new Error("MoreInformation is required");
      if (!input.handbook) throw new Error("Handbook is required");
      if (!input.images) throw new Error("Image is required");

      const result = await this.EquipamentRepository.addEquipament({
        ...input, 
      });


      if (!result) throw new Error("Equipament not created");

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
