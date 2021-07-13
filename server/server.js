const express = require('express');
const sequelize = require('./utils/database');
const { graphqlHTTP } = require('express-graphql');
const { buildScema } = require('graphql');
const User = require('./models/User');
const Message = require('./models/Message');
const Channel = require('./models/Channel');

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(
  '/api',
  graphqlHTTP({
    schema: null,
    rootValue: {},
  }),
);
User.hasMany(Channel, { as: 'channels', constraints: false });
Channel.hasMany(User, { as: 'users', constraints: false });
Message.belongsTo(Message, { foreignKey: 'toMessage', constraints: false });
Message.belongsTo(Channel, { foreignKey: 'channelId', constraints: false });
Message.belongsTo(User, { foreignKey: 'from', constraints: false });

sequelize.sync().then((result) => {
  //console.log(result);
  app.listen(port, () => {
    console.log('Server is up');
  });
});
