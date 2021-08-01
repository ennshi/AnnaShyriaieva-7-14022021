const express = require('express');
const sequelize = require('./utils/database');
const { graphqlHTTP } = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const schema = require('./qraphql/schema');
const User = require('./models/User');
const Message = require('./models/Message');
const Channel = require('./models/Channel');
const isAuth = require('./middlewares/auth');

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(isAuth);

app.use(
  '/api',
  graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 1 }),
  graphqlHTTP({
    schema: schema,
    graphiql: {
      defaultQuery: require('./default-query'),
      headerEditorEnabled: true,
    },
  }),
);

User.belongsToMany(Channel, {
  as: 'channels',
  through: 'user_channel',
  constraints: false,
});
Channel.belongsToMany(User, {
  as: 'users',
  through: 'user_channel',
  constraints: false,
});
Message.belongsTo(Message, { foreignKey: 'toMessage', constraints: false });
Message.belongsTo(Channel, { foreignKey: 'channel', constraints: false });
Message.belongsTo(User, { foreignKey: 'from', constraints: false });

sequelize.sync().then(() => {
  //console.log(result);
  app.listen(port, () => {
    console.log('Server is up');
  });
});
