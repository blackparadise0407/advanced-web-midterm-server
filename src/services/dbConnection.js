const mongoose = require('mongoose')

module.exports = (db) => {
  const connect = () => {
    mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
      .then(() => console.log('Connected to database'))
      .catch(err => {
        console.log('Error connect to database, error: ', err)
        process.exit(1)
      })
  }
  connect()
  mongoose.connection.on('disconnected', connect)
}