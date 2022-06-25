const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader")
const { loadSchema } = require("@graphql-tools/load")
const { addResolversToSchema } = require("@graphql-tools/schema")
const { graphqlHTTP } = require("express-graphql")
const { effectCollection } = require("./db")
const { effectMapper } = require("./mapper")

const resolvers =
  {
    Query: {
      effectById: async (root, args) => {
        const { id: postId } = args
        const effect = await effectCollection.findOne({ postId })

        return effectMapper.map(effect)
      },
      effectsByCategoryId: async (root, args) => {
        const { category } = args
        const effects = await effectCollection.find({ category }).toArray()

        return effectMapper.mapList(effects)
      },
      effectsByPostIds: async (root, args) => {
        const { postIds } = args
        const effects = await effectCollection.find({ postId: { $in: postIds.split(",") } }).toArray()

        return effectMapper.mapList(effects)
      },
      effectsByCreatorId: async (root, args) => {
        const { creatorId } = args
        const effects = await effectCollection.find({ creatorId }).toArray()

        return effectMapper.mapList(effects)
      },
    }
  }
  
exports.loadGraphql = (app) => {
  loadSchema('./schema/schema.graphqls', {
    loaders: [new GraphQLFileLoader()]
  }).then(schema => {
    

    const schemaWithResolvers = addResolversToSchema({
      schema, resolvers
    })

    app.use('/graphql', graphqlHTTP({
      schema: schemaWithResolvers,
      graphiql: true,
    }))
  })
}