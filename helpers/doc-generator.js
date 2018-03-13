const _ = require('lodash');
const config = require('config');
const package = require('../package.json');

module.exports =  {
  generateApiDocs: function(docs) {
    const doc = this.getMainInfo();
    doc.paths = this.getRoutersDocs(docs);

    return doc;
  },

  getMainInfo: function() {
    return {
      "swagger": "2.0",
      "info": {
        "version": package.version,
        "title": package.name,
        "description": package.description,
        "termsOfService": package.homepage,
        "contact": {
          "name": package.author
        },
        "license": {
          "name": package.license
        }
      },
      "host": config.get('app.host')+':'+config.get('app.port'),
      "basePath": "/api/v1",
      "schemes": [
        config.get('app.protocol')
      ],
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "securityDefinitions": {
        "APIKeyHeader": {
          "type": "apiKey",
          "in": "header",
          "name": "X-API-Key"
        }
      },
      "definitions": {
        "User": {
          "type": "object",
          "required": [
            "name",
            "avatar"
          ],
          "properties": {
            "_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "avatar": {
              "type": "string"
            }
          }
        },
        "UserBody": {
          "type": "object",
          "required": [
            "name",
            "avatar"
          ],
          "properties": {
            "name": {
              "type": "string"
            },
            "avatar": {
              "type": "string"
            }
          }
        },
        "Article": {
          "type": "object",
          "required": [
            "userId",
            "title",
            "text",
            "tags"
          ],
          "properties": {
            "_id": {
              "type": "string"
            },
            "userId": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "tags": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
          }
        },
        "ArticleBody": {
          "type": "object",
          "required": [
            "userId",
            "title",
            "text",
            "tags"
          ],
          "properties": {
            "userId": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "tags": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
          }
        },
        "ResponseModel": {
          "type": "object",
          "required": [
            "error",
            "code",
            "message"
          ],
          "properties": {
            "error": {
              "type": "boolean",
              "default": false
            },
            "code": {
              "type": "integer",
              "default": 200
            },
            "message": {
              "type": "string"
            }
          }
        }
      }
    };
  },

  getRoutersDocs: function(docs) {
    const paths = {};

    _.forEach(docs, (value) => {
        _.assign(paths,  value);
    });

    return paths;
  }
};