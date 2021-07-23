const gql = require('graphql-tag');

const typeDefs = gql`
  extend type Query {
    messages(input: GetMessagesInput): GetMessagesResponse
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
    toMessage: ID
    channel: Channel
  }
  input CreateMessageInput {
    text: String!
    image: String
    toMessageId: String
    channelId: ID!
  }
  input GetMessagesInput {
    channelId: ID
    offset: Int
    limit: Int
  }
  type GetMessagesResponse {
    messages: [Message]
    count: Int
  }
`;

module.exports = typeDefs;
