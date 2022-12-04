const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "db",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "123",
  {
    dialect: "postgres",
    host: process.env.POSTGRES_DB || "localhost",
    port: "80",
    define: {
      timestamps: false,
    },
  }
);

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

BoxTypes.hasMany(Box, { as: "boxType" });
Box.belongsTo(BoxTypes);

module.exports = { Box, BoxTypes };
