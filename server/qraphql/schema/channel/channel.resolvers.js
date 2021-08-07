const Channel = require('../../../models/Channel');
const Message = require('../../../models/Message');
const User = require('../../../models/User');
const { extendChannel } = require('../helpers');

const resolvers = {
  Query: {
    channel: async (_, { id }) => {
      const channel = await Channel.findOne({ where: { id } });
      return await extendChannel(channel);
    },
    channels: async (_, __, req) => {
      if (!req.isAuth || !req.userId || !req.isAdmin) {
        throw new Error('Authentication failed');
      }
      const user = await User.findByPk(req.userId);
      const channels = await user.getChannels();
      return channels.map(async (c) => await extendChannel(c));
    },
  },
  Mutation: {
    createChannel: async (_, { input }, req) => {
      if (!req.isAuth || !req.userId || !req.isAdmin) {
        throw new Error('Authentication failed');
      }
      const { name, users } = input;
      const channelFound = await Channel.findOne({ where: { name } });
      if (channelFound) throw new Error('Channel already exists');
      const channel = await Channel.create({
        name,
      });
      await channel.addUsers(users);
      return await extendChannel(channel);
    },
    deleteChannel: async (_, { id }, req) => {
      if (!req.isAuth || !req.userId || !req.isAdmin) {
        throw new Error('Authentication failed');
      }
      const channel = await Channel.findByPk(id);
      if (!channel) {
        throw new Error('Channel not found');
      }
      await Message.destroy({ where: { channel: id } });
      await channel.destroy();
      return id;
    },
  },
};

module.exports = resolvers;
