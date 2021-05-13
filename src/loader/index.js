const morgan = require("morgan");

const expressLoader = require("./express");
const routerLoader = require("./router");

module.exports = ({ app }) => {
  app.use(morgan("dev"));
  
  expressLoader({ app, routerLoader });
};
