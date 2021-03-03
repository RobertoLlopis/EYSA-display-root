import { gql } from "@apollo/client";

export const queryDeclarations = {
  GET_FILMS: gql`
    query GET_FILMS {
      films {
        id
        title
        director
        image
        productionYear
      }
    }
  `,
};
