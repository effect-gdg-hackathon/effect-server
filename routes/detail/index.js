const express = require("express"); // module for express framework
const { effectCollection } = require("../../db");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const postId = req.query.postId;

  const effect = await effectCollection.findOne({postId});

  res.json({
    title: effect.title,
    content: effect.content,
    imageUrl: effect.imageUrl,
    postId: effect.postId,
    creatorId: effect.creatorId,
    category: effect.category,
  }).status(200);
});

module.exports = router;