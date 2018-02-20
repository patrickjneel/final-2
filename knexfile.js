module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/garagebin',//change database
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/garagebin_test',
    useNullAsDefualt: true,
    migrations: {
      directory: 'db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  }
  
};
