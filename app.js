const express = require('express');

const articleRoutes = require('./api/articles/routes');
const userRoutes = require('./api/users/routes');

const app = express();

app.use('/article', articleRoutes);
//app.use('/users', userRoutes);

// catch 404 and forward to error handler
/*app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
/*app.use((err, req, res, next) => {
  // render the error page
  console.log('ERROR HANDLLER');
  res.status(err.status || 500);
  res.json(err);
});*/

module.exports = app;
