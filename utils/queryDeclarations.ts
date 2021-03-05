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
  GET_FULL_FILMS: gql`
    query GET_FULL_FILMS {
      films {
        id
        title
        director
        image
        productionYear
        valoration
      }
    }
  `,
  GET_SINGLE_FULL_FILM: gql`
    query GET_SINGLE_FULL_FILM($id: ID!) {
      getFilm(id: $id) {
        id
        title
        director
        image
        productionYear
        valoration
        comments {
          user
          id
          message
        }
      }
    }
  `,
  GET_FILMS_ID: gql`
    query GET_FILMS_ID {
      films {
        id
      }
    }
  `,
};
