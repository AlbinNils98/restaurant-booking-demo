import jwt, { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken";
import { GraphQLError } from "graphql";

export function getCurrentUser(token?: string): { _id: string; role: string } | null {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };

    return { _id: payload.userId, role: payload.role };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new GraphQLError("JWT expired");
    } else if (err instanceof JsonWebTokenError) {
      throw new GraphQLError("Invalid JWT");
    } else if (err instanceof NotBeforeError) {
      throw new GraphQLError("JWT not active yet");
    } else {
      throw new GraphQLError("Unexpected JWT error");
    }
  }
}