import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { AddAdminDTO } from "./AddAdminDTO";

export class AddAdminUseCase {
  constructor(private readonly AdminRepository: IAdminRepository) {}
  async execute(admin: AddAdminDTO) {
    try {
      if (!admin.name) throw new Error("Name is required");
      if (!admin.email) throw new Error("Email is required");
      if (!admin.password) throw new Error("Password is required");

      const alreadyExists = await this.AdminRepository.findByEmail(admin.email);
      if (alreadyExists) throw new Error("Admin already exists");

      const result = await this.AdminRepository.addAdmin(admin);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
