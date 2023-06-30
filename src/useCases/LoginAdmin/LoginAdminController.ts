import { FastifyReply, FastifyRequest } from "fastify";
import { LoginAdminUseCase } from "./LoginAdminUseCase";
import { ILoginAdminDTO } from "./LoginAdminDTO";

export class LoginAdminController {
  constructor(private readonly LoginAdminUseCase: LoginAdminUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: ILoginAdminDTO }>,
    response: FastifyReply
  ) {
    try {
      const { email, password } = request.body;
      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");

      const token = await this.LoginAdminUseCase.execute({ email, password });

      return response.status(200).send({ token });
    } catch (error: any) {
      return response.status(400).send({ message: error.message });
    }
  }
}
