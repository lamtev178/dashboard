const express = require("express");
const BoxesRouter = express.Router();
const boxes = require("../controllers/Box");

BoxesRouter.post("/", (req, res) => {
  boxes.addBox(req, res);
});
BoxesRouter.get("/", async (req, res) => {
  boxes.getBoxes(req, res);
});
BoxesRouter.delete("/", async (req, res) => {
  boxes.deleteBox(req, res);
});
BoxesRouter.patch("/", async (req, res) => {
  boxes.changeBox(req, res);
});

module.exports = BoxesRouter;
