require("dotenv").config({ path: "local.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const jobRoute = require("./routes/jobRouter");

app.use("/jobs", jobRoute);

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  // Setting up app
  console.log(`Server running on http://localhost:${port}`);
});
