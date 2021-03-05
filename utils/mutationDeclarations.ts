import { gql } from "@apollo/client";

export const mutationDeclarations = {
  ADD_COMMENT: gql`
    mutation ADD_COMMENT($filmId: ID!, $user: String!, $message: String!) {
      addComment(filmId: $filmId, user: $user, message: $message) {
        id
        message
        user
      }
    }
  `,
};
