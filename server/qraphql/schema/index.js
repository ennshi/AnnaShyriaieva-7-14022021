const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const userSchema = require('./user');
const channelSchema = require('./channel');
const messageSchema = require('./message');

// Multiple files to keep your project modularised
const schema = makeExecutableSchema({
  typeDefs: [
    userSchema.typeDefs, // First defines the type Query
    channelSchema.typeDefs, // Others extends type Query
    messageSchema.typeDefs,
  ],
  resolvers: merge(
    userSchema.resolvers,
    channelSchema.resolvers,
    messageSchema.resolvers,
  ),
});

module.exports = schema;
