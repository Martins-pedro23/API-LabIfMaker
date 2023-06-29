import { Admin } from "../entities/User";

export interface IAdminRepository {
  addAdmin(admin: Admin): Promise<void>;
}
