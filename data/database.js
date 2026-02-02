const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    return callback(null, database);
  }

  const url = process.env.MONGODB_URL;
  if (!url) {
    return callback(new Error('MONGODB_URL is not set'));
  }

  MongoClient.connect(url)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => callback(err));
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
