const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();
const logger = require('morgan');
const cors = require('cors');
const corsOptions = require('../config/cors');

const root = require('../routers');

/** Middleware */
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', root);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
