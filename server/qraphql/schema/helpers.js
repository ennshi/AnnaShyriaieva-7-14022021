exports.extendUser = async (user) => {
  const channels = await user.getChannels();
  return { ...user.dataValues, channels };
};

exports.extendChannel = async (channel) => {
  const users = await channel.getUsers();
  return { ...channel.dataValues, users };
};
