// middleware/idCheck.js
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const validateObjectId = (paramName = 'id') => (req, res, next) => {
  const value = req.params[paramName];
  if (!ObjectId.isValid(value)) {
    return res.status(400).json({ error: 'Invalid id format' });
  }
  next();
};

const ensureDocExists = (collectionName, paramName = 'id') => async (req, res, next) => {
  try {
    const value = req.params[paramName];

    const dbName = process.env.MONGODB_DB;
    const client = mongodb.getDatabase();
    const db = dbName ? client.db(dbName) : client.db();

    const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(value) });

    if (!doc) {
      return res.status(404).json({ error: 'Not found' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { validateObjectId, ensureDocExists };
