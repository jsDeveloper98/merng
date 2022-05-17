import { config } from "dotenv";
import { Secret, verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

import { IContext, IUser } from "../types";

config();

const { JWT_SECRET } = process.env;

export const checkAuth = (context: IContext): IUser => {
  console.log({context});
  
  const authHeader = context.req.headers.authorization;

  console.log({context});
  

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        return verify(token, JWT_SECRET as Secret) as IUser;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }

    throw new Error("Authentication token must be 'Bearer[token]!");
  }

  throw new Error("Authorization header must be provided!");
};
