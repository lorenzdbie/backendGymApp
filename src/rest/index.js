const Router = require('@koa/router');
const installAppointmentRoutes = require('./_appointment');
const installHealthRoutes = require('./_health');
const installTrainingRoutes = require('./_training');
const installUserRoutes = require('./_user');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });



  installAppointmentRoutes(router);
  installHealthRoutes(router);
  installTrainingRoutes(router);
  installUserRoutes(router);

  app.use(router.routes()).use(router.allowedMethods());
}