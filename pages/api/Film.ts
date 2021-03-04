import { gql } from "@apollo/client";

export default gql`
  type Film {
    id: ID!
    title: String!
    productionYear: String
    director: String!
    valoration: Int
    image: String!
    comments: String
  }
`;
