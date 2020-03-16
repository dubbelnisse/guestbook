module.exports = {
  client: 'pg',
  dev: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'guestbook',
      user: 'nisse',
      password: 'kalleanka321',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
