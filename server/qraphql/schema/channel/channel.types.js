const gql = require('graphql-tag');

const typeDefs = gql`
  extend type Query {
    channels: [Channel]
    channel(id: ID!): Channel
  }
  extend type Mutation {
    createChannel(input: CreateChannelInput): Channel
    deleteChannel(id: ID!): String
  }
  type Channel {
    id: ID!
    name: String!
    users: [User!]
  }
  input CreateChannelInput {
    name: String!
    users: [ID]!
  }
`;

module.exports = typeDefs;
