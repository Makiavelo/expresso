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
          "allOf": [
            {
              "$ref": '#/definitions/ResponseModel'
            },
            {
              "properties": {
                "data": {
                  "type": "object",
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
                }
              }
            }
          ],
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
          "allOf": [
            {
              "$ref": '#/definitions/ResponseModel'
            },
            {
              "properties": {
                "data": {
                  "type": "object",
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
                }
              }
            }
          ],
          "required": [
            "userId",
            "title",
            "text",
            "tags"
          ],
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
        "ArticleSample": {
          "_id": "string",
          "userId": "string",
          "title": "string",
          "text": "string",
          "tags": ['string1', 'string2']
        },
        "ResponseModel": {
          "type": "object",
          "description": "Default API response",
          "required": [
            "status",
            "http_status",
            "message",
            "data"
          ],
          "properties": {
            "status": {
              "type": "string",
              "enum": ["ok", "error"],
              "default": "error"
            },
            "http_status": {
              "type": "integer",
              "default": 400
            },
            "message": {
              "type": "string",
              "default": "validation failed"
            },
            "data": {
              "type": "object"
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