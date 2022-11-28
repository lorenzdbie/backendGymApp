const jwksrsa = require('jwks-rsa');
const jwt = require('koa-jwt');
const config = require('config');
const axios = require('axios');

const {getLogger} = require('../core/logging');

const AUTH_USER_INFO = config.get('auth.userInfo');

function getJwtSecret() {
  try {
    let secretFunction = jwksrsa.koaJwtSecret({
      jwksUri: config.get('auth.jwksUri'),
      cache: true,
      cacheMaxEntries: 5,
    });
    return secretFunction;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


function checkJwtToken() {
  try {
    let secretFunction = getJwtSecret();
    return jwt({
      secret: secretFunction,
      audience: config.get('auth.audience'),
      issuer: config.get('auth.issuer'),
      algorithms: ['RS256'],
      passthrough: true,
    });
    //.unless({path:[], <<    whitelist urls   >>   });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addUserInfo(ctx) {
  const logger = getLogger();
  try {
    const token = ctx.headers.authorization;
    const url = AUTH_USER_INFO;
    if (token && url && ctx.state.user) {
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

  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  checkJwtToken,
  addUserInfo,
};