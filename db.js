const environment = process.env.NODE_ENV || 'development';
const knexfile = require('./knexfile');
const knexConfig = knexfile[environment];
const { Model } = require('objection');
const db = require('knex')(knexConfig);
Model.knex(db);
module.exports = db;