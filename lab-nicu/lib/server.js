'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
let server;


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const serverCotroller = module.exports = {};

app.use(require('../route/burger-router.js'));
app.use(require('./error-route-handler.js'));

serverCotroller.start = () => {
  return new Promise(resolve => {
    server = app.listen(process.env.PORT, () => {
      console.log('listening in ', process.env.PORT);
      server.isOn = true;
      resolve();
    });
  });
};

serverCotroller.stop = () => {
  return new Promise(resolve => {
    server.close(() => {
      console.log('server is shutting down');
      server.isOn = false;
      resolve();
    });

  });
};