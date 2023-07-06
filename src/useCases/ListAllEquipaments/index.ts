import { EquipamentRepository } from "../../repositories/implementations/EquipamentRepository";
import { ListAllEquipamentsController } from "./ListAllEquipamentsController";
import { ListAllEquipamentsUseCase } from "./ListAllEquipamentsUseCase";

const equipamentRepository = new EquipamentRepository();
const listEquipamentsUseCase = new ListAllEquipamentsUseCase(equipamentRepository);
const listEquipamentsController = new ListAllEquipamentsController(listEquipamentsUseCase);

export { listEquipamentsController, listEquipamentsUseCase };
