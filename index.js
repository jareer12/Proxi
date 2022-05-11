const express = require("express");
const App = express();

App.use("/verify", require("./routes/verify"));
App.use("/proxies", require("./routes/proxies"));

App.listen(process.env.PORT || 3344);
require("./Jobs/cron")();
