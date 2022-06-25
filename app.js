const express = require('express')
const app = express()
const port = 3000

const uploadRouter = require('./routes/upload')
const detailRouter = require('./routes/detail')
const postsRouter = require('./routes/posts')

const { loadSchema } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { graphqlHTTP } = require('express-graphql')
const { addResolversToSchema } = require('@graphql-tools/schema')
const { effectCollection } = require('./db')
const { loadGraphql } = require('./graphql')

app.use(express.json());

app.use("/api/upload", uploadRouter);
app.use("/api/posts/:postId", detailRouter);
app.use("/api/posts", postsRouter);

loadGraphql(app)

app.listen(port, () => {
  console.log(`Effect Sever listening on port ${port}`)
})