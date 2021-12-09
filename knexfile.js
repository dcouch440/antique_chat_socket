require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user:process.env.PG_USER,
      password:process.env.PG_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database:process.env.TEST_DB_NAME,
      user:process.env.PG_USER,
      password:process.env.PG_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    }
  },
};
