const express = require('express');
const { Client } = require('pg');

const port = process.env.PORT;
const app = express();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => 
    app.listen(port, () => {
      console.log('Server is up');
  }))
  .catch(e => console.log('server err', e));

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });