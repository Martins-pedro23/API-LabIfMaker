import { Admin } from "../../entities/User";
import { IAdminRepository } from "../IAdminRepository";

export class AdminRepository implements IAdminRepository {
    async addAdmin(admin: Admin): Promise<void> {
        
    }
}
