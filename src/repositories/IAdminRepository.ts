import { Admin } from "../entities/Admin";

export interface IAdminRepository {
  addAdmin(admin: Admin): Promise<Admin | undefined>;
  findByEmail(email: string): Promise<Admin | undefined>;
}
