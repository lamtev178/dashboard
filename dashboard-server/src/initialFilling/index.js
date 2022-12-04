const BoxType = require("../controllers/BoxType");
const Box = require("../controllers/Box");

async function fillBoxTypes() {
  await BoxType.addBoxType({ type: "square" });
  await BoxType.addBoxType({ type: "rect" });
  await BoxType.addBoxType({ type: "small" });
  await BoxType.addBoxType({ type: "big" });
}
async function fillBoxes() {
  for (let i = 1; i < 100; i++) {
    await Box.addBox({
      name: `Box ${i}`,
      description: `About ${i} box`,
      price: 10 * i,
      boxTypeId: (i % 4) + 1,
    });
  }
}

module.exports = { fillBoxTypes, fillBoxes };
