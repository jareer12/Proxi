require("dotenv").config();

const express = require("express");
const path = require("path");
const App = express();

const Cron = require("./Jobs/cron");
const Reset = require("./Jobs/reset");
const Chalk = require("./module/chalk");

App.use("/", require("./routes/home"));
App.use("/verify", require("./routes/verify"));
App.use("/proxies", require("./routes/proxies"));

App.set("view engine", "html");
App.engine("html", require("ejs").renderFile);
App.set("views", path.join(__dirname, "views"));

setInterval(() => {
  Cron();
  Chalk.blue(`Restarted Checker`);
}, parseInt(process.env.RUN_CRON_INTERVAL_MS) || 5 * 60 * 1000);
setInterval(() => {
  Reset();
  Chalk.red(`Cleared Proxy Database`);
}, parseInt(process.env.RESET_INTERVAL_MS) || 5 * 60 * 1000);

App.listen(process.env.PORT || 3344);
