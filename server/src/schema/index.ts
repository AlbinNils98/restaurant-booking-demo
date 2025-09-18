import fs from "fs";
import path from "path";

const user = fs.readFileSync(path.join(__dirname, "user.gql"), "utf-8");
const auth = fs.readFileSync(path.join(__dirname, "auth.gql"), "utf-8");
const scalars = fs.readFileSync(path.join(__dirname, "scalars.gql"), "utf-8");
const directives = fs.readFileSync(path.join(__dirname, "directives.gql"), "utf-8");
const reservation = fs.readFileSync(path.join(__dirname, "reservation.gql"), "utf-8");
const restaurant = fs.readFileSync(path.join(__dirname, "restaurant.gql"), "utf-8");
const tables = fs.readFileSync(path.join(__dirname, "table.gql"), "utf-8");
const contact = fs.readFileSync(path.join(__dirname, "contact.gql"), "utf-8");

export const typeDefs = `
  ${directives}
  ${scalars}
  ${user}
  ${reservation}
  ${auth}
  ${restaurant}
  ${tables}
  ${contact}
`;