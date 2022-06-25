const express = require("express"); // module for express framework
const { effectCollection } = require("../../db");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const postId = req.query.postId;

  const effect = await effectCollection.findOne({postId});
  console.log(effect);

  res.sendStatus(200);
});

module.exports = router;