const express = require("express");
const BoxesRouter = express.Router();
const boxes = require("../controllers/Box");

BoxesRouter.post("/", async (req, res) => {
  const box = req.body;
  try {
    res.send(await boxes.addBox(box));
  } catch (e) {
    res.status(400).send(e);
  }
});
BoxesRouter.get("/", async (req, res) => {
  const { limit, offset } = req.query;
  res.send(await boxes.getBoxes(limit, offset));
});
BoxesRouter.delete("/", async (req, res) => {
  const id = req.query.id;
  try {
    res.send(await boxes.deleteBox(id));
  } catch (e) {
    res.status(400).send(e);
  }
});
BoxesRouter.patch("/", async (req, res) => {
  const id = req.query.id;
  const box = req.body;
  try {
    res.send(await boxes.changeBox(id, box));
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = BoxesRouter;
