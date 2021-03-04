import filmCatalog from "@eysa/server/data/filmCatalog.json";

export const resolvers = {
  Query: {
    films: () => filmCatalog.map((f) => f),
    getFilm: (_root, args) => filmCatalog.find((film) => args.id == film.id),
  },
};
