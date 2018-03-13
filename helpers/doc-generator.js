const _ = require('lodash');

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
        "version": "1.0.0",
        "title": "Swagger Petstore",
        "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
          "name": "Swagger API Team"
        },
        "license": {
          "name": "MIT"
        }
      },
      "host": "petstore.swagger.io",
      "basePath": "/api",
      "schemes": [
        "http"
      ],
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "definitions": {
        "Pet": {
          "type": "object",
          "allOf": [
            {
              "$ref": "#/definitions/NewPet"
            },
            {
              "required": [
                "id"
              ],
              "properties": {
                "id": {
                  "type": "integer",
                  "format": "int64"
                }
              }
            }
          ]
        },
        "NewPet": {
          "type": "object",
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string"
            },
            "tag": {
              "type": "string"
            }
          }
        },
        "ErrorModel": {
          "type": "object",
          "required": [
            "code",
            "message"
          ],
          "properties": {
            "code": {
              "type": "integer",
              "format": "int32"
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