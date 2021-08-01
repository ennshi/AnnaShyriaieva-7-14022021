const fs = require('fs');
const path = require('path');
const Channel = require('../../models/Channel');
const User = require('../../models/User');

exports.extendUser = async (user) => {
  if (!user) return null;
  const channels = await user.getChannels();
  return { ...user.dataValues, channels };
};

exports.extendChannel = async (channel) => {
  if (!channel) return null;
  const users = await channel.getUsers();
  return { ...channel.dataValues, users };
};

exports.extendMessage = async (message) => {
  if (!message) return null;
  const channel = await Channel.findByPk(message?.dataValues?.channel);
  const user = await User.findByPk(message?.dataValues?.from);
  return { ...message.dataValues, channel, from: user };
};

exports.clearImage = (filePath) => {
  fs.unlink(
    path.join(
      __dirname,
      '..',
      '..',
      filePath.replace('http://localhost:3000', ''),
    ),
    (err) => {
      console.log(err);
    },
  );
};
