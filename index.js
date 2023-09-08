require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
const routes = require("./routes");
const routeMap = require("express-routemap");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", routes);

app.use("/", (req, res) => {
  return res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server is listening on this http://localhost:${port}`);
  routeMap(app);
});
