require('dotenv').config()

const { effectCollection } = require("./db")

const updateScore = async () => {
    const effects = await effectCollection.find().toArray()

    // add random score into effects
    for (let i = 0; i < effects.length; i++) {
        effects[i].score = Math.floor(Math.random() * 100) + 1;
    }

    // update score into database
    for (let i = 0; i < effects.length; i++) {
        await effectCollection.updateOne({ _id: effects[i]._id }, { $set: { score: effects[i].score } })
    }
}

updateScore()