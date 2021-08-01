const gql = require('graphql-tag');

const typeDefs = gql`
  scalar Upload
  extend type Query {
    messages(input: GetMessagesInput): GetMessagesResponse
    message(id: ID!): Message
    responses(input: GetResponsesInput): GetMessagesResponse
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
    responses: [ID!]!
    channel: Channel
  }
  input CreateMessageInput {
    text: String!
    image: Upload
    toMessageId: ID
    channelId: ID!
  }
  input GetMessagesInput {
    channelId: ID
    offset: Int
    limit: Int
  }
  type GetMessagesResponse {
    messages: [Message!]
    count: Int
  }
  input GetResponsesInput {
    id: ID!
    offset: Int
    limit: Int
  }
`;

module.exports = typeDefs;
