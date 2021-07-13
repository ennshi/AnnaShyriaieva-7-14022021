const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Channel = sequelize.define(
  'Channel',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {},
);

module.exports = Channel;
