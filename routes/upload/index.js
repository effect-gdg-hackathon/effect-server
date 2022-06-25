const express = require("express"); // module for express framework
const { effectCollection, postIdCollection } = require("../../db");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const { title, content, userId, category, parentPostId } = req.body;

  const effect = {
    title,
    content,
    creatorId: userId,
    category,
    parentPostId,
  }

  await postIdCollection.updateOne({type: 'postId'}, {$inc: {value: 1}}, {upsert: true})
  const postId = (await postIdCollection.findOne({type: 'postId'})).value + ''
  await effectCollection.insertOne({...effect, postId: postId})

  res.json({postId}).status(200);
});

router.post("/image", (req, res) => {
});

module.exports = router;