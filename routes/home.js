require("dotenv").config();

const router = require("express").Router();
const shuffle = require("../module/shuffle");
const fs = require("fs");

router.get("/", function (req, res) {
  Data = fs
    .readFileSync(
      `${__dirname.replace("routes", "")}/Data/working.txt`,
      "utf-8"
    )
    .split("\n")
    .map((val) =>
      JSON.stringify({
        ip: val.split(":")[0],
        port: val.split(":")[1],
        protocol: val.split(":")[2],
      })
    );
  res.render(`${__dirname.replace("routes", "")}/public/home.ejs`, {
    Data: Data,
  });
});

router.get("/css", function (req, res) {
  res.sendFile(`${__dirname.replace("routes", "")}/public/tailwinds.css`);
});

module.exports = router;
