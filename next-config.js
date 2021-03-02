const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["@eysa/films"]);
module.exports = withImages({withTM()});
