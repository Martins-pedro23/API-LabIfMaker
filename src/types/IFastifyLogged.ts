import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload extends JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
