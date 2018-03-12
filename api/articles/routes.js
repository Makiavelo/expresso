'use strict';
const express = require('express')
const router = express.Router()
const controller = require('./controller');

router.post('/', controller.create);
router.get('/search', controller.search);
router.put('/:id', controller.edit);
router.delete('/:id', controller.delete);

module.exports = router;