import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { tag } from "./tag";
import { brand } from "./brand";
import { category } from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, tag, brand, category],
};
