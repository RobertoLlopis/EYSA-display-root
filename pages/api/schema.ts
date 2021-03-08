import { gql } from "@apollo/client";
import { makeExecutableSchema } from "@graphql-tools/schema";

import Film from "./films/Film";
import Comment from "./films/Comment";
import { resolvers } from "./resolvers";
export const typeDefs = gql`
  ${Film}
  ${Comment}
  type Query {
    films: [Film!]!
    getFilm(id: ID!): Film
  }
  type Mutation {
    addComment(filmId: ID!, user: String!, message: String!): Comment
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
