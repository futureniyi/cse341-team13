const express = require('express');
const routes = express.Router();

const schoolsController = require('../controllers/schools');
const validation = require('../middleware/validate');


routes.get('/', async (req, res, next) => {
  try {
    await schoolsController.getAllSchools(req, res);
  } catch (error) {
    next(error);
  }
});


routes.get('/:id', async (req, res, next) => {
  try {
    await schoolsController.getSchoolById(req, res);
  } catch (error) {
    next(error);
  }
});


routes.post(
  '/',
  validation.saveSchool,
  async (req, res, next) => {
    try {
      await schoolsController.createSchool(req, res);
    } catch (error) {
      next(error);
    }
  }
);


routes.put(
  '/:id',
  validation.saveSchool,
  async (req, res, next) => {
    try {
      await schoolsController.updateSchool(req, res);
    } catch (error) {
      next(error);
    }
  }
);

routes.delete('/:id', async (req, res, next) => {
  try {
    await schoolsController.deleteSchool(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
