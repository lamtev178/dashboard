const { Box } = require("../db/init");

module.exports = {
  getBoxes: async (limit, offset) => {
    return await Box.findAll({
      limit: +limit || 5,
      offset: +offset || 0,
    });
  },
  addBox: async (box) => {
    if (!box?.name) throw new Error({ message: "name is required" });
    if (!box?.price) throw new Error({ message: "price is required" });
    if (!box?.boxTypeId) box.boxTypeId = 1;
    return await Box.create(box);
  },
  deleteBox: async (id) => {
    const box = await Box.destroy({
      where: {
        id: id,
      },
    });
    if (box) return "Complete";
    throw new Error({ message: "No box with this id" });
  },
  changeBox: async (id, box) => {
    if (id === "undefined")
      throw new Error({ message: "Query id is required" });
    const changedBox = await Box.update(box, {
      where: {
        id: id,
      },
    });
    if (changedBox[0]) return "Complete";
    throw new Error({ message: "Body us required" });
  },
};
