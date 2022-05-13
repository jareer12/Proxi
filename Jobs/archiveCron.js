const arrayLimit = require("../module/arrayLimit");
const Chalk = require("../module/chalk");
const isGood = require("./checker");
const path = require("path");
const fs = require("fs");

module.exports = async function main() {
  let Protocol = "http";
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
      Queue = Data.split("\n");
      Queue = arrayLimit(
        Queue.map((val) => val.replace("\r", "")),
        parseInt(process.env.MAX_LIMIT_PER_ARCHIVE_CHECK) || 250
      );
      Chalk.green(`${Queue.length} Proxies Added To Queue`);
      Queue.forEach((Proxy) => {
        isGood({
          ipAddress: Proxy.split(":")[0],
          port: Proxy.split(":")[1],
          protocol: Protocol,
        })
          .then((data) => {
            try {
              fs.readFile(
                `${__dirname.replace(
                  path.basename(__dirname),
                  ""
                )}/Data/working.txt`,
                "utf-8",
                function (err, data) {
                  if (err) {
                  } else {
                    try {
                      let Line = `${Proxy.split(":")[0]}:${
                        Proxy.split(":")[1]
                      }:${Protocol}`;
                      if (!data.includes(Line)) {
                        fs.writeFile(
                          `${__dirname.replace(
                            path.basename(__dirname),
                            ""
                          )}/Data/working.txt`,
                          `${data}\n${Line}`,
                          function (err, data) {}
                        );
                      }
                    } catch (err) {}
                  }
                }
              );
            } catch (err) {}
          })
          .catch((err) => {});
      });
      Chalk.green(`Checked archive/${file}`);
    }
  );
};
