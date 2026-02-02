const express = require('express');
const routes = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

routes.get('/', async (req, res, next) => {
  try {
    await booksController.getAllBooks(req, res);
  } catch (error) {
    next(error);
  }
});


routes.get('/:id', async (req, res, next) => {
  try {
    await booksController.getBookById(req, res);
  } catch (error) {
    next(error);
  }
});


routes.post(
  '/',
  validation.saveBook,
  async (req, res, next) => {
    try {
      await booksController.createBook(req, res);
    } catch (error) {
      next(error);
    }
  }
);


routes.put(
  '/:id',
  validation.saveBook,
  async (req, res, next) => {
    try {
      await booksController.updateBook(req, res);
    } catch (error) {
      next(error);
    }
  }
);


routes.delete('/:id', async (req, res, next) => {
  try {
    await booksController.deleteBook(req, res);
  } catch (error) {
    next(error);
  }
});
module.exports = routes;