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
    host: 'vichogent.be',
    port: 40043,
    name: '702547ld',
    username: '702547ld',
    password: 'nEO2l9MSWZoij3qloyHl',
  },
};