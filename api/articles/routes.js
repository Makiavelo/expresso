'use strict';
const express = require('express')
const router = express.Router()
const controller = require('./controller');

router.post('/', controller.create);
router.get('/search', controller.search);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

//Define api docs
let apiDoc = {};
if(process.env.NODE_ENV !== "production") {
  apiDoc = {
    "/articles": {
      "post": {
        "description": "Creates a new article",
        "operationId": "createArticle",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "article",
            "in": "body",
            "description": "The article",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Article"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Article created succesfully",
            "schema": {
              "$ref": "#/definitions/Article"
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/ResponseModel"
            }
          }
        }
      }
    },
    "/articles/{id}": {
      "put": {
        "description": "Updates an article",
        "operationId": "updateArticle",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Article id",
            "required": true,
            "type": "string"
          },
          {
            "name": "article",
            "in": "body",
            "description": "The updated article contents",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Article"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Article created succesfully",
            "schema": {
              "$ref": "#/definitions/Article"
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/ResponseModel"
            }
          }
        }
      },
      "delete": {
        "description": "Deletes an article",
        "operationId": "deleteArticle",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Article id",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Article deleted successfully",
            "schema": {
              "$ref": "#/definitions/ResponseModel"
            }
          },
          "default": {
            "description": "unexpected error",
            "schema": {
              "$ref": "#/definitions/ResponseModel"
            }
          }
        }
      }
    }
  };
}

module.exports = { "router": router, "docs": apiDoc };