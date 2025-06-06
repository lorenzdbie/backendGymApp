const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const emoji = require('node-emoji');
const swaggerJSDoc = require('swagger-jsdoc');
const {
  koaSwagger,
} = require('koa2-swagger-ui');
const {
  serializeError,
} = require('serialize-error');

const swaggerOptions = require('../swagger.config');

const ServiceError = require('./core/serviceError');
const installRest = require('./rest');
const {
  initializeData,
  shutdownData,
} = require('./data');
const {
  initializeLogger,
  getLogger,
} = require('./core/logging');
const {
  checkJwtToken,
} = require('./core/auth');





const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');


// console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`);

module.exports = async function createServer() {

  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV,
    },
  });

  await initializeData();

  const app = new Koa();

  app.use(koaCors({
    origin: (ctx) => {
      if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
        return ctx.request.header.origin;
      }
      return CORS_ORIGINS[0];
    },
    allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
    maxAge: CORS_MAX_AGE,
  }));

  const logger = getLogger();

  app.use(checkJwtToken());



  app.use(bodyParser());

  const spec = swaggerJSDoc(swaggerOptions);
  app.use(koaSwagger({
    routePrefix: '/swagger',
    specPrefix: '/swagger/spec',
    exposeSpec: true,
    swaggerOptions: {
      spec,
    },
  }));

  // app.use(async (ctx, next) => {
  //   const logger = getLogger();
  //   logger.debug(`authorization header: ${ctx.headers.authorization}`);
  //   logger.debug(`userStare:  ${JSON.stringify(ctx.state.user)}`);
  //   logger.debug(`jwtOriginalError: ${ctx.state.jwtOriginalError}`);
  //   await next();
  // });

  app.use(async (ctx, next) => {

    // console.log(ctx.state.user);

    const logger = getLogger();
    logger.info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get('skull');
      if (ctx.status >= 400) return emoji.get('x');
      if (ctx.status >= 300) return emoji.get('rocket');
      if (ctx.status >= 200) return emoji.get('white_check_mark');
      return emoji.get('rewind');
    };

    try {
      await next();

      logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`);
    } catch (error) {
      logger.error(`${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`, {
        error,
      });

      throw error;
    }
  });

  app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.body = {
          code: 'not_found',
          message: `Unknown resource: ${ctx.url}`,
        };
      }
    } catch (error) {
      const logger = getLogger();
      logger.error('Error occured while handeling a request', {
        error: serializeError(error),
      });

      let statusCode = error.statusCode || 500;
      let errorBody = {
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== 'production' ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }
        if (error.isValidationFailed) {
          statusCode = 400;
        }
        if (error.isUnauthorized) {
          statusCode = 401;
        }
        if (error.isForbidden) {
          statusCode = 403;
        }
      }
      if (ctx.state.jwtOriginalError) {
        statusCode = 401;
        errorBody.code = 'UNAUTHORIZED';
        errorBody.message = ctx.state.jwtOriginalError.message;
        errorBody.details.jwtOriginalError = serializeError(ctx.state.jwtOriginalError);
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  installRest(app);

  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        const port = config.get('port');
        app.listen(port);
        logger.info(`🚀 Server listening on http://localhost:${port}`);
        resolve();
      });
    },

    async stop() {
      {
        app.removeAllListeners();
        await shutdownData();
        getLogger().info('👋 Server stopped');

      }
    },
  };
};