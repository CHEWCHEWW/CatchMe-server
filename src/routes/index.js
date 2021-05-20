const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post(
  "/api/result/:id", // param과 body 모두 validation 해야함
  async (req, res, next) => {
    try {
      const { score, username } = req.body;

      const newUser = User({
        score,
        username,
      });

      await newUser.save();

      return res.json({ result: "ok" });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/api/result", // param과 body 모두 validation 해야함
  async (req, res, next) => {
    try {
      const records = await User.find({})
        .sort({ "score": 1 })
        .limit(10);
      
      return res.json({ data: records, result: "ok" });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = (app) => {
  app.use("/", router);
};
