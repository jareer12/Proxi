const router = require("express").Router();

router.get("/", function (req, res) {
  res.json({ Success: true, origin: req.socket.remoteAddress });
});

module.exports = router;
