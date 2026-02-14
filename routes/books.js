const express = require('express');
const routes = express.Router();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');
const { validateObjectId, ensureDocExists } = require('../middleware/idCheck');

routes.get('/', async (req, res, next) => {
  try {
    await booksController.getAllBooks(req, res);
  } catch (error) {
    next(error);
  }
});


routes.get('/:id', validateObjectId(), ensureDocExists('books'), async (req, res, next) => {
  try {
    await booksController.getBookById(req, res);
  } catch (error) {
    next(error);
  }
});


routes.post(
  '/', isAuthenticated,
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
  '/:id', validateObjectId(), ensureDocExists('books'), isAuthenticated,
  validation.saveBook,
  async (req, res, next) => {
    try {
      await booksController.updateBook(req, res);
    } catch (error) {
      next(error);
    }
  }
);


routes.delete('/:id', validateObjectId(), ensureDocExists('books'), isAuthenticated,
  async (req, res, next) => {
    try {
      await booksController.deleteBook(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
