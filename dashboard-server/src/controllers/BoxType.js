const { BoxTypes } = require("../db/init");
module.exports = {
  getBoxTypes: async (limit, offset) => {
    return await BoxTypes.findAll({
      limit: limit || 5,
      offset: offset || 0,
    });
  },
  addBoxType: async (type) => {
    await BoxTypes.create(type);
  },
};
