import { onRequestHookHandler, FastifyRequest, FastifyReply } from "fastify";
import * as jwt from "jsonwebtoken";
import { IJwtPayload } from "../types/IFastifyLogged";

export const AdminAuth: onRequestHookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) throw new Error("Token is required");

    let token;
    if (authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }
    token = authorization;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;

    if (!decoded) return reply.code(401).send({ message: "Invalid token" });

    const beforeHeaders = request.headers;

    request.headers = {
      ...beforeHeaders,
      logged: [decoded.id, decoded.email],
    };

  } catch (error: any) {
    reply.code(401).send({ message: error.message });
  }
};
