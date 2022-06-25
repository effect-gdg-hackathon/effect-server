const express = require("express"); // module for express framework
const { effectCollection } = require("../../db");
const { effectMapper } = require("../../mapper");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  let param;
  let effect;
  if (req.query.category !== undefined) {
    param = req.query.category;
    effect = await effectCollection.find({category: param}).toArray();
  } else if (req.query.postIds !== undefined){
    param = req.query.postIds;
    effect = await effectCollection.find({postId: { $in: param.split(",") }}).toArray();
  } else if (req.query.creatorId !== undefined){
    param = req.query.creatorId;
    effect = await effectCollection.find({creatorId: param}).toArray();
  }

  res.json({
    list : effectMapper.mapList(effect)
  }).status(200);
});

module.exports = router;