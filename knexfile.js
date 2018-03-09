module.exports = {
  production: {
    client: 'pg',
    debug: true,
    connection: 'FILL_ME_IN (heroku postgres url)',
    ssl: true,
    migrations: {
      commands: 'migrations'
    },
  },
  development: {
    client: 'postgresql',
    connection: {
      database: 'day',
    },
  },
};
