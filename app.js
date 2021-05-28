const db = require('./db');
const { Model } = require('objection');
const app = require('express')();
Model.knex(db);

module.exports = app;