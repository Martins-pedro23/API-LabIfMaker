import { Equipament } from "../../entities/Equipament";
import EquipamentModel from "../../models/EquipamentModel";
import { IEquipamentRepository } from "../IEquipamentRepository";

export class EquipamentRepository implements IEquipamentRepository {
  async addEquipament(equipament: Equipament): Promise<Equipament> {
    try {
      console.log("papa");
      const newEquipament = (await EquipamentModel.create(equipament)).save();

      if (!newEquipament) throw new Error("Equipament not created");

      return newEquipament;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
