const express = require("express"); // module for express framework
const { effectCollection } = require("../../db");
const { effectMapper } = require("../../mapper");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  let param;
  let effect;
  if (req.query.category !== undefined) {
    let options = {}
    const category = req.query.category.toLowerCase()

    param = {}
    if (category === "popular") {
      // find top 10 effects by score
      options = {
        sort: {
          score: -1,
        },
        limit: 10,
      };
    } else {
      // find effects by category
      param = { category };
    }

    effect = await effectCollection.find(param, options).toArray();
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