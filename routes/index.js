const router = require('express').Router();

router.get('/', (req, res) => {
    // swagger.tags = ['Home']
  res.send('Welcome to the Home Page!');
});

router.use('/books', require('./books'));
router.use('/students', require('./students'));
router.use('/schools', require('./schools'));
router.use('/', require('./swagger'));

module.exports = router;