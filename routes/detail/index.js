const express = require("express"); // module for express framework
const { effectCollection } = require("../../db");
const { effectMapper } = require("../../mapper");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const postId = req.params.postId;

  const effect = await effectCollection.findOne({postId});

  res.json(effectMapper.map(effect)).status(200);
});

module.exports = router;