import { Admin } from "../entities/User";

export interface IAdminRepository {
  addAdmin(admin: Admin): Promise<Admin | void>;
  findByEmail(email: string): Promise<Admin | void>;
}
