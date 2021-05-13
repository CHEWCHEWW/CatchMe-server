const express = require("express");
const router = express.Router();

router.post(
  "/api/result/:id",
  (req, res, next) => {
    const { record } = req.body;
  },
);

module.exports = (app) => {
  app.use("/", router);
};
