const Chalk = require("../module/chalk");

module.exports = async function main() {
  Chalk.red(`Cleared Proxy Database`);
  const fs = require("fs");
  const path = require("path");

  fs.writeFileSync(
    `${__dirname.replace(path.basename(__dirname), "")}/Data/working.txt`,
    ""
  );
};
