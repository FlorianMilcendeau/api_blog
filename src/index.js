const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();
const logger = require('morgan');

/** Middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { User } = require('../db/models');

app.get('/', async (req, res) => {
  try {
    users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
