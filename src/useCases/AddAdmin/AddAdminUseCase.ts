import { IAdminRepository } from "../../repositories/IAdminRepository";
import { Admin } from "../../entities/Admin";
import * as bcrypt from "bcrypt";


export class AddAdminUseCase {
  constructor(private readonly AdminRepository: IAdminRepository) {}
  async execute(admin: Admin): Promise<Admin | Error> {
    try {
      if(!admin.email) throw new Error("Email is required");
      if(!admin.name) throw new Error("Name is required");
      if(!admin.password) throw new Error("Password is required");

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
