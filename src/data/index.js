const {
  join
} = require('path');

const config = require('config');
const knex = require('knex');

const {
  getLogger
} = require('../core/logging');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');

let knexInstance;

const getKnexLogger = (logger, level) => (message) => {
  if (message.sql) {
    logger.log(level, message.sql);
  } else if (message.length && message.forEach) {
    message.forEach((innerMessage) =>
      logger.log(level, innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)));
  } else {
    logger.log(level, JSON.stringify(message));
  }
};

async function initializeData() {
  const logger = getLogger();
  logger.info('Initializing connection to the database');

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
    debug: isDevelopment,
    log: {
      debug: getKnexLogger(logger, 'debug'),
      error: getKnexLogger(logger, 'error'),
      warn: getKnexLogger(logger, 'warn'),
      deprecate: (method, alternative) => logger.warn('Knex reported something deprecated', {
        method,
        alternative,
      }),
    },
    migrations: {
      tableName: 'knex_meta',
      directory: join('src', 'data', 'migrations'),
    },
    seeds: {
      directory: join('src', 'data', 'seeds'),
    },
  };

  knexInstance = knex(knexOptions);

  // Check the connection, create the database and then reconnect
  try {
    await knexInstance.raw('SELECT 1+1 AS result');
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

    // We need to update the Knex configuration and reconnect to use the created database by default
    // USE ... would not work because a pool of connections is used
    await knexInstance.destroy();

    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw('SELECT 1+1 AS result');
  } catch (error) {
    logger.error(error.message, {
      error
    });
    throw new Error('Could not initialize the data layer');
  }

  // Run migrations
  let migrationsFailed = true;
  try {
    await knexInstance.migrate.latest();
    migrationsFailed = false;
  } catch (error) {
    logger.error('Error while migrating the database', {
      error,
    });
  }

  // Undo last migration if something failed
  if (migrationsFailed) {
    try {
      await knexInstance.migrate.down();
    } catch (error) {
      logger.error('Error while undoing last migration', {
        error,
      });
    }

    // No point in starting the server
    throw new Error('Migrations failed');
  }

  // Run seeds in development
  if (isDevelopment) {
    try {
      await knexInstance.seed.run();
      logger.info('Succesfully seeded the database');
    } catch (error) {
      logger.error('Error while seeding database', {
        error,
      });
    }
  }

  logger.info('Succesfully connected to the database');

  return knexInstance;
}

async function shutdownData() {
  const logger = getLogger();

  logger.info('Shutting down database connection');

  await knexInstance.destroy();
  knexInstance = null;

  logger.info('Database connection closed');
}

