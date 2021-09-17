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

const isTooShort = (fieldName, text, minChars) =>
  !text || text.trim().length < minChars ? `${fieldName} is too short` : '';

const isTooLong = (fieldName, text, maxChars) =>
  text && text.trim().length > maxChars ? `${fieldName} is too long` : '';

const emailInvalid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) ? ' ' : 'Email is incorrect';
};

exports.validateUser = ({ username, firstName, lastName, email }) => {
  return [
    isTooShort('Username', username, 3),
    isTooShort('First name', firstName, 2),
    isTooShort('Last name', lastName, 2),
    isTooLong('Username', username, 15),
    isTooLong('First name', firstName, 30),
    isTooLong('Last name', lastName, 30),
    emailInvalid(email),
  ].filter(Boolean);
};
