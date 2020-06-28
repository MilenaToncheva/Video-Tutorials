const mongoose = require('mongoose');
const env = process.env.NODE_ENV;
const config = require('./config')[env];
const connectionString = "***** Database is set up and running! *****"

module.exports = () => {
  return  mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(connectionString);
    })
}