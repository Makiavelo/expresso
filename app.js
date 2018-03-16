const express = require('express');

const articleRoutes = require('./api/articles/routes');
const userRoutes = require('./api/users/routes');
const auth = require('./api/middleware/security/auth-controller');
const errors = require('./api/middleware/handlers/errors-controller');

const app = express();

//Middleware
app.use('/api', (req, res, next) => auth.check(req, res, next));
app.use(express.json());
app.use(express.urlencoded());

//load API routes
app.use('/api/v1/article', articleRoutes.router);
app.use('/api/v1/user', userRoutes.router);

//load api swagger docs if not on prod
if(process.env.NODE_ENV !== "production") {
  const swaggerUi = require('swagger-ui-express');
  const docGen = require('./helpers/doc-generator');
  const swaggerDocument = docGen.generateApiDocs([articleRoutes.docs, userRoutes.docs]);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

//Middleware for error handling
app.use((req, res, next) => errors.notFound(req, res, next));
app.use((req, res, next) => errors.handler(req, res, next));

module.exports = app;
