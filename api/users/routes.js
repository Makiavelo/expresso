'use strict';
const express = require('express')
const router = express.Router()
const controller = require('./controller');

router.post('/', controller.create);

//Define api docs
let apiDoc = {};
if(process.env.NODE_ENV !== "production") {
  apiDoc = {
    "/user": {
      "post": {
        "description": "Creates a new article",
        "operationId": "createArticle",
        "tags": ["user"],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "The user",
            "required": true,
            "schema": {
              "$ref": "#/definitions/UserBody"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "User created succesfully",
            "schema": {
              "$ref": "#/definitions/User"
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