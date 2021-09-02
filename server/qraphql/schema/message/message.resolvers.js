const fs = require('fs');
const { GraphQLUpload } = require('graphql-upload');
const { nanoid } = require('nanoid');

const Channel = require('../../../models/Channel');
const Message = require('../../../models/Message');
const { extendMessage, clearImage } = require('../helpers');

const storeFS = ({ stream, filename }) => {
  const uploadDir = 'img';
  const path = `${uploadDir}/${nanoid()}.${filename.split('.')[1]}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', (error) => {
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve({ path })),
  );
};

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    message: async (_, { id }) => {
      const message = await Message.findByPk(id);
      return await extendMessage(message);
    },
    messages: async (_, { input }) => {
      const filter = {
        where: input?.channelId
          ? { channel: input.channelId, toMessage: null }
          : { toMessage: null },
        order: [['updatedAt']],
        limit: input?.limit || 20,
        offset: input?.offset || 0,
      };
      const messages = await Message.findAndCountAll(filter);
      return {
        messages: messages.rows.map(async (m) => await extendMessage(m)),
        count: messages.count,
      };
    },
    responses: async (_, { input }) => {
      const messageFound = await Message.findByPk(input.id);
      if (!messageFound) throw new Error("Message doesn't exist");
      const filter = {
        where: { id: messageFound.responses },
        order: [['updatedAt']],
        limit: input?.limit || 10,
        offset: input?.offset || 0,
      };
      let messages = await Message.findAndCountAll(filter);
      if (!messages.rows) {
        messages = { ...messages, rows: [] };
      }
      messages.rows.unshift(messageFound);
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
      const { text, channelId, toMessageId, image } = input;
      let fileLocation;
      if (image) {
        const { filename, createReadStream } = await image;
        const stream = createReadStream();
        const pathObj = await storeFS({ stream, filename });
        fileLocation = `${req.protocol}://${req.get('host')}/${pathObj.path
          .replace(/\\/g, '/')
          .replace('img/', '')}`;
        console.log(fileLocation);
      }
      const message = await Message.create({
        text,
        image: fileLocation || '',
      });
      await message.setUser(req.userId);

      const channelFound = await Channel.findByPk(channelId);
      if (!channelFound) throw new Error("Channel doesn't exist");
      await message.setChannel(channelId);

      let parentMessage;
      if (toMessageId) {
        parentMessage = await Message.findByPk(toMessageId);
        if (!parentMessage) throw new Error("Message doesn't exist");
        await message.setMessage(toMessageId);
      }
      const newMessage = await extendMessage(message);
      if (parentMessage) {
        parentMessage.responses = parentMessage.responses.length
          ? [...parentMessage.responses, newMessage.id]
          : [newMessage.id];
        await parentMessage.save();
      }
      return newMessage;
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
      if (message.image) clearImage(message.image);
      if (message.toMessage) {
        const parentMessage = await Message.findByPk(message.toMessage);
        if (parentMessage) {
          parentMessage.responses = parentMessage.responses.filter(
            (rId) => +rId !== +id,
          );
          await parentMessage.save();
        }
      }
      if (message.responses.length) {
        await Message.destroy({ where: { id: message.responses } });
      }
      await message.destroy();
      return id;
    },
  },
};

module.exports = resolvers;
