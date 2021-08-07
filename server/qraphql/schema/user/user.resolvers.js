const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');
const { extendUser } = require('../helpers');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const user = await User.findOne({ where: { id } });
      return await extendUser(user);
    },
    users: async () => {
      const users = await User.findAll();
      return users.map(async (u) => await extendUser(u));
    },
    login: async (_, { input }) => {
      const { username, password } = input;
      const userFound = await User.findOne({ where: { username } });
      if (!userFound) throw new Error("User doesn't exist");
      const isAuthenticated = await bcrypt.compare(
        password,
        userFound.password,
      );
      if (!isAuthenticated) throw new Error('Authentication failed');
      return jwt.sign(
        {
          id: userFound.id,
          username: userFound.username,
          isAdmin: userFound.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' },
      );
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { username, firstName, lastName, password, isAdmin, email } = input;
      const userFound = await User.findOne({ where: { username } });
      if (userFound) throw new Error('User already exists');
      const hashedPassword = await bcrypt.hash(password, 12);
      const createdUser = await User.create({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin,
      });
      return await extendUser(createdUser);
    },
    deleteUser: async (_, { id }, req) => {
      if (!req.isAuth || !req.userId || !req.isAdmin) {
        throw new Error('Authentication failed');
      }
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return id;
    },
  },
};

module.exports = resolvers;
