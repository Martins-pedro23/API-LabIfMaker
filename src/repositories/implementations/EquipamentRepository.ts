import { Equipament } from "../../entities/Equipament";
import EquipamentModel from "../../models/EquipamentModel";
import { IEquipamentRepository } from "../IEquipamentRepository";

export class EquipamentRepository implements IEquipamentRepository {
  async addEquipament(equipament: Equipament): Promise<Equipament> {
    try {
      const newEquipament = await EquipamentModel.create(equipament);

      if (!newEquipament) throw new Error("Equipament not created");

      return newEquipament;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async listAllEquipaments(): Promise<Equipament[]> {
    try {
      const equipaments = await EquipamentModel.find();

      if (!equipaments) throw new Error("Cannot list equipaments");

      return equipaments;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async removeEquipament(id: string): Promise<void> {
    try {
      const result = await EquipamentModel.findByIdAndDelete(id);

      if (!result) throw new Error("Equipament not found");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
