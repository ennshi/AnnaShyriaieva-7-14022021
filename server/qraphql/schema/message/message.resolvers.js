const Channel = require('../../../models/Channel');
const Message = require('../../../models/Message');
const { extendMessage } = require('../helpers');

const resolvers = {
  Query: {
    message: async (_, { id }) => {
      const message = await Message.findOne({ where: { id } });
      return await extendMessage(message);
    },
    messages: async (_, { input }) => {
      const filter = {
        where: input?.channelId ? { channel: input.channelId } : {},
        limit: input?.limit || 100,
        offset: input?.offset || 0,
      };
      const messages = await Message.findAndCountAll(filter);
      return {
        messages: messages.rows.map(async (m) => await extendMessage(m)),
        count: messages.count,
      };
    },
  },
  Mutation: {
    createMessage: async (_, { input }, req) => {
      if (!req.isAuth || !req.userId) {
        throw new Error('Authentication failed');
      }
      const { text, image, channelId, toMessageId } = input;
      const message = await Message.create({
        text,
        image: image || '',
      });
      await message.setUser(req.userId);

      const channelFound = await Channel.findByPk(channelId);
      if (!channelFound) throw new Error("Channel doesn't exist");
      await message.setChannel(channelId);

      if (toMessageId) {
        const messageFound = await Message.findByPk(toMessageId);
        if (!messageFound) throw new Error("Message doesn't exist");
        await message.setMessage(toMessageId);
      }
      return await extendMessage(message);
    },
    deleteMessage: async (_, { id }, req) => {
      if (!req.isAuth || !req.userId) {
        throw new Error('Authentication failed');
      }
      const message = await Message.findByPk(id);
      if (!message) {
        throw new Error('Message not found');
      }
      if (!req.isAdmin || req.userId !== message.from)
        throw new Error('Forbidden');
      await Message.destroy({
        where: { toMessage: id },
      });
      await message.destroy();
      return id;
    },
  },
};

module.exports = resolvers;
