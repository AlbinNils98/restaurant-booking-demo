import { MutationResolvers } from "../../generated/graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from 'graphql';
import { GraphQLContext } from '@/graphql/context';
import { ObjectId } from 'mongodb';

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

    const accessToken = jwt.sign(
      { _id: user._id.toString(), role: user.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({
      _id: user._id.toString(), role: user.role
    },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '7d' }
    )

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return accessToken;
  },

  signOut: async (_, __, { res }) => {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return { success: true };
  },

  refresh: async (_, __, { req, res, users }) => {
    const token = req.cookies?.jwt;
    if (!token) throw new GraphQLError("Unauthorized");

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch {
      throw new GraphQLError("Unauthorized");
    }

    const user = await users.findOne({ _id: new ObjectId(decoded._id as string) });
    if (!user) throw new GraphQLError("Unauthorized");

    const accessToken = jwt.sign(
      { _id: decoded._id, role: decoded.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { _id: user._id.toString(), role: user.role },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return accessToken;
  }
};