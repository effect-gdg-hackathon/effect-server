require('dotenv').config()

const { effectCollection } = require("./db")

const findHead = async (postId) => {
    const effects = await effectCollection.find().toArray()

    console.log(effects.length)
}

exports.findHead = findHead

findHead("1234")