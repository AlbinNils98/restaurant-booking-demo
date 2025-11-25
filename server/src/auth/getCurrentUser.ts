import jwt, { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken";
import { GraphQLError } from "graphql";

export function getCurrentUser(token?: string): { _id: string; role: string } | null {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      _id: string;
      role: string;
    };

    return { _id: payload._id, role: payload.role };
  } catch {
    return null
  }
}