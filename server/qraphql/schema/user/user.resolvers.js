//const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    login: async (_, { input }) => {
      const { username, password } = input;
      console.log(username, password);
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { username } = input;
      console.log(username);
    },
  },
};

module.exports = resolvers;
