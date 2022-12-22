const config = require('config');

module.exports = {
  port: 9000,
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['https://two223-frontendweb-lorenzdebie.onrender.com'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: 'mysql2',
    host: config.get('database.host'),
    port: config.get('database.port'),
    name: config.get('database.name'),
    username: config.get('database.username'),
    password: config.get('database.password'),
  },
  // database: {
  //   client: 'mysql2',
  //   host: 'vichogent.be',
  //   port: 40043,
  //   name: '702547ld',
  //   username: '702547ld',
  //   password: 'nEO2l9MSWZoij3qloyHl',
  // },
};