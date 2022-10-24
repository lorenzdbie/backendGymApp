const Koa = require('koa');
const config = require('config');
const {
  getLogger
} = require('./core/logging');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const appointmentService = require('./service/appointment');
const userService = require('./service/user');
const koaCors = require('@koa/cors');
const {
  initializeData
} = require('./data');

const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`);

async function main() {
  await initializeData();
}
main();

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

app.use(bodyParser());

const router = new Router();

router.get('/api/appointments', async (ctx) => {
  logger.info(JSON.stringify(ctx.request));
  ctx.body = await appointmentService.getAll();
})

router.get('/api/users', async (ctx) => {
  logger.info(JSON.stringify(ctx.request));
  ctx.body = await userService.getAll();
})

router.post('/api/appointments', async (ctx) => {
  logger.info(JSON.stringify(ctx.request.body));
  const newAppointment = await appointmentService.create({
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newAppointment;

})

router.get('/api/appointments/:id', async (ctx) => {
  ctx.body = await appointmentService.getById(ctx.params.id);
})

router.put('/api/appointments/:id', async (ctx) => {
  const updatedAppointment = await appointmentService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
  ctx.body = updatedAppointment;
})

router.delete('/api/appointments/:id', async (ctx) => {
  ctx.body = await appointmentService.deleteById(ctx.params.id);
})

app.use(router.routes()).use(router.allowedMethods());


logger.info(`🚀 Server listening on http://localhost:9000`);
app.listen(9000);