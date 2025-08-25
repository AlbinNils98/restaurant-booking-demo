import { MutationResolvers } from "../../generated/graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from 'graphql';
import { GraphQLContext } from '@/graphql/context';

export const authMutationResolvers: MutationResolvers<GraphQLContext> = {
  signIn: async (_, { email, password }, { users, res }) => {
    const user = await users.findOne({ email });
    if (!user) {
      throw new GraphQLError("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new GraphQLError("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { success: true }
  },
  signOut: async (_, __, { res }) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return { success: true };
  }
};