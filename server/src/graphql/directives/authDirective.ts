import {
  mapSchema,
  MapperKind,
  getDirective,
} from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError } from "graphql";

export function authDirectiveTransformer(schema: any) {
  return mapSchema(schema, {
    [MapperKind.ROOT_FIELD]: (fieldConfig, fieldName, typeName) => {
      // Skip if explicitly marked @public
      const publicDirective = getDirective(schema, fieldConfig, "public")?.[0];
      if (publicDirective) {
        return fieldConfig;
      }

      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = async (source, args, context, info) => {
        if (!context.currentUser) {
          throw new GraphQLError("Not authorized");
        }
        return resolve(source, args, context, info);
      };

      return fieldConfig;
    },
  });
}