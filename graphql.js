const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader")
const { loadSchema } = require("@graphql-tools/load")
const { addResolversToSchema } = require("@graphql-tools/schema")
const { graphqlHTTP } = require("express-graphql")
const { effectCollection } = require("./db")

const resolvers =
  {
    Query: {
      effectById: async (root, args) => {
        const { id: postId } = args
        const effect = await effectCollection.findOne({ postId })

        return effect
      }
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