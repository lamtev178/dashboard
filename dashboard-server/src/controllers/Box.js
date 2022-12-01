const db = require("../db/init");

module.exports = {
  getBoxes: async (req, res) => {
    const { limit, offset } = req.query;
    res.send(
      await db.findAll({
        limit: limit || 5,
        offset: offset || 0,
      })
    );
  },
  addBox: async (req, res) => {
    const box = req.body;
    if (!box.name) return res.status(400).send({ message: "name is required" });
    if (!box.price)
      return res.status(400).send({ message: "price is required" });
    res.send(await db.create(box));
  },
  deleteBox: async (req, res) => {
    const id = req.query.id;
    const box = await db.destroy({
      where: {
        id: id,
      },
    });
    if (box) return res.send("Complete");
    res.status(404).send("No box with this id");
  },
  changeBox: async (req, res) => {
    const id = req.query.id;
    if (id === "undefined") return res.status(400).send("Query id is required");
    const box = req.body;
    const changedBox = await db.update(box, {
      where: {
        id: id,
      },
    });
    if (changedBox[0]) return res.send("Complete");
    res.status(404).send("Body us required");
  },
};
