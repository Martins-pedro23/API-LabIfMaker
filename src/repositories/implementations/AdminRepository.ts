import { Admin } from "../../entities/Admin";
import { IAdminRepository } from "../IAdminRepository";
import AdminModel from "../../models/AdminModel";

export class AdminRepository implements IAdminRepository {
  async addAdmin(admin: Admin): Promise<Admin | undefined> {
    try {
      const result = await AdminModel.create(admin);

      if (!result) throw new Error("Admin already exists");

      return {
        name: result.name!,
        email: result.email!,
        password: result.password!,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    try {
      const result = await AdminModel.findOne({ email });

      return {
        name: result!.name,
        email: result!.email,
        password: result!.password,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
