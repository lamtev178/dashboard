const BoxType = require("../controllers/BoxType");
const Box = require("../controllers/Box");

function fillBoxTypes() {
  BoxType.addBoxType({ type: "square" });
  BoxType.addBoxType({ type: "rect" });
  BoxType.addBoxType({ type: "small" });
  BoxType.addBoxType({ type: "big" });
}
async function fillBoxes() {
  for (let i = 1; i < 40; i++) {
    await Box.addBox({
      name: `Box ${i}`,
      description: `About ${i} box`,
      price: 10 * i,
      boxTypeId: (i % 4) + 1,
    });
  }
}

module.exports = { fillBoxTypes, fillBoxes };
