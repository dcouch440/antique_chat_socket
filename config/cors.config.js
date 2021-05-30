const envUrl = require('../lib/env-url');

const origin = envUrl({
  localhost:3001,
  production: 'https://radiant-thicket-98181.herokuapp.com'
});

const corsConfig = {
  origin,
  methods: ['GET', 'POST'],
  credentials: true
};

module.exports = corsConfig;