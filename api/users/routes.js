'use strict';
const express = require('express')
const router = express.Router()
const controller = require('./controller');
const config = require('config');

router.post('/', (req, res, next) => controller.create(req, res, next));

//Define api docs
let apiDoc = {};
if(process.env.NODE_ENV !== "production") {
  apiDoc = {
    "/user": {
      "post": {
        "description": "Creates a new user",
        "operationId": "createUser",
        "tags": ["user"],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "The user object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/UserBody"
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
            "description": "User created successfully",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        }
      }
    }
  };
}

module.exports = { "router": router, "docs": apiDoc };