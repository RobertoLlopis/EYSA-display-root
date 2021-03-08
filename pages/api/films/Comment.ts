import { gql } from "@apollo/client";

export default gql`
  type Comment {
    id: ID!
    user: String!
    message: String!
  }
`;
