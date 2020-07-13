const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

const userComponent = require("./components/users");
const stationComponent = require("./components/stations");

app.use("/v1/users", userComponent);
app.use("/v1/stations", stationComponent);

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
