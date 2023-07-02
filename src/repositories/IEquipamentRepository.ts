import { Equipament } from "../entities/Equipament";

export interface IEquipamentRepository {
  addEquipament(equipament: Equipament): Promise<Equipament>;

  listAllEquipaments(): Promise<Equipament[]>;

  removeEquipament(id: string): Promise<void>;
}
