const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await User.findOne({ where: { id } });
    },
    users: async () => {
      return await User.findAll();
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
        { id: userFound.id, username: userFound.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' },
      );
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { username, firstName, lastName, password, isAdmin } = input;
      const userFound = await User.findOne({ where: { username } });
      if (userFound) throw new Error('User already exists');
      const hashedPassword = await bcrypt.hash(password, 12);
      return await User.create({
        username,
        firstName,
        lastName,
        password: hashedPassword,
        isAdmin,
      });
    },
    deleteUser: async (_, { id }, req) => {
      if (!req.isAuth || !req.userId) {
        throw new Error('Authentication failed');
      }
      const admin = await User.findByPk(req.userId);
      if (!admin.isAdmin) {
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
