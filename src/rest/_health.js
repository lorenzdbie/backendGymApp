const Router = require('@koa/router');

const healthService = require('../service/health');

const ping = async (ctx) => {
  ctx.body = healthService.ping();
};

const getVersion = async (ctx) => {
  ctx.body = healthService.getVersion();
};

module.exports = function installTrainingsRoutes(app) {
  const router = new Router({
    prefix: '/health',
  });

  router.get('/ping', ping);
  router.get('/version', getVersion);

  app.use(router.routes()).use(router.allowedMethods());
};