function getKnex() {
  if (!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance');
  return knexInstance;
}

const tables = {
  user: 'users',
  training: 'trainings',
  appointmentDetails: 'appointmentDetails',
  appointment: 'appointments',
};

module.exports = {
  tables,
  getKnex,
  initializeData,
  shutdownData,
};

// const config = require('config');
// const knex = require('knex');
// const {
//   join
// } = require('path');
// const {
//   getLogger
// } = require('../core/logging')

// const NODE_ENV = config.get('env');
// const isDevelopment = NODE_ENV === 'development';

// const DATABASE_CLIENT = config.get('database.client');
// const DATABASE_NAME = config.get('database.name');
// const DATABASE_HOST = config.get('database.host');
// const DATABASE_PORT = config.get('database.port');
// const DATABASE_USERNAME = config.get('database.username');
// const DATABASE_PASSWORD = config.get('database.password');


// const logger = getLogger();

// let knexInstance;

// async function initializeData() {
//   const knexOptions = {
//     client: DATABASE_CLIENT,
//     connection: {
//       host: DATABASE_HOST,
//       port: DATABASE_PORT,
//       database: DATABASE_NAME,
//       user: DATABASE_USERNAME,
//       password: DATABASE_PASSWORD,
//       insecureAuth: isDevelopment,
//     },
//     migrations: {
//       tableName: 'knex_meta',
//       directory: join('src', 'data', 'migrations'),
//     },
//     seeds: {
//       directory: join('src', 'data', 'seeds'),
//     }
//   }

//   knexInstance = knex(knexOptions);


//   try {
//     await knexInstance.raw('SELECT 1+1 AS result');
//   } catch (error) {
//     logger.error(error.message, {
//       error
//     });
//     throw new Error('Could not initialize the data layer.');
//   }




//   try {
//     await knexInstance.migrate.latest();
//   } catch (error) {
//     logger.error('Error while migrating the database', {
//       error,
//     });

//     throw new Error('Migrations failed, check the logs');
//   }
//   return knexInstance;
// }

// function getKnex() {
//   if (!knexInstance) {
//     throw new Error('Please initialize the data layer before getting the knex instance');
//   }
//   return knexInstance;

// }

// const tables = Object.freeze({
//   transaction: 'transactions',
//   user: 'users',
//   place: 'places',
// });

// module.exports = {
//   initializeData,
//   tables,
//   getKnex,
// }

// const config = require('config');
// const knex = require('knex');
// const {
//   getLogger
// } = require('../core/logging');
// const {
//   join
// } = require('path');

// const logger = getLogger();

// const NODE_ENV = config.get('env');
// const isDevelopment = NODE_ENV === 'development';

// const DATABASE_CLIENT = config.get('database.client');
// const DATABASE_NAME = config.get('database.name');
// const DATABASE_HOST = config.get('database.host');
// const DATABASE_PORT = config.get('database.port');
// const DATABASE_USERNAME = config.get('database.username');
// const DATABASE_PASSWORD = config.get('database.password');

// let knexInstance;

// const getKnexLogger = (logger, level) => (message) => {
//   if (message.sql) {
//     logger.log(level, message.sql);
//   } else if (message.length && message.forEach) {
//     message.forEach((innerMessage) =>
//       logger.log(level, innerMessage.sql ? innerMessage.sql : JSON.stringify(innerMessage)));
//   } else {
//     logger.log(level, JSON.stringify(message));
//   }
// };

// async function initializeData() {
//   const logger = getLogger();
//   logger.info('Initializing connection to the database');

//   const knexOptions = {
//     client: DATABASE_CLIENT,
//     connection: {
//       host: DATABASE_HOST,
//       port: DATABASE_PORT,
//       database: DATABASE_NAME,
//       user: DATABASE_USERNAME,
//       password: DATABASE_PASSWORD,
//       insecureAuth: isDevelopment,
//     },
//     debug: isDevelopment,
//     log: {
//       debug: getKnexLogger(logger, 'debug'),
//       error: getKnexLogger(logger, 'error'),
//       warn: getKnexLogger(logger, 'warn'),
//       deprecate: (method, alternative) => logger.warn('Knex reported something deprecated', {
//         method,
//         alternative,
//       }),
//     },
//     migrations: {
//       tableName: 'knex_meta',
//       directory: join('src', 'data', 'migrations')
//     },
//     seeds: {
//       directory: join('src', 'data', 'seeds'),
//     }
//   }
//   knexInstance = knex(knexOptions);

//   try {
//     await knexInstance.raw('SELECT 1+1 AS result');
//     await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);

//     await knex.destroy();

//     knexOptions.connection.database = DATABASE_NAME;
//     knexInstance = knex(knexOptions);
//     await knexInstance.raw('SELECT 1+1 AS result');

//   } catch (error) {
//     logger.error(error.message, {
//       error
//     });
//     throw new Error('Could not initialize the data layer');
//   }
//   let migrationsFailed = true;
//   try {
//     await knexInstance.migrate.latest();
//     migrationsFailed = false;
//   } catch (error) {
//     logger.error('Error while migrating the database', {
//       error,
//     });
//     throw new Error('Migrations failed, check the logs');
//   }

//   if (migrationsFailed) {
//     try {
//       await knexInstance.migrate.down();
//     } catch (error) {
//       logger.error('Error while undoing last migration', {
//         error,
//       });
//     }

//     // No point in starting the server
//     throw new Error('Migrations failed');
//   }

//   if (isDevelopment) {
//     try {
//       await knexInstance.seed.run();
//     } catch (error) {
//       logger.error('Error while seeding database', {
//         error
//       });
//     }
//   }
//   logger.info('Succesfully connected to the database');

//   return knexInstance;
// }

// async function shutdownData() {
//   const logger = getLogger();

//   logger.info('Shutting down database connection');

//   await knexInstance.destroy();
//   knexInstance = null;

//   logger.info('Database connection closed');
// }

// function getKnex() {
//   if (!knexInstance) throw new Error('Please initialize the data layer before getting the knex instance')
//   return knexInstance;
// }
// const tables = Object.freeze({
//   appointment: 'appointments',
//   user: 'users',
//   training: 'trainings',
//   appointmentDetails: 'appointmentDetails'
// })

// module.exports = {
//   initializeData,
//   tables,
//   getKnex,
//   shutdownData,
// };