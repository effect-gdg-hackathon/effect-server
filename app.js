const express = require('express')
const app = express()
const port = 3000

const uploadRouter = require('./routes/upload')
const detailRouter = require('./routes/detail')
const postsRouter = require('./routes/posts')

app.use(express.json());

app.use("/api/upload", uploadRouter);
app.use("/api/posts/:postId", detailRouter);
app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log(`Effect Sever listening on port ${port}`)
})