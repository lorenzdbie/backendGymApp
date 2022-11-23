const Router = require('@koa/router');
// const Joi = require('joi');

const healthService = require('../service/health');

const validate = require('./_validation');

const ping = async (ctx) => {
  ctx.body = healthService.ping();
};
ping.validationScheme = null;

const getVersion = async (ctx) => {
  ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

module.exports = function installTrainingsRoutes(app) {
  const router = new Router({
    prefix: '/health',
  });

  router.get('/ping', validate(ping.validationScheme), ping);
  router.get('/version', validate(getVersion.validationScheme), getVersion);

  app.use(router.routes()).use(router.allowedMethods());
};