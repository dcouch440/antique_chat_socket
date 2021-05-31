const environment = process.env.NODE_ENV || 'development';
const knexfile = require('./knexfile');
const knexConfig = knexfile[environment];
const db = require('knex')(knexConfig);

module.exports = db;