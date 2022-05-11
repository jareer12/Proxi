module.exports = async function main() {
  const fetch = require("node-fetch");
  const isGood = require("./checker");
  const URL = require("./url");
  const fs = require("fs");

  fetch(URL({}))
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      const Protocol = "http";
      Queue = data
        .replace(/ /gi, "")
        .split("\n")
        .map((val) => val.replace(/\r/gi, ""));
      console.log(`${Queue.length} Proxies Added To Queue`);
      let Done = 0;
      Queue.forEach((Proxy) => {
        isGood({
          ipAddress: Proxy.split(":")[0],
          port: Proxy.split(":")[1],
          protocol: Protocol,
        })
          .then((data) => {
            fs.readFile(
              `${__dirname.replace("Jobs", "")}/Data/working.txt`,
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
                        `${__dirname.replace("Jobs", "")}/Data/working.txt`,
                        `${data}\n${Line}`,
                        function (err, data) {}
                      );
                    }
                  } catch (err) {}
                }
              }
            );
          })
          .catch((err) => {
            // Proxy does not work
          });
      });
    });
};
