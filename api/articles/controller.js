'use strict';

exports.search = (req, res) => {
  res.json({hi:"world"});
};

exports.create = (req, res) => {
  //req.body
  res.json({});
};

exports.edit = (req, res) => {
  //req.params.taskId, req.body
  res.json({});
};

exports.delete = (req, res) => {
  //_id: req.params.id
  res.json({});
};

exports.apiDoc = {
  "/pets": {
    "get": {
      "description": "Returns all pets from the system that the user has access to",
      "operationId": "findPets",
      "produces": [
        "application/json",
        "application/xml",
        "text/xml",
        "text/html"
      ],
      "parameters": [
        {
          "name": "tags",
          "in": "query",
          "description": "tags to filter by",
          "required": false,
          "type": "array",
          "items": {
            "type": "string"
          },
          "collectionFormat": "csv"
        },
        {
          "name": "limit",
          "in": "query",
          "description": "maximum number of results to return",
          "required": false,
          "type": "integer",
          "format": "int32"
        }
      ],
      "responses": {
        "200": {
          "description": "pet response",
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/Pet"
            }
          }
        },
        "default": {
          "description": "unexpected error",
          "schema": {
            "$ref": "#/definitions/ErrorModel"
          }
        }
      }
    }
  }
};
