const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
        author: 'required|string',
        email: 'required|string',
        favoriteColor: 'string',
        birthday:'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const saveStudent = (req, res, next) => {
  const validationRule = {
   firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|string',
        favoriteColor: 'string',
        birthday:'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};
module.exports = {
  saveBook,
  saveStudent
};