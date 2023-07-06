import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import { LoginAdminUseCase } from "./LoginAdminUseCase";
import { LoginAdminController } from "./LoginAdminController";

const adminRepository = new AdminRepository();
const loginAdminUseCase = new LoginAdminUseCase(adminRepository);
const loginAdminController = new LoginAdminController(loginAdminUseCase);

export { loginAdminUseCase, loginAdminController };
