import { UpdateEquipamentController } from './UpdateEquipamentController';
import { UpdatedEquipamentUseCase } from './UpdateEquipamentUseCase';
import { EquipamentRepository } from "../../repositories/implementations/EquipamentRepository";

const equipamentRepository = new EquipamentRepository();
const updatedEquipamentUseCase = new UpdatedEquipamentUseCase(equipamentRepository);
const updateEquipamentController = new UpdateEquipamentController(updatedEquipamentUseCase);

export { updateEquipamentController, updatedEquipamentUseCase }
