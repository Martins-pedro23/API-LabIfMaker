import { Admin } from "../../entities/Admin";
import { AdminRepository } from "../implementations/AdminRepository";

interface AdminMock {
  name: string;
  email: string;
  password: string;
}

export class MockAdminRepository implements AdminRepository {
  admins: AdminMock[] = [];

  constructor() {
    this.admins = [];
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    const result = this.admins.find((admin) => admin.email === email);
    return result;
  }

  async addAdmin(admin: AdminMock): Promise<Admin> {
    const alreadyExists = await this.findByEmail(admin.email);

    if (alreadyExists) throw new Error("Admin already exists");

    this.admins.push({
      name: admin.name,
      email: admin.email,
      password: admin.password,
    });

    return admin;
  }
}
