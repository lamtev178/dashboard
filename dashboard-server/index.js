const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const BoxesRouter = require("./src/router/BoxRouter");
const BoxTypesRouter = require("./src/router/BoxTypesRouter");
const { Box, BoxTypes } = require("./src/db/init");
const { fillBoxTypes, fillBoxes } = require("./src/initialFilling/index");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/box", BoxesRouter);
app.use("/box-types", BoxTypesRouter);

BoxTypes.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  fillBoxTypes();
  Box.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
    fillBoxes();
  });
});

app.listen(8080, () => console.log("Server started on port 8080 "));
