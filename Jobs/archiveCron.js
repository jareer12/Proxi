const arrayLimit = require("../module/arrayLimit");
const Chalk = require("../module/chalk");
const isGood = require("./checker");
const path = require("path");
const fs = require("fs");

module.exports = async function main() {
  Chalk.blue(`Restarted Checker`);
  fs.readdir(
    `${__dirname.replace(path.basename(__dirname), "")}/archive`,
    function (err, data) {
      if (err) {
        Chalk.red(err);
      }
      let file = data[Math.floor(Math.random() * data.length)];

      Chalk.green(`Checking Proxies From archive/${file}`);
      let Data = fs.readFileSync(
        `${__dirname.replace(path.basename(__dirname), "")}/archive/${file}`,
        "utf-8"
      );
      let Protocol = "http/https";
      Queue = Data.replace(/ /gi, "")
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
      Chalk.green(`Checked archive/${file}`);
    }
  );
};
