const express = require('express');
const routes = express.Router();

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');
const { validateObjectId, ensureDocExists } = require('../middleware/idCheck');


routes.get('/', async (req, res, next) => {
  try {
    await studentsController.getAllStudents(req, res);
  } catch (error) {
    next(error);
  }
});


routes.get('/:id', validateObjectId(), ensureDocExists('students'), async (req, res, next) => {
  try {
    await studentsController.getStudentById(req, res);
  } catch (error) {
    next(error);
  }
});


routes.post(
  '/',
  isAuthenticated,
  validation.saveStudent,
  async (req, res, next) => {
    try {
      await studentsController.createStudent(req, res);
    } catch (error) {
      next(error);
    }
  }
);


routes.put(
  '/:id',
  validateObjectId(),
  ensureDocExists('students'),
  isAuthenticated,
  validation.saveStudent,
  async (req, res, next) => {
    try {
      await studentsController.updateStudent(req, res);
    } catch (error) {
      next(error);
    }
  }
);

routes.delete(
  '/:id',
  validateObjectId(),
  ensureDocExists('students'),
  isAuthenticated,
  async (req, res, next) => {
    try {
      await studentsController.deleteStudent(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
