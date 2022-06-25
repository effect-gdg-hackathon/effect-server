const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

const uploadRouter = require('./routes/upload')
const detailRouter = require('./routes/detail')
const postsRouter = require('./routes/posts')

app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongoDB server");
});

mongoose.connect('mongodb://0.tcp.jp.ngrok.io:18602');

app.use("/upload", uploadRouter);
app.use("/detail", detailRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Effect Sever listening on port ${port}`)
})