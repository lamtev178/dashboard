const express = require("express");
const BoxesRouter = express.Router();
const boxes = require("../models/BoxModel");

BoxesRouter.post("/add", (req, res) => {
  boxes.addBox(req, res);
});

BoxesRouter.get("/", async (req, res) => {
  boxes.getBoxes(req, res);
});

module.exports = BoxesRouter;
