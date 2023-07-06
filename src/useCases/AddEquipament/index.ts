import { EquipamentRepository } from "../../repositories/implementations/EquipamentRepository";
import { AddEquipamentController } from "./AddEquipamentController";
import { AddEquipamentUseCase } from "./AddEquipamentUseCase";

const equipamentRepository = new EquipamentRepository();
const addEquipamentUseCase = new AddEquipamentUseCase(equipamentRepository);
const addEquipamentController = new AddEquipamentController(addEquipamentUseCase);


export { addEquipamentController, addEquipamentUseCase }