const Sequelize = require("sequelize");
const sequelize = new Sequelize("db", "postgres", "123", {
  dialect: "postgres",
  host: "localhost",
  port: "80",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize.define("box", {
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
