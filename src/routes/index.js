const express = require("express");
const router = express.Router();

router.post(
  "/api/result/:id",
  (req, res, next) => {
    const { score, username, id } = req.body;
    console.log(score, username, id);

  },
);

module.exports = (app) => {
  app.use("/", router);
};
