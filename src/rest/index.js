const Router = require('@koa/router');

const installAppointmentRoutes = require('./_appointment');
const installHealthRoutes = require('./_health');
const installTrainingRoutes = require('./_training');
const installUserRoutes = require('./_user');
/**
* @swagger
 * components:
 *   parameters:
 *     limitParam:
 *       in: query
 *       name: limit
 *       description: Maximum amount of items to return
 *       required: false
 *       schema:
 *         type: integer
 *         default: 100
 *     offsetParam:
 *       in: query
 *       name: offset
 *       description: Number of items to skip
 *       required: false
 *       schema:
 *         type: integer
 *         default: 0
  */

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });



  installAppointmentRoutes(router);
  installHealthRoutes(router);
  installTrainingRoutes(router);
  installUserRoutes(router);

  app.use(router.routes()).use(router.allowedMethods());
};