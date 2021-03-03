import { gql } from "@apollo/client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { makeSchema } from "@nexus/schema";

/* const MyQuery = queryType({
  definition(type) {
    type.string("name", { resolve: () => "Pepe" });
  },
}); */
import Film from "./Film";
import { resolvers } from "./resolvers";
export const typeDefs = gql`
  ${Film}

  type Query {
    films: [Film!]!
    getFilm(id: ID!): Film
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
