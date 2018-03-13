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
