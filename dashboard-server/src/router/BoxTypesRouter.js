const express = require("express");
const BoxTypes = express.Router();
const types = require("../controllers/BoxType");

BoxTypes.post("/", async (req, res) => {
  res.send();
});
BoxTypes.get("/", async (req, res) => {
  const { limit, offset } = req.query;
  res.send(await types.getBoxTypes(limit, offset));
});
BoxTypes.delete("/", async (req, res) => {
  res.send();
});
BoxTypes.patch("/", async (req, res) => {
  res.send();
});

module.exports = BoxTypes;
