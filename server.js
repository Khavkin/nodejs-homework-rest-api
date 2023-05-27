const app = require('./app');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('dotenv').config();

const uriDb = process.env.DB;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(err => {
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  });
