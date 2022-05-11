const chalk = require("chalk");
class Chalk {
  green(arg) {
    console.log(`${chalk.hex(`#44c961`)(`[+]`)} ${arg}`);
  }
  red(arg) {
    console.log(`${chalk.hex(`#c94444`)(`[-]`)} ${arg}`);
  }
  blue(arg) {
    console.log(`${chalk.hex(`#445ac9`)(`[!]`)} ${arg}`);
  }
  yellow(arg) {
    console.log(`${chalk.hex(`#c9b144`)(`[?]`)} ${arg}`);
  }
}
module.exports = new Chalk();
