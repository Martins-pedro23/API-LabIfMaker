import { Admin } from "../entities/Admin";

export interface IAdminRepository {
  addAdmin(admin: Admin): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | undefined>;
}
