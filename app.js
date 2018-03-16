const express = require('express');

const articleRoutes = require('./api/articles/routes');
const userRoutes = require('./api/users/routes');

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded());

//load API routes
app.use('/api/v1/article', articleRoutes.router);
app.use('/api/v1/user', userRoutes.router);

//load api swagger docs
if(process.env.NODE_ENV !== "production") {
  const swaggerUi = require('swagger-ui-express');
  const docGen = require('./helpers/doc-generator');
  const swaggerDocument = docGen.generateApiDocs([articleRoutes.docs, userRoutes.docs]);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}



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
