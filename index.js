require("dotenv").config();

const express = require("express");
const path = require("path");
const App = express();

App.use("/", require("./routes/home"));
App.use("/verify", require("./routes/verify"));
App.use("/proxies", require("./routes/proxies"));

App.set("view engine", "html");
App.engine("html", require("ejs").renderFile);
App.set("views", path.join(__dirname, "views"));

App.listen(process.env.PORT || 3344);
require("./Jobs/cron")();
setTimeout(() => {
  require("./Jobs/cron")();
}, process.env.RUN_CRON_INTERVAL_MS || 5 * 60 * 1000);
