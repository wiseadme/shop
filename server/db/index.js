const mongoose = require('mongoose')
const keys = require('../keys')

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})

mongoose.connection
  .on('error', err => console.error(err))
  .on('close', () => console.log('MongoDB connection is closed'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log("connected to mongo");
    console.log(info);
  })

module.exports = mongoose