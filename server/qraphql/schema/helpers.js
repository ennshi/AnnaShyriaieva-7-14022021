const Channel = require('../../models/Channel');
const User = require('../../models/User');

exports.extendUser = async (user) => {
  const channels = await user.getChannels();
  return { ...user.dataValues, channels };
};

exports.extendChannel = async (channel) => {
  const users = await channel.getUsers();
  return { ...channel.dataValues, users };
};

exports.extendMessage = async (message) => {
  const channel = await Channel.findByPk(message?.dataValues?.channel);
  const user = await User.findByPk(message?.dataValues?.from);
  return { ...message.dataValues, channel, from: user };
};
