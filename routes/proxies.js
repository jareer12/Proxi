require("dotenv").config();

const router = require("express").Router();
const shuffle = require("../module/shuffle");
const fs = require("fs");

router.get("/", function (req, res) {
  if (process.env.API_ACCESS) {
    let toShuffle = req.query.shuffle == "true" ? true : false;
    if (req.query.type == "txt") {
      Data = fs
        .readFileSync(
          `${__dirname.replace("routes", "")}/Data/working.txt`,
          "utf-8"
        )
        .split("\n")
        .map((val) => val.replace(/:http/gi, ""));
      return res.end(
        toShuffle == true
          ? shuffle(Data).join("\n").replace("\n\n", "\n")
          : Data.join("\n").replace("\n\n", "\n")
      );
    } else {
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
      Data = Data.map((val) => JSON.parse(val));
    }
    return res.json({
      Success: true,
      Data: toShuffle == true ? shuffle(Data) : Data,
    });
  }
});

module.exports = router;
