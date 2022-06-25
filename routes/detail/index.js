const express = require("express"); // module for express framework
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;