const express = require('express');

const mongoose = require('mongoose');

const router = require('./routes/router');

const errorHandler = require('./middlewares/errorHandler');
const defaultErrorNotFound = require('./middlewares/defaultErrorNotFound');

const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', router);
app.use(errors());

app.use('*', defaultErrorNotFound);

app.use(errorHandler);

app.listen(PORT);
