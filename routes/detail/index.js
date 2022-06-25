const express = require("express"); // module for express framework
const { effectCollection } = require("../../db");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const postId = req.params.postId;

  const effect = await effectCollection.findOne({postId});

  res.json({
    title: effect.title,
    content: effect.content,
    imageUrl: effect.imageUrl,
    postId: effect.postId,
    creatorId: effect.creatorId,
    category: effect.category,
    parentPostId: effect.partentId,
  }).status(200);
});

module.exports = router;