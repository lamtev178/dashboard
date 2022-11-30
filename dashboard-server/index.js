const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const BoxesRouter = require("./src/router/BoxRouter");
const db = require("./src/db/init");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/box", BoxesRouter);

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

app.listen(8080, () => console.log("Server started on port 8080 "));
