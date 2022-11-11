module.exports = {
  log: {
    level: 'silly',
    disabled: true,
  },
  cors: {
    origins: ['http://localhost:5173'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: 'fitnessapp_test',
    username: 'root',
    password: 'root-root',
  },
};