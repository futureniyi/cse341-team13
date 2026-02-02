const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server Error' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
