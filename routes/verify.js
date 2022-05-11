const router = require("express").Router();

router.get("/", function (req, res) {
  res.json({ Success: true, ip: req.socket.remoteAddress });
});

module.exports = router;
