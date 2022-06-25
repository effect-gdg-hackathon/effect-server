const express = require("express"); // module for express framework
const { effectCollection } = require("../../db");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const category = req.query.category;

  const effect = await effectCollection.find({category: category}).toArray()

  res.json({
    list : effect
  }).status(200);
});

module.exports = router;