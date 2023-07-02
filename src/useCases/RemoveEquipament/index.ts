import { EquipamentRepository } from '../../repositories/implementations/EquipamentRepository';
import { RemoveEquipamentController } from './RemoveEquipamentController';
import { RemoveEquipamentUseCase } from './RemoveEquipamentUseCase';

const equipamentRepository = new EquipamentRepository();
const removeEquipamentUseCase = new RemoveEquipamentUseCase(equipamentRepository);
const removeEquipamentController = new RemoveEquipamentController(removeEquipamentUseCase);

export { removeEquipamentController, removeEquipamentUseCase }
