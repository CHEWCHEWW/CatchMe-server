const express = require("express");
const router = express.Router();

router.post(
  "/api/result/:id",
  (req, res, next) => {
    console.log(244);
    console.log(req.body);
    const { record } = req.body;
    console.log(record);
  },
);

module.exports = (app) => {
  app.use("/", router);
};
