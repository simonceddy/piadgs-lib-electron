// Update with your config settings.
const config = require('./src/backend/dbConfig');

module.exports = {

  development: {
    migrations: {
      directory: './setup/database/migrations',
      tableName: 'knex_migrations',
    },
    // seeds: {
    //   directory: './setup/database/seeds',
    // },
    ...config
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
