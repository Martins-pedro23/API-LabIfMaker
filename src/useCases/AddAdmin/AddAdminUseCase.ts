import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { AddAdminDTO } from "./AddAdminDTO";
import { Admin } from "../../entities/Admin";
import * as bcrypt from "bcrypt";

export class AddAdminUseCase {
  constructor(private readonly AdminRepository: IAdminRepository) {}
  async execute(admin: AddAdminDTO): Promise<Admin | undefined> {
    try {
      const alreadyExists = await this.AdminRepository.findByEmail(admin.email);

      if (alreadyExists) throw new Error("Admin already exists");

      admin.password = bcrypt.hashSync(admin.password, 10);
      const result = await this.AdminRepository.addAdmin(admin);

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
