const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

function toObjectId(id) {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}

function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

const getAllLoans = async (req, res, next) => {
  try {
    const loans = await mongodb
      .getDatabase()
      .db()
      .collection('loans')
      .find()
      .toArray();

    res.status(200).json(loans);
  } catch (err) {
    next(err);
  }
};

const getLoanById = async (req, res, next) => {
  try {
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid loan id' });

    const loan = await mongodb
      .getDatabase()
      .db()
      .collection('loans')
      .findOne({ _id: id });

    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    res.status(200).json(loan);
  } catch (err) {
    next(err);
  }
};

const createLoan = async (req, res, next) => {
  try {
    // Keep your current field names to avoid breaking existing data
    const studentId = req.body.studentId;
    const bookId = req.body.bookId;

    if (!studentId || !bookId) {
      return res.status(400).json({ error: 'studentId and bookId are required' });
    }

    const loan = {
      studentId, // keep as string if your DB stores strings; change to ObjectId if your team uses ObjectId refs
      bookId,
      loanDate: toDate(req.body.loanDate) ?? new Date(),
      dueDate: toDate(req.body.dueDate),
      returnDate: toDate(req.body.returnDate),
      status: req.body.status ?? 'checked_out',
      createdAt: new Date()
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('loans')
      .insertOne(loan);

    // 201 + inserted id is clean and easy to test
    res.status(201).json({ insertedId: result.insertedId, loan });
  } catch (err) {
    next(err);
  }
};

const updateLoan = async (req, res, next) => {
  try {
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid loan id' });

    const update = {
      studentId: req.body.studentId,
      bookId: req.body.bookId,
      loanDate: toDate(req.body.loanDate),
      dueDate: toDate(req.body.dueDate),
      returnDate: toDate(req.body.returnDate),
      status: req.body.status
    };

    // remove undefined keys (so you can PATCH-like send partial body if you want)
    Object.keys(update).forEach((k) => update[k] === undefined && delete update[k]);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('loans')
      .updateOne({ _id: id }, { $set: update });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteLoan = async (req, res, next) => {
  try {
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid loan id' });

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('loans')
      .deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan
};
