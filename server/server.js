const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
require('dotenv').config('./.env');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../client/')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('*', (req, res) => {
  return res.status(404).json('Not Found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'An error occurred',
  };
  const error = { ...defaultErr, ...err };
  return res.status(error.status).json(error.message);
});

app.listen(PORT, () => {
  `listening on ${PORT}`;
});
