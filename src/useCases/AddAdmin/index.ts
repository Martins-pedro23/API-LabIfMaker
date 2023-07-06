import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import { AddAdminUseCase } from "./AddAdminUseCase";
import { AddAdminController } from "./AddAdminController";

const adminRepository = new AdminRepository();
const addAdminUseCase = new AddAdminUseCase(adminRepository);
const addAdminController = new AddAdminController(addAdminUseCase);
export { addAdminUseCase, addAdminController };
