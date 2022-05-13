const Chalk = require("../module/chalk");
const Archiver = require("./archiveCron");
const isGood = require("./checker");
const fetch = require("node-fetch");
const path = require("path");
const URL = require("./url");
const fs = require("fs");

module.exports = async function main() {
  Archiver();
  let DatabaseFile = `${__dirname.replace(path.basename(__dirname), "")}/Data/${
    process.env.STORAGE_FILE || "working.txt"
  }`;
  if (!fs.existsSync(DatabaseFile)) {
    fs.openSync(DatabaseFile, "w");
  }
  fetch(URL())
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      let Protocol = "http/https";
      Queue = data
        .replace(/ /gi, "")
        .split("\n")
        .map((val) => val.replace(/\r/gi, ""));
      Chalk.green(`${Queue.length} Proxies Added To Queue`);
      Queue.forEach((Proxy) => {
        isGood({
          ipAddress: Proxy.split(":")[0],
          port: Proxy.split(":")[1],
          protocol: Protocol,
        })
          .then((proxyData) => {
            fs.readFile(DatabaseFile, "utf-8", function (err, data) {
              if (err) {
              } else {
                try {
                  let Line = `${proxyData.ipAddress}:${proxyData.port}:${Protocol}`;
                  if (!data.includes(Line)) {
                    fs.writeFileSync(
                      `${__dirname.replace(
                        path.basename(__dirname),
                        ""
                      )}/Data/working.txt`,
                      `${data}\n${Line}`
                    );
                  }
                } catch (err) {
                  Chalk.red(err);
                }
              }
            });
          })
          .catch((err) => {
            // Proxy does not work
          });
      });
    });
};
