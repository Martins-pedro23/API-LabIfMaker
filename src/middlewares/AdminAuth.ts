import { onRequestHookHandler, preHandlerHookHandler } from "fastify";
import * as jwt from "jsonwebtoken";
import { IFastifyLogged, IJwtPayload } from "../types/IFastifyLogged";

export const AdminAuth: preHandlerHookHandler = async (
  request,
  reply,
  next
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

    const beforeBody = request.body;

    request.body = {
      beforeBody,
      user: {
        id: decoded.id,
        email: decoded.email,
        iat: decoded.iat,
        exp: decoded.exp,
      },
    };

    next();
  } catch (error: any) {
    reply.code(401).send({ message: error.message });
  }
};
