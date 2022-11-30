const db = require("../db/init");

module.exports = {
  getBoxes: async (req, res) => {
    res.send(await db.findAll());
  },
  addBox: async (req, res) => {
    const box = req.body;
    if (!box.name) return res.status(400).send({ message: "name is required" });
    if (!box.price)
      return res.status(400).send({ message: "price is required" });
    res.send(await db.create(box));
  },
};
