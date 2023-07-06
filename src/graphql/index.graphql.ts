
import { buildSchema } from "type-graphql";
import EquipamentResolver from "./Equipament/EquipamentResolver";

export const buildSchemasFunction = async () => {
  const schemas = await buildSchema({
    resolvers: [EquipamentResolver],
  });

  return schemas;
};