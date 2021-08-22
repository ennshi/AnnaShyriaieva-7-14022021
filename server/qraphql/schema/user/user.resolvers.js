const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');
const Channel = require('../../../models/Channel');
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
    currentUser: async (_, __, req) => {
      if (!req.isAuth || !req.userId) {
        throw new Error('Authentication failed');
      }
      const currentUser = await User.findByPk(req.userId);
      if (!currentUser) throw new Error("User doesn't exist");
      console.log(currentUser);
      return await extendUser(currentUser);
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
        { expiresIn: '24h' },
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
      //to create general channel
      let generalChannel = await Channel.findOne({
        where: { name: 'general' },
      });
      if (!generalChannel) {
        generalChannel = await Channel.create({
          name: 'general',
        });
      }
      await generalChannel.addUser(createdUser.id);
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
