import { Admin } from "../../entities/User";
import { IAdminRepository } from "../IAdminRepository";
import UserModel from "../../models/UserModel";

export class AdminRepository implements IAdminRepository {
  async addAdmin(admin: Admin): Promise<Admin | void> {
    try {
      if (!admin.name) throw new Error("Name is required");
      if (!admin.email) throw new Error("Email is required");
      if (!admin.password) throw new Error("Password is required");

      const result: Admin = await UserModel.create(admin);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string): Promise<Admin | void> {}
}
