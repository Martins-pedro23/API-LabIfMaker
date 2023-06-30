import { FastifyRequest } from "fastify";
import { JwtPayload } from "jsonwebtoken";
import { ILoginAdminDTO } from "../useCases/LoginAdmin/LoginAdminDTO";


export interface IFastifyLogged extends FastifyRequest {
  user: {
    id: string;
    email: string;
    iat: number;
    exp: number;
  };
}

export interface IJwtPayload extends JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
