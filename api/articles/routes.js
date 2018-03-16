'use strict';
const express = require('express')
const router = express.Router()
const controller = require('./controller');
const config = require('config');

router.post  ('/',       (req, res, next) => controller.create(req, res, next));
router.put   ('/:id',    (req, res, next) => controller.edit(req, res, next));
router.delete('/:id',    (req, res, next) => controller.delete(req, res, next));
router.get   ('/search', (req, res, next) => controller.search(req, res, next));

//Define api docs
let apiDoc = {};
let sample = {
  "_id": "string",
  "userId": "string",
  "title": "string",
  "text": "string",
  "tags": ['string1', 'string2']
};
if(process.env.NODE_ENV !== "production") {
  apiDoc = {
    "/article": {
      "post": {
        "description": "Creates a new article",
        "operationId": "createArticle",
        "tags": ["article"],
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
              "$ref": "#/definitions/ArticleBody"
            }
          },
          {
            "name": "X-API-Key",
            "in": "header",
            "description": "the access token",
            "required": true,
            "default": config.get('app.security.token')
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
    "/article/{id}": {
      "put": {
        "description": "Updates an article",
        "operationId": "updateArticle",
        "tags": ["article"],
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
              "$ref": "#/definitions/ArticleBody"
            }
          },
          {
            "name": "X-API-Key",
            "in": "header",
            "description": "the access token",
            "required": true,
            "default": config.get('app.security.token')
          }
        ],
        "responses": {
          "200": {
            "description": "Article updated successfully",
            "schema": {
              "$ref": "#/definitions/Article"
            },
            "examples": {
              "response": {
                "status": "ok",
                "http_status": "200",
                "message": "success",
                "data": sample
              }
            }
          }
        }
      },
      "delete": {
        "description": "Deletes an article",
        "operationId": "deleteArticle",
        "tags": ["article"],
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
            "name": "X-API-Key",
            "in": "header",
            "description": "the access token",
            "required": true,
            "default": config.get('app.security.token')
          }
        ],
        "responses": {
          "200": {
            "description": "Article deleted successfully",
            "schema": {
              "$ref": "#/definitions/ResponseModel"
            },
            "examples": {
              "response": {
                "status": "ok",
                "http_status": "200",
                "message": "success",
                "data": {}
              }
            }
          },
          "404": {
            "description": "Article not found",
            "schema": {
              "$ref": "#/definitions/ResponseModel"
            },
            "examples": {
              "response": {
                "status": "error",
                "http_status": "404",
                "message": "fail",
                "data": {}
              }
            }
          },
          "409": {
            "description": "Article cannot be deleted",
            "schema": {
              "$ref": "#/definitions/ResponseModel"
            },
            "examples": {
              "response": {
                "status": "error",
                "http_status": "409",
                "message": "Article cannot be deleted",
                "data": {}
              }
            }
          }
        }
      }
    },
    "/article/search": {
      "get": {
        "description": "Search articles",
        "operationId": "searchArticles",
        "tags": ["article"],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "tags",
            "in": "query",
            "description": "tags to search by",
            "required": true,
            "type": "array",
            "items": {
              "type": "string"
            },
            "collectionFormat": "csv"
          },
          {
            "name": "X-API-Key",
            "in": "header",
            "description": "the access token",
            "required": true,
            "default": config.get('app.security.token')
          }
        ],
        "responses": {
          "200": {
            "description": "Article created succesfully",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Article"
              }
            }
          }
        }
      }
    },
  };
}

module.exports = { "router": router, "docs": apiDoc };