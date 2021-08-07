const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    login(input: UserLogin!): String
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    createUser(input: CreateUserInput): User
    deleteUser(id: ID!): String
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    isAdmin: Boolean!
    channels: [Channel]
  }
  input UserLogin {
    username: String!
    password: String!
  }
  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    isAdmin: Boolean!
  }
`;

module.exports = typeDefs;
