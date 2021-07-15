const express = require('express');
const sequelize = require('./utils/database');
const { graphqlHTTP } = require('express-graphql');
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
  graphqlHTTP({
    schema: schema,
    graphiql: {
      defaultQuery: require('./default-query'),
      headerEditorEnabled: true,
    },
  }),
);

User.hasMany(Channel, { as: 'channels', constraints: false });
Channel.hasMany(User, { as: 'users', constraints: false });
Message.belongsTo(Message, { foreignKey: 'toMessage', constraints: false });
Message.belongsTo(Channel, { foreignKey: 'channelId', constraints: false });
Message.belongsTo(User, { foreignKey: 'from', constraints: false });

sequelize.sync({ force: true }).then(() => {
  //console.log(result);
  app.listen(port, () => {
    console.log('Server is up');
  });
});
