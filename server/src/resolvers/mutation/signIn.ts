import { MutationResolvers } from "../../generated/graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from 'graphql';

export const authResolvers: MutationResolvers = {
  async signIn(_, { email, password }, { users }) {
    const user = await users.findOne({ email });
    if (!user) {
      throw new GraphQLError("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new GraphQLError("Invalid credentials");
    }

    // create token
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return token;
  },
};