import { AdminRepository } from "../../repositories/implementations/AdminRepository";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ILoginAdminDTO } from "./LoginAdminDTO";

export class LoginAdminUseCase {
  constructor(private readonly AdminRepository: AdminRepository) {}

  async execute(input: ILoginAdminDTO): Promise<string> {
    try {
      if (!input.email) throw new Error("Email is required");
      if (!input.password) throw new Error("Password is required");
      if (!input.email && !input.password)
        throw new Error("Email and password is required");

      const admin = await this.AdminRepository.findByEmail(input.email);

      
      if (!admin) throw new Error("Credentials invalid");
      
      const isValidPassword = bcrypt.compareSync(
        input.password,
        admin.password!
        );
        
        if (!isValidPassword) throw new Error("Credentials invalid");
        
        const token = jwt.sign(
          { id: admin.id, email: admin.email },
          process.env.JWT_SECRET!,
          {
            expiresIn: "1d",
          }
          );
          
          return token;
        } catch (error: any) {
      console.log(error.message);
      if (error.message === "Email is required") throw new Error(error.message);
      if (error.message === "Password is required")
        throw new Error(error.message);
      if (error.message === "Email and password is required")
        throw new Error(error.message);

      throw new Error("Credentials invalid");
    }
  }
}
