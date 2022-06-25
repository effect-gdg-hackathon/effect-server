const express = require("express"); // module for express framework
const { effectCollection, postIdCollection } = require("../../db");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/",  upload.single("image"), async (req, res) => {
  const { title, content, userId, category, parentPostId } = req.body;

  let imageUrl = ''

  if (req.file) {
    imageUrl = `/images/${req.file.filename}`
  }

  const effect = {
    title,
    content,
    creatorId: userId,
    category,
    parentPostId,
    imageUrl,
    score: Math.floor(Math.random() * 100) + 1,
  }

  await postIdCollection.updateOne({type: 'postId'}, {$inc: {value: 1}}, {upsert: true})
  const postId = (await postIdCollection.findOne({type: 'postId'})).value + ''
  await effectCollection.insertOne({...effect, postId: postId})

  res.json({postId}).status(200);
});

//* If json, image come seperately as a request
router.post("/image",  upload.single("image"), async (req, res) => {
  const imageUrl = `/images/${req.file.filename}`

  const effect = {
    imageUrl
  }

  const postId = req.body.postId

  // await postIdCollection.updateOne({type: 'postId'}, {$inc: {value: 1}}, {upsert: true})
  // const postId = (await postIdCollection.findOne({type: 'postId'})).value + ''
  await effectCollection.updateOne({postId}, {$set: {imageUrl}})

  res.json({postId}).status(200);
});

module.exports = router;