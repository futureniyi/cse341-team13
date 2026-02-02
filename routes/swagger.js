const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res, next) => {
  const doc = JSON.parse(JSON.stringify(swaggerDocument));
  doc.host = req.get('host');
  doc.schemes = [req.protocol];
  return swaggerUi.setup(doc)(req, res, next);
});

module.exports = router;
