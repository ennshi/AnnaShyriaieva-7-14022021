const gql = require('graphql-tag');

const typeDefs = gql`
  extend type Query {
    messages(channelId: ID): [Message]
    message(id: ID!): Message
  }
  extend type Mutation {
    createMessage(input: CreateMessageInput): Message
    deleteMessage(id: ID!): String
  }
  type Message {
    id: ID!
    text: String!
    image: String
    from: User
    toMessage: Message
    channel: Channel
  }
  input CreateMessageInput {
    text: String!
    image: String
    toMessageId: String
    channelId: ID!
  }
`;

module.exports = typeDefs;
