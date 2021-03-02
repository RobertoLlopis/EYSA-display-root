import { makeSchema, queryType } from "@nexus/schema";
import * as types from "./allTypes";
/* const MyQuery = queryType({
  definition(type) {
    type.string("name", { resolve: () => "Pepe" });
  },
}); */

export const schema = makeSchema({
  types,
});
