const Sequelize = require("sequelize");
const sequelize = new Sequelize("db", "postgres", "123", {
  dialect: "postgres",
  host: "localhost",
  port: "80",
  define: {
    timestamps: false,
  },
});

const Box = sequelize.define("box", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const BoxTypes = sequelize.define("boxTypes", {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

BoxTypes.hasMany(Box, { as: "boxes" });
Box.belongsTo(BoxTypes);

module.exports = { Box, BoxTypes };
