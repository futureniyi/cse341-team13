const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllBooks = async (req, res) => {
    //#swagger.tags = ['Books']
    const result = await mongodb.getDatabase().db().collection('books').find();
    result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const getBookById = async (req, res) => {
    //#swagger.tags = ['Books']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .findOne({ _id: userId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createBook = async (req, res) => {
    //#swagger.tags = ['Books']  
    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        category: req.body.category,
        publicationYear: req.body.publicationYear,
        totalCopies: req.body.totalCopies,
        availableCopies: req.body.availableCopies,
        shelfLocation: req.body.shelfLocation
    };

    const result = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .insertOne(book);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(400).json({ message: 'Could not create book.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const updateBook = async (req, res) => {
    //#swagger.tags = ['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid book ID to update book' });
    }
    const book_id = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        category: req.body.category,
        publicationYear: req.body.publicationYear,
        totalCopies: req.body.totalCopies,
        availableCopies: req.body.availableCopies,
        shelfLocation: req.body.shelfLocation
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .replaceOne({ _id: book_id }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
}

const deleteBook = async (req, res) => {
    //#swagger.tags = ['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid book ID to delete book' });
    }
    const book_id = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .deleteOne({ _id: book_id });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
