const jwksrsa = require('jwks-rsa');
const jwt = require('koa-jwt');
const config = require('config');
const axios = require('axios');

const {
  getLogger,
} = require('../core/logging');

const AUTH_USER_INFO = config.get('auth.userInfo');

function getJwtSecret() {
  const logger = getLogger();
  try {
    let secretFunction = jwksrsa.koaJwtSecret({
      jwksUri: config.get('auth.jwksUri'),
      cache: true,
      cacheMaxEntries: 5,
    });
    return secretFunction;
  } catch (err) {
    logger.error('Something went wrong when handling the JWT secret', {
      err,
    });
    throw err;
  }
}


function checkJwtToken() {
  const logger = getLogger();
  try {
    let secretFunction = getJwtSecret();
    return jwt({
      secret: secretFunction,
      audience: config.get('auth.audience'),
      issuer: config.get('auth.issuer'),
      algorithms: ['RS256'],
      passthrough: true,
    });
  } catch (err) {
    logger.error('Something went wrong when checking the JWT', {
      err,
    });
    throw err;
  }
}

async function addUserInfo(ctx) {
  const logger = getLogger();
  try {
    const token = ctx.headers.authorization;
    const url = AUTH_USER_INFO;
    if (token && url && ctx.state.user) {
      logger.debug(`addUserInfo: ${url}, ${JSON.stringify(token)}`);

      const userInfo = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      ctx.state.user = {
        ...ctx.state.user,
        ...userInfo.data,
      };
    }

  } catch (err) {
    logger.error('Something went wrong when fetching user info', {
      err,
    });
    throw err;
  }
}


const permissions = Object.freeze({
  loggedIn: 'loggedIn',
  read: 'read',
  write: 'write',
});

function hasPermission(permission) {
  return async (ctx, next) => {
    const logger = getLogger();
    const user = ctx.state.user;
    logger.debug(`hasPermission: ${JSON.stringify(user)}`);

    if (user && permission === permissions.loggedIn) {
      await next();
    } else if (user && user.permissions && user.permissions.includes(permission)) {
      await next();
    } else {
      ctx.throw(403, 'Forbidden');
    }

  };
}

module.exports = {
  checkJwtToken,
  addUserInfo,
  hasPermission,
  permissions,
};