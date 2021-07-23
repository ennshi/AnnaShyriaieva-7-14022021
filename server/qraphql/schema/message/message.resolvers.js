const Message = require('../../../models/Message');

const resolvers = {
  Query: {
    message: async (_, { id }) => {
      const message = await Message.findOne({ where: { id } });
      return message;
    },
    messages: async (_, { channelId }) => {
      const filter = channelId ? { where: { channel: channelId } } : {};
      const messages = await Message.findAll(filter);
      return messages;
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
      await message.setChannel(channelId);
      if (toMessageId) {
        await message.setMessage(toMessageId);
      }
      return message;
    },
    deleteMessage: async (_, { id }, req) => {
      if (!req.isAuth || !req.userId) {
        throw new Error('Authentication failed');
      }
      const message = await Message.findByPk(id);
      if (!message) {
        throw new Error('Message not found');
      }
      await message.destroy();
      return id;
    },
  },
};

module.exports = resolvers;
