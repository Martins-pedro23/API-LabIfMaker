import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ILoginAdminDTO } from "./LoginAdminDTO";

export class LoginAdminUseCase {
  constructor(private readonly AdminRepository: AdminRepository) {}

  async execute(input: ILoginAdminDTO): Promise<string> {
    try {
      const admin = await this.AdminRepository.findByEmail(input.email);

      if (!admin) throw new Error("Admin not found");

      const isValidPassword = bcrypt.compareSync(input.password, admin.password!);

      if (!isValidPassword) throw new Error("Invalid password");

      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        }
      );

      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
