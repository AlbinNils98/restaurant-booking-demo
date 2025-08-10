import fs from "fs";
import path from "path";

const user = fs.readFileSync(path.join(__dirname, "user.gql"), "utf-8");
const signIn = fs.readFileSync(path.join(__dirname, "signIn.gql"), "utf-8");
const scalars = fs.readFileSync(path.join(__dirname, "scalars.gql"), "utf-8");
const directives = fs.readFileSync(path.join(__dirname, "directives.gql"), "utf-8");
const reservation = fs.readFileSync(path.join(__dirname, "reservation.gql"), "utf-8");

export const typeDefs = `
  ${directives}
  ${scalars}
  ${user}
  ${reservation}
  ${signIn}
`;