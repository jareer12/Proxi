module.exports = async function main() {
  const fs = require("fs");
  const path = require("path");

  fs.writeFileSync(
    `${__dirname.replace(path.basename(__dirname), "")}/Data/working.txt`,
    ""
  );
};
