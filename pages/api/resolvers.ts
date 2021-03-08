import fs from "fs";
const filmCatalogPath = "server/data/filmCatalog.json";
export const resolvers = {
  Query: {
    films: () => {
      const filmCatalog = readFileAndParse(filmCatalogPath);
      return filmCatalog.map((f) => f);
    },
    getFilm: (_root, args) => {
      const filmCatalog = readFileAndParse(filmCatalogPath);
      return filmCatalog.find((film) => args.id == film.id);
    },
  },
  Mutation: {
    addComment: (_root, args) => {
      const { filmId, user, message } = args;
      var newComment = {};
      const filmCatalog = readFileAndParse(filmCatalogPath);
      const updatedFilmCatalog = filmCatalog.map((f) => {
        if (f.id === Number(filmId)) {
          let { comments } = f;
          const newCommentId = simpleAutoIncrement(comments);
          newComment = { id: newCommentId, user, message };
          comments.push(newComment);
        }
        return f;
      });
      fs.writeFileSync(filmCatalogPath, JSON.stringify(updatedFilmCatalog));
      console.log("Done", newComment);
      return newComment;
    },
  },
};

const readFileAndParse = (filePath) => {
  let rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData.toString());
};
const simpleAutoIncrement = (arr) => {
  if (arr.length > 0) return arr[arr.length - 1].id + 1;
  return 1;
};
